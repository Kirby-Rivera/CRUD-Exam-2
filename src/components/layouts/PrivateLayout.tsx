'use client'

import { ReactNode, useState } from "react";
import Link from "next/link";
import HouseIcon from "@mui/icons-material/House";
import EditNoteIcon from "@mui/icons-material/EditNote";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import { useAuth } from "@/modules/app/AppAuthProvider";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Card,
} from "@mui/material";
import styles from "./layout.module.scss";

interface LayoutProps {
  children: ReactNode;
}

const drawerWidth = 230;

export default function PrivateLayout({ children }: LayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const { logout } = useAuth();

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  const DrawerList = (
    <List>
      {["Dashboard", "Posts"].map((text, index) => (
        <ListItem
          key={text}
          disablePadding
          component={Link}
          href={index % 2 === 0 ? "/dashboard" : "/posts"}
        >
          <ListItemButton>
            <ListItemIcon>
              {index % 2 === 0 ? (
                <HouseIcon sx={{ fill: "white" }} />
              ) : (
                <EditNoteIcon sx={{ fill: "white" }} />
              )}
            </ListItemIcon>
            <ListItemText primary={text} sx={{ color: "white" }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{
          width: drawerOpen ? `calc(100% - ${drawerWidth}px)` : "100%",
          ml: drawerOpen ? `${drawerWidth}px` : 0,
          transition: "all 0.3s ease",
          bgcolor: "background.default",
        }}
      >
        <Toolbar>
          <IconButton edge="start" onClick={toggleDrawer} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="persistent"
        open={drawerOpen}
        sx={{
          width: drawerOpen ? drawerWidth : 0,
          flexShrink: 0,
          whiteSpace: "nowrap",
          transition: "width 0.3s ease",
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "primary.main",
            transition: "width 0.3s ease",
            overflowX: "hidden",
          },
        }}
      >
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box onClick={toggleDrawer}>
            <Card
              sx={{
                margin: "20px",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                padding: "0",
              }}
              variant="outlined"
            >
              <Image
                src="/1x1.jpeg"
                width={100}
                height={100}
                alt="Picture of the author"
                className={styles["image"]}
              />
              <h3>Kirby Rivera</h3>
              <h4 className={styles["head-6"]}>admin</h4>
            </Card>
            {DrawerList}
          </Box>

          <Button
            variant="text"
            sx={{
              color: "white",
              width: "100%",
              marginBottom: "20px",
            }}
            startIcon={<LogoutIcon />}
            onClick={logout}
          >
            Logout
          </Button>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          mt: 8,
          ml: drawerOpen ? `${drawerWidth}px` : 0,
          transition: "margin 0.3s ease",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
