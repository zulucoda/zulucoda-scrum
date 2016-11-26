import angular from 'angular';
import routing from './app.config';
import uiRouter from 'angular-ui-router';

import walls from './../features/walls'

import '../style/app.css';

const MODULE_NAME = 'zulucoda.scrum';

angular.module(MODULE_NAME, [uiRouter, walls])
  .config(routing);

export default MODULE_NAME;