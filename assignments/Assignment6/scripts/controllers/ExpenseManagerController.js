angular.module("expenseManager")
	.controller("ExpenseManagerController", ['TransactionService', '$cacheFactory', '$location', '$scope', '$routeParams', function(TransactionService, $cacheFactory, $location, $scope, $routeParams){
	var self = this;
	this.form = {};
	
	this.totalIncome = 0;
	this.totalExpenses = 0;
	this.balance = this.totalIncome - this.totalExpenses;
	
	var incomeRef = TransactionService.getIncomeReference();
	incomeRef.on("value", function(snapshot){
		self.income = snapshot.val();
		for(var cnt in self.income){
			self.totalIncome = self.totalIncome + self.income[cnt].amount;
		}
		//$scope.$apply();
	});
		
	var expenseRef = TransactionService.getExpenseReference();
	expenseRef.on("value", function(snapshot){
		self.expenses = snapshot.val();
		for(var cnt in self.expenses){
			self.totalExpenses = self.totalExpenses + self.expenses[cnt].amount;
		}
		//$scope.$apply();
	});
   
	//	this function handles the button clicks for viewing & adding income/expense
	this.showTemplate = function(listType, formData, objKey){
		if(listType == "income"){
			$location.path("/view-income");
		}
		else if(listType == "expense"){
			$location.path("/view-expenses");
		}
		else if(listType == "showExpenseForm"){
			var path = "/add-expenses";
			if(objKey){
				path = path+"/"+objKey;
			}
			$location.path(path);
		}
		else if(listType == "showIncomeForm"){
			var path = "/add-income";
			if(objKey){
				path = path+"/"+objKey;
			}
			$location.path(path);
		}
		//	in case of edit
		if(formData){
			this.form = formData;
		}
	};
	
	
	
	//	handle form - save button
	this.saveFormData = function(formType){
		var key = "";
		if(formType == "incomeForm"){
			key = $routeParams.incomeId;
		}
		else if(formType == "expenseForm"){
			key = $routeParams.expenseId;
		}
		TransactionService.addTransaction(formType, this.form, key);
		this.clickFormButton("Cancel", formType);
	};
	
	//	Reset the form
	this.formReset = function(){
		this.form = {};
	};

	//	Handle the Reset and Cancel buttons on forms
	this.clickFormButton = function(buttonType, formType){
		this.formReset();
		if(buttonType == "Cancel"){
			//	navigate user to the view page
			if(formType=="incomeForm"){
            	$location.path("/view-income");
			}
			else if(formType=="expenseForm"){
            	$location.path("/view-expenses");
			}
		}
	};


	//	delete a transaction
	this.deleteItem = function(type, key){
		TransactionService.deleteTransaction(type, key);
	};

}]);