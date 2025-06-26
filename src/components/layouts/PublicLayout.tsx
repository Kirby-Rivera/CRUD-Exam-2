import { ReactNode } from "react";
import { Box, Container, Paper, Typography } from "@mui/material";

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export default function PublicLayout(props: AuthLayoutProps) {
  const { children, title, subtitle } = props;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Container maxWidth="xs">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          {title && (
            <Typography
              variant="h5"
              component="h1"
              gutterBottom
              textAlign="center"
            >
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
              mb={3}
            >
              {subtitle}
            </Typography>
          )}
          {children}
        </Paper>
      </Container>
    </Box>
  );
}
