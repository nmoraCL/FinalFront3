import { useState } from "react";
import "./form.css";

const Form = () => {
  const [leadData, setLeadData] = useState({
    name: { value: "", isValid: null },
    email: { value: "", isValid: null },
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const validateName = (name) => {
    return name.length > 5 && name.trim() !== "";
  };

  const validateEmail = (email) => {
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(email);
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    setLeadData({
      ...leadData,
      name: { value: name, isValid: validateName(name) },
    });
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setLeadData({
      ...leadData,
      email: { value: email, isValid: validateEmail(email) },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (leadData.name.isValid && leadData.email.isValid) {
      setShowSuccess(true);
      console.log(
        `LEAD RECIBIDO:\nNombre: ${leadData.name.value}\nEmail: ${leadData.email.value}`
      );
    } else {
      console.log("Hay errores en el formulario");
    }
  };

  return (
    <div className="contactForm">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre completo"
          value={leadData.name.value}
          onChange={handleNameChange}
        />
        {!leadData.name.isValid && leadData.name.isValid !== null && (
          <p className="warning">Debes ingresar un nombre mayor a 5 letras</p>
        )}

        <input
          type="text"
          name="email"
          placeholder="Tu e-mail"
          value={leadData.email.value}
          onChange={handleEmailChange}
        />
        {!leadData.email.isValid && leadData.email.isValid !== null && (
          <p className="warning">Debes ingresar un correo electrónico válido</p>
        )}

        <button
          type="submit"
          disabled={!leadData.name.isValid || !leadData.email.isValid}
        >
          Enviar
        </button>

        {showSuccess && (
          <p className="success">
            Gracias {leadData.name.value}, pronto nos pondremos en contacto!
          </p>
        )}
      </form>
    </div>
  );
};

export default Form;
