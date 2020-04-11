// https://api.weatherbit.io/v2.0/current?city=Raleigh,NC&key=


async function WeatherService (city) {
  const API_KEY = 'access_key=';

  try {
    let resp = await fetch(`http://api.weatherstack.com/current?${API_KEY}&query=${city}`);
    let respJson = await resp.json();
    //localStorage.setItem('w-now', JSON.stringify({ date: Date.now(), response: respJson }));
    return respJson;
  } catch (error) {
    return error.message;
  }
}

function checkDate () {
  let local = localStorage.getItem('w-now');
  if (local) {
    local = JSON.parse(localStorage.getItem('w-now'));
    let dateLastFetch = local.date;
    let oneDay = 1000 * 20;
    let dateNow = Date.now();
    return (parseInt(dateLastFetch, 10) + oneDay >= dateNow) ? {} : local;
  }
  else return {};
}