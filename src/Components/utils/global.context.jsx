import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
import { dentistsReducer, favReducer, themeReducer } from "./reducers";

// Crear el contexto global
export const ContextGlobal = createContext(undefined);

// Inicializar el estado del tema
const initThemeState = () => {
  // Obtener el tema almacenado en el almacenamiento local
  const storedTheme = localStorage.getItem("theme");
  // Determinar el tema preferido basado en la preferencia del sistema operativo del usuario
  const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)")
    .matches
    ? "dark"
    : "light";
  // Establecer el tema inicial al tema almacenado o al tema preferido
  const initialTheme = storedTheme || preferredTheme;
  // Establecer el tema inicial en el almacenamiento local
  localStorage.setItem("theme", initialTheme);
  // Devolver el estado inicial del tema
  return { theme: initialTheme };
};

// Inicializar el estado de los dentistas
const initDentistsState = { dentistsList: [], dentist: {} };

// Inicializar el estado de los favoritos
const initFavState = JSON.parse(localStorage.getItem("favs")) || [];

// Componente de proveedor de contexto
export const ContextProvider = ({ children }) => {
  // Reductor de tema
  const [themeState, themeDispatch] = useReducer(
    themeReducer,
    {},
    initThemeState
  );

  // Actualizar la clase raíz del documento según el tema
  useEffect(() => {
    const root = document.documentElement;
    if (themeState.theme === "light") {
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
    }
  }, [themeState.theme]);

  // Reductor de dentistas
  const [dentistsState, dentistsDispatch] = useReducer(
    dentistsReducer,
    initDentistsState
  );

  // Obtener datos de los dentistas
  const fetchDentistsData = () => {
    axios("https://jsonplaceholder.typicode.com/users")
      .then((res) =>
        dentistsDispatch({ type: "GET_DENTISTS", payload: res.data })
      )
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchDentistsData();
  }, []);

  // Reductor de favoritos
  const [favState, favDispatch] = useReducer(favReducer, initFavState);

  // Actualizar los favoritos en el almacenamiento local
  useEffect(() => {
    localStorage.setItem("favs", JSON.stringify(favState));
  }, [favState]);

  // Proporcionar estados y funciones de despacho al contexto
  return (
    <ContextGlobal.Provider
      value={{
        dentistsState,
        dentistsDispatch,
        favState,
        favDispatch,
        themeState,
        themeDispatch,
      }}
    >
      {children}
    </ContextGlobal.Provider>
  );
};
