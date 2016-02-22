angular.module("expenseManager").
	factory("TransactionService", ['$http', '$cacheFactory', function($http, $cacheFactory){
		var incomeUrl = new Firebase("https://expense-manager-pro.firebaseio.com/income");
		var expenseUrl = new Firebase("https://expense-manager-pro.firebaseio.com/expense");

		return {
			getIncomeReference: function(){
				return incomeUrl;
			},
			
			getExpenseReference: function(){
				return expenseUrl;
			},			
			
			addTransaction: function(formType, data, objKey){
				data.dateOfTransaction = new Date(data.dateOfTransaction);

				if(formType == "expenseForm"){
					//	edit/update expense
					var url = expenseUrl;
					//	edit
					if(objKey){
						url = new Firebase(url+"/"+objKey);
					}
					else{
						url = url.push();
					}
					url.set(data);
				}
				else if(formType == "incomeForm"){
					//	edit/update income
					var url = incomeUrl;
					//	edit
					if(objKey){
						url = new Firebase(url+"/"+objKey);
					}
					else{
						url = url.push();
					}
					url.set(data);
				}
				data = {};
			},
			
			deleteTransaction: function(type, objReference){
				var deleteObjRef = "";
				if(type == "expenses"){
					deleteObjRef = expenseUrl+"/"+objReference;
				}
				else if(type == "income"){
					deleteObjRef = incomeUrl+"/"+objReference;
				}
				deleteObjRef = new Firebase(deleteObjRef);
				deleteObjRef.remove();
			}
		}
	}])