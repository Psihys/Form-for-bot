import React, { useState } from 'react'

const UserInput = ({userInput, handleChange}) => {
  



  return (
    <section id='user-input'>
      <div className='input-group'>
        <p>
          <label htmlFor=''>Initianal Investment</label>
          <input
            type='number'
            value={userInput.initialInvestment}
            required
            onChange={(e) => handleChange(e.target.value, 'initialInvestment')}
          />
        </p>
        <p>
          <label htmlFor=''>Annual Investment</label>
          <input
            type='number'
            value={userInput.annualInvestment}
            required
            onChange={(e) => handleChange(e.target.value, 'annualInvestment')}
          />
        </p>
        <p>
          <label htmlFor=''>Expected Return</label>
          <input
            type='number'
            value={userInput.expectedReturn}
            required
            onChange={(e) => handleChange(e.target.value, 'expectedReturn')}
          />
        </p>
        <p>
          <label htmlFor=''>Duration</label>
          <input
            type='number'
            value={userInput.duration}
            required
            onChange={(e) => handleChange(e.target.value, 'duration')}
          />
        </p>
      </div>
    </section>
  )
}

export default UserInput
