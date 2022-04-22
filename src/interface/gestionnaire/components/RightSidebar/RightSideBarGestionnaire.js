import React from 'react'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationGestionnaire from './NotificationGestionnaire';
import MessagesGestionnaire from './Messages';
import SettingsGestionnaire from './SettingsGestionnaire';
import ProfileGestionnaire from './ProfileGestionnaire';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import List from '@mui/material/List';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <>{children}</>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function RightSideBarGestionnaire() {

  const [isOpen, setIsOpen] = React.useState(false)
  const toggleDrawer = () => {
      setIsOpen((prevState) => !prevState)
  }
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <>
      <IconButton color="secondary" size="medium" onClick={toggleDrawer}>
        <MoreVertIcon/>
      </IconButton>
      <Drawer open={isOpen} direction='right' size={450} >
        <Button onClick={toggleDrawer}>
          <CloseIcon />
        </Button>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="Header Tabs">
              <Tab icon={<ChatIcon />}  aria-label="Messages"  {...a11yProps(0)} />
              <Tab icon={<NotificationsActiveIcon />}  aria-label="Notifications"  {...a11yProps(1)} />
              <Tab icon={<SettingsIcon />}  aria-label="Paramétres"  {...a11yProps(2)} />
              <Tab icon={<PersonPinIcon />}  aria-label="Profile"  {...a11yProps(3)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0} >
            <MessagesGestionnaire/>
          </TabPanel>
          <TabPanel value={value} index={1} >
              <NotificationGestionnaire/>
          </TabPanel>
          <TabPanel value={value} index={2}>
              <SettingsGestionnaire/>
          </TabPanel>
          <TabPanel value={value} index={3} >
            <ProfileGestionnaire/>
          </TabPanel>
        </Box>
      </Drawer>
    </>
  )
}


