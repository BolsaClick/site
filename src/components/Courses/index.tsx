import Card from "./Card";

const courses = [
  {
    name: "Pedagogia",
    subtitle: "Licenciatura",
    price: "R$ 99,00",
  },
  {
    name: "Análise e Desenvolvimento de Sistemas",
    subtitle: "Tecnólogo",
    price: "R$ 99,00",
  },
  {
    name: "Gestão de Recursos Humanos",
    subtitle: "Tecnólogo",
    price: "R$ 99,00",
  },
  {
    name: "Marketing Digital",
    subtitle: "Tecnólogo",
    price: "R$ 99,00",
  },
  {
    name: "Ciências Contábeis",
    subtitle: "Bacharelado",
    price: "R$ 99,00",
  },
  {
    name: "Educação Especial",
    subtitle: "Licenciatura",
    price: "R$ 99,00",
  },
  {
    name: "Administração",
    subtitle: "Bacharelado",
    price: "R$ 99,00",
  },
  {
    name: "Educação Física",
    subtitle: "Licenciatura",
    price: "R$ 99,00",
  },
  {
    name: "Enfermagem",
    subtitle: "Bacharelado",
    price: "R$ 99,00",
  },
  {
    name: "Logística",
    subtitle: "Tecnólogo",
    price: "R$ 99,00",
  },
  {
    name: "Agronegócios",
    subtitle: "Tecnólogo",
    price: "R$ 99,00",
  },
  {
    name: "Investigação em Perícia Criminal",
    subtitle: "Tecnólogo",
    price: "R$ 99,00",
  },
  {
    name: "Farmácia",
    subtitle: "Bacharelado",
    price: "R$ 99,00",
  },
  {
    name: "Nutrição",
    subtitle: "Bacharelado",
    price: "R$ 99,00",
  },
  {
    name: "Fisioterapia",
    subtitle: "Bacharelado",
    price: "R$ 99,00",
  },
];

export const Courses = () => {
  return (
    <>
      <div className="bg-zinc-50 w-full flex pb-20 px-6 justify-center">
        <div className="w-full max-w-[1416px] mt-20 flex flex-col items-center">
          <div className="w-full flex justify-center  py-4">
            <h1 className="text-4xl font-bold">
              Veja os <span className="text-anhanguera-500">cursos</span> disponíveis
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {courses.map((course, index) => (
              <Card 
                key={index} 
                title={course.name} 
                subtitle={course.subtitle} 
                price={course.price} 
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Courses;
