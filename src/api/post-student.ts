import { api } from '../lib/axios';

export interface CreateStudent {
  email: string;
  name: string;
  phone: string;
  cpf: string;
  birthday: string;
  courseId: string;
  whatsapp_optin: boolean;
}


export async function createStudent(studentData: CreateStudent) {
  try {
    const response = await api.post('api/client/register', studentData); 
    return response.data; 
  } catch (error) {
    console.error("Error creating student:", error);
    throw error; 
  }
}
