const PersonList = ({listToShow, handleDelete}) => {
    return (
        listToShow.map((person) => (
            <div key={person.id}>
              {person.name} {person.phone} <button onClick={() => handleDelete(person.id)}>Delete</button>
            </div>
          ))
    )
}

export default PersonList