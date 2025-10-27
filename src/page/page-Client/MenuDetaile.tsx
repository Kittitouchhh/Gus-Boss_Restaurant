import React from 'react'
import ParagraphMenu from '../../components/detail-menu/paragraphsMenu' 
import SetOption from "../../components/detail-menu/setoption"

function  Menudetaile(){
    return(
        <div className='mt-[110px]'>
            <div className="mb-[40px]">
                <ParagraphMenu nameMenu='STEAK' image='/maindishes/steak.jpg' description='Freshly baked, soft bread generously filled with a delicious combination of high-quality meats, crisp fresh vegetables, and a rich, flavorful sauce. Perfectly balanced in taste and texture, making every bite a satisfying experience.'></ParagraphMenu>
            </div>
            <div className="mb-[40px]">
                <SetOption title='Temperature' option_choice={['Hot','Medium','Cold']}></SetOption>
            </div>
            
        </div>
            
        

    )
}

export default Menudetaile