'use client'

import { ReactNode, useState } from "react"

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
    <div className="border rounded mb-4 tablet:hidden">
      <div
        className="flex items-center justify-between px-4 py-2 cursor-pointer"
        onClick={toggleAccordion}
      >
        <h3 className="text-16 font-medium">{isOpen ? title.opened : title.closed}</h3>
        <span className="text-black">
          {isOpen ? '-' : '+'}
        </span>
      </div>
      {isOpen && (
        <div className="px-4 py-2">
          {children}
        </div>
      )}
    </div>
  )
}
