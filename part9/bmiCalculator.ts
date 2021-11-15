interface HeightAndWeight {
  height: number;
  weight: number;
}

const parseBMIArguments = (args: Array<string>): HeightAndWeight => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export function calculateBmi(height: number, weight: number): object {
  const bmiValue: number = weight / (height / 100) / (height / 100);
  let bmi;
  if (bmiValue < 19) {
    bmi = "Underweight";
  } else if (bmiValue < 25) {
    bmi = "Healthy";
  } else {
    bmi = "Overweight";
  }
  console.log(bmi);
  return {
    weight,
    height,
    bmi,
  };
}

try {
  const { height, weight } = parseBMIArguments(process.argv);
  calculateBmi(height, weight);
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
