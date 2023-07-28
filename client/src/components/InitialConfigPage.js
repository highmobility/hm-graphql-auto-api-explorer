import { observer } from 'mobx-react-lite'
import { Fragment, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AUTH_CALLBACK_URL, setAppConfig } from '../requests'
import routes, { PAGES } from '../routes'
import { APP_TYPES } from '../store/Config'
import { useMobx } from '../store/mobx'
import '../styles/InitialConfigPage.scss'
import ConfigGroup from './ConfigGroup'
import AppTypeSelector from './AppTypeSelector'
import PrimaryButton from './PrimaryButton'
import TextArea from './TextArea'
import TextInput from './TextInput'

function InitialConfigPage() {
  const { config } = useMobx()
  const [formErrors, setFormErrors] = useState(null)
  const history = useHistory()

  const inputTips = {
    ENV: {},
    GRAPH_QL: {
      graphQlApiConfig: {
        title: 'Where can I find the graphQL config?',
        text: 'First create an app, and then open it. There, follow the Client Certificate tab and select graphQL',
      },
    },
    FLEET: {
      fleetApiConfig: {
        title: 'Where can I find the fleet config?',
        text: `First create a production app, and then open it. There, follow the Service Account Keys tab and click <b style="font-size: 20px;">+</b> to generate a new key`,
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
    if (formErrors && Object.values(formErrors).some((v) => !!v)) {
      return
    }

    await setAppConfig(config)

    history.push(
      routes.find((route) => route.name === PAGES.CONNECT_VEHICLE).path
    )
  }

  const graphQlConfigPlaceholder = `
{
    "version": "2.0",
    "type": "graph_ql_api",
    "client_serial_number": "FC2E6591508076A340",
    "private_key_id": "52201da6-2ace-493b-a452-52b01f411e4f",
    "private_key": "-----BEGIN PRIVATE KEY-----\\nMIJHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgLGiezYu5j/HYwP2W\\nl0e7eZsPNcuvIL6ljHc3BOoWN1ihRANCAAS559L2+61A7/iq+gsESy/yoDvUz6Wu\\ntUXBd7mnjljMTnrxyN3MATTe/PgB9IPcwe0CpbHrun2LIGGisnVeC3nV\\n-----END PRIVATE KEY-----",
    "app_uri": "https://sandbox.graphql-api.develop.high-mobility.net/v1",
    "app_id": "0DBC89CFA8877576049081FB"
}`.trim()

  const fleetApiConfigPlaceholder = `
{
    "inserted_at": "2021-09-22T12:34:00",
    "private_key":
      "-----BEGIN PRIVATE KEY-----\\nMIGHAgEAMBMGByqGSM42AgEGCCqGSM49AwEHBG0wawIBAQQgzuoeVzHHKv4f3miV\\nBwqvnlGDOSlghuBO8MU4QE5OdCuhRANCAAFNa1XKAfpKJbiYirja/HOq58Pd50mh\\na0fk2vuURwHjE55hNCdls6ZgAvpMRtl6tD5BgKHPlcPdTvya51WCSFtY\\n-----END PRIVATE KEY-----",
    "id": "e2b0f57d-df92-4a43-aa0a-c8ab61ec1b21",
}`.trim()

  const validateGraphQlConfig = (config) => {
    if (!config)
      return setFormErrors({
        ...formErrors,
        graphQlApiConfig: `Field is required`,
      })
    try {
      const parsedConfig = JSON.parse(config)
      const { version, private_key, app_uri, app_id, client_serial_number } =
        parsedConfig

      if (!version) {
        return setFormErrors({
          ...formErrors,
          graphQlApiConfig: `Missing 'version' property`,
        })
      }

      if (!private_key) {
        return setFormErrors({
          graphQlApiConfig: `Missing 'private_key' property`,
        })
      }

      if (!app_uri) {
        return setFormErrors({
          ...formErrors,
          graphQlApiConfig: `Missing 'app_uri' property`,
        })
      }

      if (!app_id) {
        return setFormErrors({
          ...formErrors,
          graphQlApiConfig: `Missing 'app_id' property`,
        })
      }

      if (!client_serial_number) {
        return setFormErrors({
          ...formErrors,
          graphQlApiConfig: `Missing 'client_serial_number' property`,
        })
      }

      return setFormErrors({ ...formErrors, graphQlApiConfig: null })
    } catch (e) {
      console.log(e)
      return setFormErrors({ ...formErrors, graphQlApiConfig: 'Invalid JSON' })
    }
  }

  const validateFleetApiConfig = (fleetConfig) => {
    if (config.appType !== APP_TYPES.FLEET)
      return setFormErrors({
        ...formErrors,
        fleetApiConfig: null,
      })

    if (!fleetConfig)
      return setFormErrors({
        ...formErrors,
        fleetApiConfig: `Field is required`,
      })
    try {
      const parsedConfig = JSON.parse(fleetConfig)
      const { private_key, id } = parsedConfig

      if (!private_key) {
        return setFormErrors({
          ...formErrors,
          fleetApiConfig: `Missing 'private_key' property`,
        })
      }

      if (!id) {
        return setFormErrors({
          ...formErrors,
          fleetApiConfig: `Missing 'id' property`,
        })
      }

      return setFormErrors({ ...formErrors, fleetApiConfig: null })
    } catch (e) {
      console.log(e)
      return setFormErrors({ ...formErrors, fleetApiConfig: 'Invalid JSON' })
    }
  }

  const validateRequired = (field, value) => {
    setFormErrors({
      ...formErrors,
      [field]: !!value ? null : 'Field is required',
    })
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
          <h5 className="SubHeader">App type</h5>
          <AppTypeSelector
            title="Driver App"
            subtitle="Working with individual vehicles"
            checked={config.appType === APP_TYPES.DRIVER}
            onClick={() => config.setAppType(APP_TYPES.DRIVER)}
          />
          <AppTypeSelector
            title="Fleet App"
            subtitle="Working with a fleet of vehicles"
            checked={config.appType === APP_TYPES.FLEET}
            onClick={() => config.setAppType(APP_TYPES.FLEET)}
          />
          <h5 className="SubHeader">App configuration</h5>
          <label className="InputHeader">GraphQL config</label>
          <ConfigGroup tip={inputTips.GRAPH_QL[config.focusedInput]}>
            <TextArea
              height={450}
              value={config.graphQlApiConfig}
              placeholder={graphQlConfigPlaceholder}
              onChange={(e) => config.setGraphQlApiConfig(e.target.value)}
              onFocus={() => config.setFocusedInput('graphQlApiConfig')}
              onBlur={() => validateGraphQlConfig(config.graphQlApiConfig)}
              error={formErrors?.graphQlApiConfig}
            />
          </ConfigGroup>
          {config.appType === APP_TYPES.FLEET && (
            <Fragment>
              <label className="InputHeader">SERVICE ACCOUNT CONFIG</label>
              <ConfigGroup tip={inputTips.FLEET[config.focusedInput]}>
                <TextArea
                  height={340}
                  value={config.fleetApiConfig}
                  placeholder={fleetApiConfigPlaceholder}
                  onChange={(e) => config.setFleetApiConfig(e.target.value)}
                  onFocus={() => config.setFocusedInput('fleetApiConfig')}
                  onBlur={() => validateFleetApiConfig(config.fleetApiConfig)}
                  error={formErrors?.fleetApiConfig}
                />
              </ConfigGroup>
            </Fragment>
          )}
          <h5 className="SubHeader">OAuth credentials</h5>
          <ConfigGroup tip={inputTips.OAUTH[config.focusedInput]}>
            <TextInput
              name="clientId"
              value={config.clientId}
              placeholder="OAuth2 client ID"
              onChange={(e) => config.setClientId(e.target.value)}
              onFocus={() => config.setFocusedInput('clientId')}
              onBlur={() => validateRequired('clientId', config.clientId)}
              error={formErrors?.clientId}
            />
            <TextInput
              name="clientSecret"
              value={config.clientSecret}
              placeholder="OAuth2 client secret"
              onChange={(e) => config.setClientSecret(e.target.value)}
              onFocus={() => config.setFocusedInput('clientSecret')}
              onBlur={() =>
                validateRequired('clientSecret', config.clientSecret)
              }
              error={formErrors?.clientSecret}
            />
            <TextInput
              name="authUrl"
              value={config.authUrl}
              placeholder="OAuth2 Auth URI"
              onChange={(e) => config.setAuthUrl(e.target.value)}
              onFocus={() => config.setFocusedInput('authUrl')}
              onBlur={() => validateRequired('authUrl', config.authUrl)}
              error={formErrors?.authUrl}
            />
            <TextInput
              name="tokenUrl"
              value={config.tokenUrl}
              placeholder="OAuth2 Token URI"
              onChange={(e) => config.setTokenUrl(e.target.value)}
              onFocus={() => config.setFocusedInput('tokenUrl')}
              onBlur={() => validateRequired('tokenUrl', config.tokenUrl)}
              error={formErrors?.tokenUrl}
            />
            {config.appType === APP_TYPES.DRIVER && (
              <div className="TokenInfo">
                <label>Add the following redirect URI</label>
                <p className="small">{AUTH_CALLBACK_URL}</p>
              </div>
            )}
          </ConfigGroup>
          <ConfigGroup>
            <PrimaryButton className="SubmitButton" type="submit">
              Get started
            </PrimaryButton>
          </ConfigGroup>
        </form>
      </section>
    </div>
  )
}

export default observer(InitialConfigPage)
