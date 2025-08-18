import React from 'react'

const MySelect = ({ options, defaultValue, value, onChange }) => {
  return (
    <div>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option valu=''>{defaultValue}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
            {option.value}
          </option>
        ))}
      </select>
    </div>
  )
}

export default MySelect
