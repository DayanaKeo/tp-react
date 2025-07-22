import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import {
  fetchMovieDetail,
  fetchMovieCredits,
  fetchSimilarMovies,
} from '../api/tmdb';
import { useWishlist } from '../contexts/WishlistContext';
import styles from '../styles/MovieDetail.module.css';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [actors, setActors] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { wishlist, addToWishlist } = useWishlist();
  const inWishlist = wishlist.some((m) => m.id === Number(id));

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [detail, credits, similarRes] = await Promise.all([
          fetchMovieDetail(id),
          fetchMovieCredits(id),
          fetchSimilarMovies(id),
        ]);

        setMovie(detail);
        setActors((credits.cast || []).slice(0, 10));
        setSimilar(similarRes.results || []);
        setError('');
      } catch (err) {
        console.error(err);
        setError('Erreur de chargement.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <p className={styles.loading}>Chargement…</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!movie) return null;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            className={styles.poster}
          />
        )}

        <div className={styles.info}>
          <h1>{movie.title}</h1>
          <p className={styles.meta}>
            Sortie&nbsp;: {movie.release_date} • ⭐ {movie.vote_average.toFixed(1)}
          </p>
          <p className={styles.overview}>{movie.overview}</p>

          <button
            onClick={() => addToWishlist(movie)}
            className={styles.wishlistBtn}
            disabled={inWishlist}
          >
            {inWishlist ? '✅ Déjà dans la wishlist' : 'Ajouter à la wishlist'}
          </button>
        </div>
      </div>

      {/* Acteurs principaux */}
      <section className={styles.section}>
        <h2>Acteurs principaux</h2>
        <ul className={styles.actors}>
          {actors.map((actor) => (
            <li key={actor.id}>
              {actor.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                  alt={actor.name}
                />
              ) : (
                <div className={styles.actorPlaceholder}>No Img</div>
              )}
              <p>{actor.name}</p>
              <span className={styles.character}>
                ({actor.character})
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Films similaires</h2>
        <div className={styles.grid}>
          {similar.slice(0, 12).map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default MovieDetail;
