import React, { useState } from 'react';
import DCFInputs from '../components/Calculator/DCFInputs';
import DCFResults from '../components/Calculator/DCFResults';

const Calculator: React.FC = () => {
  const [inputs, setInputs] = useState({
    discountRate: 8,
    terminalGrowth: 2,
    years: 5,
    cashFlows: Array(5).fill(0),
    terminalMultiple: 10,
  });

  const [results, setResults] = useState<null | {
    pvCashFlows: number;
    terminalValue: number;
    terminalPV: number;
    enterpriseValue: number;
  }>(null);

  const [error, setError] = useState('');

  const calculateDCF = () => {
    try {
      const { discountRate, terminalGrowth, years, cashFlows, terminalMultiple } = inputs;
      
      // Validate inputs
      if (discountRate <= 0 || terminalGrowth < 0 || terminalMultiple <= 0) {
        throw new Error('Please enter valid positive values for all inputs');
      }

      // Calculate present value of cash flows
      let pvCashFlows = 0;
      for (let i = 0; i < years; i++) {
        const year = i + 1;
        const discountFactor = 1 / Math.pow(1 + discountRate / 100, year);
        pvCashFlows += cashFlows[i] * discountFactor;
      }

      // Calculate terminal value
      const terminalValue = cashFlows[years - 1] * (1 + terminalGrowth / 100) * terminalMultiple;
      const terminalPV = terminalValue / Math.pow(1 + discountRate / 100, years);

      // Calculate total enterprise value
      const enterpriseValue = pvCashFlows + terminalPV;

      setResults({
        pvCashFlows,
        terminalValue,
        terminalPV,
        enterpriseValue
      });
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while calculating DCF');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="border-b pb-4 mb-4">
          <h2 className="text-2xl font-bold mb-0">Discounted Cash Flow Calculator</h2>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
            <DCFInputs 
              inputs={inputs} 
              setInputs={setInputs} 
            />
            <button 
              type="button"
              onClick={calculateDCF}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-3"
            >
              Calculate DCF
            </button>
          </form>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {results && (
            <DCFResults results={results} />
          )}
      </div>
    </div>
  );
};

export default Calculator;
