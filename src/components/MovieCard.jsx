import { Link } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';
import styles from "../styles/MovieCard.module.css";

function MovieCard({ movie }) {
  const { addToWishlist, wishlist } = useWishlist();
  const inWishlist = wishlist.some((m) => m.id === movie.id);

  const handleAdd = () => addToWishlist(movie);

  return (
    <div className={styles.card}>
      <Link to={`/movie/${movie.id}`}>
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            className={styles.image}
          />
        ) : (
          <div className={styles.placeholder}>No Image</div>
        )}
      </Link>

      <div className={styles.body}>
        <h3 className={styles.title}>{movie.title}</h3>
        <span className={styles.rating}>⭐ {movie.vote_average.toFixed(1)}</span>

        <div className={styles.actions}>
          <Link to={`/movie/${movie.id}`} className={styles.detailBtn}>
            Voir les détails
          </Link>

          <button
            onClick={handleAdd}
            className={styles.wishlistBtn}
            disabled={inWishlist}
          >
            {inWishlist ? '✅ Dans la wishlist' : 'Ajouter à la wishlist'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
