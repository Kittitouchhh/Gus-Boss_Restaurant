import React from 'react'



const Footer:React.FC= ({}) => {
    return(
        <footer className={`w-full h-[80px] bg-[#EEDBC4] text-center text-[16px] flex justify-center bottom-[0px] p-[5px] md:p-[10px]`}>
            <p className='self-center text-[8px] md:text-[10px] lg:text-[12px] xl:text-[16px] text-[#3D342F]'>© 2025 GUSBOSS RESTUARANT. All rights reserved.
            Proudly serving handcrafted coffee, fresh pastries, 
            and heartwarming meals made with love. Whether you're here for a quick espresso, a long chat with friends, or a quiet 
            moment with a book, our doors are always open to welcome you.
            </p>
        </footer>
    )
}

export default Footer