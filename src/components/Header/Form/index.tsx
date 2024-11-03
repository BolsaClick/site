import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCourse } from "../../../api/get-courses";
import Input from "../../Input";
import { validarCPF } from "../../../lib/cpf-validate";
import { maskCPF, maskTelefone } from "../../../lib/mask";
import { CreateStudent, createStudent } from "../../../api/post-student";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  phone: z.string()
    .max(15, "Telefone deve ter 10 dígitos"),
    
  cpf: z.string()
    .length(14, "CPF deve ter 11 dígitos") 
    .refine(val => validarCPF(val), { message: "CPF inválido" }),
  courseId: z.string().min(1, "Curso é obrigatório"),
  date: z.string().min(1, "Data é obrigatória").refine(val => !isNaN(Date.parse(val)), { message: "Data inválida" }),
});

// Tipagem do esquema
type FormSchema = z.infer<typeof formSchema>;

export const Form = () => {
  const { data: response, isLoading: isLoadingCourses } = useQuery({
    queryKey: ['courses'],
    queryFn: getCourse,
  });

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    const studentData: CreateStudent = {
      email: data.email,
      name: data.name,
      phone: data.phone,
      cpf: data.cpf,
      birthday: new Date(data.date).toISOString(),
      courseId: data.courseId, 
      whatsapp_optin: true,
    };
  
    try {
       await createStudent(studentData);
      toast.success('Cadastro realizado com sucesso!')
    } catch (error) {
      console.error("Erro ao criar estudante:", error);
      toast.error('Algum problema ocorreu para realizar seu cadastro, tente novamente mais tarde!')
    }
  };
  const courses = response?.data || [];

  const uniqueCourses = () => {
    const seen = new Set();
    return courses.filter(course => {
      const duplicate = seen.has(course.course);
      seen.add(course.course);
      return !duplicate;
    });
  };

  const handleChange = (setter: (value: string) => void, mask: (value: string) => string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = mask(event.target.value);
    setter(maskedValue);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="py-4">
      <div className="grid grid-cols-1 gap-2 mb-4">
        <div className="col-span-1">
          <Input
            type="text"
            id="name"
            placeholder="Nome"
            {...register('name')}
            className={`border border-gray-300 p-2 rounded-md w-full ${errors.name ? 'border-red-500' : ''} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.name && <span className="text-red-500">{errors.name.message}</span>}
        </div>
        <div className="col-span-1">
          <Input
            type="email"
            id="email"
            placeholder="Email"
            {...register('email')}
            className={`border border-gray-300 p-2 rounded-md w-full ${errors.email ? 'border-red-500' : ''} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        </div>
        <div className="grid grid-cols-2 gap-4 col-span-1">
          <div>
            <Input
              type="text"
              id="phone"
              maxLength={14} 
              placeholder="Whatsapp"
              {...register('phone')}
              onChange={handleChange((value) => setValue('phone', value), maskTelefone)} 
              className={`border border-gray-300 p-2 rounded-md w-full ${errors.phone ? 'border-red-500' : ''} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.phone && <span className="text-red-500">{errors.phone.message}</span>}
          </div>
          <div>
            <Input
              type="text"
              id="cpf"
              placeholder="CPF"
              maxLength={14}
              {...register('cpf')}
              onChange={handleChange((value) => setValue('cpf', value), maskCPF)} 
              className={`border border-gray-300 p-2 rounded-md w-full ${errors.cpf ? 'border-red-500' : ''} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.cpf && <span className="text-red-500">{errors.cpf.message}</span>}
          </div>
        </div>
        <div className="col-span-1">
          <Input
            type="date"
            id="date"
            {...register('date')}
            className={`border border-gray-300 p-2 rounded-md w-full ${errors.date ? 'border-red-500' : ''} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.date && <span className="text-red-500">{errors.date.message}</span>}
        </div>
        <div className="mb-4">
          <select
            id="course"
            {...register('courseId')}
            className={`border border-gray-300 p-2 rounded-md w-full ${errors.courseId ? 'border-red-500' : ''} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="">Selecione um curso</option>
            {uniqueCourses().map(course => (
              <option key={course.courseId} value={course.courseId}>
                {course.course}
              </option>
            ))}
          </select>
          {errors.courseId && <span className="text-red-500">{errors.courseId.message}</span>}
        </div>
      </div>
      <button
        type="submit"
        disabled={isLoadingCourses}
        className="bg-anhanguera-500 hover:opacity-55 text-white w-full p-2 transition-all delay-75 rounded-md"
      >
        Enviar
      </button>
    </form>
  );
};

export default Form;
