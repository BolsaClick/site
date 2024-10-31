interface CardProps {
  title: string;
  subtitle: string;
  price: string;
}

export const Card = ({title, subtitle, price}: CardProps) => {
  return ( 

    <>
    
    <div className="transition-all duration-200 bg-white border border-gray-200 w-full  rounded-lg hover:shadow-lg flex  flex-col">
              <div className="flex justify-between  px-5 ">
                <div className=" py-4 flex flex-col flex-1 justify-between ">
                  <div >
                    <p className="text-lg font-bold text-gray-900">{title}</p>
                    <p className="text-sm font-medium text-gray-500">{subtitle}</p>
                    <button className="bg-transparent text-sm text-red-500 font-semibold py-0 mt-3 px-2 border border-red-500 rounded">EAD</button>
                    <p className="text-base mt-2">A partir de:</p>
                    <p className="mt-0 text-2xl font-bold text-red-500">R$ {price}</p>
                    <p className="text-sm text-gray-500">Turnos: Faça seu horário</p>
                  </div>
                </div>
                <div className="flex justify-center items-end pb-4">
                  <img src="https://conexaoeducacao.com.br/cogna/anhanguera2.png" alt="Logo Anhanguera" className="h-16" />
                </div>
              </div>
            </div>
    </>
   );
}
 
export default Card;