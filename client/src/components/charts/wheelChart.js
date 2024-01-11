import React, { useEffect, useRef } from 'react';
import Chart from '@astrodraw/astrochart';

function WheelChart({ data }) {
  const containerRef = useRef();

  useEffect(() => {
    const size = containerRef.current.offsetWidth;
    const SYMBOL_SCALE = size / 500; // Adjust SYMBOL_SCALE based on chart size
    const chart = new Chart(containerRef.current.id, size, size, { SYMBOL_SCALE });
    const radix = chart.radix(data);
    radix.aspects();
  }, [data]);

  return <div id="paper" className="current-chart-wheel" ref={containerRef} />;
}

export default WheelChart;