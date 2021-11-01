import React from 'react'
import Block from './Block'
import '../styles/DashboardLightsBlock.scss'

export default function DashboardLightsBlock({ property }) {
  return (
    <Block className="DashboardLightsBlock" property={property}>
      <div className="DashboardLightsValues">
        {(property?.data || []).map((item) => (
          <div className="DashboardLightsItem" key={item?.data?.name}>
            <div className="DashboardLightsItemKey">{item?.data?.name}</div>
            <div className="DashboardLightsItemValue">{item?.data?.state}</div>
          </div>
        ))}
      </div>
    </Block>
  )
}
