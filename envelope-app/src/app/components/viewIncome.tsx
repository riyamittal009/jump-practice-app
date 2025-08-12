"use client";

import React, { useState } from "react";

export default function ViewIncome({
  onIncomeUpdate,
  income,
}: {
  onIncomeUpdate: (incomeDifference: number) => void;
  income: number;
}) {
  const [incomeAddAmount, setIncomeAddAmount] = useState(0);

  const updateIncome = () => {
    setIncomeAddAmount(0);
    onIncomeUpdate(incomeAddAmount);
  };

  return (
    <div className="h-[25vh] flex flex-col items-center justify-center">
      <p>My income is: {income}</p>
      <div className="flex m-5">
        <p className="p-2">$</p>
        <input
          className="border p-2"
          type="number"
          value={incomeAddAmount}
          placeholder="40"
          onChange={(i) => setIncomeAddAmount(Number(i.target.value))}
        />
        <button
          className="border p-2 ml-5 bg-black text-white"
          onClick={updateIncome}
        >
          Add income
        </button>
      </div>
      <br />
    </div>
  );
}
