import Header from './component/Header'
import CoreConcept from './component/CoreConcept'
import { EXAMPLES } from './data'
import './App.css'
// import './reset.css'
import TabButton from './component/TabButton'
import { useState } from 'react'

import './App.css'

function App() {
  const [tabContent, setTabContent] = useState('')

  const handleSelect = (e) => {
    console.log(e.target.textContent.toLowerCase())
    setTabContent(e.target.textContent.toLowerCase())
  }

  return (
    <>
      <Header />
      <main>
        <section>
          <h2>Time to get started!</h2>
          <CoreConcept />
        </section>
        <section className='examples' id='examples'>
          <menu>
            <TabButton isSelected={tabContent === 'components'} handleClick={(e) => handleSelect(e)}>
              Components
            </TabButton>
            <TabButton  isSelected={tabContent === 'jsx'} handleClick={(e) => handleSelect(e)}>JSX</TabButton>
            <TabButton  isSelected={tabContent === 'props'} handleClick={(e) => handleSelect(e)}>Props</TabButton>
            <TabButton  isSelected={tabContent === 'state'} handleClick={(e) => handleSelect(e)}>State</TabButton>
          </menu>
          {/* {!tabContent ? (
            <p>Please click the button</p>
          ) : (
            Object.keys(EXAMPLES).map((example, index) => {
              if (EXAMPLES[example].title === tabContent) {
                return (
                  <div key={index} id='tab-content'>
                    <h3>{EXAMPLES[example].title}</h3>
                    <p>{EXAMPLES[example].description}</p>
                    <pre>
                      <code>{EXAMPLES[example].code}</code>
                    </pre>
                  </div>
                )
              }
            })
          )} 
           */}

          {!tabContent ? (
            <p>Please select a button</p>
          ) : (
            <div id='tab-content'>
              
              <h3>{EXAMPLES[tabContent].title}</h3>
              <p>{EXAMPLES[tabContent].description}</p>
              <pre>
                <code>{EXAMPLES[tabContent].code}</code>
              </pre>
            </div>
          )}
        </section>
      </main>
    </>
  )
}

export default App
