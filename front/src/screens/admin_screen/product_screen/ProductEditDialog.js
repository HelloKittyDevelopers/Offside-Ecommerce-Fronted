import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import ProductService from "../../../service/ProductService";
import CategoryService from "../../../service/CategoryService";
import TypeService from "../../../service/TypeService";

const ProductEditDialog = ({
  visible,
  onHide,
  product,
  loadProducts,
  showToast,
}) => {
  const [productData, setProductData] = useState(
    product || {
      product_name: "",
      price: null,
      description: "",
      type_category: null,
      categories: [],
    }
  );
  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (product) {
      setProductData(product);
    }
    TypeService.getAll().then(setTypes);
    CategoryService.getAll().then(setCategories);
  }, [product]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProductData({ ...productData, [id]: value });
  };

  const handleNumberChange = (e) => {
    setProductData({ ...productData, price: e.value });
  };

  const handleTypeChange = (e) => {
    setProductData({ ...productData, type_category: e.value });
  };

  const handleCategoriesChange = (e) => {
    setProductData({ ...productData, categories: e.value });
  };
  const updateProduct = () => {
    // Crear una copia de productData para modificar
    const productToUpdate = { ...productData };
  
    // Modificar type_category para enviar solo el ID
    if (productToUpdate.type_category && productToUpdate.type_category.id_type) {
      productToUpdate.type_category = productToUpdate.type_category.id_type;
    }
  
    // Modificar categories para enviar solo los IDs
    if (productToUpdate.categories && Array.isArray(productToUpdate.categories)) {
      productToUpdate.categories = productToUpdate.categories.map(category => category.id_category);
    }
  
    console.log("Product to update:", productToUpdate);
  
    ProductService.update(productToUpdate.id_product, productToUpdate)
      .then(() => {
        showToast("success", "Éxito", "Producto actualizado");
        onHide();
        loadProducts();
      })
      .catch((error) => {
        console.error("Error updating product:", error);
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
          <InputNumber
            id="price"
            value={productData.price}
            onValueChange={handleNumberChange}
            mode="currency"
            currency="EUR"
            locale="es-ES"
          />
        </div>
        <div className="p-field">
          <label htmlFor="description">Descripción</label>
          <InputTextarea
            id="description"
            value={productData.description}
            onChange={handleInputChange}
            rows={3}
            autoResize
          />
        </div>
        <div className="p-field">
          <label htmlFor="type_category">Tipo</label>
          <Dropdown
            id="type_category"
            value={productData.type_category}
            options={types}
            onChange={handleTypeChange}
            optionLabel="type"
            placeholder="Selecciona un tipo"
          />
        </div>
        <div className="p-field">
          <label htmlFor="categories">Categorías</label>
          <MultiSelect
            id="categories"
            value={productData.categories}
            options={categories}
            onChange={handleCategoriesChange}
            optionLabel="category"
            placeholder="Selecciona categorías"
          />
        </div>
        <Button
          label="Guardar"
          icon="pi pi-check"
          onClick={updateProduct}
          className="p-button-text"
          style={{
            backgroundColor: "black", // Set background color to black
            color: "white", // Adjust text color for better contrast
            border: "none", // Remove border if desired
            borderRadius: "4px", // Optional rounded corners
            marginTop: "30px",
          }}
        />
      </div>
    </Dialog>
  );
};

export default ProductEditDialog;