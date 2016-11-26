/**
 * Created by Muzikayise Flynn Buthelezi (zuluCoda) on 2016/11/26.
 * Copyright mfbproject.co.za - muzi@mfbproject.co.za
 * Copyright zulucoda - mfbproject
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';

import routing from './walls.routes';

export default angular.module('zulucoda.scrum.walls', [uiRouter, routing])
  .name;