import React from 'react'
import Select from './Select';
import Logo from './Logo';
import TransactionInput from './TransactionInput';

function Form() {
  return (
    <div className="container">
        <div className='flex-container'>   
            <Logo/>
            <TransactionInput/>
            <Select/>
        </div>
        <button type="submit">Submit</button>
    </div>
  )
}

export default Form
