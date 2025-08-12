"use client";

import ViewIncome from "./components/viewIncome";
import MyEnvelopes from "./components/myEnvelopes";

import React, { useState } from "react";

export default function Home() {
  const [income, setIncome] = useState(0);

  const handleIncomeUpdate = (incomeDifference: number) => {
    console.log(incomeDifference);
    setIncome(income + incomeDifference);
  };

  return (
    <>
      <ViewIncome onIncomeUpdate={handleIncomeUpdate} income={income} />
      <MyEnvelopes onIncomeUpdate={handleIncomeUpdate} income={income} />
    </>
  );
}
