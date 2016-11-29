/**
 * Created by Muzikayise Flynn Buthelezi (zuluCoda) on 2016/11/29.
 * Copyright mfbproject.co.za - muzi@mfbproject.co.za
 * Copyright zulucoda - mfbproject
 */
import angular from 'angular'
import StoriesService from '../services/stories.service'
import _ from 'lodash'
import StoryModalController from './story.modal.controller'

function StoriesController ($stateParams, $location, StoriesService, $uibModal, $state) {

  let stories = this;

  stories.currentWallId = $stateParams.wallId;
  if(!stories.currentWallId) return $location.path('/walls');

  function retrieveStories () {
    StoriesService.getAllByWallId(stories.currentWallId).then((results) => {
      stories.stories = results;

      stories.backlog = _.filter(results, { 'status': 'backlog' });

      stories.storyTodo = _.filter(results, { 'status': 'todo' });

      stories.storyInProgress = _.filter(results, { 'status': 'in_progress' });

      stories.storyDone = _.filter(results, { 'status': 'done' });
    });
  }

  retrieveStories();

  stories.open = () => {

    let modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      template: require('./../partials/stories.modal.html'),
      controller: 'StoryModalController',
      controllerAs: 'storyModal',
      size: 'lg'
    });

    modalInstance.result.then(function (currentStory) {
      StoriesService.add(currentStory);
      retrieveStories();
    });

  };

}

export default angular.module('zulucoda.scrum.stories.controller', [
  StoriesService,
  StoryModalController
])
  .controller('StoriesController', StoriesController)
  .name;