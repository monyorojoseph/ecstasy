import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { stateTypes } from "../../interface_types/state";
import { getCartItems } from  '../../redux/actions/cart'
import { cartReducerType } from "../../redux/reducers/cart";
import { getCurrencyFormat } from "../../utils/formatCurrency";
import { totalPrice } from "../../utils/price";
import CoinbaseCommerceButton from 'react-coinbase-commerce';
import 'react-coinbase-commerce/dist/coinbase-commerce-button.css';
import { RadioGroup, Disclosure, Transition } from '@headlessui/react'
import { ChevronRightIcon } from "@heroicons/react/outline";
// import { classNames } from '../../utils/combineClassNames'


interface PropTypes {
  getCartItems: Function
  cart: cartReducerType
}

const deliverys = ['One hour', 'Six hours', 'One day']

const Checkout = ({getCartItems, cart}: PropTypes)=> {
    const { loading, order_items } = cart
    const [delivery, setdelivery] = useState(deliverys[0])

    useEffect(()=> {
        getCartItems()
    }, [])
    return (
        <>
            <div className="container mx-auto">
                <div className="flex justify-center">
                    <div className="w-96 py-2 space-y-3">
                        <h6 className="font-bold text-xl text-center text-orange-500">Checkout form</h6>

                        {/* show list of order items */}
                        <div>
                        <Disclosure>
                            {({open})=> (
                                <>
                                    <Disclosure.Button className="py-2 flex justify-between font-medium border rounded-md shadow-sm px-4 mb-3 w-full">
                                        <span>Your order items</span>
                                        <ChevronRightIcon
                                            className={`${open ? "transform rotate-90" : ""} font-extrabold h-5 w-6`}
                                        />
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="text-gray-500">
                                        <ul className="list-none divide-y space-y-2 border rounded-lg">
                                            {
                                                order_items.map((order_item)=> (
                                                    <li className="px-4">
                                                        <h6 className="space-x-4 py-2">
                                                            <span className="text-slate-400 text-sm font-bold">{order_item.quantity}</span> 
                                                            <span className="text-lf font-medium">{order_item.item.name}</span> 
                                                            <span className="text-slate-500 text-sm font-bold">{getCurrencyFormat(order_item.item_total_price)}</span>
                                                        </h6>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                        </div>
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
                                <form className="mt-4 space-y-6">
                                <div className="space-y-px">
                                    <div className="space-y-1">
                                        <label>Town</label>
                                        <p className="font-bold">if from Nairobi please select locate me</p>
                                        <input name="town" type="text" 
                                        required className="appearance-none relative rounded-md block w-full px-3 py-2 border border-gray-300 
                                        placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 
                                        focus:z-10 sm:text-sm" placeholder="your town please ?" />
                                        <button className="text-sm text-red-500">Locate me ?</button>
                                    </div>
                                    <div>      
                                        <RadioGroup value={delivery} onChange={setdelivery} className="space-y-2" name="delivery">
                                            <RadioGroup.Label
                                            className='font-medium text-lg'>Delivery in ?</RadioGroup.Label>
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

                        {/* show total */}
                        <div className="font-bold">
                            <p>You will be charged <span className="text-slate-400 ml-3">{totalPrice(order_items)}</span></p>
                        </div>

                        {/* payment */}
                        <div className="bg-orange-600 text-white py-1 px-2 rounded-md font-bold w-fit">
                            <CoinbaseCommerceButton 
                            checkoutId={'My checkout ID'} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state:stateTypes)=> ({
    cart: state.cart
  })
  
  const mapDispatchToProps = {
    getCartItems
  }

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);