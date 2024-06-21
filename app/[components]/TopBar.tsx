import React from 'react'
import { baseUrl } from '../[lib]/schema'
import Link from 'next/link'

export default function TopBar() {
  return (
    <header className='h-14 text-slate-50 bg-sky-800 mb-8 sticky top-0'>
      <nav className="container px-4 lg:px-8 mx-auto max-w-6xl space-y-16">
        <div className="flex justify-between items-center py-4">
          <Link href={'/'} className='inline-flex items-center gap-1 font-medium tracking-wide hover:underline'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            Home
          </Link>
          <Link href={baseUrl} className='inline-flex items-center gap-1 font-medium tracking-wide hover:underline'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            IGIHE.COM
          </Link>
        </div>
      </nav>
    </header>
  )
}
