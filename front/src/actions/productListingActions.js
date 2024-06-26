import ProductListingService from '../service/ProductListingService';
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
} from '../constants/productConstants';

export const listProductsByType = (type, filters = {}) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });

        const data = await ProductListingService.getProductsByType(type, filters);
        console.log("API Response Data: ", data);
        
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: {
                categories: data.categories,
                products: data.products,
                sizes: data.sizes,
            },
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};
