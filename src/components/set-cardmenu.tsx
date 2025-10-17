import React from 'react'
import CardMenu from './cardmenu'


const SetCardMenu:React.FC<{}> = () => {
    return(
        <div className='m-[20px] flex flex-row flex-wrap xl:gap-[20px] lg:gap-[15px] md:gap-[10px] gap-[5px] xl:w-[80%] 2xl:w-[65%] lg:w-[65%] md:w-[80%] w-[95%] mx-auto justify-center '>
        <CardMenu name='Espresso' image='/public/tea/black_Tea.png' option={['Size','Temperature','Sweet','Brew strenght']} price='$20' like='201' ></CardMenu>
        <CardMenu name='GREEN TEA' image='/public/tea/GREEN TEA.jpg' option={['Size','Temperature','Milk Option','Flavor add-on']} price='$25' like='195' ></CardMenu>
        <CardMenu name='THAI ICED TED' image='/public/tea/ชาเย็น.jpg' option={['Size','Topping','Milk Option','Sweet']} price='$15' like='152' ></CardMenu>
        <CardMenu name='LEMON TEA' image='/public/tea/lemon tea.jpg' option={['Size','Temperature','Lemon level','Topping']} price='$25' like='120' ></CardMenu>

        <CardMenu name='CHAMOMILE TEA ' image='/public/tea/Chamomile tea.jpg' option={['Size','Temperature','Ice level','Flavor add-on']} price='$25' like='115' ></CardMenu>

        <CardMenu name='Oolong Tea' image='/public/tea/Oolong Tea.jpg' option={['Size','Temperature','Sweet','Brew strenght']} price='$10' like='100' ></CardMenu>

        <CardMenu name='White Tea' image='/public/tea/White Tea.jpg' option={['Size','Temperature','Milk Option','Flavor add-on']} price='$25' like='96' ></CardMenu>

        <CardMenu name='Earl Grey Tea' image='/public/tea/Earl Grey Tea.jpg' option={['Size','Topping','Milk Option','Brew strenght']} price='$10' like='87' ></CardMenu>

        <div className='inline-block md:hidden lg:inline-block xl:hidden 2xl:inline-block'>
          <CardMenu name='Peppermint Tea' image='/public/tea/Peppermint Tea.jpg' option={['Size','Topping','Lemon level','Brew strenght']} price='$35' like='79' ></CardMenu>
        </div>
        
        <div className='xl:hidden 2xl:inline-block hidden'>
            <CardMenu name='Hibiscus Tea / ชาชบา ' image='/public/tea/Chamomile tea.jpg' option={['Size','Topping','Lemon level','Brew strenght']} price='$35' like='79'></CardMenu>
        </div>
        
      </div>
    )
}

export default SetCardMenu