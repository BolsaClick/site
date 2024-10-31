import { ReactNode } from 'react';

interface CardProps {
  title: ReactNode;
  subtitle: string;
}

const Card = ({ title, subtitle }: CardProps) => {
  return (
    <div className="overflow-hidden transition-all duration-200 bg-white border border-gray-200 rounded-lg shadow-lg flex flex-col items-center justify-center p-4 h-[200px] w-[250px]">
      <div className="flex items-center mb-2">
        {title}
      </div>
      <p className="text-sm text-gray-500 text-center">{subtitle}</p>
    </div>
  );
};

export default Card;
