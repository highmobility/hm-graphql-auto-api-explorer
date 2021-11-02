import React from 'react'
import '../styles/Grid.scss'
import useMedia from '../hooks/useMedia'
import useMeasure from 'react-use-measure'
import { useMemo } from 'react'
import { useTransition, a } from '@react-spring/web'
import { VIEWS } from '../store/Config'

export default function Grid({ items, view = VIEWS.GRID }) {
  const numberOfGridColumns = useMedia(
    [
      '(min-width: 1500px)',
      '(min-width: 1000px)',
      '(min-width: 846px)',
      '(min-width: 0',
    ],
    [10, 8, 6, 4]
  )

  const numberOfColumns = view === VIEWS.GRID ? numberOfGridColumns : 1

  const [ref, { width }] = useMeasure()
  const columnWidth = width / numberOfColumns

  const [heights, gridItems] = useMemo(() => {
    let gridItems = [] // Added items
    let heights = new Array(numberOfColumns).fill(0) // Heights of the columns
    let column = 0 // Column to use next

    const fitsInRow = (item) => {
      if (view !== VIEWS.GRID) return true
      for (let i = 0; i < item.block.columns; i++) {
        if (heights[column + i] !== heights[column]) return false
      }

      return true
    }

    let loop = 0
    while (gridItems.length < items.length) {
      if (loop > 1000) break

      const itemToAdd = items.find((item) => {
        return (
          !gridItems.some((addedItem) => item.id === addedItem.id) &&
          fitsInRow(item)
        )
      })

      if (view === VIEWS.MAP) {
        gridItems.push({
          ...itemToAdd,
          x: width / 2,
          y: heights[0],
          width: width / 2,
          height: itemToAdd.block.height,
        })
        heights[0] += itemToAdd.block.height
      } else if (view === VIEWS.LIST) {
        gridItems.push({
          ...itemToAdd,
          x: 0,
          y: heights[0],
          width,
          height: itemToAdd.block.height,
        })
        heights[0] += itemToAdd.block.height
      } else {
        if (itemToAdd) {
          const x = (width / numberOfColumns) * column
          const y = heights[column]

          gridItems.push({
            ...itemToAdd,
            x,
            y,
            width: itemToAdd.block.columns * columnWidth,
            height: itemToAdd.block.height,
          })

          for (let i = 0; i < itemToAdd.block.columns; i++) {
            heights[column + i] += itemToAdd.block.height
          }
          column = heights.indexOf(Math.min(...heights))
        } else {
          for (let i = 0; i < numberOfColumns; i++) {
            heights[i] = Math.max(...heights)
          }
          column = 0
        }
      }

      loop++
    }

    return [heights, gridItems]
  }, [numberOfColumns, items, width, columnWidth, view])

  const transitions = useTransition(gridItems, {
    key: (item) => item.id,
    from: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 0 }),
    enter: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 1 }),
    update: ({ x, y, width, height }) => ({ x, y, width, height }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 100 },
    trail: 25,
  })

  const getClassName = () => {
    if (view === VIEWS.LIST) return 'ListView'
    if (view === VIEWS.MAP) return 'MapView'
    return 'GridView'
  }

  return (
    <div
      className={`Grid ${getClassName()}`}
      ref={ref}
      style={{ height: Math.max(...heights) }}
    >
      {transitions((style, item) => {
        const PropertyComponent = item.block.component

        return (
          <a.div className="GridItemContainer" style={style}>
            <div className="GridItem">
              <PropertyComponent property={item} />
            </div>
          </a.div>
        )
      })}
    </div>
  )
}
