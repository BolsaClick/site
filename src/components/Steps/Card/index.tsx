import { ReactNode } from 'react';

interface CardProps {
  title: ReactNode; // Mudando o tipo para ReactNode para aceitar ícones
  subtitle: string;
}

const Card = ({ title, subtitle }: CardProps) => {
  return (
    <div className="overflow-hidden transition-all duration-200 bg-white border border-gray-200 rounded-lg shadow-lg flex flex-col p-4">
      <div className="flex items-center">
        {title} {/* Mostra o ícone aqui */}
      </div>
      <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
    </div>
  );
};

export default Card;
