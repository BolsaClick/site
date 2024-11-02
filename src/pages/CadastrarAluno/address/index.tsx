import { useForm } from "react-hook-form";
import Input from "../../../components/Input";
import { useLocation, useNavigate } from "react-router-dom";
import { getCourseOffer } from "../../../api/show-offers";
import { createStudentCogna } from "../../../api/post-student-cogna";
import { useQuery } from "@tanstack/react-query";
import InputMask from "react-input-mask";
import { getCep } from "../../../api/get-cep";
import { toast } from "sonner";
import { OfferData } from "./interface";
import { createStudent } from "../../../api/post-student";
import Spinner from "../../../components/Loading";

// Definição da interface para os dados da oferta


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
 
    birthDate,
    schoolYear,
    courseId,
    rg,
    gender,
    password
  } = location.state || {};

  const { register, handleSubmit, setValue, formState: { isSubmitting } } = useForm();
  const navigate = useNavigate();
  const { data: response } = useQuery({
    queryKey: ["offers"],
    queryFn: () => getCourseOffer(city, state, courseId, courseName, UnitId),
  });

  const offerData: OfferData = response?.data.shifts["*"]?.["Faça o seu horário de estudo"] || ({} as OfferData);

  const onSubmit = async (data: any) => {


    const studentData = {
      dadosPessoais: {
        nome: name,
        rg: rg,
        sexo: gender,
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
          municipio: data.cidade,
          numero: parseInt(data.numero, 10),
          uf: data.estado
        }
      },
      inscricao: {
        aceiteTermo: true,
        anoConclusao: parseInt(schoolYear, 10),
        enem: {
          isUsed: false
        },
        receberEmail: true,
        receberSMS: true,
        receberWhatsApp: true,
        courseOffer: {
          offerId: offerData.offerId,
          offerBusinessKey: offerData.offerBusinessKey,
          shift: "*",
          subscriptionValue: String(offerData.subscriptionValue || "99"),
          montlyFeeFrom: String(offerData.montlyFeeFrom || "99"),
          montlyFeeTo: String(offerData.montlyFeeTo || "99"),
          expiredAt: offerData.expiredAt,
          weekday: offerData.weekday,
          classTimeStart: offerData.classTimeStart,
          classTimeEnd: offerData.classTimeEnd,
          brand: offerData.brand,
          course: offerData.course,
          courseId: offerData.courseId,
          unit: offerData.unit,
          unitId: offerData.unitId,
          unitAddress: offerData.unitAddress,
          unitCity: offerData.unitCity,
          unitState: offerData.unitState,
          modality: offerData.modality,
          viewShift: "false",
          lateEnrollment: true,
          cityId: "",
          stateId: "",
          degree: "UNDERGRADUATE",
          promoter: "${IDDOPARCEIRO}",
          id: offerData.offerId,
          type: "UNDERGRADUATE"
        }
      },
      promoterId: "6716698cb4d33b0008a18001",
      idSalesChannel: 88,
      canal: "web"
    };
    const payload: any = {
      name: name,
      email: email,
      cpf: cpf,
      phone: phone,
      birthday: birthDate,
      rg: rg,
      courseId: courseId,
      whatsapp_optin: true,
      password: password
    }
    console.log("Cadastro de aluno criado:", studentData);
    try {
      await createStudent(payload)
      await createStudentCogna(studentData);
      toast.success('Cadastro realizado com sucesso!')
      navigate('/checkout/information', { state: { offerData, studentData } });

    } catch (error) {
      console.error("Erro ao criar aluno:", error);
      console.log(error)
      // Verifica se a resposta do erro contém uma mensagem
      toast.error("Erro ao criar aluno, se o problema persistir entre em contato com nosso time");

    }
  };

  const handleCepChange = async (cep: any) => {

    try {
      const response = await getCep(cep);
      const data = response.data;
      console.log(data);

      setValue('estado', data.state);
      setValue('cidade', data.city);
      setValue('bairro', data.neighborhood || '');
      setValue('endereco', data.street);

    } catch (error) {
      console.error("Erro ao buscar o CEP:", error);

    }

  };
  const formatCurrency = (value: any) => {
    const valueWith99 = Math.floor(value) + 0.99;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valueWith99);
  };


  // const calculateDiscountPercentage = (feeFrom: any, feeTo: any) => {
  //   if (feeFrom <= 0) return 0; // Evitar divisão por zero
  //   return ((feeFrom - feeTo) / feeFrom * 100).toFixed(2);
  // };

  // Cálculo da porcentagem de desconto
  // const discountPercentage = calculateDiscountPercentage(offerData.montlyFeeFrom, offerData.montlyFeeTo);


  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100">
      <div className="max-w-2xl w-full p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-4">Cadastro de Endereço</h1>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <InputMask
              type="text"
              id="cep"
              placeholder="CEP"
              mask="99999-999"
              {...register("cep")}
              onBlur={(e) => handleCepChange(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
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
              placeholder="Número*"
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

          <div className="mb-4 hidden">
            <Input
              type="text"
              id="bairro"
              placeholder="Bairro"
              {...register("bairro")}
              className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>



          <div className="mb-4 hidden">
            <Input
              type="text"
              id="cidade"
              placeholder="Cidade"
              {...register("cidade")}
              className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4 hidden">
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
            className={`w-full py-2 rounded-md ${isSubmitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"} text-white`}
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner /> : "Cadastrar"}
          </button>
        </form>

        <div className="p-6 mt-20 bg-white rounded-lg shadow-md">
          <p className="text-xl font-bold mb-2"><strong>Faculdade:</strong><span className="text-red-500">{' '}{offerData.brand}</span> </p>
          <p className="text-lg mb-1"><strong>Curso:</strong> {offerData.course}</p>
          <p className="text-lg mb-1"><strong>Modalidade:</strong> {offerData.modality}</p>
          <p className="text-lg mb-4"><strong>Cidade:</strong> {offerData.unitCity}</p>

          <div className="mb-4">
            
            <p className="text-lg">Valor da faculdade: <strong className="text-red-500 text-lg line-through">{formatCurrency(offerData.montlyFeeFrom)}</strong></p>
            <p className="text-lg">
              Valor Bolsa Click: <span className="text-green-600 text-2xl">{formatCurrency(offerData.montlyFeeTo)}</span>
            </p>
        
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressPage;
