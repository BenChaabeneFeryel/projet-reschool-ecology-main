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
import {DialogPoubelle} from '../components/DialogPoubelle'


const PoubellesURL = 'https://ami.monconstat.tech/api/poubelle'
//const PoubellesURL = 'http://127.0.0.1:8000/api/google-map'


const initialValue = { 
  id:"", 
  bloc_poubelle_id:"",
  nom:"",
  capacite_poubelle:"", 
  type:"",
  Etat:"",
  temps_remplissage:"",
  created_at:"", 
  updated_at:""
}

export default function Poubelles() {

  const gridRef = useRef();

  const [tableData, setTableData] = React.useState([])

  useEffect(() => {
    ;(async function getStatus() {
      const vdata = await fetch(PoubellesURL)
      const vjson = await vdata.json()

      setTimeout(getStatus, 6000)
      setTableData(vjson.data)
    })()
  }, [])
  console.log(tableData) 
   
  const columns = [
    { field: 'id', headerName: 'ID',},
    { field:'bloc_poubelle_id', headerName: 'ID Bloc',},
    {
      field: 'nom',
      headerName: 'Nom',
      editable: true,
    },
    {
      field: 'capacite_poubelle',
      headerName: 'Capacité Max',
      editable: true,
    },
    {
      field: 'type',
      headerName: 'Type',
      editable: true,
    },
    {
      field: 'Etat',
      headerName: 'Pourcentage',
      description: 'en pourcent (%)',
    },
    {
      field: 'temps_remplissage',
      headerName: 'Temps remplissage',
    },
    {
      field: 'created_at',
      headerName: 'Créé le',
    },
    {
      field: 'updated_at',
      headerName: 'Modifié le',
    },
    // {
    //   field: 'nom_etablissement',
    //   headerName: 'Appartenant à',
    // },
    // {
    //   field: 'adresse',
    //   headerName: 'Emplacement',
    // },
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
      numberColumn: { width: 50, filter: 'agNumberColumnFilter' },
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
      <h2>Poubelles</h2>
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
            {/* <option value='5'>5</option> */}
            <option value='25'>25</option>
            <option value='50'>50</option>
            <option value='100'>100</option>
          </select>
          <Button variant="contained" color="primary" onClick={onBtnExport} style={{marginRight:"8px"}}><FileDownloadIcon/></Button>
          <Button variant="contained" color="success" onClick={handleClickOpen}><AddIcon/></Button>
        </Item>
      </Grid>
      <div className="ag-theme-alpine" style={{ height: '650px'}}>
        <AgGridReact
          ref={gridRef}
          rowData={tableData}
          columnDefs={columns}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          columnTypes={columnTypes}
          rowHeight={rowHeight}
          pagination={true}
          paginationPageSize={25}
        />
      </div>
      <DialogPoubelle 
        open={open} 
        handleClose={handleClose}
        data={formData} 
        onChange={onChange} 
        handleFormSubmit={handleFormSubmit} 
      />
    </div>
  )
}
