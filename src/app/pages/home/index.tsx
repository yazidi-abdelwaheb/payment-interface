import { useNavigate } from "react-router-dom";
import { ButtonComponent } from "../../component";

export default function HomePage() {
  const navigate = useNavigate();
  const navigateToPayment = () => {
    navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-wide drop-shadow-lg mb-10 text-center animate-fade-in">
        Welcome to <span className="text-blue-400">Payment App</span>
      </h1>

      <div className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-3xl p-10 w-full max-w-md border border-white/10 text-center animate-rise">
        <p className="text-gray-200 text-lg mb-6">
          Start your secured and fast payment process
        </p>

        <ButtonComponent
          label="Start"
          onClick={navigateToPayment}
          paddingX="2rem"
          className="w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold tracking-wide transition-all shadow-lg hover:shadow-blue-600/40"
        />
      </div>
      
    </div>
  );
}