import React from 'react'
import Image from 'next/image'
const Header = () => {
  return (
    
        <header className="bg-white h-[88px] flex  items-center  ">
              <div className="flex gap-[8px] absolute  left-[63px] pt-[29px] pb-[29px]">
              <Image
                src="/logo.png"
                alt="Logo"
                width={32.58}
                height={30.38}
              />
              <span className='font-bold text-2xl'>TODO</span>
            </div>
        </header>
    
  )
}

export default Header