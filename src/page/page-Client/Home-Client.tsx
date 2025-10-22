import React from 'react'
import SetCardMenu from '../../components/set-cardmenu'
import SetCategoryCard from '../../components/set-categorycard'
import Button from '../../components/button'
import Information from '../../components/informationTag'
import Tagmenu from '../../components/tagmenu.tsx'
import {Routes , Route} from 'react-router-dom'
// page
import MoreMenu from './More-Menu-Client.tsx'
function HomeClient(){
    return(

        <div>
            <SetCategoryCard></SetCategoryCard>
            <div className='md:mt-[50px] md:mb-[50px] mb-[20px]'>
                <Tagmenu title='Tea'></Tagmenu>
                <SetCardMenu filename='menutea.json'></SetCardMenu>
                <div className='mt-[30px] mb-[20px] mx-auto flex justify-center'>
                    <Button height="m" width="m" color="white" stringColor="brown" stringSize="m" linkdata='moremenu'>MORE</Button>
                </div> 
            </div>
            

            <div className='mt-[30px] mb-[30px]'>
                <Information style='1' image='informationpic/bg2.jpg' textHeader='ABOUT US' textinformation={`Our cafe is built on a love for coffee and community. We serve handcrafted drinks from carefully selected beans in a cozy space where everyone can relax and enjoy. Quality, sustainability, and care are in every cup.\n         
                    From the aroma that greets you at the door to the warmth of each sip, we strive to make every visit memorable. Whether you re catching up with friends, finding a moment of calm, or discovering a new favorite brew — our cafe is your home away from home`}></Information>
            </div >

            <div className='md:mt-[50px] md:mb-[50px] mt-[20px] mb-[20px]'>
                <Tagmenu title='COFFEE'></Tagmenu>
                <SetCardMenu filename='menucoffee.json'></SetCardMenu>
                <div className='mt-[30px] mb-[20px] mx-auto flex justify-center'>
                    <Button height="m" width="m" color="white" stringColor="brown" stringSize="m" linkdata='moremenu'>MORE</Button>
                </div> 
            </div>

            
            

            <div className='mt-[30px] mb-[30px]'>
                <Information style='2' image='informationpic/bg3.jfif' textHeader='HISTORY' textinformation={`Founded with a love for coffee and community, our cafe serves handcrafted drinks made from carefully selected beans. We offer a cozy space for friends, families, and coffee lovers to relax and enjoy quality beverages, with a focus on sustainability and care in every cup.`}></Information>
            </div>

            <div className='md:mt-[50px] md:mb-[50px] mt-[20px] mb-[20px]'>
                <Tagmenu title='SOFT DRINK'></Tagmenu>
                <SetCardMenu filename='menusoftdrink.json'></SetCardMenu>
                <div className='mt-[30px] mb-[20px] mx-auto flex justify-center'>
                    <Button height="m" width="m" color="white" stringColor="brown" stringSize="m" linkdata='moremenu'>MORE</Button>
                </div> 
            </div>
            
            
            <div className='md:mt-[50px] md:mb-[50px] mt-[20px] mb-[20px]'>
                <Tagmenu title='MAIN DISH'></Tagmenu>
                <SetCardMenu filename='menumaindishes.json'></SetCardMenu>
                <div className='mt-[30px] mb-[20px] mx-auto flex justify-center'>
                    <Button height="m" width="m" color="white" stringColor="brown" stringSize="m" linkdata='moremenu'>MORE</Button>
                </div> 
            </div>


            <div className='md:mt-[50px] md:mb-[50px] mt-[20px] mb-[20px]'>
                <Tagmenu title='Desserts'></Tagmenu>
                <SetCardMenu filename='menudesserts.json'></SetCardMenu>
                <div className='mt-[30px] mb-[20px] mx-auto flex justify-center'>
                    <Button height="m" width="m" color="white" stringColor="brown" stringSize="m" linkdata='moremenu'>MORE</Button>
                </div> 
            </div>
            

            
            
        </div>
    )
}
export default HomeClient