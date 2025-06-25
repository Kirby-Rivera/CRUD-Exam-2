// components/Layout.tsx
import { ReactNode } from "react";
import Link from "next/link";
import HouseIcon from "@mui/icons-material/House";
import EditNoteIcon from "@mui/icons-material/EditNote";
import LogoutIcon from "@mui/icons-material/Logout";
import Image from "next/image";
import {
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
import styles from './layout.module.scss'

interface LayoutProps {
  children: ReactNode;
}

const drawerWidth = 230;

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Box
          sx={{
            overflow: "auto",
            height: "100vh",
            backgroundColor: "primary.main",
            position: "relative",
          }}
        >
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
              className={styles['image']}
            />
            <h3>Kirby Rivera</h3>
            <h4 className={styles["head-6"]}>admin</h4>
          </Card>

          <List>
            <ListItem component={Link} href="/dashboard">
              <ListItemButton>
                <ListItemIcon>
                  <HouseIcon sx={{ fill: "white" }} />
                </ListItemIcon>
                <ListItemText sx={{ color: "white" }} primary="Dashboard" />
              </ListItemButton>
            </ListItem>
            <ListItem component={Link} href="/posts">
              <ListItemButton>
                <ListItemIcon>
                  <EditNoteIcon sx={{ fill: "white" }} />
                </ListItemIcon>
                <ListItemText sx={{ color: "white" }} primary="Posts" />
              </ListItemButton>
            </ListItem>
          </List>

          <Button
            variant="text"
            sx={{
              color: "white",
              width: "100%",
              position: "absolute",
              bottom: "0",
              margin: "20px 0",
            }}
            startIcon={<LogoutIcon />}
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
          ml: `${drawerWidth}px`,
        }}
      >
        {/* <Toolbar /> */}
        {children}
      </Box>
    </>
  );
}
