import React from "react";

function Contact() {
  return (
    <div className="min-h-screen  flex justify-center p-4 mt-[110px]">
      
        <div  className="w-full max-w-5xl rounded-3xl shadow-xl p-8 md:p-12 transition-all bg-[#3D342F]">
        
            {/* แนะนำร้าน */}
            <h1 className="text-4xl font-bold mb-6 text-center text-white">
            Welcome to G&B RESTAURANT
            </h1>

            <p className=" text-lg mb-4 text-[#EEDBC4]">
            G&B RESTAURANT is a small café that focuses on creating a warm and cozy atmosphere, perfect for working, reading, or meeting up with friends. We carefully select high-quality ingredients to ensure that every customer can enjoy freshly brewed coffee and delicious pastries every day.
            </p>

            <p className=" text-lg mb-4 text-[#EEDBC4]">
            In addition to coffee and desserts, our café also offers special seasonal beverages, along with free Wi-Fi and stylish photo spots where you can capture memorable moments in our shop.
            </p>

            <p className="text-white text-lg mb-6 font-bold">
            Our recommended menu items:
            <ul className="list-disc ml-5 mt-2 text-[#EEDBC4]">
                <li>Caramel Latte</li>
                <li>Chocolate Frappe</li>
                <li>Matcha Green Tea</li>
                <li>Blueberry Cheesecake</li>
            </ul>
            </p>

            {/* โซเชียล */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <a
                href="https://www.facebook.com/kittitouch.gus.sakulsakpinit?locale=th_TH"
                target="_blank"
                
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
            >
                Facebook
            </a>
            <a
                href="https://www.instagram.com/gussuke_76/"
                target="_blank"
                
                className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
            >
                Instagram
            </a>
            <a
                href="https://www.tiktok.com/@nummadmao"
                target="_blank"
                
                className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
            >
                TikTok
            </a>
            
            </div>

            {/* ที่อยู่และเวลาเปิดปิด */}
            <div className="text-center text-gray-600 mb-6">
            <p>Visit us: 123 Coffee Street, Bangkok</p>
            <p>Open: 8 AM - 8 PM</p>
            </div>

            {/* แผนที่ Google Maps */}
            <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-md">
            <iframe
                title="Cozy Café Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.123456!2d100.123456!3d13.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29f123456789%3A0xabcdef123456789!2sCozy%20Caf%C3%A9!5e0!3m2!1sen!2sth!4v1234567890"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            </div>
      </div>
    </div>
  );
}

export default Contact;
