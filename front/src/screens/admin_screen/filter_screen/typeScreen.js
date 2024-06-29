import React, { useState, useEffect, useRef } from 'react';
import { Panel } from 'primereact/panel';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog'; 
import TypeService from '../../../service/TypeService';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../AdminScreen.css'; 

const TypeScreen = () => {
  const [types, setTypes] = useState([]);
  const [newType, setNewType] = useState('');
  const [deleteTypeId, setDeleteTypeId] = useState(null); 
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false); 
  const toast = useRef(null);

  useEffect(() => {
    loadTypes();
  }, []);

  const loadTypes = () => {
    TypeService.getAll()
      .then(data => setTypes(data))
      .catch(error => {
        console.error('Error loading types:', error);
        showToast('error', 'Error', 'Failed to load types');
      });
  };

  const showToast = (severity, summary, detail) => {
    if (toast.current) {
      toast.current.show({ severity, summary, detail });
    }
  };

  const addNewType = () => {
    if (newType.trim()) {
      TypeService.save({ type: newType })
        .then(response => {
          setTypes([...types, response]);
          setNewType('');
          showToast('success', 'Success', 'New type added');
        })
        .catch(() => showToast('error', 'Error', 'Failed to add new type'));
    } else {
      showToast('warn', 'Warning', 'Type name cannot be empty');
    }
  };

  const confirmDeleteType = (id) => {
    setDeleteTypeId(id);
    setDeleteConfirmationVisible(true);
  };

  const deleteType = () => {
    if (deleteTypeId) {
      TypeService.delete(deleteTypeId)
        .then(() => {
          setTypes(types.filter(type => type.id_type !== deleteTypeId));
          showToast('success', 'Success', 'Type deleted');
        })
        .catch(() => showToast('error', 'Error', 'Failed to delete type'))
        .finally(() => {
          setDeleteTypeId(null);
          setDeleteConfirmationVisible(false);
        });
    }
  };

  const hideDeleteConfirmation = () => {
    setDeleteTypeId(null);
    setDeleteConfirmationVisible(false);
  };

  const actionTemplate = (rowData) => {
    return (
      <div>
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteType(rowData.id_type)} />
      </div>
    );
  };

  return (
    <Panel header="Type Management" style={{ width: '80%', margin: '20px auto', height: '100%' }}>
      <div className="p-grid p-dir-col p-align-center p-mb-4">
        <div className="p-col-12 p-md-8 p-lg-6">
          <div className="p-inputgroup">
            <InputText
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              placeholder="New type"
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <Button icon="pi pi-plus" onClick={addNewType} className="p-button-primary" style={{ height: '42px', width: '42px', backgroundColor:"Black"}} />
          </div>
        </div>
      </div>
      <DataTable value={types} header="Existing Types" emptyMessage="No types found">
        <Column field="id_type" header="ID" sortable />
        <Column field="type" header="Type Name" sortable />
        <Column body={actionTemplate} style={{ textAlign: 'center', width: '8em' }} />
      </DataTable>
      <Dialog
        visible={deleteConfirmationVisible}
        onHide={hideDeleteConfirmation}
        header="Confirm Deletion"
        modal
        footer={<div>
          <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDeleteConfirmation} />
          <Button label="Delete" icon="pi pi-trash" className="p-button-text" onClick={deleteType} />
        </div>}
      >
        <div className="confirmation-content">
          <p>Are you sure you want to delete this type?</p>
        </div>
      </Dialog>
      <Toast ref={toast} />
    </Panel>
  );
};

export default TypeScreen;
