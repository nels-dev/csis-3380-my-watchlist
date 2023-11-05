import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext({
    authenticated: false, 
    token: null,
    login: ()=> {}
})

const AuthProvider = ({children})=>{
    const [token, setToken] = useState();
    const [authenticated, setAuthenticated] = useState(false)
    const login = (token) => {
        if(token){
            setToken(token)
            setAuthenticated(true);
        }else{
            setToken(undefined)
            setAuthenticated(false);
        }
    }
    return <AuthContext.Provider value={{authenticated, token, login}}>
        {children}
    </AuthContext.Provider>
}

export default AuthProvider;