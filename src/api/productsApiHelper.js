import api from '../config/config.js';
import { default as axios } from './axios-api';
const productsApiHelper = {
    fetchProductsApi: action => {
        // build the params based on available content in action
	    // this will work for searching and displaying the full list of videos
	    let params = {};
	    if (action.page) params.page = action.page;
	    if (action.size) params.size = action.size;
	    if (action.color) params.color = action.color;
	    if (action.minPrice && action.maxPrice) {
	        params.min_price = action.minPrice;
	        params.max_price = action.maxPrice;
	    }
	    params.description_length = 50;
	    params.limit = 10;
	    return axios({
	        method: "get",
	        url: api.api_path + api.version_path + api.products_path,
	        params: params,
	        crossdomain: true
	    });
	},

	fetchProductApi: action => {
	    const { productId } = action;
	    return axios({
	        method: "get",
	        url: api.api_path + api.version_path + api.products_path + '/' + productId + '/details',
	        crossdomain: true
	    });
	},

	fetchAttributesApi: action => {
		const { productId } = action;
	    return axios({
	        method: "get",
	        url: api.api_path + api.version_path + api.attributes_path + '/inProduct/' + productId,
	        crossdomain: true
	    });
	},

	searchProductsApi: action => {
		// build the params based on available content in action
	    // this will work for searching and displaying the full list of videos
	    let params = {};
	    let url;
	    if (action.page) params.page = action.page;
	    if (action.searchValue) {
	        params.query_string = action.searchValue;
	        url = api.api_path + api.version_path + api.products_path + '/search'
	    } else {
	        url = api.api_path + api.version_path + api.products_path
	    }
	    params.description_length = 50;
	    params.limit = 10;
	    return axios({
	        method: "get",
	        url: url,
	        params: params,
	        crossdomain: true
	    });
	},

	fetchProductsCategoryApi: action => {
		const { categoryId } = action
	    // build the params based on available content in action
	    // this will work for searching and displaying the full list of videos
	    let params = {};
	    let url;
	    if (action.page) params.page = action.page;
	    if (action.categoryId != null) {
	        url =api.api_path + api.version_path + api.products_path + '/inCategory/' + categoryId;
	    } else {
	        url = api.api_path + api.version_path + api.products_path
	    }
	    params.description_length = 50;
	    params.limit = 10;
	    return axios({
	        method: "get",
	        url: url,
	        params: params,
	        crossdomain: true
	    });
	},

	fetchProductsDepartmentApi: action => {
		const { departmentId } = action
	    // build the params based on available content in action
	    // this will work for searching and displaying the full list of videos
	    let params = {};
	    let url;
	    if (action.page) params.page = action.page;
	    if (action.departmentId != null) {
	        url =api.api_path + api.version_path + api.products_path + '/inDepartment/' + departmentId;
	    } else {
	        url = api.api_path + api.version_path + api.products_path
	    }
	    params.description_length = 50;
	    params.limit = 10;
	    return axios({
	        method: "get",
	        url: url,
	        params: params,
	        crossdomain: true
	    });
	}
};

export default productsApiHelper;
