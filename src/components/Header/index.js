import React, {useState} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import {
  Drawer,
  AppBar,
  Toolbar,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Grid,
  MenuItem,
  Menu,
} from '@material-ui/core';
import {
  PlaylistAddCheck,
  AccountCircle,
  ExitToApp as ExitToAppIcon,
  MonetizationOn as MonetizationOnIcon,
  CardGiftcard as CardGiftcardIcon,
  OpenInBrowser as OpenInBrowserIcon,
  Send as SendIcon,
} from '@material-ui/icons';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

export default function MiniDrawer() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const history = useHistory();

  const dispatch = useDispatch();
  function logout() {
    dispatch({type: 'LOGOUT'});
  }
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}>
        <Toolbar variant="dense">
          <Typography variant="h6" className={classes.title}>
            Meu Delivery
          </Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit">
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}>
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        onMouseOver={handleDrawerOpen}
        onMouseOut={handleDrawerClose}
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        style={{width: '36px !important'}}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="flex-start"
          style={{height: '100vh'}}>
          <ListItem button onClick={() => history.push('/admin/pedidos')}>
            <ListItemIcon>
              <PlaylistAddCheck />
            </ListItemIcon>

            <ListItemText primary={'Pedidos'} />
          </ListItem>
          <ListItem button onClick={() => history.push('/admin/produtos')}>
            <ListItemIcon>
              <OpenInBrowserIcon />
            </ListItemIcon>
            <ListItemText primary={'Produtos'} />
          </ListItem>
          <ListItem button onClick={() => history.push('/admin/financeiro')}>
            <ListItemIcon>
              <MonetizationOnIcon />
            </ListItemIcon>
            <ListItemText primary={'Financeiro'} />
          </ListItem>
          <ListItem button onClick={() => history.push('/admin/entregador')}>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary={'Entregador'} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <CardGiftcardIcon />
            </ListItemIcon>
            <ListItemText primary={'Desconto'} />
          </ListItem>
          <ListItem button onClick={() => logout()}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={'Sair'} />
          </ListItem>
        </Grid>
      </Drawer>
    </div>
  );
}
const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: process.env.REACT_APP_PRIMARY_COLOR,
    [theme.breakpoints.up('sm')]: {
      minHeight: theme.spacing(3) + 1,
    },
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 1,
    },
  },
  title: {
    flexGrow: 1,
    marginLeft: 57,
  },
}));
