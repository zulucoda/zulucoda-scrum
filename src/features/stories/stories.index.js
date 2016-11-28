/**
 * Created by Muzikayise Flynn Buthelezi (zuluCoda) on 2016/11/28.
 * Copyright mfbproject.co.za - muzi@mfbproject.co.za
 * Copyright zulucoda - mfbproject
 */
import angular from 'angular'
import uiRouter from 'angular-ui-router'
import routing from './routes/stories.routes'

export default angular.module('zulucoda.scrum.stories', [uiRouter, routing])
  .name;