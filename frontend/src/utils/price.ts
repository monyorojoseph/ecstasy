import { orderItemType } from "../redux/reducers/cart";
import { getCurrencyFormat } from "./formatCurrency";

// total price of items in cart
export const totalPrice = (data: orderItemType[])=> {
    let total = 0
    data.map((item)=> {
        total += item.item_total_price
    })
    return getCurrencyFormat(total)
};
