import { MagnifyingGlass, Clipboard, CheckCircle, GraduationCap } from 'phosphor-react';
import Card from "./Card";

const steps = [
  {
    title: "Escolha o seu curso e a cidade onde deseja estudar",
    icon: <MagnifyingGlass className="h-6 w-6 text-gray-500 mr-2" />, // Ícone de lupa
  },
  {
    title: "Faça seu cadastro em nosso site",
    icon: <Clipboard className="h-6 w-6 text-gray-500 mr-2" />, // Ícone de clipboard
  },
  {
    title: "Escolha a modalidade de bolsa que deseja",
    icon: <CheckCircle className="h-6 w-6 text-gray-500 mr-2" />, // Ícone de check
  },
  {
    title: "Comece a estudar com desconto",
    icon: <GraduationCap className="h-6 w-6 text-gray-500 mr-2" />, // Ícone de formatura
  },
];

export const Steps = () => {
  return (
    <>
      <div className="bg-white w-full mb-20 flex justify-center">
        <div className="w-full max-w-[1416px] mt-20 flex flex-col items-center">
          <div className="w-full flex justify-center py-4">
            <h1 className="text-4xl font-bold text-center">Como funciona</h1>
          </div>
          <div className="flex items-center mt-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <Card 
                  title={
                    <div className="flex items-center">
                      {step.icon} {/* Adiciona o ícone ao lado do texto */}
                      <span className="font-bold mr-2">Passo {index + 1}</span>
                    </div>
                  }
                  subtitle={step.title} 
                />
                {index < steps.length - 1 && ( // Adiciona a seta se não for o último passo
                  <div className="mx-2">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-6 w-6 text-gray-500" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Steps;
