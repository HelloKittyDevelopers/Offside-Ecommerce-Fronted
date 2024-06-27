import React, { useEffect, useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import ProductService from "../../../service/ProductService";
import ProductEditDialog from "./ProductEditDialog";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const toast = useRef(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    ProductService.getAll()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "No se pudieron cargar los productos",
          life: 3000,
        });
      });
  };

  const deleteProduct = (id_product) => {
    confirmDialog({
      message: "¿Estás seguro de que quieres eliminar este producto?",
      header: "Confirmar eliminación",
      icon: "pi pi-exclamation-triangle",
      accept: () => acceptDelete(id_product),
      reject: () => rejectDelete(),
    });
  };

  const acceptDelete = (id_product) => {
    ProductService.delete(id_product)
      .then(() => {
        loadProducts();
        toast.current.show({
          severity: "success",
          summary: "Éxito",
          detail: "Producto eliminado",
          life: 3000,
        });
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "No se pudo eliminar el producto",
          life: 3000,
        });
      });
  };

  const rejectDelete = () => {
    toast.current.show({
      severity: "info",
      summary: "Cancelado",
      detail: "Eliminación cancelada",
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
      <h5 className="mx-0 my-1">Gestión de Productos</h5>
      <span
        className="p-input-icon-left"
        style={{ marginTop: "10px", width: "100%" }}
      >
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Buscar..."
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
    return <div>Cargando productos...</div>;
  }

  return (
    <div className="container-fluid">
      <Toast ref={toast} />
      <ConfirmDialog />
      <DataTable
        value={products}
        header={header}
        globalFilter={globalFilter}
        emptyMessage="No se encontraron productos."
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} productos"
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
          header="Nombre del Producto"
          sortable
          style={{ maxWidth: "90px" }}
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
          header="Precio"
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
          header="Descripción"
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
          field="type_category.category"
          header="Categoría"
          sortable
          style={{
            maxWidth: "100px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          bodyStyle={{
            maxWidth: "100px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        />
        <Column
          field="type_category.type"
          header="Tipo"
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
        <Column body={actionBodyTemplate} header="Acciones" />
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
