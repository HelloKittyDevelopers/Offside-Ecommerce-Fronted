import { CART_ADD_ITEM } from '../constants/CartConstant';
import ProductService from '../service/ProductService';

export const addToCart = (id, qty, size) => async (dispatch, getState) => {
    const data = await ProductService.getProductById(id);

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            id_product: data.id_product,
            name: data.product_name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty: Number(qty), // Asegúrate de que qty es un número
            size,
        },
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};