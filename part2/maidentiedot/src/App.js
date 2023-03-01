import { useEffect, useState } from 'react'
import CountryList from './components/CountryList'
import Search from './components/Search'
import countryService from './services/countries'
import CountryInfo from './components/CountryInfo'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState()
  const [weather, setWeather] = useState()

  useEffect(() => {
    countryService.getAll().then((initialCountries) => {
      setCountries(initialCountries)
    })
  }, [])

  useEffect(() => {
    if (filteredCountries.length === 1) {
      const country = filteredCountries[0]
      setSelectedCountry(country)
      countryService.getWeather(country.capital).then((weather) => {
        setWeather(weather)
      })
    } else {
      setSelectedCountry(null)
    }
  }, [filteredCountries])

  const handleFilterChange = (event) => {
    const value = event.target.value
    setFilter(value)
    setFilteredCountries(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(value.toLowerCase())
      )
    )
  }

  const handleSelectCountryClick = (name) => {
    const country = countries.filter((c) => c.name.common === name)[0]

    Promise.all([countryService.getWeather(country.capital)]).then(
      ([localWeather]) => {
        setSelectedCountry(country)
        setWeather(localWeather)
      }
    )
  }

  return (
    <>
      <Search filter={filter} handleFilterChange={handleFilterChange} />
      <CountryList
        countries={filteredCountries}
        handleSelectCountryClick={handleSelectCountryClick}
      />
      <CountryInfo selectedCountry={selectedCountry} weather={weather} />
    </>
  )
}

export default App
