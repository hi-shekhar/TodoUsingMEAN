// directive for todoList
angular.module('todoApp')
    .directive('listEnterDirective', ['sendGetDelItem', function (sendGetDelItem) {
        return {
            restrict: "E",
            templateUrl: "./partials/listpage.html",
            transclude: true,
            controllerAs: 'led',
            controller: ['$scope', function ($scope) {
                vm = this;
                vm.searchText; // serach text
                vm.beginPagination = 0;  // each page start index value
                vm.finalIndex = 0;  // exact index when removing
                vm.hideRemoveButton; // for hide and show of remove button
                vm.itemArray = [];  // Main array used for ng-repeat in todo List
                vm.disableUpdate = []; // used to Enable/Disable update button
                vm.tempListItem = []; // Store data which is to be updated
                vm.confirmDivVisibility = []; // hide and show confirm/cancel div
                vm.disableUndoButton = true; // enable/ disable delete undo button
                var undoArray = {}; // used for undo 
                var deletedValue; // deleted item value
                var undoIndex;//  updation of index after deletion
                vm.deleteIndex = {};
                vm.tempListIndex = {};
                function removeButtonFunc(index, deletedItem) {
                    vm.finalIndex = index - 1;
                    undoIndex = index;
                    console.log(`index = ${index}  beginPagination = ${vm.beginPagination} deletedIndex = ${vm.finalIndex} deletedItem = ${deletedItem}`);
                    undoArray[index] = deletedItem;
                    vm.disableUndoButton = false;
                    if (vm.itemArray.length == 0) {
                        vm.hideRemoveButton = false;
                    }
                }

                // put item in list array
                vm.putItem = function (items) {
                    if (items != undefined && Object.keys(items).length != 0 && items.listitem != "") {
                        sendGetDelItem.sendactualItem(items).then(function (data) {
                            //  console.log(data);
                            if (data.data.success) {
                                vm.itemArray = data.data.item;
                                vm.finalIndex = vm.itemArray.length - 1;
                            }
                            else {
                                console.log(data.data.message);
                            }
                            if (vm.itemArray.length > 1) {
                                vm.hideRemoveButton = true;
                            }
                            else
                                vm.hideRemoveButton = false;
                        })
                    }
                    vm.item = {};

                }

                // remove item in list from top
                vm.removeTop = function () {
                    vm.deleteIndex.index = 0;
                    sendGetDelItem.deleteactualItem(vm.deleteIndex).then(function (data) {
                        if (data.data.success) {
                            vm.itemArray = data.data.item;
                            deletedValue = data.data.deletedValue;
                            removeButtonFunc(0, deletedValue);
                        }
                        else {
                            console.log(data.data.message);
                        }
                    })
                }

                // remove item in list from bottom  
                vm.removeBottom = function () {
                    vm.deleteIndex.index = vm.itemArray.length - 1;
                    sendGetDelItem.deleteactualItem(vm.deleteIndex).then(function (data) {
                        if (data.data.success) {
                            vm.itemArray = data.data.item;
                            deletedValue = data.data.deletedValue;
                            removeButtonFunc(vm.itemArray.length, deletedValue);
                        }

                        else {
                            console.log(data.data.message);
                        }
                    })
                }

                // remove particular item in list
                vm.removeItem = function (index) {
                    vm.actualIndex = index + vm.beginPagination;
                    vm.deleteIndex.index = vm.actualIndex;
                    sendGetDelItem.deleteactualItem(vm.deleteIndex).then(function (data) {
                        if (data.data.success) {
                            vm.itemArray = data.data.item;
                            deletedValue = data.data.deletedValue;
                            vm.disableUpdate.splice(index, 1);
                            vm.confirmDivVisibility.splice(index, 1);
                            removeButtonFunc(vm.actualIndex, deletedValue)
                        }
                        else {
                            console.log(data.data.message);
                        }
                    })
                }

                // intiate updating of particular item in list
                vm.updateItem = function (index) {
                    document.getElementsByClassName('dataInputClass')[index].removeAttribute('readonly');
                    //   vm.updateIndex = index + vm.beginPagination;
                    vm.disableUpdate[index] = true;
                    vm.tempListIndex["updateIndex"] = index + vm.beginPagination;
                    vm.tempListIndex["currentIndex"] = index;
                    sendGetDelItem.tempDataItem(vm.tempListIndex).then(function (data) {
                        if(data.data.success){
                            vm.confirmDivVisibility[index] = true;
                            console.log(data);
                        }
                        else{
                            console.log(data.data.message);
                        }
                       
                    })
                }

                // update particular item in list
                vm.dataIsChanging = function (index) {
                    vm.tempListIndex["changedValue"] = document.getElementsByClassName('dataInputClass')[index].value;
                    sendGetDelItem.dataChange(vm.tempListIndex).then(function (data) {
                        if (data.data.success) {
                            vm.itemArray = data.data.item;
                        }
                        else {
                            console.log(data.data.message);
                        }
                    })
                }

                // confirm change of particular item in list
                vm.confirmChange = function (index) {
                    //   vm.confirmIndex = index + vm.beginPagination;
                    vm.tempListIndex["confirmedValue"] = document.getElementsByClassName('dataInputClass')[index].value;
                    sendGetDelItem.dataConfirmChange(vm.tempListIndex).then(function (data) {
                        if (data.data.success) {
                            vm.itemArray = data.data.item;
                            document.getElementsByClassName('dataInputClass')[index].setAttribute('readonly', 'true');
                            vm.disableUpdate[index] = false;
                            vm.confirmDivVisibility[index] = false;
                        }
                        else {
                            console.log(data.data.message);
                        }
                    })
                }

                // cancel change of particular item in list
                vm.cancelChange = function (index) {
                    vm.tempListIndex["cancelIndex"] = index + vm.beginPagination;
                    vm.tempListIndex["cancelCurrentIndex"] = index;
                    document.getElementsByClassName('dataInputClass')[index].setAttribute('readonly', 'true');
                    sendGetDelItem.dataCancelChange(vm.tempListIndex).then(function (data) {
                        if (data.data.success) {
                            vm.itemArray = data.data.item;
                            document.getElementsByClassName('dataInputClass')[index].value = vm.tempListItem[index]; // check 
                            vm.disableUpdate[index] = false;
                            vm.confirmDivVisibility[index] = false;
                        }
                        else {
                            console.log(data.data.message);
                        }
                    })

                }

                // undo delete
                vm.undoDelete = function () {
                    if (Object.keys(undoArray).length) {
                        var him = Object.keys(undoArray);
                        var himValue = undoArray[him[0]];
                        vm.itemArray.splice(him[0], 0, himValue);
                        delete undoArray[him[0]];
                    }
                    else {
                        vm.disableUndoButton = true;
                    }
                }
            }],
            bindToController: true
        }
    }])