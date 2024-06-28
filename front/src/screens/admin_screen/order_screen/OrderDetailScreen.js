import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Panel } from 'primereact/panel';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import OrderService from '../../../service/OrderService';
import OrderItemService from '../../../service/OrderItemService';
import OrderStateService from '../../../service/OrderStatesService';
import ProductService from '../../../service/ProductService';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../AdminScreen.css';

const OrderDetailScreen = () => {
  const { id_order } = useParams();
  const [order, setOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [orderState, setOrderState] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderData = await OrderService.getOrderById(id_order);
        setOrder(orderData);

        const orderStateData = await OrderStateService.getOrderStateById(orderData.order_state);
        setOrderState(orderStateData);

        const orderItemsData = await OrderItemService.getOrderItemsByOrderId(id_order);
        setOrderItems(orderItemsData);

        // Fetch product details for each order item
        const productPromises = orderItemsData.map(item => ProductService.getProductById(item.product));
        const productsData = await Promise.all(productPromises);
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [id_order]);

  if (!order) {
    return <div>Loading...</div>;
  }

  const orderItemsWithProductDetails = orderItems.map(item => {
    const product = products.find(prod => prod.id_product === item.product);
    return { ...item, product };
  });

  return (
    <Panel header="Order Details" style={{ width: '80%', margin: '20px auto', height: '100%' }}>
      <div>
        <h3>Order ID: {order.id_order}</h3>
        <p>Date: {order.date_order}</p>
        <p>Total Payment: {order.total_payment + '$'}</p>
        <p>Shipping Price: {order.shipping_price + '$'}</p>
        <p>Taxes: {order.taxes + '%'}</p>
        <p>Order Status: {orderState.order_state}</p>
      </div>
      <div>
        <h3>Order Items</h3>
        <DataTable value={orderItemsWithProductDetails} header="Order Items">
          <Column field="product.product_name" header="Product Name" sortable />
          <Column field="order_quantity" header="Quantity" sortable />
          <Column field="product.price" header="Price" sortable />
          <Column field="product.type_category" header="Category" sortable />
        </DataTable>
      </div>
    </Panel>
  );
};

export default OrderDetailScreen;
