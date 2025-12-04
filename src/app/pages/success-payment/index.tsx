import { useEffect, useRef } from "react";
import "./style.css"; // <-- tu mets toutes les animations CSS ici
import { useNavigate } from "react-router-dom";

export default function SuccessPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
const navigate = useNavigate();
  useEffect(() => {


    if (!containerRef.current) return;

    const el = containerRef.current;

    const confettiColors = [
      "#e40015",
      "#e44e48",
      "#231f1f",
      "#787e8b",
      "#afb5c2",
      "#f6f7f9",
      "#e40015",
    ];

    const confettiAnimations = ["slow", "medium", "fast"];

    const createConfetti = () => {
      const confettiEl = document.createElement("div");
      const size = Math.floor(Math.random() * 3) + 7 + "px";
      const color =
        confettiColors[Math.floor(Math.random() * confettiColors.length)];
      const left = Math.floor(Math.random() * el.offsetWidth) + "px";
      const animation =
        confettiAnimations[Math.floor(Math.random() * confettiAnimations.length)];

      confettiEl.classList.add("confetti", `confetti--animation-${animation}`);
      confettiEl.style.left = left;
      confettiEl.style.width = size;
      confettiEl.style.height = size;
      confettiEl.style.backgroundColor = color;

      el.appendChild(confettiEl);

      setTimeout(() => {
        confettiEl.remove();
      }, 3000);
    };

    const interval = setInterval(() => createConfetti(), 25);

    return () => clearInterval(interval);
  }, []);

  const navigator = () => {
    navigate(`/`);
  }
  return (
    <div className="relative w-screen h-screen flex items-center justify-center  overflow-hidden">
      <div ref={containerRef} className="confetti-container"></div>

      <div className="text-center z-10">
        <h1 className="text-3xl font-bold text-gray-100">
          Payment successful!
        </h1>

        <p className="text-gray-400 mt-3 leading-relaxed">
          Thank you! Your payment has been successfully processed.
        </p>

        <p className="text-gray-300 text-sm mt-1">
          A receipt has been sent to you by email.
        </p>

        <button
          onClick={navigator}
          className="mt-8 w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition cursor-pointer"
        >
          Return to home
        </button>
      </div>
    </div>
  );
}
