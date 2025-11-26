import React from 'react'
import Hero from './Hero'
import About from './About'
import Services from './Services'
import Portfolio from './Portfolio'
import ContactForm from './ContactForm'
/*import Testimonials from './Testimonials'*/
export default function AllSections(){
  return (
    <div className="space-y-24">
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <section id="contact" className="container mx-auto px-6">
        <ContactForm />
      </section>
    </div>
  )
}
