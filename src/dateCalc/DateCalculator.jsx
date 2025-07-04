import { useState } from "react";

function DateCalculator() {
  const [dob, setDob] = useState(null);
  const [age, setAge] = useState("0");
  const [error, setError] = useState("");

  function handleDateChange(e) {
    console.log(e.target.value);

    const currentDate = new Date();
    const dob = new Date(e.target.value);

    if (dob > currentDate) {
      setError("Dob should be less than current date.");
      return;
    }

    let year = currentDate.getFullYear() - dob.getFullYear();
    let month = currentDate.getMonth() + 1 - (dob.getMonth() + 1);
    let day = currentDate.getDate() - dob.getDate();

    if (day < 0) {
      month--;
      day =
        day +
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          0
        ).getDate();
    }

    if (month < 0) {
      year--;
      month = month + 12;
    }

    setAge(`${year} years, ${month} months, ${day} days`);
    setError("");
  }

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      Enter your Dob: <input type="date" onChange={handleDateChange}></input>
      <p>your age is : {age}</p>
      {error && (
        <p
          style={{
            color: "red",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default DateCalculator;
