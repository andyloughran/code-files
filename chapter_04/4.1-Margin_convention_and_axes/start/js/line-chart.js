// Load the data here

d3.csv("data/weekly_temperature.csv", d3.autoType)
  .then(data => {
    console.log(data);
    drawLineChart(data);
  });


// Create the line chart here
const drawLineChart = (data) => {
  const margin = {top: 40, right: 170, bottom: 25, left: 40};
  const width = 1000;
  const height = 500;

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const svg = d3.select("#line-chart")
    .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`);

  const innerChart = svg
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const firstDate = new Date(2021,00,01,0,0,0);
  const lastDate = d3.max(data, d => d.date);
  const xScale = d3.scaleTime()
    .domain([firstDate, lastDate])
    .range([0, innerWidth]);

  const maxTemp = d3.max(data, d => d.max_temp_F)
  const yScale = d3.scaleLinear()
    .domain([0, maxTemp])
    .range([innerHeight, 0]);
    
  const bottomAxis = d3.axisBottom(xScale)
    .tickFormat(d3.timeFormat("%b"))
  innerChart
    .append("g")
      .attr("class", "axis-x")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(bottomAxis)

  d3.selectAll(".axis-x text")
    .attr("x", d=> {
      const currentMonth = d;
      const nextMonth = new Date(2021, currentMonth.getMonth() + 1, 1);
      return (xScale(nextMonth) - xScale(currentMonth)) / 2;
    })
    .attr("y", "10px")
    .style("font-size", "14x")
    .style("font-family", "Roboto, sans-serif")

  const leftAxis = d3.axisLeft(yScale)
  innerChart
    .append("g")
      .attr("class", "axis-y")
      .call(leftAxis);
  d3.selectAll(".axis-y text")
    .attr("x", "-10px")
    .attr("y", "0px")
    .style("font-size", "14px")
    .style("font-family", "Roboto, sans-serif")

  d3.selectAll(".axis-y text, .azis-x text")
    .style("font-family", "Roboto, sans-serif")
    .style("font-size", "14px")

  svg
    .append("text")
      .text("Temperature in °F")
      .attr("y", 20);

  const aubergine = "#6f2c91";
  innerChart 
    .selectAll("circle")
      .data(data)
      .join("circle")
          .attr("cx", d => xScale(d.date))
          .attr("cy", d => yScale(d.avg_temp_F))
          .attr("r", 4)
          .attr("fill", aubergine)
          .attr("opacity", 0.7);

  const areaGenerator = d3.area()
    .x(d => xScale(d.date))
    .y0(d => yScale(d.min_temp_F))
    .y1(d => yScale(d.max_temp_F))
    .curve(d3.curveCatmullRom);

  const lineGenerator = d3.line()
    .x(d => xScale(d.date))
    .y(d => yScale(d.avg_temp_F))
    .curve(d3.curveCatmullRom.alpha(0.5));
  
  innerChart
    .append("path")
      .attr("d", areaGenerator(data))
      .attr("fill", aubergine)
      .attr("opacity", 0.2);

  innerChart
    .append("path")
      .attr("class", "line")
      .attr("d", lineGenerator(data))
      .attr("fill", "none")
      .attr("stroke", aubergine)
      .attr("stroke-width", 2)
      .attr("opacity", 0.2);

  innerChart
    .append("text")
      .text("Average Temp")
      .attr("x", xScale(lastDate) + 10)
      .attr("y", yScale(data[data.length -1].avg_temp_F))
      .attr("dominant-baseline", "middle")
      .attr("fill", aubergine)

  innerChart
    .append("text")
      .text("Minimum temp")
      .attr("x", xScale(data[data.length - 3].date) + 13)
      .attr("y", yScale(data[data.length - 3].min_temp_F)+ 20)
      .attr("dominant-baseline", "hanging")
      .attr("fill", aubergine)
    
  innerChart
    .append("line")
      .attr("x1", xScale(data[data.length - 3].date))
      .attr("y1", yScale(data[data.length - 3].min_temp_F)+3)
      .attr("x2", xScale(data[data.length - 3].date) + 10)
      .attr("y2", yScale(data[data.length  -3].min_temp_F) +20 )
      .attr("stroke", aubergine)
      .attr("stroke-width", 2)
      .attr("opacity", 0.2);

  innerChart
    .append("text")
      .text("Maximum temp")
      .attr("x", xScale(data[data.length - 4].date) + 13)
      .attr("y", yScale(data[data.length - 4].max_temp_F) - 20)
      .attr("fill", aubergine)

  innerChart
    .append("line")
      .attr("x1", xScale(data[data.length - 4].date))
      .attr("y1", yScale(data[data.length - 4].max_temp_F) - 3)
      .attr("x2", xScale(data[data.length - 4].date) + 10)
      .attr("y2", yScale(data[data.length - 4].max_temp_F) - 20 )
      .attr("stroke", aubergine)
      .attr("stroke-width", 2)
      .attr("opacity", 0.2);
};