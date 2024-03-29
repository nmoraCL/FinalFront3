import { useContext } from "react";
import { ContextGlobal } from "../Components/utils/global.context";
import Form from "../Components/Form";

const Contact = () => {
  const { theme } = useContext(ContextGlobal);

  return (
    <div className={`contactBox ${theme}`}>
      <h1>Contactate con nosotros</h1>
      <p>Deja tus datos y nos contactaremos contigo lo antes posible</p>
      <Form />
    </div>
  );
};

export default Contact;
