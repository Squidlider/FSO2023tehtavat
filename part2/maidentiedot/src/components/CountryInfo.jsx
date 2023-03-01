const CountryInfo = ({selectedCountry}) => {
    if (!selectedCountry) {
        return null
      }

    const languages = Object.values(selectedCountry.languages)
    return (
        <div>
        <h3>{selectedCountry.name.common}</h3>
        <p>Capital: {selectedCountry.capital}</p>
        <p>Area: {selectedCountry.area}</p>
        <b>Languages</b>
        {languages.map((value, index) => (
            <li key={index}>{value}</li>
        ))}
        <img src={selectedCountry.flags.png} alt={selectedCountry.flags.alt}/>
        </div>
    )
}

export default CountryInfo