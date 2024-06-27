import React, { useState, useEffect } from 'react';
import { Panel } from 'primereact/panel';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { useNavigate } from 'react-router-dom';
import { Column } from 'primereact/column';
import OrderService from '../../../service/OrderService';
import UserService from '../../../service/UserService';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../AdminScreen.css';

const OrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const ordersData = await OrderService.getAll();
      setOrders(ordersData);
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };


  const navigateToOrderDetail = (orderId) => {
    navigate(`/admin/orders/${orderId}`);
  };

  return (
    <Panel header="Order Management" style={{ width: '80%', margin: '20px auto', height: '100%' }}>
      <DataTable value={orders} header="Existing Orders" emptyMessage="No orders found" onRowClick={(e) => navigateToOrderDetail(e.data.id_order)}>
        <Column field="id_order" header="Order ID" sortable />
        <Column field="date_order" header="Date" sortable />
        <Column field="total_payment" header="Total Payment" sortable />
        <Column field="order_state" header="Order Status" sortable />
      </DataTable>
    </Panel>
  );
};

export default OrdersScreen;