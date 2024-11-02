import { cogna } from "../lib/axios";

export interface CourseData {
  data: {
    shifts: Record<string, Shift>;
  };
}

interface Shift {
  [key: string]: CourseOffer;
}

interface CourseOffer {
  offerId: string;
  offerBusinessKey: string;
  shift: string;
  subscriptionValue: number;
  montlyFeeFrom: number;
  montlyFeeTo: number;
  expiredAt: string;
  weekday: string;
  classTimeStart: string;
  classTimeEnd: string;
  brand: string;
  course: string;
  courseId: string;
  unit: string;
  unitId: string;
  unitAddress: string;
  unitCity: string;
  unitState: string;
  modality: string;
  financialBusinessOffer: FinancialBusinessOffer;
  lateEnrollment: LateEnrollment;
}

interface FinancialBusinessOffer {
  baseValue: number;
  netValue: number;
  installments: Installment[];
}

interface LateEnrollment {
  baseValue: number;
  netValue: number;
  installments: Installment[];
  lateEnrollmentPaymentPlan: LateEnrollmentPaymentPlan;
}

interface Installment {
  installment: string;
  netValue: number;
  ponctualityDiscountNetValue: number;
}

interface LateEnrollmentPaymentPlan {
  description: string;
  installmentCount: number;
  amount: number;
}

export async function getCourseOffer( city: string, state: string, courseId: string, courseName: string, unitId: string) {
  const response = await cogna.get<CourseData>(`offers/v3/showShiftOffers?brand=ANHANGUERA&modality=A+dist%C3%A2ncia&courseId=${courseId}&courseName=${courseName}&unitId=${unitId}&city=${city}&state=${state}&app=DC`);
  return response.data; 
}
