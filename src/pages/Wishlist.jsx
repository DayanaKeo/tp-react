import { Link } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';
import styles from '../styles/Wishlist.module.css';

function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>Votre wishlist est vide 😊</h2>
        <Link to="/" className={styles.backLink}>
          ← Retour à la liste des films
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Ma Wishlist <span className={styles.count}>({wishlist.length})</span>
      </h1>

      <div className={styles.grid}>
        {wishlist.map((movie) => (
          <div key={movie.id} className={styles.card}>
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
              <h3 className={styles.movieTitle}>{movie.title}</h3>
              <button
              type="button"
              onClick={() => {
                console.log("Bouton supprimer cliqué pour id :", movie.id);
                removeFromWishlist(movie.id);
              }}
              className={styles.removeBtn}
            >
              Supprimer
            </button>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
