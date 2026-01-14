// src/pages/Checkout.jsx
import React, { useState } from "react";
import Payment from "../components/Payment";

const Checkout = () => {
  const [amount, setAmount] = useState(500); // example amount
  const [method, setMethod] = useState("jazzcash");

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="border p-2 w-full mb-3 rounded"
        placeholder="Enter Amount"
      />

      <select
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        className="border p-2 w-full mb-3 rounded"
      >
        <option value="jazzcash">JazzCash</option>
        <option value="easypaisa">EasyPaisa</option>
        <option value="bank">Bank Account</option>
      </select>

      <Payment amount={amount} method={method} />
    </div>
  );
};

export default Checkout;