import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-use'
import { AUTH_CALLBACK_URL, fetchConfig, setConfig } from '../requests'
import routes, { PAGES } from '../routes'
import { useMobx } from '../store/mobx'
import '../styles/InitialConfigPage.scss'
import ConfigGroup from './ConfigGroup'
import PrimaryButton from './PrimaryButton'
import TextArea from './TextArea'
import TextInput from './TextInput'

function InitialConfigPage() {
  const { config } = useMobx()
  const [formErrors, setFormErrors] = useState(null)
  const history = useHistory()

  const error =
    new URLSearchParams(useLocation().search).get('error') &&
    'Could not connect vehicle. Make sure to open your emulator and give permissions to the Diagnostics capability'

  useEffect(() => {
    const fetch = async () => {
      try {
        const config = await fetchConfig()
        if (config) {
          history.push(
            routes.find((route) => route.name === PAGES.CONNECT_VEHICLE).path
          )
        }
      } catch (e) {
        console.log('Failed to fetch config')
      }
    }

    fetch()
  }, [history])

  const inputTips = {
    ENV: {},
    APP_CONFIG: {
      graphQlApiConfig: {
        title: 'Where can I find the graphQL config?',
        text: 'First create an app, and then open it. There, follow the Client Certificate tab and select graphQL',
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
    if (Object.values(formErrors).some((v) => !!v)) {
      return
    }

    await setConfig(config)

    history.push(
      routes.find((route) => route.name === PAGES.CONNECT_VEHICLE).path
    )
  }

  const graphQlConfigPlaceholder = `
{
    "version": "2.0",
    "type": "graph_ql_api",
    "private_key_id": "52201da6-2ace-493b-a452-52b01f411e4f",
    "private_key": "-----BEGIN PRIVATE KEY-----\\nMIJHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgLGiezYu5j/HYwP2W\\nl0e7eZsPNcuvIL6ljHc3BOoWN1ihRANCAAS559L2+61A7/iq+gsESy/yoDvUz6Wu\\ntUXBd7mnjljMTnrxyN3MATTe/PgB9IPcwe0CpbHrun2LIGGisnVeC3nV\\n-----END PRIVATE KEY-----",
    "app_uri": "https://sandbox.graphql-api.develop.high-mobility.net/",
    "app_id": "0DBC89CFA8877576049081FB",
    "client_serial_number": "FC2E6591508076A340"
}`.trim()

  const validateGraphQlConfig = (config) => {
    if (!config) return setFormErrors({ graphQlApiConfig: `Field is required` })
    try {
      const parsedConfig = JSON.parse(config)

      const { version, private_key, app_uri, app_id, client_serial_number } =
        parsedConfig
      if (!version) {
        return setFormErrors({ graphQlApiConfig: `Missing 'version' property` })
      }
      if (!private_key) {
        return setFormErrors({
          graphQlApiConfig: `Missing 'private_key' property`,
        })
      }
      if (!app_uri) {
        return setFormErrors({ graphQlApiConfig: `Missing 'app_uri' property` })
      }
      if (!app_id) {
        return setFormErrors({ graphQlApiConfig: `Missing 'app_id' property` })
      }
      if (!client_serial_number) {
        return setFormErrors({
          graphQlApiConfig: `Missing 'client_serial_number' property`,
        })
      }

      return setFormErrors({ graphQlApiConfig: null })
    } catch (e) {
      console.log(e)
      return setFormErrors({ graphQlApiConfig: 'Invalid JSON' })
    }
  }

  return (
    <div className="InitialConfigPage">
      {error && <div className="InitialConfigPageError">{error}</div>}
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
          <h5 className="SubHeader">App configuration</h5>
          <ConfigGroup tip={inputTips.APP_CONFIG[config.focusedInput]}>
            <TextArea
              value={config.graphQlApiConfig}
              placeholder={graphQlConfigPlaceholder}
              onChange={(e) => config.setGraphQlApiConfig(e.target.value)}
              onFocus={() => config.setFocusedInput('graphQlApiConfig')}
              onBlur={() => validateGraphQlConfig(config.graphQlApiConfig)}
              error={formErrors?.graphQlApiConfig}
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
