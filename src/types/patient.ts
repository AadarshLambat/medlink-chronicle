export type SeverityLevel = "critical" | "high" | "moderate" | "low";

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  disease: string;
  address: string;
  phoneNumber: string;
  timeOfAppointment: string;
  isEmergency: boolean;
  severity: SeverityLevel;
  status: "active" | "discharged";
  admittedAt: Date;
}
