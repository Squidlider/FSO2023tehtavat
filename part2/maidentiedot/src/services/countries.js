import axios from 'axios'
const API_KEY = process.env.REACT_APP_API_KEY

const getAll = () => {
  return axios
    .get('https://restcountries.com/v3.1/all')
    .then((response) => response.data)
}

const getWeather = (capital) => {
  return axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}&units=metric`
    )
    .then((response) => response.data)
}

export default { getAll, getWeather }
