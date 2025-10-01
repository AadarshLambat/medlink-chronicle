import { useState } from "react";
import { Patient, SeverityLevel } from "@/types/patient";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { User, Phone, MapPin, Clock, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";

interface PatientCardProps {
  patient: Patient;
  onDischarge: (id: string) => void;
}

const severityConfig: Record<SeverityLevel, { label: string; className: string }> = {
  critical: { label: "Critical", className: "bg-severity-critical text-white" },
  high: { label: "High", className: "bg-severity-high text-white" },
  moderate: { label: "Moderate", className: "bg-severity-moderate text-white" },
  low: { label: "Low", className: "bg-severity-low text-white" },
};

export function PatientCard({ patient, onDischarge }: PatientCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [showDischargeDialog, setShowDischargeDialog] = useState(false);

  const severityInfo = severityConfig[patient.severity];

  return (
    <>
      <Card className={`hover:shadow-md transition-all ${patient.isEmergency ? "ring-2 ring-destructive" : ""}`}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-foreground">{patient.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {patient.age} years • {patient.gender}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {patient.isEmergency && (
                <Badge variant="destructive" className="gap-1">
                  <AlertCircle className="h-3 w-3" />
                  Emergency
                </Badge>
              )}
              <Badge className={severityInfo.className}>{severityInfo.label}</Badge>
            </div>
          </div>

          <div className="space-y-2 mb-3">
            <div className="flex items-center gap-2 text-sm">
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground font-medium">{patient.disease}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Appointment: {patient.timeOfAppointment}</span>
            </div>
          </div>

          {expanded && (
            <div className="space-y-2 mb-3 pt-3 border-t border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{patient.phoneNumber}</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>{patient.address}</span>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="flex-1"
            >
              {expanded ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" />
                  Less
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" />
                  More
                </>
              )}
            </Button>
            {patient.status === "active" && (
              <Button
                variant="default"
                size="sm"
                onClick={() => setShowDischargeDialog(true)}
                className="flex-1"
              >
                Discharge
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showDischargeDialog} onOpenChange={setShowDischargeDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Discharge Patient</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to discharge {patient.name}? This action will mark the patient as
              discharged.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => onDischarge(patient.id)}>
              Confirm Discharge
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
