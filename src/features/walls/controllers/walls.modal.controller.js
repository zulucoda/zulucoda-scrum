/**
 * Created by Muzikayise Flynn Buthelezi (zuluCoda) on 2016/11/27.
 * Copyright mfbproject.co.za - muzi@mfbproject.co.za
 * Copyright zulucoda - mfbproject
 */
import angular from 'angular';

function WallsModalController ($uibModalInstance) {

  let wallModal = this;

  wallModal.cancel = () => {
    $uibModalInstance.dismiss('cancel');
  };

  wallModal.add = () => {
    $uibModalInstance.close();
  };

}

export default angular.module('zulucoda.scrum.walls.modal.controller', [])
  .controller('WallsModalController', WallsModalController)
  .name;
