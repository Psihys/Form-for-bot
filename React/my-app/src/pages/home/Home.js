import React from 'react'
import Header from '../../commponents/header/Header'
import './home.css'
import Footer from '../../commponents/footer/Footer'

const Home = () => {
  return (
    <div>
      <Header/>
      <main className='main'>
        <section className='intro-section'>
          <h2>Intro</h2>
        </section>

        <section className='info-section'>
          <h2>Info</h2>
        </section>

        <section className='games-section'>
          <h2>Games</h2>
        </section>

        <section className='booking-section'>
          <h2>Booking</h2>
        </section>

        <section className='location-section'>
          <h2>Where you can find us</h2>
        </section>
      </main>
      <Footer/>
    </div>
  )
}

export default Home