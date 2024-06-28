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

  const saveProduct = async () => {
    const saveOrUpdate = productState.id_product
      ? ProductService.update(productState.id_product, productState)
      : ProductService.save(productState);
  
    try {
      await saveOrUpdate;
      showToast("success", "Success", "Product saved successfully");
      onHide(); // Hide the dialog after a delay
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 seconds
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error("Error saving product:", error);
      showToast("error", "Error", "Could not save the product");
    }
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
      header="Edit Product"
      modal
      className="p-fluid"
      onHide={onHide}
    >
      <div className="p-field">
        <label htmlFor="product_name">Product Name</label>
        <InputText
          id="product_name"
          value={productState.product_name}
          onChange={handleInputChange}
          required
          autoFocus
        />
      </div>
      <div className="p-field">
        <label htmlFor="price">Price</label>
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
        <label htmlFor="description">Description</label>
        <InputTextarea
          id="description"
          value={productState.description}
          onChange={handleInputChange}
          rows={3}
          required
        />
      </div>
      <div className="p-field">
        <label htmlFor="type_category">Type</label>
        <Dropdown
          id="type_category"
          value={productState.type_category}
          options={types.map((type) => ({
            label: type.type,
            value: type.id_type,
          }))}
          onChange={(e) => handleDropdownChange(e, "type_category")}
          placeholder="Select a Type"
          optionLabel="label"
          required
        />
      </div>
      <div className="p-field">
        <label htmlFor="categories">Categories</label>
        <MultiSelect
          id="categories"
          value={productState.categories}
          options={categories.map((category) => ({
            label: category.category,
            value: category.id_category,
          }))}
          onChange={(e) => handleDropdownChange(e, "categories")}
          placeholder="Select Categories"
          display="chip"
          required
        />
      </div>
      <div className="p-field">
          <label htmlFor="images">Images</label>
          <FileUpload
            name="images"
            multiple
            accept="image/*"
            //maxFileSize={1000000}
            onUpload={handleImageUpload}
            emptyTemplate={
              <p className="p-m-0">
                Drag and drop images here to upload.
              </p>
            }
            className="black-file-upload"
          />
        </div>
      <div className="p-field">
        <Button
          label="Save"
          icon="pi pi-check"
          onClick={saveProduct}
          style={{
            backgroundColor: "black",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            marginTop: "30px",
          }}
        />
      </div>
    </Dialog>
  );
};

export default ProductEditDialog;