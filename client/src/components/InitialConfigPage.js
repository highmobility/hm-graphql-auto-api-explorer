import { ENVIRONMENTS } from '../store/InitialConfig'
import { useMobx } from '../store/mobx'
import '../styles/InitialConfigPage.scss'
import ConfigGroup from './ConfigGroup'
import EnvironmentSelector from './EnvironmentSelector'
import PrimaryButton from './PrimaryButton'
import TextArea from './TextArea'
import TextInput from './TextInput'

export default function InitialConfigPage() {
  const { initialConfig } = useMobx()

  const inputTips = {
    ENV: {},
    APP_CONFIG: {
      appId: {
        title: 'Where is my App ID?',
        text: 'First create an app, and then open it. You will find it below your app’s name.',
      },
      clientPrivateKey: {
        title: 'Where is my client private key?',
        text: 'Go to your profile menu and then to My settings. There, follow the API keys tab',
      },
    },
    OAUTH: {
      clientId: {
        title: 'Where are the OAuth credentials',
        text: 'Go to your profile menu and then to My settings. There, follow the OAuth client tab',
      },
    },
  }

  return (
    <div className="InitialConfigPage">
      <header className="InitialConfigHeader">
        <h2>Set the configuration</h2>
        <p>
          Configure the app to get started. You can find detailed instructions
          in the README of where to find the information.
        </p>
      </header>
      <section className="InitialConfigContent">
        <h5 className="SubHeader">Work environment</h5>
        <ConfigGroup tip={inputTips.ENV[initialConfig.focusedInput]}>
          <EnvironmentSelector
            title="Develop"
            subtitle="Working with virtual simulators to test out High Mobility"
            checked={initialConfig.env === ENVIRONMENTS.DEVELOP}
            onClick={() => initialConfig.setEnv(ENVIRONMENTS.DEVELOP)}
          />
          <EnvironmentSelector
            title="Production"
            subtitle="Working with your car to gather real data"
            checked={initialConfig.env === ENVIRONMENTS.PRODUCTION}
            onClick={() => initialConfig.setEnv(ENVIRONMENTS.PRODUCTION)}
          />
        </ConfigGroup>
        <h5 className="SubHeader">App configuration</h5>
        <ConfigGroup tip={inputTips.APP_CONFIG[initialConfig.focusedInput]}>
          <TextInput
            name="appId"
            value={initialConfig.appId}
            placeholder="App ID"
            onChange={(e) => initialConfig.setAppId(e.target.value)}
            onFocus={() => initialConfig.setFocusedInput('appId')}
          />
          <TextInput
            name="clientPrivateKey"
            value={initialConfig.clientPrivateKey}
            placeholder="Client private key"
            onChange={(e) => initialConfig.setClientPrivateKey(e.target.value)}
            onFocus={() => initialConfig.setFocusedInput('clientPrivateKey')}
          />
          <TextArea
            name="clientPrivateKey"
            value={initialConfig.clientCertificate}
            placeholder="Client certificate"
            onChange={(e) => initialConfig.setClientCertificate(e.target.value)}
            onFocus={() => initialConfig.setFocusedInput('clientCertificate')}
          />
        </ConfigGroup>
        <h5 className="SubHeader">OAuth credentials</h5>
        <ConfigGroup tip={inputTips.OAUTH[initialConfig.focusedInput]}>
          <TextInput
            name="clientId"
            value={initialConfig.clientId}
            placeholder="OAuth2 client ID"
            onChange={(e) => initialConfig.setClientId(e.target.value)}
            onFocus={() => initialConfig.setFocusedInput('clientId')}
          />
          <TextInput
            name="clientSecret"
            value={initialConfig.clientSecret}
            placeholder="OAuth2 client secret"
            onChange={(e) => initialConfig.setClientSecret(e.target.value)}
            onFocus={() => initialConfig.setFocusedInput('clientSecret')}
          />
          <TextInput
            name="authUrl"
            value={initialConfig.authUrl}
            placeholder="OAuth2 Auth URI"
            onChange={(e) => initialConfig.setAuthUrl(e.target.value)}
            onFocus={() => initialConfig.setFocusedInput('authUrl')}
          />
          <TextInput
            name="tokenUrl"
            value={initialConfig.tokenUrl}
            placeholder="OAuth2 Token URI"
            onChange={(e) => initialConfig.setTokenUrl(e.target.value)}
            onFocus={() => initialConfig.setFocusedInput('tokenUrl')}
          />
          <div className="TokenInfo">
            <label>Add the following URI</label>
            <p className="small">http://localhost:8080/auth/callback</p>
          </div>
        </ConfigGroup>
        <ConfigGroup>
          <PrimaryButton>Get started</PrimaryButton>
        </ConfigGroup>
      </section>
    </div>
  )
}
