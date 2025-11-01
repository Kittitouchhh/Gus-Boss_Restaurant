import React from 'react'
import ParagraphMenu from '../../components/detail-menu/paragraphsMenu' 
import SetOption from "../../components/detail-menu/setoption"
import Button from '../../components/button'
import Tagmenu  from '../../components/tagmenu.tsx'
import CommnetCard from '../../components/detail-menu/commentCard.tsx'

function  Menudetaile(){
    return(
        <div className='mt-[110px]'>
            <div className="mb-[40px]">
                <ParagraphMenu nameMenu='STEAK' image='/maindishes/steak.jpg' description='Freshly baked, soft bread generously filled with a delicious combination of high-quality meats, crisp fresh vegetables, and a rich, flavorful sauce. Perfectly balanced in taste and texture, making every bite a satisfying experience.'></ParagraphMenu>
            </div>
            <div className="mb-[40px] flex flex-row  flex-wrap xl:gap-[80px] lg:gap-[60px] md:gap-[40px] gap-[30px] justify-start items-stretch mx-auto">
                <SetOption title='Temperature' option_choice={['Hot','Medium','Cold']}></SetOption>
                <SetOption title='Meat' option_choice={["Regular", "Skim", "Soy", "Oat", "Almond", "No Milk"]}></SetOption>
                <SetOption title='Option' option_choice={['French Fries','Salad','Bacon','Grilled Vegetables']}></SetOption>
                <SetOption title='Spicy Level' option_choice={['Mild / Not Spicy','Hot','Slightly Spicy']}></SetOption>
                <SetOption title='Sauce' option_choice={['Pepper Sauce','BBQ Sauce','Red Wine Sauce' , 'Chimichurri']}></SetOption>  
            </div>
            
            <form className='flex flex-col xl:gap-[20px] lg:gap-[15px] md:gap-[15px] gap-[10px] w-[80%]  mx-auto mt-[60px]'>
                <label className='xl:text-[30px] lg:text-[25px] md:text-[25px] text-[18px] font-bold '>MORE DETAIL</label>
                <textarea className='w-full 2xl:h-[400px] xl:h-[350px] lg:h-[250px] md:h-[200px] h-[130px] bg-white mx-auto xl:rounded-2xl lg:rounded-xl rounded-md shadow-lg shadow-black/90 md:p-[20px] p-[10px] xl:text-[24px] md:text-[18px] text-[10px] text-[#3D342F] font-bold overflow-auto placeholder-gray-400 select-text' placeholder='พิมพ์ข้อความตรงนี้' ></textarea>
            </form>

            <div className='flex justify-center xl:mt-[80px] md:mt-[50px] mt-[30px]'>
                <Button height="xl" width='xl' color='darkbrown' stringColor='white' stringSize='xl'  >Price :</Button>
            </div>

               
            <div className='w-full mx-auto  flex flex-row 2xl:mt-[100px] xl:mt-[70px] md:mt-[40px] mt-[20px] gap-[40px] 2xl:mb-[150px] justify-center items-center'>
                <Button height="xl" width='xl' color='orange' stringColor='white' stringSize='xl'  >ADD TO CART</Button>
                <Button height="xl" width='xl' color='orange' stringColor='white' stringSize='xl'  >BUY NOW</Button>
            </div>

            <Tagmenu title='COMMENT'></Tagmenu>

            
            <div className='flex flex-col justify-start items-center 2xl:w-[80%] xl:w-[100%] md:w-[95%] w-[95%] mx-auto'>
                <div className='flex flex-row justify-center items-center flex-wrap mb-[30px] p-[10px] lg:gap-[15px] md:gap-[10px] gap-[15px] mx-center w-full'>
                    <CommnetCard userImage="/profile/power.jpg" username = 'Power' commentText = 'This is a comment' like ='0' ></CommnetCard>
                    <CommnetCard userImage="/profile/power.jpg" username = 'Power' commentText = 'This steak is huge and cooked perfectly, so juicy and tender 😋' like ='1' ></CommnetCard>
                    <CommnetCard userImage="/profile/power.jpg" username = 'Power' commentText = 'The Australian beef is top quality, cooked to perfection. The meat is tender and the black pepper sauce is flavorful' like ='1' ></CommnetCard>
                    <CommnetCard userImage="/profile/power.jpg" username = 'Power' commentText = 'Beautiful presentation, served with salad and roasted potatoes, which enhances the overall taste.' like ='1' ></CommnetCard>
                    <CommnetCard userImage="/profile/power.jpg" username = 'Power' commentText = 'Reasonably priced for the quality. Perfect for special dinners or a romantic night out , This steak melts in your mouth… but my wallet melted first , Seeing this steak makes me forget about dieting!' like ='1' ></CommnetCard>
                    <CommnetCard userImage="/profile/power.jpg" username = 'Power' commentText = 'This is a comment' like ='0' ></CommnetCard>
                    <CommnetCard userImage="/profile/power.jpg" username = 'Power' commentText = 'This steak is huge and cooked perfectly, so juicy and tender 😋' like ='1' ></CommnetCard>
                    <CommnetCard userImage="/profile/power.jpg" username = 'Power' commentText = 'The Australian beef is top quality, cooked to perfection. The meat is tender and the black pepper sauce is flavorful' like ='1' ></CommnetCard>
                    <CommnetCard userImage="/profile/power.jpg" username = 'Power' commentText = 'Beautiful presentation, served with salad and roasted potatoes, which enhances the overall taste.' like ='0' ></CommnetCard>
                    <CommnetCard userImage="/profile/power.jpg" username = 'Power' commentText = 'Reasonably priced for the quality. Perfect for special dinners or a romantic night out , This steak melts in your mouth… but my wallet melted first , Seeing this steak makes me forget about dieting!' like ='1' ></CommnetCard>
                </div>
            </div>

            
            
        </div>
            
        

    )
}

export default Menudetaile