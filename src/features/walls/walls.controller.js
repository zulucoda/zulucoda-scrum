/**
 * Created by Muzikayise Flynn Buthelezi (zuluCoda) on 2016/11/26.
 * Copyright mfbproject.co.za - muzi@mfbproject.co.za
 * Copyright zulucoda - mfbproject
 */
import angular from 'angular';

import wallsService from './walls.service';

function WallsController(WallsService) {

  let wall = this;

  wall.walls = [];

  WallsService.getAll().then(function (results) {
    wall.walls = results;
  })
}

export default angular.module('zulucoda.scrum.walls.controller', [
  wallsService
])
  .controller('WallsController', WallsController)
  .name;