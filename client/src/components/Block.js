import { upperFirst } from 'lodash'
import { observer } from 'mobx-react-lite'
import React, { Fragment } from 'react'
import { useMobx } from '../store/mobx'
import '../styles/Block.scss'
import {
  formatValue,
  getPropertyUniqueId,
  parseCustomValue,
} from '../utils/properties'
import { camelCaseToWords } from '../utils/strings'
import PinButton from './PinButton'

function Block({ children, property, className = '' }) {
  const { properties } = useMobx()
  const propertyValues =
    properties.values?.[getPropertyUniqueId(property.config)]

  return (
    <div className={`Block ${className} ${!!propertyValues ? '' : 'NoValue'}`}>
      <div className="BlockContent">
        <PinButton propertyId={getPropertyUniqueId(property.config)} />
        <span className="BlockCapabilityLabel">
          {camelCaseToWords(property.config.capabilityName)}
        </span>
        <h4 className="BlockPropertyName">
          {upperFirst(camelCaseToWords(property.config.name_cased))}
        </h4>
        {children || (
          <div className="BlockValue">
            {Array.isArray(propertyValues) &&
            property.config.type === 'custom' ? (
              <div className="BlockMultiValues">
                {propertyValues.map((item, key) => (
                  <div className="BlockMultiValue" key={key}>
                    <div className="BlockMultiValueKey">
                      {camelCaseToWords(
                        item.data[property.config.items[0].name_cased]
                      )}
                    </div>
                    <div className="BlockMultiValueValue">
                      {parseCustomValue(item, property.config)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Fragment>
                <span className="Num2">
                  {formatValue(propertyValues?.value)}
                </span>{' '}
                <span className="Num4">{propertyValues?.unit}</span>
              </Fragment>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default observer(Block)
