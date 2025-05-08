import React from 'react';

interface DCFResultsProps {
  results: {
    pvCashFlows: number;
    terminalValue: number;
    terminalPV: number;
    enterpriseValue: number;
  };
}

const DCFResults: React.FC<DCFResultsProps> = ({ results }) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <div className="mt-4 bg-white rounded-lg shadow-md p-6">
      <div className="border-b pb-4 mb-4">
        <h3 className="text-xl font-bold mb-0">DCF Results</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <tbody>
            <tr className="border-b">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">PV of Cash Flows</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatNumber(results.pvCashFlows)}</td>
            </tr>
            <tr className="border-b">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Terminal Value</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatNumber(results.terminalValue)}</td>
            </tr>
            <tr className="border-b">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Terminal Value PV</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatNumber(results.terminalPV)}</td>
            </tr>
            <tr className="border-b">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Enterprise Value</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatNumber(results.enterpriseValue)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DCFResults;
