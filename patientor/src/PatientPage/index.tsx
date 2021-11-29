import React from "react";
import { Patient } from "../types";

import { setPatient, useStateValue } from "../state";
import { useParams } from "react-router";
import axios from "axios";
import { apiBaseUrl } from "../constants";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();
  React.useEffect(() => {
    const fetchPatient = async () => {
      if (patient?.id !== id) {
        try {
          const { data: patient } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(setPatient(patient));
        } catch (e) {
          console.error(e);
        }
      }
    };
    void fetchPatient();
  }, [dispatch]);

  return (
    <div className="App">
      <p>Name: {patient?.name}</p>
      <p>Gender: {patient?.gender}</p>
      <p>Occupation: {patient?.occupation}</p>
      <p>SSN: {patient?.ssn}</p>
    </div>
  );
};

export default PatientPage;
