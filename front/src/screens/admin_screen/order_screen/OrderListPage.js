import React, { useEffect, useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import OrderService from '../../../service/OrderService';
import OrderEditDialog from './OrderEditDialog';

const OrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const toast = useRef(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    OrderService.getAll().then(data => {
      setOrders(data);
      setLoading(false);
    }).catch(error => {
      setLoading(false);
      toast.current.show({severity:'error', summary: 'Error', detail:'No se pudieron cargar las órdenes', life: 3000});
    });
  };

  const deleteOrder = (id_order) => {
    confirmDialog({
      message: '¿Estás seguro de que quieres eliminar esta orden?',
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => acceptDelete(id_order),
      reject: () => rejectDelete()
    });
  };

  const acceptDelete = (id_order) => {
    OrderService.delete(id_order).then(() => {
      loadOrders();
      toast.current.show({severity:'success', summary: 'Éxito', detail:'Orden eliminada', life: 3000});
    }).catch(error => {
      console.error('Error deleting order:', error);
      toast.current.show({severity:'error', summary: 'Error', detail:'No se pudo eliminar la orden', life: 3000});
    });
  };

  const rejectDelete = () => {
    toast.current.show({severity:'info', summary: 'Cancelado', detail:'Eliminación cancelada', life: 3000});
  };

  const editOrder = (order) => {
    setSelectedOrder(order);
    setEditDialogVisible(true);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div>
        <Button
          label=""
          icon="pi pi-pencil"
          onClick={() => editOrder(rowData)}
          style={{
            backgroundColor: "black",
            color: "white",
            border: "none",
            borderRadius: "4px",
            marginTop: "30px",
            marginRight: "10px",
          }}
        />
        <Button
          label=""
          icon="pi pi-times"
          className="p-button-danger"
          onClick={() => deleteOrder(rowData.id_order)}
          style={{
            backgroundColor: "black",
            color: "white",
            border: "none",
            borderRadius: "4px",
            marginTop: "30px",
          }}
        />
      </div>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Gestión de Órdenes</h5>
      <span className="p-input-icon-left" style={{ marginTop: "10px", width: "100%" }}>
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Buscar..."
          style={{ width: "50%", marginLeft: "30px" }}
        />
      </span>
    </div>
  );

  if (loading) {
    return <div>Cargando órdenes...</div>;
  }

  return (
    <div>
      <Toast ref={toast} />
      <ConfirmDialog />
      <DataTable
        value={orders}
        header={header}
        globalFilter={globalFilter}
        emptyMessage="No se encontraron órdenes."
      >
        <Column field="id_order" header="ID" />
        <Column field="date_order" header="Fecha de Orden" />
        <Column field="total_payment" header="Pago Total" />
        <Column field="address" header="Dirección" />
        <Column field="user.username" header="Usuario" />
        <Column field="order_state.order_state" header="Estado" />
        <Column body={actionBodyTemplate} header="Acciones" />
      </DataTable>
      <OrderEditDialog
        visible={editDialogVisible}
        onHide={() => setEditDialogVisible(false)}
        order={selectedOrder}
        loadOrders={loadOrders}
        showToast={(severity, summary, detail) => toast.current.show({ severity, summary, detail, life: 3000 })}
      />
    </div>
  );
};

export default OrderListPage;
