import React, { useState, useEffect } from 'react'
import '../css/counter.css'
import axios from 'axios'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import { Icon, Statistic } from 'semantic-ui-react'


const dashboardURL = 'https://ami.monconstat.tech/api/dashboard'
const DechetsURL = 'https://127.0.0.1:8000/api/somme-total-dechet-zone-depot'

export default function Counter() {
    // const [count, setcount] = React.useState([])
    // useEffect(() => {
    //     ;(async function getStatus() {
    //       const vdata = await fetch(DechetsURL)
    //       const vjson = await vdata.json()
    
    //       setTimeout(getStatus, 60000)
    //       setcount(vjson)
    //     })()
    //   }, [])

    const [dechets, setDechets] = React.useState([])
    useEffect(() => {
        ;(async function getStatus() {
          const vdata = await fetch(dashboardURL)
          const vjson = await vdata.json()
    
          setTimeout(getStatus, 60000)
          setDechets(vjson)
        })()
      }, [])

    return (
    <>
        <Container sx={{backgroundColor:"white"}}>
             {/* <Card sx={{backgroundColor:"#321fdb"}}  className='text-white mb-3' style={{ maxWidth: '18rem' }}>
                <Typography>Quantité Totale Plastique</Typography>
                <Typography>
                    {count.somme_depot_actuelle_plastique} Kg
                </Typography>
            </Card>
            <Card sx={{backgroundColor:"#f9b115"}} className='text-white mb-3' style={{ maxWidth: '18rem' }}>
                <Typography>Quantité Totale Papier</Typography>
                <Typography>
                    {count.somme_depot_actuelle_papier} Kg
                </Typography>
            </Card>
            <Card sx={{backgroundColor:"#2eb85c"}} className='text-white mb-3' style={{ maxWidth: '18rem' }}>
                <Typography>Quantité Totale Composte</Typography>
                <Typography>
                    {count.somme_depot_actuelle_composte} Kg
                </Typography>
            </Card>
            <Card sx={{backgroundColor:"#e55353"}} className='text-white mb-3' style={{ maxWidth: '18rem' }}>
                <Typography>Quantité Totale Canette</Typography>
                <Typography>
                    {count.somme_depot_actuelle_canette} Kg
                </Typography>
            </Card>  */}
            <Statistic.Group>
                <Statistic color='green'>
                    <Statistic.Value>
                        <Icon name='trash' />
                        {dechets.nbr_bloc_poubelle}
                    </Statistic.Value>
                    <Statistic.Label>Bloc Poubelle</Statistic.Label>
                </Statistic>
                <Statistic color='yellow'>
                    <Statistic.Value>
                        <Icon name='building' />
                        {dechets.nbr_etablissement}
                    </Statistic.Value>
                    <Statistic.Label>Etablissement</Statistic.Label>
                </Statistic>
                <Statistic color='orange'>
                    <Statistic.Value>
                        <Icon name='map marker alternate' />
                        {dechets.nbr_zone_travail}
                    </Statistic.Value>
                    <Statistic.Label>Zone de Travail</Statistic.Label>
                </Statistic>
                <Statistic color='blue'>
                    <Statistic.Value>
                        <Icon name='truck' />
                        {dechets.nbr_camion}
                    </Statistic.Value>
                    <Statistic.Label>Camion</Statistic.Label>
                </Statistic>
                <Statistic color='teal'>
                    <Statistic.Value>
                        <Icon name='user' />
                        {dechets.nbr_ouvrier}
                    </Statistic.Value>
                    <Statistic.Label>Ouvriers</Statistic.Label>
                </Statistic>
                <Statistic  color='red'>
                    <Statistic.Value>
                        <Icon name='user' />
                        {dechets.nbr_fournisseur}
                    </Statistic.Value>
                    <Statistic.Label>Fournisseurs</Statistic.Label>
                </Statistic>
                <Statistic  color='violet'>
                    <Statistic.Value>
                        <Icon name='trash alternate' />
                        {dechets.nbr_poubelle_vendus}
                    </Statistic.Value>
                    <Statistic.Label>Poubelle vendue</Statistic.Label>
                </Statistic>
                <Statistic color='brown'>
                    <Statistic.Value>
                        <Icon name='trash alternate' />
                        {dechets.nbr_poubelle_stock}
                    </Statistic.Value>
                    <Statistic.Label>Poubelle en Stock</Statistic.Label>
                </Statistic>
            </Statistic.Group>
            <Statistic.Group>
                <Statistic color='olive'> 
                    <Statistic.Value>
                        <Icon name='recycle' />
                        {dechets.nbr_commande_dechet}
                    </Statistic.Value>
                    <Statistic.Label>Commande Dechet</Statistic.Label>
                </Statistic>
                <Statistic color='orange'>
                    <Statistic.Value>
                        <Icon name='shopping basket'/>
                        {dechets.nbr_commande_poubelle}
                    </Statistic.Value>
                    <Statistic.Label>Commande Poubelle</Statistic.Label>
                </Statistic>
            </Statistic.Group>
        </Container>
    </>
    )
}