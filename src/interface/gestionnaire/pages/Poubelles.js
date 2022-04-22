import * as React from 'react';
import {useState, useEffect,} from 'react'
import PropTypes  from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import MaterialTable from 'material-table';


// const PoubellesURL = 'https://ami.monconstat.tech/api/poubelle'
const PoubellesURL = 'http://127.0.0.1:8000/api/region-map'

const rows = [
  {
    id: 1,
    name: 'a',
    surname: 'Baran',
    birthYear: 1987,
    birthCity: 1,
    sex: 'Male',
    type: 'adult',
  },
  {
    id: 3,
    name: 'c',
    surname: 'Bethany',
    birthYear: 1999,
    birthCity: 2,
    sex: 'Female',
    type: 'child',
    parentId: 2,
  },
  {
    id: 2,
    name: 'b',
    surname: 'Blake',
    birthYear: 1987,
    birthCity: 1,
    sex: 'Male',
    type: 'adult',
  },
  {
    id: 4,
    name: 'd',
    surname: 'David',
    birthYear: 2000,
    birthCity: 3,
    sex: 'Male',
    type: 'child',
    parentId: 5,
  }, 
];

const columns= [
  { title: 'ID', field: 'id' },
  { title: 'name', field: 'name' },
  { title: 'surname', field: 'surname' },
  { title: 'sex', field: 'sex' },
  { title: 'type', field: 'type', removable: false },
  { title: 'birthYear', field: 'birthYear', type: 'numeric' },
  {
    title: 'birthCity',
    field: 'birthCity',
    lookup: { 1: 'Tunis', 2: 'Ben Arous', 3: 'Ariana' },
  },
]

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const [tableData, setTableData] = useState(null)
  useEffect( () => {
    fetch(PoubellesURL).then(resp => resp.json()).then(
      resp => setTableData(resp.data)
    )
  }, [])

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell >{row.calories}</TableCell>
        <TableCell >{row.fat}</TableCell>
        <TableCell >{row.carbs}</TableCell>
        <TableCell >{row.protein}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Etablissements
              </Typography>
              <Table size="small" aria-label="etablissements">
                <TableHead>
                  <TableRow>
                    <TableCell>ID Etab</TableCell>
                    <TableCell>Nom Etab</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Adresse</TableCell>
                    <TableCell>Nombre de personnes</TableCell>              
                    <TableCell>Total Plastique</TableCell>
                    <TableCell>Total Papier</TableCell>
                    <TableCell>Total Composte</TableCell>
                    <TableCell>Total Canette</TableCell>
                    <TableCell>Crée à</TableCell>
                    <TableCell>Modifié à</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell>{historyRow.amount}</TableCell>
                      <TableCell>
                        
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}



export default function Poubelles() {

  const [poubelles, setPoubelles] = React.useState([])
    useEffect(() => {
      ;(async function getStatus() {
        const vdata = await fetch(PoubellesURL)
        const vjson = await vdata.json()
  
        setTimeout(getStatus, 60000)
        setPoubelles(vjson)
      })()
  }, [])

  return (
    <div>
      <h2>Poubelles</h2>

      {/* <div className="ag-theme-alpine" style={{ height: '650px'}}>
        <TableContainer component={Paper} sx={{backgroundColor: 'white'}}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell>ID Zone</TableCell>
                <TableCell>Zone de Travail</TableCell>
                <TableCell>Total Plastique</TableCell>
                <TableCell>Total Papier</TableCell>
                <TableCell>Total Composte </TableCell>
                <TableCell>Total Canette</TableCell>
                <TableCell>Crée à</TableCell>
                <TableCell>Modifié à</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div> */}
      <MaterialTable
        title="Poubelles"
        style={{backgroundColor: 'white'}}
        data={rows}
        columns={columns}
        parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
        options={{ selection: true, }}
      />
    </div>
  )
}
