import diagnosisData from "../../data/diagnosis";
import { Diagnosis } from "../types";

const getEntries = (): Array<Diagnosis> => {
  return diagnosisData;
};

export default {
  getEntries,
};
