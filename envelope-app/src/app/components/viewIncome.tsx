"use client";

import React, { useState } from "react";

export default function ViewIncome() {
  const [myIncome, setMyIncome] = useState(0);
  const [incomeAddAmount, setIncomeAddAmount] = useState(0);

  return (
    <div className="h-[25vh] flex flex-col items-center justify-center">
      <p>My income is: {myIncome}</p>
      <div className="flex m-5">
        <p className="p-2">$</p>
        <input
          className="border p-2"
          type="number"
          placeholder="40"
          onChange={(i) => setIncomeAddAmount(Number(i.target.value))}
        />
        <button
          className="border p-2 ml-5 bg-black text-white"
          onClick={() => setMyIncome(myIncome + incomeAddAmount)}
        >
          Add income
        </button>
      </div>
    </div>
  );
}
