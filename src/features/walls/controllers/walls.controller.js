/**
 * Created by Muzikayise Flynn Buthelezi (zuluCoda) on 2016/11/26.
 * Copyright mfbproject.co.za - muzi@mfbproject.co.za
 * Copyright zulucoda - mfbproject
 */
import angular from 'angular';

import wallsService from '../services/walls.service';

function WallsController(WallsService, $uibModal) {

  let wall = this;

  wall.walls = [];

  WallsService.getAll().then((results) => {
    wall.walls = results.data.walls;
  });

  wall.open = () => {

    $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: require('./../partials/walls.modal.html'),
      controller: '',
      controllerAs: '',
      size: 'lg',
      resolve: {
        items: function () {
          // return $ctrl.items;
        }
      }
    });

  };
}

export default angular.module('zulucoda.scrum.walls.controller', [
  wallsService
])
  .controller('WallsController', WallsController)
  .name;