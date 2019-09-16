import { default as axios } from './axios-api';
import api from '../config/config.js';
const authApiHelper = {
    fetchAuthenticationApi: action => {
    	console.log("action: ",action)
        let url = api.api_path + api.version_path + api.customers_path + "/login";
	    let credentials = {
	        "email": action.payload.email,
	        "password": action.payload.password
	    };

	    return axios.post(url, credentials);
	},
	registerCustomerApi: action => {
	    let url = api.api_path + api.version_path + api.customers_path;
	    let credentials = {
	        "name": action.payload.name,
	        "email": action.payload.email,
	        "password": action.payload.password
	    }

	    return axios.post(url, credentials);
	}
};
export default authApiHelper;
