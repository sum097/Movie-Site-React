import HomePage from "./pages/HomePage";
import Sidebar from "./components/ui/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Movies from "./pages/Movies";
import SelectedMovie from "./pages/SelectedMovie";

function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:imdbID" element={<SelectedMovie />} />
      </Routes>
    </Router>
  );
}

export default App;
