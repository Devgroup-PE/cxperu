import React, { useContext } from 'react'
import { ComposedChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, Area } from 'recharts';
import { OrdersContext } from '../../OrdersContext';
import { Seller } from '../../types/sellers';
import { mapData } from '../../utils/mapData';
import { useSellers } from '../../hooks/useSellers';

const Chart = () => {
  const ordersContext = useContext(OrdersContext)

  if(!ordersContext?.[2].length) return null

  const handleMouseEnter = () => {};

  const handleMouseLeave = () => {};

  const { sellers, loading } = useSellers()
  if(loading) return null

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ResponsiveContainer width="100%" height='100%'>
        <ComposedChart
          width={500}
          height={300}
          data={mapData(ordersContext[2],sellers).reverse()}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="date" allowDataOverflow label={{value: 'Fecha', position: 'insideBottom', offset: 10 }} minTickGap={15} height={60}/>
          <YAxis dataKey="max" allowDataOverflow label={{ value: 'Ventas', angle: -90, position: 'insideLeft' }}/>
          <Tooltip />
          <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
          {sellers && sellers?.map((seller: Seller) => (
            <Line type="monotone" dataKey={`${seller.Name}`} stroke={seller.color} strokeWidth={2}/>
          ))}
          <Area type="monotone" dataKey="average" fill="#8884d8" stroke="#8884d8" name={"promedio"} opacity={0.5}/>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart
