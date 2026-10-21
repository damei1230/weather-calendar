// 🗺️ 全国の都道府県と、気象庁の主要な地域（市など）の定義データ
const areaData = {
    "北海道": { "石狩・空知・後志（札幌など）": "016000", "渡島・檜山（函館など）": "015000", "胆振・日高（室蘭など）": "01400a", "上川・留萌（旭川など）": "012000", "宗谷（稚内など）": "011000", "網走・北見・紋別": "013000", "十勝（帯広など）": "014100", "釧路・根室": "017000" },
    "青森県": { "津軽（青森市など）": "020010", "下北（むつ市など）": "020020", "三八上北（八戸市など）": "020030" },
    "岩手県": { "内陸（盛岡市など）": "030010", "沿岸北部": "030020", "沿岸南部": "030030" },
    "宮城県": { "東部（仙台市など）": "040010", "西部（白石市など）": "040020" },
    "秋田県": { "沿岸（秋田市など）": "050010", "内陸（横手市など）": "050020" },
    "山形県": { "村山（山形市など）": "060010", "置賜（米沢市など）": "060020", "庄内（酒田市など）": "060030", "最上（新庄市など）": "060040" },
    "福島県": { "中通り（福島市など）": "070010", "浜通り（いわき市など）": "070020", "会津（若松市など）": "070030" },
    "茨城県": { "南部（水戸市など）": "080010", "北部（日立市など）": "080020" },
    "栃木県": { "南部（宇都宮市など）": "090010", "北部（那須など）": "090020" },
    "群馬県": { "南部（前橋市など）": "100010", "北部（みなかみなど）": "100020" },
    "埼玉県": { "南部（さいたま市など）": "110010", "北部（熊谷市など）": "110020", "秩父地方": "110030" },
    "千葉県": { "北西部（千葉市など）": "120010", "北東部（銚子市など）": "120020", "南部（館山市など）": "120030" },
    "東京都": { "東京地方（23区・多摩）": "130010", "伊豆諸島北部": "130020", "伊豆諸島南部": "130030", "小笠原諸島": "130040" },
    "神奈川県": { "東部（横浜市など）": "140010", "西部（小田原市など）": "140020" },
    "新潟県": { "下越（新潟市など）": "150010", "中越（長岡市など）": "150020", "上越（上越市など）": "150030", "佐渡": "150040" },
    "富山県": { "東部（富山市など）": "160010", "西部（高岡市など）": "160020" },
    "石川県": { "加賀（金沢市など）": "170010", "能登（輪島市など）": "170020" },
    "福井県": { "嶺北（福井市など）": "180010", "嶺南（敦賀市など）": "180020" },
    "山梨県": { "国中地方（甲府市など）": "190010", "富士五湖（富士吉田市など）": "190020" },
    "長野県": { "中部（長野市など）": "200010", "北部（松本市など）": "200020", "南部（飯田市など）": "200030" },
    "岐阜県": { "美濃地方（岐阜市など）": "210010", "飛騨地方（高山市など）": "210020" },
    "静岡県": { "中部（静岡市など）": "220010", "伊豆地方": "220020", "東部（沼津市など）": "220030", "西部（浜松市など）": "220040" },
    "愛知県": { "西部（名古屋市など）": "230010", "東部（豊橋市など）": "230020" },
    "三重県": { "北中部（津市など）": "240010", "南部（尾鷲市など）": "240020" },
    "滋賀県": { "南部（大津市など）": "250010", "北部（彦根市など）": "250020" },
    "京都府": { "南部（京都市など）": "260010", "北部（舞鶴市など）": "260020" },
    "大阪府": { "大阪府（大阪市など）": "270000" },
    "兵庫県": { "南部（神戸市など）": "280010", "北部（豊岡市など）": "280020" },
    "奈良県": { "北部（奈良市など）": "290010", "南部（十津川など）": "290020" },
    "和歌山県": { "北部（和歌山市など）": "300010", "南部（新宮市など）": "300020" },
    "鳥取県": { "東部（鳥取市など）": "310010", "中・西部（米子市など）": "310020" },
    "島根県": { "東部（松江市など）": "320010", "西部（浜田市など）": "320020", "隠岐": "320030" },
    "岡山県": { "南部（岡山市など）": "330010", "北部（津山市など）": "330020" },
    "広島県": { "南部（広島市など）": "340010", "北部（三次市など）": "340020" },
    "山口県": { "西部（下関市など）": "350010", "中部（山口市など）": "350020", "東部（岩国市など）": "350030", "北部（萩市など）": "350040" },
    "徳島県": { "北部（徳島市など）": "360010", "南部（日和佐など）": "360020" },
    "香川県": { "香川県（高松市など）": "370000" },
    "愛媛県": { "中予（松山市など）": "380010", "東予（新居浜市など）": "380020", "南予（宇和島市など）": "380030" },
    "高知県": { "中部（高知市など）": "390010", "東部（室戸市など）": "390020", "西部（清水市など）": "390030" },
    "福岡県": { "福岡地方（福岡市など）": "400010", "北九州地方": "400020", "筑豊地方": "400030", "筑後地方": "400040" },
    "佐賀県": { "南部（佐賀市など）": "410010", "北部（唐津市など）": "410020" },
    "長崎県": { "南部（長崎市など）": "420010", "北部（佐世保市など）": "420020", "五島": "420030", "壱岐・対馬": "420040" },
    "熊本県": { "熊本地方（熊本市など）": "430010", "阿蘇地方": "430020", "天草・芦北地方": "430030", "球磨地方": "430040" },
    "大分県": { "中部（大分市など）": "440010", "北部（中津市など）": "440020", "西部（日田市など）": "440030", "南部（佐伯市など）": "440040" },
    "宮崎県": { "南部平野部（宮崎市など）": "450010", "北部平野部（延岡市など）": "450020", "南部山沿い（都城市など）": "450030", "北部山沿い（高千穂など）": "450040" },
    "鹿児島県": { "薩摩地方（鹿児島市など）": "460010", "大隅地方": "460020", "種子島・屋久島地方": "460030", "奄美地方": "460040" },
    "沖縄県": { "本島中南部（那覇市など）": "471010", "本島北部（名護市など）": "471020", "久米島": "471030", "大東島地方": "472000", "宮古島地方": "473000", "八重山地方（石垣市など）": "474000" }
};

const WEATHER_CODE_MAP = {
  // 晴れ系
  '100': '☀️ 晴れ',
  '101': '☀️時々☁️', '102': '☀️一時🌧️', '103': '☀️時々🌧️',
  '104': '☀️一時❄️', '105': '☀️時々❄️',
  '106': '☀️一時🌧️か❄️', '107': '☀️時々🌧️か❄️',
  '110': '☀️のち時々☁️', '111': '☀️のち☁️',
  '112': '☀️のち一時🌧️', '113': '☀️のち時々🌧️', '114': '☀️のち🌧️',
  '115': '☀️のち一時❄️', '116': '☀️のち時々❄️', '117': '☀️のち❄️',
  '118': '☀️のち🌧️か❄️', '119': '☀️のち🌧️',
  '120': '☀️一時🌧️', '121': '☀️一時🌧️', '122': '☀️一時🌧️',
  '125': '☀️のち⛈️', '126': '☀️のち🌧️', '127': '☀️のち🌧️', '128': '☀️のち🌧️',

  // 曇り系
  '200': '☁️ 曇り',
  '201': '☁️時々☀️', '202': '☁️一時🌧️', '203': '☁️時々🌧️',
  '204': '☁️一時❄️', '205': '☁️時々❄️',
  '206': '☁️一時🌧️か❄️', '207': '☁️時々🌧️か❄️', '208': '☁️一時🌧️',
  '209': '🌫️ 霧',
  '210': '☁️のち時々☀️', '211': '☁️のち☀️',
  '212': '☁️のち一時🌧️', '213': '☁️のち時々🌧️', '214': '☁️のち🌧️',
  '215': '☁️のち一時❄️', '216': '☁️のち時々❄️', '217': '☁️のち❄️',
  '218': '☁️のち🌧️か❄️', '219': '☁️のち🌧️',
  '220': '☁️一時🌧️', '221': '☁️一時🌧️', '222': '☁️一時🌧️',
  '223': '☁️日中時々☀️',
  '224': '☁️のち🌧️', '225': '☁️のち🌧️', '226': '☁️のち🌧️',
  '228': '☁️のち❄️', '229': '☁️のち❄️', '230': '☁️のち❄️',
  '240': '☁️時々⛈️',

  // 雨系
  '300': '🌧️ 雨',
  '301': '🌧️時々☀️', '302': '🌧️時々止む', '303': '🌧️時々❄️',
  '304': '🌧️か❄️', '306': '🌧️ 大雨', '308': '🌧️ 雨(暴風)',
  '309': '🌧️一時❄️',
  '311': '🌧️のち☀️', '313': '🌧️のち☁️',
  '314': '🌧️のち時々❄️', '315': '🌧️のち❄️',
  '316': '🌧️か❄️のち☀️', '317': '🌧️か❄️のち☁️',
  '320': '🌧️のち☀️', '321': '🌧️のち☁️',
  '323': '🌧️のち☀️', '324': '🌧️のち☀️', '325': '🌧️のち☀️',
  '326': '🌧️のち❄️', '327': '🌧️のち❄️',
  '328': '🌧️ 雨(強く降る)', '329': '🌧️ 雨',
  '340': '❄️か🌧️', '350': '⛈️ 雷雨',

  // 雪系
  '400': '❄️ 雪',
  '401': '❄️時々☀️', '402': '❄️時々止む', '403': '❄️時々🌧️',
  '405': '❄️ 大雪', '406': '❄️ 風雪', '407': '❄️ 暴風雪',
  '409': '❄️一時🌧️',
  '411': '❄️のち☀️', '413': '❄️のち☁️', '414': '❄️のち🌧️',
  '420': '❄️のち☀️', '421': '❄️のち☁️',
  '422': '❄️のち🌧️', '423': '❄️のち🌧️',
  '425': '❄️ 雪', '450': '⛈️ 雪(雷)'
};

//  画面が読み込まれたらカレンダーを初期化する
document.addEventListener('DOMContentLoaded', function() {

    const weatherDetails = {};

    function dateToStr(d) {
        return d.getFullYear() + '-' +
            String(d.getMonth() + 1).padStart(2, '0') + '-' +
            String(d.getDate()).padStart(2, '0');
    }

    var calendarEl = document.getElementById('calendar');
    
    calendar = new FullCalendar.Calendar(calendarEl, {

        datesSet: function() {
            fillWeatherPlaceholders();
        },

        initialView: 'dayGridMonth', // 月表示モード
        locale: 'ja',              // 日本語化

        fixedWeekCount: false,

        eventOrder: 'priority',

        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: ''
        },

        dateClick: function(info) {
            
            const selectedDate = info.dateStr;

            // 1. 詳細画面の見出しをクリックされた日付に書き換える
            document.getElementById('modalDateTitle').textContent = `${selectedDate} の詳細`;
            
            // 2. 入力フォームの裏データとして日付を一時保存しておく
            document.getElementById('scheduleModal').dataset.selectedDate = selectedDate;

            // 💡 3. 【新機能】カレンダーからクリックされた日の予定をすべて集めてくる
            const allEvents = calendar.getEvents(); // カレンダー上の全データを取得
            const listEl = document.getElementById('modalEventList');
            listEl.innerHTML = ''; // 一旦、予定一覧を空っぽにリセット

            // クリックされた日と同じ日付の予定だけを絞り込む
            // (※FullCalendarの仕様上、終日イベントの終了日は1日ずれることがあるため、startの日付で比較します)
            const todaysEvents = allEvents.filter(function(event) {
                // [安全装置] イベントに start（日付）がないものはスキップ
                if (!event.start) return false;

                // 1. 【確実な方法】最初に追加した「priority: 2」があるものを自分の予定とみなす
                // (FullCalendarは独自の拡張データを event.extendedProps の中に入れます)
                const props = event.extendedProps;
                const isSchedule = props && (props.priority === 2 || event.id === 'z-schedule');

                // 2. イベントの日付（年・月・日）をローカルの時間で正確に取得して "YYYY-MM-DD" にする
                const d = event.start;
                const year = d.getFullYear();
                const month = String(d.getMonth() + 1).padStart(2, '0');
                const day = String(d.getDate()).padStart(2, '0');
                const eventDateStr = `${year}-${month}-${day}`;
                
                
                return isSchedule && eventDateStr === selectedDate;
            });

            // 💡 4. 【新機能】集めた予定をポップアップの中に箇条書きにして表示する
            if (todaysEvents.length > 0) {
                // 予定がある場合、ループで1個ずつ <li> タグを作って追加する
                console.log("予定を追加");
                todaysEvents.forEach(function(event) {
                    const li = document.createElement('li');
                    li.textContent = event.title; // 予定のタイトルをセット
                    listEl.appendChild(li);
                });
            } else {
                // 予定が1個もない場合
                listEl.innerHTML = '<li>登録されている予定はありません</li>';
            }

            // 5. 詳細画面（モーダル）を表示させる
            document.getElementById('scheduleModal').classList.add('is-active');
        }
    });

    const closeModalBtn = document.getElementById('closeModalBtn');
    const scheduleModal = document.getElementById('scheduleModal');

    closeModalBtn.addEventListener('click', function() {
        scheduleModal.classList.remove('is-active');
    });

    scheduleModal.addEventListener('click', function(event) {
        if (event.target === scheduleModal) {
            scheduleModal.classList.remove('is-active');
        }
    });

    const weatherModal = document.createElement('div');
    weatherModal.id = 'weatherModal';
    weatherModal.className = 'weather-modal';
    weatherModal.innerHTML =
        '<div class="weather-modal-content">' +
        '<h3 id="weatherModalTitle"></h3>' +
        '<div id="weatherModalBody"></div>' +
        '<button id="closeWeatherModalBtn" type="button">閉じる</button>' +
        '</div>';
    document.body.appendChild(weatherModal);

    document.getElementById('closeWeatherModalBtn').addEventListener('click', function() {
        weatherModal.classList.remove('is-active');
    });
    weatherModal.addEventListener('click', function(event) {
        if (event.target === weatherModal) {
            weatherModal.classList.remove('is-active');
        }
    });

    // 天気がない日に、透明なダミーイベントを入れて余白を作る
    function fillWeatherPlaceholders() {
        // 既存のダミーを一旦消す
        calendar.getEvents().forEach(event => {
            if (event.extendedProps.isPlaceholder) {
                event.remove();
            }
        });

        // 天気がある日付を集める（priority 1 で、ダミーではないもの）
        const hasWeather = new Set();
        calendar.getEvents().forEach(event => {
            if (event.extendedProps.priority === 1 &&
                !event.extendedProps.isPlaceholder &&
                event.start) {
                const d = event.start;
                hasWeather.add(
                    d.getFullYear() + '-' +
                    String(d.getMonth() + 1).padStart(2, '0') + '-' +
                    String(d.getDate()).padStart(2, '0')
                );
            }
        });

        // 表示中の範囲を1日ずつ見て、天気がない日にだけダミーを追加
        calendar.batchRendering(function() {
            const cur = new Date(calendar.view.activeStart);
            const end = calendar.view.activeEnd;
            while (cur < end) {
                const dateStr =
                    cur.getFullYear() + '-' +
                    String(cur.getMonth() + 1).padStart(2, '0') + '-' +
                    String(cur.getDate()).padStart(2, '0');

                if (!hasWeather.has(dateStr)) {
                    calendar.addEvent({
                        title: '☀️ 晴れ',
                        start: dateStr,
                        allDay: true,
                        className: 'weather-placeholder',   // CSS用（これは書き込みなのでそのまま使えます）
                        extendedProps: {
                            priority: 1,
                            isPlaceholder: true             // 判別用
                        }
                    });
                }
                cur.setDate(cur.getDate() + 1);
            }
        });
    }
    
    calendar.render();

    //天気文字列から絵文字を返す関数
    function getWeatherEmojiFromText(weatherText){
        if (!weatherText) return '❓';
        return weatherText
        .replace(/[\s\u3000]+/g, '')       // 全角・半角スペースを削除
        .replace(/晴れ?/g, '☀️')
        .replace(/曇り?|くもり/g, '☁️')
        .replace(/雷雨|雷/g, '⛈️')
        .replace(/雨/g, '🌧️')
        .replace(/雪/g, '❄️');
        //replace:置き換え　g:全部　?:直前一文字の有無（晴れ、晴）
    }

    function getWeatherEmojiFromCode(code) {
        const c = String(code);

        // ① 登録済みのコードならそのまま返す
        if (WEATHER_CODE_MAP[c]) return WEATHER_CODE_MAP[c];

        // ② 未登録なら先頭の数字で大まかに判定
        switch (c.charAt(0)) {
            case '1': return '☀️ 晴れ';
            case '2': return '☁️ 曇り';
            case '3': return '🌧️ 雨';
            case '4': return '❄️ 雪';
            default:  return '❓';
        }
    }

    //取得したデータを描画する関数
    function fetchWeatherData(areaCode){
    if (!areaCode || areaCode.length < 6) {
        console.warn("有効な地域コードが指定されていません:", areaCode);
        return;
    }
    calendar.getEvents().forEach(event => {
        if (event.extendedProps.priority === 1) {
            event.remove();
        }
    });

    let masterPrefCode;
    if (areaCode.startsWith("01")) {
        // 北海道：日高エリア(01400a)の場合は、親ファイルを014100（十勝・釧路・日高広域）に固定
        if (areaCode === "01400a") {
        masterPrefCode = "014100";
        } else {
        masterPrefCode = areaCode.substring(0, 4) + "00";
        }
    } else if (areaCode.startsWith("46")) {
        // 鹿児島県：気象庁の親ファイルは一律「460100」
        masterPrefCode = "460100";
    } else if (areaCode.startsWith("47")) {
        // 沖縄県：親ファイルが本島・大東島・宮古・八重山に分割されているため、areaCodeの頭4桁+00で完全に分離
        masterPrefCode = areaCode.substring(0, 4) + "00";
    } else {
        // その他の通常の都府県
        masterPrefCode = areaCode.substring(0, 2) + "0000";
    }
    const url = "https://www.jma.go.jp/bosai/forecast/data/forecast/" + masterPrefCode + ".json";

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`サーバーエラーが発生しました (ステータスコード: ${response.status})`);
            }
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data) || data.length === 0) {
                fillWeatherPlaceholders();   // ← ① 追加（データが空でも余白は確保）
                return;
            }
            buildWeatherDetails(data, areaCode); 
            const addedDates = new Set(); //重複登録を防ぐ

            //部屋A　当日分
            const shortTerm = data[0].timeSeries[0];
            const todayRawDate = new Date(shortTerm.timeDefines[0]);
            const tYear = todayRawDate.getFullYear();
            const tMonth = String(todayRawDate.getMonth() + 1).padStart(2, '0');
            const tDay = String(todayRawDate.getDate()).padStart(2, '0');
            const todayStr = tYear + "-" + tMonth + "-" + tDay;

            const targetArea = shortTerm.areas.find(area => area.area.code === areaCode) || shortTerm.areas[0];
            const todayWeatherText = targetArea.weathers[0];
            const todayEmoji = getWeatherEmojiFromText(todayWeatherText);

            calendar.addEvent({
                title: todayEmoji, start: todayStr, allDay: true,
                backgroundColor: 'transparent', borderColor: 'transparent',
                className: 'weather-event',
                extendedProps: {
                    priority: 1
                }, 
            });
            addedDates.add(todayStr);

            //部屋B　明日以降
            const weeklyForecast = data[1];
            const seriesData = weeklyForecast.timeSeries[0];
            const weeklyDates = seriesData.timeDefines; // 7日分の日付リスト
            
            const targetWeeklyArea = weeklyForecast.timeSeries[0].areas.find(area => area.area.code === areaCode) || weeklyForecast.timeSeries[0].areas[0];
            const weeklyCodes = targetWeeklyArea.weatherCodes;

            // 取得した日数分ループしてカレンダーにイベントを追加
            for (let i = 0; i < weeklyDates.length; i++) {
                // 気象庁の日付（YYYY-MM-DD）を取得
                const rawDate = new Date(weeklyDates[i]);
                const year = rawDate.getFullYear();
                const month = String(rawDate.getMonth() + 1).padStart(2, '0');
                const day = String(rawDate.getDate()).padStart(2, '0');
                const dateStr = `${year}-${month}-${day}`; // FullCalendarが認識できる「YYYY-MM-DD」形式

                if(addedDates.has(dateStr)){
                    continue;
                }
                const weatherEmoji = getWeatherEmojiFromCode(weeklyCodes[i]);

                calendar.addEvent({
                    title: weatherEmoji, start: dateStr, allDay: true,
                    backgroundColor: 'transparent', borderColor: 'transparent',
                    className: 'weather-event',
                    extendedProps: {
                        priority: 1
                    }, 
                });
            }
            fillWeatherPlaceholders();
        })
        .catch(error => {
            console.error('天気データの取得に失敗しました:', error.message || error);
            fillWeatherPlaceholders();
        });
    }

    function buildWeatherDetails(data, areaCode) {
        Object.keys(weatherDetails).forEach(k => delete weatherDetails[k]);

        const getDetail = (dateStr) =>
            weatherDetails[dateStr] || (weatherDetails[dateStr] = { pops: [] });
        const pickArea = (series) =>
            series.areas.find(a => a.area.code === areaCode) || series.areas[0];

        const short = data[0].timeSeries;

        // 天気の文章・風（今日〜明後日）
        const wArea = pickArea(short[0]);
        short[0].timeDefines.forEach((t, i) => {
            const detail = getDetail(dateToStr(new Date(t)));
            detail.text = (wArea.weathers[i] || '').replace(/\u3000/g, ' ');
            detail.wind = (wArea.winds && wArea.winds[i] || '').replace(/\u3000/g, ' ');
        });

        // 降水確率（6時間ごと）
        if (short[1]) {
            const pArea = pickArea(short[1]);
            short[1].timeDefines.forEach((t, i) => {
                const pop = pArea.pops[i];
                if (pop === undefined || pop === '') return;
                const d = new Date(t);
                const h = d.getHours();
                getDetail(dateToStr(d)).pops.push({
                    label: h + '〜' + (h + 6) + '時',
                    value: pop
                });
            });
        }

        // 最低・最高気温（00時の枠が最低、09時の枠が最高）
        if (short[2]) {
            const tArea = short[2].areas[0];
            short[2].timeDefines.forEach((t, i) => {
                const v = tArea.temps[i];
                if (v === '' || v === undefined) return;
                const d = new Date(t);
                const detail = getDetail(dateToStr(d));
                if (d.getHours() < 9) detail.min = v; else detail.max = v;
            });
        }

        // 週間予報（明日以降の降水確率・気温の幅）
        const weekly = data[1];
        if (weekly) {
            const wk0 = weekly.timeSeries[0];
            const wkArea = pickArea(wk0);
            wk0.timeDefines.forEach((t, i) => {
                const detail = getDetail(dateToStr(new Date(t)));
                if (wkArea.pops && wkArea.pops[i] !== '') detail.dailyPop = wkArea.pops[i];
            });
            const wk1 = weekly.timeSeries[1];
            if (wk1) {
                const tArea = wk1.areas[0];
                wk1.timeDefines.forEach((t, i) => {
                    const detail = getDetail(dateToStr(new Date(t)));
                    if (detail.min === undefined && tArea.tempsMin[i]) detail.min = tArea.tempsMin[i];
                    if (detail.max === undefined && tArea.tempsMax[i]) detail.max = tArea.tempsMax[i];
                });
            }
        }
    }

    // 天気の詳細モーダルを開く
    function showWeatherModal(dateStr, emojiTitle, isPlaceholder) {
        const detail = isPlaceholder ? null : weatherDetails[dateStr];
        document.getElementById('weatherModalTitle').textContent = emojiTitle + '　' + dateStr + ' の天気';
        const body = document.getElementById('weatherModalBody');
        body.innerHTML = '';

        const addRow = (label, value) => {
            const p = document.createElement('p');
            const b = document.createElement('strong');
            b.textContent = label + '：';
            p.appendChild(b);
            p.appendChild(document.createTextNode(value));
            body.appendChild(p);
        };

        if (!detail) {
            const p = document.createElement('p');
            p.textContent = 'この日の詳しい情報はありません（予報の範囲外です）。';
            body.appendChild(p);
        } else {
            if (detail.text) addRow('天気', detail.text);
            if (detail.wind) addRow('風', detail.wind);
            if (detail.max !== undefined) addRow('最高気温', detail.max + '℃');
            if (detail.min !== undefined) addRow('最低気温', detail.min + '℃');

            if (detail.pops.length > 0) {
                const title = document.createElement('p');
                title.innerHTML = '<strong>降水確率</strong>';
                body.appendChild(title);

                const table = document.createElement('table');
                table.className = 'weather-pop-table';
                const head = table.insertRow();
                const vals = table.insertRow();
                detail.pops.forEach(p => {
                    const th = document.createElement('th');
                    th.textContent = p.label;
                    head.appendChild(th);
                    vals.insertCell().textContent = p.value + '%';
                });
                body.appendChild(table);
            } else if (detail.dailyPop !== undefined) {
                addRow('降水確率', detail.dailyPop + '%');
            }
        }
        document.getElementById('weatherModal').classList.add('is-active');
    }
    window.showWeatherModal = showWeatherModal;

    const prefSelect = document.getElementById('pref-select');
    const areaSelect = document.getElementById('area-select');

    //都道府県セレクトボックス
    for (const pref in areaData) {
    const option = document.createElement('option');
    option.value = pref;
    option.textContent = pref;
    prefSelect.appendChild(option);
    }

    // 都道府県が選ばれたら、市（地域）の選択肢を書き換える関数
    function updateAreaSelect() {
    while (areaSelect.firstChild) {
        areaSelect.removeChild(areaSelect.firstChild);
    }
    const selectedPref = prefSelect.value;
    const areas = areaData[selectedPref];

    if(areas) {
        for (const areaName in areas) {
        const option = document.createElement('option');
        option.value = areas[areaName];
        option.textContent = areaName;
        areaSelect.appendChild(option);
        }
    }
    fetchWeatherData(areaSelect.value);
    }

    

    prefSelect.addEventListener('change', function() {
    updateAreaSelect();
    });

    areaSelect.addEventListener('change', function() {
    fetchWeatherData(areaSelect.value);
    });

    prefSelect.value = "愛知県";
    updateAreaSelect();

});

