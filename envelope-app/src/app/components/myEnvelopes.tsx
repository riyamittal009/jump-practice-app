"use client";

import React, { useState } from "react";

interface Envelope {
  id: number;
  name: string;
  amount: number;
}

export default function MyEnvelopes({
  onIncomeUpdate,
  income,
}: {
  onIncomeUpdate: (incomeDifference: number) => void;
  income: number;
}) {
  const [envelopes, setEnvelopes] = useState<Envelope[]>([]);
  const [newEnvelopeName, setNewEnvelopeName] = useState("");
  const [newEnvelopeAmount, setNewEnvelopeAmount] = useState(0);

  const [moveAmounts, setMoveAmounts] = useState(new Map());
  const [spendAmounts, setSpendAmounts] = useState(new Map());

  const setEnvelope = () => {
    if (newEnvelopeName == "") {
      alert("Please give this envelope name.");
      return;
    }
    setEnvelopes([
      ...envelopes,
      {
        id: envelopes.length,
        name: newEnvelopeName,
        amount: newEnvelopeAmount,
      },
    ]);
    setNewEnvelopeName("");
    setNewEnvelopeAmount(0);
  };

  const moveIncomeToEnvelope = (envelopeId: number) => {
    const amountToMove = moveAmounts.get(envelopeId);
    if (amountToMove > income) {
      alert(
        "You don't have enough income to move $" +
          amountToMove +
          " to this envelope."
      );
      return;
    }
    envelopes[envelopeId].amount =
      Number(envelopes[envelopeId].amount) + Number(amountToMove);
    onIncomeUpdate(amountToMove * -1);
    setMoveAmounts((prev) => new Map([...prev, [envelopeId, 0]]));
  };

  const spendIncomeFromEnvelope = (envelopeId: number) => {
    const amountToSpend = spendAmounts.get(envelopeId);
    if (amountToSpend > envelopes[envelopeId].amount) {
      alert(
        "You don't have enough income in this envelope to spend $" +
          amountToSpend +
          "."
      );
      return;
    }
    envelopes[envelopeId].amount =
      Number(envelopes[envelopeId].amount) -
      Number(spendAmounts.get(envelopeId));
    setSpendAmounts((prev) => new Map([...prev, [envelopeId, 0]]));
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>My envelopes: </h1>
      <div className="flex flex-col m-5 items-center">
        <div className="flex m-2">
          <p className="m-2">Enter envelope name: </p>
          <input
            className="border p-1"
            value={newEnvelopeName}
            placeholder="Groceries"
            onChange={(name) => setNewEnvelopeName(name.target.value)}
          />
        </div>
        <div className="flex m-2">
          <p className="m-2">Enter envelope amount: </p>
          <input
            className="border p-1"
            placeholder="50"
            value={newEnvelopeAmount}
            type="number"
            onChange={(amount) =>
              setNewEnvelopeAmount(Number(amount.target.value))
            }
          />
        </div>
        <button
          className="border p-2 bg-black text-white w-50 align-center"
          onClick={setEnvelope}
        >
          Create envelope
        </button>
        <br />
        <br />
        <br />
      </div>
      <div className="flex flex-col">
        {envelopes.map((envelope) => (
          <div className="flex flex-col">
            <p className="text-center">Envelope: {Number(envelope.id) + 1}</p>
            <div key={envelope.id}>
              <div className="border p-1 m-2 flex flex-col items-center">
                <h2 className="font-bold">{envelope.name}</h2>
                <p>Amount: {envelope.amount}</p>
              </div>
            </div>

            <div className="flex flex-row m-2">
              <p>How much would you like to move to this envelope?</p>
              <input
                className="border p-1 m-2"
                placeholder="50"
                type="number"
                value={moveAmounts.get(envelope.id)}
                onChange={(amount) =>
                  setMoveAmounts(
                    (prev) =>
                      new Map([...prev, [envelope.id, amount.target.value]])
                  )
                }
              />
              <button
                className="border p-2 bg-black text-white w-20 align-center"
                onClick={() => {
                  console.log(
                    "I want to move this much: " + moveAmounts.get(envelope.id)
                  );
                  moveIncomeToEnvelope(envelope.id);
                }}
              >
                Move
              </button>
            </div>

            <div className="flex flex-row">
              <p>How much would you like to spend from this envelope?</p>
              <input
                className="border p-1 m-2"
                placeholder="50"
                type="number"
                value={spendAmounts.get(envelope.id)}
                onChange={(amount) =>
                  setSpendAmounts(
                    (prev) =>
                      new Map([...prev, [envelope.id, amount.target.value]])
                  )
                }
              />
              <button
                className="border p-2 bg-black text-white w-20 align-center"
                onClick={() => {
                  console.log(
                    "I want to spend this much: " +
                      spendAmounts.get(envelope.id)
                  );
                  spendIncomeFromEnvelope(envelope.id);
                }}
              >
                Spend
              </button>
            </div>
            <br />
            <br />
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}
