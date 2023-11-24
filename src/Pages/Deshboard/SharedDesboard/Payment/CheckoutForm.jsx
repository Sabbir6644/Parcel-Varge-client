import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../SharedComponents/Hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import useAuth from "../../../../SharedComponents/Hooks/useAuth";



const CheckoutForm = () => {
     const {user}= useAuth();
     const { amount } = useParams();
     // console.log(amount);
     const price  = parseInt(amount*100);
     // console.log(price);
     const axiosSecure = useAxiosSecure();
     const [err, setErr] = useState('')
     const [clientSecrete, setClientSecret] = useState('')
     const [trxId, setTrxId] = useState('')
     const stripe = useStripe();
     const elements = useElements();


     useEffect(() => {
          axiosSecure.post('/create-payment-intent', {price})
               .then(res => {
                    if (res?.data?.clientSecret) {
                         setClientSecret(res?.data?.clientSecret); 
                    }
                    
               })
     }, [axiosSecure,price])

// console.log(clientSecrete);



     const handleSubmit = async (e) => {
          e.preventDefault();
          if (!stripe || !elements) {
               // Stripe.js has not loaded yet. Make sure to disable
               // form submission until Stripe.js has loaded.
               return;
          }
          const card = elements.getElement(CardElement);
          if (card == null) {
               return;
          }

          const { error, paymentMethod } = await stripe.createPaymentMethod({
               type: 'card',
               card,
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

                    // const payment= {
                    //      email: user.email,
                    //      price:price,
                    //      date: new Date(),
                    //      trxId:
                    // }



               }
          }




     }
     return (
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
               <button className="py-1 rounded-md px-3 bg-gray-200" type="submit" disabled={!stripe || !clientSecrete}>
                    Pay
               </button>
               <p className="text-red-600">{err}</p>
               {
                    trxId&& <p className="text-green-600">Your transaction id: {trxId}</p>
               }
          </form>
     );
};

export default CheckoutForm;