import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD } from '../constants/CartConstant';

const initialState = {
    cartItems: [],
    shippingAddress: {},  // Aseguramos que shippingAddress tenga un valor por defecto
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            const existItem = state.cartItems.find(x => x.id_product === item.id_product && x.size === item.size);

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => 
                        x.id_product === existItem.id_product && x.size === existItem.size
                            ? { ...x, qty: Number(x.qty) + Number(item.qty) }
                            : x
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => !(x.id_product === action.payload.id && x.size === action.payload.size))
            };
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            };
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            };
        default:
            return state;
    }
};
