import BatteryLevelPropertyBlock from '../components/BatteryLevelPropertyBlock'
import PropertyBlock from '../components/PropertyBlock'
import SpeedPropertyBlock from '../components/SpeedPropertyBlock'
import TemperaturePropertyBlock from '../components/TemperaturePropertyBlock'
import CAPABILITIES from '../data/capabilities.json'

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

export function getPropertyBlockData(property) {
  if (property.type === 'unit.temperature') {
    return {
      ...BLOCKS.TWO_BY_TWO,
      component: TemperaturePropertyBlock,
    }
  }

  if (property.name === 'battery_level') {
    return {
      ...BLOCKS.TWO_BY_TWO,
      component: BatteryLevelPropertyBlock,
    }
  }

  if (property.type === 'unit.speed') {
    return {
      ...BLOCKS.TWO_BY_TWO,
      component: SpeedPropertyBlock,
    }
  }

  return {
    ...BLOCKS.TWO_BY_TWO,
    component: PropertyBlock,
  }
}

export function getPropertyConfig(property) {
  return (
    CAPABILITIES?.[property?.capabilityName]?.properties?.find(
      (propertyConfig) => propertyConfig.name === property.name
    ) || null
  )
}
