import {
    PRODUCT_REVIEW_REQUEST,
    PRODUCT_REVIEW_SUCCESS,
    PRODUCT_REVIEW_FAIL,
  } from '../constants/reviewConstants';
  import ProductService from '../service/ProductService';
  
  export const listProductReviews = (id_product) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_REVIEW_REQUEST });
      const data = await ProductService.getProductReviews(id_product);
      dispatch({ type: PRODUCT_REVIEW_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_REVIEW_FAIL, payload: error.message });
    }
  };
  