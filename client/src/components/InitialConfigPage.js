import { useState } from 'react';
import '../styles/InitialConfigPage.scss';
import ConfigGroup from './ConfigGroup';
import EnvironmentSelector from './EnvironmentSelector';
import PrimaryButton from './PrimaryButton';
import TextArea from './TextArea';
import TextInput from './TextInput';

export default function InitialConfigPage() {
  const ENVIRONMENTS = {
    DEVELOP: 'DEVELOP',
    PRODUCTION: 'PRODUCTION',
  };
  const [focusedInput, setFocusedInput] = useState(null);
  const [env, setEnv] = useState(ENVIRONMENTS.DEVELOP);
  const [appId, setAppId] = useState('');
  const [clientPrivateKey, setClientPrivateKey] = useState('');
  const [clientCertificate, setClientCertificate] = useState('');
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [authUrl, setAuthUrl] = useState('');
  const [tokenUrl, setTokenUrl] = useState('');

  const inputTips = {
    ENV: {

    },
    APP_CONFIG: {
      appId: {
        title: 'Where is my App ID?',
        text: 'First create an app, and then open it. You will find it below your app’s name.'
      },
      clientPrivateKey: {
        title: 'Where is my client private key?',
        text: 'Go to your profile menu and then to My settings. There, follow the API keys tab',
      }
    },
    OAUTH: {
      clientId: {
        title: 'Where are the OAuth credentials',
        text: 'Go to your profile menu and then to My settings. There, follow the OAuth client tab'
      }
    }
  };

  return (
    <div className="InitialConfigPage">
      <header className="InitialConfigHeader">
        <h2>Set the configuration</h2>
        <p>Configure the app to get started. You can find detailed instructions in the README of where to find the information.</p>
      </header>
      <section className="InitialConfigContent">
        <h5 className="SubHeader">Work environment</h5>
        <ConfigGroup tip={inputTips.ENV[focusedInput]}>
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
        </ConfigGroup>
        <h5 className="SubHeader">App configuration</h5>
        <ConfigGroup tip={inputTips.APP_CONFIG[focusedInput]}>
          <TextInput
            name="appId"
            value={appId}
            placeholder="App ID"
            onChange={e => setAppId(e.target.value)}
            onFocus={() => setFocusedInput('appId')}
          />
          <TextInput
            name="clientPrivateKey"
            value={clientPrivateKey}
            placeholder="Client private key"
            onChange={e => setClientPrivateKey(e.target.value)}
            onFocus={() => setFocusedInput('clientPrivateKey')}
          />
          <TextArea
            name="clientPrivateKey"
            value={clientCertificate}
            placeholder="Client certificate"
            onChange={e => setClientCertificate(e.target.value)}
            onFocus={() => setFocusedInput('clientCertificate')}
          />
        </ConfigGroup>
        <h5 className="SubHeader">OAuth credentials</h5>
        <ConfigGroup tip={inputTips.OAUTH[focusedInput]}>
         <TextInput
            name="clientId"
            value={clientId}
            placeholder="OAuth2 client ID"
            onChange={e => setClientId(e.target.value)}
            onFocus={() => setFocusedInput('clientId')}
          />
          <TextInput
            name="clientSecret"
            value={clientSecret}
            placeholder="OAuth2 client secret"
            onChange={e => setClientSecret(e.target.value)}
            onFocus={() => setFocusedInput('clientSecret')}
          />
          <TextInput
            name="authUrl"
            value={authUrl}
            placeholder="OAuth2 Auth URI"
            onChange={e => setAuthUrl(e.target.value)}
            onFocus={() => setFocusedInput('authUrl')}
          />
          <TextInput
            name="tokenUrl"
            value={tokenUrl}
            placeholder="OAuth2 Token URI"
            onChange={e => setTokenUrl(e.target.value)}
            onFocus={() => setFocusedInput('tokenUrl')}
          />
          <div className="TokenInfo">
            <label>Add the following URI</label>
            <p className="small">http://localhost:8080/auth/callback</p>
          </div>
        </ConfigGroup>
        <ConfigGroup>
          <PrimaryButton>
            Get started
          </PrimaryButton>
        </ConfigGroup>
      </section>
    </div>
  );
}
