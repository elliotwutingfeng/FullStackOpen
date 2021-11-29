import React, { Fragment } from "react";
import { Patient } from "../types";

import { setPatient, useStateValue } from "../state";
import { useParams } from "react-router";
import axios from "axios";
import { apiBaseUrl } from "../constants";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient, diagnosis }, dispatch] = useStateValue();
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
      <h3>Entries</h3>
      {patient?.entries.map((content, idx) => (
        <Fragment key={idx}>
          <p>Date: {content?.date}</p>
          <p>Description: {content?.description}</p>
          <ul>
            {content?.diagnosisCodes?.map((code, idx) => (
              <li key={idx}>
                {code} {diagnosis[code]?.name}
              </li>
            ))}
          </ul>
        </Fragment>
      ))}
    </div>
  );
};

export default PatientPage;
