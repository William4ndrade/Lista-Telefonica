import axios from "axios";
import HttpConfiguration from "../../config/HttpConfiguration";


const http =  axios.create({
    baseURL: HttpConfiguration.BASEURL,
    headers: {
        "Content-type": "application/json"
    }
})

export default http;
