/**
 * Created by Muzikayise Flynn Buthelezi (zuluCoda) on 2016/11/26.
 * Copyright mfbproject.co.za - muzi@mfbproject.co.za
 * Copyright zulucoda - mfbproject
 */
import angular from 'angular'
import wallsService from '../services/walls.service'
import wallsModalController from './walls.modal.controller'
import storiesService from '../../stories/services/stories.service'
import _ from 'lodash'

function WallsController(WallsService, $uibModal, $state, StoriesService) {

  let wall = this;

  wall.walls = [];

  WallsService.getAll().then((results) => {
    wall.walls = results;
  });

  wall.open = () => {

    let modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      template: require('./../partials/walls.modal.html'),
      controller: 'WallsModalController',
      controllerAs: 'wallModal',
      size: 'lg'
    });

    modalInstance.result.then(function (currentWall) {
      WallsService.add(currentWall);
    });

  };

  wall.viewStories = (wallId) => {
    $state.go('stories', {wallId: wallId });
  };

  wall.getWallStats = (currentWall) => {
    StoriesService.getAllByWallId(currentWall.id).then((results) => {

      currentWall.backlog = _.filter(results, { 'status': 'backlog' });

      currentWall.storyTodo = _.filter(results, { 'status': 'todo' });

      currentWall.storyInProgress = _.filter(results, { 'status': 'in_progress' });

      currentWall.storyDone = _.filter(results, { 'status': 'done' });
    });
  }
}

export default angular.module('zulucoda.scrum.walls.controller', [
  wallsService,
  wallsModalController,
  storiesService
])
  .controller('WallsController', ['WallsService', '$uibModal', '$state', 'StoriesService', WallsController])
  .name;