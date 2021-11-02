import { upperFirst } from 'lodash'
import { observer } from 'mobx-react-lite'
import React, { Fragment } from 'react'
import '../styles/ListBlock.scss'
import {
  formatUnit,
  formatValue,
  getPropertyUniqueId,
  parseCustomValue,
} from '../utils/properties'
import { camelCaseToWords, prettyName } from '../utils/strings'
import PinButton from './PinButton'

function ListBlock({ property }) {
  const renderBlockMultiValue = (item) => {
    if (item.data && Object.keys(item.data).length > 2) {
      if (property.config.items) {
        return (
          <Fragment>
            {property.config.items.map((configItem) => {
              return (
                <div className="ListBlockValue" key={configItem?.name_cased}>
                  {prettyName(configItem)}:{' '}
                  {formatValue(item.data?.[configItem?.name_cased])}
                </div>
              )
            })}
          </Fragment>
        )
      } else {
        return <div className="ListBlockValue">{item.data}</div>
      }
    }

    if (typeof item.data === 'object' && item.data !== null) {
      return `${camelCaseToWords(
        item.data?.[property.config?.items?.[0]?.name_cased]
      )}: ${parseCustomValue(item, property.config)}`
    }

    return formatValue(item.data)
  }

  const renderValues = () => {
    if (Array.isArray(property.data)) {
      return (
        <Fragment>
          {property.data.map((item, key) => (
            <div className="ListBlockValue" key={key}>
              {renderBlockMultiValue(item)}
            </div>
          ))}
        </Fragment>
      )
    }

    if (
      typeof property.data?.value === 'object' &&
      property.data?.value !== null
    ) {
      return Object.entries(property?.data?.value).map(
        ([itemName, itemValue]) => (
          <div className="ListBlockValue" key={`${itemName}-${itemValue}`}>
            {camelCaseToWords(itemName)}: {formatValue(itemValue)}
          </div>
        )
      )
    }

    return (
      <Fragment>
        {formatValue(property.data?.value)} {formatUnit(property?.data?.unit)}
      </Fragment>
    )
  }

  return (
    <div className={`ListBlock ${!!property?.data ? '' : 'NoValue'}`}>
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
