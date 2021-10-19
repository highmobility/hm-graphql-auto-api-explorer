import { useEffect, useState } from 'react'
import '../styles/ConfigGroup.scss'
import ConfigGroupTip from './ConfigGroupTip'

export default function ConfigGroup({ children, tip = null }) {
  const [shownTip, setShownTip] = useState(null)

  useEffect(() => {
    if (!tip) return

    setShownTip(tip)
  }, [tip])

  return (
    <div className="ConfigGroup">
      <div className="ConfigGroupContent">{children}</div>
      <div className="ConfigGroupTips">
        {shownTip && (
          <ConfigGroupTip title={shownTip.title}>
            <span dangerouslySetInnerHTML={{ __html: shownTip.text }} />
          </ConfigGroupTip>
        )}
      </div>
    </div>
  )
}
