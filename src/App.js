import {
  Box,
  CssBaseline,
  Container,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import ReportList from "./components/ReportList.tsx";
import NewReportButton from "./components/NewReportButton.tsx";
import SearchBar from "./components/SearchBar.tsx";
import useLocalStorage from "./hooks/useLocalStorage.ts";

function App() {
  useLocalStorage();
  return (
    <div className="App">
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SETVI Technical Task - Robert Varga
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <SearchBar onSearch={(query) => console.log("Search:", query)} />
          <NewReportButton />
        </Box>
        <ReportList />
      </Container>
    </div>
  );
}

export default App;
