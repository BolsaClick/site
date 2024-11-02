import { useLocation, useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "@tanstack/react-query";
import { getCourseFilter } from "../../api/get-courses-filter";

const BuscarCursos = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { city, course } = location.state || {};

  const { data: responseCity, isLoading, error } = useQuery({
    queryKey: ['courses'],
    queryFn: () => getCourseFilter(city.label, city.value, course.value, course.label),
  });

  const courses = responseCity?.data || [];

  const handleSelectCourse = (courseItem: any) => {
    navigate('/checkout/cadastrar-aluno', {
      state: {
        courseId: courseItem.courseId,     
        courseName: courseItem.courseName,  
        UnitId: courseItem.UnitId,          
        city: courseItem.unitCity,          
        state: courseItem.unitState,
        price: courseItem.montlyFeeToMin,
        unity: courseItem.unitDistrict
      }
    });
  };
  const formatCurrency = (value: any) => {
    const valueWith99 = Math.floor(value) + 0.99;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valueWith99);
  };
  return (
    <div className="bg-zinc-50 w-full flex pb-20 px-6 justify-center">
      <div className="w-full max-w-[1416px] mt-20 flex flex-col items-center">
        <div className="w-full flex justify-center py-4">
          <h1 className="text-4xl font-bold">
            Veja os cursos de <span className="text-anhanguera-500">{course.label}</span> disponíveis
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="p-4">
                <Skeleton height={200} />
              </div>
            ))
          ) : error ? (
            <div className="text-red-500">Erro ao carregar cursos: {error.message}</div>
          ) : courses.length > 0 ? (
            courses.map((courseItem, index) => (
              <Card
                key={index}
                title={course.label}
                subtitle={courseItem.brand || "Teste"} 
                price={formatCurrency(courseItem.montlyFeeToMin)} 
                address={courseItem.unitAddress}
                unitName={courseItem.unitDistrict}
                city={courseItem.unitCity}
                state={courseItem.unitState}
                unitNumber={courseItem.unitNumber}
                onSelect={() => handleSelectCourse({
                  courseId: courseItem.courseId,
                  courseName: course.label,
                  UnitId: courseItem.unitId,
                  unitCity: courseItem.unitCity,
                  unitState: courseItem.unitState,
                  unity: courseItem.unitDistrict,
                  price: courseItem.montlyFeeToMin
                })}
              />
            ))
          ) : (
            <div>Nenhum curso encontrado.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuscarCursos;
