import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addToCartAction, removeFromCartAction } from '../Redux/Actions/Cart';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';



const Checkout = () => {

    const cart = useSelector((state) => state.cartReducer);
    const { cartItems, shippingAddress } = cart;


    const userLoginReducer = useSelector((state) => state.userLoginReducer);
    const { userInfo } = userLoginReducer;
    const [email, setEmail] = useState(userInfo.email);
    const [firstName, setFirstName] = useState(shippingAddress.firstName);
    const [lastName, setLastName] = useState(shippingAddress.lastName);
    const [appartment, setAppartment] = useState(shippingAddress.appartment);
    const [address, setAddress] = useState(shippingAddress.address);
    const [province, setProvince] = useState(shippingAddress.province);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);
    const dispatch = useDispatch();

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCartAction(id));
    }

    const addToCartHandler = (id, qty) => {
        dispatch(addToCartAction(id, qty));
    }

    const taxRates = {
        "Alberta": 0.05,
        "British Columbia": 0.12,
        "Manitoba": 0.12,
        "New Brunswick": 0.15,
        "Newfoundland and Labrador": 0.15,
        "Northwest Territories": 0.05,
        "Nova Scotia": 0.15,
        "Nunavut": 0.05,
        "Ontario": 0.13,
        "Prince Edward Island": 0.15,
        "Quebec": 0.14975,  // 5% TPS + 9.975% TVQ
        "Saskatchewan": 0.11,
        "Yukon": 0.05
    };

    // subtotal (without shipping price and taxes)
    const addDecimal = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };
    // subtotal price
    const subtotal = addDecimal(cartItems.reduce((total, item) => total + item.qty * item.price, 0));
    const taxPrice = addDecimal(Number((taxRates["Quebec"] * subtotal).toFixed(2)));
    const shippingPrice = addDecimal(subtotal > 40 ? 0 : 8);
    const total = (Number(subtotal) + Number(taxPrice) + Number(shippingPrice)).toFixed(2);

    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">

                <div className="lg:w-5/5 mx-auto flex flex-wrap justify-around">

                    {/* <div className="lg:w-1/3 w-full  lg:pl-10 lg:py-6 mb-6 lg:mb-0"></div> */}
                    {/* <div className="lg:w-4/5 mx-auto flex flex-wrap"> */}
                    {/* partie Shipping Address */}
                    <div className="lg:w-1/3 flex flex-col w-full mt-10 md:mt-0 relative z-10">



                        {userInfo ? (
                            <>
                            </>
                        ) : (
                            <div className="relative mb-4">
                                <h2 className="text-gray-900 text-lg mb-2 font-medium title-font">Contact</h2>
                                <label className="leading-9 text-sm text-gray-600">Email or mobile phone number</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />

                            </div>
                        )}




                        <div className="relative mb-4">
                            <h2 className="text-gray-900 text-lg mb-2 font-medium title-font">Delivery</h2>

                            <label className="leading-7 text-sm text-gray-600">Country/Region</label>
                            <input
                                type="text"
                                id="country"
                                name="country"
                                value={"Canada"}
                                onChange={(e) => setCountry(e.target.value)}
                                readOnly
                                className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                            <div className="flex space-x-2 mt-3">
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    placeholder="First name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="w-1/2 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Last name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="w-1/2 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                placeholder="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 mt-4 leading-8 transition-colors duration-200 ease-in-out"
                            />

                            <input
                                type="text"
                                id="apartment"
                                name="apartment"
                                placeholder="Apartment, suite, etc. (optional)"
                                value={appartment}
                                onChange={(e) => setAppartment(e.target.value)}
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 mt-4 leading-8 transition-colors duration-200 ease-in-out"
                            />
                            <div className="flex space-x-2 mt-4">

                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    placeholder="City"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="w-1/2 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                                <select
                                    id="province"
                                    name="province"
                                    value={province}
                                    onChange={(e) => setProvince(e.target.value)}
                                    className="w-1/2 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                >
                                    <option value="">Alberta</option>
                                    <option value="Quebec">British Columbia</option>
                                    <option value="Ontario">Manitoba</option>
                                    <option value="Ontario">New Brunswick</option>
                                    <option value="Ontario">Newfoundland and Labrador</option>
                                    <option value="Ontario">Nova Scotia</option>
                                    <option value="Ontario">Ontario</option>
                                    <option value="Ontario">Quebec </option>
                                    <option value="Ontario">Saskatchewan</option>
                                    <option value="Ontario">Northwest Territories</option>
                                    <option value="Ontario">Nunavut </option>
                                    <option value="Ontario">Yukon</option>
                                </select>
                            </div>
                            <input
                                type="text"
                                id="postalCode"
                                name="postalCode"
                                placeholder="Postal code"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 mt-4 leading-8 transition-colors duration-200 ease-in-out"
                            />
                            {/* <input
                                type="text"
                                id="phone"
                                name="phone"
                                placeholder="Phone (optional)"
                                value={phone}
                                onChange={handleChange}
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 mt-4 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div> */}

                            {/* <div className="relative mb-4">
                            <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Shipping method</h2>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="freeShipping"
                                    name="shippingMethod"
                                    value="free"
                                    checked={'free'}
                                    onChange={handleChange}
                                    className="form-radio"
                                />
                                <label htmlFor="freeShipping" className="ml-2">Free Standard Shipping (7-10 Working Days)</label>
                            </div> */}
                            {/* <div className="flex items-center mt-4">
                                <input
                                    type="radio"
                                    id="expressShipping"
                                    name="shippingMethod"
                                    value="express"
                                    checked={'express'}
                                    onChange={handleChange}
                                    className="form-radio"
                                />
                                <label htmlFor="expressShipping" className="ml-2">Express Shipping (5-7 Working Days) - $4.00</label>
                            </div>
                        </div> */}

                            {/* <div className="relative mb-4">
                            <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Payment</h2>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="creditCard"
                                    name="paymentMethod"
                                    value="creditCard"
                                    checked={'creditCard'}
                                    onChange={handleChange}
                                    className="form-radio"
                                />
                                <label htmlFor="creditCard" className="ml-2">Credit Card</label>
                            </div> */}
                            {/* <div className="flex items-center mt-4">
                                <input
                                    type="radio"
                                    id="paypal"
                                    name="paymentMethod"
                                    value="paypal"
                                    checked={'paypal'}
                                    onChange={ }
                                    className="form-radio"
                                />
                                <label htmlFor="paypal" className="ml-2">PayPal</label>
                            </div>
                        </div> */}


                        </div>


                        {/* partie Order Summary */}

                        {/* <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0"></div> */}
                        {/* <div className="lg:w-4/5 mx-auto flex flex-wrap"> */}

                        <div className="lg:w-1/3 w-full lg:pl-10 lg:py-6 mb-6 lg:mb-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">Order Summary</h2>


                            <div className="mt-8">
                                <div className="flow-root">
                                    <ul role="list" className="">

                                        {cartItems.map((product) => (
                                            <li key={product.id} className="flex py-6">
                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    <img
                                                        alt={product.imageAlt}
                                                        src={product.image}
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>

                                                <div className="ml-4 flex flex-1 flex-col">
                                                    <div>
                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                            <h3>
                                                                <a href={product.href}>{product.name}</a>
                                                            </h3>
                                                            <p className="ml-4">${product.price}</p>
                                                        </div>

                                                    </div>
                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                        <p className="text-gray-500">Qty <select
                                                            value={product.qty}
                                                            onChange={(e) => addToCartHandler(product.product, Number(e.target.value))}
                                                            className="rounded border appearance-none border-gray-300 ml-2 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                                                        >
                                                            {
                                                                [...Array(product.countInStock).keys()].map((x) => (
                                                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                                ))
                                                            }



                                                        </select></p>

                                                        <div className="flex">
                                                            <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => removeFromCartHandler(product.product)}>
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>



                            <div className="flex border-t border-gray-200 py-2">
                                <span className="text-gray-500">Items Subtotal</span>
                                <span className="ml-auto text-gray-900">${subtotal}</span>
                            </div>
                            <div className="flex border-t border-gray-200 py-2">
                                <span className="text-gray-500">Tax prices</span>
                                <span className="ml-auto text-gray-900">${taxPrice}</span>
                            </div>
                            <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                                <span className="text-gray-500">Shipping price</span>
                                <span className="ml-auto text-gray-900">{subtotal > 35 ? "Free" : `$${shippingPrice}`}</span>
                            </div>
                            <div className="flex">
                                <span className="title-font font-medium text-2xl text-gray-900">Total: ${total}</span>
                                <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Place Order</button>

                            </div>
                        </div>





                    </div>
                </div>
            </div>
        </section>
    )

};

export default Checkout;