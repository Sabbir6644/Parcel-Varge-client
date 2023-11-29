/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { CardElement,  useElements,  useStripe } from "@stripe/react-stripe-js";
import Confetti from 'react-confetti';


const CheckoutForm = ({amount}) => {
     const {user}= useAuth();
     // console.log(amount);
     const price  = parseInt(amount*100);
     // console.log(price);
     const axiosSecure = useAxiosSecure();
     const [err, setErr] = useState('')
     const [clientSecrete, setClientSecret] = useState('')
     const [trxId, setTrxId] = useState('')
     const stripe = useStripe();
     const elements = useElements();
     const [showConfetti, setShowConfetti] = useState(false);


     useEffect(() => {
          axiosSecure.post('/create-payment-intent', {price})
               .then(res => {
                    if (res?.data?.clientSecret) {
                         setClientSecret(res?.data?.clientSecret); 
                    }
                    
               })
     }, [axiosSecure,price])

     const handleSubmit = async (e) => {
          e.preventDefault();
          // console.log('stripe elements',elements);
          if (!stripe || !elements) {
               return;
          }
          const card = elements.getElement(CardElement);
          if (card == null) {
               return;
          }

          const { error, paymentMethod } = await stripe.createPaymentMethod({
               type: 'card',
               card:card,
          });

          if (error) {
               setErr(error.message)
               console.log('[error]', error);
          } else {
               console.log('[PaymentMethod]', paymentMethod);
               setErr('')
          }
          const {paymentIntent, error:confirmError}= await stripe.confirmCardPayment(clientSecrete,{
               payment_method: {
                    card: card,
                    billing_details:{
                         email: user?.email || 'anonymous',
                         name: user?.displayName || 'anonymous',
                    }
               }
          })
          if (confirmError) {
               console.log("confirmError", confirmError);
          }else{
               console.log('paymentIntent',paymentIntent);
               if (paymentIntent.status==='succeeded') {
                    // console.log(paymentIntent.id);
                    setTrxId(paymentIntent?.id);
                    setShowConfetti(true);
               }
          }

console.log('trxId',trxId);


     }
     return (
         <div>
           {showConfetti && <Confetti />}
          <form className="max-w-lg mx-auto space-y-4" onSubmit={handleSubmit}>
               <CardElement
                    options={{
                         style: {
                              base: {
                                   fontSize: '16px',
                                   color: '#424770',
                                   '::placeholder': {
                                        color: '#aab7c4',
                                   },
                              },
                              invalid: {
                                   color: '#9e2146',
                              },
                         },
                    }}
               />
               
               <button className="py-1 rounded-md px-3 bg-gray-200" type="submit"> 
                    Pay
               </button>
               <p className="text-red-600">{err}</p>
               {
                    trxId && <div className="text-center">
                         <p className="text-green-600 text-2xl">Your Payment Success</p>
                         <p className="text-green-600">Transaction ID: {trxId}</p>
                    </div>
               }
          </form>
         </div>
     );
};

export default CheckoutForm;