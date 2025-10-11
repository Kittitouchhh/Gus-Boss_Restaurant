import { useState } from 'react'
import Navbar from './components/header'
import Banner from './components/banner'
import SearchBar from './components/seachbar'
import Menu from './components/menu'
import Header from "./components/header"
import Footer from "./components/footer"
import CardMenu from './components/cardmenu'
import SetCardMenu from './components/set-cardmenu'

function App() {
  return (
    <div>
      <Header></Header>
      <SetCardMenu></SetCardMenu>
      <Footer></Footer>
    </div>
      
      
  )
}

export default App
