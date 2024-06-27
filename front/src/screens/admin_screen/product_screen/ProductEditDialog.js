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

const ProductEditDialog = ({ visible, onHide, showToast, product }) => {
  const [productState, setProductState] = useState({
    id_product: null,
    product_name: "",
    price: null,
    description: "",
    type_category: null,
    categories: [],
    images: [],
  });
  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchTypes = () => {
    TypeService.getAll()
      .then((data) => {
        setTypes(data || []);
      })
      .catch((error) => {
        console.error("Error fetching types:", error);
      });
  };

  const fetchCategories = () => {
    CategoryService.getAll()
      .then((data) => {
        setCategories(data || []);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  const fetchCategoriesForProduct = (productId) => {
    ProductService.getCategoriesForProduct(productId)
      .then((data) => {
        const selectedCategories = data.map((category) => category.id_category);
        setProductState((prevState) => ({
          ...prevState,
          categories: selectedCategories,
        }));
      })
      .catch((error) => {
        console.error("Error fetching categories for product:", error);
      });
  };

  useEffect(() => {
    fetchTypes();
    fetchCategories();

    if (visible && product) {
      setProductState({
        id_product: product.id_product,
        product_name: product.product_name,
        price: product.price,
        description: product.description,
        type_category: product.type_category.id_type,
        images: product.images || [],
      });

      if (product.categories) {
        setProductState((prevState) => ({
          ...prevState,
          categories: product.categories.map((cat) => cat.id_category),
        }));
      } else {
        fetchCategoriesForProduct(product.id_product);
      }
    } else {
      setProductState({
        id_product: null,
        product_name: "",
        price: null,
        description: "",
        type_category: null,
        categories: [],
        images: [],
      });
    }
  }, [visible, product]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProductState({ ...productState, [id]: value });
  };

  const handleDropdownChange = (e, field) => {
    setProductState({ ...productState, [field]: e.value });
  };

  const handleImageUpload = (e) => {
    const uploadedImages = e.files;
    setProductState({ ...product, images: [...product.images, ...uploadedImages] });
  };

  const saveProduct = () => {
    const saveOrUpdate = productState.id_product
      ? ProductService.update(productState.id_product, productState)
      : ProductService.save(productState);

    saveOrUpdate
      .then(() => {
        showToast("success", "Éxito", "Producto guardado exitosamente");
        onHide();
      })
      .catch((error) => {
        console.error("Error saving product:", error);
        showToast("error", "Error", "No se pudo guardar el producto");
      });
  };

  const renderImagePreviews = () => {
    return productState.images.map((image, index) => (
      <img
        key={index}
        src={typeof image === "string" ? image : URL.createObjectURL(image)}
        alt={`Preview ${index}`}
        style={{
          width: "100px",
          height: "100px",
          objectFit: "cover",
          margin: "5px",
        }}
      />
    ));
  };

  if (!visible) {
    return null;
  }

  return (
    <Dialog
      visible={visible}
      style={{ width: "50vw" }}
      header="Editar Producto"
      modal
      className="p-fluid"
      onHide={onHide}
    >
      <div className="p-field">
        <label htmlFor="product_name">Nombre del Producto</label>
        <InputText
          id="product_name"
          value={productState.product_name}
          onChange={handleInputChange}
          required
          autoFocus
        />
      </div>
      <div className="p-field">
        <label htmlFor="price">Precio</label>
        <InputNumber
          id="price"
          value={productState.price}
          onValueChange={(e) =>
            setProductState({ ...productState, price: e.value })
          }
          mode="currency"
          currency="USD"
          locale="en-US"
          required
        />
      </div>
      <div className="p-field">
        <label htmlFor="description">Descripción</label>
        <InputTextarea
          id="description"
          value={productState.description}
          onChange={handleInputChange}
          rows={3}
          required
        />
      </div>
      <div className="p-field">
        <label htmlFor="type_category">Tipo</label>
        <Dropdown
          id="type_category"
          value={productState.type_category}
          options={types.map((type) => ({
            label: type.type,
            value: type.id_type,
          }))}
          onChange={(e) => handleDropdownChange(e, "type_category")}
          placeholder="Seleccione un Tipo"
          optionLabel="label"
          required
        />
      </div>
      <div className="p-field">
        <label htmlFor="categories">Categorías</label>
        <MultiSelect
          id="categories"
          value={productState.categories}
          options={categories.map((category) => ({
            label: category.category,
            value: category.id_category,
          }))}
          onChange={(e) => handleDropdownChange(e, "categories")}
          placeholder="Seleccione Categorías"
          display="chip"
          required
        />
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
      <div className="p-field">
        <Button
          label="Guardar"
          icon="pi pi-check"
          onClick={saveProduct}
          style={{
            backgroundColor: "black", // Set background color to black
            color: "white", // Adjust text color for better contrast
            padding: "10px 20px", // Optional padding for spacing
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
