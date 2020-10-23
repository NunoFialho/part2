import React from 'react'



const Person = ({persons, func}) =>{
    
    return(
        <>
            {persons.map(({name, number,id})=><li key={name}>{name} {number} <button onClick={()=>func(id,name)}>delete</button></li>)}
        </>
    )
}

export default Person