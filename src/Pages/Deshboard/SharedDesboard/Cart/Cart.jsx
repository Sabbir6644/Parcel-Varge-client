import { useState } from "react";
import useAxiosSecure from "../../../../SharedComponents/Hooks/useAxiosSecure";
import useCartData from "./useCartData";
import { Link } from "react-router-dom";

const Cart = () => {  
  const axiosSecure = useAxiosSecure();
  const { cartItems, isFetching, refetch}=useCartData();
  const [itemQuantity, setItemQuantity] = useState({});

  const handleQuantityChange = (e, itemId) => {
     let newQuantity = parseInt(e.target.value, 10);
     newQuantity = newQuantity < 1 ? 1 : newQuantity; 
     setItemQuantity(prevState => ({
       ...prevState,
       [itemId]: newQuantity
     }));
   };
//    calculate total price
   const total = cartItems?.reduce((accumulator, item) => {
     const quantity = itemQuantity[item._id] || 1;
     return accumulator + item.price * quantity;
   }, 0);
   const handleCancel=async(id)=>{
     axiosSecure.delete(`/cart/${id}`)
     .then(res=>{
          console.log(res?.data?.deletedCount);
          res?.data?.deletedCount>0 && 
          refetch()
     } 
  
     )
   }

  return (
    <div>
      {
          isFetching? <p>Data Loading...</p>:
          <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name of Product</th>
              <th>Unit Price (TK)</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems?.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>{item?.name}</td>
                <td>{item.price}</td>
                <td>
                  <input
                    onChange={(e) => handleQuantityChange(e, item._id)}
                    defaultValue={itemQuantity[item._id] || 1}
                    className="border-2 w-20"
                    type="number"
                    name="qnt"
                    min={1}
                  />
                </td>
                <td>{(item.price * (itemQuantity[item._id] || 1)).toFixed(2)}</td>
              <td><button onClick={()=>handleCancel(item?._id)} className="btn">Cancle</button></td>
              </tr>
              
            ))}
            <tr className="font-medium">
               <td></td>
               <td></td>
               <td></td>
               <td>Sub Total:</td>
               <td>{total.toFixed(2)} TK</td>
               <td><Link to={`/deshboard/payment/${total}`}><button className="btn">Check Out</button></Link></td>
               </tr>
          </tbody>
        </table>
      </div>
      }
    </div>
  );
};

export default Cart;
