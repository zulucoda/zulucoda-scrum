/**
 * Created by Muzikayise Flynn Buthelezi (zuluCoda) on 2016/11/29.
 * Copyright mfbproject.co.za - muzi@mfbproject.co.za
 * Copyright zulucoda - mfbproject
 */
import angular from 'angular'
import StoriesService from '../services/stories.service'
import _ from 'lodash'
import StoryModalController from './story.modal.controller'
import storyModule from '../modules/story.module'

function StoriesController ($stateParams, $location, StoriesService, $uibModal, StoryModule) {

  let stories = this;

  stories.currentWallId = $stateParams.wallId;
  if(!stories.currentWallId) return $location.path('/walls');

  stories.currentStory = angular.copy(StoryModule.story);

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

  stories.open = (currentStory) => {

    StoryModule.story = currentStory || StoryModule.story;
    StoryModule.story.wallId = stories.currentWallId;

    let modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      template: require('./../partials/stories.modal.html'),
      controller: 'StoryModalController',
      controllerAs: 'storyModal',
      size: 'lg',
      resolve: {
        currentStory: () => {
          return stories.currentStory;
        }
      }
    });

    modalInstance.result.then(function (currentStory) {
      StoriesService.addOrEdit(currentStory);
      retrieveStories();
    });

  };

}

export default angular.module('zulucoda.scrum.stories.controller', [
  StoriesService,
  StoryModalController,
  storyModule
])
  .controller('StoriesController', StoriesController)
  .name;