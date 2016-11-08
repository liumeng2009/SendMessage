/**
 * Created by liumeng on 2016/9/14.
 */
angular.module('mainController',[])
  .controller('MainCtrl',['$scope','$state',function($scope,$state){
    $scope.$on('$ionicView.afterEnter',function(){
      //alert(123);
      iosocket.on('connect',function(){
        console.log('连接成功啦');
      });
      iosocket.emit('add user','liumeng');
    });
    $scope.message={

    }
    $scope.send=function(){
      //iosocket.emit('private message', $stateParams.from._id, $stateParams.to._id, $scope.sendMessage);
    }
    $scope.$watch('message.messageDreamworker',function(newvalue,oldvalue){
      //alert(newvalue+'和'+oldvalue);
    });
    $scope.WsendToDreams=function(){
      //alert($scope.message.messageDreamworker);
      iosocket.emit('private message', '57979dddcd8a42f1cc84690b', '577bc1ffca1d345501cf73b2', $scope.message.messageDreamworker);
    }
    $scope.MsendToDreams=function(){
      iosocket.emit('private message', '5794d04de7957f7d9aee21d6', '577bc1ffca1d345501cf73b2', $scope.message.messageMetrix);
    }
    $scope.MsendToAll=function(){
      iosocket.emit('new message',$scope.message.messageAll);
    }
  }])
