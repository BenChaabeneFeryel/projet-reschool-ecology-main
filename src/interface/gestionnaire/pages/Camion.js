import React, { useState, useMemo, useCallback, useEffect , useRef} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Button  from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import {Item} from '../components/Item'
import {DialogCamion} from '../components/DialogCamion'


const PoubellesURL = 'https://ami.monconstat.tech/api/camion'
// const PoubellesURL = 'http://127.0.0.1:8000/api/google-map'


const initialValue = { 
  id_bloc_poubelle:"", 
  bloc_poubelle_id:"",
  nom:"",
  // qrcode:"", 
  capacite_poubelle:"", 
  type:"",
  Etat:"",
  temps_remplissage:"",
  // created_at:"", 
  // updated_at:""
}

export default function Camion() {

  const gridRef = useRef();

  const [tableData, setTableData] = useState(null)
  useEffect( () => {
    fetch(PoubellesURL).then(resp => resp.json()).then(
      resp => setTableData(resp.data)
    )
  }, [])
  console.log(tableData)

  const columns = [
    { field: 'id', headerName: 'ID',},
    { field: 'zone_travail_id', headerName: 'ID Zone',},
    {
      field: 'matricule',
      headerName: 'Matricule',
      editable: true,
    },
    {
      field: 'volume_maximale_poubelle',
      headerName: 'Capacité Max',
      editable: true,
    },
    {
      field: 'volume_actuelle_plastique',
      headerName: 'Plastique (%)',
      editable: true,
    },
    {
      field: 'volume_actuelle_papier',
      headerName: 'Papier (%)',
      editable: true,
    },
    {
      field: 'volume_actuelle_composte',
      headerName: 'Composte (%)',
      editable: true,
    },
    {
      field: 'volume_actuelle_canette',
      headerName: 'Canette (%)',
      editable: true,
    },
    {
      field: 'heure_sortie',
      headerName: 'Heure Sortie',
    },
    {
      field: 'heure_entree',
      headerName: 'Heure Entrée',
    },
    {
      headerName: "Actions", field: "id" ,filter: false, cellRenderer: (params) => <div>
        <Button variant="outlined" color="primary" onClick={() => handleUpdate(params.data)} style={{marginRight:"5px"}}><EditIcon/></Button>
        <Button variant="outlined" color="error" onClick={() => handleDelete(params.value)}><DeleteIcon/></Button>
      </div>
    }
  ];

  const defaultColDef = useMemo(() => {
    return {
      resizable: true,
      sortable: true, 
      flex: 1, 
      filter: true 
    };
  }, []);

  const [gridApi, setGridApi] = useState(null)
  const onGridReady = (params) => {
    setGridApi(params)
  }

  const columnTypes = useMemo(() => {
    return {
      numberColumn: { width: 130, filter: 'agNumberColumnFilter' },
      medalColumn: { width: 100, columnGroupShow: 'open', filter: false },
      nonEditableColumn: { editable: false },
      dateColumn: {
        // specify we want to use the date filter
        filter: 'agDateColumnFilter',
        // add extra parameters for the date filter
        filterParams: {
          // provide comparator function
          comparator: (filterLocalDateAtMidnight, cellValue) => {
            // In the example application, dates are stored as dd/mm/yyyy
            // We create a Date object for comparison against the filter date
            const dateParts = cellValue.split('/');
            const day = Number(dateParts[0]);
            const month = Number(dateParts[1]) - 1;
            const year = Number(dateParts[2]);
            const cellDate = new Date(year, month, day);
            // Now that both parameters are Date objects, we can compare
            if (cellDate < filterLocalDateAtMidnight) {
              return -1;
            } else if (cellDate > filterLocalDateAtMidnight) {
              return 1;
            } else {
              return 0;
            }
          },
        },
      },
    };
  }, []);

  const rowHeight = 50;

  const onQuickFilterChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById('quickFilter').value
    );
  }, []);
  const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);
  const onPaginationChange=(pageSize)=>{
    gridApi.api.paginationSetPageSize(Number(pageSize))
  }

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const [formData, setFormData] = useState(initialValue)
  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue)
  };

  const onChange = (e) => {
    const { value, id } = e.target
    setFormData({ ...formData, [id]: value })
  }
  const getData = () => {
    fetch(PoubellesURL).then(resp => resp.json()).then(
      resp => setTableData(resp.data)
    )
  }
  const handleFormSubmit = () => {
    if (formData.id) {
      //updating a user 
      const confirm = window.confirm("Êtes-vous sûr de vouloir mettre à jour cette ligne?")
      confirm && fetch(PoubellesURL + `/${formData.id}`, {
        method: "PUT", body: JSON.stringify(formData), headers: {
          'content-type': "application/json"
        }
      }).then(resp => resp.json())
        .then(resp => {
          handleClose()
          getData()
        })
    } else {
      // adding new user
      fetch(PoubellesURL, {
        method: "POST", body: JSON.stringify(formData), headers: {
          'content-type': "application/json"
        }
      }).then(resp => resp.json())
        .then(resp => {
          handleClose()
          getData()
        })
    }
  }
  // setting update row data to form data and opening pop up window
  const handleUpdate = (oldData) => {
    setFormData(oldData)
    handleClickOpen()
  }
  //deleting a user
  const handleDelete = (id) => {
    const confirm = window.confirm("Êtes-vous sûr de vouloir supprimer cette ligne?", id)
    if (confirm) {
      fetch(PoubellesURL + `/${id}`, { method: "DELETE" }).then(resp => resp.json()).then(resp => getData())
    }
  }


  return (
    <div>
      <h2>Camions</h2>
      <Grid  container direction="row" justifyContent="space-between" alignItems="flex-start" >
        <Item style={{marginBottom:'8px' }}>
          <ManageSearchIcon 
            variant="contained" 
            color="success"  
            style={{marginBottom:"-7px"}} 
          />
          <input 
            type="text" 
            onInput={onQuickFilterChanged} 
            id="quickFilter"  
            placeholder="Recherche..."  
            style={{backgroundColor:'#DCDCDC', border:'none',padding:"8px" }}
          />
        </Item>
        <Item>
          <select style={{marginRight:'5px' , padding:"10px" , borderRadius:"5px",border:"none"}} onChange={(e)=>onPaginationChange(e.target.value)}>
            <option value='5'>5</option>
            <option value='25'>25</option>
            <option value='50'>50</option>
            <option value='100'>100</option>
          </select>
          <Button variant="contained" color="primary" onClick={onBtnExport} style={{marginRight:"8px"}}><FileDownloadIcon/></Button>
          <Button variant="contained" color="success" onClick={handleClickOpen}><AddIcon/></Button>
        </Item>
      </Grid>
      <div className="ag-theme-alpine" style={{ height: '350px'}}>
        <AgGridReact
          ref={gridRef}
          rowData={tableData}
          columnDefs={columns}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          columnTypes={columnTypes}
          rowHeight={rowHeight}
          pagination={true}
          paginationPageSize={5}
        />
      </div>
      <DialogCamion 
        open={open} 
        handleClose={handleClose}
        data={formData} 
        onChange={onChange} 
        handleFormSubmit={handleFormSubmit} 
      />
    </div>
  )
}
