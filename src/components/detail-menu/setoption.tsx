import React from "react";
import { RadioCards, Box, Flex, Text } from "@radix-ui/themes";

interface SetOptionProps {
  title: string;
  option_choice: string[];
}

const SetOption: React.FC<SetOptionProps> = ({title, option_choice }) => {
  return (
    <div className ='flex flex-col gap-[20px] m-[20px]'>
      <p className="text-[30px] font-bold">{title}</p>
      <Box>
        {/*จำกัดความกว้าง container ไม่เกิน 600px*/}
        <RadioCards.Root
          defaultValue={option_choice[0]}
          className="!flex !flex-row !gap-[20px]"
        >
          {/* container ของ radio card / ตัวเลือกถูกเลือกเป็นค่าเริ่มต้นคือ  */}
          {option_choice.map((data) => {
            return (
              <RadioCards.Item
                value={data}
                className=" group !w-[150px] !h-[60px] !bg-[#EEDBC4] !rounded-full !m-0 !p-0 data-[state=checked]:!bg-[#271f1a] data-[state=checked]:!border-2 data-[state=checked]:!border-[#EEDBC4] focus-visible:!outline-none focus-visible:!box-shadow-none
                before:!content-none focus-visible:!ring-0 !shadow-lg !shadow-black/90     "
              >
                <Flex direction="row" align="center" justify="center">
                  <Text weight="bold" className="text-[20px] text-[#3D342F] group-data-[state=checked]:text-[#EEDBC4]  ">
                    {data}
                  </Text>
                </Flex>
              </RadioCards.Item>
            );
          })}
        </RadioCards.Root>
      </Box>
    </div>
  );
};

export default SetOption;
