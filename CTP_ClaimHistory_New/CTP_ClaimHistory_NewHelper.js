({
	populateYearSelect: function(component, event, helper) {
        var year_opts = [{'class': 'optionClass', 'label':'Year', 'value': ''}];
        var d = new Date();
        var curr_year = d.getFullYear();
           
        var injuryYear = component.find("injuryYear");
        console.log('Injury Year Set is -->'+ JSON.stringify(injuryYear));
        for(var i = 0; i < 20; i++) { 
            year_opts.push({
                class: "optionClass",
                label: curr_year-i,
                value: curr_year-i
            });
        } 
        injuryYear.set("v.options", year_opts);
    },
    
    populateMonthSelect: function(component, event, helper) {
        var month_opts = [{'class': 'optionClass', 'label':'Month', 'value': ''}];
        var d = new Date();
        var curr_year = d.getFullYear();
        var curr_month = d.getMonth();
        var monthLimit = component.get('v.monthLimit');
    
        var injuryMonth = component.find("injuryMonth");
        var injuryYear = component.find("injuryYear").get("v.value");
        var injuryMonthVal = component.find("injuryMonth").get("v.value");
        
        if(injuryYear == curr_year){
            component.set('v.monthLimit', curr_month + 1);
        }else{
            component.set('v.monthLimit', 12);
         }

        for(var i = 1; i <= component.get('v.monthLimit'); i++) { 
            month_opts.push({
                class: "optionClass",
                label: i,
                value: i
            });
        } 
        injuryMonth.set("v.options", month_opts);
        component.find("injuryMonth").set("v.value", injuryMonthVal);
        
    },
    
    selectedInsurerHelper: function(component, event, helper) {
        console.log("selectedInsurer called");
        var insurer = event.getSource().get('v.value'); 
        var insurerErrDiv = component.find("claimHistoryInsurerErr");
        
        if(insurer.trim()=='Select Insurer'){
            $A.util.removeClass(insurerErrDiv, "slds-hidden");
            component.set("v.insurerSelected", "No");
        }else if(insurer.trim()=='Other'){
            $A.util.addClass(insurerErrDiv, "slds-hidden");
            component.set("v.insurerSelected", "Other");
        }else {
            $A.util.addClass(insurerErrDiv, "slds-hidden");
            component.set("v.insurerSelected", "Yes");
        }
    },
    
    validateClaimHistoryOtherInsurerHelper: function(component, event, helper) {
        var otherInsurer = event.getSource().get('v.value'); 
        var otherInsurerErrDivId = component.find("otherClaimHistoryInsurerErr");; 
        if(otherInsurer.trim()==''){
            $A.util.removeClass(otherInsurerErrDivId, "slds-hidden");
        }else{
            $A.util.addClass(otherInsurerErrDivId, "slds-hidden");
        }
    },
    isBlankFunc:function(elemVal) {
     return (elemVal==null || (''+elemVal).trim()=='');
    },
    displayErrorMessage: function(component, event, helper, isDisplayError, errorDivName) {
        var errorDivId = component.find(errorDivName);
        if (isDisplayError) {
            $A.util.removeClass(errorDivId, "slds-hidden");
        } else {
            $A.util.addClass(errorDivId, "slds-hidden");
        }
    },
})