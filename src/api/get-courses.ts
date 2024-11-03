import { cogna } from "../lib/axios";

interface Course {
  course: string;
  courseId: string;
}

interface GetCourseResponse {
  data: Course[]; 
}

export async function getCourse() {
  const response = await cogna.get<GetCourseResponse>('offers/v3/showCourses?type=undergraduate&brand=anhanguera&app=DC&partnerBrand=anhanguera');
  return response.data; 
}
