/**
 * Created by Muzikayise Flynn Buthelezi (zuluCoda) on 2016/11/27.
 * Copyright mfbproject.co.za - muzi@mfbproject.co.za
 * Copyright zulucoda - mfbproject
 */
import angular from 'angular';

function WallsService ($http) {
  let walls = [];

  return {
    getAll: () => {
       return $http.get('/data/zulucoda.scrum.data.json').then((response) => {
          walls = response.data.walls;
          return response.data.walls;
        });
    }
  }
}

export default angular.module('zulucoda.scrum.walls.service', [])
  .service('WallsService', WallsService)
  .name;