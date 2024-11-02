import { useForm } from "react-hook-form";
import Input from "../../../components/Input";
import { useLocation } from "react-router-dom";
import { getCourseOffer } from "../../../api/show-offers";
import { CreateStudent, createStudentCogna } from "../../../api/post-student-cogna";
import { useQuery } from "@tanstack/react-query";

// Definição da interface para os dados da oferta
interface OfferData {
  offerId: string;
  offerBusinessKey: string;
  shift: string;
  subscriptionValue: number;
  montlyFeeFrom: number;
  montlyFeeTo: number;
  expiredAt: string;
  weekday: string;
  classTimeStart: string;
  classTimeEnd: string;
  brand: string;
  course: string;
  courseId: string;
  unit: string;
  unitId: string;
  unitAddress: string;
  unitCity: string;
  unitState: string;
  modality: string;
  // Adicione outras propriedades conforme necessário...
}

const AddressPage = () => {
  const location = useLocation();
  const {
    name,
    email,
    phone,
    cpf,
    courseName,
    UnitId,
    city,
    state,
    price,
    unity,
    birthDate,
    schoolYear,
    courseId
  } = location.state || {};

  const { register, handleSubmit } = useForm();

  const { data: response } = useQuery({
    queryKey: ["offers"],
    queryFn: () => getCourseOffer(city, state, courseId, courseName, UnitId),
  });

  console.log(response);
  const offerData: OfferData = response?.data.shifts["*"]?.["Faça o seu horário de estudo"] || ({} as OfferData);
  console.log(offerData);

  const onSubmit = async (data: any) => {
    const studentData: CreateStudent = {
      dadosPessoais: {
        nome: name,
        rg: data.rg,
        sexo: data.sexo,
        cpf: cpf,
        celular: phone,
        dataNascimento: birthDate,
        email: email,
        necessidadesEspeciais: [],
        endereco: {
          bairro: data.bairro,
          cep: data.cep,
          complemento: data.complemento,
          logradouro: data.endereco,
          municipio: city,
          numero: parseInt(data.numero, 10),
          uf: state,
        },
      },
      inscricao: {
        aceiteTermo: true,
        anoConclusao: schoolYear,
        enem: { isUsed: false },
        receberEmail: true,
        receberSMS: true,
        receberWhatsApp: true,
        courseOffer: {
          offerId: offerData?.offerId || "",
          offerBusinessKey: offerData?.offerBusinessKey || "",
          shift: offerData?.shift || "",
          subscriptionValue: String(offerData?.subscriptionValue || ""),
          montlyFeeFrom: String(offerData?.montlyFeeFrom || ""),
          montlyFeeTo: String(offerData?.montlyFeeTo || ""),
          expiredAt: offerData?.expiredAt || "",
          weekday: offerData?.weekday || "",
          classTimeStart: offerData?.classTimeStart || "",
          classTimeEnd: offerData?.classTimeEnd || "",
          brand: offerData?.brand || "",
          course: offerData?.course || "",
          courseId: offerData?.courseId || "",
          unit: offerData?.unit || "",
          unitId: offerData?.unitId || "",
          unitAddress: offerData?.unitAddress || "",
          unitCity: offerData?.unitCity || "",
          unitState: offerData?.unitState || "",
          modality: offerData?.modality || "",
          viewShift: "false", // Adicione aqui
          lateEnrollment: true, // Adicione aqui
          cityId: "", 
          stateId: "",
          degree: "UNDERGRADUATE",
          promoter: import.meta.env.ID_PROMOTER,
          id: offerData?.offerId || "",
          type: "UNDERGRADUATE"
        },
      },
      promoterId: import.meta.env.ID_PROMOTER, 
      idSalesChannel: 88, 
      canal: "", 
    };
  
    console.log("Cadastro de aluno criado:", studentData);
    try {
      await createStudentCogna(studentData);
    } catch (error) {
      console.error("Erro ao criar aluno:", error);
    }
  };
  

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100">
      <div className="max-w-2xl w-full p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-4">Cadastro de Endereço</h1>

        <div className="mb-6">
          <h2 className="text-xl font-bold">Dados do Usuário</h2>
          <p><strong>Nome:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Telefone:</strong> {phone}</p>
          <p><strong>CPF:</strong> {cpf}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold">Detalhes do Curso</h2>
          <p><strong>Nome do Curso:</strong> {courseName}</p>
          <p><strong>Unidade:</strong> {unity}</p>
          <p><strong>Cidade:</strong> {city}</p>
          <p><strong>Estado:</strong> {state}</p>
          {price && (
            <p className="text-red-600">
              <strong>Preço:</strong> R$ {price.toFixed(2)}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Input
              type="text"
              id="endereco"
              placeholder="Endereço"
              {...register("endereco")}
              className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <Input
              type="text"
              id="numero"
              placeholder="Número"
              {...register("numero")}
              className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <Input
              type="text"
              id="complemento"
              placeholder="Complemento (opcional)"
              {...register("complemento")}
              className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <Input
              type="text"
              id="bairro"
              placeholder="Bairro"
              {...register("bairro")}
              className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <Input
              type="text"
              id="cep"
              placeholder="CEP"
              {...register("cep")}
              className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <Input
              type="text"
              id="cidade"
              placeholder="Cidade"
              {...register("cidade")}
              className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <Input
              type="text"
              id="estado"
              placeholder="Estado"
              {...register("estado")}
              className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddressPage;
