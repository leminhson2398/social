import React, { Component } from 'react'
import { HorizontalBar } from 'react-chartjs-2'
import { green, yellow, orange, red, lime } from '@material-ui/core/colors'
import { Chart as Chart_ } from 'chart.js'

Chart_.defaults.scale.gridLines.display = false

class Chart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chartData: null,
    }
  }

  componentDidMount() {
    this.setState({
      chartData: {
        labels: [5, 4, 3, 2, 1],
        datasets: [
          {
            label: 'bought',
            data: [75, 100, 7, 6, 2],
            backgroundColor: [
              lime.A700,
              green[700],
              yellow.A400,
              orange.A400,
              red.A400,
            ],
          }
        ]
      }
    })
  }

  render() {
    return (
      <div className='chart'>
        <HorizontalBar
          data={this.state.chartData}
          options={{
            title: {
              display: true,
              text: 'Bought Times',
            },
            legend: {
              display: false,
            },
            animation: {
              duration: 5000,
            },
          }}
        />
      </div>
    )
  }
}

export default Chart
