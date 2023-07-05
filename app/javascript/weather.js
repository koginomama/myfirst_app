document.addEventListener('DOMContentLoaded', function() {

document.getElementById('refresh-button').addEventListener('click', function() {

  const apikey =  process.env.WEATHER_API_KEY;
  const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?zip=270-0005,jp&cnt=1&lang=ja&appid=' + apikey + '&units=metric';

  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const temperature = Math.round(data.list[0].main.temp) + '°'; // 温度情報の取得
    const temperatureElement = document.getElementById('weather-temperature'); // 温度を表示する要素の取得
    temperatureElement.textContent = temperature; // 温度を要素に表示
  })
  .catch(error => {
    // エラーハンドリング
    console.error('APIエラー:', error);
  });
});
});
