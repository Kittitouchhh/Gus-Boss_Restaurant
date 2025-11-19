import React, { useState , useEffect } from "react";
import { motion, parseCSSVariable } from "framer-motion";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import usersData from "../../data/login.json";

interface PostItCardProps {
  post_id : number,
  username: string;
  imguser: string;
  content: string;
  love: number;
  star: number;
  wow: number;
  angry: number;
  update:() => void
  
}

interface savepostreaction{
  post_id : number
  hasreact : boolean ,
  user : string,

}

const PostItCard: React.FC<PostItCardProps> = ({ post_id,username,imguser,content,love,star,wow,angry,update}) => {
  const [islove, Setlove] = useState<number>(love);
  const [iswow, Setwow] = useState<number>(wow);
  const [isstar, Setstar] = useState<number>(star);
  const [isangry, Setangry] = useState<number>(angry);
  const [hasreact , Sethasreact] = useState<boolean>(false)
  const [datapostit , Setdatapostit] = useState<PostItCardProps[]>([])
  const [displayName , SetName] = useState<string>("")
  const [displayImage , SetImage] = useState<string>("")
  const [datahasreact , setdatareact] = useState<savepostreaction[]>([])


  useEffect(() =>{

    const datapostitStorage = localStorage.getItem("postit");
        if(datapostitStorage){
            Setdatapostit(JSON.parse(datapostitStorage))
        }
        else{
            Setdatapostit([])
        }


        const currentId = localStorage.getItem("currentUser");
        if (!currentId) return;

        const users = JSON.parse(localStorage.getItem("users") || "[]");

        const foundUser = users.find(
            (u: any) => u.id?.toString() === currentId
        );

        SetName(foundUser?.showname || "Unknown");
        SetImage(foundUser?.image || "https://cdn-icons-png.flaticon.com/512/6522/6522516.png");


        // =======================================
        const datahasreactFromStorage = localStorage.getItem("hasreact");
        if(datahasreactFromStorage){
            setdatareact(JSON.parse(datahasreactFromStorage))
        }
        else{
            setdatareact([])
        }

  },[])


  useEffect(()=>{
    const currentId = localStorage.getItem("currentUser");
        if (!currentId) return;

        const users = JSON.parse(localStorage.getItem("users") || "[]");

        const foundUser = users.find(
            (u: any) => u.id?.toString() === currentId
        );

        SetName(foundUser?.showname || "Unknown");
        SetImage(foundUser?.image || "https://cdn-icons-png.flaticon.com/512/6522/6522516.png");

  },[localStorage.getItem("currentUser")])

  function reaction(type: "love" | "wow" | "star" | "angry") {
  

  const alreadyreact = datahasreact.find((item) => item.user === displayName && item.post_id === post_id);

  if(alreadyreact){
    toast.error('คุณโหวตไปแล้ว!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      theme: 'colored'
    });
    console.log("alreadyreact")
    return;
  }
  

  if (hasreact) {
    toast.error('คุณโหวตไปแล้ว!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      theme: 'colored'
    });
    console.log("hasreact")
    return;
  }

  let newvalue: number ;

  switch(type) {
    case "love":
      newvalue = islove + 1;
      Setlove(newvalue);
      break;
    case "wow":
      newvalue = iswow + 1;
      Setwow(newvalue);
      break;
    case "star":
      newvalue = isstar + 1;
      Setstar(newvalue);
      break;
    case "angry":
      newvalue = isangry + 1;
      Setangry(newvalue);
      break;
  }

  const updated = datapostit.map(item => 
    item.post_id === post_id ? { ...item, [type]: newvalue } : item
  );

  Setdatapostit(updated);
  localStorage.setItem("postit", JSON.stringify(updated));
  Sethasreact(true);

  toast.success('โหวตเเล้ว!', {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    theme: 'colored'
  });


  const oldData = JSON.parse(localStorage.getItem("hasreact") || "[]"); 


  const newhasreact = {
    post_id : post_id,
    hasreact : true ,
    user : displayName,
  }
  
  const updatehasreact =  [...oldData, newhasreact]
  setdatareact(updatehasreact)
  localStorage.setItem("hasreact", JSON.stringify(updatehasreact));

  update();
  window.location.reload()


}


  

  return (
    <div className="flex flex-col 2xl:w-[450px]  xl:w-[350px]  lg:w-[250px]  md:w-[200px] w-[130px] h-auto md:p-[15px] p-[10px] bg-[#9A867B] md:rounded-3xl rounded-xl gap-[30px] shadow-lg shadow-black/90">
      <div className="flex flex-row 2xl:gap-[15px] gap-[12px] items-center">
        <img
          src={imguser}
          className="2xl:w-[60px] 2xl:h-[60px] xl:w-[50px] xl:h-[50px] lg:w-[40px] lg:h-[40px] md:w-[30px] md:h-[30px] w-[25px] h-[25px] rounded-full object-cover"
          alt=""
        />
        <p className="2xl:text-[26px] xl:text-[22px] font-bold">{username}</p>
      </div>

      <p className="2xl:text-[18px] xl:text-[16px] lg:text-[14px] md:text-[12px] text-[10px]">{content}</p>

      <div className="flex flex-row lg:gap-[10px] md:gap-[5px] gap-[3px] mt-auto flex-wrap">
        <motion.div
          className="flex flex-row 2xl:w-[90px] 2xl:h-[50px] xl:w-[80px] xl:h-[40px] lg:w-[70px] lg:h-[40px] md:w-[60px] md:h-[30px] w-[50px] h-[30px] bg-[#362E2A]  gap-[10px] items-center p-[10px] rounded-4xl cursor-pointer"
          whileTap={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          onClick={() => reaction("love")}
        >
          <img
            src="emoji/emoji.png"
            alt=""
            className="2xl:w-[20px] 2xl:h-[20px] xl:w-[18px] xl:h-[18px] lg:w-[16px] lg:h-[16px] md:w-[14px] md:h-[14px] w-[10px] h-[10px] rounded-full"
          /> 
          <p className="2xl:text-[16px] lg:text-[14px] md:text-[12px] text-[8px]">{islove}</p>
        </motion.div>



        <motion.div
          className="flex flex-row 2xl:w-[90px] 2xl:h-[50px] xl:w-[80px] xl:h-[40px] lg:w-[70px] lg:h-[40px] md:w-[60px] md:h-[30px] w-[50px] h-[30px] bg-[#362E2A]  gap-[10px] items-center p-[10px] rounded-4xl cursor-pointer"
          whileTap={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          onClick={() => reaction("wow")}
        >
          <img
            src="emoji/wow.png"
            alt=""
            className="2xl:w-[20px] 2xl:h-[20px] xl:w-[18px] xl:h-[18px] lg:w-[16px] lg:h-[16px] md:w-[14px] md:h-[14px] w-[10px] h-[10px] rounded-full"
          /> 
          <p className="2xl:text-[16px] lg:text-[14px] md:text-[12px] text-[8px]">{iswow}</p>
        </motion.div>



        <motion.div
          className="flex flex-row 2xl:w-[90px] 2xl:h-[50px] xl:w-[80px] xl:h-[40px] lg:w-[70px] lg:h-[40px] md:w-[60px] md:h-[30px] w-[50px] h-[30px] bg-[#362E2A]  gap-[10px] items-center p-[10px] rounded-4xl cursor-pointer"
          whileTap={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          onClick={() => reaction("star")}
        >
          <img
            src="emoji/star.png"
            alt=""
            className="2xl:w-[20px] 2xl:h-[20px] xl:w-[18px] xl:h-[18px] lg:w-[16px] lg:h-[16px] md:w-[14px] md:h-[14px] w-[10px] h-[10px] rounded-full"
          /> 
          <p className="2xl:text-[16px] lg:text-[14px] md:text-[12px] text-[8px]">{isstar}</p>
        </motion.div>


        <motion.div
          className="flex flex-row 2xl:w-[90px] 2xl:h-[50px] xl:w-[80px] xl:h-[40px] lg:w-[70px] lg:h-[40px] md:w-[60px] md:h-[30px] w-[50px] h-[30px] bg-[#362E2A]  gap-[10px] items-center p-[10px] rounded-4xl cursor-pointer"
          whileTap={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          onClick={() => reaction("angry")}
        >
          <img
            src="emoji/angry.png"
            alt=""
            className="2xl:w-[20px] 2xl:h-[20px] xl:w-[18px] xl:h-[18px] lg:w-[16px] lg:h-[16px] md:w-[14px] md:h-[14px] w-[10px] h-[10px] rounded-full"
          /> 
          <p className="2xl:text-[16px] lg:text-[14px] md:text-[12px] text-[8px]">{isangry}</p>
        </motion.div>

      </div>
    </div>
  );
};

export default PostItCard;