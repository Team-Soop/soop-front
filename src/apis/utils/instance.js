import axios from "axios";

const instance = axios.create({
    baseURL: "3.34.215.27",
    headers: {
        Authorization: "Bearer " + localStorage.getItem("AccessToken")
    }
});

export default instance;