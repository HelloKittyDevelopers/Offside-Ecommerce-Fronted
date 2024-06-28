import React, { useEffect, useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import UserService from '../../../service/UserService';
import ProductEditDialog from './UserEditDialog'; // Import the new dialog component

const UserListPage = () => {
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
    UserService.getAll().then(data => {
      setProducts(data);
      setLoading(false);
    }).catch(error => {
      setLoading(false);
      toast.current.show({severity:'error', summary: 'Error', detail:'No se pudieron cargar los productos', life: 3000});
    });
  };

  const deleteProduct = (id_product) => {
    confirmDialog({
      message: '¿Estás seguro de que quieres eliminar este producto?',
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => acceptDelete(id_product),
      reject: () => rejectDelete()
    });
  };

  const acceptDelete = (id_product) => {
    UserService.delete(id_product).then(() => {
      loadProducts();
      toast.current.show({severity:'success', summary: 'Éxito', detail:'Producto eliminado', life: 3000});
    }).catch(error => {
      console.error('Error deleting product:', error);
      toast.current.show({severity:'error', summary: 'Error', detail:'No se pudo eliminar el producto', life: 3000});
    });
  };

  const rejectDelete = () => {
    toast.current.show({severity:'info', summary: 'Cancelado', detail:'Eliminación cancelada', life: 3000});
  };

  const editProduct = (product) => {
    setSelectedProduct(product);
    setEditDialogVisible(true);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div>
        <Button
          label=""
          icon="pi pi-pencil"
          onClick={() => editProduct(rowData)}
          style={{
            backgroundColor: "black", // Set background color to black
            color: "white", // Adjust text color for better contrast
            border: "none", // Remove border if desired
            borderRadius: "4px", // Optional rounded corners
            marginTop: "30px",
            marginRight: "10px",
          }}
        />
        <Button
          label=""
          icon="pi pi-times"
          className="p-button-danger"
          onClick={() => deleteProduct(rowData.id_product)}
          style={{
            backgroundColor: "black", // Set background color to black
            color: "white", // Adjust text color for better contrast
            border: "none", // Remove border if desired
            borderRadius: "4px", // Optional rounded corners
            marginTop: "30px",
          }}
        />
      </div>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Gestión de Productos</h5>
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
    return <div>Cargando productos...</div>;
  }

  return (
    <div>
      <Toast ref={toast} />
      <ConfirmDialog />
      <DataTable
        value={products}
        header={header}
        globalFilter={globalFilter}
        emptyMessage="No se encontraron productos."
      >
        <Column field="id_product" header="Ref" />
        <Column field="product_name" header="Nombre del Producto" />
        <Column field="price" header="Precio" />
        <Column field="description" header="Descripción" />
        <Column body={actionBodyTemplate} header="Acciones" />
      </DataTable>
      <ProductEditDialog
        visible={editDialogVisible}
        onHide={() => setEditDialogVisible(false)}
        product={selectedProduct}
        loadProducts={loadProducts}
        showToast={(severity, summary, detail) => toast.current.show({ severity, summary, detail, life: 3000 })}
      />
    </div>
  );
};

export default UserListPage;
