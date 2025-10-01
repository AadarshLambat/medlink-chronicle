import { usePatients } from "@/hooks/usePatients";
import { PatientCard } from "@/components/PatientCard";
import { UserCheck } from "lucide-react";

export default function Discharged() {
  const { patients, dischargePatient } = usePatients();

  const dischargedPatients = patients.filter((p) => p.status === "discharged");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <UserCheck className="h-8 w-8 text-success" />
          Discharged Patients
        </h1>
        <p className="text-muted-foreground mt-1">View all discharged patients</p>
      </div>

      {dischargedPatients.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-lg border border-border">
          <UserCheck className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No discharged patients yet</p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {dischargedPatients.length} discharged patient(s)
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {dischargedPatients.map((patient) => (
              <PatientCard key={patient.id} patient={patient} onDischarge={dischargePatient} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
