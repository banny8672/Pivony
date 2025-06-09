import { useEffect, useRef } from 'react';

const SunburstChart = ({ data, filterKeyword, onNodeClick }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!data || !chartRef.current) return;

    // Clear any existing content
    chartRef.current.innerHTML = '';

    // Load D3 library first (needed for colors)
    const d3Script = document.createElement('script');
    d3Script.src = 'https://d3js.org/d3.v7.min.js';
    d3Script.onload = () => {
      // Then load sunburst chart
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/sunburst-chart';
      script.onload = () => {
        if (!chartRef.current) return;

        try {
          // Create and render the chart
          const chart = window.Sunburst()
            .data(data)
            .width(chartRef.current.clientWidth || 500)
            .height(chartRef.current.clientHeight || 500)
            .label(d => (d && d.name) ? d.name : '')
            .size(d => (d && d.value) ? d.value : 0)
            .excludeRoot(true)
            .color(() => {
              // Use D3's color scheme
              const colors = window.d3.schemeCategory10;
              return d => colors[d.depth % colors.length];
            })
            .tooltipContent((d, node) => {
              if (!d || !node) return '';
              return `<div style="text-align:center">
                <strong>${d.name || ''}</strong><br/>
                Value: ${node.value || 0}
              </div>`;
            });

          // Render the chart
          chart(chartRef.current);
        } catch (err) {
          console.error("Error rendering chart:", err);
        }
      };
      document.body.appendChild(script);
    };

    document.body.appendChild(d3Script);

    // Cleanup function
    return () => {
      if (chartRef.current) {
        chartRef.current.innerHTML = '';
      }
    };
  }, [data, filterKeyword, onNodeClick]);

  return (
    <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
  );
};

export default SunburstChart;