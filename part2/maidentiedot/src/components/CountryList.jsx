const CountryList = ({countries, handleSelectCountryClick}) => {
    if(countries.length > 9) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    }

    return (
        countries.map(country => (
            <>
            <li key={country.name.common}>{country.name.common}
            <button onClick={() => handleSelectCountryClick(country.name.common)}>Select</button>
            </li>
            </>
        )
    )
)
}

export default CountryList