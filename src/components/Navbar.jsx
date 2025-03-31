import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();

  const removeFavorite = (id, category) => {
    dispatch({ type: "remove_favorite", payload: { id, category } });
  };

  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container-fluid">
     
        <Link className="navbar-brand" to="/">
          <img
            src="https://cdn.freebiesupply.com/logos/large/2x/star-wars-logo-png-transparent.png" 
            alt="Star Wars Logo"
            style={{ width: "70px", height: "70px" }}
          />
        </Link>

       
        <div className="dropdown">
          <button
            className="btn btn-warning dropdown-toggle"
            type="button"
            id="favoritesDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Favorites <span className="badge bg-secondary">{store.favorites.length}</span>
          </button>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="favoritesDropdown">
            
            {store.favorites.length > 0 ? (
              <>
                
                <li>
                  <span className="dropdown-header">Characters</span>
                  {store.favorites
                    .filter((item) => item.category === "characters")
                    .map((fav) => (
                      <li key={fav.id} className="d-flex align-items-center justify-content-between">
                        <Link className="dropdown-item" to={`/details/characters/${fav.id}`}>
                          {fav.name}
                        </Link>
                        <button
                          className="btn btn-outline-danger btn-sm ms-2"
                          onClick={() => removeFavorite(fav.id, "characters")}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </li>
                    ))}
                </li>
                <li><hr className="dropdown-divider" /></li>
                
                <li>
                  <span className="dropdown-header">Planets</span>
                  {store.favorites
                    .filter((item) => item.category === "planets")
                    .map((fav) => (
                      <li key={fav.id} className="d-flex align-items-center justify-content-between">
                        <Link className="dropdown-item" to={`/details/planets/${fav.id}`}>
                          {fav.name}
                        </Link>
                        <button
                          className="btn btn-outline-danger btn-sm ms-2"
                          onClick={() => removeFavorite(fav.id, "planets")}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </li>
                    ))}
                </li>
                <li><hr className="dropdown-divider" /></li>
              
                <li>
                  <span className="dropdown-header">Starships</span>
                  {store.favorites
                    .filter((item) => item.category === "starships")
                    .map((fav) => (
                      <li key={fav.id} className="d-flex align-items-center justify-content-between">
                        <Link className="dropdown-item" to={`/details/starships/${fav.id}`}>
                          {fav.name}
                        </Link>
                        <button
                          className="btn btn-outline-danger btn-sm ms-2"
                          onClick={() => removeFavorite(fav.id, "starships")}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </li>
                    ))}
                </li>
              </>
            ) : (
              <li>
                <span className="dropdown-item text-muted">No favorites yet</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;