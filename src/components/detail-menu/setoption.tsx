import React , {useEffect, useState }from "react";


interface SetOptionProps {
  title: string;
  option_choice: string[];
  onSelect?: (title: string, value: string) => void;
}




const SetOption: React.FC<SetOptionProps> = ({title, option_choice ,onSelect}) => {
  const [selected, setSelected] = useState<string>(option_choice[0]);

  useEffect(()=>{
    if (onSelect) onSelect(title, option_choice[0]);
  },[])

  const handleClick = (option: string) => {
    setSelected(option);
    if (onSelect) onSelect(title, option);
  };

  


  return (
    <div className="mb-4 mx-auto">
      <h3 className="font-semibold mb-2 2xl:text-[32px] xl:text-[26px] lg:text-[22px] md:text-[16px] text-[10px]">{title}</h3>
      <div className="grid grid-cols-2 2xl:gap-[20px] gap-2 flex-wrap">
        {option_choice.map((option) => (
          <button
            key={option}
            onClick={() => handleClick(option)}
            className={`font-bold lg:text-[12px] 2xl:text-[16px] xl:text-[14px] md:text-[11px] text-[8px] 2xl:w-[250px] xl:w-[140px] lg:w-[130px] md:w-[130px] w-[90px] 2xl:h-[70px] xl:h-[50px] lg:h-[50px] md:h-[40px] h-[35px] rounded-full px-3 py-1  border ${
              selected === option
                ? "bg-[#EEDBC4] text-[#201c19] border-[#201c19] md:border-4 border-2" 
                : "bg-[#201c19] text-[#EEDBC4] border-[#201c19]" 
             }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};


export default SetOption;
