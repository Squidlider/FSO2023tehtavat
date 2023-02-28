const PersonForm = ({addNewPerson, newName, handleOnNameChange, handleOnPhoneChange, newPhone}) => {
    return (
        <form onSubmit={addNewPerson}>
        <div>
          name: <input required value={newName} onChange={handleOnNameChange} />
        </div>
        <div>
          Puhelinnumero:
          <input required value={newPhone} onChange={handleOnPhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm