import React, { useState, useEffect, useRef } from 'react';
import { Panel } from 'primereact/panel';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import SizeService from '../../../service/SizeService';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../AdminScreen.css'; 

const SizeScreen = () => {
  const [sizes, setSizes] = useState([]);
  const [newSize, setNewSize] = useState('');
  const [deleteSizeId, setDeleteSizeId] = useState(null);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
    loadSizes();
  }, []);

  const loadSizes = () => {
    SizeService.getAll()
      .then(data => setSizes(data))
      .catch(error => {
        console.error('Error loading sizes:', error);
        showToast('error', 'Error', 'Failed to load sizes');
      });
  };

  const showToast = (severity, summary, detail) => {
    if (toast.current) {
      toast.current.show({ severity, summary, detail });
    }
  };

  const addNewSize = () => {
    if (newSize.trim()) {
      SizeService.save({ size: newSize })
        .then(response => {
          setSizes([...sizes, response]);
          setNewSize('');
          showToast('success', 'Success', 'New size added');
        })
        .catch(() => showToast('error', 'Error', 'Failed to add new size'));
    } else {
      showToast('warn', 'Warning', 'Size name cannot be empty');
    }
  };

  const confirmDeleteSize = (id) => {
    setDeleteSizeId(id);
    setDeleteConfirmationVisible(true);
  };

  const deleteSize = () => {
    if (deleteSizeId) {
      SizeService.delete(deleteSizeId)
        .then(() => {
          setSizes(sizes.filter(size => size.id_size !== deleteSizeId));
          showToast('success', 'Success', 'Size deleted');
        })
        .catch(() => showToast('error', 'Error', 'Failed to delete size'))
        .finally(() => {
          setDeleteSizeId(null);
          setDeleteConfirmationVisible(false);
        });
    }
  };

  const hideDeleteConfirmation = () => {
    setDeleteSizeId(null);
    setDeleteConfirmationVisible(false);
  };

  const actionTemplate = (rowData) => {
    return (
      <div>
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteSize(rowData.id_size)} />
      </div>
    );
  };

  return (
    <Panel header="Size Management" style={{ width: '80%', margin: '20px auto', height: '100%' }}>
      <div className="p-grid p-dir-col p-align-center p-mb-4">
        <div className="p-col-12 p-md-8 p-lg-6">
          <div className="p-inputgroup">
            <InputText
              value={newSize}
              onChange={(e) => setNewSize(e.target.value)}
              placeholder="New size"
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <Button icon="pi pi-plus" onClick={addNewSize} className="p-button-primary" style={{ height: '42px', width: '42px', backgroundColor: "black"}} />
          </div>
        </div>
      </div>
      <DataTable value={sizes} header="Existing Sizes" emptyMessage="No sizes found">
        <Column field="id_size" header="ID" sortable />
        <Column field="size" header="Size Name" sortable />
        <Column body={actionTemplate} style={{ textAlign: 'center', width: '8em' }} />
      </DataTable>
      <Dialog
        visible={deleteConfirmationVisible}
        onHide={hideDeleteConfirmation}
        header="Confirm Deletion"
        modal
        footer={<div>
          <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDeleteConfirmation} />
          <Button label="Delete" icon="pi pi-trash" className="p-button-text" onClick={deleteSize} />
        </div>}
      >
        <div className="confirmation-content">
          <p>Are you sure you want to delete this size?</p>
        </div>
      </Dialog>
      <Toast ref={toast} />
    </Panel>
  );
};

export default SizeScreen;
