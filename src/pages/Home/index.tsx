import { Helmet } from "react-helmet-async";
import Header from "../../components/Header";
import Courses from "../../components/Courses";
import Steps from "../../components/Steps";
import Footer from "../../components/Footer";

export const Home = () => {
  return ( 
    <>
      <Helmet title="Faculdade Anhanguera" />
      <Header />
      <Courses />
      <Steps />
      <Footer />

      </>
   );
}
 
export default Home;