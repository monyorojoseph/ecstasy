// get currency format
export const getCurrencyFormat = (data)=> 
    new Intl.NumberFormat(undefined, { style: 'currency', currency: 'KES' }).format(data)