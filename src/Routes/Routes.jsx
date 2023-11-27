import { createBrowserRouter } from "react-router-dom";
import Login from './../Components/Authentication/Login';
import MainLayout from "../Layout/MainLayout";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import DeshboarLayout from './../Layout/DeshboarLayout';
import BookParcel from "../Pages/Deshboard/DeshboardPages/UserPages/BookParcel";
import WebStatistics from "../Pages/Deshboard/DeshboardPages/AdminPages/WebStatistics";
import AllParcels from "../Pages/Deshboard/DeshboardPages/AdminPages/AllParcels";
import Registration from "../Components/Authentication/Registration";
import MyParcels from "../Pages/Deshboard/DeshboardPages/UserPages/MyParcels";
import UpdatteParcel from "../Pages/Deshboard/DeshboardPages/UserPages/UpdatteParcel";
import MyProfile from "../Pages/Deshboard/DeshboardPages/UserPages/MyProfile";
import AllUsers from "../Pages/Deshboard/DeshboardPages/AdminPages/AllUsers";
import AllDeliveryMen from "../Pages/Deshboard/DeshboardPages/AdminPages/AllDeliveryMen";
import MyDeliveryList from "../Pages/Deshboard/DeshboardPages/DeliveryMenPages/MyDeliveryList";
import MyReviews from "../Pages/Deshboard/DeshboardPages/DeliveryMenPages/MyReviews";


const router = createBrowserRouter([
    
     {
       path: "/",
       element: <MainLayout/>,
      errorElement: <ErrorPage/>,
      children:[
        {
          path:'/',
          element:<Home/>
        }
      ]
     },
     {
       path: "/login",
       element: <Login></Login>,
     },
     {
       path: "/registration",
       element: <Registration/>,
     },
     {
       path: "/deshboard",
       element: <DeshboarLayout/>,
       children:[
        {
          path:"bookParcel",
          element:<BookParcel/>
        },
        {
          path:"statistic",
          element:<WebStatistics/>
        },
        {
          path:"allParcel",
          element:<AllParcels/>
        },
        {
          path:"myParcel",
          element:<MyParcels/>
        },
        {
          path:"update/:id",
          element:<UpdatteParcel/>
        },
        {
          path:"myProfile",
          element:<MyProfile/>
        },
        {
          path:"allUser",
          element:<AllUsers/>
        },
        {
          path:"allDeliveryMen",
          element:<AllDeliveryMen/>
        },
        {
          path:"myDeliveryList",
          element:<MyDeliveryList/>
        },
        {
          path:"myReviews",
          element:<MyReviews/>
        },
       ]
     },
    
    
   ]);

export default router;