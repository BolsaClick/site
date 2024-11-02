import { Controller, useForm } from "react-hook-form";
import Container from "../Container";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCourse } from "../../api/get-courses";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import { useState } from "react";
import { getCities } from "../../api/get-cities";
import debounce from "lodash.debounce";
import { useNavigate } from "react-router-dom"; 


const formSchema = z.object({
  city: z.object({
    value: z.string(),
    label: z.string(),
  }).nullable().optional(),
  course: z.object({
    value: z.string(),
    label: z.string(),
  }).nullable().optional(),
});


type FormSchema = z.infer<typeof formSchema>;

const Header = () => {
  const navigate = useNavigate(); 




  const { data: response } = useQuery({
    queryKey: ['courses'],
    queryFn: getCourse,
  });

  const courses = response?.data || [];
  const courseOptions = courses.map(course => ({
    value: course.courseId,
    label: course.course,
  }));

  const { handleSubmit, control } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const [searchCity, setSearchCity] = useState("");


  const { data: responseCity } = useQuery({
    queryKey: ['cities', searchCity],
    queryFn: () => getCities(searchCity),
    enabled: !!searchCity,
  });
  

  const cityOptions = responseCity?.data.map(city => ({
    value: city.state,
    label: `${city.city}`,
  })) || [];

  const onSubmit = (data: FormSchema) => {
    console.log(data);
    const cityValue = data.city;
    navigate('/buscar-cursos', { state: { city: cityValue, course: data.course } });
  };

  // Função debounced para atualização de cidade
  const handleCityChange = debounce((value) => {
    setSearchCity(value);
  }, 300);

  return (
    <>

      <div className="w-full p-10 bg-zinc-100">
        <Container className="flex">
          <div className="w-full pt-2 flex justify-center items-center flex-col">
            <h1 className="text-[#172554] text-2xl font-bold">
              Já pensou em transformar <span className="text-anhanguera-500"> seu futuro acadêmico</span> com apenas um clique?
            </h1>
            <p className="mt-2 font-light text-zinc-400">
              Na <span className="text-[#172554] font-bold">Bolsa Click </span> oferecemos até <span className="text-anhanguera-500 font-bold">80% de desconto </span> para você estudar na <span className="text-anhanguera-500 font-bold">Anhanguera</span> e em instituições parceiras, com mais de 500 cursos disponíveis. <span className="text-anhanguera-500 font-bold"> Aproveite essa oportunidade!</span>
            </p>
          </div>
          <div className="w-full flex justify-end h-full">
            <img src="/images/persona-anhanguera.png" alt="Persona Anhanguera" />
          </div>
        </Container>
      </div>

      <div className="w-full bg-zinc-100 pb-20">
        <Container>
          <div className="w-full bg-white p-10 rounded-xl">
            <div className="w-full flex items-center">
              <button className="p-2.5 rounded-xl bg-zinc-900 text-zinc-100">
                Graduação
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="pt-4 w-full flex justify-between gap-6 items-center">
              <Controller
                name="course"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={courseOptions}
                    onChange={(selected) => {
                      field.onChange(selected);
                    }}
                    placeholder="Selecione um curso..."
                    isClearable
                    isSearchable
                    className="w-full"
                    noOptionsMessage={() => "Digite para encontrar um curso"} 
                    styles={{
                      control: (base) => ({
                        ...base,
                        minHeight: '50px',
                        width: '100%',
                      }),
                    }}
                  />
                )}
              />

              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={cityOptions}
                    onInputChange={(inputValue) => {
                      handleCityChange(inputValue);
                    }}
                    onChange={(selected) => {
                     
                      field.onChange({
                        value: selected?.value,
                        label: selected?.label, 
                      });
                    }}
                    placeholder="Digite uma cidade..."
                    isClearable
                    isSearchable
                    className="w-full"
                    styles={{
                      control: (base) => ({
                        ...base,
                        minHeight: '50px',
                        width: '100%',
                      }),
                    }}
                    noOptionsMessage={() => "Digite para encontrar uma cidade"} 
                  />
                )}
              />

              <button
                className="px-6 p-2 rounded-lg bg-custom-500 text-zinc-100"
                type="submit"
              >
                Buscar
              </button>
            </form>


          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
