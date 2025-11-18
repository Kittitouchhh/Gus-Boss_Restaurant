import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "/logo/logo.png";

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    showname: "",
    image: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({ ...prev, image: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const isDuplicate = users.some(
      (u: any) => u.username.toLowerCase() === form.username.toLowerCase()
    );
    if (isDuplicate) {
      alert("Username นี้ถูกใช้ไปแล้ว!");
      return;
    }
    
    const membershipDefault = {
      isMember: false,
      points: 0,
      activatedAt: null,
    };

     const newUser = {
      id: Date.now(),
      username: form.username,
      password: form.password,
      showname: form.showname || form.username,
      image: form.image || "",
      role: "client",
      membership: membershipDefault,
    };

    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    
    localStorage.setItem("currentUser",newUser.id.toString());
    localStorage.setItem("authToken", "true");

    alert("สมัครสมาชิกสำเร็จ!");
    navigate("/");
  };

  return (
    <div className="relative flex h-screen justify-center items-center overflow-hidden ">
      <img
        src="/banner/login1.png"
        alt="background"
        className="absolute inset-0 w-1/2 h-full object-cover brightness-75 blur-[2px]"
      />
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 flex flex-col md:flex-row w-[90%] md:w-[1000px] h-auto md:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
        
        <div className="hidden md:block rounded-2xl mx-2 w-full md:w-1/2 h-[250px] md:h-full bg-[#3D342F]">
          <img
            src="/banner/login1.png"
            alt="coffee shop"
            className="w-full h-full object-cover brightness-90"
          />
        </div>

        <div className="rounded-2xl md:w-1/2 bg-white flex flex-col items-center p-6 md:p-3">
          <img src={logo} alt="logo" className="w-[200px] my-4" />
          <h2 className="text-[#3D342F] font-bold text-[28px] md:text-[30px] mb-5 tracking-wide">
            CREATE ACCOUNT
          </h2>

          <form className="w-full flex flex-col items-center gap-4" onSubmit={handleSubmit}>
            
            <div className="flex flex-col items-center m-auto gap-2">
              <p className="font-semibold text-[18px] text-gray-600">Upload your Profile</p>

              <label
                className="relative bg-white w-[120px] h-[120px] md:w-[200px] md:h-[200px] 
                rounded-xl flex flex-col items-center justify-center border-2 border-dashed 
                border-[#3D342F]/50 cursor-pointer hover:border-black hover:scale-105 
                transition duration-300 ease-out shadow-md hover:shadow-lg overflow-hidden"
              >
                {!form.image && (
                  <img
                    className="w-20 transition-transform duration-300 ease-out hover:scale-110"
                    src="../user/Upimage.png"
                    alt="Upload placeholder"
                  />
                )}

                {form.image && (
                  <img
                    src={form.image}
                    alt="Uploaded"
                    className="absolute  w-full h-full object-cover rounded-xl "
                  />
                )}

                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleFileChange} 
                />
              </label>
            </div>
            <div className="flex flex-col gap-3 w-full flex flex-col items-center">
              
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                className="w-[90%] md:w-[95%] p-2 rounded-full bg-[#E7C699] text-[#3D342F] font-semibold"
                required
              />

              <input
                type="text"
                name="showname"
                placeholder="Display name"
                value={form.showname}
                onChange={handleChange}
                className="w-[90%] md:w-[95%] p-2 rounded-full bg-[#E7C699] text-[#3D342F] font-semibold"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-[90%] md:w-[95%] p-2 rounded-full bg-[#E7C699] text-[#3D342F] font-semibold"
                required
              />

              <button
                type="submit"
                className="cursor-pointer w-[50%] bg-[#3D342F] text-[#E7C699] font-semibold text-[16px] py-2 rounded-full mt-2 hover:bg-[#2C2926] duration-300"
              >
                SIGN UP
              </button>

              <p className="text-[#3D342F] text-m mt-3">
                Already have an account?{" "}
                <Link to="/login" className="text-black underline hover:text-[#FFA537]">
                  Login
                </Link>
              </p>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Signup;