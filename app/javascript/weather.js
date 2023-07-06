document.addEventListener('DOMContentLoaded', function() {

document.getElementById('refresh-button').addEventListener('click', function() {

  const apikey =  process.env.WEATHER_API_KEY;
  const geoapi = `https://api.openweathermap.org/geo/1.0/zip?zip=${currentUserPostalCode},jp&appid=${apikey}`
  fetch(geoapi)
  .then(response => response.json())
  .then(data => {
    const geolat = data.lat
    const geolon = data.lon
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${geolat}&lon=${geolon}&cnt=1&lang=ja&appid=${apikey}&units=metric`;

  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const temperature = Math.round(data.list[0].main.temp); // 温度情報の取得
    const temp_max = Math.round(data.list[0].main.temp_max);
    const temp_min = Math.round(data.list[0].main.temp_min);
    const weatherPattern = data.list[0].weather[0].icon; 
    const temperatureElement = document.getElementById('weather-temperature'); // 温度を表示する要素の取得
    const tempMaxElement = document.getElementById('temp-max');
    const tempMinElement = document.getElementById('temp-min');
    const weatherIconElement = document.getElementById('weather-icon');
    if (weatherPattern === '01d') {
      weatherIconElement.innerHTML = '<img src="/assets/hare.png" alt="晴れ">';
    } else if (weatherPattern === '02d') {
      weatherIconElement.innerHTML = '<img src="/assets/kumori_hare.png" alt="曇り晴れ">';
    } else if (weatherPattern === '03d') {
      weatherIconElement.innerHTML = '<img src="/assets/kumori.png" alt="曇り">';
    } else if (weatherPattern === '04d') {
      weatherIconElement.innerHTML = '<img src="/assets/kumori.png" alt="曇り">';
    } else if (weatherPattern === '09d') {
      weatherIconElement.innerHTML = '<img src="/assets/niwaka_ame.png" alt="にわか雨">';
    } else if (weatherPattern === '10d') {
      weatherIconElement.innerHTML = '<img src="/assets/rainy.png" alt="雨">';
    } else if (weatherPattern === '11d') {
      weatherIconElement.innerHTML = '<img src="/assets/kaminari.png" alt="雷雨">';
    } else if (weatherPattern === '13d') {
      weatherIconElement.innerHTML = '<img src="/assets/yuki.png" alt="雪">';
    } else if (weatherPattern === '50d') {
      weatherIconElement.innerHTML = '<img src="/assets/yama_kiri.png" alt="霧">';
    }

    temperatureElement.textContent = temperature + "°"; // 温度を要素に表示
    tempMaxElement.textContent = temp_max + '°';
    tempMinElement.textContent = temp_min + '°';

    // if (temperature >= 25) {
    //   document.getElementById('weather-icon').innerHTML = '<img src="/assets/hare.png" alt="晴れ">';
    // } else {
    //   document.getElementById('weather-icon').innerHTML = '<img src="/assets/rainy.png" alt="雨">';
    // }
  })
  })
  .catch(error => {
    // エラーハンドリング
    console.error('APIエラー:', error);
  });
});
});
