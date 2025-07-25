import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();
export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem('wishlist');
    return stored ? JSON.parse(stored) : [];
  });

  // persistance
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (movie) => {
    setWishlist((prev) =>
      prev.find((m) => String(m.id) === String(movie.id)) ? prev : [...prev, movie]
    );
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((m) => String(m.id) !== String(id)));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};




