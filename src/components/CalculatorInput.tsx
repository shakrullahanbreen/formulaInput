import React, { SyntheticEvent, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

interface FormulaInput {
  title: string;
  valueType: string;
  subtitle: string;
}

const initialFormulaInputs: FormulaInput[] = [
  { title: "Bonus Payout Month", valueType: "number", subtitle: "xyz" },
  { title: "Payment Processing Fees", valueType: "calculation", subtitle: "" },
  { title: "Payout Bonus G&A", valueType: "currency", subtitle: "xyz" },
  { title: "Payout Bonus COGS", valueType: "currency", subtitle: "xyz" },
  { title: "Payout Bonus R&D", valueType: "currency", subtitle: "" },
  { title: "Payout Bonus S&M", valueType: "currency", subtitle: "" },
  { title: "Payroll Tax", valueType: "percentage", subtitle: "xyz" },
  { title: "Company HeadCount", valueType: "calculation", subtitle: "xyz" },
  { title: "SUM", valueType: "operator", subtitle: "xyz" },
  { title: "SUBTRACT", valueType: "operator", subtitle: "xyz" },
  { title: "DIVIDE", valueType: "operator", subtitle: "xyz" },
  { title: "MULTIPLY", valueType: "operator", subtitle: "xyz" },
];

const MyComponent = () => {
  const [formulaInputs, setFormulaInputs] =
    useState<FormulaInput[]>(initialFormulaInputs);
  const [userFormula, setUserFormula] = useState<FormulaInput[]>();

  function handleOnChange(
    event: SyntheticEvent<Element, Event>,
    newValue: (string | FormulaInput)[]
  ) {
    if (newValue && newValue.length > 0) {
      const lastOption = newValue[newValue.length - 1];
      console.log(lastOption, "newValue, lastOption");

      if (typeof lastOption === "string") {
        // // Handle manual input here

        if (userFormula?.length != 0) {
          setUserFormula((prevInputs) => [
            ...(prevInputs ?? []),
            {
              title: lastOption,
              valueType: "manual",
              subtitle: "Custom value",
            },
          ]);
        } else {
          setFormulaInputs(() => [
            {
              title: lastOption,
              valueType: "manual",
              subtitle: "Custom value",
            },
          ]);
        }
      } else if (lastOption && "title" in lastOption) {
        // // Handle object selected here
        if (userFormula?.length != 0) {
          //@ts-ignore
          setUserFormula((prevInputs: FormulaInput[]) => [
            ...(prevInputs ?? []),
            {
              title: lastOption.title,
              valueType: lastOption.valueType,
              subtitle: lastOption.subtitle,
            },
          ]);
        } else {
          setFormulaInputs({
            //@ts-ignore
            title: lastOption.title,
            valueType: lastOption.valueType,
            subtitle: lastOption.subtitle,
          });
        }
      }
    }
  }
  console.log(userFormula, "userFormula ");
  return (
    <Autocomplete
      sx={{
        width: "50%",
      }}
      multiple
      freeSolo
      id="tags-standard"
      options={formulaInputs}
      getOptionLabel={(option: FormulaInput | string) =>
        typeof option === "string" ? option : option.title
      }
      renderInput={(params) => (
        <TextField {...params} variant="standard" label="Formula Input" />
      )}
      renderOption={(props, option: FormulaInput) => (
        <li {...props} style={{ display: "flex", flexDirection: "column" }}>
          <Box
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{option.title}</span>
            <span>{option.valueType}</span>
          </Box>
          {/* <span style={{ fontSize: "0.8rem", color: "#888", margin: 0 }}>
            {option.subtitle}
          </span> */}
        </li>
      )}
      onChange={handleOnChange}
    />
  );
};

export default MyComponent;
