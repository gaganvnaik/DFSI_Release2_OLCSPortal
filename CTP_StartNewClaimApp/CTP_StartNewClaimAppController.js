// Revision No:  10003 Change by Vivek
({
    doInit : function(component, event, helper) {
        if(component.get('v.step') != 1){
            component.set('v.isValid', false); 
        }else{
            component.set('v.isValid', true); 
            component.set('v.isValidDeclaration', true);
        }
        // 5016 - START
        // check if the caseId is passed in url
      
        // DCR-7776 - IE issue in URL: Date 07-Mar-2018:Bhavani/Upendra
        var urlstring = window.location.href;
        var draftCaseId = null;
        if(urlstring.indexOf("caseId=")>-1){
          draftCaseId = urlstring.substr(urlstring.indexOf("caseId=")+7,18) ;
        }

        // draftCaseId = url.searchParams.get("caseId");
        console.log("CaseId from URL" , draftCaseId);
        
        if(draftCaseId != null){
            console.log("inside draftcase management");
            component.set("v.mode","Edit");
            //DCR-8339 - Namrata -  commenting this code as this will be handled in CTP_Public_UI_ClaimAppStages component
            //var appEvent = $A.get("e.c:CTP_StartClaim_Claimstages");
            //appEvent.setParams({
             //   "stage": "2"
            //});
            //appEvent.fire();
            //DCR-8339 end
            helper.draftApplicationData(component, helper,draftCaseId);
        }else{
            component.set("v.mode","Create");
            helper.initializeClaimApplicationWrapper(component,helper);
        }
        // 5016 - END
    },
    
    goBackToLandingPage : function(component, event, helper) {
        var evt = $A.get("e.force:navigateToURL");
        if (evt) {
            evt.setParams({
                "url": '/'
            });
            evt.fire();
        } 
    },
    
    goBack : function(component, event, helper) {
        
        var step = component.get('v.step');
        if (step == 1){
            var evt = $A.get("e.force:navigateToURL");
            if (evt) {
                evt.setParams({
                    "url": '/'
                });
                evt.fire();
            } 
        }else if (step == 2){
            var mode = component.get("v.mode");
            if ( mode != 'Edit'){//5016- Disabling back button for edit draft
                component.set('v.step', component.get('v.step') - 1);
                var appEvent = $A.get("e.c:CTP_StartClaim_Claimstages");
                appEvent.setParams({
                    "stage": "1"
                });
                appEvent.fire();
                /* DCR-3629 Namrata Start */
                var isSelfSubmit = component.get("v.claimApplicationWrapper.claimRecord.CTP_Submitter_Is_Claimant__c");
                if(isSelfSubmit == 'Yes'){
                    helper.validateNameHelper(component, event, helper, 'claimantName');
                }else{
                    helper.validateNameHelper(component, event, helper, 'claimantNameOnBehalf');
                   	helper.fetchPickListVal(component, 'Case', 'CTP_Rep_Type__c', 'representativeType', ['Select representative type']);
                }
            }
                /* DCR-3629 Namrata End */
        }
            else if (step == 3){
                //DCR-5478
                helper.fetchPickListVal(component, 'Case', 'CTP_Preferred_Contact_time__c', 'preferredTime', null);
                //helper.fetchPickListVal(component, 'Case', 'CTP_Language__c', 'Preffredlanguage', null);
                /*DCR5939*/helper.getDynmLangValues(component, event, helper);
                component.set('v.step', component.get('v.step') - 1);
                //DCR-7220 Himani Start
                 helper.fetchPickListVal(component, 'CTP_Claim__c', 'CTP_Accident_State__c', 'driverLicenseState', null);
                 //DCR-7220 Himani End
                //DCR-8883 Namrata Start
                /*
                
                //DCR-8268
                helper.fetchPickListVal(component, 'Case', 'CTP_Rep_Type__c', 'representativeType', ['Select representative type']); 
                //DCR-8268
                helper.fetchPickListVal(component, 'Case', 'CTP_Preferred_Contact_time__c', 'repOtherPreferredTime', null);
                helper.fetchPickListVal(component, 'Case', 'CTP_Submitter_Type__c', 'relationshipToClaimant', ['Select your relationship to claimant']);
                
                if(component.get("v.claimApplicationWrapper.claimRecord.CTP_Submitter_Is_Claimant__c") !='Yes'){
                	helper.fetchPickListVal(component, 'Case', 'CTP_Preferred_Contact_time__c', 'repPreferredTime', null);
                     helper.fetchPickListVal(component, 'Case', 'CTP_RepresentativeRelationship__c', 'relationshipToClaimant', ['Select your relationship to claimant']);
                    helper.fetchPickListVal(component, 'Case', 'CTP_Submitter_Type__c', 'relationshipToClaimant', ['Select your relationship to claimant']);
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
                //DCR-8883 Namrata End
                var appEvent = $A.get("e.c:CTP_StartClaim_Claimstages");
                appEvent.setParams({
                    "stage": "2"
                });
                appEvent.fire();
                
            }
                else if (step==4){
                    component.set('v.step', component.get('v.step') - 1);
                    var appEvent = $A.get("e.c:CTP_StartClaim_Claimstages");
                    appEvent.setParams({
                        "stage": "3"
                    });
                    appEvent.fire();
                    helper.fetchPickListVal(component, 'CTP_Claim__c', 'CTP_Accident_Role__c', 'accidentrole', ['Select role']);//DCR-5478
                    /* var appEvent =  $A.get("e.c:CTP_GoogleMap_Event");
                            appEvent.setParams({
                                latitude : component.get("v.latitude"),
                                longitude :component.get("v.longitude"),
                                'selectedLocation':component.get("v.insideOutside")
                            });
                            appEvent.fire();*/
                helper.accidentRoleHelper(component, event, helper);
                //Himani, state of accident, start DCR-7720
              
                if(component.get("v.isDisplayManualAccidentAddress")==true){
                     console.log('inside if');
                         var claimApplicationWrapper = component.get("v.claimApplicationWrapper");
                         claimApplicationWrapper.claimRecord.CTP_Accident_State__c = "NSW";//DCR-7751
                         claimApplicationWrapper.claimRecord.CTP_Accident_Co_Ordinates__c = "0.0";
                         component.set("v.claimApplicationWrapper",claimApplicationWrapper);
                    }
                //Himani, state of accident, End
                var category = 'Accident';
                helper.getAttachments(component.get('v.caseRecordId'),component,category);
                helper.displayTime(component, event, helper);//DCR-5016 - 24th Feb.
            }
                else if (step==5){
                    component.set('v.step', component.get('v.step') - 1);
                    var appEvent = $A.get("e.c:CTP_StartClaim_Claimstages");
                    appEvent.setParams({
                        "stage": "3"
                    });
                    appEvent.fire();
                    var isVehicleInvolved = component.get("v.claimApplicationWrapper.claimRecord.CTP_Vehicles_Involved_Are_Known__c");
                    var isMostAtFault = component.get("v.claimApplicationWrapper.claimRecord.CTP_Most_at_Fault_Vehicle_Known__c");
                    
                    //Himani Start
                    var isMostAtFaultStateKnown = component.get("v.claimApplicationWrapper.claimRecord.CTP_State_Of_Registration_Known__c");
                    
                    if(isVehicleInvolved == "Yes" && isMostAtFault == "Yes" && isMostAtFaultStateKnown== "Yes"){
                        helper.fetchPickListVal(component, 'CTP_Claim__c', 'Most_at_fault_vehicle_state__c', 'registeredVehicleState', null);
                    }
                    //Himani End
                    
                    if(isMostAtFault == "I am unsure"){
                        var mostAtFaultVehicleUnsure = component.find("mostAtFaultVehicleUnsure");
                        $A.util.addClass(mostAtFaultVehicleUnsure, 'unsure');
                	}
                    
                }else if (step == 6){
    				component.set('v.step', component.get('v.step') - 1);
                     var category = 'Medical';
                    helper.getAttachments(component.get('v.caseRecordId'),component,category);
                    var appEvent = $A.get("e.c:CTP_StartClaim_Claimstages");
                    appEvent.setParams({
                        "stage": "4"
                    });
                    appEvent.fire();
                    //DCR-4173
                    helper.takenToHospitalInAmbulanceHelper(component, event, helper);
				}else if (step == 7){//DCR-3660, DCR-3164 - Himani, Mohit
                    component.set('v.step', component.get('v.step') - 1);
                    var category = 'Employment';
                    helper.getAttachments(component.get('v.caseRecordId'),component,category);
                    var appEvent = $A.get("e.c:CTP_StartClaim_Claimstages");
                    appEvent.setParams({
                        "stage": "5"
                    });
                    appEvent.fire();
                    
                     //DCR-3660 - Himani
                        if(component.get("v.isDisplayAwayFromWorkForm")==true){
                          var childCmpEmp = component.find("employerHistory");
                            if(childCmpEmp instanceof Array){
                                console.log('is an array');
                               for(var i = 0; i <= childCmpEmp.length; i++){
                                    console.log('inside for loop');
                                    childCmpEmp[i].setEmployeeStatus();
                                }
                                
                            }else{
                                console.log('not an array');
                               
                                childCmpEmp.setEmployeeStatus();
                            }
                 	 } 
                    //DCR-3662 - Mohit Starts
                    console.log('Case Record Id--->', component.get('v.caseRecordId'));
                    //var category = component.get('v.category');
                    var category = 'Employment';
                    console.log('category -->',category);
                    helper.getSiteURL(component);
        			helper.getAttachments(component.get('v.caseRecordId'),component,category);
                    //DCR-3662 - Mohit Ends
                }else if(step == 8){
                    component.set('v.step', component.get('v.step') - 1); 
                    var appEvent = $A.get("e.c:CTP_StartClaim_Claimstages");
                     var category = 'Other';
                    helper.getAttachments(component.get('v.caseRecordId'),component,category);
                    appEvent.setParams({
                        "stage": "6"
                    });
                    appEvent.fire();
                }
                    else{    
                        console.log("step before: " + component.get('v.step')); 
                        component.set('v.step', component.get('v.step') - 1); 
                        console.log("step after: " + component.get('v.step'));
                    }
    },
    
    //Rel#1.5,DCR-3837 - Mohit Starts
    handleChange: function (component, event, helper) {
        
        var changeValue = event.getParam("value");
        if(changeValue == "No"){
            component.set('v.registeredStateKnown',false);
        }else{
            component.set('v.registeredStateKnown',true);
            console.log('inside yes');
            console.log(component.find("registeredVehicleState"));
            console.log('hi');
            
           helper.fetchPickListVal(component, 'CTP_Claim__c', 'Most_at_fault_vehicle_state__c', 'registeredVehicleState', null);
         //helper.fetchPickListVal(component, 'CTP_Claim__c', 'CTP_Previous_Insurer_1__c', 'v.previousInsurerValues', ['Select Insurer']);
            console.log('inside yes after');
        }
    },
    //Rel#1.5,DCR-3837 - Mohit Ends
    
    setAccidentLocation: function(component, event, helper) {
        var accidentLocation  =  event.getParam("value");
        if(accidentLocation == "Yes"){
            component.set('v.insideNSW', true);
            component.set('v.outsideNSW', false);
           var accidentDate = component.find("accidentDate").get("v.value");
            var claimantName = component.get("v.claimApplicationWrapper.claimRecord.CTP_Final_Declaration_Name__c");
            if(accidentDate != "" || accidentDate != undefined){
                helper.validateDateHelper(component, event, helper);
            }
            /* Commented as part of DCR-3629 Namrata */
            /*
            if(claimantName != "" || claimantName != undefined){
                helper.validateNameHelper(component, event, helper);
            }*/
            /*var wrapperRecord = component.get("v.claimApplicationWrapper");
            wrapperRecord.claimRecord.CTP_Did_Accident_Take_Place_In_NSW__c = accidentLocation;
            component.set("v.claimApplicationWrapper",wrapperRecord);*/
        }else{
            component.set('v.insideNSW', false);
            component.set('v.outsideNSW', true);
            component.set('v.proceedClaimApplication', false); 
            component.set('v.isValid', true); 
            /*var wrapperRecord = component.get("v.claimApplicationWrapper");
            wrapperRecord.claimRecord.CTP_Did_Accident_Take_Place_In_NSW__c = accidentLocation;
            component.set("v.claimApplicationWrapper",wrapperRecord);*/
        }
    },
    
    displayClaimForm: function(component, event, helper) {
        var displayClaimForm  =  event.getParam("value");
        if(displayClaimForm == "Yes"){
            component.set('v.displayClaimForm', true);
            console.log(component.get('v.displayClaimForm'));
            component.set('v.claimApplicationWrapper.claimRecord.Previous_CTP_Claim__c', displayClaimForm);
            helper.fetchPickListVal(component, 'CTP_Claim__c', 'CTP_Previous_Insurer_1__c', 'v.previousInsurerValues', ['Select Insurer']);
        }else{
            component.set('v.claimApplicationWrapper.claimRecord.Previous_CTP_Claim__c', displayClaimForm);
            component.set('v.displayClaimForm', false);
            //DCR-5498 Himani
            helper.ClaimHistoryErase(component, event, helper);
        }
    },
    
    displayVehicleForm: function(component, event, helper) {
        var displayVehicleForm  =  event.getParam("value");
        if(displayVehicleForm == "Yes"){
            component.set('v.displayVehicleForm', true);
            component.set("v.claimApplicationWrapper.claimRecord.CTP_Vehicles_Involved_Are_Known__c", displayVehicleForm);
        }else{
            component.set('v.displayVehicleForm', false);
            //deleteAssociatedVehicles DCR-7669
            helper.deleteAssociatedVehicles(component, event, helper);
            component.set("v.claimApplicationWrapper.claimRecord.CTP_Vehicles_Involved_Are_Known__c", displayVehicleForm);
        }
        component.set('v.mostAtFaultVehicle', false);
        component.set('v.mostAtFaultVehicleUnsure', false);
    },
    
    validateDate: function(component, event, helper) {
        helper.validateDateHelper(component, event, helper);
        var claimantName = component.get("v.claimApplicationWrapper.claimRecord.CTP_Final_Declaration_Name__c");
        var proceedClaimApplication =  component.get("v.proceedClaimApplication");
        /* Commented as part of DCR-3629 Namrata */
        /*if(proceedClaimApplication && (claimantName != "" || claimantName != undefined)){
            helper.validateNameHelper(component, event, helper);
        }*/
        helper.validateNameSelfOnbehalf(component, event, helper);
    },
    
    continueApplication: function(component, event, helper) {
        setTimeout(function(){ component.set('v.daysDifferenceFlag', false); }, 500);
        component.set('v.proceedClaimApplication', true); 
        helper.validateNameSelfOnbehalf(component, event, helper);
    },
    
    isSelfSubmit: function(component, event, helper) {
        
        var isClaimForYou  =  event.getParam("value");

        if(isClaimForYou == "Yes"){
            component.set('v.isClaimForYou', true);
                        
            /*var wrapperRecord = component.get("v.claimApplicationWrapper");
            wrapperRecord.claimRecord.CTP_Submitter_Is_Claimant__c = isClaimForYou;
            component.set("v.claimApplicationWrapper",wrapperRecord);*/
        }else{
            component.set('v.isClaimForYou', false);
            var action = component.get("c.currentUserContact");
            action.setCallback(this, function(response) {
                var state = response.getState();
                console.log('state is::: '+state);
                if (state === "SUCCESS"){ 
                    var submitter = response.getReturnValue();
                    component.set("v.claimApplicationWrapper.caseRecord.CTP_SubmitterContact__c", submitter.ContactId);
                    //component.set("v.claimApplicationWrapper.caseRecord.CTP_RepresentativeContact__c", submitter.ContactId);
                    
                    console.log('submitter.ContactId >>> '+submitter.ContactId);
                    console.log('submitter.ContactId >>> '+component.get("v.claimApplicationWrapper.caseRecord.CTP_SubmitterContact__c"));
                }
            });
			$A.enqueueAction(action);
            
            //DCR-2941 :Ends
            /*var wrapperRecord = component.get("v.claimApplicationWrapper");
            wrapperRecord.claimRecord.CTP_Submitter_Is_Claimant__c = isClaimForYou;
            component.set("v.claimApplicationWrapper",wrapperRecord);*/
        }
        
    },
    
    isClaimNoExits: function(component, event, helper) {
        var isClaimNoExits  =  event.getParam("value");
        if(isClaimNoExits == "Yes"){
            component.set('v.isClaimNoExits', true);
            /*var wrapperRecord = component.get("v.claimApplicationWrapper");
            wrapperRecord.claimRecord.CTP_Early_Treatment_Received__c = isClaimNoExits;
            component.set("v.claimApplicationWrapper",wrapperRecord);*/
        }else{
            component.set('v.isClaimNoExits', false);
            /*var wrapperRecord = component.get("v.claimApplicationWrapper");
            wrapperRecord.claimRecord.CTP_Early_Treatment_Received__c = isClaimNoExits;
            component.set("v.claimApplicationWrapper",wrapperRecord);*/
        }
    },
    
   /* commented this method because we are removing checkbox from declaration.
    isDeclarationChecked: function(component, event, helper) {
        var isChecked  =  component.find("declarationChk");
        if(isChecked.get("v.value")){
            component.set('v.isValid', false); 
            var wrapperRecord = component.get("v.claimApplicationWrapper");
            wrapperRecord.claimRecord.CTP_Initial_Declaration__c = true;
            component.set("v.claimApplicationWrapper",wrapperRecord);
            console.log("Wrapper Record is-->",wrapperRecord);
        }else{
            component.set('v.isValid', true); 
            var wrapperRecord = component.get("v.claimApplicationWrapper");
            wrapperRecord.claimRecord.CTP_Initial_Declaration__c = false;
            component.set("v.claimApplicationWrapper",wrapperRecord);
            console.log("Wrapper Record is-->",wrapperRecord);
        }
    }, */
    
    validateName: function(component, event, helper) {
        helper.validateNameHelper(component, event, helper);
    },
    
    proceedApplication: function(component, event, helper) {
       console.log('step ---'+component.get('v.step'));
        //Khushman: DCR-5286: START
       var success=true;
	   success = helper.validateAll(component, event, helper, component.get('v.validationsMap')[component.get('v.step')]);
       //Khushman: DCR-5286: STOP
      // var category = component.get("v.category");
       if(component.get('v.step') == 1){
           
            //DCR-2836
         var applicationSavedMsgSpan = component.find("applicationSavedMsg");
         $A.util.addClass(applicationSavedMsgSpan,"slds-hidden");
     	
          
           
        	helper.step1ValidationHelper(component, event, helper);
            if(component.get('v.isStep1Valid')){
                helper.saveRecord(component,helper);
                helper.assignFunction(component, event, helper);
                var appEvent = $A.get("e.c:CTP_StartClaim_Claimstages");
                appEvent.setParams({
                    "stage": "2"
                });
                appEvent.fire();
               
                //DCR-7220 Himani Start
                 helper.fetchPickListVal(component, 'CTP_Claim__c', 'CTP_Accident_State__c', 'driverLicenseState', null);
                 //DCR-7220 Himani End
                //helper.fetchPickListVal(component, 'User', 'CTP_User_State__c', 'userState', ['NSW']);
                helper.fetchPickListVal(component, 'Case', 'CTP_Preferred_Contact_time__c', 'preferredTime', null);
                //helper.fetchPickListVal(component, 'Case', 'CTP_Language__c', 'Preffredlanguage', null);//DCR-2810 for prefereed language on case
                /*DCR5939*/helper.getDynmLangValues(component, event, helper);
               
                // DCR-8883 Namrata Start
                
                // helper.fetchPickListVal(component, 'Case', 'CTP_Submitter_Type__c', 'relationshipToClaimant', ['Select your relationship to claimant']);
               // helper.fetchPickListVal(component, 'Case', 'CTP_Rep_Type__c', 'representativeType', ['Select representative type']);
                 
                component.set("v.claimApplicationWrapper.caseRecord.CTP_Preferred_Contact_time__c","Anytime");
             
               /* if(component.get("v.claimApplicationWrapper.claimRecord.CTP_Submitter_Is_Claimant__c") =='Yes'){
                	component.set("v.claimApplicationWrapper.caseRecord.CTP_Claimant_SNSW_Email__c",v.claimApplicationWrapper.userRecord.Email);
                }else{
                     
                      helper.fetchPickListVal(component, 'Case', 'CTP_Preferred_Contact_time__c', 'repPreferredTime', null);
                	//helper.fetchPickListVal(component, 'Case', 'CTP_Language__c', 'repPreffredlanguage', null);
                	//DCR5939 helper.getDynmLangValues(component, event, helper);
                    helper.fetchPickListVal(component, 'Case', 'CTP_RepresentativeRelationship__c', 'relationshipToClaimant', ['Select your relationship to claimant']);
                    helper.fetchPickListVal(component, 'Case', 'CTP_Rep_Type__c', 'representativeType', ['Select representative type']);
                    helper.fetchPickListVal(component, 'Case', 'CTP_Submitter_Type__c', 'relationshipToClaimant', ['Select your relationship to claimant']);
                    helper.backToOnBehalfHelper(component, even, helper);
                }*/
                
                if(component.get("v.claimApplicationWrapper.claimRecord.CTP_Submitter_Is_Claimant__c") =='Yes'){
                   component.set("v.claimApplicationWrapper.caseRecord.CTP_Claimant_SNSW_Email__c",component.get("v.claimApplicationWrapper.userRecord.Email"));
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
                    helper.backToOnBehalfHelper(component, even, helper);
                }
                 // DCR-8883 Namrata End
            }
           
           
            helper.scrollToTop(component, event, helper);
            
        }
        else if(component.get('v.step') == 2){
            console.log('step inside 2'+component.get('v.step'));
            console.log('Validation success: '+success);
           // component.set("v.category",'Accident');
            console.log('Inside step2 Category Accident1>>');
             if (component.get('v.claimApplicationWrapper.claimRecord.Previous_CTP_Claim__c') == 'Yes'){
                var claimHistory = component.find('childClaimHistory'); //.claimHistoryValidateAll
                 //DCR-8607: Namrata
                //if (component.get('v.childClaimHistory').length>1){
                 if (claimHistory.constructor==Array && claimHistory.length > 0){
                    for (var claimInd=0;claimInd<claimHistory.length;claimInd++){
                        success = claimHistory[claimInd].claimHistoryValidateAll() && success;
                    }
                } else {
                    success = claimHistory.claimHistoryValidateAll() && success;
                }
            }
            //Khushman: DCR-5286: //Atleast any 1 phone number should be provided
            if(helper.isBlankFunc(component.get('v.claimApplicationWrapper.caseRecord.CTP_Mobile__c'))
               	&& helper.isBlankFunc(component.get('v.claimApplicationWrapper.caseRecord.CTP_Home_Phone__c'))
                && helper.isBlankFunc(component.get('v.claimApplicationWrapper.caseRecord.CTP_Work_Phone__c'))
              ){
                	helper.validateElem(component, event, helper, 'mobileNumber', null, {'mobileNumber':[{'mandatory': true, 'errorMsg':'At least mobile, home or work phone must be entered'}]});
                	helper.validateElem(component, event, helper, 'homePhone', null, {'homePhone':[{'mandatory': true, 'errorMsg':'At least mobile, home or work phone must be entered'}]});
                	helper.validateElem(component, event, helper, 'workPhone', null, {'workPhone':[{'mandatory': true, 'errorMsg':'At least mobile, home or work phone must be entered'}]});
                	success = false;
	          }
            
            //Khushman: DCR-5286: Medicare Reference Number also to be provided if Medicare Number is provided
            if (!helper.isBlankFunc(component.get('v.claimApplicationWrapper.claimRecord.CTP_Medicare_Number__c'))
               	&& helper.isBlankFunc(component.get('v.claimApplicationWrapper.claimRecord.CTP_Medicare_Reference_Number__c'))){
               var res = helper.validateElem(component, event, helper, 'CTP_Medicare_Reference_Number__c', null, {'CTP_Medicare_Reference_Number__c':[{'mandatory': true, 'errorMsg':'Please enter your Medicare Reference Number'}]});
               success=success && res;
            }
            
			helper.displayErrorMessage(component, event, helper, false, 'driverLicenseStateErrMsg');
            if (!helper.isBlankFunc(component.get('v.claimApplicationWrapper.claimRecord.CTP_Driver_License_Number__c'))){
               var res = helper.validateElem(component, event, helper, 'driverLicenseState', null, {'driverLicenseState':[{'mandatory': true, 'errorElem':'driverLicenseStateErrMsg'}]});
               success=success && res;
            }
          
            if (component.get('v.claimApplicationWrapper.claimRecord.CTP_Submitter_Is_Claimant__c')  == 'No'){
                
                helper.displayErrorMessage(component, event, helper, false, 'claimantEmailIdReq');   
                if( component.get('v.claimApplicationWrapper.caseRecord.CTP_Preferred_Contact_Method__c') == 'email' 
                   && helper.isBlankFunc(component.get('v.claimApplicationWrapper.caseRecord.CTP_Claimant_Email__c'))) {
                    helper.displayErrorMessage(component, event, helper, true, 'claimantEmailIdReq');
                    success = false;
                }
                
                helper.displayErrorMessage(component, event, helper, false, 'repInsurerMobContactNumberMand');   
                if( component.get('v.claimApplicationWrapper.caseRecord.CTP_Preferred_Contact_Method__c') == 'mobile' 
                   && helper.isBlankFunc(component.get('v.claimApplicationWrapper.caseRecord.CTP_Mobile__c'))) {
                    helper.displayErrorMessage(component, event, helper, true, 'repInsurerMobContactNumberMand');
                    success = false;
                }
                
                helper.displayErrorMessage(component, event, helper, false, 'repInsurerContactNumberMand');   
                if( component.get('v.claimApplicationWrapper.caseRecord.CTP_Preferred_Contact_Method__c') == 'Home Phone' 
                   && helper.isBlankFunc(component.get('v.claimApplicationWrapper.caseRecord.CTP_Home_Phone__c'))) {
                    helper.displayErrorMessage(component, event, helper, true, 'repInsurerContactNumberMand');
                    success = false;
                }
                
                helper.displayErrorMessage(component, event, helper, false, 'repInsurerWorkNumberMand');   
                if( component.get('v.claimApplicationWrapper.caseRecord.CTP_Preferred_Contact_Method__c') == 'Work Phone' 
                   && helper.isBlankFunc(component.get('v.claimApplicationWrapper.caseRecord.CTP_Work_Phone__c'))) {
                    helper.displayErrorMessage(component, event, helper, true, 'repInsurerWorkNumberMand');
                    success = false;
                }
                
                var res = helper.validateClaimantDob(component, event, helper) ;
                success = success && res;
            }
            
            if (success){ //Khushman: DCR-5286: This if condition added
             //DCR-2836
             var applicationSavedMsgSpan = component.find("applicationSavedMsg");
             $A.util.addClass(applicationSavedMsgSpan,"slds-hidden");
            //helper.step2ValidationHelper(component, event, helper);
          
             
            // Rel1.5: DCR-3592 -Mohit - For saving user details - start
            helper.saveRecord(component,helper);
             component.set("v.category","Accident");
             var category = 'Accident';
             helper.getAttachments(component.get('v.caseRecordId'),component,category);
            helper.fetchPickListVal(component, 'CTP_Claim__c', 'CTP_Accident_Role__c', 'accidentrole', ['Select role']);
            var appEvent = $A.get("e.c:CTP_StartClaim_Claimstages");
            appEvent.setParams({
              "stage": "3"
            });
            appEvent.fire();
            helper.scrollToTop(component, event, helper);
            helper.accidentRoleHelper(component, event, helper);
       
            //helper.otherRoleEmpty(component, event, helper);
            // Rel1.5: DCR-3592 -Mohit - For saving user details - End
            //component.set('v.step', component.get('v.step') + 1);
            
            }
            
            
        }
        else if(component.get('v.step') == 3){
            
            //temp code added by himani Start
            /*var claimApplicationWrapper = component.get('v.claimApplicationWrapper');
            claimApplicationWrapper.claimRecord.CTP_Accident_Postcode__c = 1234;
            claimApplicationWrapper.claimRecord.CTP_Accident_Street_Number__c = 12;
            claimApplicationWrapper.claimRecord.CTP_Accident_Street__c = 'test';
            claimApplicationWrapper.claimRecord.CTP_Accident_Suburb__c = 'test';
            claimApplicationWrapper.claimRecord.CTP_Accident_State__c ='NSW';
            claimApplicationWrapper.claimRecord.CTP_Accident_Co_Ordinates__c= '0 0';
            //claimApplicationWrapper.claimRecord.CTP_Time_Of_Accident__c= '2121';
            component.set('v.claimApplicationWrapper',claimApplicationWrapper);*/
        //temp code added by himani End  
        
            var success=true;
           
            console.log('Inside step3 Category Accident2>>');
             //Added for DCR-8559 -Parul Start
			 component.set("v.category","Accident");
             var category = 'Accident'; 
            //Added for DCR-8559 -Parul End
            
            //Khushman: DCR-3162 
            //component.set('v.claimApplicationWrapper.claimRecord.CTP_Passenger_vehicle__c',null);
//			Moving below line to above all
//                        success = helper.validateAll(component, event, helper, component.get('v.validationsMap')[component.get('v.step')]);
            success = helper.validateAll(component, event, helper, component.get('v.validationsMap')[component.get('v.step')]);
            var rolevalue=component.get('v.claimApplicationWrapper.claimRecord.CTP_Accident_Role__c');
            if(helper.isBlankFunc(rolevalue) || rolevalue == 'Select role'){
                helper.displayErrorMessage(component, event, helper, true, 'accidentroleReq')
                success = false;                
            }
            
            helper.displayErrorMessage(component, event, helper, false, 'PassengerVehicleError');
            
            if (component.get('v.passengerRoleAccident') 
                && helper.isBlankFunc(component.get('v.claimApplicationWrapper.claimRecord.CTP_Passenger_vehicle__c'))){
                helper.displayErrorMessage(component, event, helper, true, 'PassengerVehicleError');
                success=false;
            }
         
          success = helper.validateTimeWindowHelper(component, event, helper)  && success; 
            
         //Khushman
        	if (success){
                 //DCR-2836
            	 var applicationSavedMsgSpan = component.find("applicationSavedMsg");
             	$A.util.addClass(applicationSavedMsgSpan,"slds-hidden");
                //helper.step3ValidationHelper(component, event, helper);
                //Rel#1.5,DCR-4864,Added by Shilpa Patil
                helper.saveRecord(component,helper);
                //Khushman: Remove this below line once backend is going good.
               //component.set('v.step', component.get('v.step') + 1); 
                               
                var appEvent = $A.get("e.c:CTP_StartClaim_Claimstages");
                appEvent.setParams({
                  "stage": "3"
                });
                appEvent.fire();
        	}
            helper.scrollToTop(component, event, helper);
              if (localStorage.getItem('Attachment') != null) {
                        var attachmentData1 = JSON.parse(localStorage.getItem('Attachment'));
                        component.set("v.attachmentData1", attachmentData1);
                        //localStorage.removeItem('Attachment');
                    } else component.set("v.attachmentData1", null);

        }
        else if(component.get('v.step') == 4){
           console.log('@@@Inside step 4');
           if (component.get('v.displayVehicleForm')){
               console.log('>> inside if displayVehicleForm>>>> ');
            	var vehs = component.find('childVehicle'); //.vehicleValidateAll
               console.log('vehs--',vehs);
               
                   
               
            	//if (component.get('v.vehicles').length>1){
            	 if (vehs.constructor==Array && vehs.length > 0){
                    console.log('vehs-- inside',vehs);
                    for (var vehInd=0;vehInd<vehs.length;vehInd++){
                        console.log('>>> before validating vehicles >>>>');
                        success = vehs[vehInd].vehicleValidateAll() && success;
                        
                        console.log('>>> success value afterlidating vehicles >>>>'+success);
                        //Fix for DCR-6292
                        if(component.get('v.claimApplicationWrapper.claimRecord.CTP_Most_at_Fault_Vehicle_Known__c')=='Yes'){
                            console.log('inside most at fault vehicle known>>> ');
                            success = vehs[vehInd].validateRegistrationNumber() && success;
                        }
                    }
                } else {
						console.log('vehs-- inside',vehs);
                   		success = vehs.vehicleValidateAll() && success;// commented 24th Feb
                    	console.log('>> inside Else CTP_Most_at_Fault_Vehicle_Known__c after success>> '+success);
                    	//Fix for DCR-6292
                        if(component.get('v.claimApplicationWrapper.claimRecord.CTP_Most_at_Fault_Vehicle_Known__c')=='Yes'){
                            success = vehs.validateRegistrationNumber() && success;
                            console.log('>> after success CTP_Most_at_Fault_Vehicle_Known__c >>'+success);
                        }
                }
               
               // Check if Vehicle Registration Found
               //Commted by Vivek: Commenting following code because vehicleRegistration Number is not mandatory in all cases. This has caused defect DCR-6292
               //success = component.get('v.vehicleRegistrationFound') && success;     
            }
             
            if (success){
                
                console.log('@@@Inside success');
					 //DCR-2836
				 var applicationSavedMsgSpan = component.find("applicationSavedMsg");
					 component.set("v.category",'Medical');
                    var category = 'Medical';
					console.log('Inside step4 Category Medical>>');
					//component.set('v.attachmentList',new Array());
				 $A.util.addClass(applicationSavedMsgSpan,"slds-hidden");
					//helper.step4ValidationHelper(component, event, helper);
				helper.saveRecord(component,helper);
                
                helper.getAttachments(component.get('v.caseRecordId'),component,category);
				//component.set('v.step', component.get('v.step') + 1);
				var appEvent = $A.get("e.c:CTP_StartClaim_Claimstages");
                appEvent.setParams({
                  "stage": "4"
                });
                appEvent.fire();
                //DCR-4173
                helper.takenToHospitalInAmbulanceHelper(component, event, helper);
			}
            helper.scrollToTop(component, event, helper);
        }
            else if(component.get('v.step') == 5){
                //DCR-4866
                var childs = component.find('previousInjuriesHistory'); 
                if (childs ){
                   if (childs.constructor==Array && childs.length > 0){
                        for (var index=0;index<childs.length;index++){
                            success= childs[index]['prevInjuryValidateAll']() && success;
                        }
                        
                    } else {
                        
                        success = childs.prevInjuryValidateAll() && success;
                    }
                }
                success =  helper.validateDischargeDate(component, event, helper) && success; 
                var applicationSavedMsgSpan = component.find("applicationSavedMsg");
                component.set('v.category','Employment');
                console.log('Inside step5 Category Employment>>');
                //component.set('v.attachmentList',new Array());
                $A.util.addClass(applicationSavedMsgSpan,"slds-hidden");
                
                //helper.step5ValidationHelper(component, event, helper);
                
                //DCR-4866
                if(success){
                    //DCR-3660 - Himani - Starts
                      //component.set('v.step', component.get('v.step') + 1);
                       if(component.get("v.isDisplayAwayFromWorkForm")==true){
                           var childCmpEmp = component.find("employerHistory");
                           if(childCmpEmp instanceof Array){
                               console.log('is an array');
                               for(var i = 0; i <= childCmpEmp.length; i++){
                                   console.log('inside for loop');
                                    childCmpEmp[i].setEmployeeStatus();
                           }
                           }else if(childCmpEmp != undefined){//DCR-5016
                                console.log('not an array');
                                childCmpEmp.setEmployeeStatus();
                       		}
                           
                 	 }
                    var appEvent = $A.get("e.c:CTP_StartClaim_Claimstages");
                    appEvent.setParams({
                        "stage": "5"
                    });
                    appEvent.fire();
                    helper.saveRecord(component,helper);
                     //DCR-3660 - Himani - Ends
                     //DCR-3662 - Mohit Starts
                   	 console.log('Case Record Id--->', component.get('v.caseRecordId'));
                     //var category = component.get('v.category');
                
          
                     var category = 'Employment';
                     console.log('category -->',category);
                     helper.getSiteURL(component);
        			 helper.getAttachments(component.get('v.caseRecordId'),component,category);
                     //DCR-3662 - Mohit Ends
                }
                helper.scrollToTop(component, event, helper);
            }
 			else if(component.get('v.step') == 6){
                    //DCR-2836
                    console.log('In step 6 Employment Screen1');
                    if (component.get('v.isDisplayAwayFromWorkForm')){
                        var childs = component.find('employerHistory'); 
                        //if (component.get('v.employerHistory').length>1){
                        if (childs.constructor==Array && childs.length > 0){
                            for (var index=0;index<childs.length;index++){
                                console.log('>>> Step 6 Success value if >>>');
                                success= childs[index]['employmentHistoryValidateAll']() && success;
                                console.log('>>> Step 6 Success value if >>>'+success);
                            }
                            
                        } else {
                            success = childs.employmentHistoryValidateAll() && success;
                            console.log('>>> Step 6 Success value Else >>>'+success);
                        }
                    } 
                     console.log('In step 6 Employment Screen2');
                    
                    var applicationSavedMsgSpan = component.find("applicationSavedMsg");
                    component.set('v.category','Other');
                
                   // helper.saveRecord(component,helper); //DCR-3660 - Mohit
                    console.log('Inside step6 Category Other>>');
                    //component.set('v.attachmentList',new Array());
                    
                    $A.util.addClass(applicationSavedMsgSpan,"slds-hidden");
                    //helper.step6ValidationHelper(component, event, helper);
                    if(success){
                         helper.saveRecord(component,helper); //DCR-3660 - Mohit
                        var category = 'Other';
                         helper.getAttachments(component.get('v.caseRecordId'),component,category);
                        // component.set('v.step', component.get('v.step') + 1);
                        var appEvent = $A.get("e.c:CTP_StartClaim_Claimstages");
                        appEvent.setParams({
                          "stage": "6"
                        });
                        appEvent.fire();
                    }
                	helper.scrollToTop(component, event, helper);
                } 
                else if(component.get('v.step') == 7){
                        component.set('v.step', component.get('v.step') + 1);
                    	var appEvent = $A.get("e.c:CTP_StartClaim_Claimstages");
                        appEvent.setParams({
                          "stage": "7"
                        });
                        appEvent.fire();
                    helper.scrollToTop(component, event, helper);
                    if (component.get('v.isClaimForYou') == true){
                        var finalDeclarationName = component.find("finalDeclarationName").get("v.value");
                        if(finalDeclarationName == "" || finalDeclarationName == undefined){
                            component.set('v.isSubmitValid', true);
                        }else{
                            component.set('v.isSubmitValid', false);
                        }
                    }else{
                        var finalDeclarationName = component.find("finalDeclarationNameOnbehalf").get("v.value");
                        if(finalDeclarationName == "" || finalDeclarationName == undefined){
                            component.set('v.isSubmitValid', true);
                        }else{
                            component.set('v.isSubmitValid', false);
                        } 
                    }
                    helper.getAllAttachments(component, event, helper);
                    console.log('localStorage.getItem>>>',localStorage.getItem('Attachment'));
                    if (localStorage.getItem('Attachment') != null) {
                        var attachmentData = JSON.parse(localStorage.getItem('Attachment'));
                         console.log("attachmentData>>>",attachmentData);
                        component.set("v.attachmentData", attachmentData);
                        console.log("attachmentData1>>>",attachmentData);
                        //localStorage.removeItem('Attachment');
                    } else component.set("v.attachmentData", null);
                }
                
    },
    
    validateClaimNo : function(component, event, helper) {
		helper.validateClaimNoHelper(component, event, helper);
    },
    
    onPicklistChange: function(component, event, helper) {
        // get the value of select option
        //alert(event.getSource().get("v.value"));
        
    },
     onPreferredTimeChange: function(component, event, helper) {
       //helper.onPreferredTimeChangeHelper(component, event, helper);
    },
    setContactPreference: function(component, event, helper) {
        var contactPreference = event.currentTarget.getAttribute('data-id');
        component.set('v.claimApplicationWrapper.caseRecord.CTP_Preferred_Contact_Method__c', contactPreference);
       // helper.setContactPreferenceHelper(component, event, helper);
    },
    setIt: function(component, event, helper) {
        var val = event.currentTarget.getAttribute('data-id');
        var fieldName = event.currentTarget.getAttribute('id');
        component.set(fieldName, val);

        //alert('a');
        //alert(event.currentTarget.getLocalId());
		//alert(event.currentTarget.getAttribute('auraid'));
        //alert(event.getSource().getLocalId());
        //component.set(event.getSource().getLocalId(), val);
       // helper.setContactPreferenceHelper(component, event, helper);
    },
    onCheck1 : function(component, event, helper) {
        var flag=component.get("v.isCheck1");
        if(flag!=true){
            component.set("v.isCheck1",true);
            component.set("v.isCheck2",false);
            component.set("v.isCheck3",false);
            component.set("v.ven2",true);
            component.set("v.ven3",true);
            var  din=component.get("v.ven3");
        }
        if(flag!=false){
            component.set("v.isCheck1",false);
            component.set("v.ven2",false);
            component.set("v.ven3",false);
        }
    },
    
    onCheck2 : function(component, event, helper) {
        var flag=component.get("v.isCheck2");
        if(flag!=true){
            component.set("v.isCheck2",true);
            component.set("v.isCheck1",false);
            component.set("v.isCheck3",false);
            component.set("v.ven1",true);
            component.set("v.ven3",true);
        }
        if(flag!=false){
            component.set("v.isCheck2",false);
            component.set("v.ven1",false);
            component.set("v.ven3",false);
        }
    }, 
    
    onCheck3 : function(component, event, helper) {
        var flag=component.get("v.isCheck3");
        if(flag!=true){
            component.set("v.isCheck3",true);
            component.set("v.isCheck1",false);
            component.set("v.isCheck2",false);
            component.set("v.ven1",true);
            component.set("v.ven2",true);
        }
        if(flag!=false){
            component.set("v.isCheck3",false);
            component.set("v.ven2",false);
            component.set("v.ven1",false);
        }
    },
    
    addClaimHistory: function(component, event, helper) {
  
        var currentClaimHistory = component.get("v.childClaimHistory");
        helper.fetchPickListVal(component, 'CTP_Claim__c', 'CTP_Previous_Insurer_1__c', 'v.previousInsurerValues', ['Select Insurer']);
        console.log("length: " + currentClaimHistory.length);
        if (currentClaimHistory.length > 3){
            component.set("v.maxCountClaimHistory", true);
        }else{
            component.set("v.maxCountClaimHistory", false);
        }
        currentClaimHistory.push(new Object());
        component.set("v.childClaimHistory", currentClaimHistory);

    },
    
    removeClaimHistoryItem: function(component, event, helper) {
        console.log('removeClaimHistoryItem called');
        console.log('@@@index ---->' + event.getParam("indexVar"));
        var childClaimHistory = component.get("v.childClaimHistory");
        console.log("length before: " +childClaimHistory.length);
        component.set("v.maxCountClaimHistory", false);
        if (childClaimHistory.length == 1) { /* reset values */
            console.log("element: " + JSON.stringify(childClaimHistory));            
            childClaimHistory = [{"injuryYear":"","injuryMonth":"","CTP_Previous_Insurer_1__c":"Select Insurer","CTP_Previous_Claim_Number_1__c":""}];
			component.set("v.childClaimHistory", childClaimHistory);
        }
        if (childClaimHistory.length > 1) {
            var index = event.getParam("indexVar") - 1;
            console.log('@index ---->' + index);
            childClaimHistory.splice(index, 1);
            component.set("v.childClaimHistory", childClaimHistory);
        }
       
        console.log("length after: " +component.get("v.childClaimHistory").length);
    },
    
    addVehicle: function(component, event, helper) {
  
        var vehiles = component.get("v.vehicles");
        //var errorDiv = component.find("maxCountClaimHistory");
        //helper.fetchPickListVal(component, 'CTP_Claim__c', 'CTP_Previous_Insurer_1__c', 'v.previousInsurerValues', ['Select Insurer']);
        vehiles.push(new Object());
        component.set("v.vehicles", vehiles);

    },
    removeVehicleItem: function(component, event, helper) {
        console.log('removeVehicleItem called');
        console.log('@@@index ---->' + event.getParam("indexVar"));
        
        var vehicles = component.get("v.vehicles");
        console.log("element outer: " + JSON.stringify(vehicles));
        console.log("length: " +vehicles.length);
        if (vehicles.length == 1) { /* reset values */
            console.log("element: " + JSON.stringify(vehicles));            
            vehicles = [{}];
			component.set("v.vehicles", vehicles);
        }
        if (vehicles.length > 1) {
            var index = event.getParam("indexVar") - 1;
            console.log('@index ---->' + index);
            console.log("element inner 1: " + JSON.stringify(vehicles));
            vehicles.splice(index, 1);
            console.log("var inner: " + JSON.stringify(vehicles));
            
            component.set("v.vehicles", vehicles);
            console.log("element inner 2: " + component.get('v.vehicles'));
        }
        helper.loadVehicleRegs(component, event, helper);
        helper.syncVehicles(component);//DCR-8240
        component.set("v.vehicleFoundPIE", false);
        component.set("v.vehicleNotFoundPIE", false);
        component.set("v.technicalIssuePIE", false);
    },
    
    addInjury: function(component, event, helper) {
        var injuriesHistory = component.get("v.injuriesHistory");
        injuriesHistory.push({'sobjectType': 'CTP_Injury_Treatment__c'});
        component.set("v.injuriesHistory", injuriesHistory);
    },
    
   /*Coomented by Sridevi to fix the issues related DCR-3659.
  	removeInjuryItem: function(component, event, helper) {
       // var index = event.getSource().get("v.name");
       // console.log("index", index);
        var injuriesHist = component.get("v.injuriesHistory");
        console.log('injuriesHist length>> '+injuriesHist.length);
        console.log('injuriesHist >> '+JSON.stringify(injuriesHist.length));
        if (injuriesHist.length == 1) { /* reset injury values             
            injuriesHist = [{"CTP_Injury_Description__c":""}];
            injuriesHist=[{}];
			component.set("v.injuriesHistory", injuriesHist);
        }
        
        if (injuriesHist.length > 1) {
            var index = event.getParam("indexVar");
            //index = index;
            injuriesHist.splice(index, 1);
            component.set("v.injuriesHistory", injuriesHist);
        }    
    },*/
    
    //Added by Sridevi as part of DCR-3659 fix (Record deletions) 
    removeInjuryItem: function(component, event, helper) {       
        var injuriesHist = component.get("v.injuriesHistory");             
        var index = event.getSource().get("v.indexVar");
        console.log("index", index);        
        if (injuriesHist.length > 0) {
            injuriesHist.splice(index, 1);
            component.set("v.injuriesHistory", injuriesHist);
        }
      console.log(injuriesHist.length);    
    },
    addTreatment: function(component, event, helper) {
         var treatmentsHistory = component.get("v.treatmentsHistory");       	
        treatmentsHistory.push(new Object());
        component.set("v.treatmentsHistory", treatmentsHistory);        
    },
   //Added by Sridevi as part of DCR-3659 fix (Record deletions) 
  removeTreatmentItem: function(component, event, helper) {
        var index = event.getSource().get("v.indexVar");
        console.log("index", index);
        var treatmentsHist = component.get("v.treatmentsHistory");
        if (treatmentsHist.length == 1) {
            treatmentsHist[index] = {'sobjectType': 'CTP_Injury_Treatment__c'};
            component.set("v.treatmentsHistory", treatmentsHist);
        }
      else if (treatmentsHist.length > 1) {
            treatmentsHist.splice(index, 1);
            component.set("v.treatmentsHistory", treatmentsHist);
        }
    },
    
    getPreviousClaimToClaimObject: function(component, event, helper) {
        var claimHist = component.get("v.claimHistory");
        console.log('v.claimHist:'+JSON.stringify(claimHist));
        var cl = component.get("v.claim");
        console.log('v.claim:'+JSON.stringify(cl));
        var claim = component.get("v.claim");
        var flds=new Array("CTP_Previous_Date_Of_Injury_<index>__c","CTP_Previous_Claim_Number_<index>__c","CTP_Previous_Insurer_<index>__c");
        for (var fldNumber=0;fldNumber<flds.length; fldNumber++){
            for (var i=0;i<claimHist.length;i++){
                var abcd=claimHist[i];
                //alert('a:'+flds[fldNumber].replace('<index>', 1));
                claim[flds[fldNumber].replace('<index>', i+1)]=claimHist[i][flds[fldNumber].replace('<index>', 1)]; 
                //   claim[flds(fldNumber).replace('<index>', i+1)]=claimHist[i].CTP_Previous_Insurer_1__c;
                //claim.CTP_Previous_Insurer_1__c=claimHist[i].CTP_Previous_Insurer_1__c; 
            }
        }
        component.set("v.claim", claim);
        var cl = component.get("v.claim");
        console.log('v.claim:'+JSON.stringify(cl));
    },
    
    validateRepUnitNumber: function(component, event, helper) {
        helper.validateRepUnitNumberHelper(component, event);
    },
    
    validateRepSreetNumberNumber: function(component, event, helper) {
        helper.validateRepStreetNumberHelper(component, event);
    },
    
    validateRepStreet: function(component, event, helper) {
        helper.validateRepStreetHelper(component, event);
    },
    
    validateRepSuburb: function(component, event, helper) {
        helper.validateRepSuburbHelper(component, event);
    },
    
    validateRepPostcodeAddress: function(component, event, helper) {
        helper.validateRepPostcodeAddressHelper(component, event);
    },
    
    displayPaymentMethod: function(component, event, helper) {
        var paymentMethod  =  event.currentTarget.getAttribute('data-id');
        component.set('v.displayPaymentSection', true);  
        component.set('v.isCheque', paymentMethod); 
        component.set('v.claimApplicationWrapper.claimRecord.CTP_Payment_Method__c', paymentMethod); //Khush: DCR-5060
    },
    
    setPreferredEmail: function(component, event, helper) {
        var preferredEmail  =  event.getParam("value");
        console.log("preferredEmail: " + preferredEmail);
        if(preferredEmail == "Login Email"){
            component.set('v.alternateEmailChk', "Login Email"); 
        }else{
            component.set('v.alternateEmailChk', "Alternative Email"); 
        }
    },
    
    geolocate: function(component, event, helper) {
        helper.geolocateHelper(component, event);
    },
    
    initAutocomplete: function(component, event, helper) {
        helper.initAutocompleteHelper(component, event);
    },
    
    //DCR-4489
    showExitModalStage1 : function(component, event, helper) {
       // alert('modal show');
      component.set('v.isExitClickStage1', true); 
         
    },
    
    modalCancel : function(component, event, helper) {
		var modalCancel = component.find('myModal');
        $A.util.addClass(modalCancel, 'slds-hidden');
        component.set("v.isExitClickStage1", "false");
    },
    
    yesExitStage1 : function(component, event, helper) {
        //alert('yes sexit');
        var evt = $A.get("e.force:navigateToURL");
        if (evt) {
            evt.setParams({
                "url": '/'
            });
            evt.fire();
        } 
    },
     //DCR-4489//
    saveAndExitModal: function(component, event, helper) {
      //var action = component.get("c.saveDraftAndExit");
        
       //action.setCallback(this, function(response) {
          
           // if (response.getState() == "SUCCESS") {
               //var CreatedDateStamp = response.getReturnValue().CTP_Date_Claim_App_is_Created_in_the_Sys__c;
                //alert($A.localizationService.formatDate(CreatedDateStamp, "MMM DD YYYY, hh:mm:ss a"));
                var now = new Date();
                component.set("v.datetimeForModal", $A.localizationService.formatDate(now, "hh:mm a MMM DD, YYYY"));
           // }
        //});
       // $A.enqueueAction(action);
       
       
       
      component.set('v.isExitClickStageNot1', true); 
         
    },
    modalDraftCancel : function(component, event, helper) {
		var modalCancel = component.find('myModalDraft');
        $A.util.addClass(modalCancel, 'slds-hidden');
        component.set("v.isExitClickStageNot1", "false");
    },
    
    yesExitStageNot1 : function(component, event, helper) {
        //alert('yes sexit');
        var evt = $A.get("e.force:navigateToURL");
        if (evt) {
            evt.setParams({
                "url": '/'
            });
            evt.fire();
        } 
    },
	//Added as part of DCR-3634 Parul Start
    handleComponentEvent : function(component, event,helper) {
        console.log('inside action event>>>',component.get('v.caseRecordId')); 
         var category = component.get('v.category');
       console.log('category>>>',component.get('v.category'));
        helper.getSiteURL(component);
        helper.getAttachments(component.get('v.caseRecordId'),component,category);
       
   //Added as part of DCR-3634 Parul End
        
    },
	
    validateAccName: function(component, event,helper) {
        helper.validateAccNameHelper(component,event,helper );
    },
    validateBSB: function(component, event,helper) {
        helper.validateBSBHelper(component,event,helper );
    },
    validateAccNumber: function(component, event,helper) {
        helper.validateAccNumbereHelper(component,event,helper );
    },
    addHyphen: function(component, event,helper) {

        //var bsb = document.getElementsByClassName('bsbAcc')[0].interhtml;
        
        var bsb = component.find("bsb").get("v.value");
        if(bsb.length == '3'){
            bsb = bsb + '-';
            component.find("bsb").set("v.value",bsb );
        }

    },
    formatMedicare: function(component, event,helper) { 
        var medicare = component.find("CTP_Medicare_Number__c").get("v.value");
        if(medicare.length == '4'){
            medicare = medicare + ' ';
            component.find("CTP_Medicare_Number__c").set("v.value",medicare );
        }
        
        if(medicare.length == '10'){
            medicare = medicare + ' ';
            component.find("CTP_Medicare_Number__c").set("v.value",medicare );
        }

    },
     //DCR-3630
    accidentRole:function(component, event, helper) {
        
		helper.accidentRoleHelper(component,event,helper );       
       
    },
    
    
     handleClaimsHistoryEvent: function(component, event, helper){
        var index = event.getParam("index") - 1;
        var injuryMonth = event.getParam("injuryMonth");
        var injuryYear = event.getParam("injuryYear");
        
		var childClaimHistory = component.get("v.childClaimHistory");
		childClaimHistory.splice(index, 1);
		childClaimHistory.push({
            'sobjectType': 'CTP_Claim__c',
             
         })
		
	},
    
    displayFaultVehicleWarning: function(component, event, helper){
        var mostAtFaultVehicle  =  event.getParam("value");  
        if(mostAtFaultVehicle == "Yes"){
            component.set('v.mostAtFaultVehicleYes', true);
            component.set('v.mostAtFaultVehicleUnsure', false);
            component.set("v.claimApplicationWrapper.claimRecord.CTP_Most_at_Fault_Vehicle_Known__c",mostAtFaultVehicle);
            var registeredVehiclesList = component.get('v.vehicleRegistrations');
            console.log("registeredVehiclesList: " + registeredVehiclesList + "length: " + registeredVehiclesList.length);
    
            if(registeredVehiclesList.length == 0){
                component.set('v.vehicleRegistrationNotFound', true);
                component.set('v.vehicleRegistrationFound', false);
            }else{
                component.set('v.vehicleRegistrationNotFound', false);
                component.set('v.vehicleRegistrationFound', true);
                helper.loadVehicleRegs(component, event, helper);
            }
        }
        if(mostAtFaultVehicle == "Still being determined"){
            component.set('v.mostAtFaultVehicleYes', false);
            component.set('v.mostAtFaultVehicleUnsure', true);
            component.set("v.claimApplicationWrapper.claimRecord.CTP_Most_at_Fault_Vehicle_Known__c",mostAtFaultVehicle);
            var mostAtFaultVehicleUnsure = component.find("mostAtFaultVehicleUnsure");
            $A.util.removeClass(mostAtFaultVehicleUnsure, 'unsure');
        }
        if(mostAtFaultVehicle == "I am unsure"){
            component.set('v.mostAtFaultVehicleYes', false);
            component.set('v.mostAtFaultVehicleUnsure', true);
            component.set("v.claimApplicationWrapper.claimRecord.CTP_Most_at_Fault_Vehicle_Known__c",mostAtFaultVehicle);
            var mostAtFaultVehicleUnsure = component.find("mostAtFaultVehicleUnsure");
            $A.util.addClass(mostAtFaultVehicleUnsure, 'unsure');
        }
    },
    
    //Added as part of DCR-3634-Start-Method called for deleting attachment
    removeAttachment: function(component, event, helper) {
        console.log('inside remove attachment>>>');
         var uploadedFiles = component.get("v.attachmentList"); 
         var uploadedFilesTemp = new Array();
        //var index = 0;
        var files=[];
        //console.log('uploadedFiles>>>',uploadedFiles);
       //console.log('target id is -->',event	);
       // console.log('target id component is -->',component	);
       console.log('target id is -->', event.getSource().get("v.name"));
       //console.log('uploaded files-->',uploadedFiles.length);
        var caseId = component.get("v.caseRecordId");
        console.log('uploaded files are==>',uploadedFiles);
          if(uploadedFiles.length == 1){
             console.log('inside 1 length');
            component.set("v.attachmentList",uploadedFilesTemp[0]);
            helper.deleteAttachment(component,uploadedFiles[0].attachment.Id);
        }else{
            console.log('inside 1+ length');
            for(var i = 0; i < uploadedFiles.length; i++){
                
                if(uploadedFiles[i].attachment.Id != event.getSource().get("v.name"))
                {
                    console.log('id not matched for ==>',uploadedFiles[i].attachment);
                    //event.target.id
                    uploadedFilesTemp.push(uploadedFiles[i]);
                    //files.push({ fileName: uploadedFiles[i].fileName, category: uploadedFiles[i].category});
                   
                }
                else
                {
                    console.log('id matched for ==>',uploadedFiles[i].attachment);
                    
                    helper.deleteAttachment(component,uploadedFiles[i].attachment.Id);
                }
            }
            component.set("v.attachmentList",uploadedFilesTemp);
            //console.log(uploadedFilesTemp);
            console.log(component.get("v.attachmentList")); 
        } 
       
    },
    /*
     * DCR-2810
     * Ashish
     * Start
    */
    //AutoComplete functionality
    getHomeAddressAutoComplete : function(component, event, helper){
    	var homeAddress = component.get("v.homeAddress");
        if(homeAddress != undefined && homeAddress.length >= 5){
            console.log('finding action');
            helper.seachForAddress(component,homeAddress);
        }else{
            var searchLookup = component.find("searchLookup");
            $A.util.addClass(searchLookup, 'slds-combobox-lookup');
            $A.util.removeClass(searchLookup, 'slds-is-open');
        }
	},
    
    //Selected Place Functionality
    selectHomeAddress : function(component, event, helper){
        var placeId = event.currentTarget.dataset.placeid;
        var homeAddress = event.currentTarget.dataset.record;
        console.log('placeId selected is->',placeId);
        if(placeId != undefined && placeId != ''){
            var searchLookup = component.find("searchLookup");
            $A.util.addClass(searchLookup, 'slds-combobox-lookup');
            $A.util.removeClass(searchLookup, 'slds-is-open');
            helper.getDetailsForSelectedPlace(component, placeId, homeAddress);
        }
    },
    //typedHomeAddress Place Functionality
    typedHomeAddress : function(component, event, helper){
            var searchLookup = component.find("searchLookup");
            $A.util.addClass(searchLookup, 'slds-combobox-lookup');
            $A.util.removeClass(searchLookup, 'slds-is-open');
    },
    
    /*
     * DCR-2810
     * Ashish
     * End
    */
    
    
      /*
     * DCR-3651
     * Himani
     * Start
    */
    //location suggesssion for dropdown
    getAccidentAddressAutoComplete : function(component, event, helper){
        
        console.log("event.keyCode",event.keyCode);
    	//var homeAddress = component.get("v.homeAddress");
        var accidentAddress = document.getElementById("AccidentAddress").value;
        console.log('accidentAddress'+accidentAddress);
        console.log(component.get("v.predictionsForAccident").length);
        if(event.keyCode ===13 && component.get("v.predictionsForAccident").length >0){
           console.log(component.get("v.predictionsForAccident"));
    		var predictions = [];
            predictions= component.get("v.predictionsForAccident");
            if( predictions[0].place_id!=undefined &&predictions[0].place_id!= ''){
                console.log(predictions[0].place_id);
                var searchLookup = component.find("searchLookupForAccident");
                $A.util.addClass(searchLookup, 'slds-combobox-lookup');
                $A.util.removeClass(searchLookup, 'slds-is-open');
                helper.getDetailsForSelectedAccidentPlace(component, predictions[0].place_id);
            }
         
        }else{
            if(accidentAddress != undefined && accidentAddress.length >= 5){
                console.log('search address');
                helper.seachForAccidentAddress(component,accidentAddress);
            }else{
                // Reset to empty if address is removed 
                var claimApplicationWrapper = component.get('v.claimApplicationWrapper');
                claimApplicationWrapper.claimRecord.CTP_Accident_Co_Ordinates__c=undefined;
                claimApplicationWrapper.claimRecord.CTP_Accident_Postcode__c=undefined;
                claimApplicationWrapper.claimRecord.CTP_Accident_Street_Number__c=undefined;
                claimApplicationWrapper.claimRecord.CTP_Accident_Street__c=undefined;
                claimApplicationWrapper.claimRecord.CTP_Accident_Suburb__c=undefined;
                claimApplicationWrapper.claimRecord.CTP_Accident_State__c=undefined;//DCR-7751
                component.set("v.claimApplicationWrapper",claimApplicationWrapper); 
                
                var searchLookup = component.find("searchLookupForAccident");
                $A.util.addClass(searchLookup, 'slds-combobox-lookup');
                $A.util.removeClass(searchLookup, 'slds-is-open');
            }  
        }
        
	},
    
    //Selected Place Functionality
    selectAccidentAddress : function(component, event, helper){
        
        var placeId = event.currentTarget.dataset.placeid;
        console.log('placeId selected is->',placeId);
        if(placeId != undefined && placeId != ''){
            var searchLookup = component.find("searchLookupForAccident");
            $A.util.addClass(searchLookup, 'slds-combobox-lookup');
            $A.util.removeClass(searchLookup, 'slds-is-open');
            helper.getDetailsForSelectedAccidentPlace(component, placeId);
        }
    },
    
    
   
    /*
     * DCR-3651
     * Himani
     * End
    */
    
    
    
    isMostAtFaultVehicle : function(component, event, helper){
         var isMostAtFaultVehicle  =  event.getParam("value");
        console.log('isMostAtFaultVehicle>>',isMostAtFaultVehicle);
        if(isMostAtFaultVehicle == "No"){
            component.set('v.isMostAtFaultVehicle', true);
        }else{
            component.set('v.isMostAtFaultVehicle', false);
            //Added as pert of DCR-3649-Parul-Start
           var wrapperRecord = component.get("v.claimApplicationWrapper");
            console.log('vehicle list>>>',wrapperRecord.vehicleRecords);
            for(i=0; i < wrapperRecord.vehicleRecords.length;i++){
                wrapperRecord.vehicleRecords[i].CTP_Vehicle_At_Fault__c = true;
                console.log('wrapperRecord.vehicleRecords[i]>>',wrapperRecord.vehicleRecords[i].CTP_Vehicle_At_Fault__c);
            }
             //Added as pert of DCR-3649-Parul-End
        }
    },
    

    updateRegistrationList : function(component, event, helper){
    	helper.loadVehicleRegs(component, event);
        component.set("v.vehicleFoundPIE", false);
        component.set("v.vehicleNotFoundPIE", false);
        component.set("v.technicalIssuePIE", false);
    },

    
    //DCR-2836
    saveAsDraft :function(component, event, helper) {
       
        console.log('save as draft');
        helper.saveAsDraft(component);
        //saveSpinner, saveSpinnerMessage, applicationSavedMsg,saveButn
        var saveButtontag = component.find("saveButn");
        var saveSpinnerIcon = component.find("saveSpinner");
        var saveSpinnerMessageSpan = component.find("saveSpinnerMessage");
        var applicationSavedMsgSpan = component.find("applicationSavedMsg");
         $A.util.addClass(applicationSavedMsgSpan,"slds-hidden");
         $A.util.addClass(saveButtontag,"slds-hidden");
         $A.util.removeClass(saveSpinnerIcon,"slds-hidden");
         $A.util.removeClass(saveSpinnerMessageSpan,"slds-hidden");
                 
        
        window.setTimeout(
            $A.getCallback(function() {
                 $A.util.removeClass(saveButtontag,"slds-hidden");
                 $A.util.addClass(saveSpinnerIcon,"slds-hidden");
                 $A.util.addClass(saveSpinnerMessageSpan,"slds-hidden");
                 $A.util.removeClass(applicationSavedMsgSpan,"slds-hidden");
            }), 3000
   		 );
        
       
    },
    
    //Namrata - DCR-3628
    showTimeSelector : function(component, event, helper){
       component.set('v.timeSelector', true);
    	//Fix for DCR-6293
       var timeOfAccident = component.get('v.claimApplicationWrapper.claimRecord.CTP_Time_Of_Accident__c');
       if(timeOfAccident && timeOfAccident.indexOf('PM') > 0){
            helper.setPmBtnActive(component, event, helper);
        }
    },
    hideTimeSelector : function(component, event, helper){
       component.set('v.timeSelector', false);
    },
    increaseHour : function(component, event, helper){
        helper.increaseHour(component, event, helper);
    },
    decreaseHour : function(component, event, helper){
      	helper.decreaseHour(component, event, helper);
    }
    ,
    increaseMinute : function(component, event, helper){
       helper.increaseMinute(component, event, helper);
    },
    decreaseMinute : function(component, event, helper){
       helper.decreaseMinute(component, event, helper);
	},
    amBtnActive : function(component, event, helper){
       helper.amBtnActive(component, event, helper);
    },
    pmBtnActive : function(component, event, helper){
       helper.pmBtnActive(component, event, helper);
    },
       
    validateAccidentTime: function(component, event, helper){
        var wrapperRecord = component.get("v.claimApplicationWrapper");
       var timeOfAccodent = wrapperRecord.claimRecord.CTP_Time_Of_Accident__c;
       //var timeOfAccodent = component.get("v.timeOfAccident");
        var reqAccidentTime = component.find("reqAccidentTime");
        console.log('>>reqAccidentTime >>> '+reqAccidentTime);
        if(timeOfAccodent == ""){
            $A.util.removeClass(reqAccidentTime,"slds-hidden");
        }else{
            $A.util.addClass(reqAccidentTime,"slds-hidden");
            console.log('>>reqAccidentTime >>> '+JSON.stringify(reqAccidentTime));
            console.log('>>timeOfAccodent >>> '+timeOfAccodent);
        }
    },
    
    displayTimeWindow: function(component, event, helper){
        helper.displayTime(component, event, helper);
	},
    
    activateHourArrows: function(component, event, helper){
        var increaseHour = component.find("increaseHour");
        var decreaseHour = component.find("decreaseHour");
        $A.util.addClass(increaseHour,"active");
        $A.util.addClass(decreaseHour,"active");
    },
    
    deactivateHourArrows: function(component, event, helper){
        var increaseHour = component.find("increaseHour");
        var decreaseHour = component.find("decreaseHour");
        $A.util.removeClass(increaseHour,"active");
        $A.util.removeClass(decreaseHour,"active");
    },
    activateMinuteArrows: function(component, event, helper){
        var increaseHour = component.find("increaseMinute");
        var decreaseHour = component.find("decreaseMinute");
        $A.util.addClass(increaseHour,"active");
        $A.util.addClass(decreaseHour,"active");
    },
    deactivateMinuteArrows: function(component, event, helper){
        var increaseHour = component.find("increaseMinute");
        var decreaseHour = component.find("decreaseMinute");
        $A.util.removeClass(increaseHour,"active");
        $A.util.removeClass(decreaseHour,"active");
    },
    //End Namrata - DCR-3628
    
    //Khush: DCR-5060
    selectOne : function(component, event, helper){
        var vars  =  event.currentTarget.getAttribute('data-id').split(',');
        var boolFirst=component.get(vars[0]);
        if (!boolFirst){
            component.set(vars[0], true);
            for (var i=1;i<vars.length;i++){
        		component.set(vars[i], false);
            }
        }

    },
    
 //Added as part of DCR-3649 -Parul-Start
     callPIEIntMethod: function(component, event, helper){
        console.log('inside callPIEIntMethod in client controller>>>>>>',component.get('v.registrationNo'));
        var regNo = component.get('v.registrationNo');
        if(regNo != ''){
         var searchSpinnerIcon = component.find("searchSpinner");
         $A.util.removeClass(searchSpinnerIcon,"slds-hidden");
        
        window.setTimeout(
            $A.getCallback(function() {
                 $A.util.addClass(searchSpinnerIcon,"slds-hidden");
            }), 2000
   		 );
        helper.callPIEIntegration(component,regNo, event, helper);
        }
        else{
            component.set('v.vehicleFoundPIE',false);
            component.set('v.vehicleNotFoundPIE',false);
            //component.set('v.vehicleRegistrationNotFound',true);  
            component.set('v.technicalIssuePIE',false);
        }
        
        
	} 
    //Added as part of DCR-3649 -Parul-End
    ,
   	//Khushman: DCR-3177
    validateThis: function(component, event, helper) {
        helper.validateThis(component, event, helper, null);
        //alert('Leave it');
        /*
        var src=event.getSource();
        var locId=src.getLocalId();
		helper.validateElem(component, event, helper, locId, src, component.get('v.validationsMap') );
        */
    },

    /*
   	//Khushman: DCR-3177: Moved to Helper JS
 	validateAll: function(component, event, helper) {
    	var sucess = helper.validateAll(component, event, helper, component.get('v.validationsMap'));    
        //Custom Validation which utilit method cannot capture as of now.
        */
    	/* Khushman: Commenting as now it can cater
        if (component.get('v.claimApplicationWrapper.caseRecord.CTP_Preferred_Contact_Method__c')==null){
            $A.util.removeClass(component.find('noOfPasNotMentionedError'),'slds-hidden');
            success=false;
        } else {
            $A.util.addClass(component.find('noOfPasNotMentionedError'),'slds-hidden');
        }
		*/
    /*
		return success;
	},
	*/
    /* Namrata DCR-3945 Start */
    displaySketchInfo : function(component, event, helper) {
		var dataValue = event.currentTarget.getAttribute('data-id');
        console.log("dataValue: " + dataValue);
        var freehandSketch = component.find("freehandSketch");
        var freehandSketchLabel = component.find("freehandSketchLabel");
        var onlineSketch = component.find("onlineSketch");
        var onlineSketchLabel = component.find("onlineSketchLabel");
        
        
        if(dataValue == "freehandSketch"){
           $A.util.addClass(freehandSketchLabel,"active");
           $A.util.removeClass(onlineSketchLabel,"active");
           $A.util.addClass(freehandSketch,"displayContainer");
           $A.util.removeClass(onlineSketch,"displayContainer");
        }else{
           $A.util.removeClass(freehandSketchLabel,"active");
           $A.util.addClass(onlineSketchLabel,"active");
           $A.util.removeClass(freehandSketch,"displayContainer");
           $A.util.addClass(onlineSketch,"displayContainer");
        }
	},
    displayAccidentSketchPopUp : function(component, event, helper) {
        var accidentSketchPopUp = component.find("accidentSketchPopUp");
        $A.util.toggleClass(accidentSketchPopUp, 'displayPopUp');
        var freehandSketch = component.find("freehandSketch");
        var freehandSketchLabel = component.find("freehandSketchLabel");
        var onlineSketch = component.find("onlineSketch");
        var onlineSketchLabel = component.find("onlineSketchLabel");
        $A.util.removeClass(freehandSketchLabel,"active");
        $A.util.addClass(onlineSketchLabel,"active");
        $A.util.removeClass(freehandSketch,"displayContainer");
        $A.util.addClass(onlineSketch,"displayContainer");
    },
	/* Namrata DCR-3945 End */
    /*Vivek Start DCR-3661 */
    setCentrelinkBenefits: function(component, event, helper) {
        var centrelinkBenefits  =  event.getParam("value");
        if(centrelinkBenefits == "Yes"){
            component.set('v.centrelinkBenefitsYesNo', "Yes");
        }else{
            component.set('v.centrelinkBenefitsYesNo', "No");
            component.set('v.claimApplicationWrapper.claimRecord.CTP_Type_Of_Benefits_Received__c', "");
        }
        helper.validateThis(component, event, helper);   
    },
    validateBenefitType : function(component, event, helper) {
		helper.validateBenefitType(component, event, helper);
    }
    /*Vivek End DCR-3661 */
    /*Vivek Start DCR-3660 */
     ,displayAwayFromWorkForm: function(component, event, helper) {
        var isDisplayAwayFromWorkForm  =  event.getParam("value");
        if(isDisplayAwayFromWorkForm == "Yes"){
            component.set('v.isDisplayAwayFromWorkForm', true);
            helper.fetchPickListVal(component, 'Contact', 'CTP_Payment_Period_Primary__c', 'v.earningsPeriod',['--Select Earning Period--']);//DCR-3660 - Mohit
        }else{
            component.set('v.isDisplayAwayFromWorkForm', false);
            //DCR-5498 Himani
             helper.EmploymentDetailErase(component, event, helper);
        }
         helper.validateThis(component, event, helper);   
    },
    addEmploymentHistory: function(component, event, helper) {
  
        var employerHistory = component.get("v.employerHistory");
        console.log("length: " + employerHistory.length);
        if (employerHistory.length > 3){
            component.set("v.maxCountEmployerHistory", true);
        }else{
            component.set("v.maxCountEmployerHistory", false);
        }
        employerHistory.push(new Object());
        component.set("v.employerHistory", employerHistory);

    },
    
    removeEmploymentHistory: function(component, event, helper) {
        console.log('removeEmploymentHistory called');
        console.log('@@@index ---->' + event.getParam("indexVar"));
        var employerHistory = component.get("v.employerHistory");
        console.log("length before: " +employerHistory.length);
        component.set("v.maxCountEmployerHistory", false);
        if (employerHistory.length == 1) { /* reset values */
            console.log("element: " + JSON.stringify(employerHistory));            
            employerHistory = [{"injuryYear":"","injuryMonth":"","CTP_Previous_Insurer_1__c":"Select Insurer","CTP_Previous_Claim_Number_1__c":""}];
			component.set("v.employerHistory", employerHistory);
        }
        if (employerHistory.length > 1) {
            var index = event.getParam("indexVar") - 1;
            console.log('@index ---->' + index);
            employerHistory.splice(index, 1);
            component.set("v.employerHistory", employerHistory);
        }
       
        console.log("length after: " +component.get("v.employerHistory").length);
    }, 
    /*Vivek End DCR-3660 */
    goToClaimDetailsEdit : function(component, event, helper) {
                var ctarget = event.currentTarget;
                var id_str = ctarget.dataset.value;
         		var step = Number(id_str);
                component.set('v.step', step);
                // Load picklist values for respective step
        		helper.loadStepPickList(component, event, helper, step);
		        var elementId = ctarget.dataset.elementId;
        		var elmnt = component.find(elementId);
            	elmnt.scrollIntoView();        
    },
    /*Vivek Start DCR-3659 */
    displayPreviousInjuries: function(component, event, helper) {
   		 
        if(component.get('v.claimApplicationWrapper.claimRecord.CTP_Previous_Illness_or_Injury__c') =='Yes'){
            var previousInjuriesHistory = component.get("v.previousInjuriesHistory");
            if(!previousInjuriesHistory || previousInjuriesHistory.length == 0){
                previousInjuriesHistory.push(new Object());
                component.set("v.previousInjuriesHistory", previousInjuriesHistory); 
            }
        }
    },
    
    addPreviousInjury: function(component, event, helper) {
         var previousInjuriesHistory = component.get("v.previousInjuriesHistory");
       	previousInjuriesHistory.push(new Object());
        component.set("v.previousInjuriesHistory", previousInjuriesHistory); 
    },
  
    /* Commented by Sridevi to fix the issues DCR-3659 (Related to backend record deletions)
     removePrevInjuryItem: function(component, event, helper) {
        	
        var previousInjuriesHistory = component.get("v.previousInjuriesHistory");
        console.log("length before: " +previousInjuriesHistory.length);
         if (previousInjuriesHistory.length == 1) { /* reset values 
            previousInjuriesHistory[0]=new Object();
            console.log("element: " + JSON.stringify(previousInjuriesHistory));            
 			component.set("v.previousInjuriesHistory", previousInjuriesHistory);
        }
        if (previousInjuriesHistory.length > 1) {
            var index = event.getParam("indexVar") - 1;
            console.log('@index ---->' + index);
            previousInjuriesHistory.splice(index, 1);
            component.set("v.previousInjuriesHistory", previousInjuriesHistory);
        } 
     },*/
    
     /*Vivek End DCR-3659 */
    //Added by Sridevi to fix DCR-3659 (Related to backend record deletions)
    removePrevInjuryItem: function(component, event, helper) {
        var prevInjuriesHist = component.get("v.previousInjuriesHistory");        
        var index = event.getSource().get("v.indexVar");
        console.log("index", index);        
        if (prevInjuriesHist.length > 0) {
            prevInjuriesHist.splice(index, 1);
            component.set("v.previousInjuriesHistory", prevInjuriesHist);
        }
        if (prevInjuriesHist.length == 0) {    
            prevInjuriesHist.push(new Object());
            component.set("v.previousInjuriesHistory", prevInjuriesHist); 
        }
     },
      /*Namrata DCR-3655 Start */
     receivedTreatment: function(component, event, helper) {
        var receivedTreatment  =  event.getParam("value");
        if(receivedTreatment != "No"){
            component.set('v.DisplayReceivedTreatmentForm', true);
            setTimeout(function(){ 
                var dischargeDate=component.find('dischargeDate');
                dischargeDate.set('v.placeholder','DD/MM/YYYY');
            }, 100);
        }else{
            component.set('v.DisplayReceivedTreatmentForm', false);
        }
         component.set('v.claimApplicationWrapper.claimRecord.CTP_Treatment_Rec_At_Hosp_Post_Accident__c', receivedTreatment);
    },
    
    setHospitalName : function(component, event, helper){
        helper.validateHospitalName(component, event, helper);
    },
    
    dischargedFromHospital: function(component, event, helper) {
        var discharged  =  event.getParam("value");
        if(discharged == "Yes"){
             component.set('v.claimApplicationWrapper.claimRecord.CTP_Discharged_From_Hospital__c', 'Yes');
            setTimeout(function(){ 
                var dischargeDate=component.find('dischargeDate');
                dischargeDate.set('v.placeholder','DD/MM/YYYY');
            }, 100);
        }else{
             component.set('v.claimApplicationWrapper.claimRecord.CTP_Discharged_From_Hospital__c', 'No');
        }
    },
    
    
    setAmbulanceServices : function(component, event, helper){
       /* var ambOptions  =  event.getParam("value"); 
        if(ambOptions!=''){
       		component.set('v.claimApplicationWrapper.claimRecord.CTP_Ambulance_Used__c', ambOptions);
        	console.log(">> ambulanceOptions >> "+component.get("v.claimApplicationWrapper.claimRecord.CTP_Ambulance_Used__c"));
        }*/
        var receivedTreatment  =  event.getParam("value");
        console.log('receivedTreatment^^^^'+receivedTreatment);
        component.set('v.claimApplicationWrapper.claimRecord.Ambulance_Service_Received__c ', receivedTreatment);
    },
    
    takenToHospitalInAmbulance: function(component, event, helper) {
       /* var takenToHospitalInAmbulance  =  event.getParam("value");
        if(takenToHospitalInAmbulance == "Yes"){
            component.set('v.DisplayAmbulancePickList', true);
            component.set("v.claimApplicationWrapper.claimRecord.CTP_Ambulance_Used__c",takenToHospitalInAmbulance);
        }else{
            component.set('v.DisplayAmbulancePickList', false);
            component.set("v.claimApplicationWrapper.claimRecord.CTP_Ambulance_Used__c",takenToHospitalInAmbulance);
        }*/
        //DCR-4173
        helper.takenToHospitalInAmbulanceHelper(component, event, helper);
    },
    /*Namrata DCR-3655 End */
    
    
    
    /*Namrata DCR-3603 Start */
    expandAll : function(component, event, helper) {
        //console.log("expandAll: " + component.get("v.isOpen"));
        var expandAll = component.find("expandAll");
        var collapseAll = component.find("collapseAll");
        $A.util.toggleClass(collapseAll, "collapse");
        $A.util.toggleClass(expandAll, "toggle");
        component.set("v.isOpenClaimDetailsSection", true);
        component.set("v.isOpenClaimantDetailsSection", true);
        component.set("v.isOpenAccidentDetails1Section", true);
        component.set("v.isOpenAccidentDetails2Section", true);
        component.set("v.isOpenHealthDetailsSection", true);
        component.set("v.isOpenEmploymentDetailsSection", true);
        component.set("v.isOpenAdditionalDocSection", true);
    },
    collapseAll : function(component, event, helper) {
        //console.log("expandAll: " + component.get("v.isOpen"));
        var expandAll = component.find("expandAll");
        var collapseAll = component.find("collapseAll");
        $A.util.toggleClass(expandAll, "toggle");
        $A.util.toggleClass(collapseAll, "collapse");
        component.set("v.isOpenClaimDetailsSection", false);
        component.set("v.isOpenClaimantDetailsSection", false);
        component.set("v.isOpenAccidentDetails1Section", false);
        component.set("v.isOpenAccidentDetails2Section", false);
        component.set("v.isOpenHealthDetailsSection", false);
        component.set("v.isOpenEmploymentDetailsSection", false);
        component.set("v.isOpenAdditionalDocSection", false);
    },
    /*Namrata DCR-3603 End */
    
    /*Namrata DCR-2588 Start */
    validateFinalDeclarationName: function(component, event, helper) {
        helper.validateFinalDeclarationNameHelper(component, event, helper);
    },
    validateFinalDeclarationOnBehalfName: function(component, event, helper) {
        helper.validateFinalDeclarationNameOnBehalfHelper(component, event, helper);
    },
    
    /*Namrata DCR-2588 End */
     /*Vivek DCR-3655 Start */
    validateDischargeDate: function(component, event, helper) {
        helper.resetInValidDate(component, event, helper, 'dischargeDate', 'v.claimApplicationWrapper.claimRecord.CTP_Date_Of_Discharge__c');
        helper.validateDischargeDate(component, event, helper);
    },
    /*Vivek DCR-3655 End */
    
    /*Namrata DCR-3901 Start */
    submitApplication: function(component, event, helper) {
        helper.assignConsentforsurvey(component, event, helper);//added by shilpa
       var success = helper.validateAll(component, event, helper, component.get('v.validationsMap')[component.get('v.step')]);
        if(success){
        	helper.submitApplicationHelper(component, event, helper);
        }
    },
    closeVehicleNotFoundPIEModal : function(component, event, helper) {
		var modalClose = component.find('modalVehicleNotFoundPIE');
        $A.util.addClass(modalClose, 'slds-hidden');
        component.set("v.submitVehicleNotFoundPIE", false);
        helper.scrollToTop(component, event, helper);
    },
    
    closeRegularSubmitModal: function(component, event, helper) {
		var modalClose = component.find('modalRegularSubmit');
        $A.util.addClass(modalClose, 'slds-hidden');
        component.set("v.regularSubmitApplication", false);
        helper.scrollToTop(component, event, helper);
    },
    closeRejectPIESearchModal: function(component, event, helper) {
		var modalClose = component.find('modalRejectPIESearch');
        $A.util.addClass(modalClose, 'slds-hidden');
        component.set("v.submitRejectPIESearch", false);
        helper.scrollToTop(component, event, helper);
    },
    closeVehicleNotSpecifiedModal: function(component, event, helper) {
		var modalClose = component.find('modalVehicleNotSpecified');
        $A.util.addClass(modalClose, 'slds-hidden');
        component.set("v.submitVehicleNotSpecified", false);
        helper.scrollToTop(component, event, helper);
    },
    
    goToSubmitApplicationModal: function(component, event, helper){
        component.set("v.submitVehicleNotSpecified", false);
        component.set("v.submitRejectPIESearch", false);
        component.set("v.submitVehicleNotFoundPIE", false);
        component.set("v.regularSubmitApplication", true);
    },
    /*DCR-4579 Start Vivek*/
   goToSubmitModal: function(component, event, helper){
         helper.closeRegularSubmitModal(component, event, helper);
		 helper.callSubmitIntegration(component, event, helper);
         helper.saveRecord(component,helper);
		 helper.callPDFGeneration(component, event, helper);/*DCR-6354*/
   },
    cancelSubmitStatus: function(component, event, helper){
         component.set('v.submitStatusDialog', false); 
    },
    /*DCR-4579 End Vivek*/
    /*Namrata DCR-3901 End */
    goToAttachmentpreview: function(component, event, helper) {
        
        var filename = event.currentTarget.getAttribute('data-id');
        var caseId = component.get('v.caseRecordId');
        console.log('---->' + filename + ' ::----->' + caseId);
        helper.getAttachmentId(component, event, filename,caseId );
        
    },
    
    /*Namrata DCR-3721 Start */
     closeSubmittedToCTPAssistModal: function(component, event, helper) {
		var modalClose = component.find('modalsubmittedToCTPAssist');
        $A.util.addClass(modalClose, 'slds-hidden');
        component.set("v.submittedToCTPAssist", false);
    },
     /*Namrata DCR-3721 End */
    
    /*Namrata DCR-4139 Start */
     closeSubmittedToCTPAssistNoInsurerAssignedModal: function(component, event, helper) {
		var modalClose = component.find('modalSubmittedToCTPAssistNoInsurerAssigned');
        $A.util.addClass(modalClose, 'slds-hidden');
        component.set("v.submittedToCTPAssistNoInsurerAssigned", false);
    },
    /*Namrata DCR-4139 End */
    
    /*Namrata DCR-3902 Start */
     closeSubmittedToCTPAssistInsurerAssignedModal: function(component, event, helper) {
		var modalClose = component.find('modalSubmittedToCTPAssistInsurerAssigned');
        $A.util.addClass(modalClose, 'slds-hidden');
        component.set("v.submittedToCTPAssistInsurerAssigned", false);
    },
    
    goToViewApplication : function(component, event, helper) {
        var evt = $A.get("e.force:navigateToURL");
        if (evt) {
            evt.setParams({
                "url": '/claimlandingpage'
            });
            evt.fire();
        } 
    },
    /*Namrata DCR-3902 End */
 
    /*Namrata DCR-4322 Start */
	relationshipToClaimant: function(component, event, helper) {
       var relationOther = event.getSource().get('v.value'); 
        if(relationOther == "Other"){
            component.set("v.otherRelationshipToClaimant", true);
        }else{
            component.set("v.otherRelationshipToClaimant", false);
        }
    },
    
    setCorrespondence: function(component, event, helper){
        var correspondenceValue  =  event.getParam("value");
        
        if(correspondenceValue == 'Yes'){
            //component.set("v.correspondence", correspondenceValue);
            component.set("v.claimApplicationWrapper.caseRecord.CTP_Correspondence__c","Representative Only");       
        }else{
           // component.set("v.correspondence", correspondenceValue);
            component.set("v.claimApplicationWrapper.caseRecord.CTP_Correspondence__c","Both"); 
        }
    },
    
    displayRepresentativeForm: function(component, event, helper) {
        var displayRepresentativeForm  =  event.getParam("value");
        if(displayRepresentativeForm == "Yes"){
        	component.set("v.isRepresentative", "Yes");
            helper.fetchPickListVal(component, 'Case', 'CTP_Preferred_Contact_time__c', 'repPreferredTime', null);
            //helper.fetchPickListVal(component, 'Case', 'CTP_Language__c', 'repPreffredlanguage', null);
            /*DCR5939*/helper.getDynmLangValues(component, event, helper);
            helper.fetchPickListVal(component, 'Case', 'CTP_Rep_Type__c', 'representativeType', ['Select representative type']);
            var action = component.get("c.currentUserContact");
            action.setCallback(this, function(response) {
                var state = response.getState();
                console.log('state is::: '+state);
                if (state === "SUCCESS"){ 
                    var submitter = response.getReturnValue();
                    component.set("v.claimApplicationWrapper.caseRecord.CTP_RepresentativeContact__c", submitter.ContactId);
                }
            });
			$A.enqueueAction(action);
        }else{
            component.set("v.isRepresentative", "No");
            helper.fetchPickListVal(component, 'Case', 'CTP_Preferred_Contact_time__c', 'repOtherPreferredTime', null);
            /*DCR5939*///helper.fetchPickListVal(component, 'Case', 'CTP_Language__c', 'repOtherPreffredlanguage', null);
            /*DCR5939*/helper.getDynmLangValues(component, event, helper);
            
            //DCR-3755/DCR-4487 Code: Upendra
            helper.fetchPickListVal(component, 'Case', 'CTP_Rep_Type__c', 'representativeType', ['Select representative type']);
            /*DCR5939*///helper.getDynmLangValues(component, event, helper);
        }
    },
      /*Namrata DCR-4322 End */
    onRepresentativeTypeChange : function(component, event, helper) {
       var relationOther = event.getSource().get('v.value');
        console.log('>>>> Relation Other >>> '+relationOther);
        if(relationOther == "Other"){
            component.set("v.isRepresentativeTypeOther", true);
        }else{
            component.set("v.isRepresentativeTypeOther", false);
        }
    },
    
    /* Namrata DCR-5477 Start */
    requireRepresentativeHelp:function(component, event, helper) {
       component.set("v.requireRepresentativeHelp", true);
 	},
    
    closeRequireRepresentativeHelpModal:function(component, event, helper) {
       component.set("v.requireRepresentativeHelp", false);
 	},
    
    mostAtFaultHelp:function(component, event, helper) {
       component.set("v.mostAtFaultHelp", true);
 	},
    
    closeMostAtFaultHelpModal:function(component, event, helper) {
       component.set("v.mostAtFaultHelp", false);
 	},
    
    preferredContactHelp:function(component, event, helper) {
       component.set("v.preferredContactHelp", true);
 	},
    
    closePreferredContactHelpModal:function(component, event, helper) {
       component.set("v.preferredContactHelp", false);
 	},
    
    policeEventNumberHelp:function(component, event, helper) {
       component.set("v.policeEventNumberHelp", true);
 	},
    
    closePoliceEventNumberHelpModal:function(component, event, helper) {
       component.set("v.policeEventNumberHelp", false);
 	},
    medicareHelp:function(component, event, helper) {
       component.set("v.medicareHelp", true);
 	},
    
    closeMedicareHelpModal:function(component, event, helper) {
       component.set("v.medicareHelp", false);
 	},
    /* Namrata DCR-5477 End */
  	/*DCR-5645*/
    //Description: Changes made to allow users to download Claimant Declaration Form 
    goToClaimaintDeclarationForm:function(component, event, helper){
        console.log('Inside goToClaimaintDeclarationForm');
		var gotoURL = new URL(window.location);
        var gotoURL= "/public/apex/CTP_PDFClaimantDeclarationForm";
        window.open(gotoURL,'_blank');
    },
     displayManualAddress: function(component, event, helper) {
       var isDisplayManualAddress = component.get("v.isDisplayManualAddress");
       component.set("v.isDisplayManualAddress", !isDisplayManualAddress);
 	},
     displayManualAccidentAddress: function(component, event, helper) {
       var claimApplicationWrapper = component.get("v.claimApplicationWrapper");
         claimApplicationWrapper.claimRecord.CTP_Accident_State__c = "NSW";//DCR-7751
         claimApplicationWrapper.claimRecord.CTP_Accident_Co_Ordinates__c = "0.0";
         claimApplicationWrapper.claimRecord.CTP_Accident_Street_Number__c = null;//DCR-7941
         component.set("v.claimApplicationWrapper",claimApplicationWrapper);
         component.set("v.isDisplayManualAccidentAddress", true);
          component.set("v.DataMissingAttr", false);//By Himani
 	},
     displayAutosuggetAccidentAddress: function(component, event, helper) {
       var claimApplicationWrapper = component.get("v.claimApplicationWrapper");
         claimApplicationWrapper.claimRecord.CTP_Accident_Co_Ordinates__c = undefined;
         component.set("v.claimApplicationWrapper",claimApplicationWrapper);
         component.set("v.isDisplayManualAccidentAddress", false);
 	},
    validateClaimantDob: function(component, event, helper) {
       helper.resetInValidDate(component, event, helper, 'claimantDob', 'v.claimApplicationWrapper.caseRecord.CTP_Date_of_birth__c');
       helper.validateClaimantDob(component, event, helper);
    },
    displayRepresentativeOnBehalfForm: function(component, event, helper) {
         var displayRepresentativeOnBehalfForm  =  event.getParam("value");
        if(displayRepresentativeOnBehalfForm == "Yes"){
        	component.set("v.displayRepresentativeOnBehalfForm", "Yes");
        }else{
            component.set("v.displayRepresentativeOnBehalfForm", "No");
        }
    },
     /* DCR-7715 Namrata start */
    displayRepresentativeMyselfForm: function(component, event, helper) {
         var displayRepresentativeMyselfForm  =  event.getParam("value");
        if(displayRepresentativeMyselfForm == "Yes"){
        	component.set("v.displayRepresentativeMyselfForm", "Yes");
            helper.fetchPickListVal(component, 'Case', 'CTP_Preferred_Contact_time__c', 'repOtherPreferredTime', null);
            helper.fetchPickListVal(component, 'Case', 'CTP_Rep_Type__c', 'representativeType', ['Select representative type']);
        }else{
            component.set("v.displayRepresentativeMyselfForm", "No");
        }
    },
    validatedob:function(component, event, helper) {
        helper.resetInValidDate(component, event, helper, 'date1', 'v.claimApplicationWrapper.userRecord.CTP_Date_Of_Birth__c');
    },
    validateAccidentDate:function(component, event, helper) {
        helper.resetInValidDate(component, event, helper, 'acidentDate', 'v.claimApplicationWrapper.claimRecord.CTP_AccidentDate__c');
    } 
    /* DCR-7715 Namrata end */
})