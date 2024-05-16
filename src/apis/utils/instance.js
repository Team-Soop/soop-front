import axios from "axios";
import getServerAddress from "../../constants/serverAddress";

const instance = axios.create({
    baseURL: "http://" + getServerAddress(),
    headers: {
        Authorization: "Bearer " + localStorage.getItem("AccessToken")
    }
});

export default instance;