import React from 'react'
import CategoryCard from './categorycard'
function SetCategoryCard(){
    return(
        <div className='flex flex-row w-full justify-center md:mt-[110px] mt-[120px]'>
          <CategoryCard image='/public/category/TEALOGO.png' name='Tea'></CategoryCard>
          <CategoryCard image='/public/category/COFFEE LOGO.png' name='Coffee'></CategoryCard>
          <CategoryCard image='/public/category/SOFTDRINK.png' name='Soft Drink'></CategoryCard>
          <CategoryCard image='/public/category/MAIN DISHES.png' name='Main Dishes'></CategoryCard>
          <CategoryCard image='/public/category/dessert.png' name='Dessert'></CategoryCard>
        </div>
    )
}

export default SetCategoryCard