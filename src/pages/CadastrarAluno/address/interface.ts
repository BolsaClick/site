interface FinancialBusinessOffer {
  baseValue: number;
  netValue: number;
}

interface LateEnrollment {
  baseValue: number;
  netValue: number;
}

interface ShiftData {
  offerId: string;
  offerBusinessKey: string;
  shift: string;
  brand: string;
  classTimeStart: string;
  classTimeEnd: string;
  course: string;
  courseId: string;
  expiredAt: string;
  financialBusinessOffer: FinancialBusinessOffer;
  lateEnrollment: LateEnrollment;
  modality: string;
  montlyFeeFrom: number;
  montlyFeeTo: number;
  subscriptionValue: number;
  unit: string;
  unitId: string;
  unitAddress: string;
  unitCity: string;
  unitState: string;
  weekday: string;
}

export interface CourseData {
  shifts: {
    [key: string]: ShiftData;
  };
}
