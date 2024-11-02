import Container from "./Container";

const Logos = () => {
  return (
    <>
      <div className="bg-gray-800 w-full p-4">
        <Container className="container mx-auto flex justify-center items-center max-w-[1216px]">
          <a href="/">
          <div className="flex items-center">
            <img src="/images/logo-bolsa-click.svg" width="150" alt="Bolsa Click Logo" />
            <div className="border-l border-gray-300 h-10 mx-4"></div>
            <img src="/images/logo-anhanguera.svg" width="150" alt="Anhanguera Logo" />
          </div>
          </a>
        </Container>
      </div>
    </>
  );
}

export default Logos;