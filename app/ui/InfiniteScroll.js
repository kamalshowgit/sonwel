'use client';

import { useEffect, useState } from 'react';
import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

const RevenueChart = () => {
  const [charts, setCharts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(null);

  const loadMoreCharts = () => {
    setLoading(true);
    setError(null); // Reset error state

    try {
      const newRevenue = Array.from({ length: 20 }, (_, i) => generateMockRevenue(currentIndex + i));
      setCharts((prevCharts) => [...prevCharts, ...newRevenue]);
      setCurrentIndex((prevIndex) => prevIndex + 20);
      setLoading(false);
    } catch (error) {
      console.error('Failed to generate mock revenue data:', error);
      setError('Failed to generate mock revenue data.');
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10 && !loading
      ) {
        loadMoreCharts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  useEffect(() => {
    // Initial load
    loadMoreCharts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {charts.map((revenue, index) => {
        const chartHeight = 350;
        const { yAxisLabels, topLabel } = generateYAxis([revenue]);

        return (
          <div key={index} className="w-full md:col-span-4 mb-8">
            <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
              Trending Products
            </h2>
            <div className="rounded-xl bg-gray-50 p-4">
              <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
                <div
                  className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
                  style={{ height: `${chartHeight}px` }}
                >
                  {yAxisLabels.map((label) => (
                    <p key={label}>{label}</p>
                  ))}
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="w-full rounded-md bg-blue-300"
                    style={{
                      height: `${(chartHeight / topLabel) * revenue.revenue}px`,
                    }}
                  ></div>
                  <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                    {revenue.month}
                  </p>
                </div>
              </div>
              <div className="flex items-center pb-2 pt-6">
                <CalendarIcon className="h-5 w-5 text-gray-500" />
                <h3 className="ml-2 text-sm text-gray-500 ">Last 12 months</h3>
              </div>
            </div>
          </div>
        );
      })}
      {loading && (
        <div className="text-center mt-4">
          <p>Loading...</p>
        </div>
      )}
      {error && (
        <div className="text-center mt-4 text-red-500">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

const generateMockRevenue = (index) => {
  return {
    month: `Chart ${index + 1}`,
    revenue: Math.floor(Math.random() * 100) + 1, // Random revenue for demo
  };
};

export default RevenueChart;
