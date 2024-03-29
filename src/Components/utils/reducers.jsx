// Reducer para manejar el estado relacionado con los dentistas
export const dentistsReducer = (state, action) => {
  switch (action.type) {
    // Cuando se recibe la acción GET_DENTISTS, actualiza la lista de dentistas
    case "GET_DENTISTS":
      return { dentistsList: action.payload, dentist: state.dentist };
    // Cuando se recibe la acción GET_DENTIST, actualiza el dentista seleccionado
    case "GET_DENTIST":
      return { dentistsList: state.dentistsList, dentist: action.payload };
    // Si la acción no coincide con ninguna de las anteriores, lanza un error
    default:
      throw new Error();
  }
};

// Reducer para manejar el estado relacionado con los favoritos
export const favReducer = (state, action) => {
  switch (action.type) {
    // Cuando se recibe la acción ADD_FAV, agrega un dentista a la lista de favoritos
    case "ADD_FAV":
      return [...state, action.payload];
    // Cuando se recibe la acción DELETE_FAV, elimina un dentista de la lista de favoritos
    case "DELETE_FAV":
      return state.filter((fav) => fav.id !== action.payload);
    // Si la acción no coincide con ninguna de las anteriores, lanza un error
    default:
      throw new Error();
  }
};

// Reducer para manejar el estado relacionado con el tema
export const themeReducer = (state, action) => {
  switch (action.type) {
    // Cuando se recibe la acción TOGGLE_THEME, cambia el tema entre claro y oscuro
    case "TOGGLE_THEME":
      // Cambiar el tema y guardarlo en el almacenamiento local para persistencia
      const newTheme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return { ...state, theme: newTheme };
    // Si la acción no coincide con ninguna de las anteriores, devuelve el estado sin cambios
    default:
      return state;
  }
};
