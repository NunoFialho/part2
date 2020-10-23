import React, { useState } from 'react'
import Notification from './Notification'
import Comm from 'C:/Users/PC/Desktop/FullStack/part2/part2-2/src/services/Comm.js'
import './index.css'

const PersonForm = ({persons, setPersons}) => {
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState(0)
  const [message, setMessage ] = useState(null)

  const handleNoteChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber
    }
    const i = persons.filter(person => person.name === newName)
    if(i.length===0){  
      Comm.create(nameObject).then(
          returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setMessage('Added '+newName)
            setNewName('')
            setNewNumber(0)       
            setTimeout(() => {
              setMessage(null)
            }, 2000)
          }
      )
    }else{
      if(window.confirm(newName+' is already on the list, replace older number with new one?')){
          const old = persons.find(element => element.name===newName)
          const id = old.id
          Comm.update(id, nameObject).then(
            returnedPerson => {
              setPersons(persons.map(element => element.id===returnedPerson.id? returnedPerson : element))
              setMessage('Update number for '+newName)
              setNewName('')
              setNewNumber(0)
              setTimeout(() => {
                setMessage(null)
              }, 2000)
            }
          )
      }
    }
    
  }

    return(
        <>
            <Notification className='notify' message={message}/>
            <form onSubmit={addName}>
                <div>
                    name: <input value={newName} onChange={handleNoteChange}/>
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleNumberChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    )

}

export default PersonForm