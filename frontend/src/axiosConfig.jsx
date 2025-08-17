import axios from 'axios';
//create an instance
const axiosInstance = axios.create({
  baseURL: 'http://13.55.53.130:5001', // local
  //baseURL: 'http://3.26.96.188:5001', // live
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;
