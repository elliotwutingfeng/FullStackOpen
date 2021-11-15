interface ExerciseHours {
  daily_exercise_hours: number[];
  target: number;
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

type Rating = 1 | 2 | 3;

const parseExerciseArguments = (args: Array<string>): ExerciseHours => {
  if (args.length < 4) throw new Error("Not enough arguments");
  const inputs = args.slice(2).map(Number);
  if (inputs.some(isNaN)) {
    throw new Error("Provided values were not numbers!");
  } else {
    return {
      daily_exercise_hours: inputs.slice(0, -1),
      target: inputs[inputs.length - 1],
    };
  }
};

export function calculateExercises(
  daily_exercise_hours: number[],
  target: number
): Result {
  const periodLength: number = daily_exercise_hours.length;
  const trainingDays: number = daily_exercise_hours.filter(
    (x) => x != 0
  ).length;
  const average: number =
    daily_exercise_hours.reduce((a, b) => a + b) / periodLength;
  const success: boolean = average >= target;
  const rating: Rating = !success
    ? 1 // Rating 1: If average daily hours is less than target
    : daily_exercise_hours.filter((x) => x < target).length
    ? 2 // Rating 2: If average daily hours equals or exceeds target but there are days where hours is less than target
    : 3; // Rating 3: Average daily hours equals or exceeds target and every day's hours equals or exceeds target
  const ratingDescription: string = {
    1: `You need tremendous improvement`,
    2: `You are doing well but there is still room for improvement`,
    3: `Excellent, keep it up`,
  }[rating];

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
}

try {
  const { daily_exercise_hours, target } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(daily_exercise_hours, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
