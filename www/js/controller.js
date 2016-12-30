/**
 * Created by liumeng on 2016/9/14.
 */
angular.module('mainController',[])
  .controller('MainCtrl',['$scope','$state','$interval',function($scope,$state,$interval){
    $scope.typing=0;
    $scope.typeStatus='stop';
    $scope.$on('$ionicView.afterEnter',function(){
      //alert(123);
      iosocket.on('connect',function(){
        console.log('page的连接事件触发');
        iosocket.emit('login', {
          name: 'dreamworker',
          _id: '57979dddcd8a42f1cc84690b',
          type: 'page'
        });
      });

      iosocket.on('ping',function(obj){
        console.log(obj);
      });

      iosocket.emit('add user','liumeng');

      $interval(function(){
        $scope.typing++;
        if($scope.typing>5){
          $scope.typeStatus='stop';
          //console.log('停止打字啦');

        }
      },200,200);

    });
    $scope.message={

    }
    $scope.inputChange=function(){
      $scope.typing=0;
      $scope.typeStatus='typing';
      //console.log('正在打字呢!');
    }

    $scope.send=function(){
      //iosocket.emit('private message', $stateParams.from._id, $stateParams.to._id, $scope.sendMessage);
    }
    $scope.$watch('message.messageDreamworker',function(newvalue,oldvalue){
      //alert(newvalue+'和'+oldvalue);
    });
    $scope.WsendToDreams=function(){
      var time=new Date();
      var timeid=time.getTime();
      //alert($scope.message.messageDreamworker);
      iosocket.emit('private message', '57979dddcd8a42f1cc84690b', '577bc1ffca1d345501cf73b2', $scope.message.messageDreamworker,timeid);
    }
    $scope.MsendToDreams=function(){
      var time=new Date();
      var timeid=time.getTime();
      iosocket.emit('private message', '5794d04de7957f7d9aee21d6', '577bc1ffca1d345501cf73b2', $scope.message.messageMetrix,timeid);
    }
    $scope.MsendToAll=function(){
      iosocket.emit('new message',$scope.message.messageAll);
    }
  }])
