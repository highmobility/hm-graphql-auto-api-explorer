import BatteryLevelPropertyBlock from '../components/BatteryLevelPropertyBlock'
import PropertyBlock from '../components/PropertyBlock'
import TemperaturePropertyBlock from '../components/TemperaturePropertyBlock'

export function getPropertyComponent(property) {
  if (property.type === 'unit.temperature') {
    return TemperaturePropertyBlock
  }

  if (property.name === 'battery_level') {
    return BatteryLevelPropertyBlock
  }

  return PropertyBlock
}
