import { camelCase, startCase, upperFirst } from 'lodash'
import { observer } from 'mobx-react-lite'
import React, { Fragment } from 'react'
import '../styles/ListBlock.scss'
import {
  formatUnit,
  formatValue,
  getPropertyUniqueId,
  parseCustomValue,
} from '../utils/properties'
import { camelCaseToWords } from '../utils/strings'
import PinButton from './PinButton'

function ListBlock({ property }) {
  const renderBlockMultiValue = (item) => {
    if (item.data && Object.keys(item.data).length > 2) {
      return (
        <Fragment>
          {property.config.items.map((configItem) => {
            return (
              <div className="ListBlockValue" key={configItem?.name_cased}>
                {startCase(
                  camelCase(configItem?.name_pretty || configItem?.name_cased)
                )}
                : {formatValue(item.data?.[configItem?.name_cased])}
              </div>
            )
          })}
        </Fragment>
      )
    }

    if (typeof item.data === 'object' && item.data !== null) {
      return `${camelCaseToWords(
        item.data?.[property.config?.items?.[0]?.name_cased]
      )}: ${parseCustomValue(item, property.config)}`
    }

    return formatValue(item.data)
  }

  const renderValues = () => {
    if (Array.isArray(property.value)) {
      return (
        <Fragment>
          {property.value.map((item, key) => (
            <div className="ListBlockValue" key={key}>
              {renderBlockMultiValue(item)}
            </div>
          ))}
        </Fragment>
      )
    }

    if (
      typeof property?.value?.data === 'object' &&
      property?.value?.data !== null &&
      !property?.value?.data?.value
    ) {
      return Object.entries(property.value?.data).map(
        ([itemName, itemValue]) => (
          <div className="ListBlockValue" key={`${itemName}-${itemValue}`}>
            {camelCaseToWords(itemName)}: {formatValue(itemValue)}
          </div>
        )
      )
    }

    return (
      <Fragment>
        {formatValue(property.value?.data?.value || property.value?.data)}{' '}
        {formatUnit(property.value?.data?.unit)}
      </Fragment>
    )
  }

  return (
    <div className={`ListBlock ${!!property.value ? '' : 'NoValue'}`}>
      <div className="ListBlockCapability">
        {upperFirst(
          camelCaseToWords(property.config.capabilityName).toLowerCase()
        )}
      </div>
      <div className="ListBlockProperty">{property.config.name_pretty}</div>
      <div className="ListBlockValues">{renderValues()}</div>
      <PinButton propertyId={getPropertyUniqueId(property.config)} />
    </div>
  )
}

export default observer(ListBlock)
