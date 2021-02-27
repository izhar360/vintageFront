import axios from "axios"
import URL from "../utils/URL"

 const loginUser  = async ({email,password}) => {
     
   const response =  axios.post(`${URL}/auth/local`,{

       identifier: email,
       password
    }).catch (error => console.log(error))

    return response
}

export default loginUser;