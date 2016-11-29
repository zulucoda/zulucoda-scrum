/**
 * Created by Muzikayise Flynn Buthelezi (zuluCoda) on 2016/11/29.
 * Copyright mfbproject.co.za - muzi@mfbproject.co.za
 * Copyright zulucoda - mfbproject
 */
import angular from 'angular'
import StoriesService from '../services/stories.service'

function StoriesController ($stateParams, $location, StoriesService) {

  let stories = this;

  stories.currentWallId = $stateParams.wallId;
  if(!stories.currentWallId) return $location.path('/walls');

  StoriesService.getAllByWallId(stories.currentWallId).then((results)=>{
    stories.stories = results;
  });

}

export default angular.module('zulucoda.scrum.stories.controller', [
  StoriesService
])
  .controller('StoriesController', StoriesController)
  .name;