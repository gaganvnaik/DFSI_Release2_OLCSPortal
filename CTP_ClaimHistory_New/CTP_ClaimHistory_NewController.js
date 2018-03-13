({
    initValidator:function(component, event, helper) {
        console.log('_validator loaded successfully');
    },
    init : function(component, event, helper) {
        // 5016 START - Modified code to store original wrapper values 
        // and set them back after population of Year and Month picklists
        var parentObject = component.get("v.childClaimHistory");
        var parentYear = parentObject.CTP_Year_of_Injury_1__c;
        var parentMonth = parentObject.CTP_Month_of_Injury_1__c;
        var insurerCode = parentObject.CTP_Previous_Insurer_1__c;
        
        console.log("Year value received from Wrapper before populate calles :::", parentObject.CTP_Year_of_Injury_1__c);
		console.log("Month value received from Wrapper before populate calles :::", parentObject.CTP_Previous_Insurer_1__c);
        
        helper.populateYearSelect(component, event, helper);
        helper.populateMonthSelect(component, event, helper);

        var injuryYear = component.find("injuryYear");
        injuryYear.set("v.value",""+parentYear);
        
        var injuryMonth = component.find("injuryMonth");
        injuryMonth.set("v.value",""+parentMonth);
        
        var claimHistory_insurer = component.find("claimHistory_insurer");
        claimHistory_insurer.set("v.value", insurerCode);
        component.set("v.insurerFromParent",insurerCode);
    
        console.log("after year initialized:::", parentObject.CTP_Year_of_Injury_1__c);
		console.log("after month initialized :::", parentObject.CTP_Month_of_Injury_1__c);
        console.log("after Previous Insurer initialized :::", parentObject.CTP_Previous_Insurer_1__c);
        // 5016 - END
    },
    
    onChangeYear: function(component, event, helper) {
        console.log('year changed record is->',component.get("v.childClaimHistory").CTP_Month_of_Injury_1__c);
        console.log('year changed record is->',component.get("v.childClaimHistory").CTP_Year_of_Injury_1__c);
        helper.populateMonthSelect(component, event);
    },
    
/*    removeClaimHistory : function(component, event, helper) {
        console.log("index value="+component.get("v.index"));
        var index=event.getSource().get("v.name");
        console.log("index value="+ index);
        var compEvent=component.getEvent("removeClaimHistory");
        compEvent.setParams({"indexVar" : index });
        compEvent.fire();
    },*/
    removeClaimHistory : function(component, event, helper) {
        
        var clmHistory = component.get("v.childClaimHistory");
        console.log("claim history=" +clmHistory);
         var index=event.getSource().get("v.name");
        console.log("index value="+component.get("v.index"));
        var compEvent=component.getEvent("removeClaimHistory");
        compEvent.setParams({"indexVar" : index });
        compEvent.fire();
    },
    
    
    selectedInsurer: function(component, event, helper) {
    	console.log("claim history is",component.get("v.childClaimHistory"));
        helper.selectedInsurerHelper(component, event, helper);
        //DCR-5016- Below line is for setting up the Insurer code
        component.set("v.insurerFromParent",component.get("v.childClaimHistory").CTP_Previous_Insurer_1__c);
    },
    
    validateClaimHistoryOtherInsurer: function(component, event, helper) {
        helper.validateClaimHistoryOtherInsurerHelper(component, event, helper);
    },
    validateClaimsHistory :function(component, event, helper){
        var compClaimsEvent = component.getEvent("cmpClaimsHistorytoCase");
        
        compEvent.setParams({
            "index" : component.get("v.indexVar"),
            "injuryMonth" : component.get("v.injuryMonth"),
            "injuryYear"  : component.get("v.injuryYear")
        });
        compClaimsEvent.fire();
    },
    validateAll: function(component, event, helper) {
        var success = true;
        var insurerSelected = component.get("v.childClaimHistory.CTP_Previous_Insurer_1__c")
        helper.displayErrorMessage(component, event, helper, false, "claimHistoryInsurerErr");   
        helper.displayErrorMessage(component, event, helper, false, "otherClaimHistoryInsurerErr");   
        if(helper.isBlankFunc(insurerSelected) || insurerSelected.trim()=='Select Insurer'){
        	success = false;
            helper.displayErrorMessage(component, event, helper, true, "claimHistoryInsurerErr");   
        }else if(insurerSelected == 'Other' && helper.isBlankFunc(component.get("v.childClaimHistory.CTP_Previous_CTP_Insurer_Other_1__c"))){
            success = false;
            helper.displayErrorMessage(component, event, helper, true, "otherClaimHistoryInsurerErr");   
        }
       return success;
    } ,
    validateMaxLength  : function(component, event, helper) {
        var claimNumber = component.get('v.childClaimHistory.CTP_Previous_Claim_Number_1__c');
        var isDisplayError = claimNumber.length > 50 ? true:false;
        helper.displayErrorMessage(component, event, helper, isDisplayError, "claimNumberMax");   
    }
    
   
})