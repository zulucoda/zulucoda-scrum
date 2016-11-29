/**
 * Created by Muzikayise Flynn Buthelezi (zuluCoda) on 2016/11/29.
 * Copyright mfbproject.co.za - muzi@mfbproject.co.za
 * Copyright zulucoda - mfbproject
 */
import angular from 'angular'
import storyModule from './../modules/story.module'

function StoryModalController ($uibModalInstance, StoryModule) {

  let storyModal = this;

  storyModal.story = angular.copy(StoryModule.story);

  storyModal.cancel = () => {
    $uibModalInstance.dismiss('cancel');
  };

  storyModal.add = () => {
    $uibModalInstance.close(storyModal.story);
  };

}

export default angular.module('zulucoda.scrum.story.modal.controller', [
  storyModule
])
  .controller('StoryModalController', StoryModalController)
  .name;
