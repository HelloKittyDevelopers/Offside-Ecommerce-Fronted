import React, { useEffect, useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import ProductService from "../../../service/ProductService";
import ProductEditDialog from "./ProductEditDialog";
import TypeService from "../../../service/TypeService";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const toast = useRef(null);
  const [types, setTypes] = useState([]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const productsData = await ProductService.getAll();
      const productsWithTypes = await Promise.all(
        productsData.map(async (product) => {
          const type = await TypeService.getTypeById(product.type_category);
          return { ...product, type_name: type.type };
        })
      );
      
      console.log(productsWithTypes);
      setProducts(productsWithTypes);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const loadTypes = async () => {
    try {
      const typesData = await TypeService.getAll();
      setTypes(typesData);
    } catch (error) {
      console.error("Error fetching types:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadTypes();
      await loadProducts();
    };

    fetchData();
  }, []);

  
  const deleteProduct = (id_product) => {
    confirmDialog({
      message: "Are you sure you want to delete this product?",
      header: "Confirm Deletion",
      icon: "pi pi-exclamation-triangle",
      accept: () => acceptDelete(id_product),
      reject: () => rejectDelete(),
    });
  };
  
  const acceptDelete = async (id_product) => {
    try {
      await ProductService.delete(id_product);
      loadProducts();  // Ensure this is called to refresh the product list
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Product deleted",
        life: 3000,
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Could not delete the product",
        life: 3000,
      });
    }
  };
  
  const rejectDelete = () => {
    toast.current.show({
      severity: "info",
      summary: "Cancelled",
      detail: "Deletion cancelled",
      life: 3000,
    });
  };  

  const editProduct = (product) => {
    setSelectedProduct(product);
    setEditDialogVisible(true);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div>
        <Button
          icon="pi pi-pencil"
          onClick={() => editProduct(rowData)}
          className="p-button-rounded p-button-text"
          style={{
            backgroundColor: "white",
            color: "black",
            marginRight: "3px",
          }}
        />
        <Button
          icon="pi pi-trash"
          onClick={() => deleteProduct(rowData.id_product)}
          className="p-button-rounded p-button-danger p-button-text"
          style={{
            backgroundColor: "white",
            color: "black",
          }}
        />
      </div>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Product Management</h5>
      <span
        className="p-input-icon-left"
        style={{ marginTop: "10px", width: "100%" }}
      >
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          style={{ width: "80%", marginLeft: "30px" }}
        />
      </span>
    </div>
  );

  const priceBodyTemplate = (rowData) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(rowData.price);
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="container-fluid">
      <Toast ref={toast} />
      <ConfirmDialog />
      <DataTable
        value={products}
        header={header}
        globalFilter={globalFilter}
        emptyMessage="No products found."
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
      >
        <Column
          field="id_product"
          header="Ref"
          sortable
          style={{
            maxWidth: "40px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          bodyStyle={{
            maxWidth: "40px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        />
        <Column
          field="product_name"
          header="Product Name"
          sortable
          style={{
            maxWidth: "90px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          bodyStyle={{
            maxWidth: "90px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        />
        <Column
          field="price"
          header="Price"
          body={priceBodyTemplate}
          sortable
          style={{
            maxWidth: "90px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          bodyStyle={{
            maxWidth: "90px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        />
        <Column
          field="description"
          header="Description"
          style={{
            maxWidth: "120px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          bodyStyle={{
            maxWidth: "120px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        />
        <Column
          field="type_name"
          header="Type"
          sortable
          style={{
            maxWidth: "80px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          bodyStyle={{
            maxWidth: "80px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        />
        <Column body={actionBodyTemplate} header="Actions" />
      </DataTable>
      <ProductEditDialog
        visible={editDialogVisible}
        onHide={() => setEditDialogVisible(false)}
        product={selectedProduct}
        showToast={(severity, summary, detail) =>
          toast.current.show({ severity, summary, detail, life: 3000 })
        }
      />
    </div>
  );
};

export default ProductListPage;
