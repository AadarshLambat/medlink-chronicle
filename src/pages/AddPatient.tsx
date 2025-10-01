import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePatients } from "@/hooks/usePatients";
import { Patient, SeverityLevel } from "@/types/patient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { UserPlus } from "lucide-react";

export default function AddPatient() {
  const navigate = useNavigate();
  const { addPatient } = usePatients();
  const [isEmergency, setIsEmergency] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const patient: Patient = {
      id: crypto.randomUUID(),
      name: formData.get("name") as string,
      age: parseInt(formData.get("age") as string),
      gender: formData.get("gender") as "male" | "female" | "other",
      disease: formData.get("disease") as string,
      address: formData.get("address") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      timeOfAppointment: formData.get("timeOfAppointment") as string,
      isEmergency,
      severity: formData.get("severity") as SeverityLevel,
      status: "active",
      admittedAt: new Date(),
    };

    addPatient(patient);
    toast.success(`Patient ${patient.name} added successfully!`);
    navigate("/patients");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <UserPlus className="h-8 w-8 text-primary" />
          Add New Patient
        </h1>
        <p className="text-muted-foreground mt-1">Enter patient details below</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Patient Information</CardTitle>
          <CardDescription>Fill in all required fields to register a new patient</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" name="name" required placeholder="John Doe" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age *</Label>
                <Input id="age" name="age" type="number" required min="0" max="120" placeholder="25" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select name="gender" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  required
                  placeholder="+1 234 567 8900"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="disease">Disease / Condition *</Label>
              <Input id="disease" name="disease" required placeholder="e.g., Fever, Fracture" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Input id="address" name="address" required placeholder="123 Main St, City, State" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeOfAppointment">Appointment Time *</Label>
              <Input
                id="timeOfAppointment"
                name="timeOfAppointment"
                type="datetime-local"
                required
              />
            </div>

            <div className="space-y-4 p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emergency" className="text-base">Emergency Case</Label>
                  <p className="text-sm text-muted-foreground">
                    Emergency patients will be prioritized
                  </p>
                </div>
                <Switch
                  id="emergency"
                  checked={isEmergency}
                  onCheckedChange={setIsEmergency}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="severity">Severity Level *</Label>
                <Select name="severity" required defaultValue="moderate">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="flex-1">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Patient
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
