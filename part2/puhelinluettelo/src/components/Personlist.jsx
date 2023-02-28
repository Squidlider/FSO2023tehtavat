const PersonList = ({listToShow}) => {
    return (
        listToShow.map((person) => (
            <li key={person.name}>
              {person.name} {person.phone}
            </li>
          ))
    )
}

export default PersonList