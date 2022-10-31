import AddBoxIcon from '@mui/icons-material/AddBox';
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import MenuIcon from "@mui/icons-material/Menu";
import ReviewsIcon from "@mui/icons-material/Reviews";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../../assets/images/setting.png";

const drawerWidth = 240;

const Dashboard = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const navItems = [
    { name: "Home", link: "/home", icon: <HomeIcon color="primary" /> },
    {
      name: "My Appointments",
      link: "/dashboard",
      icon: <AssignmentTurnedInIcon color="primary" />,
    },
    {
      name: "My Reviews",
      link: "/dashboard/reviews",
      icon: <ReviewsIcon color="primary" />,
    },
    {
      name: "All Services",
      link: "/dashboard/services",
      icon: <HomeRepairServiceIcon color="primary" />,
    },
    {
      name: "Add Service",
      link: "/dashboard/addService",
      icon: <AddBoxIcon color="primary" />,
    },
  ];
  const drawer = (
    <div>
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            minHeight: "60px",
            alignItems: "center",
          }}
        >
          <Box>
            <img style={{ height: "45px" }} src={logo} alt="logo" />
          </Box>
          <Box sx={{ ml: -1, mt: 2, }}>
            <Typography
              sx={{
                lineHeight: "10px",
                fontWeight: 700,
                color: "#1976d2"
              }}
            >
              GMS
            </Typography>
            <Typography sx={{fontSize: "14px"}} color="#07bdb5">DOCTORS</Typography>
          </Box>
        </Box>
      </Toolbar>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <Link
              style={{width: '100%', textDecoration: "none", color: "#1976d2" }}
              to={item.link}
            >
              <ListItemButton sx={{}}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#1976d2",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
            }}
            variant="h5"
            noWrap
            component="div"
          >
            <DashboardIcon />
            &nbsp;Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;
