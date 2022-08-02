import React from 'react'
import Head from '../Head';
import Footer from '../Footer';

export default function AppLayout({ children }: { children: JSX.Element}) {
  return (
    <div className="w-full h-screen min-h-640 flex flex-nowrap flex-col overflow-hidden bg-gray-200 dark:bg-gray-900">
      <Head />
      {children}
      <Footer />
    </div>
  )
}
