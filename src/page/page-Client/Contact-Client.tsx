import React from "react";

function Contact() {
  return (
    <div className="relative min-h-screen flex justify-center p-4 sm:p-6 md:p-8 lg:p-12 mt-[110px] mb-6">
      <div
        className="absolute inset-0 bg-cover bg-center z-0 filter blur-md"
        style={{ backgroundImage: "url('/banner/cafe-pic.jpg')" }}
      ></div>

      <div className="relative z-10 w-full max-w-5xl sm:max-w-4xl md:max-w-3xl lg:max-w-5xl rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 lg:p-12 bg-[#302925] text-white">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center">
          Welcome to G&B RESTAURANT
        </h1>

        <p className="text-sm sm:text-base md:text-lg mb-4">
          G&B RESTAURANT is a small café that focuses on creating a warm and cozy atmosphere, perfect for working, reading, or meeting up with friends. We carefully select high-quality ingredients to ensure that every customer can enjoy freshly brewed coffee and delicious pastries every day.
        </p>

        <p className="text-sm sm:text-base md:text-lg mb-4">
          In addition to coffee and desserts, our café also offers special seasonal beverages, along with free Wi-Fi and stylish photo spots where you can capture memorable moments in our shop.
        </p>

        <p className="text-sm sm:text-base md:text-lg mb-6">
          Our recommended menu items:
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Chocolate Lava Cake</li>
            <li>Tiramisu</li>
            <li>Cold Brew Coffee</li>
            <li>Burger</li>
          </ul>
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-6">
          <a
            href="https://www.facebook.com/kittitouch.gus.sakulsakpinit?locale=th_TH"
            target="_blank"
            className="flex items-center gap-2 sm:gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 sm:px-4 py-2 rounded-lg transition-colors text-xs sm:text-sm"
          >
            Facebook
          </a>
          <a
            href="https://www.instagram.com/gussuke_76/"
            target="_blank"
            className="flex items-center gap-2 sm:gap-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold px-3 sm:px-4 py-2 rounded-lg transition-colors text-xs sm:text-sm"
          >
            Instagram
          </a>
          <a
            href="https://www.tiktok.com/@nummadmao"
            target="_blank"
            className="flex items-center gap-2 sm:gap-3 bg-black hover:bg-gray-800 text-white font-semibold px-3 sm:px-4 py-2 rounded-lg transition-colors text-xs sm:text-sm"
          >
            TikTok
          </a>
        </div>

        <div className="w-full h-48 sm:h-64 md:h-72 lg:h-96 rounded-2xl overflow-hidden shadow-md">
          <iframe
            title="G&B RESTURANT Location"
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
