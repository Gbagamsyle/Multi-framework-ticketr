import { useContext } from "react";
import '.././styles/auth.css'
import { AuthContext } from "../contexts/context";

export function useAuth() {
    return useContext(AuthContext)
}