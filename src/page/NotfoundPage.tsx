import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#3D342F] text-[#E7C699]">
      <h1 className="text-[120px] font-extrabold leading-none mb-[-20px]">404</h1>
      <p className="text-2xl font-semibold mb-6">Page Not Found</p>

      <p className="text-center text-[#FFEED9]/80 mb-10 max-w-[400px]">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <Link
        to="/"
      >
        <button className="bg-[#E7C699] text-[#3D342F] font-semibold px-8 py-3 rounded-full hover:bg-[#FFEED9] duration-300">
          Back to Home
        </button>
        
      </Link>
    </div>
  );
}