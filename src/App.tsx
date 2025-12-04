import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  ConfigPaymentPage,
  HomePage,
  PaymentPage,
  SuccessPaymentPage,
} from "./app/pages";

export default function App() {


  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        { index: true, element: <HomePage/> },
        {
          path: "payment",
          children: [
            { index: true, element: <PaymentPage /> },
            { path: ":id", element: <ConfigPaymentPage /> },
            { path: "success", element: <SuccessPaymentPage /> },
          ],
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
