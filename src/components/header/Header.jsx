import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  icon: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
    marginRight: theme.spacing(1),
  },
  headerLogo: {
    marginRight: theme.spacing(2),
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
    fontFamily: "monospace",
    fontWeight: 700,
    letterSpacing: ".3rem",
    color: "inherit",
    textDecoration: "none",
  },
  container: {
    responsiveElement: {
      flexGrow: 1,
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
  },
  responsiveElement: {
    flexGrow: 1,
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  navMenu: {
    display: "block",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  pageLink: {
    textDecoration: "none",
    fontWeight: "bold",
  },
  adbIcon: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    marginRight: theme.spacing(1),
  },
  mobileView: {
    marginRight: theme.spacing(2),
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    flexGrow: 1,
    fontFamily: "monospace",
    fontWeight: 700,
    letterSpacing: ".3rem",
    color: "inherit",
    textDecoration: "none",
  },
  mobileContainer: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  mobileLink: {
    textDecoration: "none",
    color: "white",
  },
}));

const pages = ["Movies"];

function Header() {
  const { classes } = useStyles();
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon className={classes.icon} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            className={classes.headerLogo}
          >
            LOGO
          </Typography>

          <Box className={classes.responsiveElement}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              className={classes.navMenu}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link to="/" className={classes.pageLink}>
                    {page}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon className={classes.adbIcon} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            className={classes.mobileView}
          >
            LOGO
          </Typography>
          <Box className={classes.mobileContainer}>
            {pages.map((page) => (
              <Link key={page} to="/" className={classes.mobileLink}>
                {page}
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
