/**
 * Created by Muzikayise Flynn Buthelezi (zuluCoda) on 2016/11/29.
 * Copyright mfbproject.co.za - muzi@mfbproject.co.za
 * Copyright zulucoda - mfbproject
 */
import angular from 'angular'
import _ from 'lodash'

function StoriesService ($http) {
  let stories = [];
  return {
    getAllByWallId: (wallId) => {
      return $http.get('/data/zulucoda.scrum.data.json').then((response) => {
        stories = response.data.stories;
        return _.filter(stories, (s) => { return s.wallId == wallId });
      });
    }
  }
}

export default angular.module('zulucoda.scrum.stories.service', [])
  .service('StoriesService', StoriesService)
  .name;