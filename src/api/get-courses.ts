import axios from "axios";

interface Course {
  course: string;
  courseId: string;
}

interface GetCourseResponse {
  data: Course[]; 
}

export async function getCourse() {
  const response = await axios.get<GetCourseResponse>('https://api.consultoriaeducacao.app.br/offers/v3/showCourses?type=undergraduate&brand=anhanguera&app=DC&partnerBrand=anhanguera');
  return response.data; 
}
