// src/components/Payment.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";

const Payment = ({ amount, method }) => {
  const { user } = useAuth();

  const handlePayment = () => {
    if (!user) {
      alert("Please login first to make a payment");
      return;
    }

    let options;

    switch (method) {
      case "jazzcash":
        options = {
          key: "JAZZCASH_PUBLIC_KEY",
          amount: amount * 100, // in smallest currency unit
          currency: "PKR",
          name: user.name,
          description: "JazzCash Payment",
          handler: function (response) {
            console.log("JazzCash Payment Success:", response);
            alert("Payment Successful via JazzCash!");
          },
        };
        break;

      case "easypaisa":
        options = {
          key: "EASYPASA_PUBLIC_KEY",
          amount: amount * 100,
          currency: "PKR",
          name: user.name,
          description: "EasyPaisa Payment",
          handler: function (response) {
            console.log("EasyPaisa Payment Success:", response);
            alert("Payment Successful via EasyPaisa!");
          },
        };
        break;

      case "bank":
        options = {
          key: "BANK_PUBLIC_KEY",
          amount: amount * 100,
          currency: "PKR",
          name: user.name,
          description: "Bank Transfer",
          handler: function (response) {
            console.log("Bank Payment Success:", response);
            alert("Payment Successful via Bank!");
          },
        };
        break;

      default:
        alert("Please select a valid payment method");
        return;
    }

    try {
      // Simulating popup open
      if (!options) throw new Error("No checkout popup config found");

      // In real case, replace this with SDK init like Razorpay, JazzCash JS, etc.
      console.log("Opening payment popup with options:", options);
      alert(`Simulated ${method} payment popup for amount PKR ${amount}`);
    } catch (err) {
      console.error(err.message);
      alert("Payment failed: " + err.message);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={handlePayment}
        className="bg-green-600 text-white py-2 px-4 rounded"
      >
        Pay {amount} PKR via {method}
      </button>
    </div>
  );
};

export default Payment;
