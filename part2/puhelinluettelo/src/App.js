import { useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/Personlist'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setNewFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])

  const addNewPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      phone: newPhone,
    }

    if (persons.some((p) => p.name === person.name)) {
      alert(`${person.name} is already added to phonebook`)
    } else {
      setPersons(persons.concat(person))
    }
    setNewName('')
    setNewPhone('')
  }

  const handleOnNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleOnPhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    setFilteredPersons(
      persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    )
  }

  const listToShow = !filter ? persons : filteredPersons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <PersonForm
        handleOnNameChange={handleOnNameChange}
        handleOnPhoneChange={handleOnPhoneChange}
        addNewPerson={addNewPerson}
        newName={newName}
        newPhone={newPhone}
      />
      <h2>Numbers</h2>
      <PersonList listToShow={listToShow} />
    </div>
  )
}

export default App
