import { createBrowserRouter } from "react-router-dom";
import Login from './../Components/Authentication/Login';
import MainLayout from "../Layout/MainLayout";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import DeshboarLayout from './../Layout/DeshboarLayout';
import BookParcel from "../Pages/Deshboard/DeshboardPages/UserPages/BookParcel";


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
       path: "/deshboard",
       element: <DeshboarLayout/>,
       children:[
        {
          path:"bookParcel",
          element:<BookParcel/>
        }
       ]
     },
    
    
   ]);

export default router;