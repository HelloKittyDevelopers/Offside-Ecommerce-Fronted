import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import productService from "../../../service/ProductService";

const UserDialog = ({ visible, onHide, showToast }) => {
  const [product, setProduct] = useState({
    product_name: "",
    price: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProduct({ ...product, [id]: value });
  };

  const saveProduct = () => {
    productService
      .save(product)
      .then(() => {
        showToast("success", "Éxito", "Producto añadido");
        onHide();
        setProduct({ product_name: "", price: "", description: "" }); // Reset form
      })
      .catch(() => {
        showToast("error", "Error", "No se pudo añadir el producto");
      });
  };

  return (
    <Dialog header="Añadir Producto" visible={visible} onHide={onHide}>
      <div className="p-fluid">
        <div className="p-field">
          <label htmlFor="product_name">Nombre del Producto</label>
          <InputText
            id="product_name"
            value={product.product_name}
            onChange={handleInputChange}
          />
        </div>
        <div className="p-field">
          <label htmlFor="price">Precio</label>
          <InputText
            id="price"
            type="number"
            value={product.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="p-field">
          <label htmlFor="description">Descripción</label>
          <InputText
            id="description"
            value={product.description}
            onChange={handleInputChange}
          />
        </div>
        <Button
          label="Guardar"
          icon="pi pi-check"
          onClick={saveProduct}
          style={{
            backgroundColor: "black", // Set background color to black
            color: "white", // Adjust text color for better contrast
            padding: '10px 20px', // Optional padding for spacing
            border: "none", // Remove border if desired
            borderRadius: "4px", // Optional rounded corners
            marginTop: "30px",
          }}
        />
      </div>
    </Dialog>
  );
};

export default UserDialog;
