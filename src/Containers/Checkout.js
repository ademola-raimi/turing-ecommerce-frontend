import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import R from 'ramda';
import { Link, browserHistory } from 'react-router';
import _ from 'lodash';
import api from '../config/config.js';
import Navbar from './Navbar';
import { updateAddress, customerDetails, updateRegionAddress, updateCreditCard } from '../actions/Customers';
import { fetchShippingRegions, shippingPrice } from '../actions/Shipping';
import { totalPrice, emptyCart } from '../actions/ShoppingCart';
import { fetchTax, createOrder, makePayment } from '../actions/Order';
import { validateEmail } from '../helpers/helper';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { isLoggedIn } from '../helpers/helper';
import CheckoutForm from './CheckoutForm';

class Checkout extends Component {
	constructor (props) {
        super(props);
        this.state = {
            ...props,
            data: {
                name: '',
                email: '',
                address1: '',
                address2: '',
                city: '',
                shipping_region_id: '',
                region: '',
                postal_code: '',
                country: '',
                day_phone: '',
                eve_phone: '',
                mob_phone: '',
                credit_card: '',
                region: ''
            },
            errors: {},
            classShipping: "disabled",
            classPayout: "disabled",
            classOrder: "disabled",
            order: "#",
            shipping: "#",
            tabShipping: "",
            tabPayout: "",
            tabOrder: "",
            payout: "#",
            adressActive: "active",
            panelAddress: "tab-pane active",
            panelShipping: "tab-pane",
            panelOrder: "tab-pane",
            panelPayout: "tab-pane",
            totalAmount: 0,
            shippingId: "",
            taxId: "",
            initialCost: 0,
            initialTax: 0,
            description: "description",
            currency: "USD"
        };
    }

    componentDidMount () {
        if (!isLoggedIn()) {
            this.renderRedirect();
            return;
        }
        this.props.actions.customerDetails();
        this.props.actions.fetchShippingRegions();
        this.props.actions.fetchTax();
    }

    shouldComponentUpdate (nextProps, nextState, nextContent) {
        if (_.isNil(this.props.CustomerStore.activeCustomer) && !_.isNil(nextProps.CustomerStore.activeCustomer)) {
                const { activeCustomer } = nextProps.CustomerStore;
                this.setState({
                    data: {
                        name: activeCustomer.name,
                        email: activeCustomer.email,
                        address1: activeCustomer.address_1,
                        address2: activeCustomer.address_2,
                        city: activeCustomer.city,
                        region: activeCustomer.region,
                        postal_code: activeCustomer.postal_code,
                        country: activeCustomer.country,
                        shipping_region_id: activeCustomer.shipping_region_id,
                        day_phone: activeCustomer.day_phone,
                        eve_phone: activeCustomer.eve_phone,
                        credit_card: activeCustomer.credit_card,
                        mob_phone: activeCustomer.mob_phone,
                    }
                })
        }

        if (!_.isEqual(nextProps.ShoppingCartStore.totalAmount, this.props.ShoppingCartStore.totalAmount)) {
            this.setState({
                totalAmount: nextProps.ShoppingCartStore.totalAmount
            })
        }

        return true;
    }

    renderRedirect = () => {
        return (
                browserHistory.push('/login')
            )
    }

    handleChange = name => event => {
        this.setState({
            data: {
                ...this.state.data,
                [name]: event.target.value
            }
        })
    };

    handleAddressSubmit = (event) => {
        event.preventDefault();
        if (this.handleAddressValidation()) {
            this.setState({
                classShipping: "active",
                shipping: "#shipping",
                tabShipping: "tab",
                adressActive: "",
                panelAddress: "tab-pane",
                panelShipping: "tab-pane active"
            })

            this.props.actions.updateAddress(this.state.data);

            return this.renderShippingDetailsForm()
        }
    };

    handleShippingSubmit = (event) => {
        event.preventDefault();
        if (this.handleShippingValidation()) {
            this.setState({
                classOrder: "active",
                classShipping: "",
                order: "#order",
                tabOrder: "tab",
                adressActive: "",
                panelAddress: "tab-pane",
                panelShipping: "tab-pane",
                panelPayout: "tab-pane",
                panelOrder: "tab-pane active"

            })

            this.props.actions.updateRegionAddress(this.state.data);

            this.props.actions.shippingPrice(this.state.data.shipping_region_id);
            this.props.actions.totalPrice();
        }
    };

    handleOrderSubmit = (event) => {
        event.preventDefault();
        if (this.handleShippingOrderValidation()) {
            this.setState({
                classPayout: "active",
                classShipping: "",
                classOrder: "",
                payout: "#payout",
                tabOrder: "",
                tabPayout: "tab",
                adressActive: "",
                panelAddress: "tab-pane",
                panelShipping: "tab-pane",
                panelPayout: "tab-pane active",
                panelOrder: "tab-pane"
            })
            this.props.actions.createOrder(this.state.shippingId, this.state.taxId);

        }
    }

    handleAddressValidation = () => {
        let fields = this.state.data;
        let errors = {};
        let formIsValid = true;

        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = 'Name is required.';
        }
        if (!fields["email"]) {
            formIsValid = false;
            errors["email1"] = 'Email is required.';
        }
        if (fields["email"] && !validateEmail(fields["email"])) {
            formIsValid = false;
            errors["email"] = 'Email is invalid.';
        }
        if (!fields["mob_phone"]) {
            formIsValid = false;
            errors["mob_phone"] = 'Mobile phone is required.';
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    handleShippingValidation = () => {
        let fields = this.state.data;
        let errors = {};
        let formIsValid = true;

        if (!fields["address1"]) {
            formIsValid = false;
            errors["address1"] = 'address1 is required.';
        }
        if (!fields["city"]) {
            formIsValid = false;
            errors["city"] = 'city is required.';
        }
        if (!fields["country"]) {
            formIsValid = false;
            errors["country"] = 'Country is required.';
        }

        if (!fields["postal_code"]) {
            formIsValid = false;
            errors["postal_code"] = 'Postal code is required.';
        }
        if (!fields["city"]) {
            formIsValid = false;
            errors["city"] = 'city is required.';
        }
        if (!fields["country"]) {
            formIsValid = false;
            errors["country"] = 'Country is required.';
        }

        if (!fields["city"]) {
            formIsValid = false;
            errors["city"] = 'city is required.';
        }
        if (!fields["country"]) {
            formIsValid = false;
            errors["country"] = 'Country is required.';
        }
        if (!fields["region"] || fields["region"] == "Please Select") {
            formIsValid = false;
            errors["region"] = 'Region is required.';
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    handleShippingRegion = (e) => {
        const {options, selectedIndex} = e.target;
        this.setState({
            data: {
                ...this.state.data,
                region: options[selectedIndex].text,
                shipping_region_id: e.target.value
            }
        })
    }

    renderAddressDetailsForm = () => {
    	return (
    		<form onSubmit={this.handleAddressSubmit}>
	        <div className="form-group">
	            <label htmlFor="name">Name</label>
	            <input type="text" className="form-control" name="name"  value={this.state.data.name} onChange={this.handleChange('name')} id="name" autoComplete="current-name" />
	            <span className="form-error"><strong>{this.state.errors["name"]}</strong></span>
	        </div>
	        <div className="form-group">
	            <label htmlFor="exampleInputEmail1">Email address</label>
	            <input type="email" className="form-control" id="email" name="email" value={this.state.data.email} onChange={this.handleChange('email')} autoComplete="email" autoFocus />
	            <span className="form-error"><strong>{this.state.errors["email"]}</strong></span>
	        </div>

            <div className="form-group">
                <label htmlFor="mob_phone">Mobile phone number</label>
                <input className="form-control" name="mob_phone" value={this.state.data.mob_phone} onChange={this.handleChange('mob_phone')} type="text" id="mob_phone" autoComplete="current-mob-phone" />
                <span className="form-error"><strong>{this.state.errors["mob_phone"]}</strong></span>
            </div>

	        <div className="form-group">
	            <label htmlFor="day_phone">Day phone number</label>
	            <input className="form-control" name="day_phone" value={this.state.data.day_phone} onChange={this.handleChange('day_phone')} type="text" id="day_phone" autoComplete="current-day_phone" />
	        </div>

	        <div className="form-group">
	            <label htmlFor="eve_phone">Evening phone number</label>
	            <input className="form-control" name="eve_phone" value={this.state.data.eve_phone} onChange={this.handleChange('eve_phone')} type="text" id="eve_phone" autoComplete="current-eve-phone" />
	        </div>
	        <button type="submit" className="btn btn-default">Proceed To shipping</button>
	    </form>
    	);
    }

    renderShippingDetailsForm = () => {
        const { shippingRegions } = this.props.ShippingStore;
        return (
            <form onSubmit={this.handleShippingSubmit}>

            <div className="form-group">
                <label htmlFor="address1">Address one</label>
                <input className="form-control" name="address1"  value={this.state.data.address1} onChange={this.handleChange('address1')} type="text" id="address1" autoComplete="current-address1" />
                <span className="form-error"><strong>{this.state.errors["address1"]}</strong></span>
            </div>
            <div className="form-group">
                <label htmlFor="address2">Address two</label>
                <input className="form-control" name="address2"  value={this.state.data.address2} onChange={this.handleChange('address2')} type="text" id="address2" autoComplete="current-address2" />
                <span className="form-error"><strong>{this.state.errors["address2"]}</strong></span>
            </div>

            <div className="form-group">
                <label htmlFor="city">City</label>
                <input className="form-control" name="city"  value={this.state.data.city} onChange={this.handleChange('city')} type="text" id="city" autoComplete="current-city" />
                <span className="form-error"><strong>{this.state.errors["city"]}</strong></span>
            </div>

            <div className="form-group">
                <label htmlFor="country">Country</label>
                <input className="form-control" name="country"  value={this.state.data.country} onChange={this.handleChange('country')} type="text" id="country" autoComplete="current-country" />
                <span className="form-error"><strong>{this.state.errors["country"]}</strong></span>
            </div>

            <div className="form-group">
                <label htmlFor="postal_code">Postal code</label>
                <input className="form-control" name="postal_code"  value={this.state.data.postal_code} onChange={this.handleChange('postal_code')} type="text" id="postal_code" autoComplete="current-postal-code" />
                <span className="form-error"><strong>{this.state.errors["postal_code"]}</strong></span>
            </div>

            <div className="form-group">
                <label htmlFor="region">Region</label>
                <select onChange={this.handleShippingRegion} className="form-control">
                   {shippingRegions && (shippingRegions.map((shippingRegion) => {
                        return <option selected={(shippingRegion.shipping_region == this.state.data.region) ? "selected" : ""} name={shippingRegion.shipping_region} value={shippingRegion.shipping_region_id}>{shippingRegion.shipping_region}</option>;
                   }))}
               </select>
               <span className="form-error"><strong>{this.state.errors["region"]}</strong></span>
            </div>
            <button type="submit" className="btn btn-default">Proceed To Order</button>
        </form>
        );
    }

    handletax = (e) => {
        const {options, selectedIndex} = e.target;
        const taxPercentage = parseFloat(options[selectedIndex].getAttribute('data-key'));
        let {totalAmount, initialTax} = this.state;
        totalAmount = parseFloat(totalAmount);
        initialTax = parseFloat(initialTax);
        let tax = 0;
        if (taxPercentage !== "0.00") {
            tax = (taxPercentage/100) * (totalAmount - initialTax);
        } 
        const newTotal = (totalAmount - initialTax)  + tax;

        this.setState({
            taxId: e.target.value,
            totalAmount: newTotal,
            initialTax: tax
        })
    }

    handleShipping = (e) => {
        const {options, selectedIndex} = e.target;
        const shippingCost = parseFloat(options[selectedIndex].getAttribute('data-key'));
        let {totalAmount, initialCost} = this.state;
        totalAmount = parseFloat(totalAmount);
        initialCost = parseFloat(initialCost);
        const newTotal = (totalAmount - initialCost) + shippingCost;
        
        this.setState({
            shippingId: e.target.value,
            totalAmount: newTotal,
            initialCost: shippingCost
        })
    }

    handleShippingOrderValidation = () => {
        const { shippingId, taxId } = this.state;
        let errors = {};
        let formIsValid = true;

        if (!shippingId) {
            formIsValid = false;
            errors["shipping"] = 'Shipping type is required.';
        }

        if (!taxId) {
            formIsValid = false;
            errors["tax"] = 'Tax is required.';
        }
        

        this.setState({errors: errors});
        return formIsValid;
    }

    renderOrderDetailsForm = () => {
        const cartsInfo = JSON.parse(localStorage.getItem('cartsInfo'));
        const { shippingInfo, shippingRegions } = this.props.ShippingStore
        const { taxes } = this.props.OrderStore

        return (
            <div>
                <form onSubmit={this.handleOrderSubmit}>
                    <div className="table-responsive">
                        <table className="table-bordered table-striped table-condensed cf">
                            <tbody>
                                {cartsInfo.map((cart,index)=>(
                                    <tr key={index}
                                        className="item-checout">
                                        <td className="first-column-checkout">
                                            <img className="img-thumbnail"
                                                src={api.cloudinary_path + cart.image}
                                                alt={cart.name}  
                                            />
                                        </td>
                                        <td>{cart.name}</td>
                                        <td>${cart.price}</td>
                                        <td>{cart.quantity}</td>
                                        <td>
                                            
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="form-group">
                        <label htmlFor="shippinginfo">Shipping Type</label>
                        <select onChange={this.handleShipping} className="form-control">
                            <option data-key="0" value="">Select shipping type </option>
                           {shippingInfo && (shippingInfo.map((shipping) => {
                                return <option data-key={ shipping.shipping_cost } value={shipping.shipping_id}>{shipping.shipping_type}</option>;
                           }))}
                       </select>
                       <span className="form-error"><strong>{this.state.errors["shipping"]}</strong></span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="tax">Tax</label>
                        <select onChange={this.handletax} className="form-control">
                            <option data-key="0" value="">Select tax type </option>
                            {taxes && (taxes.map((tax) => {
                                return <option data-key={ tax.tax_percentage } value={tax.tax_id}>{tax.tax_type}</option>;
                            }))}
                       </select>
                       <span className="form-error"><strong>{this.state.errors["tax"]}</strong></span>
                    </div>
                
                    <div className="row">
                        <div className="total-user-checkout">
                            <b>Total:</b>
                            ${ parseFloat(this.state.totalAmount).toFixed(2) }
                        </div>
                    </div>
                    <button type="submit" className="btn btn-default">Proceed To Checkout</button>
                </form>
            </div>
        );
    }

    handlePayment = (token) => {
        const { orderId } = this.props.OrderStore
        const data = {
            stripeToken: token.id,
            order_id: orderId,
            description: this.state.description,
            amount: this.state.totalAmount.toFixed(2) * 100,
            currency: this.state.currency
        }
        this.props.actions.makePayment(data);
    }

    renderOrderPage() {
        const { orderId } = this.props.OrderStore
        if (this.props.OrderStore.paymentSuccess) {
            alert("Your order was succesfull")
            this.props.actions.emptyCart();
            localStorage.removeItem('cartId');
            localStorage.removeItem('cartsInfo');
            return (
                browserHistory.push('/order/' + orderId)
            )
         } else if(this.props.OrderStore.paymentSuccess == "failed") {
            alert("Payment failed, please try again")
            return null;
        } else {
            return null;
        }
    }

    renderCheckOutForm = () => {
        return (
            <StripeProvider apiKey="pk_test_DG2pwJ0MPW0qldYUTBRmOiKE00fMMnA5hh">
                <div className="example">
                  <Elements>
                    <CheckoutForm
                        onChange={this.handlePayment}
                    />
                  </Elements>
                </div>
              </StripeProvider>
        );
    }

	render() {
		return (
			<div className="view-container">
			<div className='row'>
				<Navbar/>
            </div>
        	<div className="container">
           		<div className='row'>
					<div>
					    <ul className="nav nav-tabs" role="tablist">
						    <li role="presentation" className={this.state.adressActive}><a href="#address" aria-controls="address" role="tab" data-toggle="tab">ADDRESS DETAILS</a></li>
						    <li className={this.state.classShipping} role="presentation"><a href={this.state.shipping} aria-controls="shipping" role="tab" data-toggle={this.state.tabShipping}>SHIPPING DETAILS</a></li>

                            <li className={this.state.classOrder} role="presentation"><a href={this.state.order} aria-controls="order" role="tab" data-toggle={this.state.tabOrder}>ORDER DETAILS</a></li>

						    <li className={this.state.classPayout} role="presentation"><a href={this.state.payout} aria-controls="payout" role="tab" data-toggle={this.state.tabPayout}>PAYMENT DETAILS</a></li>
					    </ul>

						<div className="tab-content">
						    <div role="tabpanel" className={this.state.panelAddress} id="address">
						    	{this.renderAddressDetailsForm()}
						    </div>
						    <div role="tabpanel" className={this.state.panelShipping} id="shipping">
                                {this.renderShippingDetailsForm()}
						    </div>
                            <div role="tabpanel" className={this.state.panelOrder} id="order">
                                {this.renderOrderDetailsForm()}
                            </div>
						    <div role="tabpanel" className={this.state.panelPayout} id="payout">
                                {this.renderCheckOutForm()}
						    </div>
						</div>
					</div>
				</div>
			</div>
            {this.renderOrderPage()}
			</div>
		);
	}
}

function mapStateToProps(state) {
    return {
        CheckoutStore: state.Checkout,
        CustomerStore: state.Customer,
        ShippingStore: state.Shipping,
        OrderStore: state.Order,
        ShoppingCartStore: state.ShoppingCart,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(
            {
                customerDetails,
                updateAddress,
                updateCreditCard,
                fetchShippingRegions,
                updateRegionAddress,
                fetchTax,
                shippingPrice,
                totalPrice,
                createOrder,
                makePayment,
                emptyCart,
            },
            dispatch
        ),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Checkout);
