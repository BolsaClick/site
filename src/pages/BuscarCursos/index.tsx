import { useLocation, useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import { useQuery } from "@tanstack/react-query";
import { getCourseFilter } from "../../api/get-courses-filter";
import Skeleton from "react-loading-skeleton";

const BuscarCursos = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const searchData = location.state || JSON.parse(sessionStorage.getItem("searchData") || '{}');
  const { city, course, modality } = searchData || {};


  
  const { data: responseCity, isLoading, isError } = useQuery({
    queryKey: ['courses', city?.label, city?.value, course?.value, course?.label, modality],
    queryFn: () => getCourseFilter(city.label, city.value, course.value, course.label, modality),
    enabled: !!city?.label && !!city?.value && !!course?.value && !!modality,
  });
console.log(course.label, 'aqui o course')
  const courses = responseCity?.data || [];

  const handleSelectCourse = (courseItem: any) => {
    navigate('/checkout/cadastrar-aluno', {
      state: {
        courseId: courseItem.courseId,
        courseName: course.label,
        unitId: courseItem.unitId        ,
        city: courseItem.unitCity,
        state: courseItem.unitState,
        price: courseItem.montlyFeeToMin,
        unity: courseItem.unitDistrict,
        modality: courseItem.modality
      }
    });
  };

  const formatCurrency = (value: any) => {
    if (value === undefined || value === null || isNaN(value)) {
      return "R$ 0,00"; // Valor padrão se o valor for inválido
    }
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
            Veja os cursos de <span className="text-anhanguera-500">{course?.label || "Selecionado"}</span> disponíveis
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {isLoading ? (
            Array.from({ length: 9 }).map((_, index) => (
              <div key={index} className="transition-all duration-200 bg-white border border-gray-200 w-full rounded-lg flex flex-col">
                <div className="flex justify-between px-5">
                  <div className="py-4 flex flex-col flex-1 justify-between">
                    <div>
                      <p className="text-lg font-bold text-gray-900"><Skeleton height={20} width={300} /></p>
                      <div className='flex flex-col'>
                        <p className="text-sm text-gray-500"><Skeleton height={20} width={100} /></p>
                        <p className="text-sm text-gray-500"><Skeleton height={20} width={100} /></p>
                      </div>
                      <div>
                        <Skeleton height={20} width={120} />
                      </div>
                      <p className="text-base mt-2"><Skeleton height={20} width={100} /></p>
                      <p className="mt-0 text-2xl font-bold text-red-500"><Skeleton height={30} width={120} /></p>
                    </div>
                  </div>
                  <div className="flex justify-center items-end pb-4">
                    <Skeleton height={50} width={50} />
                  </div>
                </div>
                <div className='w-full p-4 flex justify-center items-center'>
                  <div><Skeleton height={40} width={350} /></div>
                </div>
              </div>
            ))
          ) : isError ? (
            <div>Erro ao carregar cursos. Tente novamente mais tarde.</div>
          ) : courses.length > 0 ? (
            courses.map((courseItem) => (
              <Card

                key={courseItem.unitId}
                title={course.label}
                subtitle={courseItem.brand || "Instituição"}
                price={formatCurrency(courseItem.montlyFeeToMin)}
                address={courseItem.unitAddress}
                unitName={courseItem.unitDistrict}
                city={courseItem.unitCity}
                state={courseItem.unitState}
                unitNumber={courseItem.unitNumber}
                onSelect={() => handleSelectCourse(courseItem)}
              />
            ))
          ) : (
            <div className="flex items-centr justify-center">Nenhum curso encontrado, tente novamente.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuscarCursos;
