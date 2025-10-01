import { usePatients } from "@/hooks/usePatients";
import { PatientCard } from "@/components/PatientCard";
import { AlertCircle } from "lucide-react";

export default function Emergency() {
  const { patients, dischargePatient } = usePatients();

  const emergencyPatients = patients.filter(
    (p) => p.status === "active" && p.isEmergency
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <AlertCircle className="h-8 w-8 text-destructive" />
          Emergency Cases
        </h1>
        <p className="text-muted-foreground mt-1">Critical and high-priority patients</p>
      </div>

      {emergencyPatients.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-lg border border-border">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No emergency cases at the moment</p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {emergencyPatients.length} emergency patient(s)
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {emergencyPatients.map((patient) => (
              <PatientCard key={patient.id} patient={patient} onDischarge={dischargePatient} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
