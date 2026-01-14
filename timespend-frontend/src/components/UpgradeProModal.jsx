const UpgradeProModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-xl font-bold mb-3">Upgrade to Pro 🚀</h2>

        <p className="text-gray-600 mb-4">
          Get advanced reports, charts & insights.
        </p>

        <div className="space-y-3">
          <button className="bg-green-600 text-white w-full py-2 rounded">
            Pay with JazzCash
          </button>

          <button className="bg-blue-600 text-white w-full py-2 rounded">
            Pay with EasyPaisa
          </button>

          <button className="border w-full py-2 rounded">
            Bank Transfer
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-3">
          Payment verification will be manual in MVP.
        </p>

        <button
          onClick={onClose}
          className="text-gray-500 text-sm mt-3 w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpgradeProModal;
