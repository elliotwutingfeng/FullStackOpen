import patientsData from "../../data/patients.json";
import { Patient } from "../types";

const getEntries = (): Omit<Patient, "ssn">[] => {
  return patientsData.map((patient: Patient) => {
    const {
      ssn: [,],
      ...patientWithoutSSN
    } = patient;
    return patientWithoutSSN;
  });
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry,
};
