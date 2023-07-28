'use client'

import { ReactNode, useState } from 'react'

interface AccordionProps {
  title: { closed: string, opened: string }
  children: ReactNode
}

export default function Accordion({ title, children }: AccordionProps) {

  const [isOpen, setIsOpen] = useState(false)

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  return (

    <div className='border-theme-primary border-2 rounded-lg shadow-sm shadow-theme-secondary bg-white'>
      <div
        className="flex items-center justify-between px-4 py-2 cursor-pointer bg-theme-primary"
        onClick={toggleAccordion}
      >
        <h3 className="text-16 font-medium">{isOpen ? title.opened : title.closed}</h3>
        <span >
          {isOpen ? '-' : '+'}
        </span>
      </div>
      <div className={` transition-all duration-700  ${isOpen ? 'opacity-100 p-4 py-6' : 'opacity-0 p-0'}`}>
        {isOpen && (children)}
      </div>
    </div >
  )
}
