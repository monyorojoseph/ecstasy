
// get currency format
export const getCurrencyFormat = (data: number)=> 
    new Intl.NumberFormat(undefined, { style: 'currency', currency: 'KES' }).format(data)