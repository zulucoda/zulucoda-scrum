/**
 * Created by Muzikayise Flynn Buthelezi (zuluCoda) on 2016/11/29.
 * Copyright mfbproject.co.za - muzi@mfbproject.co.za
 * Copyright zulucoda - mfbproject
 */
import angular from 'angular'
import storyModule from '../modules/story.module'

function StoriesController ($stateParams, $location, StoryModule) {

  let stories = this;

  stories.story = angular.copy(StoryModule.story);

  stories.story.wallId = $stateParams.wallId;

  if(!stories.story.wallId) return $location.path('/walls');

}

export default angular.module('zulucoda.scrum.stories.controller', [
  storyModule
])
  .controller('StoriesController', StoriesController)
  .name;