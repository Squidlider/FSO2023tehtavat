import { useEffect, useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/Personlist'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setNewFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])
  const [errorMessage, setErrorMessage] = useState({
    message: null,
    error: false,
  })

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  const addNewPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      phone: newPhone,
    }

    if (persons.some((p) => p.name === person.name)) {
      const personId = persons.find((p) => p.name === person.name)
      const changedPerson = { ...person, phone: newPhone }
      if (
        window.confirm(
          `${person.name} on jo lisätty puhelinluetteloon, haluatko korvata yhteystiedon?`
        )
      ) {
        personService.update(personId.id, changedPerson).then(
          (returnedPerson) =>
            setPersons(
              persons.map((person) =>
                person.id !== personId.id ? person : returnedPerson
              )
            ),
          setErrorMessage({
            message: 'Yhteystiedon päivitys onnistui',
            error: false,
          }),
          setTimeout(() => {
            setErrorMessage({ message: null, error: false })
          }, 5000)
        )
      }
    } else {
      personService.create(person).then((addedPerson) => {
        setPersons(persons.concat(addedPerson))
        setErrorMessage({
          message: 'Uuden yhteystiedon lisäys onnistui',
          error: false,
        })
        setTimeout(() => {
          setErrorMessage({ message: null, error: false })
        }, 5000)
      })
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

  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id)
    if (
      window.confirm(`Haluatko varmasti poistaa yhteystiedon ${person.name}?`)
    ) {
      personService
        .trash(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id))
          setErrorMessage({ message: 'Poisto onnistui', error: false })
          setTimeout(() => {
            setErrorMessage({ message: null, error: false })
          }, 5000)
        })
        .catch((error) => {
          setErrorMessage({
            message: `${person.name} already been deleted from server`,
            error: true,
          })
        })
    }
  }

  const listToShow = !filter ? persons : filteredPersons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Lisää uusi</h2>
      <Notification message={errorMessage.message} error={errorMessage.error} />
      <PersonForm
        handleOnNameChange={handleOnNameChange}
        handleOnPhoneChange={handleOnPhoneChange}
        addNewPerson={addNewPerson}
        newName={newName}
        newPhone={newPhone}
      />
      <h2>Luettelo</h2>
      <PersonList listToShow={listToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App
