document.addEventListener('DOMContentLoaded', function() {

  //6時間ごとの時刻の表示機能
  function updateTime() {
    const currentTime = new Date();
    const day = currentTime.getDate();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const sixHoursLater = new Date(currentTime.getTime() + 6 * 60 * 60 * 1000);
    const sixHoursLaterHour = sixHoursLater.getHours();
    const sixDay = sixHoursLater.getDate();
    const twelveHoursLater = new Date(currentTime.getTime() + 12 * 60 * 60 * 1000);
    const twelveHoursLaterHour = twelveHoursLater.getHours();
    const twelveDay = sixHoursLater.getDate();
    const eighteenHoursLater = new Date(currentTime.getTime() + 18 * 60 * 60 * 1000);
    const eighteenHoursLaterHour = eighteenHoursLater.getHours();
    const eighteenDay = sixHoursLater.getDate();

    const currentTimeString = `${day}日　${currentHour.toString().padStart(2, '0')}時${currentMinute.toString().padStart(2, '0')}分`;
    document.getElementById('current-time-later').textContent = currentTimeString;

    const sixHoursLaterString = `${sixDay}日　${sixHoursLaterHour.toString().padStart(2, '0')}時頃`;
    document.getElementById('six-hours-later').textContent = sixHoursLaterString;

    const twelveHoursLaterString = `${twelveDay}日　${twelveHoursLaterHour.toString().padStart(2, '0')}時頃`;
    document.getElementById('twelve-hours-later').textContent = twelveHoursLaterString;

    const eighteenHoursLaterString = `${eighteenDay}日　${eighteenHoursLaterHour.toString().padStart(2, '0')}時頃`;
    document.getElementById('eighteen-hours-later').textContent = eighteenHoursLaterString;
  }

  updateTime();
  setInterval(updateTime, 1000);

  //ボタンクリック後の処理
document.getElementById('refresh-button').addEventListener('click', function() {

  //APIの呼び出しとデータの抽出
  const apikey =  process.env.WEATHER_API_KEY;
  const geoapi = `https://api.openweathermap.org/geo/1.0/zip?zip=${currentUserPostalCode},jp&appid=${apikey}`
  fetch(geoapi)
  .then(response => response.json())
  .then(data => {
    const geolat = data.lat
    const geolon = data.lon
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${geolat}&lon=${geolon}&cnt=9&lang=ja&appid=${apikey}&units=metric`;

  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const temppop3 = data.list[0].pop; // 降水確率情報の取得、変数の数字は時間帯を示している。
    const temppop9 = data.list[2].pop; 
    const temppop15 = data.list[4].pop; 
    const temppop21 = data.list[6].pop; 
    const temp_max = (data.list[0].main.temp_max); // 最高気温
    const temp_max9 = Math.round(data.list[2].main.temp_max);
    const temp_max15 = Math.round(data.list[4].main.temp_max);
    const temp_max21 = Math.round(data.list[6].main.temp_max);
    const temp_min = Math.round(data.list[0].main.temp_min); // 最低気温
    const temp_min9 = Math.round(data.list[2].main.temp_min); 
    const temp_min15 = Math.round(data.list[4].main.temp_min); 
    const temp_min21 = Math.round(data.list[6].main.temp_min); 
    const weatherPattern = data.list[0].weather[0].icon;  // 天候アイコン情報
    const weatherPattern9 = data.list[2].weather[0].icon;
    const weatherPattern15 = data.list[4].weather[0].icon;
    const weatherPattern21 = data.list[6].weather[0].icon;
    const tempAverage = Math.round(data.list[2].main.temp);
    const temperatureElement3 = document.getElementById('weather-temperature');// 温度を表示する要素の取得
    const temperatureElement9 = document.getElementById('weather-temperature9'); 
    const temperatureElement15 = document.getElementById('weather-temperature15');
    const temperatureElement21 = document.getElementById('weather-temperature21');
    const tempMaxElement = document.getElementById('temp-max');
    const tempMaxElement9 = document.getElementById('temp-max9');
    const tempMaxElement15 = document.getElementById('temp-max15');
    const tempMaxElement21 = document.getElementById('temp-max21');
    const tempMinElement = document.getElementById('temp-min');
    const tempMinElement9 = document.getElementById('temp-min9');
    const tempMinElement15 = document.getElementById('temp-min15');
    const tempMinElement21 = document.getElementById('temp-min21');
    const weatherIconElement = document.getElementById('weather-icon');
    const weatherIconElement9 = document.getElementById('weather-icon9');
    const weatherIconElement15 = document.getElementById('weather-icon15');
    const weatherIconElement21 = document.getElementById('weather-icon21');
    

    //気候の条件分岐
    function setWeatherIcon(iconName, element) {
      let iconSrc = '';
      switch (iconName) {
        case '01d':
        case '01n':
          iconSrc = '/images/hare.png';
          break;
        case '02d':
        case '02n':
          iconSrc = '/images/kumori_hare.png';
          break;
        case '03d':
        case '03n':
        case '04d':
        case '04n':
          iconSrc = '/images/kumori.png';
          break;
        case '09d':
        case '09n':
          iconSrc = '/images/niwaka_ame.png';
          break;
        case '10d':
        case '10n':
          iconSrc = '/images/rainy.png';
          break;
        case '11d':
        case '11n':
          iconSrc = '/images/kaminari.png';
          break;
        case '13d':
        case '13n':
          iconSrc = '/images/yuki.png';
          break;
        case '50d':
        case '50n':
          iconSrc = '/images/yama_kiri.png';
          break;
        default:
          iconSrc = '';
      }
      element.innerHTML = `<img src="${iconSrc}" alt="${iconName}">`;
    }

    //HTML側への受け渡し
    temperatureElement3.textContent = Math.round(temppop3 * 100) + "%"; // 温度を要素に表示
    temperatureElement9.textContent = Math.round(temppop9 * 100) + "%";
    temperatureElement15.textContent = Math.round(temppop15 * 100) + "%";
    temperatureElement21.textContent = Math.round(temppop21 * 100) + "%";
    tempMaxElement.textContent = Math.round(temp_max) ;
    tempMaxElement9.textContent = temp_max9 ;
    tempMaxElement15.textContent = temp_max15 ;
    tempMaxElement21.textContent = temp_max21 ;
    tempMinElement.textContent = temp_min ;
    tempMinElement9.textContent = temp_min9 ;
    tempMinElement15.textContent = temp_min15 ;
    tempMinElement21.textContent = temp_min21 ;
    setWeatherIcon(weatherPattern, weatherIconElement);
    setWeatherIcon(weatherPattern9, weatherIconElement9);
    setWeatherIcon(weatherPattern15, weatherIconElement15);
    setWeatherIcon(weatherPattern21, weatherIconElement21);

    // 温度による条件分岐を行い、適切なテキストと画像を表示
    const imageElement = document.getElementById('select-image');
    const textElement = document.getElementById('select-text');
    const textExpElement = document.getElementById('select-text-exp');


    if (tempAverage < 0) {
      textElement.textContent = "肌着2枚＋長袖ウエア" ;
      textExpElement.textContent = "肌寒い日には肌着を1枚プラスして体温調節。冷え込む朝はおくるみを用意しましょう。" ;
      if (currentUserGender == 1) {
        imageElement.src = '/images/test0b.jpg';
      } else {
        imageElement.src = '/images/test0g.jpg';
      }
    } else if (tempAverage >= 0 && tempAverage <= 5) {
      textElement.textContent = "肌着2枚＋長袖ウエア " ;
      textExpElement.textContent = "急に冷え込む肌寒い日には、肌着を2枚重ねて保温し、さらに長袖のウエアを着せましょう。おくるみなどのアイテムをプラスして体温調節も重要です。" ;
      if (currentUserGender == 1) {
        imageElement.src = '/images/test5b.jpg';
      } else {
        imageElement.src = '/images/test5g.jpg';
      };
    } else if (tempAverage >= 6 && tempAverage <= 10) {
      textElement.textContent = "肌着1〜2枚＋長袖ウエア" ;
      textExpElement.textContent = "肌寒い日には肌着を1枚プラスして体温調節。冷え込む朝はおくるみを用意しましょう。" ;
      if (currentUserGender == 1) {
        imageElement.src = '/images/test10b.jpg';
      } else {
        imageElement.src = '/images/test10g.jpg';
      };
    } else if (tempAverage >= 11 && tempAverage <= 15) {
      textElement.textContent = "肌着1〜2枚＋長袖ウエア" ;
      textExpElement.textContent = "比較的冷涼な気温なので、重ね着が必要です。長袖の肌着とロンパースの上にセーターや薄手のジャンパーを重ね、パンツと靴下も合わせましょう。" ;
      if (currentUserGender == 1) {
        imageElement.src = '/images/test15b.jpg';
      } else {
        imageElement.src = '/images/test15g.jpg';
      };
    } else if (tempAverage >= 16 && tempAverage <= 20) {
      textElement.textContent = "肌着1枚＋半袖シャツ1枚" ;
      textExpElement.textContent = "涼しい気温なので、長袖の肌着を追加して保温性を高めます。ロンパースの上に薄手のカーディガンを重ね、薄手のパンツも合わせておくと良いでしょう。" ;
      if (currentUserGender == 1) {
        imageElement.src = '/images/test20b.jpg';
      } else {
        imageElement.src = '/images/test20g.jpg';
      };
    } else if (tempAverage >= 21 && tempAverage <= 25) {
      textElement.textContent = "肌着1枚＋半袖シャツ1枚" ;
      textExpElement.textContent = "暖かい気温ですが、赤ちゃんを直接の日差しから保護するために長袖もおすすめです。軽やかな素材のものを選ぶと良いでしょう。" ;
      if (currentUserGender == 1) {
        imageElement.src = '/images/test20b.jpg';
      } else {
        imageElement.src = '/images/test20g.jpg';
      };
    } else if (tempAverage >= 26 && tempAverage <= 30) {
      textElement.textContent = "肌着1枚＋半袖シャツ1枚" ;
      textExpElement.textContent = "半袖のウエアがおすすめです！室内では肌着のみの着用でも⭕️。適度な通気性と涼しさを確保するために、薄手の素材を選びましょう！" ;
      if (currentUserGender == 1) {
        imageElement.src = '/images/test26b.jpg';
      } else {
        imageElement.src = '/images/test26g.jpg';
      };
    } else {
      textElement.textContent = "肌着1枚or半袖シャツ1枚" ;
      textExpElement.textContent = "室温も高くなる猛暑日は肌着1枚で過ごせます。エアコンの効かせすぎに注意し、冷房対策として薄手の長袖があると安心。汗をたくさんかくようなら、汗取りパットを背中に入れてあせも対策を。" ;
      if (currentUserGender == 1) {
        imageElement.src = '/images/test30b.jpg';
      } else {
        imageElement.src = '/images/test30g.jpg';
      };
    }
  })
  })
  .catch(error => {
    // エラーハンドリング
    console.error('APIエラー:', error);
  });
});
});
