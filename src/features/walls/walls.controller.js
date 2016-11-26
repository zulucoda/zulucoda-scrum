/**
 * Created by Muzikayise Flynn Buthelezi (zuluCoda) on 2016/11/26.
 * Copyright mfbproject.co.za - muzi@mfbproject.co.za
 * Copyright zulucoda - mfbproject
 */
import angular from 'angular';

function WallsController() {

  let wall = this;

  wall.walls = [];

}

export default angular.module('zulucoda.scrum.walls.controller', [])
  .controller('WallsController', WallsController)
  .name;