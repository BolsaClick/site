import { ArrowCircleRight, WhatsappLogo } from "phosphor-react";
import { Link, useLocation } from "react-router-dom";

const SuccessPage = () => {
  const location = useLocation();
  const { offerData, studentData } = location.state || {};


  console.log(studentData)
  const formatCurrency = (value: any) => {
    const valueWith99 = Math.floor(value) + 0.99;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valueWith99);
  };
  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100">
      <div className="max-w-2xl w-full p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-4">Cadastro Realizado com Sucesso!</h1>

        <h2 className="text-xl font-bold mb-2">Dados do Aluno</h2>
        <p><strong>Nome:</strong> {studentData.dadosPessoais.nome}</p>
        <p><strong>Email:</strong> {studentData.dadosPessoais.email}</p>
        <p><strong>Telefone:</strong> {studentData.dadosPessoais.celular}</p>
        <p><strong>Curso:</strong> {offerData.course}</p>
        <p><strong>Faculdade:</strong> {offerData.brand}</p>
        <p><strong>Modalidade:</strong> {offerData.modality}</p>
        <p><strong>Valor Bolsa Click:</strong> {formatCurrency(offerData.montlyFeeTo)}</p>
        {/* Adicione mais informações conforme necessário */}

        <div className="mt-8 p-4 border justify-center flex flex-col items-center rounded-lg shadow-md bg-white">
      <h2 className="text-lg font-semibold text-blue-600">Atenção para os próximos passos!</h2>
      <p className="mt-2 text-gray-700">
        Acompanhe sua inscrição
        <br />
        Acesse o site da Anhanguera para acompanhar a sua inscrição e ir para os próximos passos da sua matrícula.
      </p>
      <Link to="https://www.anhanguera.com/area-do-candidato/login" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Acompanhar minha inscrição
      </Link>

      <h3 className="mt-6 text-lg font-semibold text-red-600">Atenção!</h3>
      <p className="mt-2 text-gray-700">
        Caso você não receba o contato da instituição ou queira entrar em contato com eles, você tem essas opções:
      </p>
      <ul className="mt-2  flex gap-2  flex-col list-inside text-gray-700">
        <li className="flex items-center w-full  gap-2">
        <ArrowCircleRight size={20} /> <Link to={import.meta.env.LINK_WHATSAPP} className="flex items-center gap-2 border border-[#25D366] hover:border-white p-2 rounded-full text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all "><WhatsappLogo size={20} />WhatsApp</Link>
        </li>
        <li className="flex items-center gap-2">
        <ArrowCircleRight size={20} /> <strong>Email:</strong> <a href="mailto:atendimento@vaidebolsa.com.br" className="text-blue-600 hover:underline">atendimento@bolsaclick.com.br</a>
        </li>
      </ul>
    </div>
      </div>

      
    </div>
  );
};

export default SuccessPage;
