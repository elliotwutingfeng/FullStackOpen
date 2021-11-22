import diagnosesData from "../../data/diagnoses";
import { Diagnose } from "../types";

const getEntries = (): Array<Diagnose> => {
  return diagnosesData;
};

export default {
  getEntries,
};
