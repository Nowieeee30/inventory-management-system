import React, { useState } from "react";
import "../../public/styles/links.css";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  IconButton,
  Box,
  Snackbar,
  Alert,
  Button,
} from "@mui/material";
import {
  HomeOutlined,
  Inventory2Outlined,
  SettingsOutlined,
  DescriptionOutlined,
  MonetizationOnOutlined,
  CardTravelOutlined,
  TrendingUpOutlined,
  PeopleAltOutlined,
  ListAltOutlined,
} from "@mui/icons-material";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

export default function SideBarComponent() {
  const navigate = useNavigate();
  const navigateTo = (to) => {
    navigate(to);
  };
  const location = useLocation();
  const currentPage = location.pathname;
  console.log(currentPage);
  // const styles = theme => ({
  //     listItemText:{
  //         fontSize:'0.7em',//Insert your required size
  //     }
  //     });
  const sideBarComponent = [
    {
      title: "Home",
      component: <HomeOutlined fontSize="medium" color="primary" />,
    },
    {
      title: "Inventory",
      component: <Inventory2Outlined fontSize="medium" color="primary" />,
    },
    {
      title: "Orders",
      component: <CardTravelOutlined fontSize="medium" color="primary" />,
    },
    {
      title: "Customers",
      component: <PeopleAltOutlined fontSize="medium" color="primary" />,
    },
    {
      title: "Revenue",
      component: <MonetizationOnOutlined fontSize="medium" color="primary" />,
    },
    {
      title: "Growth",
      component: <TrendingUpOutlined fontSize="medium" color="primary" />,
    },
    {
      title: "Reports",
      component: <DescriptionOutlined fontSize="medium" color="primary" />,
    },
    {
      title: "Settings",
      component: <SettingsOutlined fontSize="medium" color="primary" />,
    },
    {
      title: "Masterlist",
      component: <ListAltOutlined fontSize="medium" color="primary" />,
      submenu: [
        { title: "Business Partner", path: "" },
        { title: "Company Profile", path: "" },
        { title: "Customer Master", path: "" },
        { title: "Item Master", path: "" },
        { title: "Employee Master", path: "" },
        { title: "Warehouse Master", path: "" },
        { title: "Price Master", path: "" },
      ],
    }
  ];
  const [selected, setSelected] = useState(0);
  const handlSelectedComponent = (event, index) => {
    setSelected(index);
  };
  return (
    <>
    <List>
      {sideBarComponent.map((comp, index) => {
        const hasSubmenu = !!comp.submenu;
        const isSelected = index === selected && currentPage.includes(comp.title.toLowerCase());
        const [openSubmenu, setOpenSubmenu] = useState(false);

        return (
          <React.Fragment key={index}>
            <ListItem disablePadding dense>
              <Box width="100%">
                <ListItemButton
                  onClick={(event) => {
                    handlSelectedComponent(event, index);
                    if (hasSubmenu) {
                      setOpenSubmenu(!openSubmenu); // toggle submenu
                    } else {
                      navigateTo(comp.title.toLowerCase());
                    }
                  }}
                  selected={isSelected}
                  sx={{
                    mb: 1,
                    borderLeft: 0,
                    borderColor: "primary.main",
                    ml: 1,
                  }}
                >
                  <ListItemIcon>
                    <IconButton>{comp.component}</IconButton>
                  </ListItemIcon>
                  <ListItemText
                    primary={comp.title}
                    primaryTypographyProps={{
                      fontSize: "medium",
                      fontWeight: isSelected ? "bold" : "",
                      color: isSelected ? "primary.main" : "inherit",
                    }}
                  />
                </ListItemButton>
              </Box>
            </ListItem>

            {/* Submenu Rendering */}
            {hasSubmenu && openSubmenu && (
              <Box ml={6}>
                {comp.submenu.map((item, subIndex) => (
                  <ListItemButton
                    key={subIndex}
                    sx={{ pl: 2 }}
                    onClick={() => navigateTo(`/${item.path}`)}
                    selected={currentPage === "/" + item.path}
                  >
                    <ListItemText
                      primary={item.title}
                      primaryTypographyProps={{
                        fontSize: "small",
                        color:
                          currentPage === "/" + item.path
                            ? "primary.main"
                            : "inherit",
                      }}
                    />
                  </ListItemButton>
                ))}
              </Box>
            )}
          </React.Fragment>
        );
      })}
    </List>

      {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar> */}
    </>
  );
  //   const [open, setOpen] = React.useState(false);

  //   const handleClick = () => {
  //     setOpen(true);
  //   };

  //   const handleClose = (event, reason) => {
  //     if (reason === 'clickaway') {
  //       return;
  //     }

  //     setOpen(false);
  //   };
}
