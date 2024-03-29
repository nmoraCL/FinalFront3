import { useContext } from "react";
import { ContextGlobal } from "../Components/utils/global.context";
import Card from "../Components/Card";
import CardSkeleton from "../Components/CardSkeleton";

const Home = () => {
  const { dentistsState, theme } = useContext(ContextGlobal);

  const renderCards = () => {
    if (dentistsState.dentistsList.length === 0) {
      return [...Array(10)].map((_, index) => <CardSkeleton key={index} />);
    } else {
      return dentistsState.dentistsList.map((dentist) => (
        <Card key={dentist.id} {...dentist} />
      ));
    }
  };

  return (
    <div className={`home-container ${theme}`}>
      <h1>Los mejores especialistas</h1>
      <p>a un solo click</p>
      <div className="card-grid">{renderCards()}</div>
    </div>
  );
};

export default Home;
