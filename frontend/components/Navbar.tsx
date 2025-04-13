import React from 'react'
import Image from 'next/image'
import { Search } from 'lucide-react'
const Navbar = () => {
  return (
    <div className='  flex justify-between '>   
          <button className='w-fit  leading-[1] font-sans flex py-0 gap-2 items-center  px-4 rounded-md  text-[14px] text-white  font-medium  bg-[#000000]'>
          <Image className='' src={'/add.png'} width={20} height={10} alt='add'></Image>
            TODO
          </button>
          <div className='h-[48px] w-[48px] flex justify-center items-center rounded-md bg-white shadow-sm'>
          <Search
            className=""
            size={20}
        />    
            </div>
        </div>
  )
}

export default Navbar