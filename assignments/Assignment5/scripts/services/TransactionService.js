angular.module("expenseManager").
	factory("TransactionService", ['$http', '$cacheFactory', function($http, $cacheFactory){
		return {
			getIncome: function(){
				return $http({
					method:"GET", 
					url: "/Assignment5/data/income.json",
            		transformResponse: function(data, headers){
            			var data = angular.fromJson(data);
            			for(var cnt=0; cnt < data.length; cnt++){
							data[cnt].dateOfTransaction = new Date(data[cnt].dateOfTransaction);
						}
                		return data;
            		}
            	})
		        .then(
		        	//	success callback
		        	function (response) {
		        		var incomeCache = $cacheFactory("income");
			            incomeCache.put("data", response.data);
			            return incomeCache;
		        	},
		            //	error callback
		            function (httpError) {
		               // translate the error
		               return "Http Error: "+httpError;
		            })
			},
			
			getExpenses: function(){
				return $http({
					method:"GET", 
					url: "/Assignment5/data/expenses.json",
            		transformResponse: function(data, headers){
            			var data = angular.fromJson(data);
            			for(var cnt=0; cnt < data.length; cnt++){
							data[cnt].dateOfTransaction = new Date(data[cnt].dateOfTransaction);
						}
                		return data;
            		}
            	})
		        .then(
		        	//	success callback
		        	function (response) {
		        		var expensesCache = $cacheFactory("expenses");
			            expensesCache.put("data", response.data);
			            return expensesCache;
		        	},
		            //	error callback
		            function (httpError) {
		               // translate the error
		               return "Http Error: "+httpError;
		            })
			},			
			
			addIncome: function(formType, data){
				if(formType == "expenseForm"){
					data.dateOfTransaction =  new Date(data.dateOfTransaction);
					data.transactionId = transactionId;
					data.payer = "me";
					data.subCategory = '';
					data.type = 'Expense';
					
					var expensesArray = $cacheFactory.get("expenses").get("data");	//	existing array of incomes
					//	edit expense
					if(data.transactionId){
						var formData = data;
						var tempId = data.transactionId;
						var matchedIncomeObject = _.find(expensesArray, function(item, index) { return item.transactionId === tempId })
						if(matchedIncomeObject){
							_.extend(_.findWhere(matchedIncomeObject, { transactionId: tempId }), formData);
						}
					}
					//	new expense to be added
					else{
						var transactionId = expensesArray.length + 1;
						data.transactionId = transactionId;
						expensesArray.push(data);
						$cacheFactory.get("expenses").put("data", expensesArray);
					}
				}
				else if(formType == "incomeForm"){
					//	edit/update income
					data.dateOfTransaction = new Date(data.dateOfTransaction);
					data.payee = "me";
					data.subCategory = '';
					data.type = 'Income';
					var incomeArray = $cacheFactory.get("income").get("data");	//	existing array of incomes
					if(data.transactionId){
						var formData = data;
						var tempId = data.transactionId;
						var matchedIncomeObject = _.find(incomeArray, function(item, index) { return item.transactionId === tempId })
						if(matchedIncomeObject){
							_.extend(_.findWhere(matchedIncomeObject, { transactionId: tempId }), formData);
						}
					}
					//	new income to be added
					else{
						var transactionId = incomeArray.length + 1;
						data.transactionId = transactionId;
						incomeArray.push(data);
						$cacheFactory.get("income").put("data", incomeArray);
					}
				}
				data = {};
			},
			
			deleteTransaction: function(type, id){
				if(type == "expenses"){
					var expensesArray = $cacheFactory.get("expenses").get("data");	//	existing array of expenses
					expensesArray = _.reject(expensesArray, function(el) { return el.transactionId === id; });
					$cacheFactory.get("expenses").put("data", expensesArray);
					return expensesArray;
				}
				else if(type == "income"){
					var incomeArray = $cacheFactory.get("income").get("data");	//	existing array of incomes
					incomeArray = _.reject(incomeArray, function(el) { return el.transactionId === id; });
					$cacheFactory.get("income").put("data", incomeArray);
					return incomeArray;
				}
			}
		}
	}])