import { useState } from "react";
import { usePatients } from "@/hooks/usePatients";
import { PatientCard } from "@/components/PatientCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Users } from "lucide-react";

export default function Patients() {
  const { patients, dischargePatient } = usePatients();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState<"name" | "disease" | "phoneNumber">("name");

  const activePatients = patients.filter((p) => p.status === "active");

  const filteredPatients = activePatients.filter((patient) => {
    if (!searchQuery) return true;
    const fieldValue = patient[searchField].toLowerCase();
    return fieldValue.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">All Patients</h1>
        <p className="text-muted-foreground mt-1">View and manage all active patients</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search patients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={searchField} onValueChange={(v: any) => setSearchField(v)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Search by Name</SelectItem>
            <SelectItem value="disease">Search by Disease</SelectItem>
            <SelectItem value="phoneNumber">Search by Phone</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredPatients.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-lg border border-border">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">
            {searchQuery ? "No patients found matching your search" : "No active patients"}
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredPatients.length} patient(s)
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredPatients.map((patient) => (
              <PatientCard key={patient.id} patient={patient} onDischarge={dischargePatient} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
