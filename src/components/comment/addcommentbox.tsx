import { TextArea } from '@radix-ui/themes';
import React , {useState,useEffect} from 'react';
import Button from '../button'
import usersData from "../../data/login.json";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
interface Props {
    onClose: () => void;
    image? : string,
    menu_name? : string

}

interface CommentProps {
    menuname: string, 
    userName : string,
    userImage : string,
    content : string,
    like : boolean
}



const Addcommentbox:React.FC<Props> = ({onClose ,image,menu_name}) => {
    const [typefeel , setfeel ] = useState<boolean>(false)
    const [displayName , SetName] = useState<string>("")
    const [displayImage , SetImage] = useState<string>("")
    const [commentText, setCommentText] = useState<string>("");
    const [commentlist, setcomment] = useState<CommentProps[]>([])


    function setheart(){
        setfeel(!typefeel)
    }

    useEffect(() => {
        const currentUsername = localStorage.getItem("username");

        const localUsers = JSON.parse(localStorage.getItem("users") || "[]");

        const allUsers = [...usersData, ...localUsers];

        const currentUser = allUsers.find(
            (u) => u.username.toLowerCase() === currentUsername?.toLowerCase()
        );

        SetName(currentUser?.showname || "Unknown");
        SetImage(currentUser?.image || "https://cdn-icons-png.flaticon.com/512/6522/6522516.png");

        const datacommentStorage = localStorage.getItem("comment");
        if (datacommentStorage) {
            setcomment(JSON.parse(datacommentStorage));
        }
        else{
            setcomment([])
        }

    },[])

    function createComment(){
        const comment = {
            menuname: menu_name || '', 
            userName : displayName,
            userImage : displayImage ,
            content : commentText,
            like : typefeel
        }
        const newcommentlist = [...commentlist, comment]
        setcomment(newcommentlist)
        console.log(commentlist)
        localStorage.setItem("comment", JSON.stringify(newcommentlist));
        onClose()
        toast.success('เพิ่มคอมเม้นต์เเล้ว!',{
                position:"top-center",
                autoClose:3000,
                hideProgressBar:false,
                closeOnClick:false,
                pauseOnHover:false,
                draggable: false ,// ลากไปวางที่อื่นไม่ได้
                theme:'colored'})
        
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 shadow-lg shadow-black/90">
            <div className="bg-[#EEDBC4] xl:w-[40%] lg:w-[60%] md:w-[60%] w-[85%] xl:h-[80%] lg:h-[60%] md:h-[60%] h-[70%] border-4 border-[#251F1D] rounded-xl md:p-[30px] p-[20px] relative flex flex-col gap-[10px]">

                <button
                    className="absolute top-3 right-3 text-[#251F1D] text-xl font-bold"
                    onClick={() => {onClose() , toast.error('ยกเลิกการเขียนคอมเม้นต์เเล้ว!',{
                position:"top-center",
                autoClose:3000,
                hideProgressBar:false,
                closeOnClick:false,
                pauseOnHover:false,
                draggable: false ,// ลากไปวางที่อื่นไม่ได้
                theme:'colored'})}}
                >
                    ✕
                </button>

                <h1 className="md:text-xl text-[16px] font-bold text-[#251F1D]">
                    COMMENT BOX : {menu_name}
                </h1>
                <img src={image} alt="" className='w-[100%] md:h-[40%] h-[130px]  object-cover rounded-xl'/>


                <div className='w-[100%] h-[60%] bg-white rounded-xl'>
                    <form className="w-full h-full">
                        <textarea placeholder='เพิ่มข้อคิดเห็นตรงนี้' className='md:p-[10px] p-[5px] text-[#251F1D] w-full h-full  border-none outline-none resize-none  overflow-y-auto' value={commentText}  onChange={(e) => setCommentText(e.target.value)}></textarea>
                    </form>
                </div>

                <div className='flex flex-row justify-between items-center' >
                    <div className='flex flex-row lg:gap-[20px] gap-[10px] items-center '>
                        <img src={typefeel? '/logo/heart.png' : '/logo/dislike.png'} alt=""  onClick={()=> setheart()} className='md:h-[40px] md:w-[40px] h-[30px] w-[30px] transform transition-transform duration-200 hover:scale-105 active:scale-95'/>
                        <p className='2xl:text-[28px] xl:text-[24px] lg:text-[16px] md:text-[14px] text-[12px] text-[#251F1D] font-bold'> {typefeel? "Like" : "Dislike"}</p>
                    </div>
                    <div className='transform transition-transform duration-200 hover:scale-105 active:scale-95'  onClick={() => createComment()}>
                        <Button height='m' width='m' color='brown' stringColor='white' stringSize='s'  >SUBMIT</Button>
                    </div>
                    

                    
                </div>



                

            </div>
        </div>
    );
}

export default Addcommentbox;
