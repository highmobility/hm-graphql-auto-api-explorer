import { useState } from 'react';
import '../styles/InitialConfigPage.scss';
import EnvironmentSelector from './EnvironmentSelector';

export default function InitialConfigPage() {
  const ENVIRONMENTS = {
    DEVELOP: 'DEVELOP',
    PRODUCTION: 'PRODUCTION',
  };
  const [env, setEnv] = useState(ENVIRONMENTS.DEVELOP)

  return (
    <div className="InitialConfigPage">
      <header className="InitialConfigHeader">
        <h2>Set the configuration</h2>
        <p>Configure the app to get started. You can find detailed instructions in the README of where to find the information.</p>
      </header>
      <section className="InitialConfigContent">
        <h5 className="SubHeader">Work environment</h5>
        <EnvironmentSelector
          title="Develop"
          subtitle="Working with virtual simulators to test out High Mobility"
          checked={env === ENVIRONMENTS.DEVELOP}
          onClick={() => setEnv(ENVIRONMENTS.DEVELOP)}
        />
        <EnvironmentSelector
          title="Production"
          subtitle="Working with your car to gather real data"
          checked={env === ENVIRONMENTS.PRODUCTION}
          onClick={() => setEnv(ENVIRONMENTS.PRODUCTION)}
        />
      </section>
    </div>
  );
}
