/**
 * Created by Muzikayise Flynn Buthelezi (zuluCoda) on 2016/11/29.
 * Copyright mfbproject.co.za - muzi@mfbproject.co.za
 * Copyright zulucoda - mfbproject
 */
import angular from 'angular'
import _ from 'lodash'

function StoriesService ($http, $q) {
  let stories = [];
  return {
    getAllByWallId: (wallId) => {
      let checkStories = _.filter(stories, (s) => { return s.wallId == wallId });
      if(checkStories.length > 0)
        return $q.resolve(checkStories);

      return $http.get('/data/zulucoda.scrum.data.json').then((response) => {
        stories = response.data.stories;
        return _.filter(stories, (s) => { return s.wallId == wallId });
      });
    },
    add: (story) => {
      let storiesForCurrentWall = _.filter(stories, (s) => { return s.wallId == story.wallId });

      story.id = storiesForCurrentWall.length + 1;
      stories.push(story);
    }
  }
}

export default angular.module('zulucoda.scrum.stories.service', [])
  .service('StoriesService', StoriesService)
  .name;