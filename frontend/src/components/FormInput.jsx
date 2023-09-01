import React from 'react'
import '../styles/FormInput.css'

export default function FormInput(props) {

  const {label, onChange, id, value, type, name} = props

  return (
    <div className='FormInput'>
      {props.type !== "textarea" && <input name={name} type = {type} onChange={onChange} value={value} required/>}
      {props.type !== "textarea" && <label className="type-other">{label}</label>}
      {props.type === "textarea" && <textarea  name={name} onChange={onChange} value={value} required/>}
      {props.type === "textarea" && <label className="type-textarea">{label}</label>}
    </div>
  )
}
