import { useEffect, useState, useRef } from 'react';
import MovieCard from '../components/MovieCard';
import {
  fetchMovies,
  searchMovies,
} from '../api/tmdb';
import styles from "../styles/MovieList.module.css" 

const CATEGORIES = [
  { label: 'Now Playing', value: 'now_playing' },
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState('popular');
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Debounce de la recherche
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(handler);
  }, [query]);

  const loadMovies = async () => {
    setLoading(true);
    try {
      const data =
        debouncedQuery.trim() !== ''
          ? await searchMovies(debouncedQuery, page)
          : await fetchMovies(category, page);

      setMovies(data.results || []);
      setTotalPages(data.total_pages || 1);
      setError('');
    } catch (err) {
      console.error(err);
      setError("Impossible de récupérer les films.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, [category, debouncedQuery, page]);

  useEffect(() => {
    setPage(1);
  }, [category, debouncedQuery]);

  return (
    <div className={styles.container}>
      
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Rechercher un film…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.search}
        />

        <div className={styles.categories}>
          {CATEGORIES.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => {
                setCategory(value);
                setQuery('');  
              }}
              className={`${styles.catBtn} ${
                category === value ? styles.active : ''
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {loading && <p>Chargement…</p>}
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.grid}>
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>

      {/* Pagination */}
      <div className={styles.pagination} style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className={styles.pageBtn}
        >
          Précédent
        </button>
        <span style={{ margin: '0 1rem' }}>
          Page {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className={styles.pageBtn}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}

export default MovieList;
