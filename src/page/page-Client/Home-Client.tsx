import React, { useEffect, useState } from "react";
import SetCardMenu from "../../components/set-cardmenu";
import SetCategoryCard from "../../components/set-categorycard";
import Button from "../../components/button";
import Information from "../../components/informationTag";
import Tagmenu from "../../components/tagmenu.tsx";
import SwiperCom from "../../components/swipercom";
import axios from "axios";
import {Link} from 'react-router-dom'
// page

interface Post {
  id: string;
  menuName: string;
  imageMenu: string;
  menuOption: string[];
  menuPrice: string;
  datajson: string;
  description: string;
  status : number
}

interface Banner{
  id : number ,
  image : string,
  page : string,
  status: number
}


function HomeClient() {
  let [datamenu, Setdata] = useState<Post[]>([]);
  let [databanner , Setbanner] = useState<Banner[]>([])

  
  useEffect(() => {
    const fetchMenu = async () => {
    
      try {
        const response = await axios.get<Post[]>("/dataclient/menutea.json");
        

        const response1 = await axios.get<Post[]>(
          "/dataclient/menucoffee.json"
        );
        

        const response2 = await axios.get<Post[]>(
          "/dataclient/menudesserts.json"
        );
        

        const response3 = await axios.get<Post[]>(
          "/dataclient/menumaindishes.json"
        );
        

        const response4 = await axios.get<Post[]>(
          "/dataclient/menusoftdrink.json"
        );

        
        
        

        const allMenus = [
          ...response.data,
          ...response1.data,
          ...response2.data,
          ...response3.data,
          ...response4.data,
        ];



        const dataFromStorage = localStorage.getItem("menu");
        if (dataFromStorage) {
        Setdata(JSON.parse(dataFromStorage));
        } else {
            localStorage.setItem("menu", JSON.stringify(allMenus));
            Setdata(allMenus);
            console.log(allMenus)
        }




        // banner local get
        const bannerJson1 = await axios.get<Banner[]>("/dataclient/carousalitem.json")
        const bannerJson2 = await axios.get<Banner[]>("/dataclient/carousalitempostit.json")

        const allbanner = [
          ...bannerJson1.data,
          ...bannerJson2.data
        ]

        const bannerFromStorage = localStorage.getItem("banner");
        if (bannerFromStorage){
          Setbanner(JSON.parse(bannerFromStorage))
        }
        else{
          localStorage.setItem("banner", JSON.stringify(allbanner));
          Setbanner(allbanner)
          console.log(databanner)
        }

        console.log("databanner filtered:", databanner.filter(d => d.page === "home"));




      } catch (err) {
        console.log(err);
      }

      






    };
    fetchMenu();
  }, []);



  useEffect(() => {
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === "menu" && event.newValue) {
      Setdata(JSON.parse(event.newValue));
    }
  };

  window.addEventListener("storage", handleStorageChange);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
  };
}, []);



  return (
    <div>
        <Link to='cart'>
            <img src= "/logo/cart.png" alt="" className='fixed 2xl:w-[150px] 2xl:h-[150px] xl:w-[120px] xl:h-[120px] lg:w-[100px] lg:h-[100px] md:w-[80px] md:h-[80px] w-[60px] h-[60px] md:right-[50px] md:bottom-[50px] right-[20px] bottom-[20px]'/>
        </Link>
        

      <div className="mt-[110px]">
        <SwiperCom  key={databanner.length} databanner={databanner.filter((data)=>data.page === "home" && data.status === 1)}></SwiperCom>
      </div>

      <div className="md:mt-[40px] mt-[10px]">
        <SetCategoryCard></SetCategoryCard>
      </div>
      <div className="md:mt-[50px] md:mb-[50px] mb-[20px]">
        <Tagmenu title="Tea"></Tagmenu>
        <SetCardMenu
          filename={datamenu.filter((data) => data.datajson === "menutea" && data.status === 1).slice(0, 7)}
        ></SetCardMenu>
        <div className="mt-[30px] mb-[20px] mx-auto flex justify-center">
          <Button
            height="m"
            width="m"
            color="white"
            stringColor="brown"
            stringSize="m"
            linkdata="moremenu"
          >
            MORE
          </Button>
        </div>
      </div>

      <div className="mt-[30px] mb-[30px]">
        <Information
          style="1"
          image="informationpic/bg2.jpg"
          textHeader="ABOUT US"
          textinformation={`Our cafe is built on a love for coffee and community. We serve handcrafted drinks from carefully selected beans in a cozy space where everyone can relax and enjoy. Quality, sustainability, and care are in every cup.\n         
                    From the aroma that greets you at the door to the warmth of each sip, we strive to make every visit memorable. Whether you re catching up with friends, finding a moment of calm, or discovering a new favorite brew — our cafe is your home away from home`}
        ></Information>
      </div>

      <div className="md:mt-[50px] md:mb-[50px] mt-[20px] mb-[20px]">
        <Tagmenu title="COFFEE"></Tagmenu>
        <SetCardMenu
          filename={datamenu.filter((data) => data.datajson === "menucoffee" && data.status === 1).slice(0, 7)}
        ></SetCardMenu>
        <div className="mt-[30px] mb-[20px] mx-auto flex justify-center">
          <Button
            height="m"
            width="m"
            color="white"
            stringColor="brown"
            stringSize="m"
            linkdata="moremenu"
          >
            MORE
          </Button>
        </div>
      </div>

      <div className="mt-[30px] mb-[30px]">
        <Information
          style="2"
          image="informationpic/bg3.jfif"
          textHeader="HISTORY"
          textinformation={`Founded with a love for coffee and community, our cafe serves handcrafted drinks made from carefully selected beans. We offer a cozy space for friends, families, and coffee lovers to relax and enjoy quality beverages, with a focus on sustainability and care in every cup.`}
        ></Information>
      </div>

      <div className="md:mt-[50px] md:mb-[50px] mt-[20px] mb-[20px]">
        <Tagmenu title="SOFT DRINK"></Tagmenu>
        <SetCardMenu
          filename={datamenu.filter(
            (data) => data.datajson === "menusoftdrink" && data.status === 1
          ).slice(0, 7)}
        ></SetCardMenu>
        <div className="mt-[30px] mb-[20px] mx-auto flex justify-center">
          <Button
            height="m"
            width="m"
            color="white"
            stringColor="brown"
            stringSize="m"
            linkdata="moremenu"
          >
            MORE
          </Button>
        </div>
      </div>

      <div className="md:mt-[50px] md:mb-[50px] mt-[20px] mb-[20px]">
        <Tagmenu title="MAIN DISH"></Tagmenu>
        <SetCardMenu
          filename={datamenu.filter(
            (data) => data.datajson === "menumaindishes" && data.status === 1
          ).slice(0, 7)}
        ></SetCardMenu>
        <div className="mt-[30px] mb-[20px] mx-auto flex justify-center">
          <Button
            height="m"
            width="m"
            color="white"
            stringColor="brown"
            stringSize="m"
            linkdata="moremenu"
          >
            MORE
          </Button>
        </div>
      </div>

      <div className="md:mt-[50px] md:mb-[50px] mt-[20px] mb-[20px]">
        <Tagmenu title="Desserts"></Tagmenu>
        <SetCardMenu
          filename={datamenu.filter((data) => data.datajson === "menudesserts" && data.status === 1).slice(0, 7)}
        ></SetCardMenu>
        <div className="mt-[30px] mb-[20px] mx-auto flex justify-center">
          <Button
            height="m"
            width="m"
            color="white"
            stringColor="brown"
            stringSize="m"
            linkdata="moremenu"
          >
            MORE
          </Button>
        </div>
      </div>
    </div>
  );
}
export default HomeClient;
