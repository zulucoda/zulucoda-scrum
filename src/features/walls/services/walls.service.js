/**
 * Created by Muzikayise Flynn Buthelezi (zuluCoda) on 2016/11/27.
 * Copyright mfbproject.co.za - muzi@mfbproject.co.za
 * Copyright zulucoda - mfbproject
 */
import angular from 'angular'

function WallsService ($http, $q) {
  let walls = [];

  return {
    getAll: () => {
      if(walls.length > 0)
        return $q.resolve(walls);

       return $http.get('/data/zulucoda.scrum.data.json').then((response) => {
          walls = response.data.walls;
          return walls;
        });
    },
    add: (wall) => {
      wall.id = walls.length + 1;
     walls.push(wall);
    }
  }
}

export default angular.module('zulucoda.scrum.walls.service', [])
  .service('WallsService', ['$http', '$q', WallsService ])
  .name;