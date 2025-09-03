import * as React from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AccountBalance } from "@mui/icons-material";

const drawerWidth = 240;

const VendorListing = [
  { name: "Dashboard", url: "/instructor-dash", icon: <DashboardIcon /> },
  {
    name: "Courses",
    url: "/courses",
    icon: <MenuBookIcon />,
  },
  {
    name: "Total Students",
    url: "/admin-dashboard",
    icon: <PeopleOutlineIcon />,
  },
];

function InstructorDash(props) {
  const { window, children, dashTitle } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("type");
    handleClose();
    navigate("/login");
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <div>
      <Link
        to="/admin-dashboard"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          textDecoration: "none",
          gap: "10px",
          margin: "1.1rem 0",
        }}
      >
        <AccountBalance style={{ fontSize: "1rem", color: "#2e7d32" }} />

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "6px",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 300,
              color: "#2e7d32",
              letterSpacing: "0.1px",
            }}
          >
            Saylani
          </Typography>

          <Typography
            variant="h6"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 300,
              color: "blue",
              letterSpacing: "0",
            }}
          >
            MicroFinance
          </Typography>
        </div>
      </Link>
      <Divider />
      <List>
        {VendorListing.map((list) => (
          <ListItem key={list.name} disablePadding>
            <ListItemButton component={Link} to={list.url}>
              <ListItemIcon>{list.icon}</ListItemIcon>
              <ListItemText primary={list.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "green",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              {dashTitle}
            </Typography>
          </Box>
          <Button
            id="basic-button"
            aria-controls={Boolean(anchorEl) ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={Boolean(anchorEl) ? "true" : undefined}
            onClick={handleClick}
          >
            <Avatar
              sx={{ width: { xs: 36, md: 56 }, height: { xs: 36, md: 56 } }}
            />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            slotProps={{
              list: { "aria-labelledby": "basic-button" },
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
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
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          slotProps={{
            root: {
              keepMounted: true,
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
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

InstructorDash.propTypes = {
  window: PropTypes.func,
  children: PropTypes.node,
  dashTitle: PropTypes.string,
};

export default InstructorDash;
