import { Link, NavLink } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';
import styles from '../styles/Navbar.module.css';

function Navbar() {
  const { wishlist } = useWishlist();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          🎬 MovieApp
        </Link>

        <div className={styles.links}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
            end        /* pour que '/' ne reste pas actif sur les sous‑routes */
          >
            Accueil
          </NavLink>

          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Wishlist <span className={styles.badge}>{wishlist.length}</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
