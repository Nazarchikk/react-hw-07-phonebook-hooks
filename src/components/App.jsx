import { useState } from "react";
import { nanoid } from 'nanoid'
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList"
import Filter from "./Filter/Filter"

export default function App (){
  const [contacts, setContacts] = useState([   
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ])
  const [filter, setFilter] = useState('')
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
    const valueInputName = (e) => {
      setName(e.target.value)
    }
    const valueInputNumber = (e) => {
      setNumber( e.target.value )
    }
  const addContact = (e) => {
    e.preventDefault();
    const existingContact = contacts.some(contact => contact.name === name);
    if(existingContact){
      return alert(`${name} is name not found in contact`)
    }
    setContacts(
      [{id: 'id-' + nanoid(1), name: name , number: number}, ...contacts]
    )
    reset()
  }
  const valueFilter = (e) => {
    setFilter(e.target.value)
  } 
  const filterInputHandler = () =>
    contacts.filter((item) =>
      item.name.toLowerCase().includes(filter.toLowerCase())
  );
  const buttonDelete = (contactId) => {
    setContacts((state) => (
      state.filter(
        (contact) => contact.id !== contactId
      )
    ))
    
  }
  console.log()
  const reset = () => {
    setName('')
    setNumber('')
  }
    return(
      <div>
        <h1>Phonebook</h1>
        <ContactForm addContact={addContact} valueName={valueInputName}valueNumber={valueInputNumber}  name={name} number={number}></ContactForm>
        <h2>Contacts</h2>
        <Filter value={filter} vFilter={valueFilter}></Filter>
        <ContactList contacts={filterInputHandler(contacts)} buttonDelete={buttonDelete}></ContactList>
      </div>
    )
}
