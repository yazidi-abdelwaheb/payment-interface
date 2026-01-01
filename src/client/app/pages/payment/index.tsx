// PaymentPage.tsx
import { useState } from "react";
import FormPayment from "./form.payment";
import Purchase from "./purchase.payment";
import { useNavigate } from "react-router-dom";

interface PaymentDetails {
  firstName: string;
  lastName: string;
  cardNumber: string[];
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  amount: number | null;
}

export default function PaymentPage() {
  const navigate = useNavigate();
  const [details, setDetails] = useState<PaymentDetails>({
    firstName: "",
    lastName: "",
    cardNumber: [],
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    amount: null,
  });

  const [error, setError] = useState<string | null>(null);


  const handelpaymant = () => {
  const { cardNumber, ...rest } = details;

  fetch("/api/payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cardNumber: cardNumber.join(""), // array -> string
      ...rest,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          const message = data.error || "Payment failed";
          alert(message);
          setError(message);
        });
      }
      return response.json(); // si succès
    })
    .then((data) => {
      if (data) {
        console.log("Payment successful:", data);
        setError('')
        navigate(`/payment/${data.tokenId}`)
      }
    })
    .catch((error) => {
      console.error("Error during payment:", error);
      alert("An unexpected error occurred. Please try again.");
      setError(error.message);
    });
};


  const verifyDetails = (): boolean => {
    const cardStr = details.cardNumber.join("");
    if (
      details.firstName &&
      details.lastName &&
      cardStr.length === 16 &&
      /^\d{16}$/.test(cardStr) &&
      details.expiryMonth &&
      details.expiryYear &&
      details.cvv.length === 3 &&
      /^\d{3}$/.test(details.cvv) &&
      details.amount !== null &&
      details.amount > 0 &&
      details.expiryMonth !== "Month" &&
      details.expiryYear !== "Year"
    ) {
      return true;
    }
    return false;
  };

  return (
    <>
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-gray-500 rounded-xl shadow-xl w-[95%] lg:w-[80%] px-5 py-8">
        <h1 className="text-4xl font-bold text-gray-200 mb-8">
          <span className="text-blue-300">Payment</span> Details
        </h1>
        {error && (
          <div className="w-full p-3 text-red-500 border border-red-500 bg-red-100 rounded text-center text-2xl mb-5">
            {error}
          </div>
        )}
        <div className="flex flex-col lg:flex-row gap-6">
          <FormPayment details={details} setDetails={setDetails} />
          <Purchase
            handelpaymant={handelpaymant}
            amount={details.amount}
            verifyDetails={verifyDetails}
          />
        </div>
      </div>
    </div>
    </>
  );
}
