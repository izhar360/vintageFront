import axios from "axios";
import URL from "../utils/URL";


const submitOrder = async ({name,total,items,stripeTokenId,userToken}) => {

    const response = await axios.post(`${URL}/orders`,{
      name,total,stripeTokenId,items
    },{
        headers:{
            Authorization: `Bearer ${userToken}`
        }
    }).catch(error => console.log(error))

    return response
}

export default submitOrder;