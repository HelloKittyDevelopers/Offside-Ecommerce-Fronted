import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import ProductService from "../../../service/ProductService";

const UserEditDialog = ({
  visible,
  onHide,
  product,
  loadProducts,
  showToast,
}) => {
  const [productData, setProductData] = useState(
    product || { product_name: "", price: "", description: "" }
  );

  useEffect(() => {
    if (product) {
      setProductData(product);
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProductData({ ...productData, [id]: value });
  };

  const updateProduct = () => {
    ProductService.update(productData.id_product, productData)
      .then(() => {
        showToast("success", "Éxito", "Producto actualizado");
        onHide();
        loadProducts();
      })
      .catch(() => {
        showToast("error", "Error", "No se pudo actualizar el producto");
      });
  };

  return (
    <Dialog header="Editar Producto" visible={visible} onHide={onHide}>
      <div className="p-fluid">
        <div className="p-field">
          <label htmlFor="product_name">Nombre del Producto</label>
          <InputText
            id="product_name"
            value={productData.product_name}
            onChange={handleInputChange}
          />
        </div>
        <div className="p-field">
          <label htmlFor="price">Precio</label>
          <InputText
            id="price"
            type="number"
            value={productData.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="p-field">
          <label htmlFor="description">Descripción</label>
          <InputText
            id="description"
            value={productData.description}
            onChange={handleInputChange}
          />
        </div>
        <Button
          label="Guardar"
          icon="pi pi-check"
          onClick={updateProduct}
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

export default UserEditDialog;
