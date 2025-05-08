import React from 'react';

interface DCFInputsProps {
  inputs: {
    discountRate: number;
    terminalGrowth: number;
    years: number;
    cashFlows: number[];
    terminalMultiple: number;
  };
  setInputs: (inputs: any) => void;
}

const DCFInputs: React.FC<DCFInputsProps> = ({ inputs, setInputs }) => {
  const handleChange = (field: string, value: string | number) => {
    setInputs({
      ...inputs,
      [field]: typeof value === 'string' ? parseFloat(value) : value
    });
  };

  const handleCashFlowChange = (index: number, value: string) => {
    const newCashFlows = [...inputs.cashFlows];
    newCashFlows[index] = parseFloat(value);
    setInputs({
      ...inputs,
      cashFlows: newCashFlows
    });
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Discount Rate (%)
        </label>
        <input
          type="number"
          value={inputs.discountRate}
          onChange={(e) => handleChange('discountRate', e.target.value)}
          placeholder="Enter discount rate"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Terminal Growth Rate (%)
        </label>
        <input
          type="number"
          value={inputs.terminalGrowth}
          onChange={(e) => handleChange('terminalGrowth', e.target.value)}
          placeholder="Enter terminal growth rate"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Terminal Multiple (EV/FCF)
        </label>
        <input
          type="number"
          value={inputs.terminalMultiple}
          onChange={(e) => handleChange('terminalMultiple', e.target.value)}
          placeholder="Enter terminal multiple"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <h4 className="mt-4 text-lg font-bold">Cash Flows (in millions)</h4>
      {Array.from({ length: inputs.years }, (_, i) => (
        <div key={i} className="mb-3">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Year {i + 1} Cash Flow
          </label>
          <input
            type="number"
            value={inputs.cashFlows[i]}
            onChange={(e) => handleCashFlowChange(i, e.target.value)}
            placeholder={`Enter year ${i + 1} cash flow`}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      ))}
    </div>
  );
};

export default DCFInputs;
