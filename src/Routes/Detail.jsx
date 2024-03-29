import { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ContextGlobal } from "../Components/utils/global.context";
import { BsArrowLeft } from "react-icons/bs";
import axios from "axios";

const Detail = () => {
  const { dentistsState, dentistsDispatch, theme } = useContext(ContextGlobal);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDentistData = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        dentistsDispatch({ type: "GET_DENTIST", payload: response.data });
      } catch (error) {
        console.error("Error fetching dentist data:", error);
      }
    };
    fetchDentistData();
  }, [id, dentistsDispatch]);

  const { name, email, phone, website } = dentistsState.dentist;

  return (
    <div className={`detail-container ${theme}`}>
      <button className="back-btn" onClick={() => navigate(-1)}>
        <BsArrowLeft />
      </button>
      <h1 className="detail-heading">Detalle del especilista</h1>
      <div className="card-grid">
        <div className="card" style={{ width: "260px", gap: "8px" }}>
          <img src="../images/doctor.jpg" alt="doctor" />
          <h3 style={{ margin: "0" }}>{name}</h3>
          <strong>
            <p>ID: {id}</p>
          </strong>
          <p>{email}</p>
          <p>{phone}</p>
          <p>{website}</p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
