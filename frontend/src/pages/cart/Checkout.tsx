const Checkout = ()=> {
    return (
        <div className="bg-white">
            <div className="container mx-auto">
                <div className="flex justify-center">
                    <div className="w-fit border px-3 py-2 rounded-sm shadow-sm divide-y">
                        {/* show total */}
                        <div className="flex justify-between font-bold text-xl">
                            <p>Total</p>
                            <p>$560</p>
                        </div>
                        {/* mode of payment */}

                        {/* shipping address */}
                        <div>
                            <button
                                className="text-white bg-amber-700 text-sm font-bold py-2 px-4 rounded-md"
                            >
                                Confirm Payment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout;