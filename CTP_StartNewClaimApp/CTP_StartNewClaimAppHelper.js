// Revision No:  10003 Change by Vivek
({
    validateDateHelper : function(component, event, helper) {
        helper.resetInValidDate(component, event, helper, 'dateOfAccident', 'v.claimApplicationWrapper.claimRecord.CTP_AccidentDate__c');
        var wrapperRecord = component.get("v.claimApplicationWrapper");
        var dateOfAccident = wrapperRecord.claimRecord.CTP_AccidentDate__c;
        console.log('date of accident is ==>',dateOfAccident);
        console.log('complete wrapper is ==>',wrapperRecord);       
        var errorDateMsg = component.find("errorDateMsg");
        var temp= new Date();
        var today = new Date(temp.getFullYear(),temp.getMonth(),temp.getDate()).getTime();
        var earlierDate = "2017-12-01"; 
        
            
        if(dateOfAccident ==null || dateOfAccident.trim()==''){						//Date cannot be blank
            $A.util.removeClass(errorDateMsg,"slds-hidden");
            component.set("v.errorDateMsg","Please enter the date of the accident");
            component.set("v.daysDifferenceFlag",false);
            component.set("v.beforeDate",false);
            component.set("v.proceedClaimApplication",false);
            component.set('v.isValid', true); 
            return;
        }
        var splitDateOfAccident = dateOfAccident.split("-");
        splitDateOfAccident = new Date(splitDateOfAccident[0], splitDateOfAccident[1] - 1, splitDateOfAccident[2]).getTime();
        
        var daysDifference = Math.floor((today - splitDateOfAccident) / (1000*60*60*24))
        console.log("daysDifference: " + daysDifference);
    
          if(dateOfAccident < earlierDate){   //Date cannot be earlier than 1st of December 2017
            $A.util.removeClass(errorDateMsg,"slds-hidden");
            component.set("v.errorDateMsg","");
            component.set("v.beforeDate",true);
            component.set("v.daysDifferenceFlag",false);
            component.set("v.proceedClaimApplication",false);
            component.set('v.isValid', true); 
        }
            else if((today - splitDateOfAccident) < 0){ 	// Date cannot be later than today's date																																	
                $A.util.removeClass(errorDateMsg,"slds-hidden");
                component.set("v.errorDateMsg","Date of accident cannot be in the future");
                component.set("v.daysDifferenceFlag",false);
                component.set("v.proceedClaimApplication",false);
                component.set("v.beforeDate",false);
                component.set('v.isValid', true); 
            }
                else if(daysDifference > 20 && daysDifference < 29){
                    component.set("v.errorDateMsg","");
                    component.set("v.proceedClaimApplication",false);
                    component.set("v.daysDifferenceFlag",true);  
                    component.set("v.daysDifferenceGT90","");
                    component.set("v.daysDifferenceGT76","");
                    component.set("v.beforeDate",false);
                    component.set("v.daysDifferenceGT21","Claims made more than 28 days after an accident are not entitled to have weekly benefits backdated to the date of the accident. You are close to 28 days.");
                    component.set('v.isValid', true); 
                }
                    else if(daysDifference > 75 && daysDifference < 91){
                        component.set("v.errorDateMsg","");
                        component.set("v.proceedClaimApplication",false);
                        component.set("v.daysDifferenceFlag",true); 
                        component.set("v.daysDifferenceGT21","");
                        component.set("v.daysDifferenceGT90","");
                        component.set("v.beforeDate",false);
                        component.set("v.daysDifferenceGT76","Claims lodged more than 3 months after an accident may not be accepted. You are close to 3 months.");
                        component.set('v.isValid', true); 
                    }
                        else if(daysDifference > 90){
                            component.set("v.errorDateMsg","");
                            component.set("v.proceedClaimApplication",false);
                            component.set('v.isValid', true); 
                            component.set("v.daysDifferenceFlag",true);
                            component.set("v.daysDifferenceGT21","");
                            component.set("v.daysDifferenceGT76",""); 
                            component.set("v.beforeDate",false);
                            component.set("v.daysDifferenceGT90","The date of your accident is more than 3 months ago. If you lodge a claim, the insurer may not accept your claim unless you provide a full and satisfactory explanation for the delay.");
                        }
                            else {
                                $A.util.addClass(errorDateMsg,"slds-hidden");
                                component.set("v.errorDateMsg","");
                                component.set("v.daysDifferenceFlag",false);
                                component.set("v.daysDifferenceGT21","");
                    			component.set("v.daysDifferenceGT76","");
                                component.set("v.daysDifferenceGT90","");
                                component.set("v.proceedClaimApplication",true);
                                component.set('v.isValid', true); 
                                component.set("v.beforeDate",false);
                                var wrapperRecord = component.get("v.claimApplicationWrapper");
                                wrapperRecord.claimRecord.CTP_AccidentDate__c = dateOfAccident;
                                component.set("v.claimApplicationWrapper",wrapperRecord);
                            }
    },
    
    validateFuturedate : function(component, event) { // Date cannot be later than today's date
        var wrapperRecord = component.get("v.claimApplicationWrapper");
        var dateOfAccident = wrapperRecord.claimRecord.CTP_AccidentDate__c;
        console.log('date of accident is ==>',dateOfAccident);
        console.log('complete wrapper is ==>',wrapperRecord);
        if(dateOfAccident){
            var today = new Date().getTime();
            dateOfAccident = dateOfAccident.split("-");
            dateOfAccident = new Date(dateOfAccident[0], dateOfAccident[1] - 1, dateOfAccident[2]).getTime();
            if((today - dateOfAccident) < 0)
            {
                var errorDiv = component.find("DateofaccidentFutureMsg");
                $A.util.removeClass(errorDiv, "slds-hidden");
                component.set("v.isError",true);
                component.set("v.proceedClaimApplication",false);
            }
            else
            {
                var errorDiv = component.find("DateofaccidentFutureMsg");
                $A.util.addClass(errorDiv, "slds-hidden");
                component.set("v.isError",false);
                component.set("v.proceedClaimApplication",true);
                /*var wrapperRecord = component.get("v.claimApplicationWrapper");
                wrapperRecord.claimRecord.CTP_AccidentDate__c = dateOfAccident;
                component.set("v.claimApplicationWrapper",wrapperRecord);*/
            }
        }
    },

    //objName: API Name of object
    //fieldName: field API Name
    //elementId: aura:id of drop down in which values to be added. Just in case it starts from 'v.', it will set attribute in component
    //extraVals: any values if you want to add at the beginning apart from picklist values your are getting e.g. '--None--'. Pass null if you don't want to add extra values. Pass array of string for default values
    fetchPickListVal: function(component, objName, fieldName, elementId, extraVals) {
        console.log('elementId',elementId);
        var action = component.get("c.getselectOptions");
        var objVar={};
        objVar.sobjectType=objName;
        action.setParams({
            "objObject": objVar,//component.get("v.objInfo"),
            "fld": fieldName
        });

        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                var allValues = response.getReturnValue();
                //alert('allValues 2:'+JSON.stringify(allValues));
               var opts = [];
               if (allValues != undefined && allValues.length > 0) {
                   console.log('allValues',allValues);
                if (elementId!=null && elementId!='' && !elementId.startsWith('v.')){
                   	   if (extraVals!=null){
                        for (var i = 0; i < extraVals.length; i++) {
                        opts.push({
                                class: "optionClass",
                                label: extraVals[i],
                                value: extraVals[i]
                            });
                        }
                       }
                        for (var i = 0; i < allValues.length; i++) {
                            opts.push({
                                class: "optionClass",
                                label: allValues[i],
                                value: allValues[i]
                            });
                        }
                        //if (elementId!=null && elementId!=''){
                        console.log('opts',opts);
                    console.log('hi---',component.find(elementId).get("v.options"));
                            component.find(elementId).set("v.options", opts);
                        //}
                } else {
                   	   if (extraVals!=null){
                        for (var i = 0; i < extraVals.length; i++) {
                        allValues.unshift(extraVals[i]);
                        }
                       }
                    if (elementId.startsWith('v.')){
                        component.set(elementId, allValues);
                    }
                }
               }
				return allValues;
            } else {
                //alert('Error occured while fetching values for '+objName+'.'+fieldName);
            }
        });
        $A.enqueueAction(action);
    },
    
    assignFunction : function(component, event, helper) {
        
        var action=component.get("c.getUserRecords");
        action.setCallback(this, function(response)   {
            
            var state=response.getState();
            
            if(state === "SUCCESS"){
                //Rel#1.5,DCR-3592 - Mohit - Loading user personal details on Screen - Start
                component.set("v.claimApplicationWrapper.userRecord", response.getReturnValue());
                var homeAdd = '';
                //DCR-DCR-7388/DCR-7161
                if(component.get("v.claimApplicationWrapper.claimRecord.CTP_Submitter_Is_Claimant__c") == 'Yes'){
                    if(response.getReturnValue().CTP_UnitNumber__c != null){
                        homeAdd = response.getReturnValue().CTP_UnitNumber__c + ', ';
                    }
                    if(response.getReturnValue().CTP_Street_Number__c !=null){
                        homeAdd = homeAdd + response.getReturnValue().CTP_Street_Number__c +', ';
                    }
                    if(response.getReturnValue().CTP_Street__c != null){
                        homeAdd = homeAdd + response.getReturnValue().CTP_Street__c + ', ';
                    }
                    if(response.getReturnValue().CTP_User_State__c != null){
                        homeAdd = homeAdd + response.getReturnValue().CTP_User_State__c + ',';
                    }
                    if(response.getReturnValue().CTP_Suburb__c != null){
                        homeAdd = homeAdd + response.getReturnValue().CTP_Suburb__c + ',';
                    }
                    if(response.getReturnValue().CTP_Postcode__c != null){
                        homeAdd = homeAdd + response.getReturnValue().CTP_Postcode__c;
                    }
                    if(response.getReturnValue().CTP_Country__c != null){
                       homeAdd = homeAdd + response.getReturnValue().CTP_Country__c; 
                    }
                    var leng = homeAdd.length - 1;
                    var commalen = homeAdd.lastIndexOf(",");
                    if(leng == commalen){
                        homeAdd = homeAdd.substr(0,homeAdd.lastIndexOf(","));
                    }
                console.log('Home address@@@@  ->' +homeAdd);
                component.set("v.homeAddress", homeAdd);
                              
                // Rel#1.5,DCR-3592 - Mohit - End
                //alert(response.getReturnValue().CTP_Gender__c);
                console.log("Gender: " + response.getReturnValue().CTP_Gender__c);
                
                    if(response.getReturnValue().CTP_Gender__c == 'Male'){
                        component.set("v.maleB",true); 
                    }
                    if(response.getReturnValue().CTP_Gender__c == 'Female'){ 
                        component.set("v.femaleB",true);
                    }if(response.getReturnValue().CTP_Gender__c == 'Other'){
                        component.set("v.otherB",true);
                    }
                }else{ //DCR-7778: Claimant changed to onbehalf. 
                    
                    if(response.getReturnValue().CTP_Gender__c == 'Male'){
                        component.set("v.maleB",false); 
                    }
                    if(response.getReturnValue().CTP_Gender__c == 'Female'){ 
                        component.set("v.femaleB",false);
                    }if(response.getReturnValue().CTP_Gender__c == 'Other'){
                        component.set("v.otherB",false);
                    }
                }
                
                console.log('-----------------------sss--->'+response.getReturnValue().CTP_Gender__c);
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                    errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        }); 
        
        $A.enqueueAction(action);
    },
    
    validateEarlierdate : function(component, event) { //Date cannot be earlier than 1st of December 2017
        var dateOfAccident = component.get("v.dateOfAccident");
        if(dateOfAccident){
            console.log("dateOfAccident:: " + dateOfAccident);
            var earlierDate = "2017-12-01"; //Date cannot be earlier than 1st of December 2017
            if(dateOfAccident < earlierDate)
            {
                var errorDiv = component.find("DateofaccidentEarlierMsg");
                $A.util.removeClass(errorDiv, "slds-hidden");
                component.set("v.isError",true);
                component.set("v.proceedClaimApplication",false);
            }
            else
            {
                var errorDiv = component.find("DateofaccidentEarlierMsg");
                $A.util.addClass(errorDiv, "slds-hidden");
                component.set("v.isError",false);
                component.set("v.proceedClaimApplication",true);
            }
        }
    },
    
    
    userDataHelper : function(component, event, helper) {
        
        var action=component.get("c.getUserRecords");
        action.setCallback(this, function(response)   {
            
            var state=response.getState();
            
            if(state === "SUCCESS"){
                
                console.log('-------------------------->'+response.getReturnValue());
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                    errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });    
        
        
    },
    
    validateNameHelper : function(component, event, helper, elemId){
        console.log("validateNameHelper");
        var auraId;
        var claimantName;
        if(elemId == '' || elemId == undefined){
            var src=event.getSource();
        	auraId =  src.getLocalId();
            console.log("auraId: " + auraId);
            claimantName = component.find(auraId);
            claimantName = claimantName.get('v.value');
        }else{
            auraId = elemId;
            if (elemId == 'claimantName' ){
                claimantName = component.find("claimantName").get("v.value");
            }else{
                claimantName = component.find("claimantNameOnBehalf").get("v.value");
            }
        }
        var wrapperRecord = component.get("v.claimApplicationWrapper");
            wrapperRecord.claimRecord.CTP_Initial_Declaration__c = true;
            
            component.set("v.claimApplicationWrapper",wrapperRecord);
        console.log("dfeclaration: " + wrapperRecord.claimRecord.CTP_Initial_Declaration__c);
        console.log("name: " + claimantName);
        if( auraId == 'claimantName'){
        	var errorDivId = component.find("claimantNameErrMsg");
        }else{
            var errorDivId = component.find("claimantNameOnBehalfErrMsg");
        }
        if(claimantName.trim()==''){		
            component.set("v.isValidDeclaration",true);
            //var isChecked  =  component.find("declarationChk");
            //isChecked.set("v.value", false); //Unchecking checkbox
            component.set('v.isValid', true); //Disabling Next button
            $A.util.removeClass(errorDivId,"slds-hidden");
        }else{
            component.set('v.isValid', false); 
            $A.util.addClass(errorDivId,"slds-hidden");
        }
    },
    
    validateRepUnitNumberHelper :function(component, event){
        console.log('--inside validateRepStreetNumberHelper--'); 
        var UnitNum =component.get("v.repUnitNumber");
        console.log('UnitNum ---->'+UnitNum); 
        var UnitNumDiv = component.find("repUnitNumberMand");
        if(UnitNum ==null || UnitNum.trim()==''){
            
            console.log('UnitNum ---->'+UnitNum);
            $A.util.removeClass(UnitNumDiv,"slds-hidden");
            component.set("v.isError",true);
        }
        else
        {
            console.log('UnitNum ---->'+UnitNum);
            $A.util.addClass(UnitNumDiv,"slds-hidden");
            component.set("v.isError",false);
            
        } 
    },
    
    validateRepStreetNumberHelper :function(component, event){
        console.log('--inside validateRepStreetNumberHelper--'); 
        var streetnum =component.get("v.repStreetNumber");
        console.log('streetnumber ---->'+streetnum); 
        var streetDiv = component.find("repStreetNumberMand");
        if(streetnum ==null || streetnum.trim()==''){
            
            console.log('streetnumber---->'+streetnum);
            $A.util.removeClass(streetDiv,"slds-hidden");
            component.set("v.isError",true);
        }
        else
        {
            console.log('street ---->'+streetnum);
            $A.util.addClass(streetDiv,"slds-hidden");
            component.set("v.isError",false);
            
        } 
    },
    
    
    
    
    validateRepStreetHelper :function(component, event){
        console.log('--inside validateRepClaimantStreetHelper--'); 
        var street =component.get("v.repContactStreet");
        console.log('street ---->'+street); 
        var streetDiv = component.find("repContactStreetMand");
        if(street ==null || street.trim()==''){
            
            console.log('street ---->'+street);
            $A.util.removeClass(streetDiv,"slds-hidden");
            component.set("v.isError",true);
        }
        else
        {
            console.log('street ---->'+street);
            $A.util.addClass(streetDiv,"slds-hidden");
            component.set("v.isError",false);
            
        } 
    },
    
    validateRepSuburbHelper :function(component, event){
        
        console.log('--inside validateRepClaimantSuburbHelper--'); 
        var suburb =component.get("v.repContactSuburb");
        console.log('suburb ---->'+suburb); 
        var suburbDiv = component.find("repContactSuburbMand");
        if(suburb ==null || suburb.trim()==''){
            
            console.log('suburb ---->'+suburb);
            $A.util.removeClass(suburbDiv,"slds-hidden");
            component.set("v.isError",true);
        }
        else
        {
            console.log('suburb ---->'+suburb);
            $A.util.addClass(suburbDiv,"slds-hidden");
            component.set("v.isError",false);
            
        } 
    },
    validateRepPostcodeAddressHelper :function(component, event){
        
        console.log('--inside validateRepClaimantPostcodeAddressHelper--'); 
        var postalCode =component.get("v.repPostcodeAddress");
        console.log('postalCode ---->'+postalCode); 
        var postalCodeDiv = component.find("repPostcodeMand");
        var postalCodeMaxLengthDiv = component.find("repPostcodeMaxLength");
        
        if(postalCode ==null){
            
            console.log('postalCode ---->'+postalCode);
            $A.util.removeClass(postalCodeDiv,"slds-hidden");
            $A.util.addClass(postalCodeMaxLengthDiv,"slds-hidden");
            component.set("v.isError",true);
        }
        else
        {
            if(postalCode.toString().length >4 || postalCode.toString().length <4 )
            {
                console.log('postalCode.length>4'+postalCode);
                $A.util.removeClass(postalCodeMaxLengthDiv,"slds-hidden");
                $A.util.addClass(postalCodeDiv,"slds-hidden");
                component.set("v.isError",true);
            }
            else
            {
                console.log('postalCode ---->'+postalCode);
                $A.util.addClass(postalCodeDiv,"slds-hidden");
                $A.util.addClass(postalCodeMaxLengthDiv,"slds-hidden");
                component.set("v.isError",false);
            }
            
        } 
    },
    
    step1ValidationHelper: function(component, event, helper) {
        /* step-1 validations */
        if(component.get('v.step') == 1){
            console.log("proceedApplicationHelper step-1 validation");
            var proceedClaimApplication  = component.get("v.proceedClaimApplication");
            var selfSubmit = component.get("v.claimApplicationWrapper.claimRecord.CTP_Submitter_Is_Claimant__c");
            var claimNoExists = component.get("v.claimApplicationWrapper.claimRecord.CTP_Early_Treatment_Received__c");
            
            var isSelfSubmitErrDiv = component.find("isSelfSubmitErrMsg");
            var isClaimNoExitsErrDiv = component.find("isClaimNoExitsErrMsg");
            
        	console.log("selfSubmit: " + selfSubmit);
            console.log("claimNoExists: " + claimNoExists);
            if(!proceedClaimApplication){
                component.set('v.isStep1Valid', false);
            }
            else if(selfSubmit == undefined){
                $A.util.removeClass(isSelfSubmitErrDiv,"slds-hidden");
                component.set('v.isStep1Valid', false);
            }
            else if(selfSubmit == 'No'){
                $A.util.addClass(isSelfSubmitErrDiv,"slds-hidden");
                component.set('v.isStep1Valid', true);
                //component.set('v.step', component.get('v.step') + 1);
                console.log('v.step: '  + component.get('v.step'));
            }
            else if(claimNoExists == undefined){
                $A.util.addClass(isSelfSubmitErrDiv,"slds-hidden");
                $A.util.removeClass(isClaimNoExitsErrDiv,"slds-hidden");
                component.set('v.isStep1Valid', false);
            }
            else if(claimNoExists == 'Yes'){
                var claimNumber = component.find('claimNumber').get("v.value");
                var claimNumberErrorDiv = component.find("claimNumberErrMsg");
                $A.util.addClass(isClaimNoExitsErrDiv,"slds-hidden");
                if(claimNumber.trim()==''){
                    $A.util.removeClass(claimNumberErrorDiv,"slds-hidden");
                    component.set('v.isStep1Valid', false);
                }else{
                    $A.util.addClass(claimNumberErrorDiv,"slds-hidden");
                    component.set('v.isStep1Valid', true);
                	//component.set('v.step', component.get('v.step') + 1);
                    console.log('v.step: '  + component.get('v.step'));
                }
            }
            else{
                $A.util.addClass(isSelfSubmitErrDiv,"slds-hidden");
                $A.util.addClass(isSelfSubmitErrDiv,"slds-hidden");
                component.set('v.isStep1Valid', true);
                //component.set('v.step', component.get('v.step') + 1);
                console.log('v.step: '  + component.get('v.step'));
            }
        }
    },
    
    validateClaimNoHelper: function(component, event, helper) {
        var claimNumber =component.find('claimNumber').get("v.value");
        console.log('claimNumber: '+claimNumber);
        var errorDivId = component.find("claimNumberErrMsg");
        if(claimNumber.trim()==''){
            $A.util.removeClass(errorDivId,"slds-hidden");
        }
        else
        { 
            $A.util.addClass(errorDivId,"slds-hidden");
            var wrapperRecord = component.get("v.claimApplicationWrapper");
            wrapperRecord.claimRecord.CTP_Existing_Claim_Number__c = claimNumber;
            component.set("v.claimApplicationWrapper",wrapperRecord);
        }
    },
    
    validateHospitalName: function(component, event, helper) {
        var hospName =component.find('hospitalName').get("v.value");
        console.log('hospName: '+hospName);
        var errorDivId = component.find("hospitalNameErrMsg");
        if(hospName.trim()==''){
            $A.util.removeClass(errorDivId,"slds-hidden");
        }
        else
        { 
            $A.util.addClass(errorDivId,"slds-hidden");
            var wrapperRecord = component.get("v.claimApplicationWrapper");
            wrapperRecord.claimRecord.CTP_Hospital_Name__c = hospName;
            component.set("v.claimApplicationWrapper",wrapperRecord);
        }
    },
    
     
    onPreferredTimeChangeHelper: function(component, event, helper) {
        var preferredTime = event.getSource().get("v.value");
        var reqPreferredTimeErrDiv = component.find("reqPreferredTime");
        var preferredContactMethod =  component.get("v.preferredContactMethod");
        console.log("preferredTime: " + preferredTime );
        if(preferredContactMethod != "email" && preferredContactMethod != ""){
            if(preferredTime == "Preferred callback time"){
                $A.util.removeClass(reqPreferredTimeErrDiv,"slds-hidden");
            }else{
                $A.util.addClass(reqPreferredTimeErrDiv,"slds-hidden");
            }
         }else{
            $A.util.addClass(reqPreferredTimeErrDiv,"slds-hidden");
         }
    },
    
    setContactPreferenceHelper: function(component, event, helper) {
        var contactPreference = event.currentTarget.getAttribute('data-id');
        var preferredTime = component.get("v.preferredTime");
        var reqPreferredTimeErrDiv = component.find("reqPreferredTime");
        component.set("v.preferredContactMethod",contactPreference);
        console.log("contactPreference: " + contactPreference);
        if(contactPreference != "Email"){
            if(preferredTime == "Preferred callback time"){
                $A.util.removeClass(reqPreferredTimeErrDiv,"slds-hidden");
            }else{
                $A.util.addClass(reqPreferredTimeErrDiv,"slds-hidden");
            }
        }else{
            $A.util.addClass(reqPreferredTimeErrDiv,"slds-hidden");
        }
    },
    
    geolocateHelper: function(component, event, helper) {
        console.log("geolocateHelper called");
        console.log("geolocation: " + navigator.geolocation);
        
        var autocomplete = component.get("v.autocomplete");
        var autocompleteElement = document.getElementById('autocomplete');
        var options = {types: ['geocode']};
        console.log("autocompleteElement: " + autocompleteElement);
       console.log(new google.maps.places.Autocomplete(autocompleteElement,options));
	      
        
        if (navigator.geolocation) {
          console.log("autocomplete: " + component.get("v.autocomplete"));
          navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
              center: geolocation,
              radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
          });
        }
    },
    
    initAutocompleteHelper: function(component, event, helper) {
        // Create the autocomplete object, restricting the search to geographical
        // location types.
        console.log("initAutocompleteHelper called");
        var autocomplete = component.get("v.autocomplete");
        var autocompleteElement = document.getElementById('autocomplete');
        var options = {types: ['geocode']};
        console.log("autocompleteElement: " + autocompleteElement);
        //autocomplete = new google.maps.places.Autocomplete(autocompleteElement);
		component.set("v.autocomplete", autocomplete);
        console.log("initAutocompleteHelper: " + component.get("v.autocomplete"));
        // When the user selects an address from the dropdown, populate the address
        // fields in the form.
       // autocomplete.addListener('place_changed', fillInAddress);
    },
    
    //DCR-3587
    initializeClaimApplicationWrapper : function(component, helper){
        console.log('came here');
        var action = component.get("c.initalizeClaimApplicationWrapper");
        action.setCallback(this, function(response){
            var state = response.getState();
            console.log("state is ",state);
            if(state == "SUCCESS"){
                var claimApplicationWrapper = response.getReturnValue();
                component.set("v.claimApplicationWrapper",claimApplicationWrapper);
                console.log("wrapper",claimApplicationWrapper);
                component.set("v.objInfo",claimApplicationWrapper.userRecord);
                component.set("v.claim",claimApplicationWrapper.claimRecord);
                component.set("v.case",claimApplicationWrapper.caseRecord);
                
                console.log('>>> before injury list init>>> ');
                var injuryRecLst = claimApplicationWrapper.injuryRecordList;
                   
                if(injuryRecLst.length==0)
                {
                    console.log('>>> inside if condition >>> ');
                    injuryRecLst.push({
                        
                        'sobject': 'CTP_Injury_Treatment__c',
                        'CTP_Injury_Description__c': '',
                        'RecordTypeId' : ''
                    });
               		component.set("v.injuriesHistory",injuryRecLst);

                }
                 console.log('>>> if condition ends>>> ');   
                //component.set("v.objInfo",claimApplicationWrapper.userRecord);
                
            }
        });
        $A.enqueueAction(action);
    },
    //Method Added as part of DCR-3634 to retrieve all attachments associated to case
    getAttachments : function(caseId,component,category) {
        console.log("Inside GetAttachments>>>");
        var action=component.get("c.getAttachments");
        action.setParams({
            caseId : caseId,
            category : category,
        })
        action.setCallback(this, function(response)   { 
            var state = response.getState();
            if(state === "SUCCESS"){
                var attachMap = response.getReturnValue();
                var attachList = [];
                console.log("maps iss",attachMap);
                for(var key in attachMap){
                    var attach = {
                        "attachment" : attachMap[key],
                        "key" : key,
                    };
                    attachList.push(attach);
                }
                
                component.set('v.attachmentList',attachList);
                
                console.log('-------------------------->',component.get('v.attachmentList'));
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                    errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });    
        $A.enqueueAction(action);
    },
    //Method Added as part of DCR-3634 to retrieve site url for accessing the attachment
    getSiteURL:function(component){
        var action=component.get("c.getSiteURL");
        action.setCallback(this, function(response)   { 
            var state=response.getState();
            if(state === "SUCCESS"){
                component.set("v.siteURL",response.getReturnValue());
                console.log('----siteurl---------------------->'+response.getReturnValue());
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                    errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });    
        $A.enqueueAction(action);
        
    },
    //Method Added as part of DCR-3634 to delete the attachment from the list
    deleteAttachment: function(component,fileId){
        console.log('inside helper, none setParams');
       var action=component.get("c.deleteAttachmentFromServer");
      console.log('inside helper, before setParams');
            action.setParams({
                "attachmentId" : fileId
            });
        console.log('inside helper, after setParams');
            action.setCallback(this, function(response) {
                var state = response.getState();
                console.log('deleteAttachment =-------------'+state);
                if(state === "SUCCESS")
                {
                    console.log('SUCCESS');
                    console.log('deleteAttachment Response =-------------'+response.getReturnValue());
                }
            });
            
            $A.enqueueAction(action); 
    },

    //DCR-3153
    saveRecord : function(component, helper){
        console.log('inside of save record');
         //DCR-5498 Himani, start,  for restricted picklist values
        var wrapper = component.get("v.claimApplicationWrapper");
        
        if (step == 8) {
            console.log('Inside Step 8..........>>>',wrapper.caseRecord.CTP_Insurer_Reference_Number__c);
        }
        
        if(wrapper.claimRecord.CTP_Accident_Role__c ==  'Select role'){
            wrapper.claimRecord.CTP_Accident_Role__c = '';
            component.set("v.claimApplicationWrapper", wrapper);
        }
        if(wrapper.claimRecord.CTP_Previous_Insurer_1__c ==  'Select Insurer'){
            wrapper.claimRecord.CTP_Previous_Insurer_1__c = '';
            component.set("v.claimApplicationWrapper", wrapper);
        }
        if(wrapper.claimRecord.CTP_Previous_Insurer_2__c ==  'Select Insurer'){
            wrapper.claimRecord.CTP_Previous_Insurer_2__c = '';
            component.set("v.claimApplicationWrapper", wrapper);
        }
        if(wrapper.claimRecord.CTP_Previous_Insurer_3__c ==  'Select Insurer'){
            wrapper.claimRecord.CTP_Previous_Insurer_3__c = '';
            component.set("v.claimApplicationWrapper", wrapper);
        }
        if(wrapper.claimRecord.CTP_Previous_Insurer_4__c ==  'Select Insurer'){
            wrapper.claimRecord.CTP_Previous_Insurer_4__c = '';
            component.set("v.claimApplicationWrapper", wrapper);
        }
        if(wrapper.claimRecord.CTP_Previous_Insurer_5__c ==  'Select Insurer'){
            wrapper.claimRecord.CTP_Previous_Insurer_5__c = '';
            component.set("v.claimApplicationWrapper", wrapper);
        }
         //DCR-5498 Himani, End,  for restricted picklist values
        
        // Rel#1.5,DCR-3592 - Mohit -start
         var step = component.get('v.step');
         
        if (step == 4) {
            this.syncVehicles(component);            
            var wrapperRecord = component.get("v.claimApplicationWrapper");
            wrapperRecord.injuryRecordList = component.get('v.injuriesHistory').filter(function (item) {
                item.RecordTypeId = $A.get("$Label.c.CTP_Injury_Record_Type_Id");
                item.CTP_Injury_Treatment_Case__c = wrapperRecord.caseRecord.Id;
                return item.CTP_Injury_Description__c !== "";
            });
             console.log('injuryRecordList stringify>>> '+JSON.stringify(wrapperRecord.injuryRecordList.Id));
             console.log('injuryRecordList stringify>>> '+JSON.stringify(wrapperRecord.injuryRecordList));
         }
         if(step == 2){
            console.log('In Step 2 record Save');
          
            var wrapperRecord = component.get("v.claimApplicationWrapper");
            if(document.getElementById("female").checked == true){
                console.log('I am in Gender Female');
                wrapperRecord.userRecord.CTP_Gender__c = 'Female';
                 wrapperRecord.caseRecord.CTP_Gender__c = 'Female';//DCR-7176
                
            }
            if(document.getElementById("male").checked == true){
                console.log('I am in Gender Male');
                wrapperRecord.userRecord.CTP_Gender__c = 'Male';
                 wrapperRecord.caseRecord.CTP_Gender__c = 'Male';//DCR-7176
            }
            if(document.getElementById("other").checked == true){
                console.log('I am in Gender Other');
                wrapperRecord.userRecord.CTP_Gender__c = 'Other';
                 wrapperRecord.caseRecord.CTP_Gender__c = 'Other';//DCR-7176
            }
             //DCR-7173 SIT Defect Starts
             var langSelected = component.get("v.claimApplicationWrapper.caseRecord.CTP_Language__c");
             if(langSelected != undefined && (langSelected != '' || langSelected != '--None--')){
                 wrapperRecord.contactRecord.InterpreterRequired__c = 'Yes';
             }else{
                 wrapperRecord.contactRecord.InterpreterRequired__c = 'No';
             }
             
             //DCR-6263 Starts: Date 13-Mar-2018: Injured Person Contact Details / Submitter Contact Details not being populated: Upendra      
             if(component.get("v.claimApplicationWrapper.claimRecord.CTP_Submitter_Is_Claimant__c") =='Yes') {
                 console.log('Inside injured person contact details>> ');
                 wrapperRecord.caseRecord.CTP_Submitter_First_Name__c = wrapperRecord.userRecord.FirstName;
                 wrapperRecord.caseRecord.CTP_Submitter_Last_Name__c = wrapperRecord.userRecord.LastName;
                 wrapperRecord.caseRecord.CTP_Submitter_SNSW_Email__c = wrapperRecord.userRecord.Email;
                 
                 console.log('>>v.alternateEmailChk>>'+component.get("v.alternateEmailChk"));
                 if(component.get("v.alternateEmailChk") == "Login Email")
                	 wrapperRecord.caseRecord.CTP_Submitter_Preferred_Email_Address__c = wrapperRecord.userRecord.Email;
                 else if(component.get("v.alternateEmailChk") =="Alternative Email"){
                        wrapperRecord.caseRecord.CTP_Submitter_Preferred_Email_Address__c =  component.get("v.claimApplicationWrapper.caseRecord.CTP_Prefered_Email_Address_Injured_Persn__c");
                 }

                 if(component.get("v.claimApplicationWrapper.caseRecord.CTP_Preferred_Contact_Method__c") == "Mobile"){
                	wrapperRecord.caseRecord.CTP_Submitter_Phone__c  = component.get("v.claimApplicationWrapper.caseRecord.CTP_Mobile__c");
                 }else if (component.get("v.claimApplicationWrapper.caseRecord.CTP_Preferred_Contact_Method__c") == "Home Phone"){
                     console.log('>> Inside Home Phone>> ');
                 	wrapperRecord.caseRecord.CTP_Submitter_Phone__c = component.get("v.claimApplicationWrapper.caseRecord.CTP_Home_Phone__c");
                 }else if(component.get("v.claimApplicationWrapper.caseRecord.CTP_Preferred_Contact_Method__c") == "Work Phone"){
                 	wrapperRecord.caseRecord.CTP_Submitter_Phone__c =component.get("v.claimApplicationWrapper.caseRecord.CTP_Work_Phone__c");
                 }
             }
            
            //DCR-6263 Ends: Date 13-Mar-2018: Injured Person Contact Details / Submitter Contact Details not being populated: Upendra
             
             //DCR-7173 SIT Defect Ends
         	//Rel 1.5: DCR-4863 - Mohit - Starts
            helper.populateClaimHistoryRecord(component, null, helper);
            component.set("v.claimApplicationWrapper",wrapperRecord);
        	//Rel 1.5: DCR-4863 - Mohit - Ends
           
        }
        // Rel#1.5,DCR-3592 - Mohit - end 
        
        /* AScollay: DCR-4866 OLCS - Claimant selects "Next" [Health --> Employment] */
	//Added as part of DCR-3652 and DCR-3659 Start Sridevi
        if(step == 5) {            
            console.log('>>>>> made it inside step 3 code for Helper.js');   
            // -- Sridevi 5016 --- Fix 
            var wrapperRecord = component.get("v.claimApplicationWrapper");
            // Ben Change starts
            var amblist = component.get("v.claimApplicationWrapper.claimRecord.Ambulance_Service_Received__c");
            wrapperRecord.claimRecord.Ambulance_Service_Received__c = amblist;
            //Below line uncommented for 5016 and changed the attribute called CTP_Treatment_Rec_At_Hosp_Post_Accident__c
            wrapperRecord.claimRecord.CTP_Treatment_Rec_At_Hosp_Post_Accident__c = component.get('v.CTP_Treatment_Rec_At_Hosp_Post_Accident__c');
            wrapperRecord.claimRecord.CTP_Hospital_Name__c = component.get('v.claimApplicationWrapper.claimRecord.CTP_Hospital_Name__c');
            wrapperRecord.claimRecord.CTP_Ambulance_Used__c = component.get('v.claimApplicationWrapper.claimRecord.CTP_Ambulance_Used__c');
            wrapperRecord.claimRecord.CTP_Discharged_From_Hospital__c = component.get('v.dischargedFromHospitalYesNo');
            //Below line commented for 5016 as there was no attribute called dateOfDischargeFromHospital
            //wrapperRecord.claimRecord.CTP_Date_Of_Discharge__c = component.get('v.claimApplicationWrapper.claimRecord.dateOfDischargeFromHospital');           
            console.log("injuryList", JSON.stringify(wrapperRecord.injuryRecordList));                       
            wrapperRecord.treatmentRecordList = component.get("v.treatmentsHistory").filter(function (item) {                
                item.RecordTypeId = $A.get("$Label.c.CTP_Treatment_Record_Type_Id");
                item.CTP_Injury_Treatment_Case__c = wrapperRecord.caseRecord.Id;                
                return item.CTP_Treatment_Description__c !== "";
            });
            wrapperRecord.preInjuryRecordList = component.get("v.previousInjuriesHistory").filter(function (item) {                
                item.RecordTypeId = $A.get("$Label.c.CTP_Injury_Record_Type_Id");                
                item.CTP_Injury_Treatment_Case__c = wrapperRecord.caseRecord.Id; 
                item.CTP_Previous_Injury__c = component.get("v.claimApplicationWrapper.claimRecord.CTP_Previous_Illness_or_Injury__c") === "Yes";
                return item.CTP_Injury_Description__c !== "" && component.get("v.claimApplicationWrapper.claimRecord.CTP_Previous_Illness_or_Injury__c") === "Yes";
            });  
            // -- Sridevi 5016 --- Fix 
            }
       
        //Added as part of DCR-3652 and DCR-3659 End Sridevi
        
        //DCR-3164, DCR-3660 - Mohit Starts
          if(step == 6 ){
            console.log('I am in step 6 ####');
            var empRec = component.get("v.employerHistory");
            console.log('Employment History Array -->',JSON.stringify(empRec));
            console.log('Employment History Length-->',empRec.length);
           	console.log('Employment Status flag  -->',component.get("v.isDisplayAwayFromWorkForm"));
            var wrapperRecord = component.get("v.claimApplicationWrapper");
            helper.populateEmploymentRecord(component, null, helper);
            console.log('Contact Details are updated');  
            component.set("v.claimApplicationWrapper",wrapperRecord);
          }
		//DCR-3660,3164 - Mohit - Ends


        
        var action = component.get('c.saveClaimApplication');
         console.log('I am here1');
        var claimApplication = component.get("v.claimApplicationWrapper");
        console.log('I am here2');
        var claimApplicationJSON = JSON.stringify(claimApplication);
        console.log('I am here3>>> ' + JSON.stringify(claimApplication));
        //var step = component.get('v.step');
        console.log('step here is -->',step);
        console.log('inside of save');
        action.setParams({
            'claimApplicationJSON' : claimApplicationJSON,
            'step' : step.toString(),
        });
        console.log('after action params');
       // alert('setCB');
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                console.log('inside success of save');
                component.set("v.claimApplicationWrapper", response.getReturnValue());
                var claimApplicationWrapper = component.get("v.claimApplicationWrapper"); // -- Sridevi 5016 --- Fix 
                console.log('saved wrapper is ==>',component.get("v.claimApplicationWrapper"));
                component.set("v.caseRecordId",component.get("v.claimApplicationWrapper").caseRecord.Id);
                // -- Sridevi 5016 --- Fix 
                component.set("v.injuriesHistory",claimApplicationWrapper.injuryRecordList);
                component.set("v.treatmentsHistory",claimApplicationWrapper.treatmentRecordList);
                component.set("v.previousInjuriesHistory",claimApplicationWrapper.preInjuryRecordList);
                //component.set("v.vehicles",claimApplicationWrapper.vehicleRecords);
                console.log(">>> injury History <>> "+JSON.stringify(component.get("v.preInjuryRecordList")));
                // -- Sridevi 5016 --- Fix 
                
                if(component.get('v.step') == 1)
                	this.initiateAutoSave(component);
                else if(step === 4){
                    var vehicles = component.get('v.vehicles');
                    vehicles = component.get("v.claimApplicationWrapper").vehicleRecords;
                    component.set('v.vehicles',vehicles);
                }
                
                component.set('v.step', step + 1);
                 //DCR-6782
                if(component.get('v.step') == 3){
                     var wrapperRecord = component.get("v.claimApplicationWrapper");
       
        			if(wrapperRecord.claimRecord.CTP_Time_Of_Accident__c!='undefined' && wrapperRecord.claimRecord.CTP_Time_Of_Accident__c!='' && wrapperRecord.claimRecord.CTP_Time_Of_Accident__c!=null){
                    this.displayTime(component, null, helper);
                    }
                    //DCR-7720
                    if(component.get("v.isDisplayManualAccidentAddress")==true){
                     console.log('inside if');
                         var claimApplicationWrapper = component.get("v.claimApplicationWrapper");
                         claimApplicationWrapper.claimRecord.CTP_Accident_State__c = "NSW";//DCR-7751
                         claimApplicationWrapper.claimRecord.CTP_Accident_Co_Ordinates__c = "0.0";
                         component.set("v.claimApplicationWrapper",claimApplicationWrapper);
                    }
                }
                if(component.get('v.step') == 4){
                    var isVehicleInvolved = component.get("v.claimApplicationWrapper.claimRecord.CTP_Vehicles_Involved_Are_Known__c");
                    var isMostAtFault = component.get("v.claimApplicationWrapper.claimRecord.CTP_Most_at_Fault_Vehicle_Known__c");
                    //Himani Start
                    var isMostAtFaultStateKnown = component.get("v.claimApplicationWrapper.claimRecord.CTP_State_Of_Registration_Known__c");
                    
                    if(isVehicleInvolved == "Yes" && isMostAtFault == "Yes" && isMostAtFaultStateKnown== "Yes"){
                        helper.fetchPickListVal(component, 'CTP_Claim__c', 'Most_at_fault_vehicle_state__c', 'registeredVehicleState', null);
                    }
                    //Himani End
                    
                    if(isVehicleInvolved == "Yes" && isMostAtFault == "Yes"){
                       // helper.loadVehicleRegs(component, event);
                    }
                    if(isMostAtFault == "I am unsure"){
                        var mostAtFaultVehicleUnsure = component.find("mostAtFaultVehicleUnsure");
                        $A.util.addClass(mostAtFaultVehicleUnsure, 'unsure');
                    }
                }
                
                //DCR-4172, DCR-5231 date: 23 jan 2018
                   if(component.get('v.countForSaveMessagefade') == 1 && (component.get('v.step')==2)){
                       var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                        "title": "Your application has been automatically saved",
                        "message": "We will automatically save your application every minute.",
                        "duration": "10000",
                        "type":"success"
                    });
                    toastEvent.fire();
                    component.set('v.countForSaveMessagefade',2);
                      
                   }
                    
                 //DCR-4172

            } 
            else {
                // Vivek: Temporary Fix for application to continue with save failure
                component.set('v.step', component.get('v.step') + 1);
            }
            
        });
        $A.enqueueAction(action);
        console.log('action after enqueued',action);
    },
    
    //DCR-2589
    initiateAutoSave : function(component){
        console.log('auto save initiated');
        
        
    },
    validateAccNameHelper: function(component, event, helper) {
        var accountName = component.find("accountName").get("v.value");
        var errorDivId = component.find("accountNameReq");
        if(accountName==null || accountName==''){
            $A.util.removeClass(errorDivId,"slds-hidden");
        }
        else
        { 
            $A.util.addClass(errorDivId,"slds-hidden");
        }
    },
    validateAccNumbereHelper: function(component, event, helper) {
        var accountNumber = component.find("accountNumber").get("v.value");
        var errorDivIdReq = component.find("accountNumberReq");
        var errorDivIdInvalid = component.find("invalidAccountNumber");
     
        if(accountNumber == null){
            $A.util.removeClass(errorDivIdReq,"slds-hidden");
            $A.util.addClass(errorDivIdInvalid,"slds-hidden");
        }
        else if(accountNumber.toString().length < 6 || accountNumber.toString().length > 9){
            $A.util.addClass(errorDivIdReq,"slds-hidden");
            $A.util.removeClass(errorDivIdInvalid,"slds-hidden");
        }
        else
        { 
            $A.util.addClass(errorDivIdReq,"slds-hidden");
            $A.util.addClass(errorDivIdInvalid,"slds-hidden");
        }
    },
    validateBSBHelper: function(component, event, helper) {
        var bsb = component.get("v.claimApplicationWrapper");
        bsb = bsb.claimRecord.CTP_BSB__c;
        var errorDivIdReq = component.find("bsbReq");
        var errorDivIdInvalid = component.find("invalidBsb");
         var bsbValid = /^\d{3}-?\d{3}$/;
        
        if(bsb==null || bsb==''){
            $A.util.removeClass(errorDivIdReq,"slds-hidden");
			$A.util.addClass(errorDivIdInvalid,"slds-hidden");            
        }
        else if(!bsb.match(bsbValid)){
            $A.util.removeClass(errorDivIdInvalid,"slds-hidden");
            $A.util.addClass(errorDivIdReq,"slds-hidden");
        }
        else
        { 
            $A.util.addClass(errorDivIdReq,"slds-hidden");
            $A.util.addClass(errorDivIdInvalid,"slds-hidden");
        }
    },
    
    /*
     * DCR-2810
     * Ashish
     * Start
    */
    //Address autocomplete
    seachForAddress : function(component, searchPhrase){
        console.log('inside helper');
        var action = component.get("c.getAddressAutoComplete");
        console.log('action found');
        action.setParams({
            "searchPhrase" : searchPhrase,
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            console.log("state is ==>",state);
            if(state === "SUCCESS"){
                var searchLookup = component.find("searchLookup");
                $A.util.addClass(searchLookup, 'slds-is-open');
        		$A.util.removeClass(searchLookup, 'slds-combobox-lookup');
                console.log("callout successful.");
                var predictions = JSON.parse(response.getReturnValue());
                component.set("v.predictions",predictions);
                //console.log("parsed predictions are-->",JSON.parse(response.getReturnValue()));
            }
        });
        $A.enqueueAction(action);
        console.log('action enqueued');
    },
    
    //call google for selected place
    getDetailsForSelectedPlace : function(component, placeId, homeAddress){
        console.log('in helper, dropdown should be hidden');
        var action = component.get("c.getSelectedPlaceDetails");
        action.setParams({
            "placeId" : placeId,
        });
        action.setCallback(this,function(response){
           var state = response.getState();
            console.log("state while fetching place details",state);
            if(state === "SUCCESS"){
                //console.log("place details are==>",response.getReturnValue());
                this.handleResponseForPlaceDetails(component,response.getReturnValue());
                component.set("v.homeAddress",homeAddress);
            }else{
                component.set("v.homeAddress",'');
            }
        });
        $A.enqueueAction(action);
    },
    
    //set user's selected place to wrapper
    handleResponseForPlaceDetails : function(component, response){
        console.log('response handled');
        var placeDetails = JSON.parse(response);
        //console.log('addresses is',placeDetails.result.address_components);
        var claimApplicationWrapper = component.get('v.claimApplicationWrapper');
        for(var i = 0; i < placeDetails.result.address_components.length; i++){
            for(var j = 0; j < placeDetails.result.address_components[i].types.length; j++){
                if(placeDetails.result.address_components[i].types[j] == 'postal_code'){
                    //var claimApplicationWrapper = component.get('v.claimApplicationWrapper');
                    claimApplicationWrapper.userRecord.CTP_Postcode__c = placeDetails.result.address_components[i].long_name;
                    //component.set("v.claimApplicationWrapper",claimApplicationWrapper);
                    break;
                }else if(placeDetails.result.address_components[i].types[j] == 'street_number'){
                    claimApplicationWrapper.userRecord.CTP_Street_Number__c = placeDetails.result.address_components[i].long_name;
                    break;
                }else if(placeDetails.result.address_components[i].types[j] == 'subpremise'){
                    claimApplicationWrapper.userRecord.CTP_UnitNumber__c = placeDetails.result.address_components[i].long_name;
                    break;
                }else if(placeDetails.result.address_components[i].types[j] == 'route'){
                    claimApplicationWrapper.userRecord.CTP_Street__c = placeDetails.result.address_components[i].long_name;
                    break;
                }else if(placeDetails.result.address_components[i].types[j] == 'locality'){
                    claimApplicationWrapper.userRecord.CTP_Suburb__c = placeDetails.result.address_components[i].long_name;
                    break;
                }else if(placeDetails.result.address_components[i].types[j] == 'administrative_area_level_1'){
                    claimApplicationWrapper.userRecord.CTP_User_State__c = placeDetails.result.address_components[i].short_name;
                    break;
                }else if(placeDetails.result.address_components[i].types[j] == 'country'){
                    claimApplicationWrapper.userRecord.CTP_Country__c = placeDetails.result.address_components[i].long_name;
                    break;
                }
            }
        }
        component.set("v.claimApplicationWrapper",claimApplicationWrapper);
        //console.log("claim wrapper after settign places",component.get("v.claimApplicationWrapper"));
    },
    /*
     * DCR-2810
     * Ashish
     * Start
    */
    
   /*
     * DCR-3651
     * Himani
     * Start
    */
    
    
    seachForAccidentAddress : function(component, searchPhrase){
        console.log('inside helper');
        var action = component.get("c.getAddressAutoComplete");
        console.log('action found');
        action.setParams({
            "searchPhrase" : searchPhrase,
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            console.log("state is ==>",state);
            if(state === "SUCCESS"){
                var searchLookup = component.find("searchLookupForAccident");
                $A.util.addClass(searchLookup, 'slds-is-open');
        		$A.util.removeClass(searchLookup, 'slds-combobox-lookup');
                console.log("callout successful.");
                var predictionsForAccident = JSON.parse(response.getReturnValue());
                component.set("v.predictionsForAccident",predictionsForAccident);
                //console.log("parsed predictions are-->",JSON.parse(response.getReturnValue()));
            }
        });
        $A.enqueueAction(action);
        console.log('action enqueued');
    },
    
    //call google for selected place
    getDetailsForSelectedAccidentPlace : function(component, placeId){
        console.log('in helper, dropdown should be hidden');
        var action = component.get("c.getSelectedPlaceDetails");
        action.setParams({
            "placeId" : placeId,
        });
        action.setCallback(this,function(response){
           var state = response.getState();
            console.log("state while fetching place details",state);
            if(state === "SUCCESS"){
                console.log("place details are==>");
                console.log(response.getReturnValue());
                 var placeDetails = JSON.parse(response.getReturnValue());
                console.log('geolemtry coordinates');
               
                console.log(placeDetails.result.geometry);
                
                
                this.handleResponseForAccidentDetails(component,response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    
    //set user's selected accident place to wrapper
    handleResponseForAccidentDetails : function(component, response){
        console.log('response handled');
        var placeDetails = JSON.parse(response);
        component.set("v.latitude",placeDetails.result.geometry.location.lat);
        component.set("v.longitude",placeDetails.result.geometry.location.lng);
        var claimApplicationWrapper = component.get('v.claimApplicationWrapper');
        claimApplicationWrapper.claimRecord.CTP_Accident_Co_Ordinates__c=component.get("v.latitude") +' '+component.get("v.longitude");
        console.log('lat long--************   '+claimApplicationWrapper.claimRecord.CTP_Accident_Co_Ordinates__c);
         

      
        console.log('event fire');
        var mapLocationFlag = false;
          for(var i = 0; i < placeDetails.result.address_components.length; i++){
            for(var j = 0; j < placeDetails.result.address_components[i].types.length; j++){
                if(placeDetails.result.address_components[i].types[j] == 'administrative_area_level_1'){
                    if(placeDetails.result.address_components[i].short_name=='NSW'){
                        component.set("v.selectedLoc",placeDetails.result.formatted_address);
                        component.set("v.insideOutside",'inside');
                       //component.find("AccidentAddress").set("v.value",placeDetails.result.formatted_address);
                        var NSWMapDiv = component.find("NSWMap");
                        var NSWMapErrorDiv = component.find("NSWMapError");
                         $A.util.removeClass(NSWMapDiv,"slds-hidden");
                         $A.util.addClass(NSWMapErrorDiv,"slds-hidden"); 
                        
                         mapLocationFlag = true;
                          var appEvent =  $A.get("e.c:CTP_GoogleMap_Event");
                            appEvent.setParams({
                                latitude : component.get("v.latitude"),
                                longitude :component.get("v.longitude"),
                                'selectedLocation':'inside'
                            });
                            appEvent.fire();
                        
                      
                        
                    }else
                    {
                        component.set("v.insideOutside",'outside');
                        component.set("v.selectedLoc",'');
                        component.find("AccidentAddress").set("v.value",'');
                         var appEvent =  $A.get("e.c:CTP_GoogleMap_Event");
                            appEvent.setParams({
                                latitude : component.get("v.latitude"),
                                longitude :component.get("v.longitude"),
                                'selectedLocation':'outside'
                            });
                            appEvent.fire();
                        mapLocationFlag = false; 
                        //NSWMapError NSWMap
                        var NSWMapDiv = component.find("NSWMap");
                        var NSWMapErrorDiv = component.find("NSWMapError");
                         $A.util.addClass(NSWMapDiv,"slds-hidden");
                         $A.util.removeClass(NSWMapErrorDiv,"slds-hidden"); 
                        //DCR-7941  
                      	console.log('set value null');  
                        claimApplicationWrapper.claimRecord.CTP_Accident_Postcode__c = null;
                        claimApplicationWrapper.claimRecord.CTP_Accident_Street_Number__c = null;
                        claimApplicationWrapper.claimRecord.CTP_Accident_Street__c = null;
                        claimApplicationWrapper.claimRecord.CTP_Accident_Suburb__c = null;
                        claimApplicationWrapper.claimRecord.CTP_Accident_State__c = ''; 
                        claimApplicationWrapper.claimRecord.CTP_Accident_Co_Ordinates__c = null;
                    }
                    
                    break;
                }
            }
        }
        if(mapLocationFlag == true){
            //DCR-7941 
            console.log('set value null');  
            claimApplicationWrapper.claimRecord.CTP_Accident_Postcode__c = null;
            claimApplicationWrapper.claimRecord.CTP_Accident_Street_Number__c = null;
            claimApplicationWrapper.claimRecord.CTP_Accident_Street__c = null;
            claimApplicationWrapper.claimRecord.CTP_Accident_Suburb__c = null;
            
             for(var i = 0; i < placeDetails.result.address_components.length; i++){
                for(var j = 0; j < placeDetails.result.address_components[i].types.length; j++){
                    if(placeDetails.result.address_components[i].types[j] == 'postal_code'){
                        
                        claimApplicationWrapper.claimRecord.CTP_Accident_Postcode__c = placeDetails.result.address_components[i].long_name;
                       
                        break;
                    }else if(placeDetails.result.address_components[i].types[j] == 'street_number'){
                        claimApplicationWrapper.claimRecord.CTP_Accident_Street_Number__c = placeDetails.result.address_components[i].long_name;
                        break;
                    }else if(placeDetails.result.address_components[i].types[j] == 'route'){
                        claimApplicationWrapper.claimRecord.CTP_Accident_Street__c = placeDetails.result.address_components[i].long_name;
                        break;
                    }else if(placeDetails.result.address_components[i].types[j] == 'locality'){
                        claimApplicationWrapper.claimRecord.CTP_Accident_Suburb__c = placeDetails.result.address_components[i].long_name;
                        break;
                    }else if(placeDetails.result.address_components[i].types[j] == 'administrative_area_level_1'){
                        claimApplicationWrapper.claimRecord.CTP_Accident_State__c = placeDetails.result.address_components[i].short_name;//DCR-7751
                        break;
                    }
                }
            }
            
            if(claimApplicationWrapper.claimRecord.CTP_Accident_Postcode__c==null ||   
               claimApplicationWrapper.claimRecord.CTP_Accident_Street__c == null ||
               claimApplicationWrapper.claimRecord.CTP_Accident_Suburb__c == null ||
               claimApplicationWrapper.claimRecord.CTP_Accident_State__c==''){
                
                component.set("v.isDisplayManualAccidentAddress", true);
                component.set("v.DataMissingAttr", true);
                component.set("v.selectedLoc",'');
            }else
            {
               component.set("v.isDisplayManualAccidentAddress", false);
                component.set("v.DataMissingAttr", false); 
            }
            
        }
       
        
       
        component.set("v.claimApplicationWrapper",claimApplicationWrapper);        
        
        
    }, 
    
    
        
         /*
     * DCR-3651
     * Himani
     * End
    */
    loadVehicleRegs: function(component, event, helper) {
        var vehicles = component.get("v.vehicles");
        var regs=[];
          if (vehicles != undefined && vehicles.length > 0) {
                    regs.push({
                        class: "optionClass",
                        label: "--- None ---",
                        value: ""
                    });
                }
        for (var i=0;i<vehicles.length;i++){
         if(vehicles[i].CTP_Registration_Number__c != null && vehicles[i].CTP_Registration_Number__c != ''){
               
                regs.push({
                    class: "optionClass",
                    label: vehicles[i].CTP_Registration_Number__c,
                    value: vehicles[i].CTP_Registration_Number__c
                });
            }
        }
        component.set("v.vehicleRegistrations", regs);
        
        
        var registrationsNumber = component.find("registrationsNumber");
        
        var mostAtFaultVehicleOpt = component.find("mostAtFaultVehicleOpt").get("v.value");
        if(mostAtFaultVehicleOpt == "Yes"){
            if(regs.length <= 0){
                component.set('v.vehicleRegistrationNotFound', true);
                component.set('v.vehicleRegistrationFound', false);
                component.set('v.vehicleFoundPIE',false);
                component.set('v.vehicleNotFoundPIE',false);
                component.set('v.technicalIssuePIE', false);
            }else{
                component.set('v.vehicleRegistrationNotFound', false);
                component.set('v.vehicleRegistrationFound', true);
                //component.set('v.technicalIssuePIE', false);
                
                var registrationsNumber = component.find("registrationsNumber");
                registrationsNumber.set("v.options", regs); 
            }
        }
        
    },
     increaseHour: function(component, event, helper) {
        var accidentHour  =  component.get('v.accidentHour');
        accidentHour = accidentHour<12 ? (accidentHour+1) : 1;
       	component.set('v.accidentHour', accidentHour);
        helper.displayTime(component, event, helper);
        helper.validateTimeWindowHelper(component, event, helper);
    },
    decreaseHour: function(component, event, helper) {
        var accidentHour  =  component.get('v.accidentHour');
        accidentHour = accidentHour > 1 ? (accidentHour-1) : 12;
       	component.set('v.accidentHour', accidentHour);
        helper.displayTime(component, event, helper);
        helper.validateTimeWindowHelper(component, event, helper);
    },
    increaseMinute: function(component, event, helper) {
        var accidentMinute  =  component.get('v.accidentMinute');
        accidentMinute = accidentMinute < 59 ? (accidentMinute+1) : 0;
        component.set('v.accidentMinute', accidentMinute);
        helper.displayTime(component, event, helper);
        helper.validateTimeWindowHelper(component, event, helper);
    },
    decreaseMinute: function(component, event, helper) {
        var accidentMinute  =  component.get('v.accidentMinute');
        accidentMinute = accidentMinute > 0 ? (accidentMinute-1) : 59;
       	component.set('v.accidentMinute', accidentMinute);
        helper.displayTime(component, event, helper);
        helper.validateTimeWindowHelper(component, event, helper);
    },
   amBtnActive: function(component, event, helper) {
        helper.setAmBtnActive(component, event, helper);
        component.set("v.accidentTime", event.currentTarget.value);
        helper.displayTime(component, event, helper);
    },
    setAmBtnActive: function(component, event, helper) {
        var amBtn = component.find("amBtn");
        var pmBtn = component.find("pmBtn");
        $A.util.addClass(amBtn, "btnActive");
        $A.util.removeClass(pmBtn,"btnActive"); 
    },
    setPmBtnActive: function(component, event, helper) {
        var amBtn = component.find("amBtn");
       var pmBtn = component.find("pmBtn");
       $A.util.addClass(pmBtn, "btnActive");
       $A.util.removeClass(amBtn,"btnActive");
    },
    pmBtnActive: function(component, event, helper) {
       console.log(event.currentTarget.value);
	   helper.setPmBtnActive(component, event, helper);
       component.set("v.accidentTime", event.currentTarget.value); 
       helper.displayTime(component, event, helper);
    },
    displayTime : function(component, event, helper, amPmBtn) {
        helper.validateTimeWindowHelper(component, event, helper); 
        var accidentHour  =  component.get('v.accidentHour');
        var accidentMinute  =  component.get('v.accidentMinute');
        var accidentTime = component.get("v.accidentTime");
        var wrapperRecord = component.get("v.claimApplicationWrapper");
        
        if(accidentHour != null && (accidentHour<10 && accidentHour>0)){
            // commented by Bhavani for 5016
            //console.log('>>> amBtn<>>> '+event.currentTarget.value);
            console.log('>>> accidentHour<>>> '+(accidentHour+12));
            accidentHour = "0" + accidentHour;
        }
        /*else if(accidentHour != null && (accidentHour<10 && accidentHour>0) && (event.currentTarget.value == "PM")){
            console.log('>>> amBtn<>>> '+event.currentTarget.value);
            console.log('>>> accidentHour<>>> '+(accidentHour+12));
            accidentHour = accidentHour+12;
        }*/
        if(accidentMinute != null && (accidentMinute<10 || accidentMinute == 0)){
            accidentMinute = "0" + accidentMinute;
        }
               
        if( accidentMinute == null || accidentHour == null){
            wrapperRecord.claimRecord.CTP_Time_Of_Accident__c = '';
        }else{
            	wrapperRecord.claimRecord.CTP_Time_Of_Accident__c = accidentHour+ ":" + accidentMinute+accidentTime;
            	console.log('>>> accident time accidentHour >>>>'+wrapperRecord.claimRecord.CTP_Time_Of_Accident__c);
        }
        component.set("v.claimApplicationWrapper",wrapperRecord);
        //console.log(">>Accident Time Record >> "+JSON.stringify(component.get("v.claimApplicationWrapper",wrapperRecord)));
        //console.log(">>Accident Time Record >> "+JSON.stringify(component.get("v.claimApplicationWrapper.claimRecord.CTP_Time_Of_Accident__c")));
        
    },
    validateTimeWindowHelper : function(component, event, helper) {
        var accidentMinute  =  component.get('v.accidentMinute');
        var accidentHour  =  component.get('v.accidentHour');
        var incorrectTime = component.find('incorrectTime');
           $A.util.addClass(incorrectTime,"slds-hidden");
        if(accidentHour == null || accidentHour > 12 || accidentHour < 1){
            $A.util.removeClass(incorrectTime,"slds-hidden");
            return false;
        }else if(accidentMinute == null || accidentMinute > 59 || accidentMinute < 0){
            $A.util.removeClass(incorrectTime,"slds-hidden");
            return false;
        }
         return true;
    },
    syncVehicles : function(component){
        console.log('in sync vehicles');
        var claimApplicationWrapper = component.get('v.claimApplicationWrapper');
        var vehicles = component.get("v.vehicles");
        claimApplicationWrapper.vehicleRecords = vehicles;
        component.set("v.claimApplicationWrapper",claimApplicationWrapper);
    },
    injurySave : function(component){
        
        var wrapperRecord = component.get("v.claimApplicationWrapper");
           	 var injuryhist = component.get("v.injuriesHistory");
             console.log("injuryhist stringify>>>"+JSON.stringify(injuryhist));
        // 5016 Change starts
        	var wrapperRecord = component.get("v.claimApplicationWrapper");
            var injuryhist = component.get('v.injuriesHistory').filter(function (item) {
                item.RecordTypeId = $A.get("$Label.c.CTP_Injury_Record_Type_Id");
                return item.CTP_Injury_Description__c !== "";
            });
           // 5016 Change ends
             /*injuryhist.forEach(function(item){
                 console.log('injuryId Description >>> '+item.CTP_Injury_Description__c);
                 if (item.CTP_Injury_Description__c !=''  && item.CTP_Injury_Description__c != null){
            		item.CTP_Injury_Description__c = item.CTP_Injury_Description__c;
                	item.RecordTypeId = $A.get("$Label.c.CTP_Injury_Record_Type_Id");
                 	
                 }
            });*/
            
         wrapperRecord.injuryRecordList = injuryhist;
        /*console.log('injuries');
        var claimApplicationWrapper = component.get('v.claimApplicationWrapper');
        var injuries = component.get("v.injuriesHistory");
        claimApplicationWrapper.injuryRecordList = injuries;
        component.set("v.claimApplicationWrapper",claimApplicationWrapper);*/
    },
    //Added as part of DCR-3649-Parul-Start
   callPIEIntegration : function(component,value, event, helper){
        console.log('in helper for PIE integration call>>>');
        console.log('in helper for PIE integration call>>>'+value);
        this.syncVehicles(component);
       //Himani start
        var claimApplicationWrapper = component.get('v.claimApplicationWrapper');
        claimApplicationWrapper.claimRecord.CTP_Most_at_fault_Vehicle_Registration__c = value;
        component.set("v.claimApplicationWrapper",claimApplicationWrapper);
        //Himani End
        console.log('claimApplicationWrapper>>>',claimApplicationWrapper);
        var claimApplicationJSON = JSON.stringify(claimApplicationWrapper); 
        var accidentDate = claimApplicationWrapper.claimRecord.CTP_AccidentDate__c;
        var accidentTime = claimApplicationWrapper.claimRecord.CTP_Time_Of_Accident__c;
        var caseId = component.get('v.caseRecordId');//DCR-3827 - Mohit
        console.log('Case Id >>>', caseId);//DCR-3827 - Mohit
        console.log('AccidentDate>>>',accidentDate);
        console.log('accidentTime>>>',accidentTime);
        
        var action = component.get("c.callIntegrationMethod");
        console.log('Inside controller1');
        action.setParams({
            "claimApplicationJSON" : claimApplicationJSON,
            "regNo" : value,
            "accidentDate": accidentDate ,
            "accidentTime":accidentTime,
            "caseId" : caseId,
        });
        console.log('Inside controller2');
       //if(vehicleRecord.CTP_Vehicle_Make__c =='' &&  vehicleRecord.CTP_Vehicle_Model__c =='' && vehicleRecord.CTP_Vehicle_Year__c =='' && vehicleRecord.CTP_Vehicle_State__c ==''){ 
        action.setCallback(this,function(response){  
            var state = response.getState();
            console.log("state while fetching response details",state);
            //Himani, start, DCR-4698
            if(state === "SUCCESS"){
                console.log("wrapper response==>",response.getReturnValue());
                var wrapRespObj =response.getReturnValue();
                
                if(wrapRespObj.determineInsurerUIRequestWrapper.statusCode == '200'){
                console.log('inside 200 >>>>>');
                claimApplicationWrapper.caseRecord.CTP_PiE_Status_Code__c = '200 - Status Good';
                claimApplicationWrapper.caseRecord.CTP_PiE_Status_Message__c = 'Policy Found in PiE';
                //claimApplicationWrapper.caseRecord.CTP_PiE_Status_Code__c = wrapRespObj.determineInsurerUIRequestWrapper.statusCode;
                claimApplicationWrapper.caseRecord.CTP_Exception_Flow__c = '';
                claimApplicationWrapper.caseRecord.CTP_Exception_Type__c = '';
                claimApplicationWrapper.caseRecord.CTP_Sub_Stage__c = '';
                for(var i=0;i<claimApplicationWrapper.vehicleRecords.length;i++){
                    if(claimApplicationWrapper.vehicleRecords[i].CTP_Registration_Number__c == value){
                        console.log("value matched1234>>>");
                        claimApplicationWrapper.vehicleRecords[i].CTP_Vehicle_Make__c= wrapRespObj.determineInsurerUIRequestWrapper.vehicleMake;
                        claimApplicationWrapper.vehicleRecords[i].CTP_Vehicle_Model__c= wrapRespObj.determineInsurerUIRequestWrapper.vehicleModel;
                        claimApplicationWrapper.vehicleRecords[i].CTP_Vehicle_Year__c= wrapRespObj.determineInsurerUIRequestWrapper.vehicleYear;
                        claimApplicationWrapper.vehicleRecords[i].CTP_Policy_Number__c= wrapRespObj.determineInsurerUIRequestWrapper.policyNumber;
                        claimApplicationWrapper.vehicleRecords[i].CTP_Vehicle_Class__c= wrapRespObj.determineInsurerUIRequestWrapper.vehicleClass;
                        claimApplicationWrapper.vehicleRecords[i].CTP_VIN_Chassis_Number__c= wrapRespObj.determineInsurerUIRequestWrapper.vin;
                        console.log('Claim Most at fault vehicle --->', claimApplicationWrapper.claimRecord.CTP_Most_At_Fault_Vehicle_Confirmed__c);
                       // claimApplicationWrapper.vehicleRecords[i].CTP_Vehicle_At_Fault__c= claimApplicationWrapper.claimRecord.CTP_Most_At_Fault_Vehicle_Confirmed__c;
                        
                        claimApplicationWrapper.vehicleRecords[i].CTP_Vehicle_State__c= 'NSW';
                           for(var j=0; j<wrapRespObj.lstVehicle.length;j++){
                                if(wrapRespObj.lstVehicle[j].CTP_Registration_Number__c == claimApplicationWrapper.vehicleRecords[i].CTP_Registration_Number__c) {
                                    claimApplicationWrapper.vehicleRecords[i].CTP_Allocated_Insurer__c= wrapRespObj.lstVehicle[j].CTP_Allocated_Insurer__c;
                                    claimApplicationWrapper.vehicleRecords[i].CTP_Allocated_Insurer_code__c= wrapRespObj.lstVehicle[j].CTP_Allocated_Insurer_code__c;
                                    claimApplicationWrapper.vehicleRecords[i].CTP_Vehicle_Insurer__c=wrapRespObj.lstVehicle[j].CTP_Vehicle_Insurer__c;
                                    //insurer By Himani Start
                                    //
                                    claimApplicationWrapper.caseRecord.CTP_Allocated_Insurer__c = wrapRespObj.lstVehicle[j].CTP_Vehicle_Insurer__c;
                                    claimApplicationWrapper.caseRecord.CTP_Allocated_Insurer_code__c = wrapRespObj.lstVehicle[j].CTP_Allocated_Insurer_code__c;
                                    claimApplicationWrapper.caseRecord.CTP_Most_at_fault_Vehicle_Registration__c = wrapRespObj.lstVehicle[j].CTP_Registration_Number__c;
                                    //Added for DCR-8204 Fix Parul-start
                                    claimApplicationWrapper.caseRecord.CTP_Most_At_Fault_Policy_Number__c = wrapRespObj.lstVehicle[j].CTP_Policy_Number__c;
                                    //Added for DCR-8204 Fix Parul-end
                                    claimApplicationWrapper.claimRecord.CTP_Allocated_Insurer_Name__c =  wrapRespObj.lstVehicle[j].CTP_Allocated_Insurer__c;
                                    claimApplicationWrapper.claimRecord.CTP_Allocated_Insurer_Code__c = wrapRespObj.lstVehicle[j].CTP_Allocated_Insurer_code__c;
                                    claimApplicationWrapper.claimRecord.CTP_Most_at_fault_Vehicle_Registration__c = wrapRespObj.lstVehicle[j].CTP_Registration_Number__c;
                                    
                                //insurer By Himani End
                                }
                            }
                       
                        
                        component.set('v.respObj',claimApplicationWrapper.vehicleRecords[i]);
                        console.log('inside here 1');
                        component.set('v.vehicleFoundPIE',true);
                        component.set('v.technicalIssuePIE', false);
                        component.set('v.vehicleRegistrationNotFound',false); 
                         component.set('v.vehicleNotFoundPIE',false);
                       // component.set('v.isValid', false);
                        console.log('inside here 2');  
                       
                    }
                }
                } 
                //Himani DCR-3834 start 
                else if(wrapRespObj.determineInsurerUIRequestWrapper.statusCode == '400' || wrapRespObj.determineInsurerUIRequestWrapper.statusCode == '503' || wrapRespObj.determineInsurerUIRequestWrapper.statusCode == '500'){
                    claimApplicationWrapper.caseRecord.CTP_PiE_Status_Message__c = 'Record (Vehicle match) not found in PiE';
                    if (wrapRespObj.determineInsurerUIRequestWrapper.statusCode == '400'){
                        
                        claimApplicationWrapper.caseRecord.CTP_PiE_Status_Code__c = '400 - Bad Request';
                    }
                    if (wrapRespObj.determineInsurerUIRequestWrapper.statusCode == '503' || wrapRespObj.determineInsurerUIRequestWrapper.statusCode == '500'){
                        claimApplicationWrapper.caseRecord.CTP_PiE_Status_Code__c = '503 - Service Unavailable';
                       
                    }
                      
                        claimApplicationWrapper.caseRecord.CTP_Exception_Flow__c=true;
                        claimApplicationWrapper.caseRecord.CTP_Exception_Type__c='PIE';
                        claimApplicationWrapper.caseRecord.CTP_Sub_Stage__c='Awaiting Further Information';
               
                         //Himani DCR-3834 End
                         
                     for(var i=0;i<claimApplicationWrapper.vehicleRecords.length;i++){
                        if(claimApplicationWrapper.vehicleRecords[i].CTP_Registration_Number__c == value){
                            console.log("value matched1234>>>");
                            claimApplicationWrapper.vehicleRecords[i].CTP_Vehicle_Make__c= null;
                            claimApplicationWrapper.vehicleRecords[i].CTP_Vehicle_Model__c= null;
                            claimApplicationWrapper.vehicleRecords[i].CTP_Vehicle_Year__c= null;
                            claimApplicationWrapper.vehicleRecords[i].CTP_Policy_Number__c= null;
                            claimApplicationWrapper.vehicleRecords[i].CTP_Vehicle_Class__c= null;
                            claimApplicationWrapper.vehicleRecords[i].CTP_VIN_Chassis_Number__c= null;
                            claimApplicationWrapper.vehicleRecords[i].CTP_Allocated_Insurer__c= null;
                            claimApplicationWrapper.vehicleRecords[i].CTP_Allocated_Insurer_code__c= null;
                            claimApplicationWrapper.vehicleRecords[i].CTP_Vehicle_Insurer__c=null;
                            //claimApplicationWrapper.vehicleRecords[i].CTP_Vehicle_State__c= 'NSW';
                        }
                	}
                    component.set('v.technicalIssuePIE', true);
                    //component.set('v.isValid', true);
                    component.set('v.vehicleFoundPIE',false);
                    component.set('v.vehicleRegistrationNotFound',false);
                    component.set('v.vehicleNotFoundPIE',false);
                }//Rel#1.5,DCR-3837 - Mohit Starts
                else if(wrapRespObj.determineInsurerUIRequestWrapper.statusCode == '404' || wrapRespObj.determineInsurerUIRequestWrapper.statusCode == '406'){
                //
                   	claimApplicationWrapper.caseRecord.CTP_PiE_Status_Message__c = 'Record (Vehicle match) not found in PiE';
                    if (wrapRespObj.determineInsurerUIRequestWrapper.statusCode == '404'){
                        claimApplicationWrapper.caseRecord.CTP_PiE_Status_Code__c = '404 - Data not found';
                    }
                    for(var i=0;i<claimApplicationWrapper.vehicleRecords.length;i++){
                        if(claimApplicationWrapper.vehicleRecords[i].CTP_Registration_Number__c == value){
                            console.log("value matched1234>>>");
                            claimApplicationWrapper.vehicleRecords[i].CTP_Vehicle_Make__c= null;
                            claimApplicationWrapper.vehicleRecords[i].CTP_Vehicle_Model__c= null;
                            claimApplicationWrapper.vehicleRecords[i].CTP_Vehicle_Year__c= null;
                            claimApplicationWrapper.vehicleRecords[i].CTP_Policy_Number__c= null;
                            claimApplicationWrapper.vehicleRecords[i].CTP_Vehicle_Class__c= null;
                            claimApplicationWrapper.vehicleRecords[i].CTP_VIN_Chassis_Number__c= null;
                            claimApplicationWrapper.vehicleRecords[i].CTP_Allocated_Insurer__c= null;
                            claimApplicationWrapper.vehicleRecords[i].CTP_Allocated_Insurer_code__c= null;
                            claimApplicationWrapper.vehicleRecords[i].CTP_Vehicle_Insurer__c=null;
                            //claimApplicationWrapper.vehicleRecords[i].CTP_Vehicle_State__c= 'NSW';
                        }
                	}
                    for(var i=0;i<claimApplicationWrapper.vehicleRecords.length;i++){
                    if(claimApplicationWrapper.vehicleRecords[i].CTP_Registration_Number__c == value){
                        console.log("value matched>>>");
                        console.log('I am in 404');
                        component.set('v.technicalIssuePIE', false);
                        //component.set('v.isValid', false);
                        component.set('v.vehicleFoundPIE',false);
                        component.set('v.vehicleFoundPIE',false);
                        component.set('v.vehicleNotFoundPIE',true);
                        if(component.find("registeredState").get("v.value")=='Yes' || component.find("registeredState").get("v.value")=='yes'){
                           console.log('inside-----');
                            //helper.fetchPickListVal(component, 'CTP_Claim__c', 'Most_at_fault_vehicle_state__c', 'registeredVehicleState', null); 
                        }
                        
                    }
                }
                }//Rel#1.5,DCR-3837 - Mohit Ends
                 else {
                     //component.set('v.isValid', false);
                    component.set('v.technicalIssuePIE', false);
                    component.set('v.vehicleFoundPIE',false);
                      component.set('v.vehicleRegistrationNotFound',false);
                     component.set('v.vehicleNotFoundPIE',false);
                     
                }
            }                   
        });
         //Himani, End, DCR-4698
        // console.log('vehicle make',claimApplicationWrapper.vehicleRecord.CTP_Vehicle_Make__c);
        $A.enqueueAction(action);
       /*}else{
              console.log('inside else',vehicleRecord);
              component.set('v.respObj',vehicleRecord);
       }*/
              
  },
    
    
    //Khushman: DCR-3177
    //auraId: aura:id of element for which validation is to be done. Errors are displayed below of that Aura Id.
    //sourceElem: if you already know source then pass here so that usinf component.get else leave it null
    //validationsVar: This is Map where validations for elements and respective error messages is mentioned. Please refer to validationsMap variable attribute of CTP_Vehicle_New component for reference.
    /* eg. <aura:attribute name="validationsMap" type="Map" default="{'email':[{'mandatory': true, 'errorMsg':'Email is required.'},
                                                              			{'regex': '@', 'errorMsg':'Please enter a valid email address'}]
                                                           ,'DriversPhone':[{'regex': '^\\d{10,10}$', 'errorMsg':'Please enter a valid phone number'}]
                                                           ,'regNumber':[{'regex': '^\\w{10,10}$', 'errorMsg':'Please enter a valid registration number'}]}"/>
	*/
    //        		as you can see we have array as value for any aura if of element, one element can have multiple validations and error messages can be different for each validation.
    //        		In case of more than one validations, all will validations will be fired and messages of all failed validations will be displayed.
    //        		In case of mandatory it has to be first validation (you have to mention 'mandatory': true in first validation)
    //        		In case it is not mandatory and value if blank then vo validations will be done.
    //        		For Radio Buttons and other tags which does not take v.errors, you have to mention extra 'errorElem': 'aura:id of element' in the first validation
    //        			and not to provide errorMsg in this case as all validations will be considered to display a div on error.
    //        			Method will not be using v.errors at all.
    //        		Update: If you have to check value direct then start auraId with v. in that case we take value direct and cannot provide errorMsg in this Case. Have to provide errorElem.
    //        		In Map you can enable conditional validation by using onlyWhenVar which provide name of variable and when it's value should be equal to whatever you provide in equalsTo.
    //        		Eg.'onlyWhenVar':'v.alternateEmailChk' ,'equalsTo':'Alternative Email'
    validateElem: function(component, event, helper, auraId, sourceElem, validationsVar) {
   try{
    	var validationsToApply=validationsVar[auraId];
        if (validationsToApply.toString().startsWith('v.')){
            //var strList = validationsToApply.split(',');
            //validationsToApply=component.get(strList[0]);
            validationsToApply=component.get(validationsToApply);
            /*if (strList.length>1){
                    //var currentObj=JSON.parse(strList[1]);
                    var afterFirst='';
                	for (var j1=1;j1<strList.length;j1++){
                    	afterFirst=afterFirst+strList[j1];
                	}
                    var currentObj=JSON.parse(afterFirst.replace('&qt','"'));
                    for (var key1 in currentObj){
                        validationsToApply[0][key1]=currentObj[key1];
                    }
                	//validationsToApply.splice(1);
            }*/
        } else {
            for (var i=0; i<validationsToApply.length; i++){

                for (var key in validationsToApply[i]){
                    if (validationsToApply[i][key].toString().startsWith('v.')){ //validationsToApply[key] instanceof String && 
                        validationsToApply[i][key]=component.get(validationsToApply[i][key]);
                    }
                }
            }
        }
        var success=true;
       	if (validationsToApply[0].onlyWhenVar!=undefined
            && validationsToApply[0].onlyWhenVar!=null){
            var valOfCond=null;
            if (validationsToApply[0].onlyWhenVar.startsWith('v.')){
                valOfCond=component.get(validationsToApply[0].onlyWhenVar);
            } else {
                valOfCond=component.find(auraId).get('v.value');
            }
           	if ( valOfCond!= validationsToApply[0].equalsTo){
      	  		return success; //Conditions doesn't met for conditional validation
       		}
       }
            
        var elemVal;
        if (!auraId.startsWith('v.')){
            if (sourceElem==null){
                sourceElem=component.find(auraId);
            }
            
            if (sourceElem==null){
                console.log('Not able to find variable '+auraId);
                return true;
            }
            elemVal=sourceElem.get('v.value');
        } else {
            elemVal=component.get(auraId);
        }

        if (validationsToApply[0].errorElem==undefined) {
        	sourceElem.set('v.errors',null);
        } else {
            for (var i=0; i<validationsToApply.length; i++){
               	if (validationsToApply[i].errorElem!=undefined){
            		var elem = component.find(validationsToApply[i].errorElem);
                    $A.util.addClass(elem, 'slds-hidden');
                }
        	}
        }

       	if (elemVal==null || (''+elemVal).trim()=='' || elemVal==validationsToApply[0].ignoreKey) {
            if (validationsToApply[0].mandatory) {
            	success=false;
                if (validationsToApply[0].errorMsg!=undefined){
                	sourceElem.set('v.errors',[{message: validationsToApply[0].errorMsg}]);
                }
                if (validationsToApply[0].errorElem!=undefined){
                    var elem = component.find(validationsToApply[0].errorElem);
                    $A.util.removeClass(elem, 'slds-hidden');
                }
            }
        } else {
            for (var i=0; i<validationsToApply.length; i++){
                if (validationsToApply[i].regex!=undefined){
                    if (!new RegExp(validationsToApply[i].regex).test(elemVal)){
                        success=false;
                        if (validationsToApply[i].errorElem!=undefined){
                            var elem = component.find(validationsToApply[i].errorElem);
                            $A.util.removeClass(elem, 'slds-hidden');
                        }
                        if (validationsToApply[i].errorMsg!=undefined){
                            if (sourceElem.get('v.errors')!=null){
                                var errs=sourceElem.get('v.errors');
                                errs.push({message: validationsToApply[i].errorMsg});
                                sourceElem.set('v.errors',errs);
                            } else {
                                sourceElem.set('v.errors',[{message: validationsToApply[i].errorMsg}]);
                            }
                        }
                    }
            	}
        	}
        }
		return success;
   }catch(e){
		console.log('error occured while validation',e);
    	/*alert('Error Occured');       
       for (var i=0;i<10000000; i++){
           
       }*/
       }
   }, 
   
    //Khushman: DCR-3177
    validateAll: function(component, event, helper, validateMap){
    	var success=true;
    	//var keys=validateMap.keySet();
    	for (var key in validateMap){
            if (!helper.validateElem(component, event, helper, key, null, validateMap ) ){
                success=false;
            }
 		}
        return success;
        
	},
    //Khushman: DCR-3177
    //locId: In case have to apply some other field validation on current element then mention key in Map for that Id.
    //		 This will be aura:id of element validation of which you have to use for current element.
    validateThis: function(component, event, helper, locId) {
        var src;
        try{

            src=event.getSource();
            if (locId==null) {
                locId=src.getLocalId();
            }
        } catch(err){
            locId=event.currentTarget.getAttribute('id');
//            alert('locId:'+locId);
        }
            helper.validateElem(component, event, helper, locId, src, component.get('v.validationsMap')[component.get('v.step')]);
    },
    
    //Rel 1.5: DCR-4863 - Mohit - Starts
    populateClaimHistoryRecord : function(component, event, helper){
    	
        //Get Case History Details from Screen 2  
       		var wrapperRecord = component.get("v.claimApplicationWrapper");
            var clmhist = component.get("v.childClaimHistory");
            console.log('Claim History Checkbox is selected --->'+component.get("v.displayClaimForm"));
            console.log('Claim History Array --->'+JSON.stringify(clmhist));
            if(component.get("v.displayClaimForm") == true){
                wrapperRecord.claimRecord.CTP_ClaimHistoryLength__c = clmhist.length;
                 console.log('I am in Claim history @@@@@'+clmhist.length);
                 if(clmhist.length >= 1 ){
                	console.log('I am inside size 1');
                    wrapperRecord.claimRecord.CTP_Previous_Insurer_1__c = clmhist[0].CTP_Previous_Insurer_1__c;
                    wrapperRecord.claimRecord.CTP_Previous_Claim_Number_1__c = clmhist[0].CTP_Previous_Claim_Number_1__c; 
                    wrapperRecord.claimRecord.CTP_Month_of_Injury_1__c = clmhist[0].CTP_Month_of_Injury_1__c;
                    wrapperRecord.claimRecord.CTP_Year_of_Injury_1__c = clmhist[0].CTP_Year_of_Injury_1__c;
                    wrapperRecord.claimRecord.CTP_Previous_CTP_Insurer_Other_1__c = clmhist[0].CTP_Previous_CTP_Insurer_Other_1__c;
                    wrapperRecord.claimRecord.CTP_Previous_Insurer_2__c = '';
                     wrapperRecord.claimRecord.CTP_Previous_Claim_Number_2__c = ''; 
                     wrapperRecord.claimRecord.CTP_Month_of_Injury_2__c = '';
                     wrapperRecord.claimRecord.CTP_Year_of_Injury_2__c = '';
                     wrapperRecord.claimRecord.CTP_Previous_CTP_Insurer_Other_2__c = '';
                     wrapperRecord.claimRecord.CTP_Previous_Insurer_3__c = '';
                     wrapperRecord.claimRecord.CTP_Previous_Claim_Number_3__c = ''; 
                     wrapperRecord.claimRecord.CTP_Month_of_Injury_3__c = '';
                     wrapperRecord.claimRecord.CTP_Year_of_Injury_3__c = '';
                     wrapperRecord.claimRecord.CTP_Previous_CTP_Insurer_Other_3__c = '';
                     wrapperRecord.claimRecord.CTP_Previous_Insurer_4__c = '';
                     wrapperRecord.claimRecord.CTP_Previous_Claim_Number_4__c = ''; 
                     wrapperRecord.claimRecord.CTP_Month_of_Injury_4__c = '';
                     wrapperRecord.claimRecord.CTP_Year_of_Injury_4__c = '';
                     wrapperRecord.claimRecord.CTP_Previous_CTP_Insurer_Other_4__c = '';
                     wrapperRecord.claimRecord.CTP_Previous_Insurer_5__c = '';
                     wrapperRecord.claimRecord.CTP_Previous_Claim_Number_5__c = ''; 
                     wrapperRecord.claimRecord.CTP_Month_of_Injury_5__c = '';
                     wrapperRecord.claimRecord.CTP_Year_of_Injury_5__c = '';
                     wrapperRecord.claimRecord.CTP_Previous_CTP_Insurer_Other_5__c = '';
                     
                }
                if(clmhist.length >= 2){
                	console.log('I am inside size 2');   
                    wrapperRecord.claimRecord.CTP_Previous_Insurer_2__c = clmhist[1].CTP_Previous_Insurer_1__c;
                    wrapperRecord.claimRecord.CTP_Previous_Claim_Number_2__c = clmhist[1].CTP_Previous_Claim_Number_1__c; 
                    wrapperRecord.claimRecord.CTP_Month_of_Injury_2__c = clmhist[1].CTP_Month_of_Injury_1__c;
                    wrapperRecord.claimRecord.CTP_Year_of_Injury_2__c = clmhist[1].CTP_Year_of_Injury_1__c;
                    wrapperRecord.claimRecord.CTP_Previous_CTP_Insurer_Other_2__c = clmhist[1].CTP_Previous_CTP_Insurer_Other_1__c;
                    wrapperRecord.claimRecord.CTP_Previous_Insurer_3__c = '';
                     wrapperRecord.claimRecord.CTP_Previous_Claim_Number_3__c = ''; 
                     wrapperRecord.claimRecord.CTP_Month_of_Injury_3__c = '';
                     wrapperRecord.claimRecord.CTP_Year_of_Injury_3__c = '';
                     wrapperRecord.claimRecord.CTP_Previous_CTP_Insurer_Other_3__c = '';
                     wrapperRecord.claimRecord.CTP_Previous_Insurer_4__c = '';
                     wrapperRecord.claimRecord.CTP_Previous_Claim_Number_4__c = ''; 
                     wrapperRecord.claimRecord.CTP_Month_of_Injury_4__c = '';
                     wrapperRecord.claimRecord.CTP_Year_of_Injury_4__c = '';
                     wrapperRecord.claimRecord.CTP_Previous_CTP_Insurer_Other_4__c = '';
                     wrapperRecord.claimRecord.CTP_Previous_Insurer_5__c = '';
                     wrapperRecord.claimRecord.CTP_Previous_Claim_Number_5__c = ''; 
                     wrapperRecord.claimRecord.CTP_Month_of_Injury_5__c = '';
                     wrapperRecord.claimRecord.CTP_Year_of_Injury_5__c = '';
                     wrapperRecord.claimRecord.CTP_Previous_CTP_Insurer_Other_5__c = '';
                }
                 if(clmhist.length >= 3){
                	console.log('I am inside size 3');
                    wrapperRecord.claimRecord.CTP_Previous_Insurer_3__c = clmhist[2].CTP_Previous_Insurer_1__c;
                    wrapperRecord.claimRecord.CTP_Previous_Claim_Number_3__c = clmhist[2].CTP_Previous_Claim_Number_1__c; 
                    wrapperRecord.claimRecord.CTP_Month_of_Injury_3__c = clmhist[2].CTP_Month_of_Injury_1__c;
                    wrapperRecord.claimRecord.CTP_Year_of_Injury_3__c = clmhist[2].CTP_Year_of_Injury_1__c;
                    wrapperRecord.claimRecord.CTP_Previous_CTP_Insurer_Other_3__c = clmhist[2].CTP_Previous_CTP_Insurer_Other_1__c;
                    wrapperRecord.claimRecord.CTP_Previous_Insurer_4__c = '';
                    wrapperRecord.claimRecord.CTP_Previous_Claim_Number_4__c = ''; 
                    wrapperRecord.claimRecord.CTP_Month_of_Injury_4__c = '';
                    wrapperRecord.claimRecord.CTP_Year_of_Injury_4__c = '';
                    wrapperRecord.claimRecord.CTP_Previous_CTP_Insurer_Other_4__c = '';
                    wrapperRecord.claimRecord.CTP_Previous_Insurer_5__c = '';
                    wrapperRecord.claimRecord.CTP_Previous_Claim_Number_5__c = ''; 
                    wrapperRecord.claimRecord.CTP_Month_of_Injury_5__c = '';
                    wrapperRecord.claimRecord.CTP_Year_of_Injury_5__c = '';
                    wrapperRecord.claimRecord.CTP_Previous_CTP_Insurer_Other_5__c = ''; 
                 }
                 if(clmhist.length >= 4 ){
                	console.log('I am inside size 4');
                    wrapperRecord.claimRecord.CTP_Previous_Insurer_4__c = clmhist[3].CTP_Previous_Insurer_1__c;
                    wrapperRecord.claimRecord.CTP_Previous_Claim_Number_4__c = clmhist[3].CTP_Previous_Claim_Number_1__c; 
                    wrapperRecord.claimRecord.CTP_Month_of_Injury_4__c = clmhist[3].CTP_Month_of_Injury_1__c;
                    wrapperRecord.claimRecord.CTP_Year_of_Injury_4__c = clmhist[3].CTP_Year_of_Injury_1__c;
                    wrapperRecord.claimRecord.CTP_Previous_CTP_Insurer_Other_4__c = clmhist[3].CTP_Previous_CTP_Insurer_Other_1__c;
                    wrapperRecord.claimRecord.CTP_Previous_Insurer_5__c = '';
                    wrapperRecord.claimRecord.CTP_Previous_Claim_Number_5__c = ''; 
                    wrapperRecord.claimRecord.CTP_Month_of_Injury_5__c = '';
                    wrapperRecord.claimRecord.CTP_Year_of_Injury_5__c = '';
                    wrapperRecord.claimRecord.CTP_Previous_CTP_Insurer_Other_5__c = ''; 
                 }
                 if(clmhist.length == 5 ){
                	console.log('I am inside size 5	');
                    wrapperRecord.claimRecord.CTP_Previous_Insurer_5__c = clmhist[4].CTP_Previous_Insurer_1__c;
                    wrapperRecord.claimRecord.CTP_Previous_Claim_Number_5__c = clmhist[4].CTP_Previous_Claim_Number_1__c; 
                    wrapperRecord.claimRecord.CTP_Month_of_Injury_5__c = clmhist[4].CTP_Month_of_Injury_1__c;
                    wrapperRecord.claimRecord.CTP_Year_of_Injury_5__c = clmhist[4].CTP_Year_of_Injury_1__c;
                    wrapperRecord.claimRecord.CTP_Previous_CTP_Insurer_Other_5__c = clmhist[4].CTP_Previous_CTP_Insurer_Other_1__c;
                 }
         }
          
         //Rel 1.5: DCR-4863 - Mohit - Ends
},
    //DCR-2836
    saveAsDraft : function(component,event,helper){
        //console.log('in save as draft helper',component.get("v.claimApplicationWrapper.claimRecord.CTP_Medicare_Number__c"));
        component.set('v.isAutoSaveOrDraft',true);
        console.log('here');
        this.syncVehicles(component);
        //this.populateClaimHistoryRecord(component, event, helper);
      //  this.injurySave(component);     //DCR-7868 
        this.populateClaimHistoryRecord(component, event, helper);
        this.populateEmploymentRecord(component, event, helper);        
        var claimApplicationWrapper = component.get("v.claimApplicationWrapper");
        
		// -- Sridevi -- DCR-7868
        claimApplicationWrapper.injuryRecordList = component.get('v.injuriesHistory').filter(function (item) {
            item.RecordTypeId = $A.get("$Label.c.CTP_Injury_Record_Type_Id");
            item.CTP_Injury_Treatment_Case__c = claimApplicationWrapper.caseRecord.Id;
            return item.CTP_Injury_Description__c !== "";
        });    
        
        // DCR-8203: Date 12-Mar-2018: Gender set up starts: Upendra        
        if(component.get("v.claimApplicationWrapper.claimRecord.CTP_Submitter_Is_Claimant__c") !='Yes'){
            console.log('Onbehalf-->> ');
            if(component.get("v.maleB") == true){
                claimApplicationWrapper.caseRecord.CTP_Gender__c = 'Male';
            }if(component.get("v.femaleB") == true){
                claimApplicationWrapper.caseRecord.CTP_Gender__c = 'Female';
            }if(component.get("v.otherB") == true){
                claimApplicationWrapper.caseRecord.CTP_Gender__c = 'Other';
            }
            claimApplicationWrapper.claimRecord.CTP_Driver_license_state__c =component.get('v.claimApplicationWrapper.claimRecord.CTP_Driver_license_state__c');
        }
        // DCR-8203: Date 12-Mar-2018: Gender set up Ends: Upendra 
        
        claimApplicationWrapper.claimRecord.CTP_Treatment_Rec_At_Hosp_Post_Accident__c = component.get('v.CTP_Treatment_Rec_At_Hosp_Post_Accident__c');
        claimApplicationWrapper.claimRecord.CTP_Hospital_Name__c = component.get('v.claimApplicationWrapper.claimRecord.CTP_Hospital_Name__c');
        claimApplicationWrapper.claimRecord.CTP_Ambulance_Used__c = component.get('v.claimApplicationWrapper.claimRecord.CTP_Ambulance_Used__c');
        claimApplicationWrapper.claimRecord.CTP_Discharged_From_Hospital__c = component.get('v.dischargedFromHospitalYesNo');
        claimApplicationWrapper.claimRecord.Ambulance_Service_Received__c = component.get('v.claimApplicationWrapper.claimRecord.Ambulance_Service_Received__c');
        console.log('fffffffffffff'+component.get('v.claimApplicationWrapper.claimRecord.Ambulance_Service_Received__c'));
        
        //wrapperRecord.claimRecord.CTP_Date_Of_Discharge__c = component.get('v.claimApplicationWrapper.claimRecord.dateOfDischargeFromHospital');           
        console.log("injuryList", JSON.stringify(claimApplicationWrapper.injuryRecordList));                       
        claimApplicationWrapper.treatmentRecordList = component.get("v.treatmentsHistory").filter(function (item) {                
            item.RecordTypeId = $A.get("$Label.c.CTP_Treatment_Record_Type_Id");
            item.CTP_Injury_Treatment_Case__c = claimApplicationWrapper.caseRecord.Id;                
            return item.CTP_Treatment_Description__c !== "";
        });
        claimApplicationWrapper.preInjuryRecordList = component.get("v.previousInjuriesHistory").filter(function (item) {                
            item.RecordTypeId = $A.get("$Label.c.CTP_Injury_Record_Type_Id");  
            item.CTP_Injury_Treatment_Case__c = claimApplicationWrapper.caseRecord.Id; 
            item.CTP_Previous_Injury__c = 
                component.get("v.claimApplicationWrapper.claimRecord.CTP_Previous_Illness_or_Injury__c") === "Yes";
            return item.CTP_Injury_Description__c !== "" && component.get("v.claimApplicationWrapper.claimRecord.CTP_Previous_Illness_or_Injury__c");
        });                        
        var claimApplicationWrapperJSON = JSON.stringify(claimApplicationWrapper);
        // --- fix sridevi DCR-7868
        console.log('>> claimApplicationWrapperJSON>> '+JSON.stringify(claimApplicationWrapperJSON));
        var action = component.get("c.saveAsDraftController");
        action.setParams({
            "wrapperRecord" : claimApplicationWrapperJSON,
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            console.log('>>> draft state >>>>'+state);
            if(state === "SUCCESS"){
                var claimApplicationWrapper = response.getReturnValue();
                component.set("v.claimApplicationWrapper",claimApplicationWrapper);
                component.set("v.injuriesHistory",claimApplicationWrapper.injuryRecordList);
                component.set("v.treatmentsHistory",claimApplicationWrapper.treatmentRecordList);
                component.set("v.previousInjuriesHistory",claimApplicationWrapper.preInjuryRecordList);
                component.set("v.vehicles",claimApplicationWrapper.vehicleRecords);
                
                console.log('-->>>wrapper is-->>>> '+JSON.stringify(claimApplicationWrapper));
            }
        });
        $A.enqueueAction(action);
    },
    
    //DCR-3630
     accidentRoleHelper:function(component, event, helper) {
        var wrapperRecord = component.get("v.claimApplicationWrapper");
        var rolevalue = wrapperRecord.claimRecord.CTP_Accident_Role__c;
         //to fix DCR-6850
         /*
        wrapperRecord.claimRecord.CTP_Accident_Role_Other__c = undefined;
        wrapperRecord.claimRecord.CTP_Passenger_vehicle__c = undefined;
        component.set("v.claimApplicationWrapper",wrapperRecord);*/
         
        if(rolevalue && rolevalue.indexOf('Other')>=0 || rolevalue.indexOf('other')>=0){
            component.set("v.otherRoleAccident", true);
    		component.set("v.passengerRoleAccident", false);
        }else if(rolevalue=='Passenger' || rolevalue=='Passenger'){
            component.set("v.otherRoleAccident", false);
    		component.set("v.passengerRoleAccident", true);
        }
        else{
            component.set("v.otherRoleAccident", false);
    		component.set("v.passengerRoleAccident", false);
        }

    },
	/*Vivek Start DCR-3661 */
    validateBenefitType : function(component, event, helper) {
	 var benefitType =component.find('benefitType').get("v.value");
        console.log('benefitType: '+benefitType);
        var errorDivId = component.find("benefitTypeErrMsg");
        if(!benefitType || benefitType.trim()==''){
            $A.util.removeClass(errorDivId,"slds-hidden");
        }
        else
        { 
            $A.util.addClass(errorDivId,"slds-hidden");
            var wrapperRecord = component.get("v.claimApplicationWrapper");
            wrapperRecord.claimRecord.CTP_BenefitType__c = benefitType;
            component.set("v.claimApplicationWrapper",wrapperRecord);
        }
    },
   /*Vivek End DCR-3661 */
   
    //Khushman: DCR-5286
    isBlankFunc:function(elemVal) {
     return (elemVal==null || (''+elemVal).trim()=='');
    },
    
    otherRoleEmpty: function(component, event, helper) {
        var rolevalue = component.find("accidentrole").get("v.value");
        var otherRoleValue = component.find("otherRole").get("v.value");
        var errorDivId = component.find("otherRoleError");
        if((otherRoleValue.trim()=='') && (rolevalue=='Other' || rolevalue=='other')){
            $A.util.removeClass(errorDivId,"slds-hidden");
        }
        else
        { 
            $A.util.addClass(errorDivId,"slds-hidden");
            //var wrapperRecord = component.get("v.claimApplicationWrapper");
            //wrapperRecord.claimRecord.CTP_Accident_Role_Other__c = otherRoleValue;
            //component.set("v.claimApplicationWrapper",wrapperRecord);
        }
 },
    
    /*Namrata DCR-2588 Start */
    validateFinalDeclarationNameHelper : function(component, event){
        var finalDeclarationName = component.find("finalDeclarationName").get("v.value");
        console.log("name: " + finalDeclarationName);
        var errorDivId = component.find("declarationNameErrMsg");
        if(finalDeclarationName.trim()==''){		
            component.set('v.isSubmitValid', true); //Disabling Next button
            $A.util.removeClass(errorDivId,"slds-hidden");
        }else{
            component.set('v.isSubmitValid', false); 
            $A.util.addClass(errorDivId,"slds-hidden");
             /*Himani DCR-2588 End */
            var wrapperRecord = component.get("v.claimApplicationWrapper");
            wrapperRecord.claimRecord.CTP_Final_Declaration__c = true;
            wrapperRecord.claimRecord.CTP_Authorisation_Given__c = true;
            wrapperRecord.claimRecord.CTP_Final_Declaration_Name__c = finalDeclarationName;
            component.set("v.claimApplicationWrapper",wrapperRecord);
            /*Himani DCR-2588 End */
        }
    },
    validateFinalDeclarationNameOnBehalfHelper : function(component, event){
        var finalDeclarationName = component.find("finalDeclarationNameOnbehalf").get("v.value");
        console.log("name: " + finalDeclarationName);
        var errorDivId = component.find("finalDeclarationNameOnbehalfErr");
        if(finalDeclarationName.trim()==''){		
            component.set('v.isSubmitValid', true); //Disabling Next button
            $A.util.removeClass(errorDivId,"slds-hidden");
        }else{
            component.set('v.isSubmitValid', false); 
            $A.util.addClass(errorDivId,"slds-hidden");
             /*Himani DCR-2588 End */
            var wrapperRecord = component.get("v.claimApplicationWrapper");
            wrapperRecord.claimRecord.CTP_Final_Declaration__c = true;
            wrapperRecord.claimRecord.CTP_Authorisation_Given__c = true;
            wrapperRecord.claimRecord.CTP_Final_Declaration_Name__c = finalDeclarationName;
            component.set("v.claimApplicationWrapper",wrapperRecord);
            /*Himani DCR-2588 End */
        }
    },
	/*Namrata DCR-2588 End */
    /*Vivek DCR-3655 Start */
     formatDateStr: function(dateStr) {
        var splitDate = dateStr.split("-");
        return new Date(splitDate[0], splitDate[1] - 1, splitDate[2]).getTime();
    }, 
    displayErrorMessage: function(component, event, helper, isDisplayError, errorDivName) {
        var errorDivId = component.find(errorDivName);
        if (isDisplayError) {
            $A.util.removeClass(errorDivId, "slds-hidden");
        } else {
            $A.util.addClass(errorDivId, "slds-hidden");
        }
    },
    validateDischargeDate: function(component, event, helper) {
  		var wrapperRecord = component.get("v.claimApplicationWrapper");
        var dischargeDateCmp = component.find('dischargeDate');
        if(dischargeDateCmp){
            var dischargeDateStr = dischargeDateCmp.get("v.value");
            wrapperRecord.claimRecord.CTP_Date_Of_Discharge__c = dischargeDateStr;
            component.set("v.claimApplicationWrapper",wrapperRecord);
            if(wrapperRecord.claimRecord.CTP_AccidentDate__c && wrapperRecord.claimRecord.CTP_Date_Of_Discharge__c){
                var accidentDate = helper.formatDateStr(wrapperRecord.claimRecord.CTP_AccidentDate__c);
                console.log('date of accident is ==>',dischargeDate);
                var dischargeDate = helper.formatDateStr(wrapperRecord.claimRecord.CTP_Date_Of_Discharge__c);
                var today = new Date();
                var isDisplayLaterDtErr = dischargeDate > today;
                helper.displayErrorMessage(component, event, helper, isDisplayLaterDtErr, 'dischargeDateLaterErrMsg');
                var isDisplayEarlierError = dischargeDate < accidentDate;
                helper.displayErrorMessage(component, event, helper, isDisplayEarlierError, 'dischargeDateEarlyErrMsg');
                return !(isDisplayEarlierError||isDisplayLaterDtErr)
            }
        }
        return true;
    },
    
    
    validateHospitalName: function(component, event, helper) {
        var hospName =component.find('hospitalName').get("v.value");
        console.log('hospName: '+hospName);
        var errorDivId = component.find("hospitalNameErrMsg");
        if(hospName.trim()==''){
            $A.util.removeClass(errorDivId,"slds-hidden");
        }
        else
        { 
            $A.util.addClass(errorDivId,"slds-hidden");
            var wrapperRecord = component.get("v.claimApplicationWrapper");
            wrapperRecord.claimRecord.CTP_Hospital_Name__c = hospName;
            component.set("v.claimApplicationWrapper",wrapperRecord);
        }
    },
    
    /*Vivek DCR-3655 End */ 
    
    /*Namrata DCR-3901 Start */
    submitApplicationHelper:function(component, event, helper) {
        var vehiclesInvolved = component.get("v.claimApplicationWrapper.claimRecord.CTP_Vehicles_Involved_Are_Known__c");
        var mostAtFaultVehicle = component.get("v.claimApplicationWrapper.claimRecord.CTP_Most_at_Fault_Vehicle_Known__c");
        var vehicleNotFoundPIE = component.get("v.vehicleNotFoundPIE");
        var mostAtFaultVehicleConfirmed = component.get("v.claimApplicationWrapper.claimRecord.CTP_Most_At_Fault_Vehicle_Confirmed__c");
        console.log("vehiclesInvolved: " + vehiclesInvolved);
        console.log("mostAtFaultVehicle: " + mostAtFaultVehicle);
        console.log("vehicleNotFoundPIE: " + vehicleNotFoundPIE);
        console.log("mostAtFaultVehicleConfirmed: " + mostAtFaultVehicleConfirmed);
        
        if((vehiclesInvolved != undefined && vehiclesInvolved == "No") || ( mostAtFaultVehicle != undefined && mostAtFaultVehicle != "Yes")){
            component.set('v.submitVehicleNotSpecified', true);
        }else if(vehicleNotFoundPIE){
            component.set('v.submitVehicleNotFoundPIE', true);
            component.set('v.submitVehicleNotSpecified', false);
            component.set('v.submitRejectPIESearch', false);
        }else if(mostAtFaultVehicleConfirmed != undefined && mostAtFaultVehicleConfirmed == "No"){
            component.set('v.submitRejectPIESearch', true);
            component.set('v.submitVehicleNotFoundPIE', false);
            component.set('v.submitVehicleNotSpecified', false);
        }
        else {
            component.set('v.submitRejectPIESearch', false);
            component.set('v.submitVehicleNotFoundPIE', false);
            component.set('v.submitVehicleNotSpecified', false);
            component.set('v.regularSubmitApplication', true);
        }
        
    /*     //Code added by Mohit for setting integration call - Starts
        var claimApplicationWrapper = component.get('v.claimApplicationWrapper');
       // console.log('claimApplicationWrapper>>>',claimApplicationWrapper);
        var claimApplicationJSON = JSON.stringify(claimApplicationWrapper); 
        console.log('claimApplicationWrapper>>>',claimApplicationJSON);
        var action = component.get("c.callSubmitIntegrationMethod");
        console.log('Inside controller1');
        action.setParams({
            "claimApplicationJSON" : claimApplicationJSON,
        });
        $A.enqueueAction(action);*/
        
        //Code added by Mohit for setting integration call - Ends
    },
    callSubmitIntegration:function(component, event, helper){
       
        //Code added by Mohit for setting integration call - Starts
        var claimApplicationWrapper = component.get('v.claimApplicationWrapper');
/*DCR6197*/	claimApplicationWrapper.claimRecord.CTP_Claimant_Submitted_At_Fault_Regist__c = claimApplicationWrapper.claimRecord.CTP_Most_at_fault_Vehicle_Registration__c;
/*DCR6197*/ claimApplicationWrapper.claimRecord.CTP_Claimant_Submitted_Date_of_Accident__c = claimApplicationWrapper.claimRecord.CTP_AccidentDate__c;
/*DCR6197*/ for (var i=0; i<claimApplicationWrapper.vehicleRecords.length; i++) {
/*DCR6197*/    	if(claimApplicationWrapper.vehicleRecords[i].CTP_Vehicle_At_Fault__c){
/*DCR6197*/ 		claimApplicationWrapper.claimRecord.CTP_Claimant_Submitted_Policy_Number__c = claimApplicationWrapper.vehicleRecords[i].CTP_Policy_Number__c;                        
/*DCR6197*/ 	}	
/*DCR6197*/ }
/*DCR6197*/ claimApplicationWrapper.claimRecord.CTP_Claimant_Submitted_Time_of_Accident__c = claimApplicationWrapper.claimRecord.CTP_Time_Of_Accident__c;
/*DCR6197*/ component.set("v.claimApplicationWrapper",claimApplicationWrapper);		
        
        var claimApplicationWrapper = component.get('v.claimApplicationWrapper');
        var exceptionflow=claimApplicationWrapper.caseRecord.CTP_Exception_Flow__c;
          if(exceptionflow === true){
                     console.log('exceptionflow true 1');
                    component.set('v.submittedToCTPAssist','True'); 
                    console.log('exceptionflow true 2');
                    claimApplicationWrapper.caseRecord.Status='Submitted';
                  component.set("v.claimApplicationWrapper",claimApplicationWrapper);	
                }
            
        //claimApplicationWrapper.caseRecord.CTP_Date_Submitted_by_Claimant__c=system.now();
       
        if(!exceptionflow){
         	// Displaying progress bar
        	helper.displayProgressBar(component, event, helper);
           //claimApplicationWrapper.caseRecord.Status='Submitted';
           component.set("v.claimApplicationWrapper",claimApplicationWrapper);
        
       // console.log('claimApplicationWrapper>>>',claimApplicationWrapper);
        var claimApplicationJSON = JSON.stringify(claimApplicationWrapper); 
        console.log('claimApplicationWrapper>>>',claimApplicationJSON);
        var action = component.get("c.callSubmitIntegrationMethod");
        
        console.log('Inside controller1');
        action.setParams({
            "claimApplicationJSON" : claimApplicationJSON,
        });
        action.setCallback(this, function(response) {
        
        	  
            var state = response.getState();
            
            if(state == "SUCCESS")
            {
            	console.log('I am in success');
                //component.set("v.submittedToCTPAssist",false);
           		console.log('I am in Success',JSON.stringify(response.getReturnValue())); 
                console.log('I am in Success2',JSON.stringify(response.getReturnValue().statusCode));
                var claimApplicationWrapper = component.get('v.claimApplicationWrapper');
         /*       if(response.getReturnValue().siraRefNum!=null){
                    claimApplicationWrapper.caseRecord.CTP_SIRA_Reference_Number__c=response.getReturnValue().siraRefNum;
                console.log('claimApplicationWrapper.caseRecord.CTP_SIRA_Reference_Number__c',claimApplicationWrapper.caseRecord.CTP_SIRA_Reference_Number__c);
                }
                if(response.getReturnValue().insurerName!=null){
                    claimApplicationWrapper.claimRecord.CTP_Allocated_Insurer_Name__c=response.getReturnValue().insurerName;
                }
                if(response.getReturnValue().insurerReferenceNumber!=null){
                    claimApplicationWrapper.caseRecord.CTP_Insurer_Reference_Number__c=response.getReturnValue().insurerReferenceNumber;
                }
                if(response.getReturnValue().insurerEmailAddress!=null){
                    //claimApplicationWrapper.caseRecord.CTP_SIRA_Reference_Number__c=response.getReturnValue().insurerEmailAddress;
                }
                component.set("v.claimApplicationWrapper",claimApplicationWrapper);
                
                if(response.getReturnValue().statusCode==200 ){
                //// Display DCR-3902
				component.set("v.submitStatus","Success");
                }
                if(response.getReturnValue().statusCode==400 || response.getReturnValue().statusCode== 501){
                    component.set("v.submitStatus","Failure");
                } */
                
               //DCR-5739 - Mohit Changes Starts
                 if(response.getReturnValue().statusCode==200 ){
                     if(response.getReturnValue().siraRefNum!=null){
                    claimApplicationWrapper.caseRecord.CTP_SIRA_Reference_Number__c=response.getReturnValue().siraRefNum;
                    console.log('claimApplicationWrapper.caseRecord.CTP_SIRA_Reference_Number__c',claimApplicationWrapper.caseRecord.CTP_SIRA_Reference_Number__c);
                    }
                    if(response.getReturnValue().insurerName!=null){
                        claimApplicationWrapper.claimRecord.CTP_Allocated_Insurer_Name__c=response.getReturnValue().insurerName;
                    }
                    if(response.getReturnValue().insurerReferenceNumber!=null){
                        claimApplicationWrapper.caseRecord.CTP_Insurer_Reference_Number__c=response.getReturnValue().insurerReferenceNumber;
                    }
                     //DCR-6779 start Himani
                     //
                   /*  if(claimApplicationWrapper.caseRecord.CTP_Exception_Flow__c == true){
                         claimApplicationWrapper.caseRecord.CTP_Send_to_Insurer__c=false;
                        claimApplicationWrapper.caseRecord.CTP_Sub_Stage__c ='Awaiting further information';
                        claimApplicationWrapper.caseRecord.CTP_Claims_Submission_Status_Code__c ='400 - Bad Request';
                        claimApplicationWrapper.caseRecord.CTP_Claims_Submission_Status_Message__c	='Data provided is invalid for Insurer Claim Submission';
                       // claimApplicationWrapper.caseRecord.CTP_Exception_Flow__c=true;  
                        claimApplicationWrapper.caseRecord.CTP_Exception_Type__c='Insurer Claims Submission Failed';
                         component.set("v.submitStatus","Failure");
                     }else{*/
                        claimApplicationWrapper.caseRecord.Status='Acknowledged';
                        claimApplicationWrapper.caseRecord.CTP_Sub_Stage__c =null;
                        claimApplicationWrapper.caseRecord.CTP_Claims_Submission_Status_Message__c	='Claim submitted successfully and received Insurer reference Number';
                        claimApplicationWrapper.caseRecord.CTP_Claims_Submission_Status_Code__c ='200 - Status Good';
                        console.log('I am in insurer name1', response.getReturnValue().insurerName );
                         // Display DCR-3902
                       component.set("v.submitStatus","Success");
                         component.set("v.claimApplicationWrapper",claimApplicationWrapper);
                    // }
                    //DCR-6779 End Himani
                       
                       
                }//200 - Response Code 
               
                if(response.getReturnValue().statusCode==400 ){
                    if(response.getReturnValue().siraRefNum!=null){
                    claimApplicationWrapper.caseRecord.CTP_SIRA_Reference_Number__c=response.getReturnValue().siraRefNum;
                    console.log('claimApplicationWrapper.caseRecord.CTP_SIRA_Reference_Number__c',claimApplicationWrapper.caseRecord.CTP_SIRA_Reference_Number__c);
                    }
                    if(response.getReturnValue().insurerName!=null){
                        claimApplicationWrapper.claimRecord.CTP_Allocated_Insurer_Name__c=response.getReturnValue().insurerName;
                    }
                    if(response.getReturnValue().insurerReferenceNumber!=null){
                        claimApplicationWrapper.caseRecord.CTP_Insurer_Reference_Number__c=response.getReturnValue().insurerReferenceNumber;
                    }
                    //claimApplicationWrapper.caseRecord.Status='Acknowledged';
                    claimApplicationWrapper.caseRecord.CTP_Send_to_Insurer__c=false;
                    claimApplicationWrapper.caseRecord.CTP_Sub_Stage__c ='Awaiting further information';
                    claimApplicationWrapper.caseRecord.CTP_Claims_Submission_Status_Code__c ='400 - Bad Request';
                    claimApplicationWrapper.caseRecord.CTP_Claims_Submission_Status_Message__c	='Data provided is invalid for Insurer Claim Submission';
                    claimApplicationWrapper.caseRecord.CTP_Exception_Flow__c=true;  
                    claimApplicationWrapper.caseRecord.CTP_Exception_Type__c='Insurer Claims Submission Failed';  
                    // Display DCR-3902
                    	component.set("v.submitStatus","Failure");
                }//400 Response Code
                
                 if(response.getReturnValue().statusCode==401 ){
                    if(response.getReturnValue().siraRefNum!=null){
                    claimApplicationWrapper.caseRecord.CTP_SIRA_Reference_Number__c=response.getReturnValue().siraRefNum;
                    console.log('claimApplicationWrapper.caseRecord.CTP_SIRA_Reference_Number__c',claimApplicationWrapper.caseRecord.CTP_SIRA_Reference_Number__c);
                    }
                    if(response.getReturnValue().insurerName!=null){
                        claimApplicationWrapper.claimRecord.CTP_Allocated_Insurer_Name__c=response.getReturnValue().insurerName;
                    }
                    if(response.getReturnValue().insurerReferenceNumber!=null){
                        claimApplicationWrapper.caseRecord.CTP_Insurer_Reference_Number__c=response.getReturnValue().insurerReferenceNumber;
                    }
                    //claimApplicationWrapper.caseRecord.Status='Acknowledged';
                    claimApplicationWrapper.caseRecord.CTP_Send_to_Insurer__c=false;
                    claimApplicationWrapper.caseRecord.CTP_Sub_Stage__c ='Awaiting further information';
                    claimApplicationWrapper.caseRecord.CTP_Claims_Submission_Status_Code__c ='401- Unauthorized Access';
                    claimApplicationWrapper.caseRecord.CTP_Claims_Submission_Status_Message__c	='Technical issue - unauthorized access reported during Claim Submission';
                    claimApplicationWrapper.caseRecord.CTP_Exception_Flow__c=true;  
                    claimApplicationWrapper.caseRecord.CTP_Exception_Type__c='Insurer Claims Submission Failed';  
                    // Display DCR-3902
                    	component.set("v.submitStatus","Failure");
                }//401 Response Code
                
                if(response.getReturnValue().statusCode==403 ){
                    if(response.getReturnValue().siraRefNum!=null){
                    claimApplicationWrapper.caseRecord.CTP_SIRA_Reference_Number__c=response.getReturnValue().siraRefNum;
                    console.log('claimApplicationWrapper.caseRecord.CTP_SIRA_Reference_Number__c',claimApplicationWrapper.caseRecord.CTP_SIRA_Reference_Number__c);
                    }
                    if(response.getReturnValue().insurerName!=null){
                        claimApplicationWrapper.claimRecord.CTP_Allocated_Insurer_Name__c=response.getReturnValue().insurerName;
                    }
                    if(response.getReturnValue().insurerReferenceNumber!=null){
                        claimApplicationWrapper.caseRecord.CTP_Insurer_Reference_Number__c=response.getReturnValue().insurerReferenceNumber;
                    }
                    //claimApplicationWrapper.caseRecord.Status='Acknowledged';
                    claimApplicationWrapper.caseRecord.CTP_Send_to_Insurer__c=false;
                    claimApplicationWrapper.caseRecord.CTP_Sub_Stage__c ='Awaiting further information';
                    claimApplicationWrapper.caseRecord.CTP_Claims_Submission_Status_Code__c ='403- Forbidden Request';
                    claimApplicationWrapper.caseRecord.CTP_Claims_Submission_Status_Message__c	='Technical issue - forbidden request reported during Claim Submission';
                    claimApplicationWrapper.caseRecord.CTP_Exception_Flow__c=true;  
                    claimApplicationWrapper.caseRecord.CTP_Exception_Type__c='Insurer Claims Submission Failed';  
                    // Display DCR-3902
                    	component.set("v.submitStatus","Failure");
                }//403 Response Code
                
                if(response.getReturnValue().statusCode==404 ){
                    if(response.getReturnValue().siraRefNum!=null){
                    claimApplicationWrapper.caseRecord.CTP_SIRA_Reference_Number__c=response.getReturnValue().siraRefNum;
                    console.log('claimApplicationWrapper.caseRecord.CTP_SIRA_Reference_Number__c',claimApplicationWrapper.caseRecord.CTP_SIRA_Reference_Number__c);
                    }
                    if(response.getReturnValue().insurerName!=null){
                        claimApplicationWrapper.claimRecord.CTP_Allocated_Insurer_Name__c=response.getReturnValue().insurerName;
                    }
                    if(response.getReturnValue().insurerReferenceNumber!=null){
                        claimApplicationWrapper.caseRecord.CTP_Insurer_Reference_Number__c=response.getReturnValue().insurerReferenceNumber;
                    }
                    //claimApplicationWrapper.caseRecord.Status='Acknowledged';
                    claimApplicationWrapper.caseRecord.CTP_Send_to_Insurer__c=false;
                    claimApplicationWrapper.caseRecord.CTP_Sub_Stage__c ='Awaiting further information';
                    claimApplicationWrapper.caseRecord.CTP_Claims_Submission_Status_Code__c ='404 - Data Not Found';
                    //claimApplicationWrapper.caseRecord.CTP_Claims_Submission_Status_Message__c	='Registration number not found in Insurers System';
                    claimApplicationWrapper.caseRecord.CTP_Exception_Flow__c=true;  
                    claimApplicationWrapper.caseRecord.CTP_Exception_Type__c='Insurer Policy Validation Failed';  
                    // Display DCR-3902
                    	component.set("v.submitStatus","Failure");
                }//404 Response Code
                
                if(response.getReturnValue().statusCode==405 ){
                    if(response.getReturnValue().siraRefNum!=null){
                    claimApplicationWrapper.caseRecord.CTP_SIRA_Reference_Number__c=response.getReturnValue().siraRefNum;
                    console.log('claimApplicationWrapper.caseRecord.CTP_SIRA_Reference_Number__c',claimApplicationWrapper.caseRecord.CTP_SIRA_Reference_Number__c);
                    }
                    if(response.getReturnValue().insurerName!=null){
                        claimApplicationWrapper.claimRecord.CTP_Allocated_Insurer_Name__c=response.getReturnValue().insurerName;
                    }
                    if(response.getReturnValue().insurerReferenceNumber!=null){
                        claimApplicationWrapper.caseRecord.CTP_Insurer_Reference_Number__c=response.getReturnValue().insurerReferenceNumber;
                    }
                    //claimApplicationWrapper.caseRecord.Status='Acknowledged';
                    claimApplicationWrapper.caseRecord.CTP_Send_to_Insurer__c=false;
                    claimApplicationWrapper.caseRecord.CTP_Sub_Stage__c ='Awaiting further information';
                    claimApplicationWrapper.caseRecord.CTP_Claims_Submission_Status_Code__c ='405- Method not allowed';
                    claimApplicationWrapper.caseRecord.CTP_Claims_Submission_Status_Message__c	='Technical issue - method is not allowed reported during Claim Submission';
                    claimApplicationWrapper.caseRecord.CTP_Exception_Flow__c=true;  
                    claimApplicationWrapper.caseRecord.CTP_Exception_Type__c= 'Insurer Claims Submission Failed';  //DCR-8282 Mohit   
                    // Display DCR-3902
                    	component.set("v.submitStatus","Failure");
                }//405 Response Code
                
                  if(response.getReturnValue().statusCode==429 ){
                    if(response.getReturnValue().siraRefNum!=null){
                    claimApplicationWrapper.caseRecord.CTP_SIRA_Reference_Number__c=response.getReturnValue().siraRefNum;
                    console.log('claimApplicationWrapper.caseRecord.CTP_SIRA_Reference_Number__c',claimApplicationWrapper.caseRecord.CTP_SIRA_Reference_Number__c);
                    }
                    if(response.getReturnValue().insurerName!=null){
                        claimApplicationWrapper.claimRecord.CTP_Allocated_Insurer_Name__c=response.getReturnValue().insurerName;
                    }
                    if(response.getReturnValue().insurerReferenceNumber!=null){
                        claimApplicationWrapper.caseRecord.CTP_Insurer_Reference_Number__c=response.getReturnValue().insurerReferenceNumber;
                    }
                    //claimApplicationWrapper.caseRecord.Status='Acknowledged';
                    claimApplicationWrapper.caseRecord.CTP_Send_to_Insurer__c=false;
                    claimApplicationWrapper.caseRecord.CTP_Sub_Stage__c ='Awaiting further information';
                    claimApplicationWrapper.caseRecord.CTP_Claims_Submission_Status_Code__c ='429 - Too many requests';
                    claimApplicationWrapper.caseRecord.CTP_Claims_Submission_Status_Message__c	='Too many requests within a period of time during Insurer Claim Submission';
                    claimApplicationWrapper.caseRecord.CTP_Exception_Flow__c=true;  
                    claimApplicationWrapper.caseRecord.CTP_Exception_Type__c= 'Insurer Claims Submission Failed';  //DCR-8315 - Mohit 
                    // Display DCR-3902
                    	component.set("v.submitStatus","Failure");
                }//429 Response Code
                
                
                  if(response.getReturnValue().statusCode==500 ){
                    if(response.getReturnValue().siraRefNum!=null){
                    claimApplicationWrapper.caseRecord.CTP_SIRA_Reference_Number__c=response.getReturnValue().siraRefNum;
                    console.log('claimApplicationWrapper.caseRecord.CTP_SIRA_Reference_Number__c',claimApplicationWrapper.caseRecord.CTP_SIRA_Reference_Number__c);
                    }
                    if(response.getReturnValue().insurerName!=null){
                        claimApplicationWrapper.claimRecord.CTP_Allocated_Insurer_Name__c=response.getReturnValue().insurerName;
                    }
                    if(response.getReturnValue().insurerReferenceNumber!=null){
                        claimApplicationWrapper.caseRecord.CTP_Insurer_Reference_Number__c=response.getReturnValue().insurerReferenceNumber;
                    }
                    //claimApplicationWrapper.caseRecord.Status='Acknowledged';
                    claimApplicationWrapper.caseRecord.CTP_Send_to_Insurer__c=false;
                    claimApplicationWrapper.caseRecord.CTP_Sub_Stage__c ='Awaiting further information';
                    claimApplicationWrapper.caseRecord.CTP_Claims_Submission_Status_Code__c ='500 - System Backend error';
                    claimApplicationWrapper.caseRecord.CTP_Claims_Submission_Status_Message__c	='Unexpected response received from Insurers system during Insurer Claim Submission';
                    claimApplicationWrapper.caseRecord.CTP_Exception_Flow__c=true;  
                    claimApplicationWrapper.caseRecord.CTP_Exception_Type__c= 'Insurer Claims Submission Failed';  //DCR-8282 Mohit 
                    // Display DCR-3902
                    	component.set("v.submitStatus","Failure");
                }//500 Response Code
                
                if(response.getReturnValue().statusCode==501 ){
                    
                    console.log('Inside 501>>>>>>>>>');
                    if(response.getReturnValue().siraRefNum!=null){
                    claimApplicationWrapper.caseRecord.CTP_SIRA_Reference_Number__c=response.getReturnValue().siraRefNum;
                    console.log('claimApplicationWrapper.caseRecord.CTP_SIRA_Reference_Number__c',claimApplicationWrapper.caseRecord.CTP_SIRA_Reference_Number__c);
                    }
                    if(response.getReturnValue().insurerName!=null){
                        claimApplicationWrapper.claimRecord.CTP_Allocated_Insurer_Name__c=response.getReturnValue().insurerName;
                    }
                    if(response.getReturnValue().insurerReferenceNumber!=null){
                        claimApplicationWrapper.caseRecord.CTP_Insurer_Reference_Number__c=response.getReturnValue().insurerReferenceNumber;
                    }
                    claimApplicationWrapper.caseRecord.Status='Pending Acknowledgement';
                    claimApplicationWrapper.caseRecord.CTP_Send_to_Insurer__c=false;
                    claimApplicationWrapper.caseRecord.CTP_Sub_Stage__c ='In Progress';
                    claimApplicationWrapper.caseRecord.CTP_Claims_Submission_Status_Code__c ='501- Not Implemented';
                    claimApplicationWrapper.caseRecord.CTP_Claims_Submission_Status_Message__c	='Method is not implemented in Insurer System during Claim Submission';
                    claimApplicationWrapper.caseRecord.CTP_Exception_Flow__c=true;  
                    claimApplicationWrapper.caseRecord.CTP_Exception_Type__c='Insurer API not Implemented';
                    // Display DCR-3902
                    	component.set("v.submitStatus","Failure");
                }//501 Response Code
                
                
                if(response.getReturnValue().statusCode==503 ){
                    if(response.getReturnValue().siraRefNum!=null){
                    claimApplicationWrapper.caseRecord.CTP_SIRA_Reference_Number__c=response.getReturnValue().siraRefNum;
                    console.log('claimApplicationWrapper.caseRecord.CTP_SIRA_Reference_Number__c',claimApplicationWrapper.caseRecord.CTP_SIRA_Reference_Number__c);
                    }
                    if(response.getReturnValue().insurerName!=null){
                        claimApplicationWrapper.claimRecord.CTP_Allocated_Insurer_Name__c=response.getReturnValue().insurerName;
                    }
                    if(response.getReturnValue().insurerReferenceNumber!=null){
                        claimApplicationWrapper.caseRecord.CTP_Insurer_Reference_Number__c=response.getReturnValue().insurerReferenceNumber;
                    }
                    //claimApplicationWrapper.caseRecord.Status='Awaiting further information';
                    claimApplicationWrapper.caseRecord.CTP_Send_to_Insurer__c=false;
                    claimApplicationWrapper.caseRecord.CTP_Sub_Stage__c ='Awaiting further information';
                    claimApplicationWrapper.caseRecord.CTP_Claims_Submission_Status_Code__c ='503 - Service Unavailable';
                    claimApplicationWrapper.caseRecord.CTP_Claims_Submission_Status_Message__c	='Requested service is currently unavailable or unable to handle the request due to a temporary overload or scheduled maintenance during Insurer Claim Submission';
                    claimApplicationWrapper.caseRecord.CTP_Exception_Flow__c=true;  
                    claimApplicationWrapper.caseRecord.CTP_Exception_Type__c='Insurer Claim Submission failed';  
                    // Display DCR-3902
                    	component.set("v.submitStatus","Failure");
                }//503 Response Code
                
                if(response.getReturnValue().statusCode==504 ){
                    if(response.getReturnValue().siraRefNum!=null){
                    claimApplicationWrapper.caseRecord.CTP_SIRA_Reference_Number__c=response.getReturnValue().siraRefNum;
                    console.log('claimApplicationWrapper.caseRecord.CTP_SIRA_Reference_Number__c',claimApplicationWrapper.caseRecord.CTP_SIRA_Reference_Number__c);
                    }
                    if(response.getReturnValue().insurerName!=null){
                        claimApplicationWrapper.claimRecord.CTP_Allocated_Insurer_Name__c=response.getReturnValue().insurerName;
                    }
                    if(response.getReturnValue().insurerReferenceNumber!=null){
                        claimApplicationWrapper.caseRecord.CTP_Insurer_Reference_Number__c=response.getReturnValue().insurerReferenceNumber;
                    }
                    //claimApplicationWrapper.caseRecord.Status='Awaiting further information';
                    claimApplicationWrapper.caseRecord.CTP_Send_to_Insurer__c=false;
                    claimApplicationWrapper.caseRecord.CTP_Sub_Stage__c ='Awaiting further information';
                    claimApplicationWrapper.caseRecord.CTP_Claims_Submission_Status_Code__c ='504 - Gateway Timeout';
                    claimApplicationWrapper.caseRecord.CTP_Claims_Submission_Status_Message__c	='Request time out during Claim Submission, please try again at another time';
                    claimApplicationWrapper.caseRecord.CTP_Exception_Flow__c=true;  
                    claimApplicationWrapper.caseRecord.CTP_Exception_Type__c='Insurer Claim Submission failed';  
                    // Display DCR-3902
                    	component.set("v.submitStatus","Failure");
                }//504 Response Code
                 //DCR-5739 - Mohit Changes Ends
                 //DCR-6390 - Mohit Starts
                if(response.getReturnValue().statusCode==999 ){
                    console.log('Inside 999>>>>>>>');
                    claimApplicationWrapper.caseRecord.Status ='Pending Acknowledgment';
                    claimApplicationWrapper.caseRecord.CTP_Exception_Flow__c=true;  
                    claimApplicationWrapper.caseRecord.CTP_Sub_Stage__c ='In Progress';
                    claimApplicationWrapper.caseRecord.CTP_Exception_Type__c='Mulesoft Unavailable';  
                    // Display DCR-3902
                    	component.set("v.submitStatus","Failure");
                }//900 Response Code
                
                 console.log('exceptionflow',exceptionflow);
                // Bhavani - Changed the condition  to === true to conform to js standards
                if(exceptionflow === true){
                     console.log('exceptionflow true 1');
                  //  claimApplicationWrapper.caseRecord.Status='Submitted';
                    component.set('v.submittedToCTPAssist','True'); 
                    console.log('exceptionflow true 2');
                }
            
            }else{
			//// Display DCR-4139
			    console.log('exceptionflow true 3');
				component.set("v.submitStatus","Failure");
                console.log('exceptionflow true 4');
			}
        /*    if(claimApplicationWrapper.caseRecord.CTP_Exception_Flow__c == true && claimApplicationWrapper.caseRecord.Status == null){
                console.log('+++++++2+++++++',claimApplicationWrapper.caseRecord.Status);
                claimApplicationWrapper.caseRecord.Status='Submitted';
              }*/
            component.set("v.claimApplicationWrapper",claimApplicationWrapper);	
            
            console.log('Before Save Record');
            helper.saveRecord(component,helper);
            console.log('After Save Record');
        });
         $A.enqueueAction(action);
        }
        
        
        //Code added by Mohit for setting integration call - Ends
        
        
    },
   
    
    /*Namrata DCR-3901 End */
   //DCR-3660,3164 - Mohit - Starts
     populateEmploymentRecord : function(component, event, helper){
    	console.log('Mohit@@@ Inside Populating Employment Details');
        //Get Case History Details from Screen 2  
            var wrapperRecord = component.get("v.claimApplicationWrapper");
           
       		var empRec = component.get("v.employerHistory");
            console.log('Mohit@@@ -->',wrapperRecord);
            console.log('Mohit@@ Length-->',empRec.length);
            wrapperRecord.claimRecord.CTP_Employment_History_Length__c = empRec.length;
         	var empFlag = component.get("v.isDisplayAwayFromWorkForm");
        	console.log('Mohit@@ Length-->',component.get("v.isDisplayAwayFromWorkForm"));
            if(component.get("v.isDisplayAwayFromWorkForm") == true){
                console.log('Inside populating Contact Fields');
            	if(empRec.length >= 1 ){
                	console.log('I am inside size 1');
                    wrapperRecord.contactRecord.CTP_Employee_or_Self_employed_Primary__c = empRec[0].CTP_Employee_or_Self_employed_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employment_Status_Primary__c = empRec[0].CTP_Employment_Status_Primary__c; 
                    wrapperRecord.contactRecord.CTP_Employer_Company_Name_Primary__c = empRec[0].CTP_Employer_Company_Name_Primary__c;
                    wrapperRecord.contactRecord.CTP_Occupation_Primary__c = empRec[0].CTP_Occupation_Primary__c;
                    wrapperRecord.contactRecord.CTP_Away_From_Primary__c = empRec[0].CTP_Away_From_Primary__c;
                    wrapperRecord.contactRecord.CTP_Away_Until_Primary__c = empRec[0].CTP_Away_Until_Primary__c;
                    wrapperRecord.contactRecord.CTP_Currently_away_from_work_Primary__c = empRec[0].CTP_Currently_away_from_work_Primary__c;
                    wrapperRecord.contactRecord.CTP_Length_of_time_off_work_Primary__c = empRec[0].CTP_Length_of_time_off_work_Primary__c;
                    wrapperRecord.contactRecord.CTP_Earning_at_time_of_Accident_Primary__c = empRec[0].CTP_Earning_at_time_of_Accident_Primary__c; 
                    if(empRec[0].CTP_Payment_Period_Primary__c != '--Select Earning Period--'){
                    	wrapperRecord.contactRecord.CTP_Payment_Period_Primary__c = empRec[0].CTP_Payment_Period_Primary__c;
                    }else{
                        wrapperRecord.contactRecord.CTP_Payment_Period_Primary__c = null;
                    }
                    wrapperRecord.contactRecord.CTP_Obtain_wages_from_Employer_Primary__c = empRec[0].CTP_Obtain_wages_from_Employer_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_first_name_Primary__c = empRec[0].CTP_Employer_first_name_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_last_name_Primary__c = empRec[0].CTP_Employer_last_name_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_Phone_Number_Primary__c = empRec[0].CTP_Employer_Phone_Number_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_email_Primary__c = empRec[0].CTP_Employer_email_Primary__c; 
                    wrapperRecord.contactRecord.CTP_Employer_Postcode_Primary__c	=	empRec[0].CTP_Employer_Postcode_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_Street_Number_Primary__c	=	empRec[0].CTP_Employer_Street_Number_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_Unit_Number_Primary__c	=	empRec[0].CTP_Employer_Unit_Number_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_Street_Name_Primary__c	=	empRec[0].CTP_Employer_Street_Name_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_Suburb_Primary__c	=	empRec[0].CTP_Employer_Suburb_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_State_Primary__c	=	empRec[0].CTP_Employer_State_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employee_or_Self_employed_Secondary1__c	= null;
					wrapperRecord.contactRecord.CTP_Employee_or_Self_employed_Secondary2__c	= null;
                    wrapperRecord.contactRecord.CTP_Employee_or_Self_employed_Secondary3__c	= null;
                    wrapperRecord.contactRecord.CTP_Employee_or_Self_employed_Secondary4__c	= null;
                    wrapperRecord.contactRecord.CTP_Employment_Status_Secondary_1__c = null;
                    wrapperRecord.contactRecord.CTP_Employment_Status_Secondary_2__c = null;
                    wrapperRecord.contactRecord.CTP_Employment_Status_Secondary_3__c = null;
                    wrapperRecord.contactRecord.CTP_Employment_Status_Secondary_4__c = null;
                    wrapperRecord.contactRecord.CTP_Employer_Company_Name_Secondary_1__c = null;
                    wrapperRecord.contactRecord.CTP_Employer_Company_Name_Secondary_2__c = null;
                    wrapperRecord.contactRecord.CTP_Employer_Company_Name_Secondary_3__c = null;
                    wrapperRecord.contactRecord.CTP_Employer_Company_Name_Secondary_4__c = null;
                    wrapperRecord.contactRecord.CTP_Occupation_Secondary_1__c = null;
                    wrapperRecord.contactRecord.CTP_Occupation_Secondary_2__c =	null;
                    wrapperRecord.contactRecord.CTP_Occupation_Secondary_3__c =	null;
                    wrapperRecord.contactRecord.CTP_Occupation_Secondary_4__c =	null;
                    wrapperRecord.contactRecord.CTP_Away_From_Secondary_1__c = null;
                    wrapperRecord.contactRecord.CTP_Away_From_Secondary_2__c = null;
                    wrapperRecord.contactRecord.CTP_Away_From_Secondary_3__c = null;
                    wrapperRecord.contactRecord.CTP_Away_From_Secondary_4__c = null;
                    wrapperRecord.contactRecord.CTP_Away_Until_Secondary_1__c =	null;
                    wrapperRecord.contactRecord.CTP_Away_Until_Secondary_2__c =	null;
                    wrapperRecord.contactRecord.CTP_Away_Until_Secondary_3__c =	null;
                    wrapperRecord.contactRecord.CTP_Away_Until_Secondary_4__c =	null;
                    wrapperRecord.contactRecord.CTP_Currently_away_from_work_Secondary_1__c	= false;
                    wrapperRecord.contactRecord.CTP_Currently_away_from_work_Secondary_2__c	= false;
                    wrapperRecord.contactRecord.CTP_Currently_away_from_work_Secondary_3__c	= false;
                    wrapperRecord.contactRecord.CTP_Currently_away_from_work_Secondary_4__c	= false;
                    wrapperRecord.contactRecord.CTP_Length_of_time_off_work_Secondary_1__c	= null;
                    wrapperRecord.contactRecord.CTP_Length_of_time_off_work_Secondary_2__c	= null;
                    wrapperRecord.contactRecord.CTP_Length_of_time_off_work_Secondary_3__c	= null;
                    wrapperRecord.contactRecord.CTP_Length_of_time_off_work_Secondary_4__c	= null;
                    wrapperRecord.contactRecord.CTP_Earning_at_time_of_Accident_Sec1__c	= null;
                    wrapperRecord.contactRecord.CTP_Earning_at_time_of_Accident_Sec2__c	= null;
                    wrapperRecord.contactRecord.CTP_Earning_at_time_of_Accident_Sec3__c	= null;
                    wrapperRecord.contactRecord.CTP_Earning_at_time_of_Accident_Sec4__c	= null;
                    wrapperRecord.contactRecord.CTP_Payment_Period_Secondary_1__c = null;
                    wrapperRecord.contactRecord.CTP_Payment_Period_Secondary_2__c = null;
                    wrapperRecord.contactRecord.CTP_Payment_Period_Secondary_3__c = null;
                    wrapperRecord.contactRecord.CTP_Payment_Period_Secondary_4__c = null;
                    wrapperRecord.contactRecord.CTP_Obtain_wages_from_Employer_Sec_1__c = null;
                    wrapperRecord.contactRecord.CTP_Obtain_wages_from_Employer_Sec_2__c = null;                     
                    wrapperRecord.contactRecord.CTP_Obtain_wages_from_Employer_Sec_3__c = null;
                    wrapperRecord.contactRecord.CTP_Obtain_wages_from_Employer_Sec_4__c = null;
                    wrapperRecord.contactRecord.CTP_Employer_first_name_Secondary_1__c = null;
                    wrapperRecord.contactRecord.CTP_Employer_first_name_Secondary_2__c = null;
                    wrapperRecord.contactRecord.CTP_Employer_first_name_Secondary_3__c = null;
                    wrapperRecord.contactRecord.CTP_Employer_first_name_Secondary_4__c = null;
                    wrapperRecord.contactRecord.CTP_Employer_last_name_Secondary_1__c = null;
                    wrapperRecord.contactRecord.CTP_Employer_last_name_Secondary_2__c = null;
                    wrapperRecord.contactRecord.CTP_Employer_last_name_Secondary_3__c = null;
                    wrapperRecord.contactRecord.CTP_Employer_last_name_Secondary_4__c = null;
                    wrapperRecord.contactRecord.CTP_Employer_Phone_Number_Secondary_1__c = null;
                    wrapperRecord.contactRecord.CTP_Employer_Phone_Number_Secondary_2__c = null;
                    wrapperRecord.contactRecord.CTP_Employer_Phone_Number_Secondary_3__c = null;
                    wrapperRecord.contactRecord.CTP_Employer_Phone_Number_Secondary_4__c = null;
                    wrapperRecord.contactRecord.CTP_Employer_email_Secondary_1__c = null;
                    wrapperRecord.contactRecord.CTP_Employer_email_Secondary_2__c = null;
                    wrapperRecord.contactRecord.CTP_Employer_email_Secondary_3__c = null;
                    wrapperRecord.contactRecord.CTP_Employer_email_Secondary_4__c = null;
                    wrapperRecord.contactRecord.CTP_Employer_Street_Name_Secondary_1__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Street_Name_Secondary_2__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Street_Name_Secondary_3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Street_Name_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Postcode_Secondary_1__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Postcode_Secondary_2__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Postcode_Secondary_3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Postcode_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Street_Number_Secondary_1__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Street_Number_Secondary_2__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Street_Number_Secondary_3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Street_Number_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Unit_Number_Secondary_1__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Unit_Number_Secondary_2__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Unit_Number_Secondary_3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Unit_Number_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Suburb_Secondary_1__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Suburb_Secondary_2__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Suburb_Secondary_3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Suburb_Secondary_4__c	=	null;
                   wrapperRecord.contactRecord.CTP_Employer_State_Secondary_1__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_State_Secondary_2__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_State_Secondary_3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_State_Secondary_4__c	=	null;
              }
              if(empRec.length >= 2){
                	console.log('I am inside size 2');   
                    wrapperRecord.contactRecord.CTP_Employee_or_Self_employed_Secondary1__c	=	empRec[1].CTP_Employee_or_Self_employed_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employee_or_Self_employed_Secondary2__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employee_or_Self_employed_Secondary3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employee_or_Self_employed_Secondary4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employment_Status_Secondary_1__c	=	empRec[1].CTP_Employment_Status_Primary__c; 
                    wrapperRecord.contactRecord.CTP_Employment_Status_Secondary_2__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employment_Status_Secondary_3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employment_Status_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Company_Name_Secondary_1__c	=	empRec[1].CTP_Employer_Company_Name_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_Company_Name_Secondary_2__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Company_Name_Secondary_3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Company_Name_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Occupation_Secondary_1__c	=	empRec[1].CTP_Occupation_Primary__c;
                    wrapperRecord.contactRecord.CTP_Occupation_Secondary_2__c	=	null;
                    wrapperRecord.contactRecord.CTP_Occupation_Secondary_3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Occupation_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Away_From_Secondary_1__c	=	empRec[1].CTP_Away_From_Primary__c;
                    wrapperRecord.contactRecord.CTP_Away_From_Secondary_2__c	=	null;
                    wrapperRecord.contactRecord.CTP_Away_From_Secondary_3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Away_From_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Away_Until_Secondary_1__c	=	empRec[1].CTP_Away_Until_Primary__c;
                    wrapperRecord.contactRecord.CTP_Away_Until_Secondary_2__c	=	null;
                    wrapperRecord.contactRecord.CTP_Away_Until_Secondary_3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Away_Until_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Currently_away_from_work_Secondary_1__c	=	empRec[1].CTP_Currently_away_from_work_Primary__c;
                    wrapperRecord.contactRecord.CTP_Currently_away_from_work_Secondary_2__c	=	false;
                    wrapperRecord.contactRecord.CTP_Currently_away_from_work_Secondary_3__c	=	false;
                    wrapperRecord.contactRecord.CTP_Currently_away_from_work_Secondary_4__c	=	false;
                    wrapperRecord.contactRecord.CTP_Length_of_time_off_work_Secondary_1__c	=	empRec[1].CTP_Length_of_time_off_work_Primary__c;
                    wrapperRecord.contactRecord.CTP_Length_of_time_off_work_Secondary_2__c	=	null;
                    wrapperRecord.contactRecord.CTP_Length_of_time_off_work_Secondary_3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Length_of_time_off_work_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Earning_at_time_of_Accident_Sec1__c	=	empRec[1].CTP_Earning_at_time_of_Accident_Primary__c;
                    wrapperRecord.contactRecord.CTP_Earning_at_time_of_Accident_Sec2__c	=	null;
                    wrapperRecord.contactRecord.CTP_Earning_at_time_of_Accident_Sec3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Earning_at_time_of_Accident_Sec4__c	=	null;
                    if(empRec[1].CTP_Payment_Period_Primary__c != '--Select Earning Period--'){
                    	wrapperRecord.contactRecord.CTP_Payment_Period_Secondary_1__c	=	empRec[1].CTP_Payment_Period_Primary__c;
                    }else{
                        wrapperRecord.contactRecord.CTP_Payment_Period_Secondary_1__c = null;
                    }
                  	wrapperRecord.contactRecord.CTP_Payment_Period_Secondary_2__c	=	null;
                    wrapperRecord.contactRecord.CTP_Payment_Period_Secondary_3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Payment_Period_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Obtain_wages_from_Employer_Sec_1__c	=	empRec[1].CTP_Obtain_wages_from_Employer_Primary__c;
                    wrapperRecord.contactRecord.CTP_Obtain_wages_from_Employer_Sec_2__c	=	null;
                    wrapperRecord.contactRecord.CTP_Obtain_wages_from_Employer_Sec_3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Obtain_wages_from_Employer_Sec_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_first_name_Secondary_1__c	=	empRec[1].CTP_Employer_first_name_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_first_name_Secondary_2__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_first_name_Secondary_3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_first_name_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_last_name_Secondary_1__c	=	empRec[1].CTP_Employer_last_name_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_last_name_Secondary_2__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_last_name_Secondary_3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_last_name_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Phone_Number_Secondary_1__c	=	empRec[1].CTP_Employer_Phone_Number_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_Phone_Number_Secondary_2__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Phone_Number_Secondary_3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Phone_Number_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_email_Secondary_1__c	=	empRec[1].CTP_Employer_email_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_email_Secondary_2__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_email_Secondary_3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_email_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Street_Name_Secondary_1__c	=	empRec[1].CTP_Employer_Street_Name_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_Street_Name_Secondary_2__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Street_Name_Secondary_3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Street_Name_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Postcode_Secondary_1__c	=	empRec[1].CTP_Employer_Postcode_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_Postcode_Secondary_2__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Postcode_Secondary_3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Postcode_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Street_Number_Secondary_1__c	=	empRec[1].CTP_Employer_Street_Number_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_Street_Number_Secondary_2__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Street_Number_Secondary_3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Street_Number_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Unit_Number_Secondary_1__c	=	empRec[1].CTP_Employer_Unit_Number_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_Unit_Number_Secondary_2__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Unit_Number_Secondary_3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Unit_Number_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Suburb_Secondary_1__c	=	empRec[1].CTP_Employer_Suburb_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_Suburb_Secondary_2__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Suburb_Secondary_3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Suburb_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_State_Secondary_1__c	=	empRec[1].CTP_Employer_State_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_State_Secondary_2__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_State_Secondary_3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_State_Secondary_4__c	=	null;
                }
                if(empRec.length >= 3){
                	console.log('I am inside size 3');   
                    wrapperRecord.contactRecord.CTP_Employee_or_Self_employed_Secondary2__c	=	empRec[2].CTP_Employee_or_Self_employed_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employee_or_Self_employed_Secondary3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employee_or_Self_employed_Secondary4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employment_Status_Secondary_2__c	=	empRec[2].CTP_Employment_Status_Primary__c; 
                    wrapperRecord.contactRecord.CTP_Employment_Status_Secondary_3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employment_Status_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Company_Name_Secondary_2__c	=	empRec[2].CTP_Employer_Company_Name_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_Company_Name_Secondary_3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Company_Name_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Occupation_Secondary_2__c	=	empRec[2].CTP_Occupation_Primary__c;
                    wrapperRecord.contactRecord.CTP_Occupation_Secondary_3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Occupation_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Away_From_Secondary_2__c	=	empRec[2].CTP_Away_From_Primary__c;
                    wrapperRecord.contactRecord.CTP_Away_From_Secondary_3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Away_From_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Away_Until_Secondary_2__c	=	empRec[2].CTP_Away_Until_Primary__c;
                    wrapperRecord.contactRecord.CTP_Away_Until_Secondary_3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Away_Until_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Currently_away_from_work_Secondary_2__c	=	empRec[2].CTP_Currently_away_from_work_Primary__c;
                    wrapperRecord.contactRecord.CTP_Currently_away_from_work_Secondary_3__c	=	false;
                    wrapperRecord.contactRecord.CTP_Currently_away_from_work_Secondary_4__c	=	false;
                    wrapperRecord.contactRecord.CTP_Length_of_time_off_work_Secondary_2__c	=	empRec[2].CTP_Length_of_time_off_work_Primary__c;
                    wrapperRecord.contactRecord.CTP_Length_of_time_off_work_Secondary_3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Length_of_time_off_work_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Earning_at_time_of_Accident_Sec2__c	=	empRec[2].CTP_Earning_at_time_of_Accident_Primary__c;
                    wrapperRecord.contactRecord.CTP_Earning_at_time_of_Accident_Sec3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Earning_at_time_of_Accident_Sec4__c	=	null;
                    if(empRec[2].CTP_Payment_Period_Primary__c != '--Select Earning Period--'){
                    	wrapperRecord.contactRecord.CTP_Payment_Period_Secondary_2__c	=	empRec[2].CTP_Payment_Period_Primary__c;
                    }else{
                        wrapperRecord.contactRecord.CTP_Payment_Period_Secondary_2__c = null;
                    }
                    wrapperRecord.contactRecord.CTP_Payment_Period_Secondary_3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Payment_Period_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Obtain_wages_from_Employer_Sec_2__c	=	empRec[2].CTP_Obtain_wages_from_Employer_Primary__c;
                    wrapperRecord.contactRecord.CTP_Obtain_wages_from_Employer_Sec_3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Obtain_wages_from_Employer_Sec_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_first_name_Secondary_2__c	=	empRec[2].CTP_Employer_first_name_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_first_name_Secondary_3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_first_name_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_last_name_Secondary_2__c	=	empRec[2].CTP_Employer_last_name_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_last_name_Secondary_3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_last_name_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Phone_Number_Secondary_2__c	=	empRec[2].CTP_Employer_Phone_Number_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_Phone_Number_Secondary_3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Phone_Number_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_email_Secondary_2__c	=	empRec[2].CTP_Employer_email_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_email_Secondary_3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_email_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Street_Name_Secondary_2__c	=	empRec[2].CTP_Employer_Street_Name_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_Street_Name_Secondary_3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Street_Name_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Postcode_Secondary_2__c	=	empRec[2].CTP_Employer_Postcode_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_Postcode_Secondary_3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Postcode_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Street_Number_Secondary_2__c	=	empRec[2].CTP_Employer_Street_Number_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_Street_Number_Secondary_3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Street_Number_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Unit_Number_Secondary_2__c	=	empRec[2].CTP_Employer_Unit_Number_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_Unit_Number_Secondary_3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Unit_Number_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Suburb_Secondary_2__c	=	empRec[2].CTP_Employer_Suburb_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_Suburb_Secondary_3__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Suburb_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_State_Secondary_2__c	=	empRec[2].CTP_Employer_State_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_State_Secondary_3__c	= null;
                    wrapperRecord.contactRecord.CTP_Employer_State_Secondary_4__c	=	null;
                }
                if(empRec.length >= 4){
                	console.log('I am inside size 4');   
                    wrapperRecord.contactRecord.CTP_Employee_or_Self_employed_Secondary3__c	=	empRec[3].CTP_Employee_or_Self_employed_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employee_or_Self_employed_Secondary4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employment_Status_Secondary_3__c	=	empRec[3].CTP_Employment_Status_Primary__c; 
                    wrapperRecord.contactRecord.CTP_Employment_Status_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Company_Name_Secondary_3__c	=	empRec[3].CTP_Employer_Company_Name_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_Company_Name_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Occupation_Secondary_3__c	=	empRec[3].CTP_Occupation_Primary__c;
                    wrapperRecord.contactRecord.CTP_Occupation_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Away_From_Secondary_3__c	=	empRec[3].CTP_Away_From_Primary__c;
                    wrapperRecord.contactRecord.CTP_Away_From_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Away_Until_Secondary_3__c	=	empRec[3].CTP_Away_Until_Primary__c;
                    wrapperRecord.contactRecord.CTP_Away_Until_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Currently_away_from_work_Secondary_3__c	=	empRec[3].CTP_Currently_away_from_work_Primary__c;
                    wrapperRecord.contactRecord.CTP_Currently_away_from_work_Secondary_4__c	=	false;
                    wrapperRecord.contactRecord.CTP_Length_of_time_off_work_Secondary_3__c	=	empRec[3].CTP_Length_of_time_off_work_Primary__c;
                    wrapperRecord.contactRecord.CTP_Length_of_time_off_work_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Earning_at_time_of_Accident_Sec3__c	=	empRec[3].CTP_Earning_at_time_of_Accident_Primary__c;
                    wrapperRecord.contactRecord.CTP_Earning_at_time_of_Accident_Sec4__c	=	null;
                    if(empRec[3].CTP_Payment_Period_Primary__c != '--Select Earning Period--'){
                    	 wrapperRecord.contactRecord.CTP_Payment_Period_Secondary_3__c	=	empRec[3].CTP_Payment_Period_Primary__c;
                    }else{
                        wrapperRecord.contactRecord.CTP_Payment_Period_Secondary_3__c = null;
                    }
                    wrapperRecord.contactRecord.CTP_Payment_Period_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Obtain_wages_from_Employer_Sec_3__c	=	empRec[3].CTP_Obtain_wages_from_Employer_Primary__c;
                    wrapperRecord.contactRecord.CTP_Obtain_wages_from_Employer_Sec_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_first_name_Secondary_3__c	=	empRec[3].CTP_Employer_first_name_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_first_name_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_last_name_Secondary_3__c	=	empRec[3].CTP_Employer_last_name_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_last_name_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Phone_Number_Secondary_3__c	=	empRec[3].CTP_Employer_Phone_Number_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_Phone_Number_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_email_Secondary_3__c	=	empRec[3].CTP_Employer_email_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_email_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Street_Name_Secondary_3__c	=	empRec[3].CTP_Employer_Street_Name_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_Street_Name_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Postcode_Secondary_3__c	=	empRec[3].CTP_Employer_Postcode_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_Postcode_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Street_Number_Secondary_3__c	=	empRec[3].CTP_Employer_Street_Number_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_Street_Number_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Unit_Number_Secondary_3__c	=	empRec[3].CTP_Employer_Unit_Number_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_Unit_Number_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_Suburb_Secondary_3__c	=	empRec[3].CTP_Employer_Suburb_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_Suburb_Secondary_4__c	=	null;
                    wrapperRecord.contactRecord.CTP_Employer_State_Secondary_3__c	=	empRec[3].CTP_Employer_State_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_State_Secondary_4__c	=	null;

                }
                if(empRec.length >= 5){
                	console.log('I am inside size 5');   
                    wrapperRecord.contactRecord.CTP_Employee_or_Self_employed_Secondary4__c	=	empRec[4].CTP_Employee_or_Self_employed_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employment_Status_Secondary_4__c	=	empRec[4].CTP_Employment_Status_Primary__c; 
                    wrapperRecord.contactRecord.CTP_Employer_Company_Name_Secondary_4__c	=	empRec[4].CTP_Employer_Company_Name_Primary__c;
                    wrapperRecord.contactRecord.CTP_Occupation_Secondary_4__c	=	empRec[4].CTP_Occupation_Primary__c;
                    wrapperRecord.contactRecord.CTP_Away_From_Secondary_4__c	=	empRec[4].CTP_Away_From_Primary__c;
                    wrapperRecord.contactRecord.CTP_Away_Until_Secondary_4__c	=	empRec[4].CTP_Away_Until_Primary__c;
                    wrapperRecord.contactRecord.CTP_Currently_away_from_work_Secondary_4__c	=	empRec[4].CTP_Currently_away_from_work_Primary__c;
                    wrapperRecord.contactRecord.CTP_Length_of_time_off_work_Secondary_4__c	=	empRec[4].CTP_Length_of_time_off_work_Primary__c;
                    wrapperRecord.contactRecord.CTP_Earning_at_time_of_Accident_Sec4__c	=	empRec[4].CTP_Earning_at_time_of_Accident_Primary__c;
                    if(empRec[4].CTP_Payment_Period_Primary__c != '--Select Earning Period--'){
                    	 wrapperRecord.contactRecord.CTP_Payment_Period_Secondary_4__c	=	empRec[4].CTP_Payment_Period_Primary__c;
                    }else{
                         wrapperRecord.contactRecord.CTP_Payment_Period_Secondary_4__c = null;
                    }
                    wrapperRecord.contactRecord.CTP_Obtain_wages_from_Employer_Sec_4__c	=	empRec[4].CTP_Obtain_wages_from_Employer_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_first_name_Secondary_4__c	=	empRec[4].CTP_Employer_first_name_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_last_name_Secondary_4__c	=	empRec[4].CTP_Employer_last_name_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_Phone_Number_Secondary_4__c	=	empRec[4].CTP_Employer_Phone_Number_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_email_Secondary_4__c	=	empRec[4].CTP_Employer_email_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_Street_Name_Secondary_4__c	=	empRec[4].CTP_Employer_Street_Name_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_Postcode_Secondary_4__c	=	empRec[4].CTP_Employer_Postcode_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_Street_Number_Secondary_4__c	=	empRec[4].CTP_Employer_Street_Number_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_Unit_Number_Secondary_4__c	=	empRec[4].CTP_Employer_Unit_Number_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_Suburb_Secondary_4__c	=	empRec[4].CTP_Employer_Suburb_Primary__c;
                    wrapperRecord.contactRecord.CTP_Employer_State_Secondary_4__c	=	empRec[4].CTP_Employer_State_Primary__c;
                }
                 
         }
         component.set("v.claimApplicationWrapper",wrapperRecord);
          
         //DCR-3660,3164 - Mohit - Ends
	},
    
    
    
    
   assignConsentforsurvey: function(component, event, helper){
         var consentforsurvey = component.get("v.tempVaribleSurveyFeedback");
         var wrapperRecord = component.get("v.claimApplicationWrapper");
        var action = component.get('c.getassignconsentforSurvey');
       console.log('c.assignconsentforSurvey =-------------'+consentforsurvey);
        var claimApplication = component.get("v.claimApplicationWrapper");
       
        var claimApplicationJSON = JSON.stringify(claimApplication);
        
        action.setParams({
            'claimApplicationJSON' : claimApplicationJSON,
            'consent' : consentforsurvey,
        });
       console.log('+++10000')
       action.setCallback(this, function(response) {
       var state = response.getState();
           console.log('+++1',response.getReturnValue().Email)
       if(state === "SUCCESS")
            {
                 console.log('+++2',response.getReturnValue().Email)
                component.set("v.SubmitterEmail", response.getReturnValue().Email);
            }
       });
       $A.enqueueAction(action);
    },
    getAttachmentId : function(component, event,fileName,caseId){
        
        var action = component.get("c.getAttachmentId");
        action.setParams({
            "fileName" : fileName,
            "caseId" :caseId
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state === "SUCCESS")
            {
                component.set("v.attachmentId", response.getReturnValue());
                //var URL ='/apex/DRS_Attachment_View?id='+response.getReturnValue();
                //window.open(URL,'_blank');
                
                var previewAttachmentAction = component.get("c.previewAttachment");
                previewAttachmentAction.setParams({
                    "attachmentId" : response.getReturnValue()
                });
                
                previewAttachmentAction.setCallback(this, function(response) {
                    var state = response.getState();
                    console.log('previewAttachmentAction =-------------'+state);
                    if(state === "SUCCESS")
                    {
                        
                        var URL =response.getReturnValue();
                        console.log('Amazon URL=-------------'+URL); 
                        window.open(URL,'_blank');
                    }
                });
                
                $A.enqueueAction(previewAttachmentAction); 
            }
        });
        
        $A.enqueueAction(action); 
    },
    
       /*
     * DCR-5498
     * Himani
     * Start
    */
    ClaimHistoryErase: function(component, event, helper) {
        console.log('inside clear method');
        
       
       var wraperRecord = component.get("v.claimApplicationWrapper");
            wraperRecord.claimRecord.CTP_Month_of_Injury_1__c = null;
            wraperRecord.claimRecord.CTP_Month_of_Injury_2__c = null;
            wraperRecord.claimRecord.CTP_Month_of_Injury_3__c = null;
            wraperRecord.claimRecord.CTP_Month_of_Injury_4__c = null;
            wraperRecord.claimRecord.CTP_Month_of_Injury_5__c = null;
        
         	wraperRecord.claimRecord.CTP_Year_of_Injury_1__c = null;
            wraperRecord.claimRecord.CTP_Year_of_Injury_2__c = null;
            wraperRecord.claimRecord.CTP_Year_of_Injury_3__c = null;
            wraperRecord.claimRecord.CTP_Year_of_Injury_4__c = null;
            wraperRecord.claimRecord.CTP_Year_of_Injury_5__c = null;
        
        	wraperRecord.claimRecord.CTP_Previous_Claim_Number_1__c = '';
            wraperRecord.claimRecord.CTP_Previous_Claim_Number_2__c = '';
            wraperRecord.claimRecord.CTP_Previous_Claim_Number_3__c = '';
            wraperRecord.claimRecord.CTP_Previous_Claim_Number_4__c = '';
            wraperRecord.claimRecord.CTP_Previous_Claim_Number_5__c = '';
        
         	wraperRecord.claimRecord.CTP_Previous_Insurer_1__c = '';
            wraperRecord.claimRecord.CTP_Previous_Insurer_2__c = '';
            wraperRecord.claimRecord.CTP_Previous_Insurer_3__c = '';
            wraperRecord.claimRecord.CTP_Previous_Insurer_4__c = '';
            wraperRecord.claimRecord.CTP_Previous_Insurer_5__c = '';
        
        	wraperRecord.claimRecord.CTP_Previous_CTP_Insurer_Other_1__c = null;
            wraperRecord.claimRecord.CTP_Previous_CTP_Insurer_Other_2__c = null;
            wraperRecord.claimRecord.CTP_Previous_CTP_Insurer_Other_3__c = null;
            wraperRecord.claimRecord.CTP_Previous_CTP_Insurer_Other_4__c = null;
            wraperRecord.claimRecord.CTP_Previous_CTP_Insurer_Other_5__c = null;
        component.set("v.claimApplicationWrapper",wraperRecord);
        
        /*var childClaimHistory = component.get("v.childClaimHistory");
        if (childClaimHistory.length == 1) {
            console.log("element: " + JSON.stringify(childClaimHistory));            
            childClaimHistory = [{"injuryYear":"","injuryMonth":"","CTP_Previous_Insurer_1__c":"Select Insurer","CTP_Previous_Claim_Number_1__c":""}];
			component.set("v.childClaimHistory", childClaimHistory);
        }
        else if (childClaimHistory.length == 2){
            childClaimHistory = [{"injuryYear":"","injuryMonth":"","CTP_Previous_Insurer_1__c":"Select Insurer","CTP_Previous_Claim_Number_1__c":""},
                                 {"injuryYear":"","injuryMonth":"","CTP_Previous_Insurer_2__c":"Select Insurer","CTP_Previous_Claim_Number_2__c":""}];
			component.set("v.childClaimHistory", childClaimHistory); 
            
        }else if (childClaimHistory.length == 3){
            childClaimHistory = [{"injuryYear":"","injuryMonth":"","CTP_Previous_Insurer_1__c":"Select Insurer","CTP_Previous_Claim_Number_1__c":""},
                                 {"injuryYear":"","injuryMonth":"","CTP_Previous_Insurer_2__c":"Select Insurer","CTP_Previous_Claim_Number_2__c":""},
                                {"injuryYear":"","injuryMonth":"","CTP_Previous_Insurer_3__c":"Select Insurer","CTP_Previous_Claim_Number_3__c":""}];
			component.set("v.childClaimHistory", childClaimHistory); 
            
        }else if (childClaimHistory.length == 4){
            childClaimHistory = [{"injuryYear":"","injuryMonth":"","CTP_Previous_Insurer_1__c":"Select Insurer","CTP_Previous_Claim_Number_1__c":""},
                                 {"injuryYear":"","injuryMonth":"","CTP_Previous_Insurer_2__c":"Select Insurer","CTP_Previous_Claim_Number_2__c":""},
                                {"injuryYear":"","injuryMonth":"","CTP_Previous_Insurer_3__c":"Select Insurer","CTP_Previous_Claim_Number_3__c":""},
                                {"injuryYear":"","injuryMonth":"","CTP_Previous_Insurer_4__c":"Select Insurer","CTP_Previous_Claim_Number_4__c":""}];
			component.set("v.childClaimHistory", childClaimHistory); 
            
        }else if (childClaimHistory.length == 5){
            childClaimHistory = [{"injuryYear":"","injuryMonth":"","CTP_Previous_Insurer_1__c":"Select Insurer","CTP_Previous_Claim_Number_1__c":""},
                                 {"injuryYear":"","injuryMonth":"","CTP_Previous_Insurer_2__c":"Select Insurer","CTP_Previous_Claim_Number_2__c":""},
                                 {"injuryYear":"","injuryMonth":"","CTP_Previous_Insurer_3__c":"Select Insurer","CTP_Previous_Claim_Number_3__c":""},
                                {"injuryYear":"","injuryMonth":"","CTP_Previous_Insurer_4__c":"Select Insurer","CTP_Previous_Claim_Number_4__c":""},
                                {"injuryYear":"","injuryMonth":"","CTP_Previous_Insurer_5__c":"Select Insurer","CTP_Previous_Claim_Number_5__c":""},];
			component.set("v.childClaimHistory", childClaimHistory); 
            
        }*/
        
         var childClaimHistory = component.get("v.childClaimHistory");
     
         console.log("element: " + JSON.stringify(childClaimHistory));
           if(childClaimHistory.length == 1){
             console.log('lenght 1');
             childClaimHistory = [{"injuryYear":"","injuryMonth":"","CTP_Previous_Insurer_1__c":"Select Insurer","CTP_Previous_Claim_Number_1__c":""}];
			component.set("v.childClaimHistory", childClaimHistory); 
            component.set("v.childClaimHistory", childClaimHistory);
            }else if (childClaimHistory.length > 1) {
           this.ShowOneOpenClaim(component,childClaimHistory);
             console.log('after----->>>');
        }  
        
        
       
        
    },
                                 
    ShowOneOpenClaim : function(component,childClaimHistory) {
          childClaimHistory.splice((childClaimHistory.length-1), (childClaimHistory.length - 1));
         if (childClaimHistory.length > 1) {
           this.ShowOneOpenClaim(component,childClaimHistory);
             console.log('after#################');
         }else if (childClaimHistory.length ==1){
             childClaimHistory = [{"injuryYear":"","injuryMonth":"","CTP_Previous_Insurer_1__c":"Select Insurer","CTP_Previous_Claim_Number_1__c":""}];
			component.set("v.childClaimHistory", childClaimHistory);
             component.set("v.childClaimHistory", childClaimHistory);
         }
        
        
     },                           
    EmploymentDetailErase: function(component, event, helper) {
                                 
                                 
           console.log('inside clear method');
                              
        var wraperRecord = component.get("v.claimApplicationWrapper");
         
         wraperRecord.contactRecord.CTP_Employee_or_Self_employed_Primary__c = '';
         wraperRecord.contactRecord.CTP_Employee_or_Self_employed_Secondary1__c = '';
         wraperRecord.contactRecord.CTP_Employee_or_Self_employed_Secondary2__c = '';
         wraperRecord.contactRecord.CTP_Employee_or_Self_employed_Secondary3__c = '';
         wraperRecord.contactRecord.CTP_Employee_or_Self_employed_Secondary4__c = '';
         
         wraperRecord.contactRecord.CTP_Employment_Status_Primary__c = '';
         wraperRecord.contactRecord.CTP_Employment_Status_Secondary_1__c = '';
         wraperRecord.contactRecord.CTP_Employment_Status_Secondary_2__c = '';
         wraperRecord.contactRecord.CTP_Employment_Status_Secondary_3__c = '';
         wraperRecord.contactRecord.CTP_Employment_Status_Secondary_4__c = '';
         
         wraperRecord.contactRecord.CTP_Employer_Company_Name_Primary__c = null;
         wraperRecord.contactRecord.CTP_Employer_Company_Name_Secondary_1__c = null;
         wraperRecord.contactRecord.CTP_Employer_Company_Name_Secondary_2__c = null;
         wraperRecord.contactRecord.CTP_Employer_Company_Name_Secondary_3__c = null;
         wraperRecord.contactRecord.CTP_Employer_Company_Name_Secondary_4__c = null;
         
         wraperRecord.contactRecord.CTP_Occupation_Primary__c = null;
         wraperRecord.contactRecord.CTP_Occupation_Secondary_1__c = null;
         wraperRecord.contactRecord.CTP_Occupation_Secondary_2__c = null;
         wraperRecord.contactRecord.CTP_Occupation_Secondary_3__c = null;
         wraperRecord.contactRecord.CTP_Occupation_Secondary_4__ = null;
         
         wraperRecord.contactRecord.CTP_Away_From_Primary__c = null;
         wraperRecord.contactRecord.CTP_Away_From_Secondary_1__c = null;
         wraperRecord.contactRecord.CTP_Away_From_Secondary_2__c = null;
         wraperRecord.contactRecord.CTP_Away_From_Secondary_3__c = null;
         wraperRecord.contactRecord.CTP_Away_From_Secondary_4__c = null;
         
         wraperRecord.contactRecord.CTP_Away_Until_Primary__c = null;
         wraperRecord.contactRecord.CTP_Away_Until_Secondary_1__c = null;
         wraperRecord.contactRecord.CTP_Away_Until_Secondary_2__c = null;
         wraperRecord.contactRecord.CTP_Away_Until_Secondary_3__c = null;
         wraperRecord.contactRecord.CTP_Away_Until_Secondary_4__c = null; 
         
         wraperRecord.contactRecord.CTP_Currently_away_from_work_Primary__c = false;
         wraperRecord.contactRecord.CTP_Currently_away_from_work_Secondary_1__c = false;
         wraperRecord.contactRecord.CTP_Currently_away_from_work_Secondary_1__c = false;
         wraperRecord.contactRecord.CTP_Currently_away_from_work_Secondary_1__c = false;
         wraperRecord.contactRecord.CTP_Currently_away_from_work_Secondary_1__c = false;
         
         wraperRecord.contactRecord.CTP_Length_of_time_off_work_Primary__c = null;
         wraperRecord.contactRecord.CTP_Length_of_time_off_work_Secondary_1__c = null;
         wraperRecord.contactRecord.CTP_Length_of_time_off_work_Secondary_2__c = null;
         wraperRecord.contactRecord.CTP_Length_of_time_off_work_Secondary_3__c = null;
         wraperRecord.contactRecord.CTP_Length_of_time_off_work_Secondary_4__c = null;
         
         wraperRecord.contactRecord.CTP_Earning_at_time_of_Accident_Primary__c = null;
         wraperRecord.contactRecord.CTP_Earning_at_time_of_Accident_Sec1__c = null;
         wraperRecord.contactRecord.CTP_Earning_at_time_of_Accident_Sec2__c = null;
         wraperRecord.contactRecord.CTP_Earning_at_time_of_Accident_Sec3__c = null;
         wraperRecord.contactRecord.CTP_Earning_at_time_of_Accident_Sec4__c = null;
         
         wraperRecord.contactRecord.CTP_Payment_Period_Primary__c = '';
         wraperRecord.contactRecord.CTP_Payment_Period_Secondary_1__c = '';
         wraperRecord.contactRecord.CTP_Payment_Period_Secondary_2__c = '';
         wraperRecord.contactRecord.CTP_Payment_Period_Secondary_3__c = '';
         wraperRecord.contactRecord.CTP_Payment_Period_Secondary_4__c = '';
         
         wraperRecord.contactRecord.CTP_Obtain_wages_from_Employer_Primary__c = '';
         wraperRecord.contactRecord.CTP_Obtain_wages_from_Employer_Sec_1__c = '';
         wraperRecord.contactRecord.CTP_Obtain_wages_from_Employer_Sec_2__c = '';
         wraperRecord.contactRecord.CTP_Obtain_wages_from_Employer_Sec_3__c = '';
         wraperRecord.contactRecord.CTP_Obtain_wages_from_Employer_Sec_4__c = '';
         
         wraperRecord.contactRecord.CTP_Employer_first_name_Primary__c = null;
         wraperRecord.contactRecord.CTP_Employer_first_name_Secondary_1__c = null;
         wraperRecord.contactRecord.CTP_Employer_first_name_Secondary_2__c = null;
         wraperRecord.contactRecord.CTP_Employer_first_name_Secondary_3__c = null;
         wraperRecord.contactRecord.CTP_Employer_first_name_Secondary_4__c = null;
         
         wraperRecord.contactRecord.CTP_Employer_last_name_Primary__c = null;
         wraperRecord.contactRecord.CTP_Employer_last_name_Secondary_1__c = null;
         wraperRecord.contactRecord.CTP_Employer_last_name_Secondary_2__c = null;
         wraperRecord.contactRecord.CTP_Employer_last_name_Secondary_3__c = null;
         wraperRecord.contactRecord.CTP_Employer_last_name_Secondary_4__c = null;
         
         wraperRecord.contactRecord.CTP_Employer_Phone_Number_Primary__c = null;
         wraperRecord.contactRecord.CTP_Employer_Phone_Number_Secondary_1__c = null;
         wraperRecord.contactRecord.CTP_Employer_Phone_Number_Secondary_2__c = null;
         wraperRecord.contactRecord.CTP_Employer_Phone_Number_Secondary_3__c = null;
         wraperRecord.contactRecord.CTP_Employer_Phone_Number_Secondary_4__c = null;
         
         wraperRecord.contactRecord.CTP_Employer_email_Primary__c = null;
         wraperRecord.contactRecord.CTP_Employer_email_Secondary_1__c = null;
         wraperRecord.contactRecord.CTP_Employer_email_Secondary_2__c = null;
         wraperRecord.contactRecord.CTP_Employer_email_Secondary_3__c = null;
         wraperRecord.contactRecord.CTP_Employer_email_Secondary_4__c = null;
         
         wraperRecord.contactRecord.CTP_Employer_Postcode_Primary__c = null;
         wraperRecord.contactRecord.CTP_Employer_Postcode_Secondary_1__c = null;
         wraperRecord.contactRecord.CTP_Employer_Postcode_Secondary_2__c = null;
         wraperRecord.contactRecord.CTP_Employer_Postcode_Secondary_3__c = null;
         wraperRecord.contactRecord.CTP_Employer_Postcode_Secondary_4__c = null;
         
         wraperRecord.contactRecord.CTP_Employer_State_Primary__c = '';
         wraperRecord.contactRecord.CTP_Employer_State_Secondary_1__c = '';
         wraperRecord.contactRecord.CTP_Employer_State_Secondary_2__c = '';
         wraperRecord.contactRecord.CTP_Employer_State_Secondary_3__c = '';
         wraperRecord.contactRecord.CTP_Employer_State_Secondary_4__c = '';
         
         wraperRecord.contactRecord.CTP_Employer_Street_Name_Primary__c = null;
         wraperRecord.contactRecord.CTP_Employer_Street_Name_Secondary_1__c = null;
         wraperRecord.contactRecord.CTP_Employer_Street_Name_Secondary_2__c = null;
         wraperRecord.contactRecord.CTP_Employer_Street_Name_Secondary_3__c = null;
         wraperRecord.contactRecord.CTP_Employer_Street_Name_Secondary_4__c = null;
         
         wraperRecord.contactRecord.CTP_Employer_Street_Number_Primary__c = null;
         wraperRecord.contactRecord.CTP_Employer_Street_Number_Secondary_1__c = null;
         wraperRecord.contactRecord.CTP_Employer_Street_Number_Secondary_2__c = null;
         wraperRecord.contactRecord.CTP_Employer_Street_Number_Secondary_3__c = null;
         wraperRecord.contactRecord.CTP_Employer_Street_Number_Secondary_4__c = null;
         
         wraperRecord.contactRecord.CTP_Employer_Suburb_Primary__c = null;
         wraperRecord.contactRecord.CTP_Employer_Suburb_Secondary_1__c = null;
         wraperRecord.contactRecord.CTP_Employer_Suburb_Secondary_2__c = null;
         wraperRecord.contactRecord.CTP_Employer_Suburb_Secondary_3__c = null;
         wraperRecord.contactRecord.CTP_Employer_Suburb_Secondary_4__c = null;
         
         wraperRecord.contactRecord.CTP_Employer_Unit_Number_Primary__c = null;
         wraperRecord.contactRecord.CTP_Employer_Unit_Number_Secondary_1__c = null;
         wraperRecord.contactRecord.CTP_Employer_Unit_Number_Secondary_2__c = null;
         wraperRecord.contactRecord.CTP_Employer_Unit_Number_Secondary_3__c = null;
         wraperRecord.contactRecord.CTP_Employer_Unit_Number_Secondary_4__c = null;
          console.log('after  @@@---');
         component.set("v.claimApplicationWrapper",wraperRecord);
          console.log('after  ---');
         
                                 
                                 
          var employerHistory = component.get("v.employerHistory");
     
         console.log("element: " + JSON.stringify(employerHistory));
           if(employerHistory.length == 1){
             console.log('lenght 1');
                                  employerHistory = [{}]; 
            component.set("v.employerHistory", employerHistory);
            }else if (employerHistory.length > 1) {
           this.ShowOneOpenEmploy(component,employerHistory);
             console.log('after----->>>');
        }  
        
           
         
        
    },
        
        ShowOneOpenEmploy : function(component,employerHistory) {
        employerHistory.splice((employerHistory.length-1), (employerHistory.length - 1));
         if (employerHistory.length > 1) {
           this.ShowOneOpenEmploy(component,employerHistory);
             console.log('after#################');
         }else if (employerHistory.length ==1){
             employerHistory = [{}]; 
             component.set("v.employerHistory", employerHistory);
         }
             
                                 
     }, 
    
    
     /*
     * DCR-5498
     * Himani
     * End
    */
    closeRegularSubmitModal: function(component, event, helper) {
		var modalClose = component.find('modalRegularSubmit');
        $A.util.addClass(modalClose, 'slds-hidden');
        component.set("v.regularSubmitApplication", false);
    },
   displayProgressBar: function(component, event, helper){
            
        component.set('v.submitStatusDialog', true);
        component.set('v.estimatedSecond',60)
        component.set('v.passedMsSecond',0)
        component.set('v.submitStatus','Waiting')
        component.set('v.progress',0);
        
        var interval = setInterval($A.getCallback(function () {
          var progress = component.get('v.progress');
		  var estimatedSecond = component.get('v.estimatedSecond');
          var passedMsSecond = component.get('v.passedMsSecond');
          var submitStatus = component.get('v.submitStatus');
              passedMsSecond = passedMsSecond + 600;
              component.set('v.passedMsSecond',passedMsSecond)
          
           if(submitStatus == 'Success'){
		   //// Display DCR-3902
              component.set('v.progress', 100);
              setInterval(function () {
                component.set('v.submitStatusDialog', false); 
                component.set('v.submittedToCTPAssistInsurerAssigned', true);
                
              },500);
           }else if(submitStatus == 'Failure'){
		   //// Display DCR-4139
              component.set('v.progress', 0);
              setInterval(function () {
                  component.set('v.submitStatusDialog', false);
                  component.set('v.submittedToCTPAssistNoInsurerAssigned', true);
                  
              },500);
              
           }else  if(passedMsSecond % 4800 === 0){
              estimatedSecond = estimatedSecond - 5;
              component.set('v.estimatedSecond', estimatedSecond);
               if(estimatedSecond == 0){
                  component.set('v.progress', 99);	
              }
           }
            
           if(submitStatus == 'Waiting' && progress < 99) {
              component.set('v.progress', progress + 1);
           } 
              
            if(submitStatus == 'Waiting' && progress == 100) {
                clearInterval(interval);
            }
      	  
        }), 600);
        },
    
/*
Story: DCR-6354
Author: Sahil Sachar
Purpose: Invoe PDF Generation and Storing in Salesforce file.
*/
    callPDFGeneration:function(component, event, helper){
        console.log('PDF Generation Invoked');
        var newCaseID = component.get("v.claimApplicationWrapper.caseRecord.Id");
        console.log('PDF Generated Invoked for'+newCaseID);                
        var action = component.get("c.callPDFGenerationMethod");
        action.setParams({
            "caseID" : newCaseID 
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state === "SUCCESS")
            {
            	console.log('PDF Generated and Saved successfully for'+newCaseID);                
            }
        });
        $A.enqueueAction(action);
    },
       
    //4173 by himani
    takenToHospitalInAmbulanceHelper: function(component, event, helper) {
      
         //DCR-4713 by Himani
         console.log('inside takenToHospitalInAmbulance');
        //var takenToHospitalInAmbulance  =  event.getParam("value");
         var claimApplicationWrapper = component.get("v.claimApplicationWrapper");
        var takenToHospitalInAmbulance  = claimApplicationWrapper.claimRecord.CTP_Ambulance_Used__c;
        if(takenToHospitalInAmbulance == "Yes"){
            console.log('inside takenToHospitalInAmbulance if');
            component.set('v.DisplayAmbulancePickList', true);
            //component.set("v.claimApplicationWrapper.claimRecord.CTP_Ambulance_Used__c",takenToHospitalInAmbulance);
            var onReceiveAmbulance = component.get('v.onReceivedAmbulanceChange');
            if(onReceiveAmbulance == true){
                component.set("v.claimApplicationWrapper.claimRecord.Ambulance_Service_Received__c",undefined);
                component.set('v.onReceivedAmbulanceChange', false);
            }
        }else{
            console.log('inside takenToHospitalInAmbulance else');
            component.set('v.DisplayAmbulancePickList', false);
            component.set("v.claimApplicationWrapper.claimRecord.Ambulance_Service_Received__c",'01 - No Ambulance Attendance');
            //component.set("v.claimApplicationWrapper.claimRecord.CTP_Ambulance_Used__c",takenToHospitalInAmbulance);
        }
        
    },
    
    /*
Story: DCR-5016
Author: Bhavani / Upendra
Purpose: Retrieving Draft claim and initializing the component accordingly
*/
    draftApplicationData:function(component, helper, draftCaseId){
	        component.set('v.step', 2);
            console.log('>> v.step >>. '+component.get("v.step"));
        	// set isValid to false so that next button is enabled - TODO check
            component.set('v.isValid', false);
            //component.set('v.proceedClaimApplication', true); 
        	// making a server call to get the complete wrapper of draft claim
            var getClaimDetailsAction = component.get("c.getClaimDetails");
            getClaimDetailsAction.setParams({ "caseId" : draftCaseId });
            getClaimDetailsAction.setCallback(this, function(response){
                var state = response.getState();
                console.log("state is >> Retrieve",state); 
                
                if(state == "SUCCESS"){
                    var claimApplicationWrapper = response.getReturnValue();   
                    
                    //DCR-5016 : 24th Feb
                    component.set("v.caseRecordId",draftCaseId);
                    console.log('>> Case Record Id for Attachment>> '+draftCaseId);
                    
                    component.set("v.claimApplicationWrapper", claimApplicationWrapper);
                    component.set("v.objInfo",claimApplicationWrapper.userRecord);
                    component.set("v.claim",claimApplicationWrapper.claimRecord);
                    component.set("v.case",claimApplicationWrapper.caseRecord);
                    component.set("v.treatmentsHistory", claimApplicationWrapper.treatmentRecordList);
                    
                   // this.getAttachments(component.get('v.caseRecordId'),component,category);
                    
                    // for Claim Details page
                    this.initEditDraftForStep1(component,helper,claimApplicationWrapper);
                    // for Application Details Page2
                    this.initEditDraftForStep2(component,helper,claimApplicationWrapper);
                    // for Health Screen Page
                    this.initEditDraftForStep3(component,helper,claimApplicationWrapper);
                    // for Employment screen page
                    this.initEditDraftForStep4(component,helper,claimApplicationWrapper);
                    // TODO : fetch attachments and update the attachmentList
                     
                    // to fetch manual accident Address: Date 06-Mar-2018: Edit Draft :Upendra
                    this.getManualAddressDetails(component, helper,claimApplicationWrapper);
                    
                    // to fetch vehicle details: Date 07-Mar-2018: Edit Draft :Upendra
                    this.getVehicleDetails(component, helper, claimApplicationWrapper);
                    console.log("claimApplicationWrapper Retrieved>>>>> ",claimApplicationWrapper);
                    
                }
            });
        $A.enqueueAction(getClaimDetailsAction);
            	

            //proceedApplication(component, event, helper);            
        },
    
    initEditDraftForStep4:function(component, helper,claimApplicationWrapper){
        
        // setting employment form display based on retrieved value
        helper.fetchPickListVal(component, 'Contact', 'CTP_Payment_Period_Primary__c', 'v.earningsPeriod',['--Select Earning Period--']);
        if (claimApplicationWrapper.claimRecord.CTP_Away_From_Work_Due_To_Accident__c != undefined && claimApplicationWrapper.claimRecord.CTP_Away_From_Work_Due_To_Accident__c == "Yes")
        {
            component.set("v.isDisplayAwayFromWorkForm", true);
            this.setEmploymentHistory(component, helper, claimApplicationWrapper);
        }
        console.log("Center links benefits : ",claimApplicationWrapper.claimRecord.CTP_Type_Of_Benefits_Received__c);
        if ( claimApplicationWrapper.claimRecord.CTP_Type_Of_Benefits_Received__c != undefined && claimApplicationWrapper.claimRecord.CTP_Type_Of_Benefits_Received__c != "No"){
            component.set("v.centrelinkBenefitsYesNo", "Yes");
        }else{
            component.set("v.centrelinkBenefitsYesNo", "No");
        }
        
    },
    
    setEmploymentHistory:function (component, helper, claimApplicationWrapper){
        	var employmentHistory= [];
            if (claimApplicationWrapper.claimRecord.CTP_Employment_History_Length__c >= 1){
                console.log("inside >=1 for employmentHistory START");
                var childEmploymentHistoryObj1 = new Object();
    			childEmploymentHistoryObj1.CTP_Employee_or_Self_employed_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employee_or_Self_employed_Primary__c;
                //claimApplicationWrapper.contactRecord.LastName = 'Test';
                childEmploymentHistoryObj1.CTP_Employment_Status_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employment_Status_Primary__c; 
                childEmploymentHistoryObj1.CTP_Employer_Company_Name_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_Company_Name_Primary__c ;
                childEmploymentHistoryObj1.CTP_Occupation_Primary__c = claimApplicationWrapper.contactRecord.CTP_Occupation_Primary__c ;
                childEmploymentHistoryObj1.CTP_Away_From_Primary__c = claimApplicationWrapper.contactRecord.CTP_Away_From_Primary__c ;
                childEmploymentHistoryObj1.CTP_Away_Until_Primary__c = claimApplicationWrapper.contactRecord.CTP_Away_Until_Primary__c ;
                childEmploymentHistoryObj1.CTP_Currently_away_from_work_Primary__c = claimApplicationWrapper.contactRecord.CTP_Currently_away_from_work_Primary__c;
                childEmploymentHistoryObj1.CTP_Length_of_time_off_work_Primary__c = claimApplicationWrapper.contactRecord.CTP_Length_of_time_off_work_Primary__c;
                childEmploymentHistoryObj1.CTP_Earning_at_time_of_Accident_Primary__c = claimApplicationWrapper.contactRecord.CTP_Earning_at_time_of_Accident_Primary__c; 
                if (claimApplicationWrapper.contactRecord.CTP_Payment_Period_Primary__c != undefined && claimApplicationWrapper.contactRecord.CTP_Payment_Period_Primary__c != '--Select Earning Period--'){
    				childEmploymentHistoryObj1.CTP_Payment_Period_Primary__c = claimApplicationWrapper.contactRecord.CTP_Payment_Period_Primary__c;
            	}
                childEmploymentHistoryObj1.CTP_Obtain_wages_from_Employer_Primary__c = claimApplicationWrapper.contactRecord.CTP_Obtain_wages_from_Employer_Primary__c ;
                childEmploymentHistoryObj1.CTP_Employer_first_name_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_first_name_Primary__c ;
                childEmploymentHistoryObj1.CTP_Employer_last_name_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_last_name_Primary__c ;
                childEmploymentHistoryObj1.CTP_Employer_Phone_Number_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_Phone_Number_Primary__c;
                childEmploymentHistoryObj1.CTP_Employer_email_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_email_Primary__c ; 
                childEmploymentHistoryObj1.CTP_Employer_Postcode_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_Postcode_Primary__c;
                childEmploymentHistoryObj1.CTP_Employer_Street_Number_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_Street_Number_Primary__c	;
                childEmploymentHistoryObj1.CTP_Employer_Unit_Number_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_Unit_Number_Primary__c	;
                childEmploymentHistoryObj1.CTP_Employer_Street_Name_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_Street_Name_Primary__c	;
                childEmploymentHistoryObj1.CTP_Employer_Suburb_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_Suburb_Primary__c;
                childEmploymentHistoryObj1.CTP_Employer_State_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_State_Primary__c	;
 
                console.log("childEmploymentHistoryObj1 :" + childEmploymentHistoryObj1);
    			employmentHistory.push(childEmploymentHistoryObj1);
                console.log("inside >=1 for employmentHistory END");
            }
            if (claimApplicationWrapper.claimRecord.CTP_Employment_History_Length__c >=2){
                console.log("inside >=2 for employmentHistory Start");
				var childEmploymentHistoryObj2 = new Object();
    			childEmploymentHistoryObj2.CTP_Employee_or_Self_employed_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employee_or_Self_employed_Secondary1__c;
                //claimApplicationWrapper.contactRecord.LastName = 'Test';
                childEmploymentHistoryObj2.CTP_Employment_Status_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employment_Status_Secondary_1__c; 
                childEmploymentHistoryObj2.CTP_Employer_Company_Name_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_Company_Name_Secondary_1__c ;
                childEmploymentHistoryObj2.CTP_Occupation_Primary__c = claimApplicationWrapper.contactRecord.CTP_Occupation_Secondary_1__c ;
                childEmploymentHistoryObj2.CTP_Away_From_Primary__c = claimApplicationWrapper.contactRecord.CTP_Away_From_Secondary_1__c ;
                childEmploymentHistoryObj2.CTP_Away_Until_Primary__c = claimApplicationWrapper.contactRecord.CTP_Away_Until_Secondary_1__c ;
                childEmploymentHistoryObj2.CTP_Currently_away_from_work_Primary__c = claimApplicationWrapper.contactRecord.CTP_Currently_away_from_work_Secondary_1__c;
                childEmploymentHistoryObj2.CTP_Length_of_time_off_work_Primary__c = claimApplicationWrapper.contactRecord.CTP_Length_of_time_off_work_Secondary_1__c;
                childEmploymentHistoryObj2.CTP_Earning_at_time_of_Accident_Primary__c = claimApplicationWrapper.contactRecord.CTP_Earning_at_time_of_Accident_Sec1__c; 
                if (claimApplicationWrapper.contactRecord.CTP_Payment_Period_Primary__c != undefined && claimApplicationWrapper.contactRecord.CTP_Payment_Period_Secondary_1__c != '--Select Earning Period--'){
    				childEmploymentHistoryObj2.CTP_Payment_Period_Primary__c = claimApplicationWrapper.contactRecord.CTP_Payment_Period_Secondary_1__c;
            	}
                childEmploymentHistoryObj2.CTP_Obtain_wages_from_Employer_Primary__c = claimApplicationWrapper.contactRecord.CTP_Obtain_wages_from_Employer_Sec_1__c ;
                childEmploymentHistoryObj2.CTP_Employer_first_name_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_first_name_Secondary_1__c ;
                childEmploymentHistoryObj2.CTP_Employer_last_name_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_last_name_Secondary_1__c ;
                childEmploymentHistoryObj2.CTP_Employer_Phone_Number_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_Phone_Num_Area_Code_Sec_1__c;
                childEmploymentHistoryObj2.CTP_Employer_email_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_email_Secondary_1__c; 
                childEmploymentHistoryObj2.CTP_Employer_Postcode_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_Postcode_Secondary_1__c;
                childEmploymentHistoryObj2.CTP_Employer_Street_Number_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_Street_Number_Secondary_1__c	;
                childEmploymentHistoryObj2.CTP_Employer_Unit_Number_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_Unit_Number_Secondary_1__c	;
                childEmploymentHistoryObj2.CTP_Employer_Street_Name_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_Street_Name_Secondary_1__c	;
                childEmploymentHistoryObj2.CTP_Employer_Suburb_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_Suburb_Secondary_1__c;
                childEmploymentHistoryObj2.CTP_Employer_State_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_State_Secondary_1__c	;
 
                console.log("childEmploymentHistoryObj2 :" + childEmploymentHistoryObj2);
    			employmentHistory.push(childEmploymentHistoryObj2);
                console.log("inside >=2 for employmentHistory END");
            }
            if (claimApplicationWrapper.claimRecord.CTP_Employment_History_Length__c >=3){
                console.log("inside >=3 for employmentHistory Start");
                var childEmploymentHistoryObj3 = new Object();
    			childEmploymentHistoryObj3.CTP_Employee_or_Self_employed_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employee_or_Self_employed_Secondary2__c;
                //claimApplicationWrapper.contactRecord.LastName = 'Test';
                childEmploymentHistoryObj3.CTP_Employment_Status_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employment_Status_Secondary_2__c; 
                childEmploymentHistoryObj3.CTP_Employer_Company_Name_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_Company_Name_Secondary_2__c ;
                childEmploymentHistoryObj3.CTP_Occupation_Primary__c = claimApplicationWrapper.contactRecord.CTP_Occupation_Secondary_2__c ;
                childEmploymentHistoryObj3.CTP_Away_From_Primary__c = claimApplicationWrapper.contactRecord.CTP_Away_From_Secondary_2__c ;
                childEmploymentHistoryObj3.CTP_Away_Until_Primary__c = claimApplicationWrapper.contactRecord.CTP_Away_Until_Secondary_2__c ;
                childEmploymentHistoryObj3.CTP_Currently_away_from_work_Primary__c = claimApplicationWrapper.contactRecord.CTP_Currently_away_from_work_Secondary_2__c;
                childEmploymentHistoryObj3.CTP_Length_of_time_off_work_Primary__c = claimApplicationWrapper.contactRecord.CTP_Length_of_time_off_work_Secondary_2__c;
                childEmploymentHistoryObj3.CTP_Earning_at_time_of_Accident_Primary__c = claimApplicationWrapper.contactRecord.CTP_Earning_at_time_of_Accident_Sec2__c; 
                if (claimApplicationWrapper.contactRecord.CTP_Payment_Period_Primary__c != undefined && claimApplicationWrapper.contactRecord.CTP_Payment_Period_Secondary_2__c != '--Select Earning Period--'){
    				childEmploymentHistoryObj3.CTP_Payment_Period_Primary__c = claimApplicationWrapper.contactRecord.CTP_Payment_Period_Secondary_2__c;
            	}
                childEmploymentHistoryObj3.CTP_Obtain_wages_from_Employer_Primary__c = claimApplicationWrapper.contactRecord.CTP_Obtain_wages_from_Employer_Sec_2__c ;
                childEmploymentHistoryObj3.CTP_Employer_first_name_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_first_name_Secondary_2__c ;
                childEmploymentHistoryObj3.CTP_Employer_last_name_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_last_name_Secondary_2__c ;
                childEmploymentHistoryObj3.CTP_Employer_Phone_Number_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_Phone_Num_Area_Code_Sec_2__c;
                childEmploymentHistoryObj3.CTP_Employer_email_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_email_Secondary_2__c; 
                childEmploymentHistoryObj3.CTP_Employer_Postcode_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_Postcode_Secondary_2__c;
                childEmploymentHistoryObj3.CTP_Employer_Street_Number_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_Street_Number_Secondary_2__c	;
                childEmploymentHistoryObj3.CTP_Employer_Unit_Number_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_Unit_Number_Secondary_2__c	;
                childEmploymentHistoryObj3.CTP_Employer_Street_Name_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_Street_Name_Secondary_2__c	;
                childEmploymentHistoryObj3.CTP_Employer_Suburb_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_Suburb_Secondary_2__c;
                childEmploymentHistoryObj3.CTP_Employer_State_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_State_Secondary_2__c	;
 
                console.log("childEmploymentHistoryObj3 :" + childEmploymentHistoryObj3);
    			employmentHistory.push(childEmploymentHistoryObj3);
                console.log("inside >=3 for employmentHistory END");

            }
            if (claimApplicationWrapper.claimRecord.CTP_Employment_History_Length__c >=4){
                console.log("inside >=4 for employmentHistory Start");
                var childEmploymentHistoryObj4 = new Object();
    			childEmploymentHistoryObj4.CTP_Employee_or_Self_employed_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employee_or_Self_employed_Secondary3__c;
                //claimApplicationWrapper.contactRecord.LastName = 'Test';
                childEmploymentHistoryObj4.CTP_Employment_Status_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employment_Status_Secondary_3__c; 
                childEmploymentHistoryObj4.CTP_Employer_Company_Name_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_Company_Name_Secondary_3__c ;
                childEmploymentHistoryObj4.CTP_Occupation_Primary__c = claimApplicationWrapper.contactRecord.CTP_Occupation_Secondary_3__c ;
                childEmploymentHistoryObj4.CTP_Away_From_Primary__c = claimApplicationWrapper.contactRecord.CTP_Away_From_Secondary_3__c ;
                childEmploymentHistoryObj4.CTP_Away_Until_Primary__c = claimApplicationWrapper.contactRecord.CTP_Away_Until_Secondary_3__c ;
                childEmploymentHistoryObj4.CTP_Currently_away_from_work_Primary__c = claimApplicationWrapper.contactRecord.CTP_Currently_away_from_work_Secondary_3__c;
                childEmploymentHistoryObj4.CTP_Length_of_time_off_work_Primary__c = claimApplicationWrapper.contactRecord.CTP_Length_of_time_off_work_Secondary_3__c;
                childEmploymentHistoryObj4.CTP_Earning_at_time_of_Accident_Primary__c = claimApplicationWrapper.contactRecord.CTP_Earning_at_time_of_Accident_Sec3__c; 
                if (claimApplicationWrapper.contactRecord.CTP_Payment_Period_Primary__c != undefined && claimApplicationWrapper.contactRecord.CTP_Payment_Period_Secondary_3__c != '--Select Earning Period--'){
    				childEmploymentHistoryObj4.CTP_Payment_Period_Primary__c = claimApplicationWrapper.contactRecord.CTP_Payment_Period_Secondary_3__c;
            	}
                childEmploymentHistoryObj4.CTP_Obtain_wages_from_Employer_Primary__c = claimApplicationWrapper.contactRecord.CTP_Obtain_wages_from_Employer_Sec_3__c ;
                childEmploymentHistoryObj4.CTP_Employer_first_name_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_first_name_Secondary_3__c ;
                childEmploymentHistoryObj4.CTP_Employer_last_name_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_last_name_Secondary_3__c ;
                childEmploymentHistoryObj4.CTP_Employer_Phone_Number_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_Phone_Num_Area_Code_Sec_3__c;
                childEmploymentHistoryObj4.CTP_Employer_email_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_email_Secondary_3__c; 
                childEmploymentHistoryObj4.CTP_Employer_Postcode_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_Postcode_Secondary_3__c;
                childEmploymentHistoryObj4.CTP_Employer_Street_Number_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_Street_Number_Secondary_3__c	;
                childEmploymentHistoryObj4.CTP_Employer_Unit_Number_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_Unit_Number_Secondary_3__c	;
                childEmploymentHistoryObj4.CTP_Employer_Street_Name_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_Street_Name_Secondary_3__c	;
                childEmploymentHistoryObj4.CTP_Employer_Suburb_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_Suburb_Secondary_3__c;
                childEmploymentHistoryObj4.CTP_Employer_State_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_State_Secondary_3__c	;
 
                console.log("childEmploymentHistoryObj4 :" + childEmploymentHistoryObj4);
    			employmentHistory.push(childEmploymentHistoryObj4);
				console.log("inside >=4 for employmentHistory END");
            }
            if (claimApplicationWrapper.claimRecord.CTP_Employment_History_Length__c >=5){
                console.log("inside >=5 for employmentHistory Start");
                var childEmploymentHistoryObj5 = new Object();
    			childEmploymentHistoryObj5.CTP_Employee_or_Self_employed_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employee_or_Self_employed_Secondary4__c;
                //claimApplicationWrapper.contactRecord.LastName = 'Test';
                childEmploymentHistoryObj5.CTP_Employment_Status_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employment_Status_Secondary_4__c; 
                childEmploymentHistoryObj5.CTP_Employer_Company_Name_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_Company_Name_Secondary_4__c ;
                childEmploymentHistoryObj5.CTP_Occupation_Primary__c = claimApplicationWrapper.contactRecord.CTP_Occupation_Secondary_4__c ;
                childEmploymentHistoryObj5.CTP_Away_From_Primary__c = claimApplicationWrapper.contactRecord.CTP_Away_From_Secondary_4__c ;
                childEmploymentHistoryObj5.CTP_Away_Until_Primary__c = claimApplicationWrapper.contactRecord.CTP_Away_Until_Secondary_4__c ;
                childEmploymentHistoryObj5.CTP_Currently_away_from_work_Primary__c = claimApplicationWrapper.contactRecord.CTP_Currently_away_from_work_Secondary_4__c;
                childEmploymentHistoryObj5.CTP_Length_of_time_off_work_Primary__c = claimApplicationWrapper.contactRecord.CTP_Length_of_time_off_work_Secondary_4__c;
                childEmploymentHistoryObj5.CTP_Earning_at_time_of_Accident_Primary__c = claimApplicationWrapper.contactRecord.CTP_Earning_at_time_of_Accident_Sec4__c; 
                if (claimApplicationWrapper.contactRecord.CTP_Payment_Period_Primary__c != undefined && claimApplicationWrapper.contactRecord.CTP_Payment_Period_Secondary_4__c != '--Select Earning Period--'){
    				childEmploymentHistoryObj5.CTP_Payment_Period_Primary__c = claimApplicationWrapper.contactRecord.CTP_Payment_Period_Secondary_4__c;
            	}
                childEmploymentHistoryObj5.CTP_Obtain_wages_from_Employer_Primary__c = claimApplicationWrapper.contactRecord.CTP_Obtain_wages_from_Employer_Sec_4__c ;
                childEmploymentHistoryObj5.CTP_Employer_first_name_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_first_name_Secondary_4__c ;
                childEmploymentHistoryObj5.CTP_Employer_last_name_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_last_name_Secondary_4__c ;
                childEmploymentHistoryObj5.CTP_Employer_Phone_Number_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_Phone_Num_Area_Code_Sec_4__c;
                childEmploymentHistoryObj5.CTP_Employer_email_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_email_Secondary_4__c; 
                childEmploymentHistoryObj5.CTP_Employer_Postcode_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_Postcode_Secondary_4__c;
                childEmploymentHistoryObj5.CTP_Employer_Street_Number_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_Street_Number_Secondary_4__c	;
                childEmploymentHistoryObj5.CTP_Employer_Unit_Number_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_Unit_Number_Secondary_4__c	;
                childEmploymentHistoryObj5.CTP_Employer_Street_Name_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_Street_Name_Secondary_4__c	;
                childEmploymentHistoryObj5.CTP_Employer_Suburb_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_Suburb_Secondary_4__c;
                childEmploymentHistoryObj5.CTP_Employer_State_Primary__c = claimApplicationWrapper.contactRecord.CTP_Employer_State_Secondary_4__c	;
 
                console.log("childEmploymentHistoryObj5 :" + childEmploymentHistoryObj5);
    			employmentHistory.push(childEmploymentHistoryObj5);
				console.log("inside >=5 for employmentHistory END");

            }
            console.log("Before putting Child History");
            component.set("v.employerHistory",employmentHistory);
            console.log("After putting Child History");
    
	},
    
    initEditDraftForStep3:function(component, helper,claimApplicationWrapper){
        console.log("inside initEditDraftForStep3");
        console.log("CTP_Ambulance_Used__c :",claimApplicationWrapper.claimRecord.CTP_Ambulance_Used__c);
        
        if (claimApplicationWrapper.claimRecord.CTP_Ambulance_Used__c  != undefined && claimApplicationWrapper.claimRecord.CTP_Ambulance_Used__c  != "No")
        {
            console.log("inside CTP_Ambulance_Used__c check Yes");
            //component.set("v.takenToHospitalInAmbulance", "Yes");//Commented for 5016
            component.set("v.DisplayAmbulancePickList", true);
        }else if (claimApplicationWrapper.claimRecord.CTP_Ambulance_Used__c  != undefined){
            console.log("inside CTP_Ambulance_Used__c check No");
            //component.set("v.takenToHospitalInAmbulance", "No");////Commented for 5016
            component.set("v.DisplayAmbulancePickList", false);
        }
        console.log("CTP_Treatment_Rec_At_Hosp_Post_Accident__c :",claimApplicationWrapper.claimRecord.CTP_Treatment_Rec_At_Hosp_Post_Accident__c);
        if(claimApplicationWrapper.claimRecord.CTP_Treatment_Rec_At_Hosp_Post_Accident__c != undefined && claimApplicationWrapper.claimRecord.CTP_Treatment_Rec_At_Hosp_Post_Accident__c   != "No")
        {
            console.log("inside CTP_Treatment_Rec_At_Hosp_Post_Accident__c check Yes");
            component.set("v.CTP_Treatment_Rec_At_Hosp_Post_Accident__c", claimApplicationWrapper.claimRecord.CTP_Treatment_Rec_At_Hosp_Post_Accident__c);
            component.set("v.DisplayReceivedTreatmentForm",true);
        }else{
            console.log("inside CTP_Treatment_Rec_At_Hosp_Post_Accident__c check No");
            component.set("v.CTP_Treatment_Rec_At_Hosp_Post_Accident__c","No");
            component.set("v.DisplayReceivedTreatmentForm",false);
        }
        
        console.log("CTP_Discharged_From_Hospital__c :", claimApplicationWrapper.claimRecord.CTP_Discharged_From_Hospital__c);
        if ( claimApplicationWrapper.claimRecord.CTP_Discharged_From_Hospital__c != undefined ) {
        	component.set("v.dischargedFromHospitalYesNo",claimApplicationWrapper.claimRecord.CTP_Discharged_From_Hospital__c);
        }
        //Date: 06-Mar-18: Edit Draft:Upendra
        console.log('>> prev Injury>>> '+claimApplicationWrapper.claimRecord.CTP_Previous_Illness_or_Injury__c);
        if(claimApplicationWrapper.claimRecord.CTP_Previous_Illness_or_Injury__c != undefined){
            component.set("v.previousIllnessInjuryYesNo", claimApplicationWrapper.claimRecord.CTP_Previous_Illness_or_Injury__c);
        }
    },
    
    initEditDraftForStep2:function(component, helper,claimApplicationWrapper){
        console.log("inside initEditDraftForStep2...");
        component.set("v.vehicles",claimApplicationWrapper.vehicleRecords);
        if ( claimApplicationWrapper.claimRecord.CTP_Vehicles_Involved_Are_Known__c == "Yes"){
            console.log(" Inside CTP_Vehicles_Involved_Are_Known__c is Yes");
            component.set("v.displayVehicleForm", true);
            console.log("Before Calling loadVehicleRegs");
            component.set("v.mostAtFaultVehicleOpt",claimApplicationWrapper.claimRecord.CTP_Most_at_Fault_Vehicle_Known__c);
            //this.loadVehicleRegs(component, event, helper);
            var vehicles = component.get("v.vehicles");
            var regs=[];
            for (var i=0;i<vehicles.length;i++){
                console.log("inside vehicle for loop");
                if(vehicles[i].CTP_Registration_Number__c != null && vehicles[i].CTP_Registration_Number__c != ''){
                    
                    regs.push({
                        class: "optionClass",
                        label: vehicles[i].CTP_Registration_Number__c,
                        value: vehicles[i].CTP_Registration_Number__c
                    });
                }
            }
            
        	component.set("v.vehicleRegistrations", regs);
            component.set("v.registrationNo", claimApplicationWrapper.claimRecord.CTP_Most_at_fault_Vehicle_Registration__c);
            console.log("Registration No ", component.get("v.registrationNo"));
            console.log("Before Calling displayFaultVehicleWarningHelper");
            this.displayFaultVehicleWarningHelper(component, helper, claimApplicationWrapper.claimRecord.CTP_Most_at_Fault_Vehicle_Known__c );
            if ( claimApplicationWrapper.claimRecord.CTP_Most_At_Fault_Vehicle_Confirmed__c != undefined &&
                claimApplicationWrapper.claimRecord.CTP_Most_At_Fault_Vehicle_Confirmed__c == "Yes"){
                component.set("v.vehicleFoundPIE",true);
            }
        }

    },
    
    initEditDraftForStep1:function(component, helper, claimApplicationWrapper){
        console.log("Claim For you" + claimApplicationWrapper.claimRecord.CTP_Submitter_Is_Claimant__c);
        // setting the claim on behalf attribute
        if ( claimApplicationWrapper.claimRecord.CTP_Submitter_Is_Claimant__c  === 'Yes'){
            component.set("v.isClaimForYou", true);
        }else{
            component.set("v.isClaimForYou", false);
            // component.set("repInsurerContactNumber", claimApplicationWrapper.userRecord.)
        }
        // setting isClaimNoExits
        component.set("v.isClaimNoExits", true);
        
        if(claimApplicationWrapper.userRecord.CTP_Gender__c=='Male'){
            helper.fetchPickListVal(component, 'User', 'CTP_Gender__c', 'v.maleB', null);
        }else if(claimApplicationWrapper.userRecord.CTP_Gender__c=='Female'){
            helper.fetchPickListVal(component, 'User', 'CTP_Gender__c', 'v.femaleB', null);
        }else if(claimApplicationWrapper.userRecord.CTP_Gender__c=='Other'){
            helper.fetchPickListVal(component, 'User', 'CTP_Gender__c', 'v.otherB', null);
        }
        helper.fetchPickListVal(component, 'Case', 'CTP_Preferred_Contact_time__c', 'preferredTime', null);
        helper.fetchPickListVal(component, 'Case', 'CTP_Language__c', 'languageOpts', null);
        
        // Date 06-Mar-18: Edit Draft: Upendra
        helper.fetchPickListVal(component, 'CTP_Claim__c', 'CTP_Driver_license_state__c', 'driverLicenseState', null);
        
        if (claimApplicationWrapper.claimRecord.CTP_Payment_Method__c != undefined && claimApplicationWrapper.claimRecord.CTP_Payment_Method__c != null ){
            component.set("v.isCheque",claimApplicationWrapper.claimRecord.CTP_Payment_Method__c);
           	component.set("v.displayPaymentSection", true);
        }
        if(claimApplicationWrapper.caseRecord.CTP_Preferred_Email_Address__c != undefined &&  claimApplicationWrapper.caseRecord.CTP_Preferred_Email_Address__c == 'Alternative Email'){
            component.set('v.alternateEmailChk', "Alternative Email");
        }else{
            component.set('v.alternateEmailChk', "Login Email");
        }
        
        // Date 09-Mar-18: UAT Blocker: OnBehalf Edit Draft Starts: Upendra
        helper.fetchPickListVal(component, 'Case', 'CTP_Submitter_Type__c', 'relationshipToClaimant', null);
        console.log('>>> Relationshi>>> '+claimApplicationWrapper.caseRecord.CTP_Submitter_Type__c);
        if(claimApplicationWrapper.caseRecord.CTP_Submitter_Type__c != undefined){
            component.set("v.relationshipToClaimant", claimApplicationWrapper.caseRecord.CTP_Submitter_Type__c);
        }
        console.log('>>> Reason >>> '+claimApplicationWrapper.caseRecord.CTP_Reason_Submitting__c);
        if(claimApplicationWrapper.caseRecord.CTP_Reason_Submitting__c != undefined){
            component.set("v.reasonOnBehalf", claimApplicationWrapper.caseRecord.CTP_Reason_Submitting__c);
        }
        console.log('>>> Previous Claim >>> '+claimApplicationWrapper.claimRecord.Previous_CTP_Claim__c);
        if ( claimApplicationWrapper.claimRecord.Previous_CTP_Claim__c == 'Yes'){
            component.set("v.hasClaim", 'Yes');
            //component.set("v.displayClaimForm", 'Yes');
        }
      
        if(claimApplicationWrapper.claimRecord.CTP_Driver_license_state__c != undefined){
            component.set("v.driverLicenseState", claimApplicationWrapper.claimRecord.CTP_Driver_license_state__c);
        }
        console.log('>> Nominated Rep>> '+claimApplicationWrapper.claimRecord.CTP_Nominated_representative_required__c);
        if(claimApplicationWrapper.claimRecord.CTP_Nominated_representative_required__c == "Yes"){
        	component.set("v.displayRepresentativeOnBehalfForm", "Yes");
        }if(claimApplicationWrapper.caseRecord.CTP_Submitter_is_a_nominated_rep__c == 'Yes'){
           // component.set("v.isRepresentative", "Yes");
            this.fetchPickListVal(component, 'Case', 'CTP_Rep_Preferred_Contact_Time__c', 'repPreferredTime', null);
            
        }else{
            if(claimApplicationWrapper.representativeRecord.FirstName != undefined){
                this.fetchPickListVal(component, 'Case', 'CTP_Rep_Type__c', 'representativeType', null);
                component.set("v.repOtherFirstName",claimApplicationWrapper.representativeRecord.FirstName);
            }
        }
        if(claimApplicationWrapper.caseRecord.CTP_Correspondence__c != undefined){
           component.set("v.correspondence",claimApplicationWrapper.caseRecord.CTP_Correspondence__c);
        }
        this.initializePreviousCliams(component,helper,claimApplicationWrapper);
        
        
        this.assignFunction(component, event, helper);
        var timeOfAccident = claimApplicationWrapper.claimRecord.CTP_Time_Of_Accident__c;
        console.log("Time from Wrapper ", claimApplicationWrapper.claimRecord.CTP_Time_Of_Accident__c);
        if ( timeOfAccident != undefined && timeOfAccident !="" && timeOfAccident.length == 4 ){
            var accidentHour = timeOfAccident.substr(0,2);
            var accidentMinute = timeOfAccident.substr(2,2);
            var accidentTime = "AM";
            if (Number(accidentHour) > 12 ){
                // 5016 (24Feb18) - transforming the 24 hour to 12 hour  
                accidentHour = accidentHour - 12;
                accidentTime = "PM";
            }
            component.set("v.accidentHour",Number(accidentHour));
            console.log("accidentHour", accidentHour);
            component.set("v.accidentMinute",Number(accidentMinute));
            console.log("accidentMinute", accidentMinute);
            component.set("v.accidentTime",accidentTime);
        }
        
        this.displayTime(component, event, helper);
        console.log("After DisplayTime Called");
        
        // DCR-5016 - 24th Feb
        console.log('CTP_Accident_Co_Ordinates__c>>> '+claimApplicationWrapper.claimRecord.CTP_Accident_Co_Ordinates__c);
        if(claimApplicationWrapper.claimRecord.CTP_Accident_Co_Ordinates__c != undefined && claimApplicationWrapper.claimRecord.CTP_Accident_Co_Ordinates__c != null){
            var latLang = claimApplicationWrapper.claimRecord.CTP_Accident_Co_Ordinates__c;
            latLang = latLang.replace(" ", ",");
            console.log('> >>> latLang>>> '+latLang);
        	this.getAddressFromLatLng(component, latLang);
        }
    },
    
    initializePreviousCliams:function(component,helper,claimApplicationWrapper){
        console.log("Previous_CTP_Claim__c:  ", claimApplicationWrapper.claimRecord.Previous_CTP_Claim__c);
        // setting up claim history
        if ( claimApplicationWrapper.claimRecord.Previous_CTP_Claim__c == 'Yes'){
            component.set("v.displayClaimForm", 'Yes');
            console.log("displayClaimForm", component.get("v.displayClaimForm"));
            helper.fetchPickListVal(component, 'CTP_Claim__c', 'CTP_Previous_Insurer_1__c', 'v.previousInsurerValues', ['Select Insurer']);
            var childClaimHistory= [];
           // var childClaimHistoryObj = new Object();
            if (claimApplicationWrapper.claimRecord.CTP_ClaimHistoryLength__c >= 1){
                console.log("inside >=1 for childClaimHistory START");
                var childClaimHistoryObj1 = new Object();
                console.log("year 1",claimApplicationWrapper.claimRecord.CTP_Year_of_Injury_1__c);
                console.log("Month 1",claimApplicationWrapper.claimRecord.CTP_Month_of_Injury_1__c);
                console.log("Previous Insurer", claimApplicationWrapper.claimRecord.CTP_Previous_Insurer_1__c);
                childClaimHistoryObj1.CTP_Previous_Insurer_1__c = claimApplicationWrapper.claimRecord.CTP_Previous_Insurer_1__c;
                childClaimHistoryObj1.CTP_Previous_Claim_Number_1__c = claimApplicationWrapper.claimRecord.CTP_Previous_Claim_Number_1__c; 
                childClaimHistoryObj1.CTP_Month_of_Injury_1__c = claimApplicationWrapper.claimRecord.CTP_Month_of_Injury_1__c;
                childClaimHistoryObj1.CTP_Year_of_Injury_1__c =  claimApplicationWrapper.claimRecord.CTP_Year_of_Injury_1__c ;
                childClaimHistoryObj1.CTP_Previous_CTP_Insurer_Other_1__c = claimApplicationWrapper.claimRecord.CTP_Previous_CTP_Insurer_Other_1__c;
                childClaimHistory.push(childClaimHistoryObj1); 
                console.log("ChildClaimHistory Obj :" + childClaimHistoryObj1);
                console.log("inside >=1 for childClaimHistory END");
            }
            if (claimApplicationWrapper.claimRecord.CTP_ClaimHistoryLength__c >=2){
                console.log("inside >=2 for childClaimHistory START");
                var childClaimHistoryObj2 = new Object();
                childClaimHistoryObj2.CTP_Previous_Insurer_1__c = claimApplicationWrapper.claimRecord.CTP_Previous_Insurer_2__c;
                childClaimHistoryObj2.CTP_Previous_Claim_Number_1__c = claimApplicationWrapper.claimRecord.CTP_Previous_Claim_Number_2__c; 
                childClaimHistoryObj2.CTP_Month_of_Injury_1__c = claimApplicationWrapper.claimRecord.CTP_Month_of_Injury_2__c;
                childClaimHistoryObj2.CTP_Year_of_Injury_1__c =  claimApplicationWrapper.claimRecord.CTP_Year_of_Injury_2__c ;
                childClaimHistoryObj2.CTP_Previous_CTP_Insurer_Other_1__c = claimApplicationWrapper.claimRecord.CTP_Previous_CTP_Insurer_Other_2__c;
                childClaimHistory.push(childClaimHistoryObj2);
                console.log("ChildClaimHistory Obj :" + childClaimHistoryObj2);
                console.log("inside >=2 for childClaimHistory END");
            }
            if (claimApplicationWrapper.claimRecord.CTP_ClaimHistoryLength__c >=3){
                console.log("inside >=3 for childClaimHistory START");
                var childClaimHistoryObj3 = new Object();
                childClaimHistoryObj3.CTP_Previous_Insurer_1__c = claimApplicationWrapper.claimRecord.CTP_Previous_Insurer_3__c;
                childClaimHistoryObj3.CTP_Previous_Claim_Number_1__c = claimApplicationWrapper.claimRecord.CTP_Previous_Claim_Number_3__c; 
                childClaimHistoryObj3.CTP_Month_of_Injury_1__c = claimApplicationWrapper.claimRecord.CTP_Month_of_Injury_3__c;
                childClaimHistoryObj3.CTP_Year_of_Injury_1__c =  claimApplicationWrapper.claimRecord.CTP_Year_of_Injury_3__c ;
                childClaimHistoryObj3.CTP_Previous_CTP_Insurer_Other_1__c = claimApplicationWrapper.claimRecord.CTP_Previous_CTP_Insurer_Other_3__c;
                childClaimHistory.push(childClaimHistoryObj3);
                console.log("inside >=3 for childClaimHistory END");
            }
            if (claimApplicationWrapper.claimRecord.CTP_ClaimHistoryLength__c >=4){
                console.log("inside >=4 for childClaimHistory START");
                childClaimHistoryObj = new Object();
                childClaimHistoryObj.CTP_Previous_Insurer_1__c = claimApplicationWrapper.claimRecord.CTP_Previous_Insurer_4__c;
                childClaimHistoryObj.CTP_Previous_Claim_Number_1__c = claimApplicationWrapper.claimRecord.CTP_Previous_Claim_Number_4__c; 
                childClaimHistoryObj.CTP_Month_of_Injury_1__c = claimApplicationWrapper.claimRecord.CTP_Month_of_Injury_4__c;
                childClaimHistoryObj.CTP_Year_of_Injury_1__c =  claimApplicationWrapper.claimRecord.CTP_Year_of_Injury_4__c ;
                childClaimHistoryObj.CTP_Previous_CTP_Insurer_Other_1__c = claimApplicationWrapper.claimRecord.CTP_Previous_CTP_Insurer_Other_4__c;
                childClaimHistory.push(childClaimHistoryObj); 
                console.log("inside >=4 for childClaimHistory END");
            }
            if (claimApplicationWrapper.claimRecord.CTP_ClaimHistoryLength__c >=5){
                console.log("inside >=5 for childClaimHistory START");
                childClaimHistoryObj = new Object();
                childClaimHistoryObj.CTP_Previous_Insurer_1__c = claimApplicationWrapper.claimRecord.CTP_Previous_Insurer_5__c;
                childClaimHistoryObj.CTP_Previous_Claim_Number_1__c = claimApplicationWrapper.claimRecord.CTP_Previous_Claim_Number_5__c; 
                childClaimHistoryObj.CTP_Month_of_Injury_1__c = claimApplicationWrapper.claimRecord.CTP_Month_of_Injury_5__c;
                childClaimHistoryObj.CTP_Year_of_Injury_1__c =  claimApplicationWrapper.claimRecord.CTP_Year_of_Injury_5__c ;
                childClaimHistoryObj.CTP_Previous_CTP_Insurer_Other_1__c = claimApplicationWrapper.claimRecord.CTP_Previous_CTP_Insurer_Other_5__c;
                childClaimHistory.push(childClaimHistoryObj);
                console.log("inside >=5 for childClaimHistory END");
            }
            console.log("Before putting Child History");
            component.set("v.childClaimHistory",childClaimHistory);
            console.log("After putting Child History");
        }
        
    },
    
    displayFaultVehicleWarningHelper:function(component, helper, mostAtFaultVehicle){
        if(mostAtFaultVehicle == "Yes"){
            component.set('v.mostAtFaultVehicleYes', true);
            component.set('v.mostAtFaultVehicleUnsure', false);
            var registeredVehiclesList = component.get('v.vehicleRegistrations');
            console.log("registeredVehiclesList: " + registeredVehiclesList + "length: " + registeredVehiclesList.length);
    
            if(registeredVehiclesList.length == 0){
                component.set('v.vehicleRegistrationNotFound', true);
                component.set('v.vehicleRegistrationFound', false);
            }else{
                component.set('v.vehicleRegistrationNotFound', false);
                component.set('v.vehicleRegistrationFound', true);
                //this.loadVehicleRegs(component, event, helper);
            }
        }
        if(mostAtFaultVehicle == "Still being determined"){
            component.set('v.mostAtFaultVehicleYes', false);
            component.set('v.mostAtFaultVehicleUnsure', true);
            var mostAtFaultVehicleUnsure = component.find("mostAtFaultVehicleUnsure");
            $A.util.removeClass(mostAtFaultVehicleUnsure, 'unsure');
        }
        if(mostAtFaultVehicle == "I am unsure"){
            component.set('v.mostAtFaultVehicleYes', false);
            component.set('v.mostAtFaultVehicleUnsure', true);
            var mostAtFaultVehicleUnsure = component.find("mostAtFaultVehicleUnsure");
            $A.util.addClass(mostAtFaultVehicleUnsure, 'unsure');
        }
    },
    
    //call google for selected place
    //DCR-5016 - 24th Feb
    getAddressFromLatLng : function(component, latlng){
        console.log('inside getAddressFromLatLng latlng>>> '+latlng);

        var action = component.get("c.getAddressFromLatLng");
        action.setParams({
            "latlng" : latlng,
        });
        action.setCallback(this,function(response){
           var state = response.getState();
            console.log("state while fetching place details",state);
            if(state === "SUCCESS"){
                console.log("place details are==>");
                console.log(response.getReturnValue());
                 var placeDetails = JSON.parse(response.getReturnValue());
                console.log('geolemtry coordinates');
  
                this.handleResponseForLatLng(component,response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    
    //DCR-5016 - 24th Feb
    handleResponseForLatLng : function(component, response){
        console.log('response handled');
        var placeDetails = JSON.parse(response);
        //component.set("v.latitude",placeDetails.result.geometry.location.lat);
        //component.set("v.longitude",placeDetails.result.geometry.location.lng);

        console.log('>> placeDetails>>> '+placeDetails.results[0].formatted_address);
        if(placeDetails.results != undefined && placeDetails.results[0].formatted_address != undefined){
            console.log('>> inside if placeDetails>>> '+placeDetails.results[0].formatted_address);
        	component.set("v.selectedLoc",placeDetails.results[0].formatted_address);
        }
    },
    
    //Date 06-Mar-2018: Edit Draft: Upendra
    getManualAddressDetails: function(component, helper,claimApplicationWrapper){
        var manualAccidentDetail = component.get("v.isDisplayManualAccidentAddress");
        console.log('before if of manual address>>'+manualAccidentDetail);
        console.log('before if of manual address>>'+claimApplicationWrapper.claimRecord.CTP_Accident_Co_Ordinates__c);
        if(claimApplicationWrapper.claimRecord.CTP_Accident_Co_Ordinates__c == "0.0"){
            component.set("v.isDisplayManualAccidentAddress", true);
            console.log('Inside if of manual address>>'+component.get("v.isDisplayManualAccidentAddress"));
            if(claimApplicationWrapper.claimRecord.CTP_Accident_Street__c != undefined){
            	component.set("v.accStreetAddress",claimApplicationWrapper.claimRecord.CTP_Accident_Street__c);  
            }if(claimApplicationWrapper.claimRecord.CTP_Accident_Suburb__c!=undefined){
                component.set("v.accSuburb",claimApplicationWrapper.claimRecord.CTP_Accident_Suburb__c);
            }if(claimApplicationWrapper.claimRecord.CTP_Accident_State__c!=undefined){
                component.set("v.accState",claimApplicationWrapper.claimRecord.CTP_Accident_State__c);
            }if(claimApplicationWrapper.claimRecord.CTP_Accident_Postcode__c!=undefined){
                component.set("v.accPostcode",claimApplicationWrapper.claimRecord.CTP_Accident_Postcode__c);
            }
        }
    },
    
    //Date: 07-Mar-2018: edit Draft: Vehicle Details:Upendra
    getVehicleDetails: function(component, helper, claimApplicationWrapper){
           var vehicleDetailList= [];
        	console.log('>>> vehicle details called');
        if (claimApplicationWrapper.vehicleRecords.length >0){
            console.log('>>> vehicle length>> '+claimApplicationWrapper.vehicleRecords.length);
            console.log('>>> vehicle details>> '+claimApplicationWrapper.vehicleRecords);
            var vehicleObj = new Object();
            for(var i=0; i<claimApplicationWrapper.vehicleRecords.length; i++){
                if(claimApplicationWrapper.claimRecord.CTP_Most_at_fault_Vehicle_Registration__c == claimApplicationWrapper.vehicleRecords[i].CTP_Registration_Number__c){
                	component.set("v.respObj", claimApplicationWrapper.vehicleRecords[i]);
                    console.log('>> registration number matched>>> ');
                    break;
                } 
            }
        }
    },
    
    //DCR-5939 - Fetch Dynamic Language Values for CTP Claim Application.
    getDynmLangValues : function(component, event, helper){
        console.log('inside getDynmLangValues');
        var action = component.get("c.getDynmLangVals");
        action.setCallback(this,function(response){
            var state = response.getState();
            console.log('>>getDynmLang state->>'+ state);
            if(state === "SUCCESS"){
                var allLangVals = response.getReturnValue();
                console.log('>>Inside Success->>'+ response.getReturnValue());
                if (allLangVals != undefined && allLangVals != null) {
                    component.set("v.languageOptions", allLangVals);
                }else{
                    console.log('>>No Value Returned->>'+ response.getReturnValue());
                }
            }
        });
        $A.enqueueAction(action);
    },
    scrollToTop: function(component, event, helper){
          setTimeout(function () {
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                  },300);
    },
    validateNameSelfOnbehalf: function(component, event, helper){
    	var proceedClaimApplication =  component.get("v.proceedClaimApplication");
        var isSelfSubmit = component.get("v.claimApplicationWrapper.claimRecord.CTP_Submitter_Is_Claimant__c");
        if(proceedClaimApplication){
          if(isSelfSubmit == 'Yes'){
            	helper.validateNameHelper(component, event, helper, 'claimantName');
            }else{
                helper.validateNameHelper(component, event, helper, 'claimantNameOnBehalf');
            }
        }
	},
    getAllAttachments:function(component, event, helper){
         console.log('--------------insidegetAllAttachment------------>');
    var action = component.get("c.getAttachmentsFromCaseId");
         action.setParams({
            "caseId" : component.get('v.caseRecordId'),
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            
            if(state === "SUCCESS"){
               var attachMap = response.getReturnValue();
                var attachList = [];
                console.log("maps iss",attachMap);
                for(var key in attachMap){
                    var attach = {
                        "attachment" : attachMap[key],
                        "key" : key,
                    };
                    attachList.push(attach);
                }
                
                component.set('v.attachmentList',attachList);
                
                console.log('-------------------------->',component.get('v.attachmentList'));  
            }
        });
        $A.enqueueAction(action); 
	},
    validateClaimantDob: function(component, event, helper) {
        var claimantDobStr=component.find('claimantDob').get("v.value");
        if(claimantDobStr){
            var accidentDate = helper.formatDateStr(component.get('v.claimApplicationWrapper.claimRecord.CTP_AccidentDate__c'));
            var claimantDob = helper.formatDateStr(claimantDobStr);
            var isDisplayError = claimantDob >= accidentDate;
            helper.displayErrorMessage(component, event, helper, isDisplayError, 'invalidClaimantDobErrMsg');
            return !isDisplayError;
        }
        return true;
    } 
  ,
    //Vivek start: This function is added to load picklist values based on current step. In future same can be used for go back button as well
    loadStepPickList: function(component, event, helper, step){
        switch(step){
            case 1:
                var mode = component.get("v.mode");
                if ( mode != 'Edit'){
                    this.changeStage(component, event, helper, "1");
                    var isSelfSubmit = component.get("v.claimApplicationWrapper.claimRecord.CTP_Submitter_Is_Claimant__c");
                    if(isSelfSubmit == 'Yes'){
                        helper.validateNameHelper(component, event, helper, 'claimantName');
                    }else{
                        helper.validateNameHelper(component, event, helper, 'claimantNameOnBehalf');
                        helper.fetchPickListVal(component, 'Case', 'CTP_Submitter_Type__c', 'relationshipToClaimant', ['Select your relationship to claimant']);
                    }
                }
                break;
            case 2:
                this.changeStage(component, event, helper, "2");
                helper.fetchPickListVal(component, 'Case', 'CTP_Preferred_Contact_time__c', 'preferredTime', null);
                helper.getDynmLangValues(component, event, helper);
                helper.fetchPickListVal(component, 'CTP_Claim__c', 'CTP_Accident_State__c', 'driverLicenseState', null);
                //DCR-8883   Namrata Start
               /* if(component.get("v.claimApplicationWrapper.claimRecord.CTP_Submitter_Is_Claimant__c") !='Yes'){
                    helper.fetchPickListVal(component, 'Case', 'CTP_Preferred_Contact_time__c', 'repPreferredTime', null);
                    helper.fetchPickListVal(component, 'Case', 'CTP_RepresentativeRelationship__c', 'relationshipToClaimant', ['Select your relationship to claimant']);
                }*/
                if(component.get("v.claimApplicationWrapper.claimRecord.CTP_Submitter_Is_Claimant__c") =='Yes'){
                    if(component.get("v.claimApplicationWrapper.claimRecord.CTP_Nominated_representative_required__c") =='Yes'){
                        /*DCR-8268*/helper.fetchPickListVal(component, 'Case', 'CTP_Rep_Type__c', 'representativeType', ['Select representative type']); 
                		/*DCR-8268*/helper.fetchPickListVal(component, 'Case', 'CTP_Rep_Preferred_Contact_Time__c', 'repOtherPreferredTime', null);
                    }          
                }else{
                   helper.fetchPickListVal(component, 'Case', 'CTP_Submitter_Type__c', 'relationshipToClaimant', ['Select your relationship to claimant']); 
                    if(component.get("v.claimApplicationWrapper.caseRecord.CTP_Submitter_is_a_nominated_rep__c") =='Yes'){
                        helper.fetchPickListVal(component, 'Case', 'CTP_Rep_Preferred_Contact_Time__c', 'repPreferredTime', null);
                    }else{
                         /*DCR-8268*/helper.fetchPickListVal(component, 'Case', 'CTP_Rep_Type__c', 'representativeType', ['Select representative type']); 
                		/*DCR-8268*/helper.fetchPickListVal(component, 'Case', 'CTP_Rep_Preferred_Contact_Time__c', 'repOtherPreferredTime', null);
                    }
                }
                 //DCR-8883   Namrata End
                break;
            case 3:
                this.changeStage(component, event, helper, "3");
                helper.fetchPickListVal(component, 'CTP_Claim__c', 'CTP_Accident_Role__c', 'accidentrole', ['Select role']);//DCR-5478
                helper.accidentRoleHelper(component, event, helper);
                var category = 'Accident';
                helper.getAttachments(component.get('v.caseRecordId'),component,category);
                helper.displayTime(component, event, helper);
                break;
            case 4:
                this.changeStage(component, event, helper, "3");
                var isVehicleInvolved = component.get("v.claimApplicationWrapper.claimRecord.CTP_Vehicles_Involved_Are_Known__c");
                var isMostAtFault = component.get("v.claimApplicationWrapper.claimRecord.CTP_Most_at_Fault_Vehicle_Known__c");
                var isMostAtFaultStateKnown = component.get("v.claimApplicationWrapper.claimRecord.CTP_State_Of_Registration_Known__c");
                if(isVehicleInvolved == "Yes" && isMostAtFault == "Yes" && isMostAtFaultStateKnown== "Yes"){
                    helper.fetchPickListVal(component, 'CTP_Claim__c', 'Most_at_fault_vehicle_state__c', 'registeredVehicleState', null);
                }
                
                if(isMostAtFault == "I am unsure"){
                    var mostAtFaultVehicleUnsure = component.find("mostAtFaultVehicleUnsure");
                    $A.util.addClass(mostAtFaultVehicleUnsure, 'unsure');
                }
                break;
            case 5:
                this.changeStage(component, event, helper, "4");
                var category = 'Medical';
                helper.getAttachments(component.get('v.caseRecordId'),component,category);
                helper.takenToHospitalInAmbulanceHelper(component, event, helper);
                break;
            case 6:
                this.changeStage(component, event, helper, "5");
                var category = 'Employment';
                helper.getAttachments(component.get('v.caseRecordId'),component,category);
                if(component.get("v.isDisplayAwayFromWorkForm")==true){
                    var childCmpEmp = component.find("employerHistory");
                    if(childCmpEmp instanceof Array){
                        for(var i = 0; i <= childCmpEmp.length; i++){
                            childCmpEmp[i].setEmployeeStatus();
                        }
                        
                    }else{
                        childCmpEmp.setEmployeeStatus();
                    }
                } 
                var category = 'Employment';
                helper.getSiteURL(component);
                helper.getAttachments(component.get('v.caseRecordId'),component,category);
                break;
            case 7:
                this.changeStage(component, event, helper, "6");
                var category = 'Other';
                helper.getAttachments(component.get('v.caseRecordId'),component,category);
                break;
                
        } 
    },
    changeStage: function(component, event, helper, toStage){
         var appEvent = $A.get("e.c:CTP_StartClaim_Claimstages");
        appEvent.setParams({"stage": toStage});
        appEvent.fire();
    },
    //Vivek End 
    //
      //DCR-7669 By Himani Start
    deleteAssociatedVehicles: function(component, event, helper){
        
        var claimApplicationWrapper = component.get("v.claimApplicationWrapper");
        	 var claimApplicationWrapperJSON = JSON.stringify(claimApplicationWrapper);
             //console.log('>> claimApplicationWrapperJSON>> '+JSON.stringify(claimApplicationWrapperJSON));
                var action = component.get("c.deleteAssociatedVehicles");
                action.setParams({
                    "wrapperRecord" : claimApplicationWrapperJSON,
                });
                action.setCallback(this, function(response){
                    var state = response.getState();
                    console.log('>>> inside success >>>>'+state);
                    if(state === "SUCCESS"){
                        var claimApplicationWrapper = response.getReturnValue();
                        component.set("v.claimApplicationWrapper",claimApplicationWrapper);
                        //console.log('-->>>wrapper is-->>>> '+JSON.stringify(claimApplicationWrapper));
                        //
                        //
                        component.set('v.mostAtFaultVehicleYes', false);
            			component.set('v.mostAtFaultVehicleUnsure', false);
                        component.set('v.registrationNo', '');
                        component.set('v.vehicleRegistrations',[]);
                        
                       var vehicles = component.get("v.vehicles");
                       console.log("element: " + JSON.stringify(vehicles));
                       if(vehicles.length == 1){
                         console.log('lenght 1');
                         vehicles = [{'sobjectType': 'CTP_Vehicle__c'}]; 
                        component.set("v.vehicles", vehicles);
                        }else if (vehicles.length > 1) {
                        this.ShowOneOpenVehicle(component,vehicles);
                         console.log('after----->>>');
                        }  
   
                    }
                });
                $A.enqueueAction(action);

    },
    
   ShowOneOpenVehicle : function(component,vehicles) {
        vehicles.splice((vehicles.length-1), (vehicles.length - 1));
         if (vehicles.length > 1) {
           this.ShowOneOpenVehicle(component,vehicles);
             console.log('after#################');
         }else if (vehicles.length ==1){
             vehicles = [{'sobjectType': 'CTP_Vehicle__c'}]; 
             component.set("v.vehicles", vehicles);
         }
             
                                 
     },
    resetInValidDate : function(component, event, helper, componentName, componentValueName) {
        try{
            var dateStr = component.get(componentValueName);
            var splitDate = dateStr.split("-");
            var validDate= new Date(splitDate[0], splitDate[1] - 1, splitDate[2]);
            if(validDate.toString()=='Invalid Date'){
                component.set(componentValueName, undefined);
            }
        }catch(e){
            component.set(componentValueName, undefined);
        }
     },
    
    //DCR-7778 : Date 09/12-Mar-2018: Upendra
    backToOnBehalfHelper :function(component, helper){
        component.set("v.claimApplicationWrapper.caseRecord.CTP_Mobile__c", '');
        component.set("v.claimApplicationWrapper.caseRecord.CTP_Home_Phone__c", '');
        component.set("v.claimApplicationWrapper.caseRecord.CTP_Work_Phone__c", '');
        component.set("v.claimApplicationWrapper.caseRecord.CTP_Claimant_Email__c", '');
        component.set("v.claimApplicationWrapper.claimRecord.CTP_Medicare_Number__c", '');
        component.set("v.claimApplicationWrapper.claimRecord.CTP_Medicare_Reference_Number__c", '');
        component.set("v.claimApplicationWrapper.claimRecord.CTP_Driver_License_Number__c", '');
        component.set("v.claimApplicationWrapper.claimRecord.CTP_Driver_license_state__c",'');
        
        //Payment Section
        component.set('v.displayPaymentSection', false);
        component.set('v.claimApplicationWrapper.claimRecord.CTP_Payment_Method__c', null);
        component.set('v.claimApplicationWrapper.claimRecord.CTP_Account_Name__c', '');
        component.set('v.claimApplicationWrapper.claimRecord.CTP_BSB__c', '');
        component.set('v.claimApplicationWrapper.claimRecord.CTP_Account_Number__c', '');
        
        component.set("v.hasClaim", '');   
        
        this.ClaimHistoryErase(component, event, helper);
        component.set('v.displayClaimForm', false);
        
    }
})