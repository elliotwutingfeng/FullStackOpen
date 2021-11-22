/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patientsData from "../../data/patients";
import { Patient, NewPatient } from "../types";
import { v1 as uuid } from "uuid";

const getEntries = (): Omit<Patient, "ssn">[] => {
  return patientsData.map((patient: Patient) => {
    const {
      ssn: [,],
      ...patientWithoutSSN
    } = patient;

    return patientWithoutSSN;
  });
};

const addEntry = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };

  return newPatient;
};

export default {
  getEntries,
  addEntry,
};
