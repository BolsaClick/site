import { Helmet } from "react-helmet-async";
// import Header from "../../components/Header";
import Courses from "../../components/Courses";
import Steps from "../../components/Steps";
import NewHeader from "../../components/NewHeader";

export const Home = () => {
  return ( 
    <>
      <Helmet title="Faculdade Anhanguera" />
      <NewHeader />
      <Courses />
      <Steps />

      </>
   );
}
 
export default Home;