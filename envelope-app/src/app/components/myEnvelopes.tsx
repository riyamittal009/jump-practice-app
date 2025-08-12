"use client";

import React, { useState } from "react";

interface Envelope {
  id: number;
  name: string;
  amount: number;
}

export default function MyEnvelopes() {
  const [envelopes, setEnvelopes] = useState<Envelope[]>([]);
  const [newEnvelopeName, setNewEnvelopeName] = useState("");
  const [newEnvelopeAmount, setNewEnvelopeAmount] = useState(0);

  return (
    <div className="h-[25vh] flex flex-col items-center justify-center">
      <h1>My envelopes: </h1>
      <div className="flex m-5">
        <button
          className="border p-2 ml-5 bg-black text-white"
          onClick={() =>
            setEnvelopes([
              ...envelopes,
              { id: envelopes.length + 1, name: "", amount: 0 },
            ])
          }
        >
          Create envelope
        </button>
      </div>
      {envelopes.map((envelope) => (
        <div key={envelope.id} className="border p-1 m-2">
          <h2 className="font-bold">{envelope.name}</h2>
          <p>Amount: {envelope.amount}</p>
        </div>
      ))}
    </div>
  );
}
