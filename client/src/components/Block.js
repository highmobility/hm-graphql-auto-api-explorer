import { upperFirst } from 'lodash'
import React, { Fragment } from 'react'
import '../styles/Block.scss'
import { formatValue } from '../utils/properties'
import { camelCaseToWords } from '../utils/strings'
import PinButton from './PinButton'

export default function Block({ children, property, className = '' }) {
  return (
    <div className={`Block ${className}`}>
      <div className="BlockContent">
        <PinButton propertyId={property.id} />
        <span className="BlockCapabilityLabel">
          {property.config.capabilityName}
        </span>
        <h4 className="BlockPropertyName">
          {upperFirst(
            (
              property.config.name_pretty ||
              property.config.name.replace(/_/g, ' ')
            ).toLowerCase()
          )}
        </h4>
        {children || (
          <div className="BlockValue">
            {Array.isArray(property.data) ? (
              <div className="BlockMultiValues">
                {property.data.map((item, key) => (
                  <div className="BlockMultiValue" key={key}>
                    <div className="BlockMultiValueKey">
                      {camelCaseToWords(
                        item.data[property.config.items[0].name]
                      )}
                    </div>
                    <div className="BlockMultiValueValue">
                      {camelCaseToWords(
                        item.data[property.config.items[1].name]
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Fragment>
                <span className="Num2">
                  {formatValue(property?.data?.value)}
                </span>{' '}
                <span className="Num4">{property?.data?.unit}</span>
              </Fragment>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
