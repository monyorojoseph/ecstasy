import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { stateTypes } from "../interface_types/state";
import { itemReducerTypes } from "../redux/reducers/item";
import { getItems } from '../redux/actions/item'
import { useEffect } from "react";

interface PropsType{
    getItems: Function
    item: itemReducerTypes
  }

const Welcome = ({getItems, item}: PropsType)=> {
    const { loading, goodies } = item
    
    useEffect(()=> {
        getItems()
    }, [])
    return (
        <div className="container mx-auto pb-5">
            <div className="px-3 md:px-0 space-y-4 mb-5">
                {/* preview */}
                <div className="space-y-4">
                    <div className="space-y-3">
                        <h6 className="font-bold text-2xl">Hi,Stranger !!</h6>
                        <p className="font-bold text-lg text-slate-500">
                            They call me Ecstasy, I sell range of weed products from cookies, candies, blunt and blah blah ...
                        </p>
                        <div>
                            <Link className="text-orange-600" to='/items'>Check out my goodies</Link>
                        </div>
                    </div>

                    <div className="bg-orange-500 rounded-md shadow-md shadow-orange-500 p-3 font-bold text-white space-y-3">
                        <h6 className="text-2xl">You can also gift a friend</h6>
                        <p className="text-lg">Easy !! as long as they have an account with us, just tag their email address when a purchase</p>
                        <p className="text-black">Tell a friend to buy you some </p>
                        <button className="rounded-full py-1 px-4 text-black shadow-md bg-white">
                            Gift a friend ?
                        </button>
                    </div>
                </div>
                {/* list items */}
                <div className="space-y-3">
                    <div className="flex justify-start space-x-3 overflow-x-auto py-2">
                        <button
                        className="rounded-full py-1 px-3 border border-orange-400 text-sm shadow-md shadow-orange-200 font-bold">All</button>
                        <button
                        className="rounded-full py-1 px-3 border border-orange-400 text-sm shadow-md shadow-orange-200 font-bold">Cookies</button>
                        <button
                        className="rounded-full py-1 px-3 border border-orange-400 text-sm shadow-md shadow-orange-200 font-bold">Candies</button>
                        <button
                        className="rounded-full py-1 px-3 border border-orange-400 text-sm shadow-md shadow-orange-200 font-bold">Blunt</button>                        
                    </div>
                    <div 
                    className="flex justify-between font-bold text-lg">
                        <h6>Recent goodies</h6>                        
                        <h6><Link to='/items' className="hover:text-orange-400">View all</Link></h6>
                    </div>

                    <div className="grid grid-cols-1 gap-y-7 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {goodies.slice(0, 4).map((goodie) => (
                            <Link key={goodie.slug} to={`/item-${goodie.slug}`} className="group">
                            <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                                <img
                                src={`http://localhost:8000/${goodie.cover_image}`}
                                alt={goodie.slug}
                                className="w-full object-center object-cover group-hover:opacity-75 h-32 md:h-40"
                                />
                            </div>
                            <h3 className="mt-4 text-sm text-gray-700">{goodie.name}</h3>
                            <p className="mt-1 text-sm text-gray-500">{goodie.category}</p>
                            <p className="mt-1 text-lg font-medium text-gray-900">{goodie.price}</p>
                            </Link>
                        ))}
                    </div>
                </div>
                {/* list subscriptions */}

                <div className="space-y-4">
                    <div>
                        <h6 className="font-bold text-2xl">Subscription plan</h6>
                    </div>

                    <div 
                    className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:px-10">
                        <div className="rounded-md shadow-md text-center space-y-4 bg-slate-50 py-4">
                            <h6 className="font-extrabold text-xl">Weekly</h6>
                            <p className="p-3">
                                Get weekly delivery of available goodie or package of your choice
                            </p>
                            <button className="rounded-full bg-slate-200 py-1 px-3 shadow-md font-bold">
                                Check them ?
                            </button>
                        </div>

                        <div className="rounded-md shadow-md text-center space-y-4 bg-slate-50 py-4">
                            <h6 className="font-extrabold text-xl">Monthly</h6>
                            <p className="p-3">
                                Get monthly delivery of available goodie or package of your choice
                            </p>
                            <button className="rounded-full bg-slate-200 py-1 px-3 shadow-md font-bold">
                                Check them ?
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: stateTypes)=> ({
    item: state.item
  })
  
  const mapDispatchToProps = {
    getItems
  }

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);