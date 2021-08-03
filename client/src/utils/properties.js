import BatteryLevelBlock from '../components/BatteryLevelBlock'
import Block from '../components/Block'
import SpeedBlock from '../components/SpeedBlock'
import TemperatureBlock from '../components/TemperatureBlock'
import CoordinatesBlock from '../components/CoordinatesBlock'
import CAPABILITIES from '../data/capabilities.json'
import OdometerBlock from '../components/OdometerBlock'
import DoorsBlock from '../components/DoorsBlock'

export const BLOCKS = {
  TWO_BY_TWO: {
    columns: 2,
    rows: 2,
    width: 330,
    height: 330,
  },
  TWO_BY_ONE: {
    columns: 2,
    rows: 1,
    width: 330,
    height: 165,
  },
  SIX_BY_ONE: {
    columns: 6,
    rows: 1,
    width: 680,
    height: 165,
  },
}

export function getBlockData(property) {
  if (property.type === 'unit.temperature') {
    return {
      ...BLOCKS.TWO_BY_TWO,
      component: TemperatureBlock,
    }
  }

  if (property.name === 'battery_level') {
    return {
      ...BLOCKS.TWO_BY_TWO,
      component: BatteryLevelBlock,
    }
  }

  if (property.type === 'unit.speed') {
    return {
      ...BLOCKS.TWO_BY_TWO,
      component: SpeedBlock,
    }
  }

  if (property.capabilityName === 'vehicle_location') {
    return {
      ...BLOCKS.TWO_BY_TWO,
      component: CoordinatesBlock,
    }
  }

  if (property.name === 'odometer') {
    return {
      ...BLOCKS.TWO_BY_TWO,
      component: OdometerBlock,
    }
  }

  if (property.capabilityName === 'doors') {
    return {
      ...BLOCKS.TWO_BY_TWO,
      component: DoorsBlock,
    }
  }

  return {
    ...BLOCKS.TWO_BY_TWO,
    component: Block,
  }
}

export function getPropertyConfig(property) {
  return (
    CAPABILITIES?.[property?.capabilityName]?.properties?.find(
      (propertyConfig) => propertyConfig.name === property.name
    ) || null
  )
}
