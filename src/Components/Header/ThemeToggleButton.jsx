import { useContext } from "react";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { ContextGlobal } from "../utils/global.context";

// Lista de temas disponibles
const themes = ["light", "dark"];

// Componente del botón de cambio de tema
export default function ThemeToggleButton() {
  // Obtener el estado del tema y la función de despacho del contexto global
  const { themeState, themeDispatch } = useContext(ContextGlobal);

  // Función para alternar el tema
  const toggleTheme = () => {
    themeDispatch({ type: "TOGGLE_THEME" });
  };

  return (
    <div className="theme-switch">
      {/* Mapear los temas y renderizar botones para cada uno */}
      {themes.map((t) => {
        // Determinar si el tema actual está seleccionado
        const checked = t === themeState.theme;
        return (
          <button
            key={t}
            className={`${checked ? "bg-white" : ""}`}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {/* Mostrar icono de sol o luna según el tema */}
            {t === "light" ? <BsFillSunFill /> : <BsFillMoonFill />}
          </button>
        );
      })}
    </div>
  );
}
