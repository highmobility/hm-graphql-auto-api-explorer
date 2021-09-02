import { Link, useHistory } from 'react-router-dom'
import routes, { PAGES } from '../routes'
import '../styles/HomePage.scss'
import GrayCircles from './GrayCircles'
import PrimaryButton from './PrimaryButton'
import { observer } from 'mobx-react-lite'
import { fetchAppConfig } from '../requests'
import { useEffect } from 'react'

function HomePage() {
  const history = useHistory()

  useEffect(() => {
    const fetch = async () => {
      try {
        const appConfig = await fetchAppConfig()
        if (appConfig) {
          history.push(
            routes.find((route) => route.name === PAGES.DASHBOARD).path
          )
        }
      } catch (e) {
        console.log('Failed to fetch config')
      }
    }

    fetch()
  }, [history])

  return (
    <div className="HomePage">
      <div className="HomePageContent">
        <h2 className="HomePageHeader">The Car Explorer</h2>
        <p className="HomePageDescription">
          A GraphQL sample app to test your car
        </p>
        <GrayCircles />
        <Link
          to={routes.find((route) => route.name === PAGES.INITIAL_CONFIG).path}
        >
          <PrimaryButton>Get started</PrimaryButton>
        </Link>
      </div>
    </div>
  )
}

export default observer(HomePage)
