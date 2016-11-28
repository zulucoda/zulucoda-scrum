/**
 * Created by Muzikayise Flynn Buthelezi (zuluCoda) on 2016/11/27.
 * Copyright mfbproject.co.za - muzi@mfbproject.co.za
 * Copyright zulucoda - mfbproject
 */
import angular from 'angular';

import wallModule from './../modules/wall.module';


function WallsModalController ($uibModalInstance, WallModule) {

  let wallModal = this;

  wallModal.wall = angular.copy(WallModule.wall);

  wallModal.cancel = () => {
    $uibModalInstance.dismiss('cancel');
  };

  wallModal.add = () => {
    $uibModalInstance.close(wallModal.wall);
  };

}

export default angular.module('zulucoda.scrum.walls.modal.controller', [
  wallModule
])
  .controller('WallsModalController', WallsModalController)
  .name;
