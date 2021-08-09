import React from 'react'
import '../styles/Grid.scss'
import useMedia from '../hooks/useMedia'
import useMeasure from 'react-use-measure'
import { useMemo } from 'react'
import { useTransition, a } from '@react-spring/web'

export default function Grid({ items }) {
  const numberOfColumns = useMedia(
    ['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 846px)'],
    [10, 8, 6, 4],
    4
  )

  const [ref, { width }] = useMeasure()
  const columnWidth = width / numberOfColumns
  const gridPadding = 10

  const [heights, gridItems] = useMemo(() => {
    let gridItems = [] // Added items
    let heights = new Array(numberOfColumns).fill(0) // Heights of the columns
    let column = 0 // Column to use next

    const fitsInRow = (item) => {
      for (let i = 0; i < item.block.columns; i++) {
        if (heights[column + i] !== heights[column]) return false
      }

      return true
    }

    let loop = 0
    while (gridItems.length < items.length) {
      if (loop > 100) break

      const itemToAdd = items.find((item) => {
        return (
          !gridItems.some((addedItem) => item.id === addedItem.id) &&
          fitsInRow(item)
        )
      })

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

      loop++
    }

    return [heights, gridItems]
  }, [numberOfColumns, items, width, columnWidth])

  const transitions = useTransition(gridItems, {
    key: (item) => item.id,
    from: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 0 }),
    enter: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 1 }),
    update: ({ x, y, width, height }) => ({ x, y, width, height }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 100 },
    trail: 25,
  })

  return (
    <div className="Grid" ref={ref} style={{ height: Math.max(...heights) }}>
      {transitions((style, item) => {
        const PropertyComponent = item.block.component

        return (
          <a.div className="GridItemContainer" style={style}>
            <div className="GridItem" style={{ padding: `${gridPadding}px` }}>
              <PropertyComponent property={item} />
            </div>
          </a.div>
        )
      })}
    </div>
  )
}
