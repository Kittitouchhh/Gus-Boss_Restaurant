import { useState } from 'react'
import Banner from './components/banner'
import SearchBar from './components/seachbar'
import Menu from './components/menu'
import Header from "./components/header"
import Footer from "./components/footer"
import CardMenu from './components/cardmenu'
import SetCardMenu from './components/set-cardmenu'
import CategoryCard from './components/categorycard'
import SetCategoryCard from './components/set-categorycard'
import {Routes,Route} from 'react-router-dom'

// Pages
import HomeClient from './page/Home-Client'
import PostIt from './page/Post-It-Client'
import ProcessOrder from './page/Process-Client'


function App() {
  return (
    <div>
      <Header></Header>
          <Routes>
              <Route path='/' element={<HomeClient></HomeClient>}></Route>
              <Route path='process' element={<ProcessOrder></ProcessOrder>}></Route>
              <Route path='PostIt' element={<PostIt></PostIt>}></Route>
          </Routes>
      <Footer></Footer>
    </div>
      
      
  )
}

export default App
