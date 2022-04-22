import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link ,Outlet } from 'react-router-dom';
import FooterResponsable from './components/FooterResponsable'



import { MdOutlineRecycling } from "react-icons/md"
import { BsFillBasketFill, BsTrashFill, BsTools } from "react-icons/bs";
import { FaMapMarkedAlt, FaTruckMoving, FaRecycle, FaBars, FaMoneyBill, FaUser, FaUserTie ,FaCalendarDay} from "react-icons/fa";
import { HiUsers } from 'react-icons/hi'
import { ImUserTie, ImStatsDots } from "react-icons/im";
import { VscTrash } from "react-icons/vsc";

const drawerWidth = 260;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function InterfaceResponsableEtablissement() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const linkDetails = [
    {id: 1, name: "dashboard",path:"/responsable-etablissement", icon: <ImStatsDots/>},
    {id: 2, name: "map",path:"/responsable-etablissement/map", icon: <FaMapMarkedAlt/>},
    {id: 3, name: "poubelle",path:"/responsable-etablissement/poubelle", icon: <BsTrashFill/>},
    {id: 4, name: "Pannes Poubelle",path:"/responsable-etablissement/panne-poubelle", icon: <BsTools/>},

    {id: 5, name: "calendrier",path:"/responsable-etablissement/calendrier", icon: <FaCalendarDay/>},
  
    {id: 6, name: "commander",path:"/responsable-etablissement/commander", icon: <VscTrash/>},
    {id: 7, name: "panier",path:"/responsable-etablissement/panier", icon: <BsFillBasketFill/>}
  
  ];

    const liens = linkDetails.map(lien => 
        <Link key={lien.id}   to={lien.path}>
            <ListItemButton  sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center',  px: 2.5,  }}>
                    <ListItemIcon sx={{  minWidth: 0, mr: open ? 4 :'auto',  justifyContent: 'center', }}  >
                            {lien.icon}
                    </ListItemIcon>
                        <ListItemText component="div" sx={{ opacity: open ? 1 : 0}}>
                            {lien.name}
                        </ListItemText>

            </ListItemButton>
        </Link> )
  return (
    <>
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
        <Toolbar>
            <Box sx={{  marginRight: 5, ...(open && { display: 'none' })  }}>
                    <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" >
                        <MenuIcon /> 
                    </IconButton>
                    <MdOutlineRecycling/> Re school ecology 
            </Box>
         </Toolbar>
         
        </AppBar>
        <Drawer variant="permanent" open={open}>
            <DrawerHeader>
                <Typography variant="h6" noWrap component="div">
                        <MdOutlineRecycling/>
                        Re school ecology
                </Typography>
            <IconButton onClick={handleDrawerClose}>
               <MenuIcon/>
            </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {liens}
            </List>
        
            <Divider />

        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
            <DrawerHeader />
            <Outlet/>
        </Box>
        </Box>
        <FooterResponsable/>

    </>
  );
}