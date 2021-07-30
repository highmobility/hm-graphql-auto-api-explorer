import '../styles/DashboardPage.scss'
import { observer } from 'mobx-react-lite'
import useMedia from '../hooks/useMedia'
import useMeasure from 'react-use-measure'
import { useMemo, useState } from 'react'
import { useTransition, a } from '@react-spring/web'
import { shuffle } from 'lodash'
import { getPropertyComponent } from '../utils/properties'

const BLOCKS = {
  TWO_BY_TWO: {
    columns: 2,
    rows: 2,
    width: 330,
    height: 330,
  },
  TWO_BY_ONE: {
    columns: 2,
    rows: 1,
    width: 330,
    height: 165,
  },
  SIX_BY_ONE: {
    columns: 6,
    rows: 1,
    width: 680,
    height: 165,
  },
}

function DashboardPage() {
  const properties = [
    {
      id: 0,
      name: 'engine_oil_temperature',
      name_pretty: 'Engine oil temperature',
      capabilityName: 'Diagnostics',
      value: 34,
      type: 'unit.temperature',
      unit: 'celsius',
      block: BLOCKS.TWO_BY_TWO,
    },
    {
      id: 1,
      name: 'battery_level',
      name_pretty: 'Battery level',
      capabilityName: 'Diagnostics',
      value: 100,
      type: 'types.percentage',
      block: BLOCKS.TWO_BY_TWO,
    },
    // {
    //   id: 1,
    //   name: 'Property',
    //   capabilityName: 'TwoByTwo',
    //   value: 500.0,
    //   unit: 'Km',
    //   block: BLOCKS.TWO_BY_TWO,
    // },
    // {
    //   id: 2,
    //   name: 'Property',
    //   capabilityName: 'TwoByTwo',
    //   value: 500.0,
    //   unit: 'Km',
    //   block: BLOCKS.TWO_BY_TWO,
    // },
    // {
    //   id: 3,
    //   name: 'Property',
    //   capabilityName: 'TwoByTwo',
    //   value: 500.0,
    //   unit: 'Km',
    //   block: BLOCKS.TWO_BY_TWO,
    // },
    // {
    //   id: 4,
    //   name: 'Property',
    //   capabilityName: 'TwoByTwo',
    //   value: 500.0,
    //   unit: 'Km',
    //   block: BLOCKS.TWO_BY_TWO,
    // },
    // {
    //   id: 5,
    //   name: 'Property',
    //   capabilityName: 'TwoByTwo',
    //   value: 500.0,
    //   unit: 'Km',
    //   block: BLOCKS.TWO_BY_TWO,
    // },
    // {
    //   id: 6,
    //   name: 'Property',
    //   capabilityName: 'TwoByOne',
    //   value: 500.0,
    //   unit: 'Km',
    //   block: BLOCKS.TWO_BY_ONE,
    // },
    // {
    //   id: 7,
    //   name: 'Property',
    //   capabilityName: 'TwoByOne',
    //   value: 500.0,
    //   unit: 'Km',
    //   block: BLOCKS.TWO_BY_ONE,
    // },
    // {
    //   id: 8,
    //   name: 'Property',
    //   capabilityName: 'TwoByOne',
    //   value: 500.0,
    //   unit: 'Km',
    //   block: BLOCKS.TWO_BY_ONE,
    // },
    // {
    //   id: 9,
    //   name: 'Property',
    //   capabilityName: 'TwoByOne',
    //   value: 500.0,
    //   unit: 'Km',
    //   block: BLOCKS.TWO_BY_ONE,
    // },
    // {
    //   id: 10,
    //   name: 'Property',
    //   capabilityName: 'FourByOne',
    //   value: 500.0,
    //   unit: 'Km',
    //   block: BLOCKS.SIX_BY_ONE,
    // },
  ]

  const numberOfColumns = useMedia(
    ['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'],
    [10, 8, 6],
    8
  )

  const [ref, { width }] = useMeasure()
  const columnWidth = width / numberOfColumns
  const gridPadding = 10
  const [items, setItems] = useState(properties)

  // useEffect(() => {
  //   const t = setInterval(() => setItems(shuffle([...items])), 2000)
  //   return () => clearInterval(t)
  // }, [])

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
    <div className="DashboardPage">
      <div
        className="GridContainer"
        ref={ref}
        style={{ height: Math.max(...heights) }}
      >
        {transitions((style, item) => {
          const PropertyComponent = getPropertyComponent(item)

          return (
            <a.div className="GridItemContainer" style={style}>
              <div className="GridItem" style={{ padding: `${gridPadding}px` }}>
                <PropertyComponent property={item} />
              </div>
            </a.div>
          )
        })}
      </div>
    </div>
  )
}

export default observer(DashboardPage)
