import { loadStripe } from "@stripe/stripe-js";
import Heading3 from "../../../../Components/Heading3";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK)
const Payment = () => {
     return (
          <div>
               <div className="my-4">
                    <Heading3 heading='Payment' />
               </div>

               <div>
                    <Elements stripe={stripePromise}>
                         <CheckoutForm />
                    </Elements>
               </div>

          </div>
     );
};

export default Payment;