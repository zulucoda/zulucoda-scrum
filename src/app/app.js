import angular from 'angular'
import routing from './app.config'
import uiRouter from 'angular-ui-router'
import uiBootstrap from 'angular-ui-bootstrap'
import walls from './../features/walls/walls.index'
import stories from './../features/stories/stories.index'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../node_modules/font-awesome/css/font-awesome.css'
import '../style/lib/right.dark.css'
import 'font-awesome-webpack'
import '../style/app.css'

const MODULE_NAME = 'zulucoda.scrum';

angular.module(MODULE_NAME, [uiRouter, uiBootstrap, walls, stories])
  .config(routing);

export default MODULE_NAME;