import diagnosesData from "../../data/diagnoses.json";
import { Diagnose } from "../types";

const getEntries = (): Array<Diagnose> => {
  return diagnosesData;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry,
};
