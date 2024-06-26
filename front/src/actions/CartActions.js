import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/CartConstant';
import ProductService from '../service/ProductService';

export const addToCart = (id, qty, size) => async (dispatch, getState) => {
    try {
        const data = await ProductService.getProductById(id);
        console.log(data); // Verifica que estás obteniendo los datos correctos

        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                id_product: data.id_product,
                name: data.product_name,
                images: data.images || [], // Asegúrate de que las imágenes están incluidas
                price: data.price,
                countInStock: data.countInStock,
                qty,
                size,
            },
        });

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
};

export const removeFromCart = (id, size) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: { id, size },
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
