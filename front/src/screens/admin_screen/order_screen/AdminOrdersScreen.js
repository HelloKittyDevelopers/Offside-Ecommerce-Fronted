import React, { useState, useEffect } from 'react';
import { Panel } from 'primereact/panel';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { useNavigate } from 'react-router-dom';
import { Column } from 'primereact/column';
import OrderService from '../../../service/OrderService';
import OrderStateService from '../../../service/OrderStatesService';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../AdminScreen.css';

const OrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [orderStates, setOrderStates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadOrders();
    loadOrderStates();
  }, []);

  const loadOrders = async () => {
    try {
      const ordersData = await OrderService.getAll();
      setOrders(ordersData);
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

  const loadOrderStates = async () => {
    try {
      const orderStatesData = await OrderStateService.getAll();
      setOrderStates(orderStatesData);
    } catch (error) {
      console.error('Error loading order states:', error);
    }
  };

  const getOrderStateName = (stateId) => {
    const state = orderStates.find((orderState) => orderState.id_order_state === stateId);
    return state ? state.order_state : 'Unknown';
  };

  const mappedOrders = orders.map((order) => ({
    ...order,
    order_state_name: getOrderStateName(order.order_state),
  }));

  const navigateToOrderDetail = (orderId) => {
    navigate(`/admin/orders/${orderId}`);
  };

  const totalPaymentTemplate = (rowData) => {
    return `${rowData.total_payment} $`;
  };

  return (
    <Panel header="Order Management" style={{ width: '80%', margin: '20px auto', height: '100%' }}>
      <DataTable
        value={mappedOrders}
        header="Existing Orders"
        emptyMessage="No orders found"
        onRowClick={(e) => navigateToOrderDetail(e.data.id_order)}
        className="datatable-hover-effect" // Apply hover effect class here
      >
        <Column field="id_order" header="Order ID" sortable />
        <Column field="date_order" header="Date" sortable />
        <Column field="total_payment" header="Total Payment" body={totalPaymentTemplate} sortable />
        <Column field="order_state_name" header="Order Status" sortable />
      </DataTable>
    </Panel>
  );
};

export default OrdersScreen;
