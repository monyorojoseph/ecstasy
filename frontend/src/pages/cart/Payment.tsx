import React, { useEffect } from 'react';
import { getCartItems } from  '../../redux/actions/cart'
import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/outline';
import { getCurrencyFormat } from "../../utils/formatCurrency";
import { totalPrice } from "../../utils/price";
import CoinbaseCommerceButton from 'react-coinbase-commerce';
import 'react-coinbase-commerce/dist/coinbase-commerce-button.css';
import { cartReducerType } from '../../redux/reducers/cart';
import { connect } from 'react-redux';
import { stateTypes } from '../../interface_types/state';


interface PropTypes {
    getCartItems: Function
    cart: cartReducerType
  }

const Payment = ({getCartItems, cart}: PropTypes) => {
    const { loading, order_items } = cart

    useEffect(()=> {
        getCartItems()
    }, [])

    return (
        <div className='container mx-auto'>

            <div className="flex justify-center">
                <div className="w-full py-2 space-y-3">
                    <h6 className="font-bold text-xl text-center text-orange-500">Payment</h6>
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
                                                    <li className="px-4" key={order_item.id}>
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


                    {/* show total */}
                    <div className="font-bold">
                        <p>You will be charged <span className="text-slate-400 ml-3">{totalPrice(order_items)}</span></p>
                    </div>

                    {/* py */}
                    <div className="bg-orange-600 text-white py-1 px-2 rounded-md font-bold w-fit">
                        <CoinbaseCommerceButton 
                        checkoutId={'My checkout ID'} 
                        />
                    </div>
                </div>
            </div>
            
        </div>
    );
};


const mapStateToProps = (state:stateTypes)=> ({
    cart: state.cart
  })
  
  const mapDispatchToProps = {
    getCartItems
  }

export default connect(mapStateToProps, mapDispatchToProps)(Payment);