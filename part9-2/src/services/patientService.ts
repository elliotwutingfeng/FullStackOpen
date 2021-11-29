/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patientsData from "../../data/patients";
import { Patient, ViewPatient, NewPatient } from "../types";
import { v1 as uuid } from "uuid";

const getEntries = (): ViewPatient[] => {
  return patientsData.map((patient: Patient) => {
    const {
      ssn: [,],
      ...patientWithoutSSN
    } = patient;

    return patientWithoutSSN;
  });
};

const getEntry = (id: string): ViewPatient => {
  const patient = patientsData.find((patient: Patient) => patient.id === id);
  if (patient === undefined) {
    throw new Error("No such patient");
  }

  return patient;
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
  getEntry,
  addEntry,
};
