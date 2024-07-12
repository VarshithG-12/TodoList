import { createContext, useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import toast from "react-hot-toast";

const AuthContext = createContext()
export default AuthContext

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({children}) => {
    let [user, setUser] = useState(() => localStorage.getItem("authTokens") ? jwtDecode(localStorage.getItem("authTokens")) : null)
    let [auth, setAuth] = useState(() => localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null)
    let [loading, setLoading] = useState(true)
    let navigate = useNavigate()
    let register = async(e) =>{
        e.preventDefault()
        let response = await fetch('/api/register/',
        {
            method:'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({'username': e.target.username.value,'password': e.target.password.value})
        })
        if(response.status === 200){
            toast.success("Registered Successfully!")
            login(e)
        }
        else {
            toast.error("Credentials Already exists");
        }
    }
    let login = async(e) =>{        
        e.preventDefault()
        let response = await fetch('/api/token/',
        {
            method:'POST',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({'username': e.target.username.value,'password': e.target.password.value})
        })
        let data = await response.json()

        if(response.status===200){
            setAuth(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem("authTokens", JSON.stringify(data));
            toast.success("logged in Successfully!")
            navigate("/");
        }
        else {
            toast.error("Wrong Credentials");
        }
    }
    let logout = () => {
        if(user){
            toast.success("logged out!")
        }
        setAuth(null)
        setUser(null)
        localStorage.clear();
        navigate("/login");
    }
    let deleteAccount = async() => {
        console.log("doing...")
        if(user){
            
            let response = await fetch('/api/delete/user/'+String(user.user_id)+'/',
            {
                method:"DELETE",
                headers: {"Content-Type":"application/json"},
            })
            if(response.status===204){
                setAuth(null)
                setUser(null)
                localStorage.clear();
                toast.success("Deleted Account")
                navigate("/");
            }
            else{
                toast.error("Some error occured")
            }
        }
    }
    let updateToken = async() => {
        let response = await fetch("/api/token/refresh/",
        {
            method : "POST",
            headers : {"Content-Type":"application/json"},
            body : JSON.stringify({'refresh':auth?.refresh})
        })
        let data = await response.json()
        if(response.status === 200){
            setAuth(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem("authTokens", JSON.stringify(data));
        }
        else{
            logout()
        }
        if(loading){
            setLoading(false)
        }
    }
    let AreYouSure = (e) =>{
        e()
    }
    const ContextData = {
        register:register,
        user:user,
        login:login,
        logout:logout,
        auth:auth,
        deleteAccount:deleteAccount,
        AreYouSure:AreYouSure
    }
    useEffect(() => {
        if(loading){
          updateToken()
        }
        let interval = setInterval(()=>{
            if(auth){
                updateToken()
            }
        },1000*60*4)
        return ()=> clearInterval(interval)
      }, [auth, loading])
    return (<AuthContext.Provider value={ContextData}>{children}</AuthContext.Provider>)
}