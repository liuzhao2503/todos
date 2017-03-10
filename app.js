(function(angular){
	'use strict'
	// Your starting point. Enjoy the ride!
	//1创建一个模块
	var app = angular.module('todo',[]);
	//2创建一个控制器
	app.controller('todoController',['$scope','$location',function($scope,$location){
		//创建一些数据
		$scope.tasks=[
		   {id:1,name:'吃饭',completed:true},
	       {id:2,name:'睡觉',completed:true},
	       {id:3,name:'打豆豆',completed:false},
	       {id:4,name:'学习',completed:false},
	       {id:5,name:'学习',completed:true}
		];
		//功能2：添加任务
		$scope.newTask = '';
		$scope.add = function(){
			//判断  如果没有输入  
			if(!$scope.newTask){
				return;
			}
			//定义一个 id值 来存放新任务的id
			var id;
			if($scope.tasks.length==0){
				id=1;
			}else{
				id=$scope.tasks[$scope.tasks.length-1].id+1;
			}
			$scope.tasks.push({id:id,name:$scope.newTask,completed:false});

			//最后重置输入框
			$scope.newTask = '';
		}
		//功能3：删除任务
		$scope.remove = function(id){
			for(var i = 0;i<$scope.tasks.length;i++){
				var item = $scope.tasks[i];
				if(item.id==id){
					$scope.tasks.splice(i,1);
					return;
				}
			}
		};
		//功能4：修改任务   ----------编辑任务
		$scope.isEditingId = -1;//isEditingid==item.id
		$scope.edit = function(id){
			$scope.isEditingId = id;
		}
		$scope.save = function(){
			$scope.isEditingId = -1;
		};
		// 功能5：批量切换数据

		//功能6：批量切换任务状态
		var flag = true;
		$scope.toggleAll = function(){
			//遍历$scope.tasks  每一项都为“true”
			for(var i = 0;i<$scope.tasks.length;i++){
				var item = $scope.tasks[i];
				item.completed = flag;
			}
			flag = !flag;
		};
		//功能7：删除已经完成的任务
		$scope.clearAllCompleted = function(){
			for(var i = $scope.tasks.length - 1;i >= 0;i--){
				var item = $scope.tasks[i];
				if(item.completed){
					$scope.tasks.splice(i,1);
				}
			}
		};
		//控制clearall按钮的显示或者隐藏
		
		$scope.isShow = function(){
			//遍历数组 如果有一个元素的completed属性为true 则显示按钮
			for(var i = 0; i<$scope.tasks.length;i++){
				//var item = $scope.tasks[i];
				var item = $scope.tasks[i];
				if(item.completed){
					return true;
				}
			}
			//return false;
		};

		//功能8：显示未完成数目
		$scope.leftNumber = 0;
		$scope.$watch('tasks',function(newValue,oldValue){
			$scope.leftNumber = 0;
			for(var i = 0;i<$scope.tasks.length;i++){
				var item = $scope.tasks[i];
				if(!item.completed){
					$scope.leftNumber++;
				}
			}
		},true);

		//功能9：//显示所有完成项目
		//console.log($location.url())
		$scope.loca = $location;
		$scope.$watch('loca.url()',function(newValue,oldValue){
			console.log(newValue)
			console.log(oldValue)
			switch(newValue){
				case '/#%2Factive':
					$scope.isCompleted={completed:false}
					break;
				case '/#%2Fcompleted':
					$scope.isCompleted={completed:true}
					break;
				default:
					$scope.isCompleted={};
					break;
			}
		})
	}])
}(angular));