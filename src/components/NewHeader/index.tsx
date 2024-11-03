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
import { RadioButton } from "primereact/radiobutton";

const formSchema = z.object({
  city: z.object({
    value: z.string(),
    label: z.string(),
  }).nullable().optional(),
  course: z.object({
    value: z.string(),
    label: z.string(),
  }).nullable().optional(),
  modality: z.enum(["A distância", "Presencial"]).optional(),
});

type FormSchema = z.infer<typeof formSchema>;

const Header = () => {
  const navigate = useNavigate();

  const { data: response } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourse,
  });

  const courses = response?.data || [];
  const courseOptions = courses.map((course) => ({
    value: course.courseId,
    label: course.course,
  }));

  const { handleSubmit, control } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const [searchCity, setSearchCity] = useState("");

  const { data: responseCity } = useQuery({
    queryKey: ["cities", searchCity],
    queryFn: () => getCities(searchCity),
    enabled: !!searchCity,
  });

  const cityOptions =
    (responseCity?.data || []).map((city) => ({
      value: city.state,
      label: `${city.city}`,
    }));

    const onSubmit = (data: any) => {
      const cityValue = data.city;
    
      sessionStorage.setItem("searchData", JSON.stringify({
        city: cityValue,
        course: data.course,
        modality: data.modality
      }));
    
      navigate("/buscar-cursos");
    };


  const handleCityChange = debounce((value) => {
    setSearchCity(value);
  }, 300);

  return (
    <>
      <div className="w-full lg:p-10 pt-10 lg:pt-0 bg-zinc-100">
        <Container className="flex flex-col lg:flex-row">
          <div className="w-full pt-2 flex justify-center items-center  flex-col">
            <h1 className="text-[#172554] text-xl  w-full lg:text-2xl  font-bold">
              Já pensou em transformar <span className="text-anhanguera-500"> seu futuro acadêmico</span> com apenas um clique?
            </h1>
            <p className="mt-2 font-light text-zinc-400 text-base">
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
            <form onSubmit={handleSubmit(onSubmit)} className="pt-4 w-full flex flex-col gap-6 items-start">
              <div className="flex items-center w-full flex-col lg:flex-row gap-4">
                <Controller
                  name="modality"
                  control={control}
                  render={({ field }) => (
                    <>
                      <div className="flex items-center gap-2">
                        <RadioButton
                          inputId="A distância"
                          value="A distância"
                          onChange={(e) => field.onChange(e.value)}
                          checked={field.value === "A distância"}
                          className="ring-2 ring-zinc-500 rounded-full"
                        />
                        <label htmlFor="ead" className="mr-4">EAD</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioButton
                          inputId="presencial"
                          value="Presencial"
                          onChange={(e) => field.onChange(e.value)}
                          checked={field.value === "Presencial"}
                          className="ring-2 ring-zinc-500 rounded-full"
                        />
                        <label htmlFor="presencial">Presencial</label>
                      </div>
                    </>
                  )}
                />
              </div>

              <Controller
                name="course"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={courseOptions}
                    onChange={(selected) => field.onChange(selected)}
                    placeholder="Selecione um curso..."
                    isClearable
                    isSearchable
                    className="w-full"
                    noOptionsMessage={() => "Digite para encontrar um curso"}
                    styles={{
                      control: (base) => ({
                        ...base,
                        minHeight: "50px",
                        width: "100%",
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
                    onInputChange={(inputValue) => handleCityChange(inputValue)}
                    onChange={(selected) => field.onChange(selected)}
                    placeholder="Digite uma cidade..."
                    isClearable
                    isSearchable
                    className="w-full"
                    styles={{
                      control: (base) => ({
                        ...base,
                        minHeight: "50px",
                        width: "100%",
                      }),
                    }}
                    noOptionsMessage={() => "Digite para encontrar uma cidade"}
                  />
                )}
              />

         <div className="w-full flex items-center justify-center">
         <button className="px-6 p-2 rounded-lg bg-custom-500 text-zinc-100" type="submit">
                Buscar
              </button>
         </div>
            </form>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
