import React, { useState } from 'react'

const Filter = ({persons}) =>{
    
    const [filter, setFilter] = useState('')
    const [filterArr,setFilterArr] = useState([])


    const handleFilterChange = (event) =>{
        setFilter(event.target.value)
      }
    
      const addFilter = (event) =>{
        event.preventDefault();
        const x = persons.filter(person => person.name.includes(filter))
        setFilterArr(x)
      }

      return(
          <>
            <form onSubmit={addFilter}>
                <div>
                    filter shown with <input value={filter} onChange={handleFilterChange}/>
                </div>
                <div>
                    <button type="submit">filter</button>
                </div>

      
            </form>
                <ul>
                    {filterArr.map(({name,number}) => <li key={'filter'+name}>{name} {number}</li>)}
                </ul>
          </>
      )
}

export default Filter