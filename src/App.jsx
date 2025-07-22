import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

import MovieList from './pages/MovieList';
import MovieDetail from './pages/MovieDetail';
import Wishlist from './pages/Wishlist';
import Navbar from "./components/NavBar";

function App() {
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </Router>
  );
}

export default App;
