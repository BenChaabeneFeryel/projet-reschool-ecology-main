import React, { useState, useEffect } from 'react'
import { Container, Card, CardHeader, Typography, Grid } from '@mui/material';
import Select from 'react-select'
import {
  Chart as ChartJS,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chartline = () => {

  const [ventes, setVentes] = React.useState([])
  useEffect(() => {
    ;(async function getStatus() {
      const vdata = await fetch('http://ami.monconstat.tech/api/somme-dechets-vendus')
      const vjson = await vdata.json()

      setTimeout(getStatus, 60000)
      setVentes(vjson)
    })()
  }, [])

  var voptions = []
  const [vAnnee, setVAnnee] = useState()
  const [ventesPlastique, setVentesPlastique] = useState([])
  const [ventesPapier, setVentesPapier] = useState([])
  const [ventesComposte, setVentesComposte] = useState([])
  const [ventesCanette, setVentesCanette] = useState([])

  if (ventes.length !== 0) {
    var vplastique = ventes.plastique
    var vpapier = ventes.papier
    var vcomposte = ventes.composte
    var vcanette = ventes.canette
    var vannees = ventes.annee

    if (vAnnee === undefined) {
      setVAnnee(vannees[0])
      setVentesPapier(vpapier[0])
      setVentesPlastique(vplastique[0])
      setVentesComposte(vcomposte[0])
      setVentesCanette(vcanette[0])
    } else {
      for (let i = 0; i < vannees.length; i++) {
        voptions.push({
          value: vannees[i],
          ventesPapier: vpapier[i],
          ventesPlastique: vplastique[i],
          ventesComposte: vcomposte[i],
          ventesCanette: vcanette[i],
        })
      }
      if (voptions.length !== 0) {
        var onchangeSelectV = (item) => {
          setVAnnee(item.value)
          setVentesPapier(item.ventesPapier)
          setVentesPlastique(item.ventesPlastique)
          setVentesComposte(item.ventesComposte)
          setVentesCanette(item.ventesCanette)
        }
      }
    }
  }

    return (
      <>
        <Card sx={{backgroundColor:"white"}}>
          <Container>
              <Typography>
                <h4 id="traffic" className="card-title mb-0" align="center">
                  Quantités vendus des déchets par mois
                </h4>
              </Typography>
              <Grid container sm={15}>
                <Select
                  className="float-end me-3"
                  onChange={onchangeSelectV}
                  value={vAnnee}
                  options={voptions}
                  getOptionValue={(option) => option.value}
                  getOptionLabel={(option) => option.value}
                  placeholder={vAnnee}
                />
              </Grid>
            <Container>
              <Line 
              options={{ 
                  responsive: true,
                  plugins: {
                  legend: {
                      position: 'top',
                  },
                  title: {
                      display: false,
                      text: 'Quantités vendus des déchets par mois',
                  },
                  },
              }} 
              data={{ 
                  labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre','Octobre','Novembre','Decembre'],
                  datasets: [
                  {
                      label: 'Plastique',
                      data: ventesPlastique,
                      borderColor: '#321fdb',
                      backgroundColor: '#321fdb',
                  },
                  {
                      label: 'Papier',
                      data: ventesPapier,
                      borderColor: '#f9b115',
                      backgroundColor: '#f9b115',
                  },
                  {
                      label: 'Composte',
                      data: ventesComposte,
                      borderColor: '#2eb85c',
                      backgroundColor: '#2eb85c',
                  },
                  {
                      label: 'Canette',
                      data: ventesCanette,
                      borderColor: '#e55353',
                      backgroundColor: '#e55353',
                  },
                  ],
              }} />
            </Container>
          </Container>
          <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
        </Card>
      </>
    );
}

export default Chartline;