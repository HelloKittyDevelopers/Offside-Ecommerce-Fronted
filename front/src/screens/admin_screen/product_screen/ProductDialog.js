import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import { FileUpload } from "primereact/fileupload";
import ProductService from "../../../service/ProductService";
import CategoryService from "../../../service/CategoryService";
import TypeService from "../../../service/TypeService";

const ProductDialog = ({ visible, onHide, showToast }) => {
  const [product, setProduct] = useState({
    product_name: "",
    price: null,
    description: "",
    type_category: null,
    categories: [],
    images: [],
  });
  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newType, setNewType] = useState("");
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    TypeService.getAll().then(setTypes);
    CategoryService.getAll().then(setCategories);
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProduct({ ...product, [id]: value });
  };

  const handleNumberChange = (e) => {
    setProduct({ ...product, price: e.value });
  };

  const handleTypeChange = (e) => {
    setProduct({ ...product, type_category: e.value });
  };

  const handleCategoriesChange = (e) => {
    setProduct({ ...product, categories: e.value });
  };

  const handleImageUpload = (e) => {
    const uploadedImages = e.files;
    setProduct({ ...product, images: [...product.images, ...uploadedImages] });
  };

  const addNewType = () => {
    if (newType) {
      TypeService.save({ type: newType })
        .then((response) => {
          setTypes([...types, response]);
          setProduct({ ...product, type_category: response });
          setNewType("");
          showToast("success", "Éxito", "Nuevo tipo añadido");
        })
        .catch(() =>
          showToast("error", "Error", "No se pudo añadir el nuevo tipo")
        );
    }
  };

  const addNewCategory = () => {
    if (newCategory) {
      CategoryService.save({ category: newCategory })
        .then((response) => {
          setCategories([...categories, response]);
          setProduct({
            ...product,
            categories: [...product.categories, response],
          });
          setNewCategory("");
          showToast("success", "Éxito", "Nueva categoría añadida");
        })
        .catch(() =>
          showToast("error", "Error", "No se pudo añadir la nueva categoría")
        );
    }
  };

  const saveProduct = () => {
    ProductService.save(product)
      .then(() => {
        showToast("success", "Éxito", "Producto añadido");
        onHide();
        setProduct({
          product_name: "",
          price: null,
          description: "",
          type_category: null,
          categories: [],
          images: [],
        });
      })
      .catch((error) => {
        console.error("Error saving product:", error);
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
          <InputNumber
            id="price"
            value={product.price}
            onValueChange={handleNumberChange}
            mode="currency"
            currency="USD"
            locale="en-US"
          />
        </div>
        <div className="p-field">
          <label htmlFor="description">Descripción</label>
          <InputTextarea
            id="description"
            value={product.description}
            onChange={handleInputChange}
            rows={3}
            autoResize
          />
        </div>
        <div className="p-field">
          <label htmlFor="type_category">Tipo</label>
          <Dropdown
            id="type_category"
            value={product.type_category}
            options={[...types, { id_type: "new", type: "Agregar nuevo tipo" }]}
            onChange={handleTypeChange}
            optionLabel="type"
            placeholder="Selecciona un tipo"
          />
          {product.type_category && product.type_category.id_type === "new" && (
            <div>
              <InputText
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                placeholder="Nuevo tipo"
              />
              <Button label="Agregar" onClick={addNewType} />
            </div>
          )}
        </div>
        <div className="p-field">
          <label htmlFor="categories">Categorías</label>
          <MultiSelect
            id="categories"
            value={product.categories}
            options={[
              ...categories,
              { id_category: "new", category: "Agregar nueva categoría" },
            ]}
            onChange={handleCategoriesChange}
            optionLabel="category"
            placeholder="Selecciona categorías"
          />
          {product.categories.some((cat) => cat.id_category === "new") && (
            <div>
              <InputText
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Nueva categoría"
              />
              <Button label="Agregar" onClick={addNewCategory} />
            </div>
          )}
        </div>
        <div className="p-field">
          <label htmlFor="images">Imágenes</label>
          <FileUpload
            name="images"
            multiple
            accept="image/*"
            //maxFileSize={1000000}
            onUpload={handleImageUpload}
            emptyTemplate={
              <p className="p-m-0">
                Arrastra y suelta imágenes aquí para subirlas.
              </p>
            }
            className="black-file-upload"
          />
        </div>
        <Button
          label="Guardar"
          icon="pi pi-check"
          onClick={saveProduct}
          className="p-button-text"
          style={{
            backgroundColor: "black",
            color: "white",
            border: "none",
            borderRadius: "4px",
            marginTop: "30px",
          }}
        />
      </div>
    </Dialog>
  );
};

export default ProductDialog;