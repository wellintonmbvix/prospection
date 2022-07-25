import React from 'react'

type CardProps = {
    children: React.ReactNode;
}

export default function Card({ children }: CardProps) {
  return (
    <div className="p-4 w-auto bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        {children}
    </div>
  )
}
