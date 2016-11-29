/**
 * Created by Muzikayise Flynn Buthelezi (zuluCoda) on 2016/11/29.
 * Copyright mfbproject.co.za - muzi@mfbproject.co.za
 * Copyright zulucoda - mfbproject
 */
import angular from 'angular'

function StoriesService ($http) {
  return {
    getAll: () => {
      return $http.get('/data/zulucoda.scrum.data.json').then((response) => {
        return response.data.stories;
      });
    }
  }
}

export default angular.module('zulucoda.scrum.stories.service', [])
  .service('StoriesService', StoriesService)
  .name;