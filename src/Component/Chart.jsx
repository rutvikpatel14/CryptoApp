import React from 'react'
import {Line} from 'react-chartjs-2'
import {Chart as ChartJs,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend} from 'chart.js'

ChartJs.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend)
const Chart = ({array=[],currency,days}) => {

    const price=[]
    const date=[]

    for (let i = 0; i < array.length; i++) {
        if(days==='24h') {
            date.push(new Date(array[i][0]).toLocaleTimeString())
        }else  {
            date.push(new Date(array[i][0]).toLocaleDateString())
        }
        price.push(array[i][1])
     }

     const data={
        labels:date,
        datasets:[{
            label:`Price in ${currency}`,
            data:price,
            borderColor:"rgb(255,99,132)",
            backgroundColor:"rgba(255,99,132,0.5)",
        }]
    }
   
  return (
    <Line options={{
        responsive:true
    }}
    data={data}
    />
  )
}

export default Chart