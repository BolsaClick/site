import { useLocation, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { validarCPF } from "../../../lib/cpf-validate";
import Input from "../../../components/Input";
import { maskCPF, maskTelefone } from "../../../lib/mask";

// Schema de validação
const formSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  phone: z.string().max(15, "Telefone deve ter no máximo 15 caracteres"),
  cpf: z
    .string()
    .length(14, "CPF deve ter 11 dígitos")
    .refine((val) => validarCPF(val), { message: "CPF inválido" }),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  birthDate: z.string().refine((val) => /^\d{2}\/\d{2}\/\d{4}$/.test(val), { message: "Data de nascimento inválida. Formato: dd/mm/aaaa" }),
  schoolYear: z.string().max(4, "Ano deve ter no máximo 4 dígitos"),
  rg: z.string().min(1, "RG é obrigatório"), // Novo campo para RG
  gender: z.enum(["masculino", "feminino"], { errorMap: () => ({ message: "Gênero é obrigatório" }) }), // Novo campo para gênero
});

type FormSchema = z.infer<typeof formSchema>;

const PersonalInfo = () => {
  const location = useLocation();
  const { courseName, UnitId, city, state, price, unity, courseId } = location.state || {};
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormSchema) => {
    console.log("Form Data:", data);
    
    // Modificação para o payload
    const payload = {
      ...data,
      courseName,
      courseId,
      UnitId,
      city,
      state,
      price,
      unity,
      gender: data.gender === "masculino" ? "M" : "F", // Converte o gênero para M ou F
    };
    console.log("Form Data:", payload);
  
    navigate("/checkout/endereco", { state: payload });
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100">
      <div className="max-w-2xl w-full p-8 bg-white rounded-lg shadow-lg">
        <div className="mb-6 flex items-center justify-center flex-col gap-2">
          <h1 className="text-3xl font-bold text-center">Cadastro</h1>
          {courseName && (
            <span>
              As informações do cadastro serão usadas para reservar a sua vaga no curso: {courseName}
            </span>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* CPF Field */}
          <div className="mb-4">
            <Input
              type="text"
              id="cpf"
              placeholder="CPF"
              maxLength={14}
              {...register("cpf")}
              onChange={(e) => setValue("cpf", maskCPF(e.target.value))}
              className={`border border-gray-300 p-2 rounded-md w-full ${errors.cpf ? "border-red-500" : ""} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.cpf && <p className="text-red-500 text-sm">{errors.cpf.message}</p>}
          </div>

          <div className="mb-4">
            <Input
              type="text"
              id="name"
              placeholder="Nome Completo"
              {...register("name")}
              className={`border border-gray-300 p-2 rounded-md w-full ${errors.name ? "border-red-500" : ""} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div className="mb-4">
            <Input
              type="email"
              id="email"
              placeholder="Email"
              {...register("email")}
              className={`border border-gray-300 p-2 rounded-md w-full ${errors.email ? "border-red-500" : ""} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <Input
              type="text"
              id="phone"
              maxLength={14}
              placeholder="Whatsapp"
              {...register('phone')}
              onChange={(e) => setValue('phone', maskTelefone(e.target.value))}
              className={`border border-gray-300 p-2 rounded-md w-full ${errors.phone ? 'border-red-500' : ''} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <Input
              type="password"
              id="password"
              placeholder="Senha"
              {...register("password")}
              className={`border border-gray-300 p-2 rounded-md w-full ${errors.password ? "border-red-500" : ""} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Date of Birth Field */}
          <div className="mb-4">
            <Input
              type="text"
              id="birthDate"
              placeholder="Data de Nascimento (dd/mm/aaaa)"
              {...register("birthDate")}
              className={`border border-gray-300 p-2 rounded-md w-full ${errors.birthDate ? "border-red-500" : ""} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.birthDate && <p className="text-red-500 text-sm">{errors.birthDate.message}</p>}
          </div>

          {/* School Year Field */}
          <div className="mb-4">
            <Input
              type="text"
              id="schoolYear"
              placeholder="Ano de Conclusão (ex: 2023)"
              {...register("schoolYear")}
              className={`border border-gray-300 p-2 rounded-md w-full ${errors.schoolYear ? "border-red-500" : ""} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.schoolYear && <p className="text-red-500 text-sm">{errors.schoolYear.message}</p>}
          </div>

          {/* RG Field */}
          <div className="mb-4">
            <Input
              type="text"
              id="rg"
              placeholder="RG"
              {...register("rg")}
              className={`border border-gray-300 p-2 rounded-md w-full ${errors.rg ? "border-red-500" : ""} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.rg && <p className="text-red-500 text-sm">{errors.rg.message}</p>}
          </div>

          {/* Gender Field */}
          <div className="mb-4">
            <label className="block mb-2">Gênero</label>
            <select
              id="gender"
              {...register("gender")}
              className={`border border-gray-300 p-2 rounded-md w-full ${errors.gender ? "border-red-500" : ""} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="">Selecione</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md mt-4"
          >
            Cadastrar
          </button>
        </form>

        {/* Seção para mostrar dados do curso */}
        <div className="mt-8 p-4 border-t border-gray-300">
          <h2 className="text-xl font-bold">Detalhes do Curso</h2>
          <p><strong>Nome do Curso:</strong> {courseName}</p>
          <p><strong>Unidade:</strong> {unity}</p>
          <p><strong>Cidade:</strong> {city}</p>
          <p><strong>Estado:</strong> {state}</p>
          <p><strong>Preço:</strong> {price}</p>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
