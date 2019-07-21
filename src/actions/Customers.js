import  {  
	FETCH_TOKEN,
	LOGOUT, 
	RESET, 
	REGISTER_CUSTOMER, 
	REGISTER_FAILED,
	FETCH_CUSTOMER_DETAILS,
  UPDATE_ADDRESS,
  UPDATE_REGION_ADDRESS,
  UPDATE_CC
} from '../actions/types';

export const fetchToken  = (payload ) => ({
      type: FETCH_TOKEN,
      payload
});

export const registerCustomer  = (payload ) => ({
      type: REGISTER_CUSTOMER,
      payload
});

export const logoutCustomer = () => ({
    type: LOGOUT
});

export const clearStore = () => ({
    type: RESET
});

export const dispatchRegisterError = () => ({
    type: REGISTER_FAILED
});

export const customerDetails = () => ({
    type: FETCH_CUSTOMER_DETAILS
});

export const updateAddress = (payload) => ({
    type: UPDATE_ADDRESS,
    payload
});

export const updateRegionAddress = (payload) => ({
    type: UPDATE_REGION_ADDRESS,
    payload
});

export const updateCreditCard = (payload) => ({
  type: UPDATE_CC,
  payload
})




