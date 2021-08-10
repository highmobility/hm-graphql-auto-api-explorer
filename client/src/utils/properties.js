import BatteryLevelBlock from '../components/BatteryLevelBlock'
import Block from '../components/Block'
import SpeedBlock from '../components/SpeedBlock'
import TemperatureBlock from '../components/TemperatureBlock'
import CoordinatesBlock from '../components/CoordinatesBlock'
import CAPABILITIES from '../data/capabilities.json'
import OdometerBlock from '../components/OdometerBlock'
import DoorsBlock from '../components/DoorsBlock'
import FuelLevelBlock from '../components/FuelLevelBlock'
import HeadingBlock from '../components/HeadingBlock'
import { VIEWS } from '../store/Config'
import ListBlock from '../components/ListBlock'
import { camelCaseToSnakeCase, camelCaseToWords } from './strings'

const UNITS = {
  kelvin: '°K',
  celsius: '°C',
  fahrenheit: '°F',
  metersPerSecond: 'm/s',
  kilometersPerHour: 'km/h',
  milesPerHour: 'mph',
  knots: 'kn',
  meters: 'm',
  millimeters: 'mm',
  centimeters: 'cm',
  decimeters: 'dm',
  kilometers: 'km',
  megameters: 'Mm',
  inches: 'in',
  feet: 'ft',
  yards: 'yd',
  miles: 'mi',
  scandinavianMiles: 'mil',
  nauticalMiles: 'M',
  amperes: 'A',
  milliamperes: 'mA',
  kiloamperes: 'kA',
  degrees: '°',
  radians: 'rad',
  revolutions: 'rev',
}

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
  LIST: {
    height: 68,
    columns: 1,
    rows: 1,
  },
}

export function getBlockData(view, propertyConfig) {
  if (view === VIEWS.LIST) {
    return {
      ...BLOCKS.LIST,
      component: ListBlock,
    }
  }

  if (propertyConfig.type === 'unit.temperature') {
    return {
      ...BLOCKS.TWO_BY_TWO,
      component: TemperatureBlock,
    }
  }

  if (propertyConfig.name_cased === 'batteryLevel') {
    return {
      ...BLOCKS.TWO_BY_TWO,
      component: BatteryLevelBlock,
    }
  }

  if (propertyConfig.type === 'unit.speed') {
    return {
      ...BLOCKS.TWO_BY_TWO,
      component: SpeedBlock,
    }
  }

  if (propertyConfig.name_cased === 'coordinates') {
    return {
      ...BLOCKS.TWO_BY_TWO,
      component: CoordinatesBlock,
    }
  }

  if (propertyConfig.name_cased === 'odometer') {
    return {
      ...BLOCKS.TWO_BY_TWO,
      component: OdometerBlock,
    }
  }

  if (propertyConfig.capabilityName === 'doors') {
    return {
      ...BLOCKS.TWO_BY_TWO,
      component: DoorsBlock,
    }
  }

  if (propertyConfig.name_cased === 'fuelLevel') {
    return {
      ...BLOCKS.TWO_BY_TWO,
      component: FuelLevelBlock,
    }
  }

  if (propertyConfig.name === 'heading') {
    return {
      ...BLOCKS.TWO_BY_TWO,
      component: HeadingBlock,
    }
  }

  if (propertyConfig.type === 'string') {
    return {
      ...BLOCKS.TWO_BY_TWO,
      component: Block,
    }
  }

  if (propertyConfig?.items?.length > 1) {
    return {
      ...BLOCKS.SIX_BY_ONE,
      component: Block,
    }
  }

  return {
    ...BLOCKS.TWO_BY_ONE,
    component: Block,
  }
}

export function getPropertyConfig(propertyUniqueId) {
  const [capabilityName, propertyName] = propertyUniqueId.split('.')

  const capabilityConfig = Object.values(CAPABILITIES).find(
    (capability) => capability.name_cased === capabilityName
  )

  const config =
    capabilityConfig?.properties?.find(
      (propertyConfig) => propertyConfig.name_cased === propertyName
    ) || null

  if (!config) {
    throw new Error(`No config found for ${propertyUniqueId}`)
  }

  return config
}

export function getPropertyUniqueId(property) {
  return `${property.capabilityName}.${property.name_cased}`
}

export function formatValue(value) {
  if (!value) return ''
  if (typeof value === 'number') {
    return Number(value).toFixed(2)
  }

  return camelCaseToWords(value)
}

export function formatUnit(unitValue) {
  if (!unitValue) return ''
  return UNITS[unitValue] || camelCaseToWords(unitValue)
}

export function valueWithBaseUnit(value, unit, propertyConfig) {
  const propertyUnitType = propertyConfig.unit.unit_types.find(
    (unitType) => unitType.name === camelCaseToSnakeCase(unit)
  )

  if (propertyUnitType.conversion_constant) {
    return value + propertyUnitType.conversion_constant
  }

  return value * propertyUnitType.conversion_linear
}
