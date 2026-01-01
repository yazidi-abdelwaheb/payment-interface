import { ButtonComponent } from "../../component";

interface PurchaseProps {
    amount?: number|null;
    handelpaymant?: () => void;
    verifyDetails?: () => boolean;
}


export default function Purchase(props: PurchaseProps) {
    let { amount, handelpaymant } = props;
    amount = amount ? amount  : 0;
    const tax = amount ? amount * 0.01 : 0;
    const total = amount ? amount + tax : 0;
  return (
    <div className="w-full lg:w-1/3 bg-linear-to-b from-blue-400 to-blue-600 text-white p-8 flex flex-col justify-between rounded shadow-xl">
      <div className="space-y-4">
        <h2 className="text-xl">Your Total</h2>
        <div className="flex justify-between">
          <span className="uppercase text-sm ">Amount</span>
          <span className="text-lg font-medium">{amount.toFixed(3)} DT</span>
        </div>
        <div className="flex justify-between">
          <span className="uppercase text-sm ">+ Tax (1%)</span>
          <span className="text-lg font-medium">{tax.toFixed(3)} DT</span>
        </div>
        <hr className="border-white" />
        <div className="flex justify-between items-center">
          <span className="text-3xl font-semibold">{total.toFixed(3)}</span>
        </div>
      </div>
      {/* Submit Button */}

      <ButtonComponent
        label="Pay Now"
        color="#000"
        bgColor="linear-gradient(to right, #68D391, #F6E05E)"
        onClick={handelpaymant}
        disabled={!(props.verifyDetails?.())}
        className="w-full h-12 bg-linear-to-r from-green-400 to-gray-400 rounded-xl font-semibold hover:scale-105 transform transition"
      />
    </div>
  );
}
