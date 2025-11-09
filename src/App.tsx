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
import {Routes,Route ,useLocation} from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion';



// Pages
import HomeClient from './page/page-Client/Home-Client'
import PostIt from './page/page-Client/Post-It-Client'
import ProcessOrder from './page/page-Client/Process-Client'
import MoreMenu from './page/page-Client/More-Menu-Client'
import Menudetaile from './page/page-Client/MenuDetaile'
import Contact from './page/page-Client/Contact-Client'
import Cart from './page/page-Client/Cart-Client' 

function App() {
  const location = useLocation();
  return (
    <div className = "transition-colors duration-500 ease-in-out">
      <Header></Header>
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path='/' element={<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}><HomeClient></HomeClient></motion.div>}></Route>
                <Route path='process' element={<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}><ProcessOrder></ProcessOrder></motion.div>}></Route>
                <Route path='PostIt' element={<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}><PostIt></PostIt></motion.div>}></Route>
                <Route path='moremenu' element={<motion.div initial={{opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}><MoreMenu></MoreMenu></motion.div>}></Route>
                <Route path='MenuDetaile/:menuname/:menutype' element={<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}><Menudetaile></Menudetaile></motion.div>}></Route>
                <Route path="contact" element={<motion.div initial={{ opacity: 0, y: 20}} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}><Contact></Contact></motion.div>}></Route>
                <Route path="cart" element={<motion.div initial={{ opacity: 0, y: 20}} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}><Cart></Cart></motion.div>}></Route>
            </Routes>
            <motion.div initial={{ opacity: 0, y: 20}} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}><Footer></Footer></motion.div>
        </AnimatePresence>
      
    </div>
      
      
  )
}

export default App

/* 
initial สถาณะเริ่มต้นของ element ยังไม่ได้ route
animate สถาณะของเมื่อหน้าถูก route เข้ามา
exit สถาณะของเมื่อหน้าถูก route ออก
transition เปลี่ยนสถาณะ กำหนดให้ใช้เวลา 0.5 วิ
*/