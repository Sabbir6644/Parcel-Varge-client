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
       ]
     },
    
    
   ]);

export default router;