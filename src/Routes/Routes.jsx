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
import PrivateRoute from "../Components/Authentication/PrivateRoute";
import AdminRoutte from "../Components/Authentication/AdminRoutte";


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
       element: <PrivateRoute><DeshboarLayout/></PrivateRoute>,
       children:[
        {
          path:"bookParcel",
          element:<PrivateRoute><BookParcel/></PrivateRoute>
        },
        {
          path:"statistic",
          element:<AdminRoutte><WebStatistics/></AdminRoutte>
        },
        {
          path:"allParcel",
          element:<AdminRoutte><AllParcels/></AdminRoutte>
        },
        {
          path:"myParcel",
          element:<PrivateRoute><MyParcels/></PrivateRoute>
        },
        {
          path:"update/:id",
          element:<PrivateRoute><UpdatteParcel/></PrivateRoute>
        },
        {
          path:"myProfile",
          element:<PrivateRoute><MyProfile/></PrivateRoute>
        },
        {
          path:"allUser",
          element:<AdminRoutte><AllUsers/></AdminRoutte>
        },
        {
          path:"allDeliveryMen",
          element:<AdminRoutte><AllDeliveryMen/></AdminRoutte>
        },
        {
          path:"myDeliveryList",
          element:<PrivateRoute><MyDeliveryList/></PrivateRoute>
        },
        {
          path:"myReviews",
          element:<PrivateRoute><MyReviews/></PrivateRoute>
        },
       ]
     },
    
    
   ]);

export default router;