import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import useGlobalReducer from "../hooks/useGlobalReducer";

const MainView = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async (endpoint, category) => {
      try {
        const response = await fetch(`https://www.swapi.tech/api/${endpoint}`);
        const data = await response.json();

        
        const detailedData = await Promise.all(
          data.results.map(async (item) => {
            const detailResponse = await fetch(item.url);
            const detailData = await detailResponse.json();
            return { ...detailData.result.properties, uid: item.uid, category };
          })
        );

        dispatch({
          type: "set_data",
          payload: { category, results: detailedData },
        });
      } catch (error) {
        console.error(`Error fetching ${category}:`, error);
      }
    };

    fetchData("people", "characters");
    fetchData("planets", "planets");
    fetchData("starships", "starships");
  }, [dispatch]);

  const ReadMore = (item, category) => {
    navigate(`/details/${category}/${item.uid}`);
  };

  const Favorites = (item, category) => {
    const isFavorite = store.favorites.find(
      (fav) => fav.id === item.uid && fav.category === category
    );

    if (isFavorite) {
      dispatch({ type: "remove_favorite", payload: { id: item.uid, category } });
    } else {
      dispatch({
        type: "add_favorite",
        payload: { id: item.uid, name: item.name, category },
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-4">
        
        <h2 className="text-danger mb-3">Characters</h2>
        <div className="row">
          {(store.data.characters || []).map((character) => (
            <div key={character.uid} className="col-md-4 col-lg-3 mb-4">
              <div className="card">
                <div className="card-body text-center">
                  <h5 className="card-title">{character.name}</h5>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => ReadMore(character, "characters")}
                  >
                    Read More
                  </button>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => Favorites(character, "characters")}
                  >
                    <i
                      className={
                        store.favorites.find(
                          (item) => item.id === character.uid && item.category === "characters"
                        )
                          ? "fas fa-heart text-danger"
                          : "far fa-heart"
                      }
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

       
        <h2 className="text-danger mb-3">Planets</h2>
        <div className="row">
          {(store.data.planets || []).map((planet) => (
            <div key={planet.uid} className="col-md-4 col-lg-3 mb-4">
              <div className="card">
                <div className="card-body text-center">
                  <h5 className="card-title">{planet.name}</h5>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => ReadMore(planet, "planets")}
                  >
                    Read More
                  </button>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => Favorites(planet, "planets")}
                  >
                    <i
                      className={
                        store.favorites.find(
                          (item) => item.id === planet.uid && item.category === "planets"
                        )
                          ? "fas fa-heart text-danger"
                          : "far fa-heart"
                      }
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-danger mb-3">Starships</h2>
        <div className="row">
          {(store.data.starships || []).map((starship) => (
            <div key={starship.uid} className="col-md-4 col-lg-3 mb-4">
              <div className="card">
                <div className="card-body text-center">
                  <h5 className="card-title">{starship.name}</h5>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => ReadMore(starship, "starships")}
                  >
                    Read More
                  </button>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => Favorites(starship, "starships")}
                  >
                    <i
                      className={
                        store.favorites.find(
                          (item) => item.id === starship.uid && item.category === "starships"
                        )
                          ? "fas fa-heart text-danger"
                          : "far fa-heart"
                      }
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MainView;