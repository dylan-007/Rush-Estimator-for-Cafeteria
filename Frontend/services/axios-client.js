import axios from "axios";

const SERVER_BASE_URL = "https://ibm-rush-estimator1.herokuapp.com/";

const LOCAL_SERVER_URL = "http://127.0.0.1:8080/";

const SERVER_AWS_EC2 = "http://ec2-107-20-60-146.compute-1.amazonaws.com:8080/"

const axiosClient = axios.create({
  baseURL: SERVER_BASE_URL,
});

export default axiosClient;
