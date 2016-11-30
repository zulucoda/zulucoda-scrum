/**
 * Created by Muzikayise Flynn Buthelezi (zuluCoda) on 2016/11/27.
 * Copyright mfbproject.co.za - muzi@mfbproject.co.za
 * Copyright zulucoda - mfbproject
 */
import angular from 'angular'

function WallModule () {
 return {
   wall: {
     id: 0,
     name: null
   }
 }
}

export default angular.module('zulucoda.scrum.walls.module', [])
  .factory('WallModule', [WallModule])
  .name;