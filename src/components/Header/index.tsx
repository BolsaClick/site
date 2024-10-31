import Form from "./Form";

export const Header = () => {
  return (
    <>

      <div className="w-full bg-gray-800 p-4 flex justify-center items-center border-b ">
      
          <div className="flex  items-center ">
            <img src="/images/logo-bolsa-click.svg" width='150' />
            <div className="border-l border-gray-300 h-10 mx-4"></div>
            <img src="/images/logo-anhanguera.svg" width='150' />
          </div>
        
      </div>
      <div className="w-full flex  bg-white justify-center items-center  ">
        <div className="max-w-[1416px]  w-full pt-2 px-6">


          <div className="flex flex-col 	 lg:flex-row lg:justify-between items-center mt-10">
            <div className="lg:w-1/2 w-full">
              <h1 className="text-[#172554] text-2xl font-bold">ja pensou em transformar<span className="text-anhanguera-500"> seu futuro acadêmico</span> com apenas um clique?

              </h1>
              <p className="mt-2 font-light"> Na <span className="text-[#172554] font-bold">Bolsa Click </span>oferecemos até <span className="text-anhanguera-500 font-bold">80% de desconto </span> para você estudar na <span className="text-anhanguera-500 font-bold">Anhanguera</span>  e em instituições parceiras, com mais de 500 cursos disponíveis. <span className="text-anhanguera-500 font-bold"> Aproveite essa oportunidade!</span></p>
              <Form />
            </div>
            <div className=" w-full flex justify-end h-full">
              <img src="/images/persona-anhanguera.png" />
            </div>
          </div>
        </div>
      </div></>
  );
}

export default Header;