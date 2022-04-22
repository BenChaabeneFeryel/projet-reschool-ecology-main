import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';

export function DialogCamion({open,handleClose,data,onChange,handleFormSubmit}) {
 const {id,bloc_poubelle_id,nom,capacite_poubelle,type,Etat,temps_remplissage}=data

  return (
    <div>
      <Dialog 
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <DialogTitle id="alert-dialog-title"sx={{backgroundColor: 'white'}}>
        {id?"Modifier Poubelle":"Ajouter Nouveau Poubelle"}
      </DialogTitle>
      <DialogContent sx={{backgroundColor: 'white'}}>
         <form>
          <TextField id="id" 
            value={id} onChange={e=>onChange(e)} 
            placeholder="Entrer l'identifiant de la Poubelle" label="Identifiant Poubelle" 
            variant="outlined" margin="dense" fullWidth 
          />
          <TextField id="id_bloc_poubelle" 
            value={bloc_poubelle_id} onChange={e=>onChange(e)} 
            placeholder="Entrer l'identifiant du bloc poubelle" label="Identifiant Bloc Poubelle" 
            variant="outlined" margin="dense" fullWidth 
          />
          <TextField id="nom" 
            value={nom} onChange={e=>onChange(e)} 
            placeholder="Entrer Nom Poubelle" label="Nom Poubelle" 
            variant="outlined" margin="dense" fullWidth 
          />
          <TextField id="capacite_poubelle" 
            value={capacite_poubelle} onChange={e=>onChange(e)} 
            placeholder="Enter la Capacité maximale de la Poubelle" label="Capacité maximale de la Poubelle" 
            variant="outlined" margin="dense" fullWidth 
          />       
          <TextField id="type" 
            value={type} onChange={e=>onChange(e)} 
            placeholder="Enter le Type de la Poubelle" label="Type Poubelle" 
            variant="outlined" margin="dense" fullWidth 
          />       
          <TextField id="Etat" 
            value={Etat} onChange={e=>onChange(e)} 
            placeholder="Entrer le Pourcentage de Remplissage actuel de la Poubelle" label="Pourcentage de Remplissage Poubelle" 
            variant="outlined" margin="dense" fullWidth 
          />
          <TextField id="temps_remplissage" 
            value={temps_remplissage} onChange={e=>onChange(e)} 
            placeholder="Enter le Temps de Remplissage" label="Temps de Remplissage" 
            variant="outlined" margin="dense" fullWidth 
          />       
         </form>
        </DialogContent>
        <DialogActions sx={{backgroundColor: 'white'}}>
          <Button onClick={handleClose} color="error" variant="outlined">
            Annuler
          </Button>
          <Button  color="primary" sx={{color: 'white'}} onClick={()=>handleFormSubmit()} variant="contained">
            {id ? "Modifier" : "Ajouter" }
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}