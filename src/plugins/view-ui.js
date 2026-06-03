import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import locale from 'view-ui-plus/dist/locale/zh-TW'

export function setupViewUI(app) {
  app.use(ViewUIPlus, {
    locale,
    transfer: true,
    capture: false,
    select: {
      arrow: 'ios-arrow-down',
      arrowSize: 20
    }
  })
}
