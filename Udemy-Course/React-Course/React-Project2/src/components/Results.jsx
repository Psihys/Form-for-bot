import React from 'react'
import { calculateInvestmentResults, formatter } from '../util/investment'

const Results = ({ userInput }) => {
  const resultData = calculateInvestmentResults(userInput)
  const initialInvestment =
    resultData[0].valueEndOfYear -
    resultData[0].interest -
    resultData[0].annualInvestment

  return (
    <div id='result'>
      <thead>
        <th>Year</th>
        <th>Investment Value</th>
        <th>Interest (Year)</th>
        <th>Total Interest</th>
        <th>Invested Capital</th>
      </thead>

      <tbody>
        {resultData.map((yearData) => {
          const totalInterest =
            yearData.valueEndOfYear -
            yearData.annualInvestment * yearData.year -
            initialInvestment

            const investedCapital = initialInvestment + yearData.annualInvestment * yearData.year

          return (
            <tr>
              <td>{yearData.year}</td>
              <td>{formatter.format(yearData.valueEndOfYear)}</td>
              <td>{formatter.format(yearData.interest)}</td>
              <td>{formatter.format(totalInterest)}</td>
              <td>{formatter.format(investedCapital)}</td>
            </tr>
          )
        })}
      </tbody>
    </div>
  )
}

export default Results
