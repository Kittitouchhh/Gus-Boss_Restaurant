import React, { useState } from "react";
import { motion } from "framer-motion";

interface PostItCardProps {
  username: string;
  imguser: string;
  content: string;
  love: number;
  star: number;
  wow: number;
  angry: number;
}

const PostItCard: React.FC<PostItCardProps> = ({
  username,
  imguser,
  content,
  love,
  star,
  wow,
  angry,
}) => {
  const [islove, Setlove] = useState<number>(love);
  const [iswow, Setwow] = useState<number>(wow);
  const [isstar, Setstar] = useState<number>(star);
  const [isangry, Setangry] = useState<number>(angry);

  function handleLove() {
    Setlove((prev) => prev + 1);
  }
  function handleWow() {
    Setwow((prev) => prev + 1);
  }
  function handleStar() {
    Setstar((prev) => prev + 1);
  }
  function handleAngry() {
    Setangry((prev) => prev + 1);
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
          onClick={handleLove}
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
          onClick={handleWow}
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
          onClick={handleStar}
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
          onClick={handleAngry}
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