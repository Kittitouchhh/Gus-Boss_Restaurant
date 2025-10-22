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
import HomeClient from './page/page-Client/Home-Client'
import PostIt from './page/page-Client/Post-It-Client'
import ProcessOrder from './page/page-Client/Process-Client'
import MoreMenu from './page/page-Client/More-Menu-Client'
import Menudetaile from './page/page-Client/MenuDetaile'
import Contact from './page/page-Client/Contact-Client'

function App() {
  return (
    <div>
      <Header></Header>
          <Routes>
              <Route path='/' element={<HomeClient></HomeClient>}></Route>
              <Route path='process' element={<ProcessOrder></ProcessOrder>}></Route>
              <Route path='PostIt' element={<PostIt></PostIt>}></Route>
              <Route path='moremenu' element={<MoreMenu></MoreMenu>}></Route>
              <Route path='MenuDetaile/:menuid/:menujson' element={<Menudetaile></Menudetaile>}></Route>
              <Route path="contact" element={<Contact></Contact>}></Route>
          </Routes>
      <Footer></Footer>
    </div>
      
      
  )
}

export default App
