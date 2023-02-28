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

  useEffect(() => {
    countryService.getAll().then((initialCountries) => {
      setCountries(initialCountries)
    })
  }, [])

  useEffect(() => {
    if (filteredCountries.length === 1) {
      setSelectedCountry(filteredCountries[0])
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
    const country = countries.filter((c) => c.name.common === name)
    setSelectedCountry(...country)
  }

  return (
    <>
      <Search filter={filter} handleFilterChange={handleFilterChange} />
      <CountryList
        countries={filteredCountries}
        handleSelectCountryClick={handleSelectCountryClick}
      />
      <CountryInfo selectedCountry={selectedCountry} />
    </>
  )
}

export default App
