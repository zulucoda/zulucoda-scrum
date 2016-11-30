/**
 * Created by Muzikayise Flynn Buthelezi (zuluCoda) on 2016/11/29.
 * Copyright mfbproject.co.za - muzi@mfbproject.co.za
 * Copyright zulucoda - mfbproject
 */
import angular from 'angular'

function StoryModule () {
 return {
   story: {
     id: 0,
     wallId: 0,
     name: null,
     description: null,
     assignedTo: null,
     status: 'backlog',
     estimate: 'medium'
   }
 }
}

export default angular.module('zulucoda.scrum.story.module', [])
  .factory('StoryModule', [StoryModule])
  .name;