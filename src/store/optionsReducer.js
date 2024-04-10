import { act } from "react-dom/test-utils";

export const initialOption = {
  divisions: [
    {
      nameDivision: "marketing",
      color: "#F39C12",
    },
    {
      nameDivision: "operations",
      color: "#7DCEA0",
    },
    {
      nameDivision: "pricing",
      color: "#BB8FCE",
    },
    {
      nameDivision: "facilities",
      color: "#AAB7B8",
    },
    {
      nameDivision: "screencontent",
      color: "#448AFF",
    },
    {
      nameDivision: "actionpoint",
      color: "#EF5350",
    },
    {
      nameDivision: "brief",
      color: "#90A4AE",
    },
  ],
  eventType: [
    {
      type: "evento",
      color: "#F39C12",
    },
    {
      type: "matineè",
      color: "#7DCEA0",
    },
    {
      type: "prevendite",
      color: "#BB8FCE",
    },
    {
      type: "promo",
      color: "#AAB7B8",
    },
    {
      type: "compleanni",
      color: "#448AFF",
    },
    {
      type: "extra",
      color: "#EF5350",
    },
  ],
};

export const getOptions = async () => {
  if (process.env.NODE_ENV === "development") {
    console.log("sono in DEV_MODE edntro optionsreducers");
    return { ...initialOption };
  }
};

const optionsReducer = (state, action) => {
  console.log("state e action optionReducer", state, action);
  switch (action.type) {
    case value:
      break;

    default:
      break;
  }
};

export default optionsReducer;
