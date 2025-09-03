"use client";
import React from 'react'

import { SignedIn, UserButton } from '@clerk/nextjs'
import MobileSidebar from "@/components/mobile-sidebar"

const Navbar = () => {
  return (
    <div className='flex items-center p-4'>
      <MobileSidebar />
       <div className='flex justify-end w-full'>
       <SignedIn>
          <UserButton  />
        </SignedIn>
       </div>

    </div>
  )
}

export default Navbar
