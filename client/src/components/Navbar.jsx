import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button, Stack } from "@mui/material";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
// import { toastAlert } from "../../utils";
// import { useDispatch, useSelector } from "react-redux";
// import { clearCart } from "../../redux/slices/cartSlice";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { toastAlert } from "../utils";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [mobileSearchVisible, setMobileSearchVisible] = React.useState(false);
  //   const cartItems = useSelector((state) => state.cart.items);
  //   const itemCount = cartItems?.length;
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isLogin = Cookies.get("token");
  const navigate = useNavigate();
  //   const dispatch = useDispatch();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const toggleMobileSearch = () => {
    setMobileSearchVisible((prev) => !prev);
  };

  const handleLogin = () => {
    navigate("/login");
    handleMenuClose();
  };

  //logout
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("type");
    handleMenuClose();
    toastAlert({
      type: "success",
      message: "Logout successful!",
    });
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
     
      {isLogin ? (
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      ) : (
        <MenuItem onClick={handleLogin}>Login</MenuItem>
      )}
      {isLogin && <MenuItem onClick={handleLogout}>Log out</MenuItem>}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={0} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Orders</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={0} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "var(--color-surface)",
          color: "var(--color-text-primary)",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open search"
            sx={{ mr: 2, display: { xs: "flex", sm: "none" } }}
            onClick={toggleMobileSearch}
          >
            <MenuIcon />
          </IconButton>

          <Stack
            flexDirection={"row"}
            textAlign={"center"}
            justifyContent={"center"}
            alignContent={"center"}
            my={1.4}
            sx={{ flexGrow: { xs: 1, sm: 0 } }}
          >
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                gap: "8px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "baseline", gap: "6px" }}
              >
                <Typography
                  sx={{ color: "var(--color-primary)", fontWeight: "bold" }}
                >
                  SkillStack
                </Typography>
              </div>
            </Link>
          </Stack>

          <Search
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              width: { xs: "100%", sm: "40%", md: "30%" },
              display: { xs: "none", sm: "block" },
            }}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search items"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Box sx={{ flexGrow: 1 }} />
          {Cookies.get("token") ? (
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="small"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={0} color="error">
                  <Link to= "/enrolled-courses">Enrolled Courses</Link>
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={0} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
          ) : (
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: "var(--color-primary)",
                "&:hover": {
                  backgroundColor: "#e65100", 
                },
                fontWeight: "bold",
                borderRadius: "8px",
              }}
              onClick={()=>navigate("/login")}
            >
              Login
            </Button>
          )}

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>

        {mobileSearchVisible && (
          <Box sx={{ px: 2, pb: 2, display: { xs: "block", sm: "none" } }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                autoFocus
                placeholder="Search items"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box>
        )}
      </AppBar>

      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
