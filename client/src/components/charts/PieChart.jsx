import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

const PieChart = ({ data }) => {
  const chartRef = useRef()

  useEffect(() => {
    const sortedData = [...data].sort((a, b) => b.percentage - a.percentage)

    const ctx = chartRef.current.getContext('2d')

    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: sortedData.map(item => item.percentage * 100),
            backgroundColor: [
              '#0091DA',
              '#C6007E',
              '#00A3A1',
              '#470A68',
              '#FF9800',
              '#9C27B0',
            ],
          },
        ],
        labels: sortedData.map(item => item.title),
      },
      options: {
        plugins: {
          legend: {
            display: false,
            position: 'bottom',
            align: 'start',
          },
        },
      },
    })

    return () => {
      myChart.destroy()
    }
  }, [data])

  return (
    <div className='h-[200px] w-[200px] mx-auto'>
      <canvas ref={chartRef} />
    </div>
  )
}

export default PieChart
