import React from 'react'
import Select from './Select';
import Logo from './Logo';
import TransactionDateInput from './TransactionDateInput';

function Form() {
  return (
    <div className="container">
        <div className='flex-container'>   
            <Logo/>
            <TransactionDateInput/>
            <Select/>
        </div>
        <button type="submit">Submit</button>
    </div>
  )
}

export default Form
