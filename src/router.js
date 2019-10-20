import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'dva/router'
import App from './routes/app'

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

const Routers = function ({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/main/index').default)
          cb(null, { component: require('./routes/main/') })
        }, 'working-status')
      },
      childRoutes: [
        {
          path: 'main_2',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/main/index').default)
              cb(null, require('./routes/main_2/'))
            }, 'main_2')
          },
        },
        {
          path: 'planStatus',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/planstatus').default)
              cb(null, require('./routes/planstatus/'))
            }, 'planStatus')
          },
        }, {
          path: 'manageStatus',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/managestatus').default)
              cb(null, require('./routes/managestatus/'))
            }, 'manageStatus')
          },
        }, {
          path: 'databaseStatus',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/databasestatus').default)
              cb(null, require('./routes/databasestatus/'))
            }, 'databaseStatus')
          },
        },

    /* {
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/main/index').default)
          cb(null, { component: require('./routes/main/') })
        }, 'geo-node')
      },
      childRoutes: [
        {
          path: 'iotTwo',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/iotTwo').default)
              cb(null, require('./routes/iotTwo/'))
            }, 'iotTwo')
          },
        }, {
          path: 'iotThree',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/iotThree').default)
              cb(null, require('./routes/iotThree/'))
            }, 'iotThree')
          },
        }, {
          path: 'iotFour',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/iotFour').default)
              cb(null, require('./routes/iotFour/'))
            }, 'iotFour')
          },
        }, {
          path: 'dashboard',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/dashboard'))
              cb(null, require('./routes/dashboard/'))
            }, 'dashboard')
          },
        }, {
          path: 'user',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/user'))
              cb(null, require('./routes/user/'))
            }, 'user')
          },
        }, {
          path: 'user/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/user/detail'))
              cb(null, require('./routes/user/detail/'))
            }, 'user-detail')
          },
        }, {
          path: 'login',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/login'))
              cb(null, require('./routes/login/'))
            }, 'login')
          },
        }, {
          path: 'request',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/request/'))
            }, 'request')
          },
        }, {
          path: 'UIElement/iconfont',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/UIElement/iconfont/'))
            }, 'UIElement-iconfont')
          },
        }, {
          path: 'UIElement/search',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/UIElement/search/'))
            }, 'UIElement-search')
          },
        }, {
          path: 'UIElement/dropOption',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/UIElement/dropOption/'))
            }, 'UIElement-dropOption')
          },
        }, {
          path: 'UIElement/layer',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/UIElement/layer/'))
            }, 'UIElement-layer')
          },
        }, {
          path: 'UIElement/dataTable',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/UIElement/dataTable/'))
            }, 'UIElement-dataTable')
          },
        }, {
          path: 'UIElement/editor',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/UIElement/editor/'))
            }, 'UIElement-editor')
          },
        }, {
          path: 'chart/lineChart',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/chart/lineChart/'))
            }, 'chart-lineChart')
          },
        }, {
          path: 'chart/barChart',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/chart/barChart/'))
            }, 'chart-barChart')
          },
        }, {
          path: 'chart/areaChart',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/chart/areaChart/'))
            }, 'chart-areaChart')
          },
        }, {
          path: 'post',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/post'))
              cb(null, require('./routes/post/'))
            }, 'post')
          },
        }, {
          path: 'stream/nullschool',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/stream/nullschool/'))
            }, 'nullschool')
          },
        }, {
          path: 'stream/status',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/stream/status/'))
            }, 'storm-status')
          },
        }, {
          path: 'fog/wireless',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/fog/wireless'))
              cb(null, require('./routes/fog/wireless/'))
            }, 'fog-wireless')
          },
        },
        {
          path: 'warehouse/status',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/warehouse/status'))
              cb(null, require('./routes/warehouse/status/'))
            }, 'warehouse-status')
          },
        },
        {
          path: 'hello',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/hello/'))
            }, 'hello')
          },
        }*/ {
          path: '*',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/error/'))
            }, 'error')
          },
        },
      ],
    },
  ]

  return <Router history={history} routes={routes} />
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
