import { format, formatDistanceStrict, isBefore, sub } from 'date-fns'
import { observer } from 'mobx-react-lite'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useInterval } from 'react-use'
import '../styles/Block.scss'
import {
  formatUnit,
  formatValue,
  getPropertyUniqueId,
  parseCustomValue,
} from '../utils/properties'
import { camelCaseToWords, prettyName } from '../utils/strings'
import PinButton from './PinButton'
import find from 'lodash/find'

function Block({ children, property, className = '' }) {
  const [updatedAt, setUpdatedAt] = useState(null)

  const changeUpdatedAt = useCallback(() => {
    const timestamp =
      property.data?.timestamp || find(property.data, 'timestamp')?.timestamp

    if (!timestamp) return

    if (isBefore(new Date(timestamp), sub(new Date(), { hours: 24 }))) {
      return setUpdatedAt(
        format(new Date(timestamp), "dd.MM.yyyy 'at' HH:mm zzz")
      )
    }

    return setUpdatedAt(
      formatDistanceStrict(new Date(timestamp), new Date(), {
        addSuffix: true,
      })
    )
  }, [property?.data])

  useEffect(() => {
    changeUpdatedAt()
  }, [property, changeUpdatedAt])

  useInterval(() => {
    changeUpdatedAt()
  }, 1000)

  const renderBlockMultiValueRow = (item) => {
    if (typeof item.data === 'object' && item.data !== null) {
      // if property.items > 2, render as label1:value; label2: value2
      if (Object.keys(item.data).length > 2) {
        return (
          <div className="BlockMultiValues">
            {property.config.items.map((configItem) => {
              return (
                <div className="BlockMultiValue" key={configItem?.name_cased}>
                  <div className="BlockMultiValueKey">
                    {prettyName(configItem)}
                  </div>
                  <div className="BlockMultiValueValue">
                    {formatValue(item.data?.[configItem?.name_cased])}
                  </div>
                </div>
              )
            })}
          </div>
        )
      }

      // With 2 items, first is always "label" and second "value"
      if (Object.keys(item.data).length === 2) {
        return (
          <div className="BlockMultiValue">
            <div className="BlockMultiValueKey">
              {camelCaseToWords(
                item.data?.[property.config?.items?.[0]?.name_cased]
              )}
            </div>
            <div className="BlockMultiValueValue">
              {parseCustomValue(item, property.config)}
            </div>
          </div>
        )
      }

      return (
        <div className="BlockMultiValue">
          <div className="BlockMultiValueValue">{formatValue(item.data)}</div>
        </div>
      )
    }

    return formatValue(item.data)
  }

  const renderBlockValue = () => {
    if (Array.isArray(property?.data)) {
      return (
        <div className="BlockMultiValues">
          {property?.data.map((item, key) => {
            if (property.config.items && item.data) {
              return (
                <div
                  className={`${
                    Object.keys(item?.data).length > 2
                      ? 'BlockMultiValueRow'
                      : 'BlockMultiValue'
                  }`}
                  key={key}
                >
                  {renderBlockMultiValueRow(item)}
                </div>
              )
            } else {
              return (
                <div className="BlockMultiValue" key={key}>
                  {item?.data}
                </div>
              )
            }
          })}
        </div>
      )
    }

    if (
      typeof property.data?.value === 'object' &&
      property.data?.value !== null
    ) {
      return (
        <div className="BlockMultiValues">
          {Object.entries(property?.data?.value).map(
            ([itemName, itemValue]) => (
              <div className="BlockMultiValue" key={`${itemName}-${itemValue}`}>
                <div className="BlockMultiValueKey">
                  {camelCaseToWords(itemName)}
                </div>
                <div className="BlockMultiValueValue">
                  {formatValue(itemValue)}
                </div>
              </div>
            )
          )}
        </div>
      )
    }

    return (
      <Fragment>
        <span className="Num2">{formatValue(property?.data?.value)}</span>{' '}
        <span className="Num4">{formatUnit(property?.data?.unit)}</span>
      </Fragment>
    )
  }

  return (
    <div className={`Block ${className} ${!!property?.data ? '' : 'NoValue'}`}>
      <div className="BlockContent">
        <PinButton propertyId={getPropertyUniqueId(property.config)} />
        <div className="BlockLabels">
          <span className="BlockCapabilityLabel">
            {camelCaseToWords(property.config.capabilityName)}
          </span>
          {updatedAt && (
            <span className="BlockTimestamp">updated {updatedAt}</span>
          )}
        </div>
        <h4 className="BlockPropertyName">{prettyName(property.config)}</h4>
        {children || <div className="BlockValue">{renderBlockValue()}</div>}
      </div>
    </div>
  )
}

export default observer(Block)
