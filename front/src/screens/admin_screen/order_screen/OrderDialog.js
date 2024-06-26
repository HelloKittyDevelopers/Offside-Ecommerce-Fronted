import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import OrderService from "../../../service/OrderService";

const OrderDialog = ({ visible, onHide, showToast }) => {
  const [order, setOrder] = useState({
    shipping_price: "",
    total_payment: "",
    address: "",
    user: null,
    order_state: null,
    taxes: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setOrder({ ...order, [id]: value });
  };

  const saveOrder = () => {
    OrderService.save(order)
      .then(() => {
        showToast("success", "Éxito", "Orden guardada");
        onHide();
      })
      .catch((error) => {
        console.error("Error saving order:", error);
        showToast("error", "Error", "No se pudo guardar la orden");
      });
  };

  return (
    <Dialog header="Añadir Orden" visible={visible} onHide={onHide}>
      <div className="p-fluid">
        <div className="p-field">
          <label htmlFor="shipping_price">Shipping Price</label>
          <InputText
            id="shipping_price"
            value={order.shipping_price}
            onChange={handleInputChange}
          />
        </div>
        <div className="p-field">
          <label htmlFor="total_payment">Total Payment</label>
          <InputText
            id="total_payment"
            value={order.total_payment}
            onChange={handleInputChange}
          />
        </div>
        <div className="p-field">
          <label htmlFor="address">Address</label>
          <InputText
            id="address"
            value={order.address}
            onChange={handleInputChange}
          />
        </div>
        <div className="p-field">
          <label htmlFor="user">User</label>
          <InputText
            id="user"
            value={order.user}
            onChange={handleInputChange}
          />
        </div>
        <div className="p-field">
          <label htmlFor="order_state">Order State</label>
          <Dropdown
            id="order_state"
            value={order.order_state}
            options={[
              { value: "despachado", label: "Despachado" },
              { value: "en_camino", label: "En Camino" },
              { value: "recibido", label: "Recibido" },
              { value: "entregado", label: "Entregado" },
              { value: "pendiente", label: "Pendiente" },
            ]}
            onChange={handleInputChange}
          />
        </div>
        <div className="p-field">
          <label htmlFor="taxes">Taxes</label>
          <InputText
            id="taxes"
            value={order.taxes}
            onChange={handleInputChange}
          />
        </div>
        <Button
          label="Guardar"
          icon="pi pi-check"
          onClick={saveOrder}
          className="black-button"
          style={{ marginTop: "30px" }}
        />
      </div>
    </Dialog>
  );
};

export default OrderDialog;
