import React, { useState } from "react";
import { styled, useTheme } from '@mui/material/styles';
import {Toolbar,Box,Button,ThemeProvider,createTheme, List, ListItem, IconButton,ListItemButton ,ListItemText,ListItemIcon,Collapse} from "@mui/material";
import {baseTheme,theme1} from "../../style";
import { deepmerge } from "@mui/utils";
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { Link  , Outlet} from 'react-router-dom';
import { MdOutlineRecycling } from "react-icons/md"
import { BsFillCalendarDateFill, BsTrashFill, BsTools } from "react-icons/bs";
import { FaMapMarkedAlt, FaTruckMoving, FaRecycle, FaTrash, FaUser, FaUserTie,FaCalendarDay} from "react-icons/fa";
import { HiUsers } from 'react-icons/hi'
import { ImUserTie, ImStatsDots } from "react-icons/im";
import { RiShoppingBasketFill } from "react-icons/ri"
import { MdReportProblem } from "react-icons/md"
import { VscTrash } from "react-icons/vsc";
import RightSideBarGestionnaire from './components/RightSidebar/RightSideBarGestionnaire';
import Badge from '@mui/material/Badge';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Swal from "sweetalert";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const drawerWidth = 280;
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

function hasChildren(item) {
  const { items: children } = item;
  if (children === undefined) {
    return false;
  }
  if (children.constructor !== Array) {
    return false;
  }
  if (children.length === 0) {
    return false;
  }

  return true;
}

export default function InterfaceGestionnaire() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [theme2, setTheme2] = useState(baseTheme);
  const handleSwitch = (whichTheme) => {
    const newTheme = deepmerge(theme2, whichTheme);
    setTheme2(createTheme(newTheme));
  };
  const MenuItem = ({ item }) => {
    const Component = hasChildren(item) ? MultiLevel : SingleLevel;
    return <Component item={item} />;
  };
  
  const SingleLevel = ({ item }) => {
    return (
      <Link key={item.id}   to={item.path}> 
          <ListItemButton   sx={{ maxHeight:40, justifyContent: open ? 'initial' : 'center',  px: 1}}>
                  <ListItemIcon sx={{  minWidth: 0, mr: open ? 1 :'auto',  justifyContent: 'center', }}  >
                  <IconButton
                  color="secondary"
                  size="medium"
                >
                          {item.icon } 
                </IconButton>
                  </ListItemIcon> 
                  <ListItemText component="div" color="secondary" sx={{ opacity: open ? 1 : 0, color:"white", textDecoration:"none"}}> {item.name}</ListItemText>
          </ListItemButton>
     </Link>
    );
  };
  
  const MultiLevel = ({ item }) => {
    const { items: children } = item;
    const [openSubmenu, setOpenSubmenu] = useState(false);
  
    const handleClick = () => {
      setOpenSubmenu((prev) => !prev);
    };
    return (
      <React.Fragment>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} />
          {openSubmenu ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        <Collapse in={openSubmenu} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((child, key) => (
              <MenuItem key={key} item={child} />
            ))}
          </List>
        </Collapse>
      </React.Fragment>
    );
  };
  const navigate = useNavigate();

  const logoutSubmit= (e)=>{
    e.preventDefault();
    axios.post(`api/auth-gestionnaire/logout`).then(res=>{
      if(res.data.status===200){
        localStorage.removeItem('auth_token_gestionnaire');
        localStorage.removeItem('auth_email');
        Swal('Success',res.data.message,"success")
        navigate("/")   
      }
    })
  }

  var AuthButtons='';
  if(!localStorage.getItem('auth_token_gestionnaire')){
    AuthButtons=(
      <>
        <Link to="/gestionnaire/login">Register </Link>
        <Link to="/register-gestionnaire">Login </Link>
      </>   )
  }else{  AuthButtons=( <li><button onClick={logoutSubmit}>Logout</button></li> )
  }

  const linkDetails = [
    {id: 1, name: "Dashboard",  path:"/gestionnaire", icon: <ImStatsDots/>},
    {id: 2, name: "Map",  path:"/gestionnaire/map", icon: <FaMapMarkedAlt/>},

    {id: 3, name: "Poubelles", path:"/gestionnaire/poubelles", icon: <BsTrashFill/>},
    {id: 4, name: "Camions", path:"/gestionnaire/camions", icon: <FaTruckMoving/>},
   
    {id: 5, name: "Production poubelle", icon: <FaTrash/>,
      items: [
        {id: 1, name: "Fournisseurs", path:"/gestionnaire/production/fournisseurs", icon: <FaUserTie/>},
        {id: 2,name: "Stock poubelles", path:"/gestionnaire/production/stock-poubelles", icon: <VscTrash/>},
        {id: 3,name: "Materiaux primaires", path:"/gestionnaire/production/materiaux-primaires", icon: <BsTools/>},
      ]},
    {id: 6, name: "Personnel", icon: <HiUsers/>,
      items: [
        {id: 1,name: "Ouvriers", path:"/gestionnaire/personnel/ouvriers", icon: <HiUsers/>},
        {id: 2,name: "Réparateurs poubelle", path:"/gestionnaire/personnel/reparateurs-poubelle", icon: <BsTools/>},
        {id: 3,name: "Réparateurs camion", path:"/gestionnaire/personnel/reparateurs-camion", icon: <BsTools/>},
      ]},
    {id: 7, name: "Clients", icon: <FaUser/>,
    items: [
      {id: 1,name: "Responsables Etablissement", path:"/gestionnaire/clients/responsables-etablissements", icon: <FaUser/>},
      {id: 2,name: "Acheteurs de déchets", path:"/gestionnaire/clients/acheteurs-dechets", icon: <FaRecycle/>},
    ]
    },
    {id: 8, name: "Commandes", icon: <RiShoppingBasketFill/>,
    items: [
      { id: 1,name: "Commandes Poubelles", path:"/gestionnaire/commandes-poubelles", icon: <VscTrash/>},
      { id: 2,name: "Commandes Déchets", path:"/gestionnaire/commandes-dechets", icon: <FaRecycle/>},
    ]
    },
    {id: 9, name: "Pannes", icon: <MdReportProblem/>,
    items: [
      { id: 1,name: "Pannes Poubelles", path:"/gestionnaire/pannes-poubelles", icon: <VscTrash/>},
      { id: 2,name: "Pannes Déchets", path:"/gestionnaire/pannes-dechets", icon: <FaRecycle/>},
    ]
    },
    {id:10, name: "Calendrier",path:"/gestionnaire/calendrier", icon: <BsFillCalendarDateFill/>},

  ];

  const liens = linkDetails.map((lien, key)=> 
    <>
     <MenuItem key={key} item={lien} />
    </> 
   );
     
  return (
    <>
      <ThemeProvider theme={theme2}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="fixed" open={open} >
            <Toolbar>
              <Box sx={{  marginRight: 5, ...(open && { display: 'none' })  }}>
                <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" >
                  <MenuIcon /> 
                </IconButton>
                <MdOutlineRecycling/> 
                RE:SCHOOL Ecology 
              </Box>
              
              <Box sx={{ flexGrow: 1 }} />
              <Button onClick={() => setTheme2(baseTheme)} variant="contained" color="primary"> Reset </Button>
              <Button onClick={() => handleSwitch(theme1)} variant="contained"> Theme </Button>
              {AuthButtons}
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton size="large" aria-label="show 4 new mails" color="secondary">
                  <Badge badgeContent={4} color="error">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="secondary"
                >
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  color="secondary"
                >
                  <AccountCircle />
                </IconButton>
              </Box>
              <RightSideBarGestionnaire/>
            </Toolbar>  
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <DrawerHeader>
              <Typography variant="h6" noWrap component="div">
                <MdOutlineRecycling/>
                RE:SCHOOL Ecology
              </Typography>
              <IconButton onClick={handleDrawerClose}>
                <MenuIcon/>
              </IconButton>
            </DrawerHeader>
            <List >
              {liens}             
            </List>
          </Drawer>              
          <Box component="main" sx={{ flexGrow: 1,p:2, backgroundColor: 'secondary', }}>
            <DrawerHeader />
            <Outlet/>
          </Box>
        </Box>
        <AppBar open={open} color="primary" sx={{ backgroundColor: 'lightgrey',top: 'auto', bottom: 0, height:27,textAlign:'center'}}>
          <Box>
            RE:SCHOOL © 2022
            <a href='https://reschoolwethink.education/'> Site web</a>
          </Box>
        </AppBar>
      </ThemeProvider>
    </>
  );
}
