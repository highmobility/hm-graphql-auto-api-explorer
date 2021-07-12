import '../styles/HomePage.scss';
import GrayCircles from './GrayCircles';
import PrimaryButton from './PrimaryButton';

export default function HomePage() {
  return (
    <div className="HomePage">
      <div className="HomePageContent">
        <h2 className="Header">The Car Explorer</h2>
        <p className="Description">A GraphQL sample app to test your car</p>
        <GrayCircles />
        <PrimaryButton>Get started</PrimaryButton>
      </div>
    </div>
  );
}
