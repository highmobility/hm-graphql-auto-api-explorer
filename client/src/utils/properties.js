import BatteryLevelBlock from '../components/BatteryLevelBlock'
import Block from '../components/Block'
import SpeedBlock from '../components/SpeedBlock'
import TemperatureBlock from '../components/TemperatureBlock'
import CoordinatesBlock from '../components/CoordinatesBlock'
import CAPABILITIES from 'data/capabilities.json'
import OdometerBlock from '../components/OdometerBlock'
import DoorsBlock from '../components/DoorsBlock'
import FuelLevelBlock from '../components/FuelLevelBlock'
import HeadingBlock from '../components/HeadingBlock'
import { VIEWS } from '../store/Config'
import ListBlock from '../components/ListBlock'
import { camelCaseToSnakeCase, camelCaseToWords } from './strings'
import { format } from 'date-fns'
import { padStart } from 'lodash'
import DashboardLightsBlock from '../components/DashboardLightsBlock'

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
  newtonMeters: 'N m',
  newtonMillimeters: 'N mm',
  poundFeet: 'lb-ft',
  joules: 'J',
  kilojoules: 'kJ',
  wattHours: 'Wh',
  kilowattHours: 'kWh',
  volts: 'V',
  millivolts: 'mV',
  kilovolts: 'kV',
  watts: 'W',
  milliwatts: 'mW',
  kilowatts: 'kW',
  megawatts: 'MW',
  horsepower: 'hp',
  minutes: 'min',
  seconds: 's',
  hours: 'h',
  revolutionsPerMinute: 'RPM',
  degreesPerSecond: 'deg/s',
  radiansPerSecond: 'rad/s',
}

export const BLOCK_SIZE = 165
export const LIST_BLOCK_HEIGHT = 68

export const BLOCKS = {
  TWO_BY_TWO: {
    columns: 2,
    height: 2 * BLOCK_SIZE,
  },
  TWO_BY_ONE: {
    columns: 2,
    height: BLOCK_SIZE,
  },
  LIST: {
    height: LIST_BLOCK_HEIGHT,
    columns: 1,
  },
  // CUSTOM
}

export function getBlockData(view, propertyConfig, propertyValue) {
  if (view !== VIEWS.GRID) {
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

  if (propertyConfig.capabilityName === 'doors' && propertyConfig.multiple) {
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

  if (propertyConfig.name_cased === 'dashboardLights') {
    const VALUE_ROW_HEIGHT = 56
    const ITEMS_PER_ROW = 3
    const itemCount = propertyValue?.length || 0

    return {
      columns: 6,
      height: BLOCK_SIZE + (itemCount / ITEMS_PER_ROW) * VALUE_ROW_HEIGHT,
      component: DashboardLightsBlock,
    }
  }

  if (propertyConfig?.items?.length > 0) {
    const VALUE_ROW_HEIGHT = 48

    const itemCount = Object.keys(propertyValue?.[0]?.data || {})?.length || 0
    const heightToAdd =
      itemCount > 2
        ? Math.ceil((VALUE_ROW_HEIGHT * propertyValue?.length) / BLOCK_SIZE) *
          BLOCK_SIZE
        : 0

    return {
      columns: 6,
      height: BLOCK_SIZE + heightToAdd,
      component: Block,
    }
  }

  if (propertyConfig.type === 'string') {
    return {
      ...BLOCKS.TWO_BY_TWO,
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
  if (value == null) return ''
  if (typeof value === 'number' && value !== 0) {
    return Number(value).toFixed(2)
  }

  if (value?.value != null) {
    return `${formatValue(value?.value)} ${formatUnit(value?.unit) || ''}`
  }

  return value
}

export function formatUnit(unitValue) {
  if (!unitValue) return ''
  return UNITS[unitValue] || camelCaseToWords(unitValue)
}

export function valueWithBaseUnit(value, unit, propertyConfig) {
  if (!unit || !propertyConfig) return value

  const propertyUnitType = propertyConfig.unit.unit_types.find(
    (unitType) => unitType.name === camelCaseToSnakeCase(unit)
  )

  if (!propertyUnitType) return value

  if (propertyUnitType.conversion_constant) {
    return value + propertyUnitType.conversion_constant
  }

  return value * propertyUnitType.conversion_linear
}

export function parseCustomValue(item, propertyConfig) {
  if (propertyConfig?.items?.[1]?.customType === 'time') {
    return `${padStart(item.data.time.hour, 2, '0')}:${padStart(
      item.data.time.minute,
      2,
      '0'
    )}`
  }

  if (propertyConfig.items[1].items) {
    return propertyConfig.items[1].items
      .map((subItem) => {
        return `${subItem.name_cased}: ${
          item.data?.[propertyConfig.items[1].name_cased][subItem.name_cased]
        }`
      })
      .join('; ')
  }

  const value = item.data[propertyConfig.items[1].name_cased]
  if (propertyConfig?.items?.[1]?.type === 'timestamp') {
    return format(new Date(value), 'dd.MM.yyyy HH:mm')
  }

  return formatValue(value)
}
