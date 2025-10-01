import { usePatients } from "@/hooks/usePatients";
import { StatCard } from "@/components/StatCard";
import { PatientCard } from "@/components/PatientCard";
import { Users, Activity, UserCheck, AlertCircle } from "lucide-react";

export default function Dashboard() {
  const { patients, dischargePatient, getStatistics } = usePatients();
  const stats = getStatistics();
  
  // Get recent patients (last 5 active patients)
  const recentPatients = patients
    .filter((p) => p.status === "active")
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome to Hospital Management System</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Patients" value={stats.total} icon={Users} color="primary" />
        <StatCard title="Active Patients" value={stats.active} icon={Activity} color="success" />
        <StatCard title="Emergency Cases" value={stats.emergency} icon={AlertCircle} color="destructive" />
        <StatCard title="Discharged" value={stats.discharged} icon={UserCheck} color="warning" />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Recent Active Patients</h2>
        {recentPatients.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-lg border border-border">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No active patients at the moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {recentPatients.map((patient) => (
              <PatientCard key={patient.id} patient={patient} onDischarge={dischargePatient} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
