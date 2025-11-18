import { TextArea } from '@radix-ui/themes';
import React , {useState,useEffect} from 'react';
import Button from '../button'
import usersData from "../../data/login.json";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
interface Props {
    // menuid
    menu_id_from_comcart? : number

    onClose: () => void;
    image? : string,
    menu_name? : string,
    type : number
    order_id? : number ,


    // description type 3
    description? : string

}

interface CommentProps {
    menuid: number , 
    userName : string,
    userImage : string,
    content : string,
    like : boolean
}

interface PostitProps{
    post_id : number,
    username : string,
    userImage: string, 
    love : number ,
    wow : number ,
    star : number ,
    angry : number,
    content : string
}




interface cart{
            order_id : number,
            menu_id  : number,
            menu_name : string,
            menu_price : number,
            menu_image : string,
            order_description : string,
            user_order : string,
            userimage : string,
            menu_option : { [key: string]: string } ,
            quantity : number
}



const Addcommentbox:React.FC<Props> = ({menu_id_from_comcart,order_id,onClose ,image,menu_name,type,description}) => {
    const [typefeel , setfeel ] = useState<boolean>(false)
    const [displayName , SetName] = useState<string>("")
    const [displayImage , SetImage] = useState<string>("")
    const [commentText, setCommentText] = useState<string>("");
    const [postitText, setpostitText] = useState<string>("");
    const [commentlist, setcomment] = useState<CommentProps[]>([])
    const [postitlist , setpostitlist] = useState<PostitProps[]>([])
    const [datacart , Setdatacart] = useState<cart[]>([])



    const [descriptionstate , setdescription] = useState<string>(description || "")



    function setheart(){
        setfeel(!typefeel)
    }

    useEffect(() => {
        const currentId = localStorage.getItem("currentUser");
        if (!currentId) return;

        const users = JSON.parse(localStorage.getItem("users") || "[]");

        const foundUser = users.find(
            (u: any) => u.id?.toString() === currentId
        );

        

        SetName(foundUser?.showname || "Unknown");
        SetImage(foundUser?.image || "https://cdn-icons-png.flaticon.com/512/6522/6522516.png");

        const datacommentStorage = localStorage.getItem("comment");
        if (datacommentStorage) {
            setcomment(JSON.parse(datacommentStorage));
        }
        else{
            setcomment([])
        }


        const datapostitStorage = localStorage.getItem("postit");
        if(datapostitStorage){
            setpostitlist(JSON.parse(datapostitStorage))
        }
        else{
            setpostitlist([])
        }


        const datacartFromStorage = localStorage.getItem("cart");
        if(datacartFromStorage){
            Setdatacart(JSON.parse(datacartFromStorage))
        }
        else{
            Setdatacart([])
        }


    },[])
    

    function createPostit(){
        const newId = postitlist.length > 0 ? Math.max(...postitlist.map(item => item.post_id)) + 1 : 1;
        if(postitText){
            const postit = {
            post_id : newId,
            username : displayName,
            userImage: displayImage, 
            love : 0 ,
            wow : 0 ,
            star : 0 ,
            angry : 0 ,
            content : postitText,
            }
            const newpostitlist = [...postitlist , postit]
            setpostitlist(newpostitlist)
            
            localStorage.setItem("postit" , JSON.stringify(newpostitlist))
            onClose()
            toast.success('เพิ่มโพสต์เเล้ว!',{
                position:"top-center",
                autoClose:3000,
                hideProgressBar:false,
                closeOnClick:false,
                pauseOnHover:false,
                draggable: false ,// ลากไปวางที่อื่นไม่ได้
                theme:'colored'})
            console.log(postitlist)
            window.location.reload()
        }   
        else{
            toast.error('กรุณาพิมพ์ข้อความ!',{
                position:"top-center",
                autoClose:3000,
                hideProgressBar:false,
                closeOnClick:false,
                pauseOnHover:false,
                draggable: false ,// ลากไปวางที่อื่นไม่ได้
                theme:'colored'})
            
        }
        

    }

//  อัปเดต description

    function updatedescription() {

        const updated = datacart.map(item =>
        item.order_id === order_id
            ? { ...item, order_description: descriptionstate }
            : item);

        Setdatacart(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
        toast.success('เพิ่ม description แล้ว!',{
                position:"top-center",
                autoClose:3000,
                hideProgressBar:false,
                closeOnClick:false,
                pauseOnHover:false,
                draggable: false ,
                theme:'colored'})
        window.location.reload()
    }






    function createComment(){
        const comment = {
            menuid: menu_id_from_comcart ?? 0, 
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
    // comment
    if(type == 1){
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
        )
    }
    else if(type == 2){
        return (
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 shadow-lg shadow-black/90">
                <div className="bg-[#EEDBC4] xl:w-[40%] lg:w-[60%] md:w-[60%] w-[85%] xl:h-[70%] lg:h-[80%] md:h-[60%] h-[50%] border-4 border-[#251F1D] rounded-xl md:p-[30px] p-[20px] relative flex flex-col gap-[10px]">

                    <button
                        className="absolute top-3 right-3 text-[#251F1D] text-xl font-bold"
                        onClick={() => {onClose() , toast.error('ยกเลิกการเขียน Post It เเล้ว!',{
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
                        POST IT : {displayName}
                    </h1>

                    <div className='w-[100%] h-[100%] bg-white rounded-xl'>
                        <form className="w-full h-full">
                            <textarea placeholder='บอกความรู้สึกของคุณให้คนอื่นรู้สิ' className='md:p-[10px] p-[5px] text-[#251F1D] w-full h-full  border-none outline-none resize-none  overflow-y-auto' value={postitText}  onChange={(e) => setpostitText(e.target.value)}></textarea>
                        </form>
                    </div>

                    <div className='flex flex-row justify-end items-center' >
                        <div className='transform transition-transform duration-200 hover:scale-105 active:scale-95'  onClick={() => createPostit()}>
                            <Button height='m' width='m' color='brown' stringColor='white' stringSize='s'  >SUBMIT</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    // description
    else{
        return (
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 shadow-lg shadow-black/90">
                <div className="bg-[#EEDBC4] xl:w-[40%] lg:w-[60%] md:w-[60%] w-[85%] xl:h-[70%] lg:h-[80%] md:h-[60%] h-[50%] border-4 border-[#251F1D] rounded-xl md:p-[30px] p-[20px] relative flex flex-col gap-[10px]">

                    <button
                        className="absolute top-3 right-3 text-[#251F1D] text-xl font-bold"
                        onClick={() => {onClose() , toast.error('ยกเลิกการเขียน Description เเล้ว!',{
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
                        Description : {displayName}
                    </h1>

                    <div className='w-[100%] h-[100%] bg-white rounded-xl'>
                        <form className="w-full h-full">
                            <textarea placeholder='บอกความรู้สึกของคุณให้คนอื่นรู้สิ' className='md:p-[10px] p-[5px] text-[#251F1D] w-full h-full  border-none outline-none resize-none  overflow-y-auto' value={descriptionstate}  onChange={(e) => setdescription(e.target.value)}></textarea>
                        </form>
                    </div>

                    <div className='flex flex-row justify-end items-center' >
                        <div className='transform transition-transform duration-200 hover:scale-105 active:scale-95'  onClick={() => updatedescription()}>
                            <Button height='m' width='m' color='brown' stringColor='white' stringSize='s'  >SUBMIT</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
    
}

export default Addcommentbox;
