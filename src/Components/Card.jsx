import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ContextGlobal } from "../Components/utils/global.context";
import { BsHeart, BsHeartFill } from "react-icons/bs";

const Card = ({ name, username, id }) => {
  // Contexto para gestionar favoritos
  const { favState, favDispatch } = useContext(ContextGlobal);

  // Estado para rastrear la carga de la imagen
  const [imageLoaded, setImageLoaded] = useState(false);

  // Comprobar si la tarjeta actual está en favoritos
  const isFav = favState.some((fav) => fav.id === id);

  // Manejar el clic del botón de favoritos
  const handleFavClick = (e) => {
    e.stopPropagation();
    if (isFav) {
      favDispatch({ type: "DELETE_FAV", payload: id });
    } else {
      alert('Dentista agregado a favoritos correctamente')
      favDispatch({ type: "ADD_FAV", payload: { name, username, id } });
    }
  };

  // Manejar el evento de carga de la imagen
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="card-wraper">
      {/* Enlace a la página de detalles */}
      <Link className="card" to={`/detail/${id}`}>
        {/* Mostrar esqueleto hasta que se cargue la imagen */}
        {!imageLoaded && <div className="skeleton_img"></div>}
        {/* Imagen real */}
        <img
          src="./images/doctor.jpg"
          alt="doctor"
          onLoad={handleImageLoad}
          style={{ display: imageLoaded ? "block" : "none" }}
        />
        {/* Mostrar nombre, nombre de usuario e id */}
        <p>{name}</p>
        <p>User: {username}</p>
      </Link>
      {/* Botón de favoritos */}
      <button
        onClick={handleFavClick}
        className={`favButton ${isFav ? "favorited" : ""}`}
      >
        {/* Mostrar corazón relleno si está en favoritos, corazón contorneado de lo contrario */}
        {isFav ? <BsHeartFill /> : <BsHeart />}
      </button>
    </div>
  );
};

export default Card;
