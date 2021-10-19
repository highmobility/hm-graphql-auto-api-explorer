import { differenceInHours, format, formatDistanceStrict } from 'date-fns'
import { camelCase, startCase, upperFirst } from 'lodash'
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
import { camelCaseToWords } from '../utils/strings'
import PinButton from './PinButton'

function Block({ children, property, className = '' }) {
  const [updatedAt, setUpdatedAt] = useState('')

  const changeUpdatedAt = useCallback(() => {
    if (!property.value) return ''

    if (differenceInHours(new Date(), new Date(property.updated_at)) > 24) {
      return setUpdatedAt(
        format(new Date(property.updated_at), "dd.MM.yyyy 'at' HH:mm")
      )
    }

    return setUpdatedAt(
      formatDistanceStrict(new Date(property.updated_at), new Date(), {
        addSuffix: true,
      })
    )
  }, [property.updated_at, property.value])

  useEffect(() => {
    changeUpdatedAt()
  }, [property.updated_at, property.value, changeUpdatedAt])

  useInterval(() => {
    changeUpdatedAt()
  }, 1000)

  const renderBlockMultiValue = (item) => {
    if (typeof item.data === 'object' && item.data !== null) {
      // if property.items > 2, render as label1:value; label2: value2
      if (Object.keys(item.data).length > 2) {
        return (
          <div className="BlockMultiValues">
            {property.config.items.map((configItem) => {
              return (
                <div className="BlockMultiValue" key={configItem?.name_cased}>
                  <div className="BlockMultiValueKey">
                    {startCase(
                      camelCase(
                        configItem?.name_pretty || configItem?.name_cased
                      )
                    )}
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
          <Fragment>
            <div className="BlockMultiValueKey">
              {camelCaseToWords(
                item.data?.[property.config?.items?.[0]?.name_cased]
              )}
            </div>
            <div className="BlockMultiValueValue">
              {parseCustomValue(item, property.config)}
            </div>
          </Fragment>
        )
      }

      return (
        <div className="BlockMultiValueValue">{formatValue(item.data)}</div>
      )
    }

    return formatValue(item.data)
  }

  const renderBlockValue = () => {
    if (Array.isArray(property?.data)) {
      return (
        <div className="BlockMultiValues">
          {property?.data.map((item, key) => (
            <div className="BlockMultiValue" key={key}>
              {renderBlockMultiValue(item)}
            </div>
          ))}
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
          {property.data && (
            <span className="BlockTimestamp">updated {updatedAt}</span>
          )}
        </div>
        <h4 className="BlockPropertyName">
          {upperFirst(camelCaseToWords(property.config.name_cased))}
        </h4>
        {children || <div className="BlockValue">{renderBlockValue()}</div>}
      </div>
    </div>
  )
}

export default observer(Block)
