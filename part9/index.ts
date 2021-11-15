import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());
app.use(
  (
    err: { status: number },
    _req: unknown,
    res: { sendStatus: (arg0: number) => void },
    next: () => void
  ) => {
    // This check makes sure this is a JSON parsing issue, but it might be
    // coming from any middleware, not just express.json():

    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
      console.error(err);
      return res.sendStatus(400); // Bad request
    }

    next();
  }
);

app.get("/hello", (_req, res) => {
  return res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if ([height, weight].some(isNaN)) {
    return res.status(404).json({
      error: "malformatted parameters",
    });
  }
  const result: object = calculateBmi(height, weight);
  return res.json(result);
});

app.post("/exercise", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const daily_exercises = req.body.daily_exercises;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const target = req.body.target;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  if ([daily_exercises, target].includes(undefined)) {
    return res.status(400).json({
      error: "parameters missing",
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  } else if (daily_exercises.some(isNaN) || isNaN(target)) {
    return res.status(400).json({
      error: "malformatted parameters",
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result: object = calculateExercises(daily_exercises, target);
  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
