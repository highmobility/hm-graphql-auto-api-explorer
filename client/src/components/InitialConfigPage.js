import { observer } from 'mobx-react-lite'
import { useHistory } from 'react-router-dom'
import { AUTH_CALLBACK_URL, setConfig } from '../requests'
import routes, { PAGES } from '../routes'
import { ENVIRONMENTS } from '../store/Config'
import { useMobx } from '../store/mobx'
import '../styles/InitialConfigPage.scss'
import ConfigGroup from './ConfigGroup'
import EnvironmentSelector from './EnvironmentSelector'
import PrimaryButton from './PrimaryButton'
import TextArea from './TextArea'
import TextInput from './TextInput'

function InitialConfigPage() {
  const { config } = useMobx()
  const history = useHistory()

  const errors = {}
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

  const onSubmit = async (e) => {
    e.preventDefault()
    if (Object.keys(errors).length > 0) {
      return
    }

    await setConfig(config)

    history.push(
      routes.find((route) => route.name === PAGES.CONNECT_VEHICLE).path
    )
  }

  return (
    <div className="InitialConfigPage">
      <header className="InitialConfigHeader">
        <div className="InitialConfigHeaderContent">
          <h2>Set the configuration</h2>
          <p>
            Configure the app to get started. You can find detailed instructions
            in the README of where to find the information.
          </p>
        </div>
      </header>
      <section className="InitialConfigContent">
        <form noValidate spellCheck="false" onSubmit={(e) => onSubmit(e)}>
          <h5 className="SubHeader">Work environment</h5>
          <ConfigGroup tip={inputTips.ENV[config.focusedInput]}>
            <EnvironmentSelector
              title="Develop"
              subtitle="Working with virtual simulators to test out High Mobility"
              checked={config.env === ENVIRONMENTS.DEVELOP}
              onClick={() => config.setEnv(ENVIRONMENTS.DEVELOP)}
            />
            <EnvironmentSelector
              title="Production"
              subtitle="Working with your car to gather real data"
              checked={config.env === ENVIRONMENTS.PRODUCTION}
              onClick={() => config.setEnv(ENVIRONMENTS.PRODUCTION)}
            />
          </ConfigGroup>
          <h5 className="SubHeader">App configuration</h5>
          <ConfigGroup tip={inputTips.APP_CONFIG[config.focusedInput]}>
            <TextInput
              name="appId"
              value={config.appId}
              placeholder="App ID"
              onChange={(e) => config.setAppId(e.target.value)}
              onFocus={() => config.setFocusedInput('appId')}
            />
            <TextInput
              name="clientPrivateKey"
              value={config.clientPrivateKey}
              placeholder="Client private key"
              onChange={(e) => config.setClientPrivateKey(e.target.value)}
              onFocus={() => config.setFocusedInput('clientPrivateKey')}
            />
            <TextArea
              name="clientPrivateKey"
              value={config.clientCertificate}
              placeholder="Client certificate"
              onChange={(e) => config.setClientCertificate(e.target.value)}
              onFocus={() => config.setFocusedInput('clientCertificate')}
            />
          </ConfigGroup>
          <h5 className="SubHeader">OAuth credentials</h5>
          <ConfigGroup tip={inputTips.OAUTH[config.focusedInput]}>
            <TextInput
              name="clientId"
              value={config.clientId}
              placeholder="OAuth2 client ID"
              onChange={(e) => config.setClientId(e.target.value)}
              onFocus={() => config.setFocusedInput('clientId')}
            />
            <TextInput
              name="clientSecret"
              value={config.clientSecret}
              placeholder="OAuth2 client secret"
              onChange={(e) => config.setClientSecret(e.target.value)}
              onFocus={() => config.setFocusedInput('clientSecret')}
            />
            <TextInput
              name="authUrl"
              value={config.authUrl}
              placeholder="OAuth2 Auth URI"
              onChange={(e) => config.setAuthUrl(e.target.value)}
              onFocus={() => config.setFocusedInput('authUrl')}
            />
            <TextInput
              name="tokenUrl"
              value={config.tokenUrl}
              placeholder="OAuth2 Token URI"
              onChange={(e) => config.setTokenUrl(e.target.value)}
              onFocus={() => config.setFocusedInput('tokenUrl')}
            />
            <div className="TokenInfo">
              <label>Add the following redirect URI</label>
              <p className="small">{AUTH_CALLBACK_URL}</p>
            </div>
          </ConfigGroup>
          <ConfigGroup>
            <PrimaryButton type="submit">Get started</PrimaryButton>
          </ConfigGroup>
        </form>
      </section>
    </div>
  )
}

export default observer(InitialConfigPage)
