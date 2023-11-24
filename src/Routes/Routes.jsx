import { createBrowserRouter } from "react-router-dom";
import Login from './../Components/Authentication/Login';
import MainLayout from "../Layout/MainLayout";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";


const router = createBrowserRouter([
    
     {
       path: "/",
       element: <MainLayout/>,
      errorElement: <ErrorPage/>
     },
     {
       path: "/login",
       element: <Login></Login>,
     },
    
    
   ]);

export default router;