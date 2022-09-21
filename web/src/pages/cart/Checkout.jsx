import React, { useEffect, useState } from "react";
import { RadioGroup, Disclosure } from '@headlessui/react'
import { ChevronRightIcon } from "@heroicons/react/outline";
import { useGeolocated } from "react-geolocated";
import { connect } from "react-redux";
import { getDeliveryPlans } from '../../redux/actions/delivery_plan';
import { checkout, getUserDefaultAddress } from "../../redux/actions/cart";
import { useNavigate } from "react-router-dom";
import { getCurrencyFormat } from "../../utils/formatCurrency";
// import { classNames } from '../../utils/combineClassNames'


// const plans = ['One hour', 'Six hours', 'One day']


const Checkout = ({ delivery_plan, getDeliveryPlans, checkout, cart, getUserDefaultAddress })=> {
    const { loading, plans } = delivery_plan;
    const { loading: cartLoading, address, checkout:cartCheckout } = cart;
    let navigate = useNavigate()
    const [delivery, setdelivery] = useState(plans[0])
    const [town, setTown] = useState('')
    const [longitude, setLongitude] = useState()
    const [latitude, setLatitude] = useState()
    const [defaultAddress, setDefaultAddress] = useState(false)
    const [useDefaultAddress, setUseDefaultAddress] = useState(false)
    
    const { coords, isGeolocationAvailable, isGeolocationEnabled, getPosition } =
    useGeolocated({
        positionOptions: {
            enableHighAccuracy: false,
        },
        suppressLocationOnMount: true
    });


    const submitHandler = (e)=> {
        e.preventDefault()
        console.log({delivery, town, defaultAddress, useDefaultAddress})
        checkout({delivery, town, defaultAddress, useDefaultAddress})
    }

    useEffect(()=> {
        getDeliveryPlans();
        getUserDefaultAddress();
        if (cartCheckout){
            navigate('/payment');
        }
    }, [cartCheckout])


    return (
        <>
            <div className="container mx-auto">
                <div className="flex justify-center">
                    <div className="w-full py-2 space-y-3">
                        <h6 className="font-bold text-xl text-center text-orange-500">Checkout form</h6>
                        {/* shipping address */}
                        <div>
                            <div className="space-y-2">
                                <h6 className="font-bold text-xl text-orange-500">Shipping address</h6>
                                <Disclosure>
                                    {({ open })=>(
                                        <>
                                        <Disclosure.Button className="py-2 flex justify-between font-medium border rounded-md shadow-sm px-4 w-full">                                            
                                            <span>Read shipping options, pick one that suits you</span>
                                            <ChevronRightIcon
                                                className={`${open ? "transform rotate-90" : ""} font-extrabold h-5 w-6`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="text-gray-500">
                                            <div className="space-y-2">
                                                <h6 className="text-orange-500 font-bold">Reside in Nairobi</h6>
                                                <p>For those who reside in Nairobi we do door to door delivery.</p>
                                                <p>We do one hour delivery, two hours delivery and one day delivery</p>
                                            </div>
                                            <div className="space-y-2">
                                                <h6 className="text-orange-500 font-bold">Outside Nairobi</h6>
                                                <p>We do one day delivery and one week delivery</p>
                                            </div>
                                        </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            </div>
                            <div>
                                <form className="mt-4 space-y-6" onSubmit={submitHandler}>
                                <div className="space-y-4">
                                    
                                    <div className={`space-y-4 ${useDefaultAddress ? 'hidden' : ''}`}>
                                        <div className="space-y-1">
                                            <label>Town</label>
                                            <input name="town" type="text" 
                                            value={town} onChange={(e)=> setTown(e.target.value)}
                                            required={!useDefaultAddress} className="appearance-none relative rounded-md block w-full px-3 py-2 border border-gray-300 
                                            placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 
                                            focus:z-10 sm:text-sm" placeholder="your town please ?" />
                                        </div>
                                        <div>
                                            <button type="button" 
                                            onClick={getPosition}
                                            className="bg-slate-600 rounded-md shadow-md px-3 py-1 text-white font-bold">
                                                Locate me ?
                                            </button>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                            name="set-default-address"
                                            type="checkbox"
                                            defaultChecked={defaultAddress} onChange={()=> setDefaultAddress(!defaultAddress)}
                                            className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                            />
                                            <label className="ml-2 block text-sm text-gray-900">
                                            Set as default address
                                            </label>
                                        </div>
                                    </div>

                                    {
                                    
                                    address.town &&
                                    (
                                    <div className="flex items-center">
                                        <input
                                        name="use-default-address"
                                        type="checkbox"
                                        defaultChecked={useDefaultAddress} onChange={()=> setUseDefaultAddress(!useDefaultAddress)}
                                        className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                        />
                                        <label className="ml-2 block text-sm text-gray-900">
                                        {`Use default address :- (${address.town})`}
                                        </label>
                                    </div>
                                    )
                                    }
                                    
                                    <div className='space-y-4'>      
                                        {
                                        loading ? (<h6 className="font-bold">Loading delivery plan ...</h6>) :
                                        (<RadioGroup value={delivery} onChange={setdelivery} className="space-y-2" name="delivery">
                                            <RadioGroup.Label
                                            className='font-medium text-lg'>Delivery plan options ?</RadioGroup.Label>
                                            <div className="space-y-2">
                                            {plans.map((delivery) => (
                                                <RadioGroup.Option key={delivery.id} value={delivery.id}
                                                className={({ checked, active }) => `
                                                ${checked ? 'bg-orange-600 text-white' : 'bg-slate-400'} ${active ? 'ring-2 ring-orange-500' : ''}
                                                py-2 outline-none px-5 font-bold rounded-md shadow-md`
                                                }                                   
                                                >
                                                    <div>
                                                        <h6>{delivery.name}</h6>
                                                        <p className="text-sm font-medium text-slate-50">{getCurrencyFormat(delivery.cost)}</p>
                                                        <p className="text-sm font-medium text-white">{delivery.description}</p>
                                                    </div>
                                                </RadioGroup.Option>
                                            ))}
                                            </div>
                                        </RadioGroup> )}                                      
                                    </div>
                                </div>
                                <div>
                                    <button type="submit" 
                                    disabled={cartLoading}
                                    className="py-2 px-4 border border-transparent text-lg md:text-sm rounded-md 
                                    text-white font-bold bg-orange-600 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-orange-800 focus:ring-orange-500">
                                    Submit
                                    </button>
                                </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToprops = (state)=> ({
    delivery_plan: state.delivery_plan,
    cart: state.cart
})

const mapDispatchToProps = {
    getDeliveryPlans, 
    checkout,
    getUserDefaultAddress
}

export default connect(mapStateToprops, mapDispatchToProps)(Checkout);