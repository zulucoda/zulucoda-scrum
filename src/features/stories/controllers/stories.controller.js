/**
 * Created by Muzikayise Flynn Buthelezi (zuluCoda) on 2016/11/29.
 * Copyright mfbproject.co.za - muzi@mfbproject.co.za
 * Copyright zulucoda - mfbproject
 */
import angular from 'angular'
import StoriesService from '../services/stories.service'
import _ from 'lodash'

function StoriesController ($stateParams, $location, StoriesService) {

  let stories = this;

  stories.currentWallId = $stateParams.wallId;
  if(!stories.currentWallId) return $location.path('/walls');

  StoriesService.getAllByWallId(stories.currentWallId).then((results)=>{
    stories.stories = results;

    stories.backlog = _.filter(results, 'status', 'backlog');

    stories.storyTodo = _.filter(results, 'status', 'todo');

    stories.storyInProgress = _.filter(results, 'status', 'in_progress');

    stories.storyDone = _.filter(results, 'status', 'done');
  });

}

export default angular.module('zulucoda.scrum.stories.controller', [
  StoriesService
])
  .controller('StoriesController', StoriesController)
  .name;