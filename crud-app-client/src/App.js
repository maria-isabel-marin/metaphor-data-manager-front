import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Button, Box, CssBaseline, Drawer, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, Container } from '@mui/material';
import { Logout, Create, FileUpload, ListAlt } from '@mui/icons-material';
import RowDataList from './components/RowDataList';
import RowDataForm from './components/RowDataForm';
import RowDataImport from './components/RowDataImport';
import Login from './components/Login';
import Register from './components/Register';

const drawerWidth = 240;

const App = () => {
  const [user, setUser] = useState(null);
  const [selectedSection, setSelectedSection] = useState('create');
  const [imported, setImported] = useState(false);

  // Verificar si el usuario ya está autenticado
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get('http://localhost:5000/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data.user);
        })
        .catch(() => {
          setUser(null);
        });
    }
  }, []);

  const handleImport = () => setImported(true);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const renderContent = () => {
    switch (selectedSection) {
      case 'create':
        return <RowDataForm />;
      case 'import':
        return <RowDataImport onImport={handleImport} />;
      case 'list':
        return <RowDataList key={imported} />;
      default:
        return <RowDataForm />;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {user ? (
        <>
          {/* Barra superior */}
          <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
            <Toolbar>
              <Typography variant="h6" noWrap component="div">
                Bienvenido, {user.username}
              </Typography>
              <Button color="inherit" onClick={handleLogout} sx={{ ml: 'auto' }}>
                <Logout /> Cerrar sesión
              </Button>
            </Toolbar>
          </AppBar>

          {/* Barra lateral de navegación */}
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
            }}
            variant="permanent"
            anchor="left"
          >
            <Toolbar />
            <List>
              <ListItem button onClick={() => setSelectedSection('create')}>
                <ListItemIcon>
                  <Create />
                </ListItemIcon>
                <ListItemText primary="Crear o Editar Datos" />
              </ListItem>
              <ListItem button onClick={() => setSelectedSection('import')}>
                <ListItemIcon>
                  <FileUpload />
                </ListItemIcon>
                <ListItemText primary="Importar Datos" />
              </ListItem>
              <ListItem button onClick={() => setSelectedSection('list')}>
                <ListItemIcon>
                  <ListAlt />
                </ListItemIcon>
                <ListItemText primary="Lista de Datos" />
              </ListItem>
            </List>
          </Drawer>

          {/* Panel principal */}
          <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
            <Toolbar />
            <Container maxWidth="lg">
              {renderContent()}
            </Container>
          </Box>
        </>
      ) : (
        <Container maxWidth="sm">
          <Typography variant="h4" gutterBottom>
            Autenticación
          </Typography>
          <Login setUser={setUser} />
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Registrarse
          </Typography>
          <Register />
        </Container>
      )}
    </Box>
  );
};

export default App;


