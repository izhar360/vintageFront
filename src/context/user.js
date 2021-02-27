import React, { createContext ,useState} from "react";


const UserContext = createContext();

const getuserfromLocalStrorage = () => {
    return localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {username: null,token: null}
}

function UserProvider({children}) {

    const [user,setUser] = useState(getuserfromLocalStrorage())

    const userLogin = (user) => {
        setUser(user);
        localStorage.setItem("user",JSON.stringify(user))
    }

    const userLogout = () => {
        setUser({username: null,token: null});
        localStorage.removeItem("user")
    }

    //alert

    const [alert,setAlert] = useState({
        show: false,
        msg: "",
        type: "success"
    })


    const showAlert = ({msg,type="success"}) => {
      setAlert({show: true,msg,type})
    }
    const hideAlert = () => {
        setAlert({...alert,show: false})
    }
   
    return <UserContext.Provider value={{user,userLogin,userLogout,alert,showAlert,hideAlert}}>

        {children}
    </UserContext.Provider>
}

export  {UserProvider,UserContext};
