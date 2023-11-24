import { useContext } from "react";
import { AuthContext } from "../Components/Authentication/AuthProvider";


const useAuth = () => {
     const contextApi= useContext(AuthContext)
     return contextApi;
};

export default useAuth;