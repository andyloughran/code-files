import { Fragment } from 'react';

import Rankings from './Rankings';
//import ScatterplotD3Controlled from './ScatterplotD3Controlled';
import ScatterplotReactControlled from './ScatterplotReactControlled';
import BarChart from './BarChart';
import * as d3 from 'd3';

const Charts = props => {
  const margin = {top: 30, right: 10, bottom: 50, left: 60};  
  const colorScale = d3.scaleOrdinal()
    .domain(props.data.ids)
    .range(d3.schemeTableau10);
  console.log(props.data)
  return (
    <Fragment>
      <h1>Front-end Frameworks</h1>
      <div className='row'>
        <div className='col-9'>
          <Rankings margin={margin} />
        </div>
        <div className='col-3'>
          <div className='row'>
            <div className='col-12'>
              <ScatterplotReactControlled margin={margin} data={props.data.experience} colorScale={colorScale}/>
            </div>
            <div className='col-12'>
              <BarChart margin={margin} data={props.data.experience} colorScale={colorScale}/>
            </div>
          </div>
        </div>
      </div>
      <div className="source">Data source and original rankings chart: <a href="https://2021.stateofjs.com/en-US/libraries/front-end-frameworks">The State of JS 2021: Front-end Frameworks</a></div>
    </Fragment>
  )
};

export default Charts;