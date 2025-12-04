// FormPayment.tsx
import { InputTextComponent } from "../../component";

interface FormPaymentProps {
  details: any;
  setDetails: (details: any) => void;
}

export default function FormPayment({ details, setDetails }: FormPaymentProps) {
  const months = [
    {
      name: "January",
      index: "01",
    },
    {
      name: "February",
      index: "02",
    },
    {
      name: "March",
      index: "03",
    },
    {
      name: "April",
      index: "04",
    },
    {
      name: "May",
      index: "05",
    },
    {
      name: "June",
      index: "06",
    },
    {
      name: "July",
      index: "07",
    },
    {
      name: "August",
      index: "08",
    },
    {
      name: "September",
      index: "09",
    },
    {
      name: "October",
      index: "09",
    },
    {
      name: "November",
      index: "11",
    },
    {
      name: "December",
      index: "12",
    },
  ];
  const years = Array.from({ length: 5 }, (_, i) => (2025 + i).toString());

  const handleChange = (field: string, value: string | number | number[]) => {
    setDetails({ ...details, [field]: value });
  };

  return (
    <form className="flex-1 p-6 space-y-6 rounded-2xl text-white shadow-lg">
      <div className="flex flex-col sm:flex-row gap-4">
        <InputTextComponent
          id="firstName"
          label="First Name"
          placeholder="Ben foulen"
          value={details.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
          className="flex-1 bg-white text-black placeholder-gray-400"
        />
        <InputTextComponent
          id="lastName"
          label="Last Name"
          placeholder="Foulen"
          value={details.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
          className="flex-1 bg-white text-black placeholder-gray-400"
        />
      </div>

      {/* Credit Card */}
      <div>
        <label className="block mb-2 font-medium">Credit Card</label>
        <div className="flex gap-3">
          {[0, 1, 2, 3].map((i) => (
            <InputTextComponent
              key={i}
              id={`card${i}`}
              label=""
              placeholder="****"
              type="text"
              value={details.cardNumber[i] || ""}
              onChange={(e) => {
                const val = e.target.value;
                // On accepte uniquement les chiffres et max 4 caractères
                if (/^\d{0,4}$/.test(val)) {
                  const newCard = [...details.cardNumber];
                  newCard[i] = val;
                  handleChange("cardNumber", newCard);
                }
                if (val.length === 4 && i < 3) {
                  const nextInput = document.getElementById(`card${i + 1}`);
                  nextInput?.focus();
                }
              }}
              className="w-20 h-12 text-center bg-white text-black"
            />
          ))}
        </div>
      </div>

      {/* Cvv + Expiry Date */}
      <div className="flex gap-4 flex-wrap">
        <InputTextComponent
          id="cvv"
          label="CVV"
          placeholder="***"
          type="text"
          value={details.cvv}
          onChange={(e) => {
            if (/^\d{0,3}$/.test(e.target.value)) {
              handleChange("cvv", e.target.value);
            }
          }}
          className="h-12 text-center bg-white text-black"
        />
        <div className="flex-1 flex flex-col">
          <label className="mb-1 font-medium">Month</label>
          <select
            value={details.expiryMonth || ""}
            onChange={(e) => handleChange("expiryMonth", e.target.value)}
            className="h-12 px-4 rounded border border-gray-300 text-black focus:ring-2 focus:ring-blue-400 transition bg-white"
          >
            <option disabled value="">
              Month
            </option>
            {months.map((el) => (
              <option key={el.index} value={el.index}>
                {el.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 flex flex-col">
          <label className="mb-1 font-medium">Year</label>
          <select
            value={details.expiryYear || ""}
            onChange={(e) => handleChange("expiryYear", e.target.value)}
            className="h-12 px-4 rounded border border-gray-300 text-black focus:ring-2 focus:ring-blue-400 transition bg-white"
          >
            <option disabled value="">
              Year
            </option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      <InputTextComponent
        id="amount"
        label="Amount"
        placeholder="0.00"
        type="number"
        value={details.amount}
        onChange={(e) => {
          const val = e.target.value;
          const amount = parseFloat(e.target.value) > 0 ? val : 0;
          handleChange("amount", Number(amount));
        }}
        className="w-full bg-white text-black placeholder-gray-400"
      />
    </form>
  );
}
