import React from "react";
import { RadioCards, Box, Flex, Text } from "@radix-ui/themes";
import { div } from "framer-motion/client";
import { wrap } from "framer-motion";

interface SetOptionProps {
  title: string;
  option_choice: string[];
}

const SetOption: React.FC<SetOptionProps> = ({title, option_choice }) => {
  return (
    <div className ='flex flex-col xl:gap-[35px] lg:gap-[25px] md:gap-[25px] gap-[15px] w-full mx-auto justify-center '>
      <p className="xl:text-[25px] lg:text-[30px] md:text-[25px] font-bold text-center">{title}</p>
      <Box className="w-full flex justify-center">
        {/*จำกัดความกว้าง container ไม่เกิน 600px*/}
        <form>
          <RadioCards.Root
            defaultValue={option_choice[0]}
            className="!flex !flex-row  !gap-[20px] !flex-wrap !justify-center  "
          >
            {/* container ของ radio card / ตัวเลือกถูกเลือกเป็นค่าเริ่มต้นคือ  */}
            {option_choice.map((data) => {
              return (
  
                  <RadioCards.Item 
                    value={data}
                    className=" group 2xl:!w-[270px] 2xl:!h-[55px] xl:!w-[220px] xl:!h-[45px] lg:!w-[190px] lg:!h-[50px] md:!w-[150px] md:!h-[40px] !w-[130px] !h-[30px] !bg-[#EEDBC4] !rounded-full !m-0 !p-0 data-[state=checked]:!bg-[#271f1a] data-[state=checked]:!border-2 data-[state=checked]:!border-[#EEDBC4] focus-visible:!outline-none focus-visible:!box-shadow-none
                    before:!content-none focus-visible:!ring-0 !shadow-lg !shadow-black/90     "
                  >
                    <Flex direction="row" align="center" justify="center" className="w-full">
                      <Text weight="bold" className="2xl:text-[20px] xl:text-[16px] lg:text-[16px] md:text-[12px] text-[10px] text-[#3D342F] group-data-[state=checked]:text-[#EEDBC4]  ">
                        {data}
                      </Text>
                    </Flex>
                  </RadioCards.Item>           
              );
            })}
          </RadioCards.Root>
        </form>
      </Box>
    </div>
  );
};

export default SetOption;
