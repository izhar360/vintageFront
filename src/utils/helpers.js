// helper functions

import URL from "./URL";


const flattenproduct = (data) => {
 return data.map(item => {
    //  let image = `${URL}${item.image.url}`
    let image = item.image.url
     return {...item,image}
 })
}

export {flattenproduct}