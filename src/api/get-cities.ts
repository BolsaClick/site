import { cogna } from "../lib/axios";

// Interface para uma cidade
interface City {
  city: string; // Nome da cidade
  state: string; // Estado

}

// Interface para a resposta da API
interface GetCitiesResponse {
  data: City[]; // Array de cidades
}

export async function getCities(city: string) {
  const response = await cogna.get<GetCitiesResponse>(`offers/v2/showLocalities?q=${city}`);
  return response.data; 
}