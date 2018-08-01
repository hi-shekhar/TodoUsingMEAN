angular.module('todoApp')
.factory('sendGetDelItem', function($http) {
        itemInDatabase = {};

        itemInDatabase.sendactualItem  = function(data){
            return $http.post('/api/pushItem',data);
        }

        itemInDatabase.deleteactualItem = function(data){
            return $http.post('/api/delItem',data);
        }

        itemInDatabase.tempDataItem = function(data){
            return $http.post('/api/update',data);
        }

        itemInDatabase.dataChange = function(data){
            return $http.post('/api/changedData',data);
        }

        itemInDatabase.dataConfirmChange = function(data){
            return $http.post('/api/confirmed',data);
        }

        itemInDatabase.dataCancelChange = function(data){
            return $http.post('/api/cancel',data);
            
        }
        

    return itemInDatabase;
    
});
