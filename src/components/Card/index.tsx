import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export interface CardProps {
  title?: string; 
  subtitle?: string;
  price: string;
  address?: string; // Adicionando o campo de endereço
  city?: string;    // Adicionando o campo de cidade
  state?: string;   // Adicionando o campo de estado
  unitName?: string;    // Adicionando o campo de unidade/distrito
  loading?: boolean; 
  unitNumber: string; // Adicionando o campo de unidade/distrito
  onSelect: () => void;
}

export const Card = ({ 
  title, 
  price, 
  city, 
  state, 
  unitName, 
  loading,
  unitNumber,
  address,
  onSelect
}: CardProps) => 
  
  
  {
  if (loading) {
    return (
      <div className=" bg-white border border-gray-200 w-full rounded-lg  flex flex-col">
        <div className="flex justify-between px-5">
          <div className="py-4 flex flex-col flex-1 justify-between">
            <div>
              <Skeleton height={24} width="80%" className="mb-2" />
              <Skeleton height={20} width="60%" className="mb-3" />
              <Skeleton height={30} width="30%" className="mb-2" />
              <Skeleton height={30} width="50%" className="mb-2" />
              <Skeleton height={30} width="40%" className="mb-2" />
              <Skeleton height={20} width="80%" className="mb-2" /> {/* Skeleton para o endereço */}
              <Skeleton height={20} width="60%" className="mb-2" /> {/* Skeleton para a cidade */}
              <Skeleton height={20} width="60%" className="mb-2" /> {/* Skeleton para o estado */}
              <Skeleton height={20} width="60%" className="mb-2" /> {/* Skeleton para a unidade/distrito */}
            </div>
          </div>
          <div className="flex justify-center items-end pb-4">
            <Skeleton height={64} width={100} />
          </div>
        </div>
      </div>
    );
  }
  const capitalizeFirstLetter = (text?: string) => {
    if (!text) return '';
    return text
      .toLowerCase() 
      .split(' ') 
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
      .join(' '); 
  }
  
  return (
    <div className="transition-all duration-200 bg-white border border-gray-200 w-full rounded-lg  flex flex-col">
      <div className="flex justify-between px-5">
        <div className="py-4 flex flex-col flex-1 justify-between">
          <div>
            <p className="text-lg font-bold text-gray-900">{title}</p>

            <div className='flex flex-col'>
            <p className="text-sm text-gray-500">{unitName?.toUpperCase()}</p> 
            <p className="text-sm text-gray-500">{capitalizeFirstLetter(address)}, {unitNumber} - {city}, {state}</p>
            </div>
            <p className="text-sm text-gray-500"></p> 
            
            <button className="bg-transparent text-sm text-red-500 font-semibold py-0 mt-3 px-2 border border-red-500 rounded">EAD</button>
            <p className="text-base mt-2">A partir de:</p>
            <p className="mt-0 text-2xl font-bold text-red-500">R$ {price}</p>
          
          </div>
        </div>
        <div className="flex justify-center items-end pb-4">
          <img src="https://conexaoeducacao.com.br/cogna/anhanguera2.png" alt="Logo Anhanguera" className="h-16" />
        </div>
      </div>
    <div className='w-full p-4 flex justify-center items-center'>
    <button  onClick={onSelect} className="bg-red-500 w-full text-sm text-white font-semibold py-0 -mt-3 p-3 h-10 hover:opacity-80 transition-opacity duration-200 rounded-lg">Quero esta bolsa </button>
    </div>
      <div>
      </div>
    </div>
  );
}

export default Card;
