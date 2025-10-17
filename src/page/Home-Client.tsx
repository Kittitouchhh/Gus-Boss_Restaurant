import React from 'react'
import Header from "../components/header"
import SetCardMenu from '../components/set-cardmenu'
import SetCategoryCard from '../components/set-categorycard'
function HomeClient(){
    return(
        
        <div>
            <SetCategoryCard></SetCategoryCard>
            <SetCardMenu></SetCardMenu>
        </div>
        
    )
}
export default HomeClient