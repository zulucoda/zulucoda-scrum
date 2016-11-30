import angular from 'angular'
import routing from './app.config'
import uiRouter from 'angular-ui-router'
import uiBootstrap from 'angular-ui-bootstrap'
import walls from './../features/walls/walls.index'
import stories from './../features/stories/stories.index'
import scroll from '../common/scroll-directive/scroll-directive'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../node_modules/font-awesome/css/font-awesome.css'
import '../../node_modules/jquery.scrollbar/jquery.scrollbar.css'
import '../public/style/lib/right.dark.css'
import 'font-awesome-webpack'
import '../public/style/app.css'

require("expose?$!jquery.scrollbar");
require("expose?$!jquery");

const MODULE_NAME = 'zulucoda.scrum';

angular.module(MODULE_NAME, [uiRouter, uiBootstrap, walls, stories, scroll])
  .config(routing);

export default MODULE_NAME;