import { useState, useEffect, } from 'react';
import Person from './components/Person';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Notification from './components/notification';
import personService from './services/persons';


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameSearch, setNameSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  useEffect(() => {
    console.log('Component mounted or updated')

    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const nameExists = persons.some(person => person.name === newName)
    if (nameExists) {
      setErrorMessage(`${newName} is already added to phonebook`)
      setMessageType('error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return
    }

    const numberExists = persons.some(person => person.number === newNumber)
    if (numberExists) {
      setErrorMessage(`${newNumber} is already added to phonebook`)
      setMessageType('error')
      setTimeout(() => {
        setErrorMessage(null)
      }
      , 5000)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
      // id jätetään palvelimen hoidettavaksi
    }

    personService
      .create(personObject)
      .then(returnetPerson => {
        setPersons(persons.concat(returnetPerson))
        setNewName('')
        setNewNumber('')
        setErrorMessage(`Added ${returnetPerson.name}`)
        setMessageType('success')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      .catch(error => {
          console.log(error.response.data.error) 
          setErrorMessage(
            `${error.response.data.error}`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }


  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameSearch = (event) => {
    setNameSearch(event.target.value)
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(nameSearch.toLowerCase())
  );

  const deletePersonById = (id) => {
    const personToDelete = persons.find(person => person.id === id);
      const confirm = window.confirm('Do you really want to delete ' + personToDelete.name + '?');
      if (confirm) {
        personService
          .remove(id)
          .then(() => {
            setPersons(persons.filter(person => person.id !== id));
            setErrorMessage(`Deleted ${personToDelete.name}`)
            setMessageType('success')
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
          .catch(error => {
            console.log(error.response.data.error)
            setErrorMessage(`${personToDelete.name} has already been removed from server`)
            setMessageType('error')
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(person => person.id !== id));
          })

      }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter nameSearch={nameSearch} handleNameSearch={handleNameSearch} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        addPerson={addPerson}
      />

      <h2>Numbers</h2>
      <div>
        {filteredPersons.map((person) => (
          <Person key={person.id}
          person={person}
          deletePerson={() => deletePersonById(person.id)}/>
        ))}
      </div>
      <Notification message={errorMessage} type={messageType}/>
    </div>
  );
};

export default App
