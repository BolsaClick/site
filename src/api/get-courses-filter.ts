import { cogna } from "../lib/axios";

interface Course {
  courseName: string ;
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

export async function getCourseFilter( city: string, state: string, courseId: string, courseName: string, modality: string) {
  const response = await cogna.get<GetCourseResponse>(`offers/v3/showCaseFilter?brand=anhanguera&modality=${modality}&city=${city}&state=${state}&course=${courseId}&courseName=${courseName}&app=DC&size=8`);
  return response.data; 
}
