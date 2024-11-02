import { cogna } from "../lib/axios";

interface Course {
  unitId: string;
  unitAddress: string;
  unitCity: string;
  unitState: string;
  unitPostalCode: string;
  unitNumber: string;
  unitComplement: string;
  unitDistrict: string;
  montlyFeeToMin: number;
  classShift: string;
  academicPlan: string | null; 
  submodality: string;
  eligibleInstallment: boolean;
  brand: string;
  modality: string;
  courseId: string;
}

interface GetCourseResponse {
  data: Course[];
}

export async function getCourseFilter( city: string, state: string, courseId: string, courseName: string) {
  const response = await cogna.get<GetCourseResponse>(`offers/v3/showCaseFilter?brand=anhanguera&modality=A+dist%C3%A2ncia&city=${city}&state=${state}&course=${courseId}&courseName=${courseName}&app=DC&size=8`);
  return response.data; 
}
