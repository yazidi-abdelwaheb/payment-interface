import React from "react";

interface AlertProps {
  type?: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  onClose?: () => void;
}

const typeStyles: Record<string, string> = {
  success: "text-green-700 border-green-300 bg-green-100",
  error: "text-red-700 border-red-300 bg-red-100",
  warning: "text-yellow-700 border-yellow-300 bg-yellow-100",
  info: "text-blue-700 border-blue-300 bg-blue-100",
};

export const AlertComponent: React.FC<AlertProps> = ({
  type = "info",
  title,
  message,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div
        className={` w-[90%] max-w-md p-6 rounded-xl shadow-xl text-center border ${typeStyles[type]} animate-fade-in`}
      >
        {/* Title */}
        <h2 className="text-xl font-bold mb-3">{title}</h2>

        {/* Message */}
        <p className="text-gray-700 mb-5">{message}</p>

        {/* Close button */}
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};
