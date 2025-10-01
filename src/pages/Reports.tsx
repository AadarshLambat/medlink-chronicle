import { usePatients } from "@/hooks/usePatients";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, Activity, AlertCircle, UserCheck } from "lucide-react";

export default function Reports() {
  const { patients, getStatistics } = usePatients();
  const stats = getStatistics();

  const severityCounts = {
    critical: patients.filter((p) => p.status === "active" && p.severity === "critical").length,
    high: patients.filter((p) => p.status === "active" && p.severity === "high").length,
    moderate: patients.filter((p) => p.status === "active" && p.severity === "moderate").length,
    low: patients.filter((p) => p.status === "active" && p.severity === "low").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <BarChart3 className="h-8 w-8 text-primary" />
          Reports & Analytics
        </h1>
        <p className="text-muted-foreground mt-1">Overview of hospital statistics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="h-8 w-8 text-primary" />
              <span className="text-3xl font-bold">{stats.total}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Activity className="h-8 w-8 text-success" />
              <span className="text-3xl font-bold">{stats.active}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Emergency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-8 w-8 text-destructive" />
              <span className="text-3xl font-bold">{stats.emergency}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Discharged</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <UserCheck className="h-8 w-8 text-warning" />
              <span className="text-3xl font-bold">{stats.discharged}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Severity Distribution</CardTitle>
          <CardDescription>Breakdown of patients by severity level</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-severity-critical" />
                <span className="font-medium">Critical</span>
              </div>
              <span className="text-2xl font-bold">{severityCounts.critical}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-severity-high" />
                <span className="font-medium">High</span>
              </div>
              <span className="text-2xl font-bold">{severityCounts.high}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-severity-moderate" />
                <span className="font-medium">Moderate</span>
              </div>
              <span className="text-2xl font-bold">{severityCounts.moderate}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-severity-low" />
                <span className="font-medium">Low</span>
              </div>
              <span className="text-2xl font-bold">{severityCounts.low}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
