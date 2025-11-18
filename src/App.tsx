import Header from "./components/header"
import Footer from "./components/footer"
import {Routes,Route ,useLocation} from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Page Admin
import AdminPage from "./page/pagesAdmin/AdminPage";
import NotFoundPage from "./page/NotfoundPage";
import ProtectedRoute from "./components/ProtectedRoute";


// Pages
import HomeClient from './page/page-Client/Home-Client'
import PostIt from './page/page-Client/Post-It-Client'
import ProcessOrder from './page/page-Client/Process-Client'
import MoreMenu from './page/page-Client/More-Menu-Client'
import Menudetaile from './page/page-Client/MenuDetaile'
import Contact from './page/page-Client/Contact-Client'
import Cart from './page/page-Client/Cart-Client' 
import PaymentPage from './page/page-Client/Payment-Page'
import Profile from "./page/Profile";
import Memberpage from "./page/memberpage";
import Paymenmberpage from "./page/paymemberPage";

import LoginPage from "./page/LoginPage";
import SignupPage from "./page/SignupPage";

function App() {
  const location = useLocation();
  const isAuthPage =
  location.pathname === "/login" || location.pathname === "/signuppage"; 

  return (
    <div className = "transition-colors duration-500 ease-in-out">
      

      <ToastContainer />
      {!isAuthPage &&<Header></Header>}
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>

                <Route path="/login" element={<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}><LoginPage/></motion.div>} />
                <Route path="/signuppage" element={<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}><SignupPage /></motion.div>} />

                <Route path='/' element={<ProtectedRoute><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}><HomeClient></HomeClient></motion.div></ProtectedRoute>}></Route>
                <Route path='process' element={<ProtectedRoute><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}><ProcessOrder></ProcessOrder></motion.div></ProtectedRoute>}></Route>
                <Route path='PostIt' element={<ProtectedRoute><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}><PostIt></PostIt></motion.div></ProtectedRoute>}></Route>
                <Route path='moremenu' element={<ProtectedRoute><motion.div initial={{opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}><MoreMenu></MoreMenu></motion.div></ProtectedRoute>}></Route>
                <Route path='MenuDetaile/:menuname/:menutype' element={<ProtectedRoute><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}><Menudetaile></Menudetaile></motion.div></ProtectedRoute>}></Route>
                <Route path='moremenu/MenuDetaile/:menuname/:menutype' element={<ProtectedRoute><motion.div initial={{opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}><Menudetaile></Menudetaile></motion.div></ProtectedRoute>}></Route>
                <Route path="constact" element={<ProtectedRoute><motion.div initial={{ opacity: 0, y: 20}} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}><Contact></Contact></motion.div></ProtectedRoute>}></Route>
                <Route path="cart" element={<ProtectedRoute><motion.div initial={{ opacity: 0, y: 20}} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}><Cart></Cart></motion.div></ProtectedRoute>}></Route>
                <Route path="cart/payment" element={<ProtectedRoute><motion.div initial={{ opacity: 0, y: 20}} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}><PaymentPage></PaymentPage></motion.div></ProtectedRoute>}></Route>



                <Route path="/profile" element={<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}><Profile /></motion.div>} />
                <Route path="/memberpage" element={<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}><Memberpage /></motion.div>} />
                <Route path="/admin" element={<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}><AdminPage /></motion.div>} />
                <Route path="/paymenmberpage" element={<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}><Paymenmberpage /></motion.div>} />
                <Route path="*" element={<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}><NotFoundPage /></motion.div>} />

            </Routes>
            {!isAuthPage && <motion.div initial={{ opacity: 0, y: 20}} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}><Footer></Footer></motion.div>}   
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


// test commit