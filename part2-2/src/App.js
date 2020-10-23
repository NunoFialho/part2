import React, { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import Person from "./components/Person"
import PersonForm from "./components/PersonForm"
import Comm from './services/Comm'
import Notification from './components/Notification'
import './index.css'



const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ message, setMessage ] = useState('')
  
  useEffect(() =>{
    Comm.getAll().then(
      response => {
        setPersons(response)
      }
    )
  }, [])


  const delet = (id,name) =>{
    if(window.confirm('Delete '+name+'?')){
      Comm.deleteItem(id).then(
        setPersons(persons.filter(n => n.id !== id))
      ).catch(error =>
        setMessage(name+' was already removed from server')
      )
      setTimeout(() => {
        setMessage(null)
      }, 2000)
    }   
    
  }
  return (
    <>
      <h2>Phonebook</h2>
      <Filter persons={persons}/>
      <Notification className='error' message={message}/>
      <h2>Add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <ul>
        <Person persons={persons} func={delet}/>
      </ul>
    </>
  )
}

export default App