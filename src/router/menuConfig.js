// 菜单配置
export const menuConfig = [
  {
    id: 'dashboard',
    title: '儀表板',
    icon: '📊',
    children: [
      {
        id: 'dashboard-overview',
        title: '總覽',
        path: '/',
        icon: '🏠'
      },
      {
        id: 'dashboard-stats',
        title: '統計圖表',
        path: '/dashboard/stats',
        icon: '📈'
      }
    ]
  },
  {
    id: 'system',
    title: '系統管理',
    icon: '🔧',
    children: [
      {
        id: 'system-info',
        title: '系統資訊',
        path: '/system/info',
        icon: 'ℹ️'
      },
      {
        id: 'system-settings',
        title: '系統設定',
        path: '/settings',
        icon: '⚙️'
      }
    ]
  },
  {
    id: 'about',
    title: '關於',
    icon: '📖',
    children: [
      {
        id: 'about-app',
        title: '應用資訊',
        path: '/about',
        icon: 'ℹ️'
      },
      {
        id: 'about-version',
        title: '版本歷史',
        path: '/about/version',
        icon: '📝'
      }
    ]
  }
]
