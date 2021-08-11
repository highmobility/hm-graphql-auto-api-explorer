import { Link } from 'react-router-dom'
import routes, { PAGES } from '../routes'
import '../styles/HomePage.scss'
import GrayCircles from './GrayCircles'
import PrimaryButton from './PrimaryButton'
import { observer } from 'mobx-react-lite'

function HomePage() {
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
