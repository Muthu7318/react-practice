import React, { useReducer } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const initialState = {
  accordion1: { field1: "", field2: "", field3: "", field4: "" },
  accordion2: { field1: "", field2: "", field3: "", field4: "" },
  accordion3: { field1: "", field2: "", field3: "", field4: "" },
  accordion4: { field1: "", field2: "", field3: "", field4: "" },
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.accordion]: {
          ...state[action.accordion],
          [action.field]: action.value,
        },
      };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "CLEAR_ERROR":
      return { ...state, error: "" };
    default:
      return state;
  }
}

export default function AccordionForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (accordion, field, value) => {
    dispatch({
      type: "UPDATE_FIELD",
      accordion,
      field,
      value,
    });
  };

  const isFormFilled = (form) => Object.values(form).every((val) => val !== "");
  const isFormEmpty = (form) => Object.values(form).every((val) => val === "");

  const handleSubmit = () => {
    dispatch({ type: "CLEAR_ERROR" });

    const payload = {};
    let hasPartialForm = false;
    let hasAtLeastOneFilled = false;

    Object.entries(state).forEach(([accordionKey, formObj]) => {
      if (accordionKey === "error") return;

      const filled = isFormFilled(formObj);
      const empty = isFormEmpty(formObj);

      if (!filled && !empty) {
        hasPartialForm = true;
      } else if (filled) {
        payload[accordionKey] = { ...formObj };
        hasAtLeastOneFilled = true;
      }
    });

    if (hasPartialForm) {
      dispatch({
        type: "SET_ERROR",
        payload: "Please complete all fields in any opened accordion.",
      });
      return;
    }

    if (!hasAtLeastOneFilled) {
      dispatch({
        type: "SET_ERROR",
        payload: "Please fill at least one accordion form completely.",
      });
      return;
    }

    console.log("✅ Final Payload:", payload);
    alert(JSON.stringify(payload, null, 2));
  };

  const renderForm = (accordionKey) => {
    const form = state[accordionKey];

    return (
      <div className="p-fluid">
        {["field1", "field2", "field3", "field4"].map((field) => (
          <div className="field" key={field}>
            <label htmlFor={`${accordionKey}-${field}`} className="block mb-2">
              {field.toUpperCase()}
            </label>
            <InputText
              id={`${accordionKey}-${field}`}
              value={form[field]}
              onChange={(e) =>
                handleChange(accordionKey, field, e.target.value)
              }
              className="w-full mb-3"
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-5">
      <h2 className="mb-4">Multi Accordion Form</h2>
      <Accordion multiple activeIndex={[0]}>
        <AccordionTab header="Accordion 1">
          {renderForm("accordion1")}
        </AccordionTab>
        <AccordionTab header="Accordion 2">
          {renderForm("accordion2")}
        </AccordionTab>
        <AccordionTab header="Accordion 3">
          {renderForm("accordion3")}
        </AccordionTab>
        <AccordionTab header="Accordion 4">
          {renderForm("accordion4")}
        </AccordionTab>
      </Accordion>

      {state.error && (
        <div className="text-red-500 mt-3 mb-3">{state.error}</div>
      )}

      <Button label="Submit" className="mt-3" onClick={handleSubmit} />
    </div>
  );
}
