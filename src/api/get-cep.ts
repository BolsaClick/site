import { cogna } from "../lib/axios";



export async function getCep(cep: string) {
  const response = await cogna.get(`user/cep?search=${cep}`);
  return response.data; 
}