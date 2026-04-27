import React from 'react'
import Hero from './Hero'
import About from './About'
import Services from './Services'
import MasterclassSection from './Masterclass/MasterclassSection'
import ContactForm from './ContactForm'
export default function AllSections(){
  return (
    <div className="space-y-24">
      <Hero />
      <About />
      <MasterclassSection />
      <section id="contact" className="container mx-auto px-6">
        <ContactForm />
      </section>
    </div>
  )
}
