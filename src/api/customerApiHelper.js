import api from '../config/config.js';
import { default as axios } from './axios-api';
const customerApiHelper = {
    fetchCustomerApi: action => {
        let url = api.api_path + api.version_path + api.customer_path;

	    return axios({
	        method: "get",
	        url: url,
	        crossdomain: true
	    });
	},

	updateCustomerAddressApi: action => {
	    let url = api.api_path + api.version_path + api.customer_path;
	    let credentials = {
	        "name": action.payload.name,
	        "email": action.payload.email,
	        "mob_phone": action.payload.mob_phone,
	        "day_phone": action.payload.day_phone,
	        "eve_phone": action.payload.eve_phone
	    }

	    return axios.put(url, credentials);
	},

	updateRegionCustomerAddressApi: action => {
		let url = api.api_path + api.version_path + api.customers_path + '/address';
	    let credentials = {
	        "address_1": action.payload.address1,
	        "address_2": action.payload.address2,
	        "city": action.payload.city,
	        "region": action.payload.region,
	        "postal_code": action.payload.postal_code,
	        "country": action.payload.country,
	        "shipping_region_id": action.payload.shipping_region_id
	    }

	    return axios.put(url, credentials);
	}
};

export default customerApiHelper;
