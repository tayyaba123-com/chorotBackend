import React from 'react'

const FormGroup = ({label,placeholder,type}) => {
  return (
   
        <div className="form-group">
        <label htmlFor={label}>{label}</label>
        <input type={type} placeholder={placeholder} name={placeholder} id={placeholder} required />
      </div>
   
  )
}

export default FormGroup
