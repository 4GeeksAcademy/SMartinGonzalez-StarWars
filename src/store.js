export const initialStore = () => ({
  data: {
    characters: [],
    planets: [],
    starships: [],
  },
  favorites: [],
});


export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_data":
      return {
        ...store,
        data: {
          ...store.data,
          [action.payload.category]: action.payload.results,
        },
      };

    case "add_favorite":
      return {
        ...store,
        favorites: [...store.favorites, action.payload],
      };

    case "remove_favorite":
      return {
        ...store,
        favorites: store.favorites.filter(
          (item) =>
            item.id !== action.payload.id || item.category !== action.payload.category
        ),
      };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};