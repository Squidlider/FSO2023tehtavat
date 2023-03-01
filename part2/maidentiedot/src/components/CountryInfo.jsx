const CountryInfo = ({selectedCountry, weather}) => {
    if (!selectedCountry) {
        return null
      }
    
    const renderWeather = () => {
            //Koska setWeather on asyncronin niin välillä tämä komponentti saa undefined arvon
            if (!weather) {
                return null
            }

            const iconCode = weather.weather[0].icon
            return (
                <>
                <h3>Weather in {selectedCountry.capital}</h3>
                <p>{weather.main.temp} degrees Celcius</p>
                <img src={`https://openweathermap.org/img/w/${iconCode}.png`} alt=''/>
                <p>Wind {weather.wind.speed}</p>
                </>
            )
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
        {renderWeather()}
        </div>
    )
}

export default CountryInfo