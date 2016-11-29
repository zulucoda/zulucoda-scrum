/**
 * Created by Muzikayise Flynn Buthelezi (zuluCoda) on 2016/11/29.
 * Copyright mfbproject.co.za - muzi@mfbproject.co.za
 * Copyright zulucoda - mfbproject
 */
import angular from 'angular'

function scrollDirective($window) {
  return {
    restrict: 'A',
    link: ()=>{
      $('body.main-scrollable .main__scroll').scrollbar();
      $('.scrollable').scrollbar({'disableBodyScroll' : true});

      $($window).on('resize', function() {
        $('body.main-scrollable .main__scroll').scrollbar();
        $('.scrollable').scrollbar({'disableBodyScroll' : true});
      });
    }
  }
}

export default angular.module('zulucoda.scrum.scroll.directive', [])
  .directive('scrollDirective', scrollDirective)
  .name;