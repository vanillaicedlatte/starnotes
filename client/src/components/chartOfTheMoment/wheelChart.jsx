import React, { useEffect, useRef } from "react";
import Chart from "@astrodraw/astrochart";

function WheelChart({ data }) {
	const containerRef = useRef();

	useEffect(() => {
		const size = containerRef.current.clientWidth;
		const SYMBOL_SCALE = size / 360; // Adjust SYMBOL_SCALE based on chart size
		const chart = new Chart("paper", 300, 300, { SYMBOL_SCALE });
		const radix = chart.radix(data);
		radix.aspects();

		// Return a cleanup function that removes the SVG elements created by the chart
		return () => {
			const svgElement = document.getElementById("paper");
			while (svgElement.firstChild) {
				svgElement.firstChild.remove();
			}
		};
	}, [data]);

	return <div id='paper' className='current-chart-wheel' ref={containerRef} />;
}

export default WheelChart;
