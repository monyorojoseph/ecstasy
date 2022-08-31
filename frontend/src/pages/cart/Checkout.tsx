import React, { useState } from "react";
import { RadioGroup, Disclosure } from '@headlessui/react'
import { ChevronRightIcon } from "@heroicons/react/outline";
import { useGeolocated } from "react-geolocated";
// import { classNames } from '../../utils/combineClassNames'


const deliverys = ['One hour', 'Six hours', 'One day']

const Checkout = ()=> {
    const [delivery, setdelivery] = useState(deliverys[0])
    const [town, setTown] = useState<string>('')
    const [longitude, setLongitude] = useState<number>()
    const [latitude, setLatitude] = useState<number>()
    const [defaultAddress, setDefaultAddress] = useState<boolean>(false)
    const [defaultDeliverPlan, setDefaultDeliveryPlan] = useState<boolean>(false)
    
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
        positionOptions: {
            enableHighAccuracy: false,
        },
        userDecisionTimeout: 5000,
    });


    const submitHandler = (e:React.SyntheticEvent)=> {
        e.preventDefault()
        console.log({delivery, town, longitude, latitude,  defaultAddress, defaultDeliverPlan})
    }


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
                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <label>Town</label>
                                            <input name="town" type="text" 
                                            value={town} onChange={(e)=> setTown(e.target.value)}
                                            required className="appearance-none relative rounded-md block w-full px-3 py-2 border border-gray-300 
                                            placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 
                                            focus:z-10 sm:text-sm" placeholder="your town please ?" />
                                        </div>
                                        <div>
                                            <button type="button" 
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
                                    <div className="flex items-center">
                                        <input
                                        name="use-default-address"
                                        type="checkbox"
                                        // defaultChecked
                                        className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                        />
                                        <label className="ml-2 block text-sm text-gray-900">
                                        Use default address
                                        </label>
                                    </div>
                                    <div className="space-y-4">      
                                        <RadioGroup value={delivery} onChange={setdelivery} className="space-y-2" name="delivery">
                                            <RadioGroup.Label
                                            className='font-medium text-lg'>Delivery plan options ?</RadioGroup.Label>
                                            <div className="space-y-2">
                                            {deliverys.map((delivery) => (
                                                <RadioGroup.Option key={delivery} value={delivery}
                                                className={({ checked, active }) => `
                                                ${checked ? 'bg-orange-600 text-white' : 'bg-slate-400'} ${active ? 'ring-2 ring-orange-500' : ''}
                                                py-2 outline-none px-5 font-bold rounded-md shadow-md`
                                                }                                   
                                                >
                                                {delivery}
                                                </RadioGroup.Option>
                                            ))}
                                            </div>
                                        </RadioGroup>

                                        <div className="flex items-center">
                                            <input
                                            name="set-default-delivery-plan"
                                            type="checkbox"
                                            defaultChecked={defaultDeliverPlan} onChange={()=> setDefaultDeliveryPlan(!defaultDeliverPlan)}
                                            className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                            />
                                            <label className="ml-2 block text-sm text-gray-900">
                                            Set as default delivery plan
                                            </label>
                                        </div>                                        
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                        name="use-default-delivery-plan"
                                        type="checkbox"
                                        // defaultChecked
                                        className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                        />
                                        <label className="ml-2 block text-sm text-gray-900">
                                        Use default delivery plan
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <button type="submit" 
                                    className="py-2 px-4 border border-transparent text-lg md:text-sm rounded-md 
                                    text-white font-bold bg-orange-600 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
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


export default Checkout;