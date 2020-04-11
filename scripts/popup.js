document.addEventListener('DOMContentLoaded', function () {

  WeatherService('tunis')
    .then(resp => {

      let container = document.querySelector('.container');
      let desc = resp.current.weather_descriptions[0].toLowerCase().replace(/\s+/g, '_');
      let img = 'https://weatherstack.com/site_images/weather_icon_' + desc + '.svg';

      container.innerHTML = `
    <h3 class="mb-10">${resp.request.query}</h3>
    <small>${new Date(resp.location.localtime).toString().slice(0, 15)}</small>

    <div class="w-100 desc">

      <div class="d-flex-column">
        <img src=${img} alt=${resp.current.temperature} />
        <span class="w-desc">${resp.current.weather_descriptions}</span>
      </div>

      <h1>${resp.current.temperature}°C</h1> 
      
    </div>

    <div class="details">

        <div class="d-flex-column">
          <span class="cl-blue-sky">Wind speed</span>
          <span>${resp.current.wind_speed} kmph</span>
        </div>

        <div class="d-flex-column">
          <span class="cl-blue-sky">Humidity</span>
          <span>${resp.current.humidity} %</span>
        </div>

        <div class="d-flex-column">
          <span class="cl-blue-sky">Pressure</span>
          <span>${resp.current.pressure} mb</span>
        </div>
        
      </div>`;
    });
});
