import { useState, useEffect } from "react";
import { AlertComponent, ButtonComponent } from "../../component";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";

export default function ConfigPaymentPage() {
  const baseDelay = 2 * 60; // 2 minutes (120 sec)
  const [timer, setTimer] = useState(baseDelay);
  const [expired, setExpired] = useState(false);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(true);
  const { id: tokenId } = useParams();

  useEffect(() => {
    if (expired) return;
    if (timer <= 0) {
      setExpired(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, expired]);

  useEffect(() => {
    if (!tokenId) return;

    fetch(`/api/payment/check-id-token/${tokenId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setExpired(true);
          return;
        }
        console.log(data);
        const expiredAt = data.details.createdAt + data.details.expiryIn;
        const now = Date.now();

        if (now >= expiredAt) {
          setTimer(0);
          setExpired(true);
          console.log(Math.floor((expiredAt - now) / 1000));
        } else {
          const remaining = Math.floor((expiredAt - now) / 1000);
          console.log("Remaining time (s):", remaining);
          setTimer(remaining);
        }
      })
      .catch(() => setExpired(true));
  }, [tokenId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const val = e.target.value.replace(/\D/g, "");

    const newCode = [...code];
    newCode[index] = val;
    setCode(newCode);

    if (val && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && code[index] === "" && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const validationCode = () => code.join("").length === 6 && !expired;

  const handelPay = () => {
    fetch(`/api/payment/check-code/${tokenId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: code.join("") }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setShowAlert(true);
          return;
        }
        console.log("Code verified successfully:", data);
        navigate(`/payment/success`);
      })
      .catch((error) => {
        console.error("Error verifying code:", error);
        alert("An unexpected error occurred. Please try again.");
      });
  };

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="lg:w-[50%] w-[70%] mx-auto bg-gray-600 p-8 rounded-xl shadow-xl">
        <h1 className="text-2xl font-bold text-white">Payment configuration</h1>

        <p className="text-gray-300 mb-4 mt-5">
          Enter the 6-digit code sent to your email. This code is valid for{" "}
          <b>5 minutes</b>.
        </p>

        <p className="text-white mb-4 text-lg font-semibold">
          {expired ? (
            <span className="text-red-400">Code expired</span>
          ) : (
            <>
              Time left: {minutes}:{seconds.toString().padStart(2, "0")}
            </>
          )}
        </p>

        <div className="flex gap-3 mt-4">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              inputMode="numeric"
              autoComplete="one-time-code"
              disabled={expired}
              className="w-full h-15 text-center text-xl font-semibold rounded-lg
                bg-gray-800 text-white border border-gray-500
                focus:border-blue-400 focus:ring-2 focus:ring-blue-500
                outline-none transition"
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>

        <ButtonComponent
          label="pay"
          className="w-full mt-5"
          onClick={handelPay}
          disabled={!validationCode()}
        />
      </div>
      {showAlert && (
        <AlertComponent
          title="alrt"
          type="error"
          message="Le code est expiré ! Veuillez réessayer."
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
}
