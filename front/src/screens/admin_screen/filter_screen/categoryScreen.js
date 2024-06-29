import React, { useState, useEffect, useRef } from 'react';
import { Panel } from 'primereact/panel';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog'; 
import CategoryService from '../../../service/CategoryService';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../AdminScreen.css'; 

const CategoryScreen = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [deleteCategoryId, setDeleteCategoryId] = useState(null); 
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false); 
  const toast = useRef(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    CategoryService.getAll()
      .then(data => setCategories(data))
      .catch(error => {
        console.error('Error loading categories:', error);
        showToast('error', 'Error', 'Failed to load categories');
      });
  };

  const showToast = (severity, summary, detail) => {
    if (toast.current) {
      toast.current.show({ severity, summary, detail });
    }
  };

  const addNewCategory = () => {
    if (newCategory.trim()) {
      CategoryService.save({ category: newCategory }) 
        .then(response => {
          setCategories([...categories, response]);
          setNewCategory('');
          showToast('success', 'Success', 'New category added');
        })
        .catch(() => showToast('error', 'Error', 'Failed to add new category'));
    } else {
      showToast('warn', 'Warning', 'Category name cannot be empty');
    }
  };

  const confirmDeleteCategory = (id) => {
    setDeleteCategoryId(id);
    setDeleteConfirmationVisible(true);
  };

  const deleteCategory = () => {
    if (deleteCategoryId) {
      CategoryService.delete(deleteCategoryId)
        .then(() => {
          setCategories(categories.filter(category => category.id_category !== deleteCategoryId));
          showToast('success', 'Success', 'Category deleted');
        })
        .catch(() => showToast('error', 'Error', 'Failed to delete category'))
        .finally(() => {
          setDeleteCategoryId(null);
          setDeleteConfirmationVisible(false);
        });
    }
  };

  const hideDeleteConfirmation = () => {
    setDeleteCategoryId(null);
    setDeleteConfirmationVisible(false);
  };

  const actionTemplate = (rowData) => {
    return (
      <div>
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteCategory(rowData.id_category)} />
      </div>
    );
  };

  return (
    <Panel header="Category Management" style={{ width: '80%', margin: '20px auto', height: '100%' }}>
      <div className="p-grid p-dir-col p-align-center p-mb-4">
        <div className="p-col-12 p-md-8 p-lg-6">
          <div className="p-inputgroup">
            <InputText
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New category"
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <Button icon="pi pi-plus" onClick={addNewCategory} className="p-button-primary" style={{ backgroundColor: "black", height: '42px', width: '42px'}}  />
          </div>
        </div>
      </div>
      <DataTable value={categories} header="Existing Categories" emptyMessage="No categories found">
        <Column field="id_category" header="ID" sortable />
        <Column field="category" header="Category Name" sortable />
        <Column body={actionTemplate} style={{ textAlign: 'center', width: '8em' }} />
      </DataTable>
      <Dialog
        visible={deleteConfirmationVisible}
        onHide={hideDeleteConfirmation}
        header="Confirm Deletion"
        modal
        footer={<div>
          <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDeleteConfirmation} />
          <Button label="Delete" icon="pi pi-trash" className="p-button-text" onClick={deleteCategory} />
        </div>}
      >
        <div className="confirmation-content">
          <p>Are you sure you want to delete this category?</p>
        </div>
      </Dialog>
      <Toast ref={toast} />
    </Panel>
  );
};

export default CategoryScreen;
