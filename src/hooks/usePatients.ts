import { useState, useEffect } from "react";
import { Patient } from "@/types/patient";

// Simulate doubly linked list structure
class PatientNode {
  data: Patient;
  next: PatientNode | null;
  prev: PatientNode | null;

  constructor(patient: Patient) {
    this.data = patient;
    this.next = null;
    this.prev = null;
  }
}

class PatientLinkedList {
  head: PatientNode | null;
  tail: PatientNode | null;
  size: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  addAtHead(patient: Patient) {
    const newNode = new PatientNode(patient);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.size++;
  }

  addAtTail(patient: Patient) {
    const newNode = new PatientNode(patient);
    if (!this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  remove(patientId: string): boolean {
    let current = this.head;
    while (current) {
      if (current.data.id === patientId) {
        if (current.prev) {
          current.prev.next = current.next;
        } else {
          this.head = current.next;
        }
        if (current.next) {
          current.next.prev = current.prev;
        } else {
          this.tail = current.prev;
        }
        this.size--;
        return true;
      }
      current = current.next;
    }
    return false;
  }

  toArray(): Patient[] {
    const result: Patient[] = [];
    let current = this.head;
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }

  search(query: string, field: "name" | "disease" | "phoneNumber"): Patient[] {
    const results: Patient[] = [];
    let current = this.head;
    const lowerQuery = query.toLowerCase();

    while (current) {
      const fieldValue = current.data[field].toLowerCase();
      if (fieldValue.includes(lowerQuery)) {
        results.push(current.data);
      }
      current = current.next;
    }
    return results;
  }
}

export const usePatients = () => {
  const [patientList] = useState(() => new PatientLinkedList());
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    // Load from localStorage
    const stored = localStorage.getItem("hms-patients");
    if (stored) {
      const loadedPatients: Patient[] = JSON.parse(stored);
      loadedPatients.forEach((patient) => {
        if (patient.isEmergency) {
          patientList.addAtHead(patient);
        } else {
          patientList.addAtTail(patient);
        }
      });
      setPatients(patientList.toArray());
    }
  }, []);

  const saveToStorage = (list: PatientLinkedList) => {
    const patientsArray = list.toArray();
    localStorage.setItem("hms-patients", JSON.stringify(patientsArray));
    setPatients(patientsArray);
  };

  const addPatient = (patient: Patient) => {
    if (patient.isEmergency) {
      patientList.addAtHead(patient);
    } else {
      patientList.addAtTail(patient);
    }
    saveToStorage(patientList);
  };

  const removePatient = (patientId: string) => {
    patientList.remove(patientId);
    saveToStorage(patientList);
  };

  const dischargePatient = (patientId: string) => {
    const patientsArray = patientList.toArray();
    const patient = patientsArray.find((p) => p.id === patientId);
    if (patient) {
      patient.status = "discharged";
      saveToStorage(patientList);
    }
  };

  const searchPatients = (query: string, field: "name" | "disease" | "phoneNumber") => {
    return patientList.search(query, field);
  };

  const getStatistics = () => {
    const all = patientList.toArray();
    const active = all.filter((p) => p.status === "active");
    const discharged = all.filter((p) => p.status === "discharged");
    const emergency = active.filter((p) => p.isEmergency);

    return {
      total: all.length,
      active: active.length,
      discharged: discharged.length,
      emergency: emergency.length,
    };
  };

  return {
    patients,
    addPatient,
    removePatient,
    dischargePatient,
    searchPatients,
    getStatistics,
  };
};
