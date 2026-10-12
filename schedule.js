// グループ共有版 schedule.js(Supabase)
// 追加: 予定クリックで「変更/削除」を選択 / メンバーごとの色分け / 全員編集可の予定は専用色
const sbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let myId = null;        // 自分の(匿名)ユーザーID
let currentCal = null;  // { id, name, join_code }
let selectMode = false; // 複数選択削除モード
let editingId = null;   // 変更中の予定ID(nullなら新規追加)

// ---- 色の設定(ここを書き換えれば色を変えられます) ----
// メンバーは「最初に予定を入れた順」にこの色が割り当てられます。足りなくなったら自動生成の色になります。
const PALETTE = ['#e5484d', '#3273dc', '#2f9e44', '#f08c00', '#9c36b5', '#0ca5b0', '#d6336c', '#5c7cfa'];
const SHARED_COLOR = '#6b7280'; // 全員編集可の予定
function colorForIndex(i) {
    return i < PALETTE.length ? PALETTE[i] : `hsl(${Math.round((i * 137.508) % 360)}, 65%, 42%)`;
}

const byId = (id) => document.getElementById(id);
const setLobbyMsg = (t) => { byId('lobbyMsg').textContent = t || ''; };

async function ensureSignedIn() {
    let { data: { session } } = await sbClient.auth.getSession();
    if (!session) {
        const { data, error } = await sbClient.auth.signInAnonymously();
        if (error) throw error;
        session = data.session;
    }
    myId = session.user.id;
}

async function openCalendar(id) {
    const { data, error } = await sbClient.from('calendars')
        .select('id,name,join_code').eq('id', id).maybeSingle();
    if (error || !data) return false;
    currentCal = data;
    localStorage.setItem('wcCalendarId', data.id);
    byId('calName').textContent = data.name;
    byId('calCode').textContent = data.join_code;
    byId('lobby').hidden = true;
    await loadEvents();
    return true;
}

// DBの予定をカレンダーに反映(予定=priority 2 だけ入れ替える。天気には触らない)
async function loadEvents() {
    if (!currentCal) return;
    const { data, error } = await sbClient.from('events')
        .select('*').eq('calendar_id', currentCal.id);
    if (error) { console.error(error); return; }

    // メンバーの色: 各人が最初に予定を作った順に番号を振る
    const firstSeen = {};
    data.forEach(function (row) {
        const k = row.created_by || '';
        if (!(k in firstSeen) || row.created_at < firstSeen[k]) firstSeen[k] = row.created_at;
    });
    const people = Object.keys(firstSeen).sort((a, b) => (firstSeen[a] < firstSeen[b] ? -1 : 1));

    calendar.batchRendering(function () {
        calendar.getEvents().filter(e => e.extendedProps.priority === 2)
            .forEach(e => e.remove());
        data.forEach(function (row) {
            const color = row.shared_edit
                ? SHARED_COLOR
                : colorForIndex(people.indexOf(row.created_by || ''));
            calendar.addEvent({
                id: row.id,
                title: (row.shared_edit ? '🤝 ' : '') + row.title,
                start: row.start_at.slice(0, 10), // 終日予定は日付だけ使う
                allDay: true,
                backgroundColor: color,
                borderColor: color,
                textColor: '#ffffff',
                className: 'schedule-event' + (row.shared_edit ? ' shared-event' : ''),
                extendedProps: {
                    priority: 2,
                    canEdit: row.created_by === myId || row.shared_edit,
                    isOwner: row.created_by === myId,
                    rawTitle: row.title,
                    shared: row.shared_edit
                }
            });
        });
    });
}

async function deleteEvents(ids) {
    const { data, error } = await sbClient.from('events').delete().in('id', ids).select('id');
    if (error) { alert('削除できませんでした: ' + error.message); return 0; }
    await loadEvents();
    return data.length;
}

// 「変更 / 削除 / キャンセル」を選ぶダイアログ(HTMLを触らずJSだけで作る)
function askAction(title) {
    return new Promise(function (resolve) {
        const ov = document.createElement('div');
        ov.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;z-index:9999;';
        const box = document.createElement('div');
        box.style.cssText = 'background:#fff;color:#333;padding:20px;border-radius:12px;width:min(320px,90vw);text-align:center;';
        const p = document.createElement('p');
        p.textContent = `予定「${title}」`;
        p.style.cssText = 'margin:0 0 12px;font-weight:bold;word-break:break-all;';
        box.appendChild(p);
        const mk = function (label, val, bg) {
            const b = document.createElement('button');
            b.textContent = label;
            b.style.cssText = `display:block;width:100%;margin:8px 0;padding:10px;border:0;border-radius:8px;color:#fff;background:${bg};font-size:16px;cursor:pointer;`;
            b.onclick = function () { ov.remove(); resolve(val); };
            return b;
        };
        box.append(mk('✏️ 変更する', 'edit', '#3273dc'), mk('🗑️ 削除する', 'delete', '#e5484d'), mk('キャンセル', null, '#9ca3af'));
        ov.onclick = function (e) { if (e.target === ov) { ov.remove(); resolve(null); } };
        ov.appendChild(box);
        document.body.appendChild(ov);
    });
}

// 予定の追加用モーダルを「変更モード」で開く
function startEdit(ev) {
    editingId = ev.id;
    const modal = byId('scheduleModal');
    modal.dataset.selectedDate = ev.startStr.slice(0, 10);
    byId('newTodoInput').value = ev.extendedProps.rawTitle;
    byId('newTodoShared').checked = !!ev.extendedProps.shared;
    byId('newTodoShared').disabled = !ev.extendedProps.isOwner; // 作成者以外は共有設定を変えられない
    modal.classList.add('is-active');
}

function shareMessage() {
    const url = location.origin + location.pathname + '?code=' + currentCal.join_code;
    return `「${currentCal.name}」の天気カレンダーに招待します。\n招待コード: ${currentCal.join_code}\n${url}`;
}

document.addEventListener('DOMContentLoaded', async function () {
    if (typeof calendar === 'undefined') {
        console.error('カレンダーの連動に失敗しました。weather.jsの『calendar = new ...』を確認してください。');
        return;
    }

    // ---- ロビー(作成・参加) ----
    byId('createBtn').onclick = async function () {
        const name = byId('newCalName').value.trim();
        if (!name) return setLobbyMsg('カレンダーの名前を入力してください');
        const { data, error } = await sbClient.rpc('create_calendar', { p_name: name });
        if (error) return setLobbyMsg('作成できませんでした: ' + error.message);
        await openCalendar(data[0].out_id);
        alert(`作成しました。招待コード: ${data[0].out_code}\n「共有」ボタンから友だちに送れます。`);
    };

    byId('joinBtn').onclick = async function () {
        const code = byId('joinCode').value.trim().toUpperCase();
        if (!code) return setLobbyMsg('招待コードを入力してください');
        const { data, error } = await sbClient.rpc('join_calendar', { p_code: code });
        if (error) {
            return setLobbyMsg(error.message.includes('too many')
                ? '試行回数が多すぎます。10分ほど待ってからやり直してください'
                : '参加できませんでした: ' + error.message);
        }
        if (!data) return setLobbyMsg('コードが見つかりません。入力を確認してください');
        await openCalendar(data);
    };

    byId('switchBtn').onclick = function () {
        setLobbyMsg('');
        byId('lobbyCloseBtn').hidden = !currentCal;
        byId('lobby').hidden = false;
    };
    byId('lobbyCloseBtn').onclick = function () { byId('lobby').hidden = true; };

    // ---- 共有 ----
    byId('shareBtn').onclick = async function () {
        if (!currentCal) return;
        const text = shareMessage();
        if (navigator.share) {
            try { await navigator.share({ title: '天気カレンダーへの招待', text }); } catch (e) {}
            return;
        }
        try {
            await navigator.clipboard.writeText(text);
            alert('招待文をコピーしました。LINEなどに貼り付けてください。');
        } catch (e) {
            prompt('招待文をコピーしてください', text);
        }
    };
    byId('lineBtn').onclick = function () {
        if (!currentCal) return;
        window.open('https://line.me/R/msg/text/?' + encodeURIComponent(shareMessage()), '_blank');
    };

    // ---- モーダルが閉じたら「変更モード」を解除 ----
    new MutationObserver(function () {
        if (!byId('scheduleModal').classList.contains('is-active') && editingId) {
            editingId = null;
            byId('newTodoInput').value = '';
            byId('newTodoShared').checked = false;
            byId('newTodoShared').disabled = false;
        }
    }).observe(byId('scheduleModal'), { attributes: true, attributeFilter: ['class'] });

    // ---- 予定の追加 / 変更 ----
    byId('saveTodoBtn').addEventListener('click', async function () {
        const title = byId('newTodoInput').value.trim();
        const date = byId('scheduleModal').dataset.selectedDate;
        if (!title) { alert('予定を入力してください。'); return; }
        if (!currentCal) { alert('先にカレンダーを選んでください。'); return; }

        if (editingId) {
            // 変更(タイトルと、作成者本人なら「みんなで編集可」の設定)
            const patch = { title: title };
            if (!byId('newTodoShared').disabled) patch.shared_edit = byId('newTodoShared').checked;
            const { data, error } = await sbClient.from('events')
                .update(patch).eq('id', editingId).select('id');
            if (error) { alert('変更できませんでした: ' + error.message); return; }
            if (!data || data.length === 0) { alert('この予定は変更できませんでした。'); return; }
        } else {
            const { error } = await sbClient.from('events').insert({
                calendar_id: currentCal.id,
                title: title,
                start_at: date + 'T00:00:00Z',
                all_day: true,
                shared_edit: byId('newTodoShared').checked,
                created_by: myId
            });
            if (error) { alert('保存できませんでした: ' + error.message); return; }
        }
        byId('newTodoInput').value = '';
        byId('newTodoShared').checked = false;
        byId('scheduleModal').classList.remove('is-active');
        await loadEvents();
    });

    // ---- 削除(1件 / 複数選択) ----
    const deleteBtn = byId('deleteSelectedBtn');
    const cancelBtn = byId('cancelSelectBtn');
    const selected = () => document.querySelectorAll('.schedule-event.is-selected');

    function updateButtons() {
        deleteBtn.textContent = selectMode ? `✅ ${selected().length}件を削除する` : '🗑️ 選択した予定を削除';
        cancelBtn.hidden = !selectMode;
    }
    function exitSelectMode() {
        selectMode = false;
        selected().forEach(el => el.classList.remove('is-selected'));
        updateButtons();
    }

    calendar.setOption('eventClick', async function (info) {
        if (info.event.extendedProps.priority !== 2) return; // 天気は対象外
        if (!info.event.extendedProps.canEdit) {
            alert('他の人の予定は変更・削除できません。');
            return;
        }
        if (selectMode) {
            info.el._fcEvent = info.event;
            info.el.classList.toggle('is-selected');
            updateButtons();
        } else {
            const action = await askAction(info.event.title);
            if (action === 'edit') {
                startEdit(info.event);
            } else if (action === 'delete' && confirm(`予定「${info.event.title}」を削除しますか？`)) {
                const n = await deleteEvents([info.event.id]);
                if (n > 0) alert('予定を削除しました。');
            }
        }
    });

    deleteBtn.addEventListener('click', async function () {
        if (!selectMode) { selectMode = true; updateButtons(); return; }
        const targets = Array.from(selected());
        if (targets.length === 0) {
            alert('削除する予定が選択されていません。\n予定をクリックして選択してください。');
            return;
        }
        if (!confirm(`${targets.length}件の予定を削除しますか？`)) return;
        const ids = targets.map(el => el._fcEvent.id);
        exitSelectMode();
        const n = await deleteEvents(ids);
        alert(`${n}件の予定を削除しました。`);
    });
    cancelBtn.addEventListener('click', exitSelectMode);

    // ---- 起動処理 ----
    const urlCode = new URLSearchParams(location.search).get('code');
    if (urlCode) byId('joinCode').value = urlCode.toUpperCase();

    try {
        await ensureSignedIn();
    } catch (e) {
        console.error(e);
        byId('lobby').hidden = false;
        setLobbyMsg('サインインに失敗しました。Supabaseの「Allow anonymous sign-ins」がオンか、config.jsのキーを確認してください');
        return;
    }

    const saved = localStorage.getItem('wcCalendarId');
    if (saved && !urlCode && await openCalendar(saved)) {
        // 前回のカレンダーを開けた
    } else {
        byId('lobby').hidden = false;
    }

    // 他の人の変更を取り込む(30秒ごと / 画面に戻ったとき)
    const refresh = () => { if (!document.hidden && !selectMode) loadEvents(); };
    setInterval(refresh, 30000);
    document.addEventListener('visibilitychange', refresh);
});
