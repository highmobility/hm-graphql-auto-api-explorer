import { upperFirst } from 'lodash'
import { observer } from 'mobx-react-lite'
import React, { Fragment } from 'react'
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
  return (
    <div className={`Block ${className} ${!!property?.data ? '' : 'NoValue'}`}>
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
            {Array.isArray(property?.data) ? (
              <div className="BlockMultiValues">
                {property?.data.map((item, key) => (
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
                  {formatValue(property?.data?.value)}
                </span>{' '}
                <span className="Num4">{formatUnit(property?.data?.unit)}</span>
              </Fragment>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default observer(Block)
