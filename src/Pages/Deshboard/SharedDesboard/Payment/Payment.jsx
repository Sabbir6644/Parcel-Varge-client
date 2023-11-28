/* eslint-disable react/prop-types */
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK)
const Payment = ({price}) => {
     return (
          <div>
               

               <div>
                    <Elements stripe={stripePromise}>
                         <CheckoutForm amount={price} />
                    </Elements>
               </div>

          </div>
     );
};

export default Payment;