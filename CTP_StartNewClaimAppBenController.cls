/********************************************************************
// DCR-3587... : Claimant completes the Claim Details page of online form 
// Purpose             :  Cotroller of CTP_StartNewClaimApp component
// Author               :  Khushman Deomurari
//********************************************************************/

public without sharing class CTP_StartNewClaimAppBenController {
    
    
/********************************************************************************
// DCR-3592             : Getting User record Based on user login 
//                        (UCD details correct)-SPRINT-8
// Purpose              : OLCS - Personal Information Pre-Population from User object.
//                        
// Modified on          : 28/12/2017   

// Developer            : JanardanReddy                   
//*******************************************************************************/
    
    @AuraEnabled
    public static User getUserRecords(){
        
      User userlist= [SELECT AboutMe,AccountId,Address,Alias,BadgeText,BannerPhotoUrl,CallCenterId,City,CommunityNickname,CompanyName,ContactId,Country,CreatedById,CreatedDate,CTP_Address__c,CTP_Date_Of_Birth__c,CTP_DisputeCategory__c,CTP_DisputeType__c,CTP_Do_you_have_a_disability__c,CTP_Do_you_require_an_Interpreter__c,CTP_Gender__c,CTP_HaveDisability__c,CTP_InjuryModule__c,CTP_Interpreter__c,CTP_Opt_Out_of_Case_Email_Updates__c,CTP_Postcode__c,CTP_Region__c,CTP_Speciality__c,CTP_State__c, CTP_User_State__c,CTP_Street_Number__c,CTP_Street__c,CTP_Suburb__c,CTP_TreatmentType__c,CTP_UnitNumber__c,DefaultGroupNotificationFrequency,DelegatedApproverId,Department,DigestFrequency,Division,Email,EmailEncodingKey,EmailFormula__c,EmailPreferencesAutoBcc,EmailPreferencesAutoBccStayInTouch,EmailPreferencesStayInTouchReminder,EmployeeNumber,Extension,Fax,FederationIdentifier,FirstName,ForecastEnabled,FullPhotoUrl,GeocodeAccuracy,Id,IPM_Website__c,IsActive,IsExtIndicatorVisible,IsPortalEnabled,IsPortalSelfRegistered,IsPrmSuperUser,IsProfilePhotoActive,LanguageLocaleKey,LastLoginDate,LastModifiedById,LastModifiedDate,LastName,LastPasswordChangeDate,LastReferencedDate,LastViewedDate,Latitude,LocaleSidKey,Longitude,Loop__dsPassword__c,Loop__dsToken__c,Loop__LOOPlus_Tester__c,ManagerId,MediumBannerPhotoUrl,
                              MediumPhotoUrl,MobilePhone,Name,OfflinePdaTrialExpirationDate,OfflineTrialExpirationDate,
                         Phone,PortalRole,PostalCode,CTP_Country__c,ProfileId,PublicEmail__c,PublicPhone__c,ReceivesAdminInfoEmails,ReceivesInfoEmails,SenderEmail,SenderName,Signature,SignatureID__c,SmallBannerPhotoUrl,SmallPhotoUrl,State,StayInTouchNote,StayInTouchSignature,StayInTouchSubject,Street,SystemModstamp,TimeZoneSidKey,Title,Username,UserPermissionsAvantgoUser,UserPermissionsCallCenterAutoLogin,UserPermissionsChatterAnswersUser,UserPermissionsInteractionUser,UserPermissionsKnowledgeUser,UserPermissionsLiveAgentUser,UserPermissionsMarketingUser,UserPermissionsMobileUser,UserPermissionsOfflineUser,UserPermissionsSFContentUser,UserPermissionsSupportUser,UserPreferencesActivityRemindersPopup,UserPreferencesApexPagesDeveloperMode,UserPreferencesCacheDiagnostics,UserPreferencesContentEmailAsAndWhen,UserPreferencesContentNoEmail,UserPreferencesCreateLEXAppsWTShown,UserPreferencesDisableAllFeedsEmail,UserPreferencesDisableBookmarkEmail,UserPreferencesDisableChangeCommentEmail,UserPreferencesDisableEndorsementEmail,UserPreferencesDisableFileShareNotificationsForApi,UserPreferencesDisableFollowersEmail,UserPreferencesDisableLaterCommentEmail,UserPreferencesDisableLikeEmail,UserPreferencesDisableMentionsPostEmail,UserPreferencesDisableMessageEmail,UserPreferencesDisableProfilePostEmail,UserPreferencesDisableSharePostEmail,UserPreferencesDisCommentAfterLikeEmail,UserPreferencesDisMentionsCommentEmail,UserPreferencesDisProfPostCommentEmail,UserPreferencesEnableAutoSubForFeeds,UserPreferencesEventRemindersCheckboxDefault,UserPreferencesExcludeMailAppAttachments,UserPreferencesFavoritesShowTopFavorites,UserPreferencesFavoritesWTShown,UserPreferencesGlobalNavBarWTShown,UserPreferencesGlobalNavGridMenuWTShown,UserPreferencesHideBiggerPhotoCallout,UserPreferencesHideChatterOnboardingSplash,UserPreferencesHideCSNDesktopTask,UserPreferencesHideCSNGetChatterMobileTask,UserPreferencesHideEndUserOnboardingAssistantModal,UserPreferencesHideLightningMigrationModal,UserPreferencesHideS1BrowserUI,UserPreferencesHideSecondChatterOnboardingSplash,UserPreferencesHideSfxWelcomeMat,UserPreferencesLightningExperiencePreferred,UserPreferencesPathAssistantCollapsed,UserPreferencesPreviewLightning,UserPreferencesRecordHomeReservedWTShown,UserPreferencesRecordHomeSectionCollapseWTShown,UserPreferencesReminderSoundOff,UserPreferencesShowCityToExternalUsers,UserPreferencesShowCityToGuestUsers,UserPreferencesShowCountryToExternalUsers,UserPreferencesShowCountryToGuestUsers,UserPreferencesShowEmailToExternalUsers,UserPreferencesShowEmailToGuestUsers,UserPreferencesShowFaxToExternalUsers,UserPreferencesShowFaxToGuestUsers,UserPreferencesShowManagerToExternalUsers,UserPreferencesShowManagerToGuestUsers,UserPreferencesShowMobilePhoneToExternalUsers,UserPreferencesShowMobilePhoneToGuestUsers,UserPreferencesShowPostalCodeToExternalUsers,UserPreferencesShowPostalCodeToGuestUsers,UserPreferencesShowProfilePicToGuestUsers,UserPreferencesShowStateToExternalUsers,UserPreferencesShowStateToGuestUsers,UserPreferencesShowStreetAddressToExternalUsers,UserPreferencesShowStreetAddressToGuestUsers,UserPreferencesShowTitleToExternalUsers,UserPreferencesShowTitleToGuestUsers,UserPreferencesShowWorkPhoneToExternalUsers,UserPreferencesShowWorkPhoneToGuestUsers,UserPreferencesSortFeedByComment,UserPreferencesTaskRemindersCheckboxDefault,UserRoleId,UserType FROM User  where Id=:Userinfo.getUserId()];
                system.debug('userlist :::::'+userlist );
        if(userlist.Id!=null) 
        return userlist ;
        
       else
        return null;
    }
    
    
   /********************************************************************************
// DCR-3592             : Getting Picklistvalues. 
//                        (UCD details correct)-SPRINT-8
// Purpose              : OLCS - Personal Information Pre-Population
//                       
// Modified on          : 28/12/2017   

// Developer            : JanardanReddy                   
//*******************************************************************************/  
    @AuraEnabled
    public static List < String > getselectOptions(sObject objObject, string fld) { //Khush:Passing sObject instead of String to avoid calling Schema.getGlobalDescribe()
        system.debug('objObject --->' + objObject);
        system.debug('fld --->' + fld);
        List < String > allOpts = new list < String > ();
        // Get the object type of the SObject.
        Schema.sObjectType objType = objObject.getSObjectType();
     
        // Describe the SObject using its object type.
        Schema.DescribeSObjectResult objDescribe = objType.getDescribe();
     
        // Get a map of fields for the SObject
        map < String, Schema.SObjectField > fieldMap = objDescribe.fields.getMap();
     
        // Get the list of picklist values for this field.
        list < Schema.PicklistEntry > values =
        fieldMap.get(fld).getDescribe().getPickListValues();
     
         // Add these values to the selectoption list.
        for (Schema.PicklistEntry a: values) {
                allOpts.add(a.getValue());
            }
        system.debug('allOpts ---->' + allOpts);
       // allOpts.sort();
        return allOpts;
    }
    
    
    //********************************************************************
    // DCR-1332 : Claimant submits an application from the public portal 
    //            (UCD details correct)-SPRINT-3
    // Purpose : Common Method for fetching User Interpreter Data 
    //           public/Insurer (Subhajit)
    //********************************************************************
    @AuraEnabled
    public static List<String> getUserInterpreterData()
    {
        List<String> options = new List<String>();
        Schema.DescribeFieldResult fieldResult = User.CTP_Interpreter__c.getDescribe();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        for (Schema.PicklistEntry f: ple) {
            options.add(f.getLabel());
        }
        
        return options;
    }
    //Method Added as part of DCR-3634 to retrieve all attachments associated to case
    @AuraEnabled
    public static Map<Id,Attachment__c> getAttachments(String caseId,String category){
         Map<Id,Attachment__c> attachMap;
        system.debug('category>>>'+category);
        try{
        attachMap= new Map<Id,Attachment__c>([SELECT id, FileName__c,Description__c,CTP_View_Attachment__c,CTP_View_Attachment_Appl__c,CategoryA__c FROM Attachment__c WHERE Case__c =:caseId AND CategoryA__c=:category]);
        //System.debug('@@@@attachItemList --->'+JSON.serializePretty(attachItemList)); 
        System.debug('@@@@attachMap --->'+attachMap); 
        }
        catch(Exception e){
            system.debug('Error>>>'+e.getMessage());
        }
        return attachMap;
    }
    
     //Method Added as part of DCR-3634 to retrieve all attachments associated to case
    @AuraEnabled
    public static Map<Id,Attachment__c> getAttachmentsFromCaseId(String caseId){
        Map<Id,Attachment__c> attachMap;
       
        try{
        attachMap= new Map<Id,Attachment__c>([SELECT id, FileName__c,Description__c,CTP_View_Attachment__c,CTP_View_Attachment_Appl__c,CategoryA__c FROM Attachment__c WHERE Case__c =:caseId]);
        //System.debug('@@@@attachItemList --->'+JSON.serializePretty(attachItemList)); 
        System.debug('@@@@attachMap in caseId --->'+attachMap); 
        }
        catch(Exception e){
            system.debug('Error>>>'+e.getMessage());
        }
        return attachMap;
    }
     //Method Added as part of DCR-3634 to retrieve site url for accessing the attachment
     @AuraEnabled
   
    public static String getSiteURL(){
      if(!Test.isRunningTest()){ 
      String ntwrkId = Network.getNetworkId();
      ConnectApi.Community comm = ConnectApi.Communities.getCommunity(ntwrkId);
      System.debug(comm.siteUrl);
        return comm.siteUrl;
    }
        return null;
 }
    //Khushman
    /* No more required
    @AuraEnabled
    public static List<String> getInsurerValues(){
           List<String> previousInsurerValues=new List<String>();
           Schema.DescribeFieldResult fieldResult = CTP_Claim__c.CTP_Previous_Insurer_1__c.getDescribe();
           List<Schema.PicklistEntry> values = fieldResult.getPicklistValues();
           for( Schema.PicklistEntry v : values) {
               System.debug('Picklist Value Label:' + v.getLabel());
               System.debug('Picklist API Name:' + v.getValue());
               previousInsurerValues.add(v.getLabel());
           }
        return previousInsurerValues;
    }
    */
    
    //Khushman
    @AuraEnabled
    public static boolean saveCaseAndClaim(Case cse, CTP_Claim__c clm){
        return false;
    }
    
     @AuraEnabled
    public static case saveDraftAndExit(){
        return [select id, CTP_Date_Claim_App_is_Created_in_the_Sys__c,createdDate from case limit 1];
    }
    
    //Method added as part of DCR-3634 -Parul-Start
     @AuraEnabled
    public static String deleteAttachmentFromServer(String attachmentId) {
        try {
            if(!Test.isRunningTest()){
            DRS_CaseService.removeAttachment(attachmentId.trim());
            }
        }
        catch (Exception excep) {
            return DRS_GlobalUtility.handleAuraException(excep, 'DRS_CaseItemForm_CC', 'removeAttachment');
        }
        return 'Success';
    }
     //Method added as part of DCR-3634 -Parul-End
    /* 
     * Purpose: Wrapper class to hold Claim, User, Case and Injury records data from Portal
     * Author: Ashish
     * Modified on: 15-Jan-2018
     * JIRA# : DCR-3587 : [MAIN] OLCS - Claimant completes the Claim Details page of online form, Sprint-9
     * 
     * Modified on: 25-Jan-2018
     * JIRA# : DCR-4866 : Changing InjuryTreatment property to List<>, since user can enter one or more
  */
    public class CTP_ClaimApplicationWrapper{
        @AuraEnabled public Case caseRecord;
        @AuraEnabled public CTP_Claim__c claimRecord;
        @AuraEnabled public User userRecord;
      
        
        //@AuraEnabled public CTP_Injury_Treatment__c injuryRecord;
        @AuraEnabled public List <CTP_Injury_Treatment__c> injuryRecordList;
        @AuraEnabled public List <CTP_Injury_Treatment__c> preInjuryRecordList;
        @AuraEnabled public List <CTP_Injury_Treatment__c> treatmentRecordList;
        @AuraEnabled public List<CTP_Vehicle__c> vehicleRecords;
        //DCR-3660,3661,3164 - Mohit Starts
        @AuraEnabled public Contact contactRecord;
        //DCR-3660,3661,3164 - Mohit Ends
/*DCR4487*/@AuraEnabled public Contact representativeRecord;
        public CTP_ClaimApplicationWrapper(){
            this.caseRecord = new Case();
            this.caseRecord.CTP_Preferred_Contact_time__c = 'Anytime';
            this.caseRecord.CTP_Preferred_Email_Address__c = 'Login Email';
            this.caseRecord.CTP_Language__c = 'English';
            this.claimRecord = new CTP_Claim__c();
            this.claimRecord.CTP_Ambulance_Used__c = '';
            this.claimRecord.Ambulance_Service_Received__c = '';
            this.claimRecord.CTP_Treatment_Rec_At_Hosp_Post_Accident__c= '';
            this.claimRecord.CTP_Hospital_Name__c='';
            this.claimRecord.CTP_Date_Of_Discharge__c=null;
            this.claimRecord.CTP_Discharged_From_Hospital__c='';
            this.userRecord = new User(Id = UserInfo.getUserId());
            //this.injuryRecord = new CTP_Injury_Treatment__c();
            this.injuryRecordList = new List <CTP_Injury_Treatment__c>();
            this.preInjuryRecordList = new List <CTP_Injury_Treatment__c>();
            this.treatmentRecordList = new List <CTP_Injury_Treatment__c>();
            
            this.vehicleRecords = new List<CTP_Vehicle__c>();
            this.contactRecord = new Contact();//DCR-3660 - Mohit
            this.contactRecord.Id = [select id, contactId from User where id = : UserInfo.getUserId()].contactId; //Only used for the Submitter Contact
/*DCR4487*/ this.representativeRecord = new Contact(); //Only used for the Representative Contact
           
        }
    }
    
    /*
     * Purpose : Method to initialize the CTP_ClaimApplicationWrapper class and return it to Lightning component
     * Author : Ashish
     * Modified on : 15-Jan-2018
     * JIRA# : DCR-3587 : [MAIN] OLCS - Claimant completes the Claim Details page of online form, Sprint-9
  */
    @AuraEnabled public static CTP_ClaimApplicationWrapper initalizeClaimApplicationWrapper(){
        CTP_ClaimApplicationWrapper wrapper = new CTP_ClaimApplicationWrapper();
        
        return wrapper;
    }
    
    
    /*
     * Purpose : Generic Method to save Claim, Case, User and Injury/Treatment records associated with a single Claim Application
     * Author : Ashish
     * Modified on : 16-Jan-2018
     * JIRA# : DCR-3153 : OLCS - Claimant selects "Next" [Claims Details --> Personal Info] - Sprint 9
  */
    /********************************************************************************
  // DCR-3592             : Getting User record Based on user login 
  //                        (UCD details correct)-SPRINT-9
  // Purpose              : OLCS - Personal Information Pre-Population from User object.
  //                        Update the user details as updated by user on form
  // Modified on          : 18/01/2018   

  // Developer            : Mohit                   
    //*******************************************************************************/
    /********************************************************************************
  // DCR-4863             : OLCS - Claimant selects "Next" [Personal Info --> Accident Details 1] 
  //                        SPRINT-9
  // Purpose              : OLCS - Personal Information Pre-Population from User object.
  //                        Update the user details as updated by user on form
  // Modified on          : 22/01/2018   

  // Developer            : Mohit                   
    //*******************************************************************************/
    @AuraEnabled public static CTP_ClaimApplicationWrapper saveClaimApplication(String claimApplicationJSON, String step){
        system.debug('@@@@@ CTP_ClaimApplicationWrapper Records---> '+JSON.serializePretty(claimApplicationJSON));
        CTP_ClaimApplicationWrapper claimApplication = (CTP_ClaimApplicationWrapper)JSON.deserialize(claimApplicationJSON, CTP_ClaimApplicationWrapper.class);
        /* 
         * Creating a new Claim Record with Claim Application Record Type and Creating a new 
     * Claim Application Case with Stage as Draft
    */
        
        if(step.equalsIgnoreCase('1')){
            Id claimApplicationRecordTypeId = Schema.SObjectType.CTP_Claim__c.getRecordTypeInfosByName().get(Label.CTP_ClaimAplicationRecordType).getRecordTypeId();
            claimApplication.claimRecord.RecordTypeId = claimApplicationRecordTypeId;
            
                //for time of accident start
                if(claimApplication.claimRecord.CTP_Time_Of_Accident__c != null){
                String timeOfAccident = String.valueOf(claimApplication.claimRecord.CTP_Time_Of_Accident__c);
                System.Debug('>> timeOfAccident>> '+timeOfAccident);
                decimal accidentTimedecimal;
                String accidentTimeStr;
                String accidentTime;
                
    
                    accidentTime = timeOfAccident.substring(0,timeOfAccident.length()-2).trim();
                    System.Debug('>>. accidentTime >>>'+accidentTime);
                    accidentTimedecimal = decimal.valueof(accidentTime.replace(':','.'));
                    
                    if(timeOfAccident.contains('PM') && accidentTimedecimal < 12){
                        accidentTimeStr = String.valueof(accidentTimedecimal +12.00);
                        System.Debug('>>>accidentTimedecimal>>>'+accidentTimedecimal);
                        claimApplication.claimRecord.CTP_Time_Of_Accident__c = String.valueof(accidentTimeStr.replace('.',''));
                    }else if(timeOfAccident.contains('AM') && (accidentTimedecimal == 12.00 || accidentTimedecimal > 12.00)){
                        accidentTimeStr = String.valueof(accidentTimedecimal -12.00);
                        claimApplication.claimRecord.CTP_Time_Of_Accident__c = String.valueof(accidentTimeStr.replace('.',''));
                    }else if(timeOfAccident.length() == 4){
                        System.Debug('>> accidentTime 291>>'+accidentTime);
                        claimApplication.claimRecord.CTP_Time_Of_Accident__c = timeOfAccident;
                    }else{  
                        claimApplication.claimRecord.CTP_Time_Of_Accident__c = accidentTime.replace(':','');
                    }
            } //for time of accident End
            upsert claimApplication.claimRecord;
            
            Id claimApplicationCaseRecordTypeId = Schema.SObjectType.Case.getRecordTypeInfosByName().get(Label.CTP_ClaimAplicationRecordType).getRecordTypeId();
            claimApplication.caseRecord.RecordTypeId = claimApplicationCaseRecordTypeId;
            claimApplication.caseRecord.CTP_OLCS_Claim_Number__c = claimApplication.claimRecord.Id;
            claimApplication.caseRecord.Status = 'Draft';
            claimApplication.caseRecord.CTP_Claim_Type__c = 'Personal Injury Benefits';//DCR-5822   
            //claimApplication.caseRecord.CTP_SubmitterContact__c = claimApplication.userRecord.ContactId;
            if(claimApplication.claimRecord.CTP_Submitter_Is_Claimant__c=='Yes'){
              claimApplication.caseRecord.CTP_Claimant_SNSW_Email__c=UserInfo.getUserEmail();
            }
            claimApplication.caseRecord.CTP_Date_and_time_User_saved_application__c = System.now();//DCR-5183, added by Himani
            claimApplication.caseRecord.CTP_Date_of_Accident1__c = claimApplication.claimRecord.CTP_AccidentDate__c; //DCR- 7819 - Shreya
            
            upsert claimApplication.caseRecord;
        }
        //Rel#1.5,DCR-3592 - Mohit Starts
        if(step.equalsIgnoreCase('2')){
            system.debug('I am in Step 2 Updation@@@@');
            claimApplication.userRecord.Id = Userinfo.getUserId();
            Update claimApplication.userRecord;
             //for time of accident start
                if(claimApplication.claimRecord.CTP_Time_Of_Accident__c != null){
                String timeOfAccident = String.valueOf(claimApplication.claimRecord.CTP_Time_Of_Accident__c);
                System.Debug('>> timeOfAccident>> '+timeOfAccident);
                decimal accidentTimedecimal;
                String accidentTimeStr;
                String accidentTime;
                
    
                    accidentTime = timeOfAccident.substring(0,timeOfAccident.length()-2).trim();
                    System.Debug('>>. accidentTime >>>'+accidentTime);
                    accidentTimedecimal = decimal.valueof(accidentTime.replace(':','.'));
                    
                    if(timeOfAccident.contains('PM') && accidentTimedecimal < 12){
                        accidentTimeStr = String.valueof(accidentTimedecimal +12.00);
                        System.Debug('>>>accidentTimedecimal>>>'+accidentTimedecimal);
                        claimApplication.claimRecord.CTP_Time_Of_Accident__c = String.valueof(accidentTimeStr.replace('.',''));
                    }else if(timeOfAccident.contains('AM') && (accidentTimedecimal == 12.00 || accidentTimedecimal > 12.00)){
                        accidentTimeStr = String.valueof(accidentTimedecimal -12.00);
                        claimApplication.claimRecord.CTP_Time_Of_Accident__c = String.valueof(accidentTimeStr.replace('.',''));
                    }else if(timeOfAccident.length() == 4){
                        System.Debug('>> accidentTime 291>>'+accidentTime);
                        claimApplication.claimRecord.CTP_Time_Of_Accident__c = timeOfAccident;
                    }else{  
                        claimApplication.claimRecord.CTP_Time_Of_Accident__c = accidentTime.replace(':','');
                    }
            } //for time of accident End
            //Rel#1.5,DCR-4863  - Mohit start
            update claimApplication.claimRecord;
            claimApplication.caseRecord.CTP_Date_and_time_User_saved_application__c = System.now();//DCR-5183, added by Himani
            claimApplication.caseRecord.CTP_Date_of_Accident1__c = claimApplication.claimRecord.CTP_AccidentDate__c; //DCR- 7819 - Shreya
            
            System.debug('>>> before if submitter <>>>'+claimApplication.claimRecord.CTP_Submitter_Is_Claimant__c);
            if(claimApplication.claimRecord.CTP_Submitter_Is_Claimant__c == 'Yes'){
                System.debug('>>> Inside if submitter <>>>'+claimApplication.userRecord.ContactId);
                claimApplication.caseRecord.CTP_InjuredPersonContact__c = claimApplication.userRecord.ContactId;
                claimApplication.caseRecord.CTP_First_Name__c = claimApplication.userRecord.FirstName;
                claimApplication.caseRecord.CTP_Last_Name__c = claimApplication.userRecord.LastName;
            }
            System.debug('>> CTP_InjuredPersonContact__c>>> '+claimApplication.caseRecord.CTP_InjuredPersonContact__c);
            System.debug('>> CTP_InjuredPersonContact__c>>> '+claimApplication.caseRecord.Contact.Id);
            
            if(claimApplication.caseRecord.CTP_Prefered_Email_Address_Injured_Persn__c==NULL) 
            {
               claimApplication.caseRecord.CTP_Prefered_Email_Address_Injured_Persn__c=claimApplication.caseRecord.CTP_Claimant_SNSW_Email__c;
            }
            //DCR4487 - Fixing existing defect under DCR4487 to Populate Rep fields in Case - Start
            if(claimApplication.caseRecord.CTP_Submitter_is_a_nominated_rep__c=='Yes'){
                claimApplication.caseRecord.CTP_Rep_First_Name__c = claimApplication.userRecord.FirstName;
                claimApplication.caseRecord.CTP_Rep_Last_Name__c = claimApplication.userRecord.LastName ;
                claimApplication.caseRecord.CTP_Rep_Email__c  = claimApplication.userRecord.Email ;
                claimApplication.caseRecord.CTP_Rep_Type__c = claimApplication.caseRecord.CTP_Rep_Type__c ;
                claimApplication.caseRecord.OLCN_RepTypeOther__c = claimApplication.caseRecord.CTP_Submitter_Type_Other__c;
                claimApplication.caseRecord.CTP_RepresentativeContact__c = claimApplication.userRecord.contactId;
                claimApplication.caseRecord.CTP_Rep_Phone__c = claimApplication.userRecord.Phone;
                claimApplication.caseRecord.CTP_Rep_Preferred_Contact_Time__c = claimApplication.caseRecord.CTP_Preferred_Contact_time__c ;
                claimApplication.caseRecord.CTP_Rep_Interpreter_Required__c = claimApplication.caseRecord.CTP_Rep_Language_Required__c=='English'?'No':'Yes';
            }else{
                claimApplication.caseRecord.CTP_Rep_First_Name__c = claimApplication.representativeRecord.FirstName;
                claimApplication.caseRecord.CTP_Rep_Last_Name__c = claimApplication.representativeRecord.LastName ;
                claimApplication.caseRecord.CTP_Rep_Email__c  = claimApplication.representativeRecord.Email ;
                //claimApplication.caseRecord.CTP_Rep_Type__c = claimApplication.caseRecord.CTP_Submitter_Type__c ;
                //
                //claimApplication.caseRecord.OLCN_RepTypeOther__c = claimApplication.caseRecord.CTP_Submitter_Type_Other__c;
                claimApplication.caseRecord.CTP_Rep_Phone__c = claimApplication.representativeRecord.Phone;
                claimApplication.caseRecord.CTP_Rep_Interpreter_Required__c = claimApplication.caseRecord.CTP_Rep_Language_Required__c=='English'?'No':'Yes';
                //claimApplication.caseRecord.CTP_Rep_Preferred_Contact_Time__c = claimApplication.caseRecord.CTP_Rep_Preferred_Contact_Time__c ;//DCR-7848
            }
            //DCR4487 - Fixing existing defect under DCR4487 to Populate Rep fields in Case - End
           
            //###DCR4487, DCR-4317 and DCR-4316
            //## Changes to create/link Representative/claimant(Injured person) to Case in Lookup field.
            Id contactRecordTypeId = Schema.SObjectType.contact.getRecordTypeInfosByName().get('CTP_Public').getRecordTypeId();
            //DCR-8268//if((claimApplication.claimRecord.CTP_Submitter_Is_Claimant__c=='Yes' && claimApplication.caseRecord.CTP_Submitter_is_a_nominated_rep__c=='No') || (claimApplication.claimRecord.CTP_Submitter_Is_Claimant__c=='No' && claimApplication.caseRecord.CTP_Submitter_is_a_nominated_rep__c=='No')){
/*DCR-8268*/if(claimApplication.claimRecord.CTP_Nominated_representative_required__c=='Yes' && claimApplication.representativeRecord.LastName!=null){    
                if(claimApplication.caseRecord.CTP_RepresentativeContact__c == null){
                    Id repId = createContactPerson(claimApplication.representativeRecord.FirstName, claimApplication.representativeRecord.LastName, claimApplication.representativeRecord.Email,contactRecordTypeId, claimApplication.representativeRecord.Phone);
                    system.debug('**Rep ID received -'+repId);
                    claimApplication.caseRecord.CTP_RepresentativeContact__c = repId;
                }
            }
            system.debug('**CTP_Submitter_Is_Claimant__c =='+claimApplication.claimRecord.CTP_Submitter_Is_Claimant__c);
            system.debug('**CTP_Submitter_is_a_nominated_rep__c =='+claimApplication.caseRecord.CTP_Submitter_is_a_nominated_rep__c);
            // && claimApplication.caseRecord.CTP_Submitter_is_a_nominated_rep__c=='No'){
            if(claimApplication.claimRecord.CTP_Submitter_Is_Claimant__c=='No' && claimApplication.caseRecord.CTP_Last_Name__c!=null){
                if(claimApplication.caseRecord.CTP_InjuredPersonContact__c == null){
                    Id injId = createContactPerson(claimApplication.caseRecord.CTP_First_Name__c, claimApplication.caseRecord.CTP_Last_Name__c, claimApplication.caseRecord.CTP_Claimant_Email__c,contactRecordTypeId, claimApplication.caseRecord.CTP_Mobile__c);
                    system.debug('**injId ID received -'+injId);
                    claimApplication.caseRecord.CTP_InjuredPersonContact__c = injId;
                }
            }
            //###DCR4487, DCR-4317 and DCR-4316
            // for sira ref numberby Himani
           // if(claimApplication.caseRecord.CTP_SIRA_Reference_Number__c==null){
                system.debug('inside if for sira ref');
                //case c = [select id,CaseNumber,CTP_SIRA_Reference_Number__c from case where id=:claimApplication.caseRecord.Id];
            	claimApplication.caseRecord.CTP_SIRA_Reference_Number__c = Decimal.valueOf([select id,CaseNumber,CTP_SIRA_Reference_Number__c from case where id=:claimApplication.caseRecord.Id].CaseNumber);
           // }
                
              system.debug('inside if for sira ref val@@@@@@@@@@@@'+claimApplication.caseRecord.CTP_SIRA_Reference_Number__c); 
            update claimApplication.caseRecord;
            //Rel#1.5,DCR-4863  - Mohit end
        }//Rel#1.5,DCR-3592 - Mohit ends
        //Rel#1.5,DCR-4864 Start,added by Shilpa Patil,saving the record in step -3
        if(step.equalsIgnoreCase('3')){
            //Added as part of DCR-3628-Parul-Start
            
            if(claimApplication.claimRecord.CTP_Time_Of_Accident__c != null){
                String timeOfAccident = String.valueOf(claimApplication.claimRecord.CTP_Time_Of_Accident__c);
                System.Debug('>> timeOfAccident>> '+timeOfAccident);
                decimal accidentTimedecimal;
                String accidentTimeStr;
                String accidentTime;
                
                if(timeOfAccident.length() > 4){
                    accidentTime = timeOfAccident.substring(0,timeOfAccident.length()-2).trim();
                    System.Debug('>>. accidentTime >>>'+accidentTime);
                    accidentTimedecimal = decimal.valueof(accidentTime.replace(':','.'));
                }
                
                if(timeOfAccident.contains('PM') && accidentTimedecimal < 12){
                    accidentTimeStr = String.valueof(accidentTimedecimal +12.00);
                    System.Debug('>>>accidentTimedecimal>>>'+accidentTimedecimal);
                    claimApplication.claimRecord.CTP_Time_Of_Accident__c = String.valueof(accidentTimeStr.replace('.',''));
                }else if(timeOfAccident.contains('AM') && (accidentTimedecimal == 12.00 || accidentTimedecimal > 12.00)){
                    accidentTimeStr = String.valueof(accidentTimedecimal -12.00);
                    claimApplication.claimRecord.CTP_Time_Of_Accident__c = String.valueof(accidentTimeStr.replace('.',''));
                }else if(timeOfAccident.length() == 4){
                    System.Debug('>> accidentTime 291>>'+accidentTime);
                    claimApplication.claimRecord.CTP_Time_Of_Accident__c = timeOfAccident;
                }else{  
                    claimApplication.claimRecord.CTP_Time_Of_Accident__c = accidentTime.replace(':','');
                }
            }
            //defect fix start DCR-8190 added by shilpa
            If(claimApplication.claimRecord.CTP_Accident_Role__c!='other' && claimApplication.claimRecord.CTP_Accident_Role_Other__c!=''){
                claimApplication.claimRecord.CTP_Accident_Role_Other__c='';
            }
            //defect fix end DCR-8190 added by shilpa
            update claimApplication.claimRecord;
             //Added as part of DCR-3628-Parul-End
        }
        //Rel#1.5,DCR-4864 End,added by Shilpa Patil
        //
       if(step.equalsIgnoreCase('4')){
            //Rel#1.5,DCR-3896 Start ,added by Shilpa Patil
           if(claimApplication.claimRecord.CTP_Vehicles_Involved_Are_Known__c=='No'){
                
                 claimApplication.caseRecord.CTP_Exception_Flow__c=true;
                 claimApplication.caseRecord.CTP_Exception_Type__c='Vehicles Involved Are Unknown';
                 claimApplication.caseRecord.CTP_Sub_Stage__c='Awaiting Further Information';
              }
            if(claimApplication.claimRecord.CTP_Vehicles_Involved_Are_Known__c=='Yes')
            {
                
                claimApplication.caseRecord.CTP_Exception_Flow__c=False;
                claimApplication.caseRecord.CTP_Exception_Type__c='';
                claimApplication.caseRecord.CTP_Sub_Stage__c='';
            }
            //Rel#1.5,DCR-3896 Start ,added by Shilpa Patil
            //Rel#1.5,DCR-3178 Start ,added by Shilpa Patil
            if(claimApplication.claimRecord.CTP_Vehicles_Involved_Are_Known__c=='Yes' &&
                (claimApplication.claimRecord.CTP_Most_at_Fault_Vehicle_Known__c=='Still being determined'||
               claimApplication.claimRecord.CTP_Most_at_Fault_Vehicle_Known__c=='I am unsure') )
            {
                 claimApplication.caseRecord.CTP_Exception_Flow__c=true;
                 claimApplication.caseRecord.CTP_Exception_Type__c='Most at-fault Vehicle Unknown';
                 claimApplication.caseRecord.CTP_Sub_Stage__c='Awaiting Further Information';
                 
              }
            if(claimApplication.claimRecord.CTP_Vehicles_Involved_Are_Known__c=='Yes' &&
               claimApplication.claimRecord.CTP_Most_at_Fault_Vehicle_Known__c=='Yes'){
                  claimApplication.caseRecord.CTP_Exception_Flow__c=False;
                  claimApplication.caseRecord.CTP_Exception_Type__c='';
                  claimApplication.caseRecord.CTP_Sub_Stage__c='';
            }
            //Rel#1.5,DCR-3178 End ,added by Shilpa Patil
            //Rel#1.5,DCR-3835 Start ,added by Shilpa Patil
             if(claimApplication.claimRecord.CTP_Most_at_Fault_Vehicle_Known__c=='Yes'&&
                 claimApplication.claimRecord.CTP_Most_At_Fault_Vehicle_Confirmed__c=='No'){
                 
                 claimApplication.caseRecord.CTP_Exception_Flow__c=true;
                 claimApplication.caseRecord.CTP_Exception_Type__c='In PIE, But Doesn’t Match';
                 claimApplication.caseRecord.CTP_Sub_Stage__c='Awaiting Further Information';
              }
            
             if(claimApplication.claimRecord.CTP_Most_at_Fault_Vehicle_Known__c=='Yes'&&
                 claimApplication.claimRecord.CTP_Most_At_Fault_Vehicle_Confirmed__c=='Yes')
            {
                claimApplication.caseRecord.CTP_Exception_Flow__c=False;
                claimApplication.caseRecord.CTP_Exception_Type__c='';
                claimApplication.caseRecord.CTP_Sub_Stage__c='';
            }
           //Rel#1.5,DCR-3837 - Mohit Starts
             if(claimApplication.claimRecord.CTP_State_Of_Registration_Known__c == 'No' ||
                claimApplication.claimRecord.Most_at_fault_vehicle_state__c == 'NSW'){
                     system.debug('@@@I am here 7');
                    system.debug('I am here --> '+claimApplication.claimRecord.CTP_State_Of_Registration_Known__c );
                    system.debug('I am here --> '+claimApplication.claimRecord.Most_at_fault_vehicle_state__c );
                    claimApplication.caseRecord.CTP_Exception_Flow__c = true;
                    claimApplication.caseRecord.CTP_Exception_Type__c = 'Registration Number Not Found';
                    claimApplication.caseRecord.CTP_Sub_Stage__c = 'Awaiting Further Information';
            }
            if(claimApplication.claimRecord.CTP_State_Of_Registration_Known__c == 'Yes' &&
                claimApplication.claimRecord.Most_at_fault_vehicle_state__c != 'NSW'){
                     system.debug('@@@I am here 8');
                    system.debug('I am here --> '+claimApplication.claimRecord.CTP_State_Of_Registration_Known__c );
                    system.debug('I am here --> '+claimApplication.claimRecord.Most_at_fault_vehicle_state__c );
                    claimApplication.caseRecord.CTP_Exception_Flow__c = true;
                    claimApplication.caseRecord.CTP_Exception_Type__c = 'Interstate Vehicle';
                    claimApplication.caseRecord.CTP_Sub_Stage__c = 'Awaiting Further Information';
            }
           // Added claimApplication.claimRecord.CTP_Most_At_Fault_Vehicle_Confirmed__c=='Yes' for DCR-7790
            if(claimApplication.claimRecord.CTP_Most_At_Fault_Vehicle_Confirmed__c=='Yes'&&
               claimApplication.caseRecord.CTP_PiE_Status_Code__c == '200 - Status Good' ){
                     system.debug('@@@I am here 9');
                    system.debug('I am here --> '+claimApplication.claimRecord.CTP_State_Of_Registration_Known__c );
                    system.debug('I am here --> '+claimApplication.claimRecord.Most_at_fault_vehicle_state__c );
                    claimApplication.caseRecord.CTP_Exception_Flow__c = false;
                    claimApplication.caseRecord.CTP_Exception_Type__c = '';
                    claimApplication.caseRecord.CTP_Sub_Stage__c = '';
            }
           //Rel#1.5,DCR-3837 - Mohit Ends
          
            system.debug('@@@@@ Vechiles Records---> '+JSON.serializePretty(claimApplication.vehicleRecords));
            system.debug('@@@@@ CTP_Most_at_fault_Vehicle_Registration__c Records---> '+claimApplication.claimRecord.CTP_Most_at_fault_Vehicle_Registration__c);
            for(CTP_Vehicle__c vehicle : claimApplication.vehicleRecords){
                system.debug('Vehicle At fault @@@ '+claimApplication.claimRecord.CTP_Most_at_Fault_Vehicle_Known__c);
                
                      
                
             
               /* if(claimApplication.claimRecord.CTP_Most_at_Fault_Vehicle_Known__c == 'Yes' 
                   && claimApplication.claimRecord.CTP_Most_at_Fault_Vehicle_Known__c == 'yes'){
                    vehicle.CTP_Vehicle_At_Fault__c  = true;
                }else if(claimApplication.claimRecord.CTP_Most_at_Fault_Vehicle_Known__c == 'No' 
                   || claimApplication.claimRecord.CTP_Most_at_Fault_Vehicle_Known__c == 'no'){
                    vehicle.CTP_Vehicle_At_Fault__c  = false;
                }*/
                
                /* Modified by subhajit for DCR-4698 :Starts */   
                if(claimApplication.claimRecord.CTP_Correct_Registration_Entered__c =='I am unsure')
                       claimApplication.claimRecord.CTP_Correct_Registration_Entered__c='No';
                    
                if(claimApplication.claimRecord.CTP_Most_at_Fault_Vehicle_Known__c == 'Yes' 
                   && vehicle.CTP_Registration_Number__c == claimApplication.claimRecord.CTP_Most_at_fault_Vehicle_Registration__c 
                  ){
                    
                    vehicle.CTP_Vehicle_At_Fault__c  = true;  
                    claimApplication.caseRecord.CTP_Most_At_Fault_Policy_Number__c=vehicle.CTP_Policy_Number__c;
                }  
                      
                  
                   
           else{
                 vehicle.CTP_Vehicle_At_Fault__c  = false;
           }
                  
                
                /* Modified by subhajit for DCR-4698 :: Ends */
                    
                vehicle.CTP_Vehicle_Case_Number__c = claimApplication.caseRecord.Id;
                vehicle.CTP_Vehicle_Claim__c = claimApplication.claimRecord.Id;
            }
            claimApplication.caseRecord.CTP_Date_and_time_User_saved_application__c = System.now();//DCR-5183, added by Himani
            claimApplication.caseRecord.CTP_Time_of_Accident__c=claimApplication.claimRecord.CTP_Time_Of_Accident__c;//DCR-8419,added by Shilpa
            update claimApplication.caseRecord;
            update claimApplication.claimRecord;
           //DCR-7668 start by Himani
           system.debug('outside if');
           if(claimApplication.claimRecord.CTP_Vehicles_Involved_Are_Known__c== 'Yes'){
               system.debug('inside if');
               upsert claimApplication.vehicleRecords;
           }else if(claimApplication.claimRecord.CTP_Vehicles_Involved_Are_Known__c== 'No'){
                system.debug('inside else'); 
           }
            //DCR-7668 End by Himani
           upsert claimApplication.injuryRecordList;  // FIX Sridevi 5016
        }
                
       //Added as part of DCR-3659/5016  Start ---Sridevi
      
        if(step.equalsIgnoreCase('5')){            
            system.debug('@@@I am here  step 5');            
            upsert claimApplication.preInjuryRecordList;
            upsert claimApplication.treatmentRecordList;          
            claimApplication.claimRecord.Name = claimApplication.claimRecord.RecordTypeId;
            upsert claimApplication.claimRecord;
           } 
           // DCR-3659/5016 Code ends here ---Sridevi.
        
        //DCR-3660, DCR3614 - Mohit Starts
        if(step.equalsIgnoreCase('6')){
            system.debug('I am in step 6');
            //If(claimApplication.claimRecord.CTP_Away_From_Work_Due_To_Accident__c == 'Yes'){
                 upsert claimApplication.contactRecord;
                 if(claimApplication.contactRecord.Id!=null || claimApplication.contactRecord.Id!=''){
                 claimApplication.claimRecord.CTP_Claimant_Contact__c = claimApplication.contactRecord.Id;
            }
           // }
             update claimApplication.claimRecord;
        }////DCR-3660, DCR3614 - Mohit Ends
        
        
        //// Rel#2,DCR#2856,Added by Shilpa Patil,Start For Updating Contact record with CTP_Consent_for_Survey__c value
        if(step.equalsIgnoreCase('8')){
            //DCR-5739 - Mohit changes starts
            system.debug('I am in submit application >>>>>>>>');
             //Added for DCR-8204 Fix Parul-start
            claimApplication.caseRecord.CTP_Date_Submitted_by_Claimant__c=system.now();
             //Added for DCR-8204 Fix Parul-End
            if(claimApplication.caseRecord.CTP_Claims_Submission_Status_Code__c == '200 - Status Good'
              || claimApplication.caseRecord.CTP_Claims_Submission_Status_Code__c == '501- Not Implemented'){//DCR5739
                claimApplication.caseRecord.CTP_Date_Acknowledged_by_Insurer__c=system.now(); //DCR-5739
                  //Added for DCR-8204 Fix Parul-start
                claimApplication.caseRecord.CTP_Date_Sent_to_Insurer__c=system.now();
                  //Added for DCR-8204 Fix Parul-End
                 for(CTP_Vehicle__c vehicle:claimApplication.vehicleRecords){  
                     if(vehicle.CTP_Vehicle_Insurer__c != '' && vehicle.CTP_Vehicle_Insurer__c != null){
                         system.debug('Populating insurer coode -->>>>>>>>'+vehicle.CTP_Vehicle_Insurer__c);
                        claimApplication.caseRecord.CTP_Allocated_Insurer__c =  vehicle.CTP_Vehicle_Insurer__c;
                     } 
                 }
              }
            
            //DCR-6390 - Mohit Starts
             if(claimApplication.caseRecord.CTP_Exception_Type__c == 'Mulesoft Unavailable'){
                claimApplication.caseRecord.CTP_Date_Sent_to_Insurer__c=system.now();
                 for(CTP_Vehicle__c vehicle:claimApplication.vehicleRecords){  
                     if(vehicle.CTP_Vehicle_Insurer__c != '' && vehicle.CTP_Vehicle_Insurer__c != null){
                         system.debug('Populating insurer coode 9999-->>>>>>>>'+vehicle.CTP_Vehicle_Insurer__c);
                        claimApplication.caseRecord.CTP_Allocated_Insurer__c =  vehicle.CTP_Vehicle_Insurer__c;
                     } 
                 }
              }
             //DCR-6390 - Mohit Ends
           
            system.debug('Mohit>>>>>Ins'+ claimApplication.caseRecord.CTP_Insurer_Reference_Number__c);
            system.debug('Mohit>>>>>SIRA'+ claimApplication.caseRecord.CTP_SIRA_Reference_Number__c);
             //DCR-5739 - Mohit changes Ends
            //Fetching the assignment rules on case
            AssignmentRule AR = new AssignmentRule();
            AR = [select id from AssignmentRule where SobjectType = 'Case' and Active = true limit 1];

            //Creating the DMLOptions for "Assign using active assignment rules" checkbox
                Database.DMLOptions dmlOpts = new Database.DMLOptions();
                dmlOpts.assignmentRuleHeader.assignmentRuleId= AR.id;
            claimApplication.caseRecord.setOptions(dmlOpts);
            if(claimApplication.caseRecord.CTP_Prefered_Email_Address_Injured_Persn__c!=null){
              claimApplication.caseRecord.CTP_InjuredPersonEmail__c=claimApplication.caseRecord.CTP_Prefered_Email_Address_Injured_Persn__c;
            }
            
            update claimApplication.caseRecord;
            update claimApplication.claimRecord;
            }
            // Rel#2,DCR#2856,Added by Shilpa Patil,Start For Updating Contact record with CTP_Consent_for_Survey__c value
        
        System.Debug('>>> claimApplication >>> '+JSON.serializePretty(claimApplication));
        return claimApplication;
    }
                  

    
    /*DCR-2836*/
    @AuraEnabled 
    public static CTP_ClaimApplicationWrapper saveAsDraftController(String wrapperRecord){
        CTP_ClaimApplicationWrapper claimWrapper = (CTP_ClaimApplicationWrapper)JSON.deserialize(wrapperRecord, CTP_ClaimApplicationWrapper.class);
        system.debug('claimWrapper :::>>'+JSON.serializePRETTY(claimWrapper));
        
        if(claimWrapper.claimRecord.CTP_Time_Of_Accident__c != null && claimWrapper.claimRecord.CTP_Time_Of_Accident__c != '0' && claimWrapper.claimRecord.CTP_Time_Of_Accident__c != '00'){
            String timeOfAccident = String.valueOf(claimWrapper.claimRecord.CTP_Time_Of_Accident__c);
            System.Debug('>> timeOfAccident>> '+timeOfAccident);
            decimal accidentTimedecimal;
            String accidentTimeStr;
            String accidentTime;
            

                accidentTime = timeOfAccident.substring(0,timeOfAccident.length()-2).trim();
                System.Debug('>>. accidentTime >>>'+accidentTime);
                accidentTimedecimal = decimal.valueof(accidentTime.replace(':','.'));
                
                if(timeOfAccident.contains('PM') && accidentTimedecimal < 12){
                    accidentTimeStr = String.valueof(accidentTimedecimal +12.00);
                    System.Debug('>>>accidentTimedecimal>>>'+accidentTimedecimal);
                    claimWrapper.claimRecord.CTP_Time_Of_Accident__c = String.valueof(accidentTimeStr.replace('.',''));
                }else if(timeOfAccident.contains('AM') && (accidentTimedecimal == 12.00 || accidentTimedecimal > 12.00)){
                    accidentTimeStr = String.valueof(accidentTimedecimal -12.00);
                    claimWrapper.claimRecord.CTP_Time_Of_Accident__c = String.valueof(accidentTimeStr.replace('.',''));
                }else if(timeOfAccident.length() == 4){
                    System.Debug('>> accidentTime 291>>'+accidentTime);
                    claimWrapper.claimRecord.CTP_Time_Of_Accident__c = timeOfAccident;
                }else{  
                    claimWrapper.claimRecord.CTP_Time_Of_Accident__c = accidentTime.replace(':','');
                }
        }
        /* DCR-4322 - Onbehalf - Rep and Submitter Info Starts*/
        if(claimWrapper.caseRecord.CTP_First_Name__c != null && claimWrapper.caseRecord.CTP_Last_Name__c != null){
            claimWrapper.caseRecord.Claimant_Name__c = claimWrapper.caseRecord.CTP_First_Name__c+' '+claimWrapper.caseRecord.CTP_Last_Name__c;
        }if(claimWrapper.userRecord.FirstName != null)
            claimWrapper.caseRecord.CTP_Submitter_First_Name__c = claimWrapper.userRecord.FirstName;
        if(claimWrapper.userRecord.LastName != null)
            claimWrapper.caseRecord.CTP_Submitter_Last_Name__c = claimWrapper.userRecord.LastName;
            
            if(claimWrapper.caseRecord.CTP_Preferred_Email_Address__c == 'Login Email'){
            claimWrapper.caseRecord.CTP_Submitter_Preferred_Email_Address__c = claimWrapper.userRecord.Email;
        }else if (claimWrapper.caseRecord.CTP_Preferred_Email_Address__c == 'Alternative Email'){
            claimWrapper.caseRecord.CTP_Submitter_Preferred_Email_Address__c = claimWrapper.caseRecord.CTP_Prefered_Email_Address_Injured_Persn__c;
        }

            
        if(claimWrapper.caseRecord.CTP_Submitter_is_a_nominated_rep__c=='Yes'){
            claimWrapper.caseRecord.CTP_Rep_First_Name__c = claimWrapper.userRecord.FirstName;
            claimWrapper.caseRecord.CTP_Rep_Last_Name__c = claimWrapper.userRecord.LastName ;
            claimWrapper.caseRecord.CTP_Rep_Email__c  = claimWrapper.userRecord.Email ;
            claimWrapper.caseRecord.CTP_Rep_Type__c = claimWrapper.caseRecord.CTP_Submitter_Type__c ;
            claimWrapper.caseRecord.OLCN_RepTypeOther__c = claimWrapper.caseRecord.CTP_Submitter_Type_Other__c;

            claimWrapper.caseRecord.CTP_Rep_Phone__c = claimWrapper.userRecord.Phone;
            claimWrapper.caseRecord.CTP_Rep_Preferred_Contact_Time__c = claimWrapper.caseRecord.CTP_Preferred_Contact_time__c ;
        }else{
/*DCR4487*/ claimWrapper.caseRecord.CTP_Rep_First_Name__c = claimWrapper.representativeRecord.FirstName;
/*DCR4487*/ claimWrapper.caseRecord.CTP_Rep_Last_Name__c = claimWrapper.representativeRecord.LastName ;
/*DCR4487*/ claimWrapper.caseRecord.CTP_Rep_Email__c  = claimWrapper.representativeRecord.Email ;
/*DCR4487*/ claimWrapper.caseRecord.CTP_Rep_Type__c = claimWrapper.caseRecord.CTP_Rep_Type__c ;
/*DCR4487*/ claimWrapper.caseRecord.OLCN_RepTypeOther__c = claimWrapper.caseRecord.CTP_Submitter_Type_Other__c;
/*DCR4487*/ claimWrapper.caseRecord.CTP_Rep_Phone__c = claimWrapper.representativeRecord.Phone;
/*DCR4487*/ claimWrapper.caseRecord.CTP_Rep_Preferred_Contact_Time__c = claimWrapper.caseRecord.CTP_Preferred_Contact_time__c ;
        }
        /* DCR-4322 - Onbehalf - Rep and Submitter Info Starts*/
        //defect fix start DCR-8190 added by shilpa
            If(claimWrapper.claimRecord.CTP_Accident_Role__c!='other' && claimWrapper.claimRecord.CTP_Accident_Role_Other__c!=''){
                claimWrapper.claimRecord.CTP_Accident_Role_Other__c='';
            }
            //defect fix end DCR-8190 added by shilpa
        upsert claimWrapper.claimRecord;
        //DCR-7792 changes added by shilpa Start
        if(claimWrapper.claimRecord.CTP_Vehicles_Involved_Are_Known__c=='No'){
                
                 claimWrapper.caseRecord.CTP_Exception_Flow__c=true;
                 claimWrapper.caseRecord.CTP_Exception_Type__c='Vehicles Involved Are Unknown';
                 claimWrapper.caseRecord.CTP_Sub_Stage__c='Awaiting Further Information';
              }
            if(claimWrapper.claimRecord.CTP_Vehicles_Involved_Are_Known__c=='Yes')
            {
                
                claimWrapper.caseRecord.CTP_Exception_Flow__c=False;
                claimWrapper.caseRecord.CTP_Exception_Type__c='';
                claimWrapper.caseRecord.CTP_Sub_Stage__c='';
            }
            //Rel#1.5,DCR-3896 Start ,added by Shilpa Patil
            //Rel#1.5,DCR-3178 Start ,added by Shilpa Patil
            if(claimWrapper.claimRecord.CTP_Vehicles_Involved_Are_Known__c=='Yes' &&(
               claimWrapper.claimRecord.CTP_Most_at_Fault_Vehicle_Known__c=='Still being determined'||
               claimWrapper.claimRecord.CTP_Most_at_Fault_Vehicle_Known__c=='I am unsure' ))
            {
                 claimWrapper.caseRecord.CTP_Exception_Flow__c=true;
                 claimWrapper.caseRecord.CTP_Exception_Type__c='Most at-fault Vehicle Unknown';
                 claimWrapper.caseRecord.CTP_Sub_Stage__c='Awaiting Further Information';
                 //Rel#1.5, Defect DCR-7843 Start ,added by Parul Singhai
                  claimWrapper.caseRecord.CTP_PiE_Status_Code__c='';
                  claimWrapper.caseRecord.CTP_PiE_Status_Message__c='';
                //Rel#1.5, Defect DCR-7843 End ,added by Parul Singhai
              }
            if(claimWrapper.claimRecord.CTP_Vehicles_Involved_Are_Known__c=='Yes' &&
               claimWrapper.claimRecord.CTP_Most_at_Fault_Vehicle_Known__c=='Yes'){
                  claimWrapper.caseRecord.CTP_Exception_Flow__c=False;
                  claimWrapper.caseRecord.CTP_Exception_Type__c='';
                  claimWrapper.caseRecord.CTP_Sub_Stage__c='';
            }
            //Rel#1.5,DCR-3178 End ,added by Shilpa Patil
            //Rel#1.5,DCR-3835 Start ,added by Shilpa Patil
             if(claimWrapper.claimRecord.CTP_Most_at_Fault_Vehicle_Known__c=='Yes'
                 && claimWrapper.claimRecord.CTP_Most_At_Fault_Vehicle_Confirmed__c=='No'){
                 
                 claimWrapper.caseRecord.CTP_Exception_Flow__c=true;
                 claimWrapper.caseRecord.CTP_Exception_Type__c='In PIE, But Doesn’t Match';
                 claimWrapper.caseRecord.CTP_Sub_Stage__c='Awaiting Further Information';
              }
            
             if(claimWrapper.claimRecord.CTP_Most_At_Fault_Vehicle_Confirmed__c=='Yes' &&
                claimWrapper.claimRecord.CTP_Most_at_Fault_Vehicle_Known__c=='Yes')
            {
                claimWrapper.caseRecord.CTP_Exception_Flow__c=False;
                claimWrapper.caseRecord.CTP_Exception_Type__c='';
                claimWrapper.caseRecord.CTP_Sub_Stage__c='';
               
            }
        //DCR-7792 changes added by shilpa end
        claimWrapper.caseRecord.CTP_Date_and_time_User_saved_application__c = System.now();//DCR-5183, added by Himani
        claimWrapper.caseRecord.CTP_SubmitterContact__c = claimWrapper.userRecord.ContactId;
        claimWrapper.caseRecord.CTP_Time_of_Accident__c=claimWrapper.claimRecord.CTP_Time_Of_Accident__c;//DCR-8419,added by Shilpa
        //###DCR4487, DCR-4317 and DCR-4316
        //## Changes to create/link Representative/claimant(Injured person) to Case in Lookup field.
        Id contactRecordTypeId = Schema.SObjectType.contact.getRecordTypeInfosByName().get('CTP_Public').getRecordTypeId();
        //DCR-8268//if((claimWrapper.claimRecord.CTP_Submitter_Is_Claimant__c=='Yes' && claimWrapper.caseRecord.CTP_Submitter_is_a_nominated_rep__c=='No') || (claimWrapper.claimRecord.CTP_Submitter_Is_Claimant__c=='No' && claimWrapper.caseRecord.CTP_Submitter_is_a_nominated_rep__c=='No')){
/*DCR-8268*/if(claimWrapper.claimRecord.CTP_Nominated_representative_required__c=='Yes' && claimWrapper.representativeRecord.LastName!=null ){    
            if(claimWrapper.caseRecord.CTP_RepresentativeContact__c == null){
                Id repID = createContactPerson(claimWrapper.representativeRecord.FirstName, claimWrapper.representativeRecord.LastName, claimWrapper.representativeRecord.Email,contactRecordTypeId, claimWrapper.representativeRecord.Phone);
                system.debug('**repID ID received -'+repID);
                claimWrapper.caseRecord.CTP_RepresentativeContact__c = repID;
            }
        }
        system.debug('CTP_Submitter_Is_Claimant__c =='+claimWrapper.claimRecord.CTP_Submitter_Is_Claimant__c);
        system.debug('CTP_Submitter_is_a_nominated_rep__c =='+claimWrapper.caseRecord.CTP_Submitter_is_a_nominated_rep__c);
        // && claimWrapper.caseRecord.CTP_Submitter_is_a_nominated_rep__c=='Yes'
        if(claimWrapper.claimRecord.CTP_Submitter_Is_Claimant__c=='No' && claimWrapper.caseRecord.CTP_Last_Name__c!=null){
            if(claimWrapper.caseRecord.CTP_InjuredPersonContact__c == null){
                Id injId = createContactPerson(claimWrapper.caseRecord.CTP_First_Name__c, claimWrapper.caseRecord.CTP_Last_Name__c, claimWrapper.caseRecord.CTP_Claimant_Email__c,contactRecordTypeId, claimWrapper.caseRecord.CTP_Mobile__c);
                system.debug('**injId ID received -'+injId);
                claimWrapper.caseRecord.CTP_InjuredPersonContact__c = injId;
            }
        }
        //###DCR4x487, DCR-4317 and DCR-4316
        
        upsert claimWrapper.caseRecord;
        System.Debug('>> claimApplication.caseRecord >> '+claimWrapper.caseRecord);
        
        update claimWrapper.userRecord;
        
      //  claimWrapper.injuryRecordList = associateInjuriesToCase(claimWrapper.injuryRecordList,claimWrapper.caseRecord.Id); // DCR-7868
        upsert claimWrapper.injuryRecordList;
        
        claimWrapper.vehicleRecords = associateVehiclesToCase(claimWrapper.vehicleRecords, claimWrapper.caseRecord.Id,claimWrapper.caseRecord);
        
        //DCR-7668 start by Himani
           system.debug('outside if');
           if(claimWrapper.claimRecord.CTP_Vehicles_Involved_Are_Known__c== 'Yes'){
               system.debug('inside if');
                upsert claimWrapper.vehicleRecords;
           }else if(claimWrapper.claimRecord.CTP_Vehicles_Involved_Are_Known__c== 'No'){
                system.debug('inside else'); 
           }
            //DCR-7668 End by Himani
       
        
    //    claimWrapper.preInjuryRecordList = associateInjuriesToCase(claimWrapper.preInjuryRecordList,claimWrapper.caseRecord.Id); //DCR-7868
        upsert claimWrapper.preInjuryRecordList;
        
    //    claimWrapper.treatmentRecordList = associateInjuriesToCase(claimWrapper.treatmentRecordList,claimWrapper.caseRecord.Id); //DCR-7868
        upsert claimWrapper.treatmentRecordList;
        
        //DCR-3660 - Mohit
        If(claimWrapper.claimRecord.CTP_Away_From_Work_Due_To_Accident__c == 'Yes'){
                 upsert claimWrapper.contactRecord;
                 claimWrapper.claimRecord.CTP_Claimant_Contact__c = claimWrapper.contactRecord.Id;
        }
        update claimWrapper.claimRecord;
        //DCR-3660 - Mohit
        
        System.debug('claim wrapper'+claimWrapper);
        return claimWrapper;
    }
    
    /*DCR-2836*/
    private static List<CTP_Vehicle__c> associateVehiclesToCase(List<CTP_Vehicle__c> vehicles,Id caseId,Case caseRecord){
        List<CTP_Vehicle__c>tempList = new List<CTP_Vehicle__c>();
        tempList.clear();//DCR-8240
        if(vehicles.size() > 0){
            for(CTP_Vehicle__c vehicle : vehicles){
                if(vehicle!= null && String.isNotBlank(vehicle.CTP_Registration_Number__c)){
                    vehicle.CTP_Vehicle_Case_Number__c = caseId;
                    caseRecord.CTP_Most_At_Fault_Policy_Number__c = vehicle.CTP_Policy_Number__c;
                  tempList.add(vehicle);
                }
            }
        }
        return tempList;
    }
    
    /*DCR-2836*/
   /* Commented since it is not used anywhere
    * private static List<CTP_Injury_Treatment__c> associateInjuriesToCase(List<CTP_Injury_Treatment__c>injuries, Id caseId){
        List<CTP_Injury_Treatment__c>tempList = new List<CTP_Injury_Treatment__c>();
        if(injuries.size() > 0){
            for(CTP_Injury_Treatment__c injury : injuries){
                if(injury!= null && String.isNotBlank(injury.CTP_Injury_Description__c)){
                    injury.CTP_Injury_Treatment_Case__c = caseId;
                    injury.RecordTypeId = Label.CTP_Injury_Record_Type_Id;
                  tempList.add(injury);
                }
            }
        }
        System.Debug('>> tempList >>>'+tempList);
        return tempList;
    }
    */
    
    /*
    DCR-7669 start by himani
    Delet all the associated vehicles to case if claimant selects Vehicles involved as no
    */
    @AuraEnabled public static CTP_ClaimApplicationWrapper deleteAssociatedVehicles(String wrapperRecord){
        
        CTP_ClaimApplicationWrapper claimWrapper = (CTP_ClaimApplicationWrapper)JSON.deserialize(wrapperRecord, CTP_ClaimApplicationWrapper.class);
        system.debug('claimWrapper :::>>'+JSON.serializePRETTY(claimWrapper));
        
        delete claimWrapper.vehicleRecords;
            claimWrapper.claimRecord.CTP_Vehicles_Involved_Are_Known__c = 'No';
            claimWrapper.claimRecord.CTP_Most_at_Fault_Vehicle_Known__c = '';
            claimWrapper.claimRecord.CTP_Desc_Most_At_Fault_Vehicle_Info__c = null;
            claimWrapper.claimRecord.CTP_Most_at_fault_Vehicle_Registration__c = null;
            claimWrapper.claimRecord.CTP_Correct_Registration_Entered__c = '';
            claimWrapper.claimRecord.CTP_Most_At_Fault_Vehicle_Confirmed__c = '';
            claimWrapper.claimRecord.CTP_State_Of_Registration_Known__c = '';
            claimWrapper.claimRecord.Most_at_fault_vehicle_state__c = '';
            claimWrapper.claimRecord.CTP_Allocated_Insurer_Name__c = null;
            claimWrapper.claimRecord.CTP_Allocated_Insurer_Code__c = null;  
        update claimWrapper.claimRecord;
            
            claimWrapper.caseRecord.CTP_Allocated_Insurer__c = '';
            claimWrapper.caseRecord.CTP_Allocated_Insurer_code__c = null;
            claimWrapper.caseRecord.CTP_PiE_Status_Code__c = '';
            claimWrapper.caseRecord.CTP_PiE_Status_Message__c = '';
            
        update claimWrapper.caseRecord;  
            
       
        return claimWrapper;
    }
    
    /*Delet vehicle*/
    @AuraEnabled public static void deleteVehicle(String vehicleId){
        System.debug('in delete vehicle'+vehicleId);
        CTP_Vehicle__c vehicle = new CTP_Vehicle__c(Id = vehicleId);
        delete vehicle;
    }
   /*
     * Purpose : Method to call integration interface to get vehicle details
     * Author : Parul
     * Modified on : 24-Jan-2018
     * JIRA# : DCR-3649 : OLCS - At Fault Vehicle Registration Number Selected and Found    
    */
     /*
     * Purpose : to pass vehicle record changes with integration wrapper
     * Author : Himani
     * Modified on : 21-feb-2018
     * JIRA# : DCR-4698 : OLCS - At Fault Vehicle Registration Number Selected and Found    
    */
    @AuraEnabled
    public static  PieRespWithVehicle callIntegrationMethod(String claimApplicationJSON,String regNo , String accidentDate, String accidentTime, String caseId ) {
        CTP_OLCSUIWrapper.DetermineInsurerUIRequestWrapper determineInsurerUIRequestWrapper = new CTP_OLCSUIWrapper.DetermineInsurerUIRequestWrapper ();
        CTP_OLCSUIWrapper.DetermineInsurerUIResponseWrapper determineInsurerUIRespWrap = new CTP_OLCSUIWrapper.DetermineInsurerUIResponseWrapper ();
        CTP_ClaimApplicationWrapper claimApplication = (CTP_ClaimApplicationWrapper)JSON.deserialize(claimApplicationJSON, CTP_ClaimApplicationWrapper.class);
        PieRespWithVehicle returnInstance;
        system.debug('claimApplication in Integration>>'+claimApplication);
        Map<String,CTP_Vehicle__c>  vehicleMap = new Map<String,CTP_Vehicle__c>();
        for(CTP_Vehicle__c vehicle:claimApplication.vehicleRecords){  
            vehicleMap.put(vehicle.CTP_Registration_Number__c,vehicle);  
        }
        system.debug('inside integration>>>>>');
        try {
            
            system.debug('dateOfaccident>>>>>>'+accidentDate);
            system.debug('timeOfAccident>>>>>>'+accidentTime);
            
            determineInsurerUIRequestWrapper.registrationNumber = regNo;
            determineInsurerUIRequestWrapper.accidentDate = accidentDate;
            determineInsurerUIRequestWrapper.caseId = caseId;//DCR-3827 - Mohit
            //determineInsurerUIRequestWrapper.accidentTime = accidentTime;     //Not Required: Ankit:7-Feb-18
            
            determineInsurerUIRespWrap = CTP_OLCSIntegrationHandler.callDetermineInsurerAPI(determineInsurerUIRequestWrapper);
            system.debug('Inside apex integration>>>>'+determineInsurerUIRespWrap);
            
        }
        catch (Exception excep) {
            system.debug(excep);
        }
        if(determineInsurerUIRespWrap.statusCode== 400 ||determineInsurerUIRespWrap.statusCode==503 ){     
            if(vehicleMap.containsKey(regNo)){
                vehicleMap.get(regNo).CTP_PIE_Error__c ='Technical issue .An error occurred while attempting to connect to the system.Please try again or contact CTP Assist on 1300 656 919';
            }
            //claimApplication.vehicleRecords = vehicleMap.values();
            returnInstance = new PieRespWithVehicle(vehicleMap.values(),determineInsurerUIRespWrap);
            return returnInstance;              
        }
        else if(determineInsurerUIRespWrap.statusCode== 404){
            if(vehicleMap.containsKey(regNo)){
                vehicleMap.get(regNo).CTP_PIE_Error__c ='Not Found';
            }
            //claimApplication.vehicleRecords = vehicleMap.values();
            returnInstance = new PieRespWithVehicle(vehicleMap.values(),determineInsurerUIRespWrap);
            return returnInstance;  
        }
         /*
          Purpose : If pie response does not have any error, populte insurer name fro pie and insurer code fro respective account
          Author : Himani
          Modified on : 5-frb--2018
          JIRA# : DCR-4698 : Most-At Fault Vehicle Known and Most At-Fault Vehicle Registration Field Updates
         */
        else if(determineInsurerUIRespWrap.statusCode== 200){
            
            if((vehicleMap.containsKey(regNo)) && ((vehicleMap.get(regNo).CTP_PIE_Error__c =='') || (vehicleMap.get(regNo).CTP_PIE_Error__c == null))){
               vehicleMap.get(regNo).CTP_Allocated_Insurer__c =  determineInsurerUIRespWrap.insurerName; 
             
               system.debug('Insurer name --> '+determineInsurerUIRespWrap.insurerName);
                List<Account> accList = [select id,OLCN_InsurerCode__c from account where name=:determineInsurerUIRespWrap.insurerName limit 1];
                if(accList.size() > 0){
                    
                    for(Account acc: accList){
                        system.debug('acc --> '+acc);
                        if(acc.OLCN_InsurerCode__c!= '' && acc.OLCN_InsurerCode__c != null){
                            vehicleMap.get(regNo).CTP_Vehicle_Insurer__c = acc.OLCN_InsurerCode__c;
                            string isurernameAndCode = acc.OLCN_InsurerCode__c;
                            isurernameAndCode = isurernameAndCode.trim();
                            string[] strArray = isurernameAndCode.split('-', 2);
                            //vehicleMap.get(regNo).CTP_Allocated_Insurer__c = strArray[1];
                         //   vehicleMap.get(regNo).CTP_Allocated_Insurer_code__c = Decimal.valueOf(strArray[0]);
                            vehicleMap.get(regNo).CTP_Allocated_Insurer_code__c = Integer.valueOf(strArray[0].trim());
                         }
                    }
                    system.debug('vehicleMap --> '+vehicleMap);
                    system.debug('determineInsurerUIRespWrap --> '+determineInsurerUIRespWrap);
                    
                }
            }
            
           /* for(CTP_Vehicle__c vehicle :vehicleMap.values()){
                claimApplication.vehicleRecords
            }*/
            system.debug('vehicleMap.values()---'+vehicleMap.values());
            //claimApplication.vehicleRecords = vehicleMap.values();
            //system.debug('claimApplication---'+claimApplication);
            
            returnInstance = new PieRespWithVehicle(vehicleMap.values(),determineInsurerUIRespWrap);
            return returnInstance; 
        } 
          /*
          Purpose : If pie response does not have any error, populte insurer name fro pie and insurer code fro respective account
          Author : Himani
          Modified on : 5-frb--2018
          JIRA# : DCR-4698 : Most-At Fault Vehicle Known and Most At-Fault Vehicle Registration Field Updatem.debug();tes
         */
        else{
            //claimApplication.vehicleRecords = vehicleMap.values();
            returnInstance = new PieRespWithVehicle(vehicleMap.values(),determineInsurerUIRespWrap);
            return returnInstance;
        }
        
    }
    
      /*
     * Purpose : to pass vehicle record changes with integration wrapper
     * Author : Himani
     * Modified on : 21-feb-2018
     * JIRA# : DCR-4698 : OLCS - At Fault Vehicle Registration Number Selected and Found    
    */
    /*
     * Purpose : Method to return autocomplete prediction response from Google Maps API to Lightning component
     * Author : Ashish
     * Modified on : 19-Jan-2018
     * JIRA# : DCR-2810 : [MAIN] OLCS - Claimant Reviews their Personal Information
  */
    @AuraEnabled public static String getAddressAutoComplete(String searchPhrase){
        String autoCompleteResponse = makeCallOut(urlBuilderForAutoComplete(searchPhrase));
        Google_AutoComplete_Wrapper resp = (Google_AutoComplete_Wrapper)JSON.deserialize(autoCompleteResponse, Google_AutoComplete_Wrapper.class);
        
        return JSON.serialize(resp.predictions);
    }
    
    /*
     * Purpose : Method to return autocomplete place details when user selects a place on ligthning component as his home address
     * Author : Ashish
     * Modified on : 19-Jan-2018
     * JIRA# : DCR-2810 : [MAIN] OLCS - Claimant Reviews their Personal Information
  */
    @AuraEnabled public static String getSelectedPlaceDetails(String placeId){
        String placeDetailsResponse = makeCallOut(urlBuilderForPlaceDetails(placeId));
        system.debug('placeDetailsResponse--'+placeDetailsResponse);
        
        //placeDetailsResponse = placeDetailsResponse.replaceAll('\\u','');
       
        Google_PlaceDetails_Wrapper resp = (Google_PlaceDetails_Wrapper)JSON.deserialize(placeDetailsResponse, Google_PlaceDetails_Wrapper.class);
        
        return JSON.serialize(resp);
    }
    
    /*
     * Purpose : Private Generic method to make GET callout to external system
     * Author : Ashish
     * Modified on : 19-Jan-2018
     * JIRA# : DCR-2810 : [MAIN] OLCS - Claimant Reviews their Personal Information
  */
    
   private static String makeCallOut(String urlEndpoint){
       String result;
       try{
           Http http = new Http();
           HttpRequest request = new HttpRequest();
           request.setEndpoint(urlEndpoint);
           request.setMethod('GET');
          // request.setHeader('Content-Type', 'application/json');
            //request.setHeader('Accept','application/json');
           HttpResponse response = http.send(request);
           
           system.debug('response---------------------'+response);
           return response.getBody();
       }catch(Exception e){
           System.debug('exception occurred'+e);
           System.debug('exception at line'+e.getLineNumber());
           return e.getMessage();
       }
    }
    
    /*
     * Purpose : Private Method to generate URL endpoint for Google Maps API prediction callout
     * Author : Ashish
     * Modified on : 19-Jan-2018
     * JIRA# : DCR-2810 : [MAIN] OLCS - Claimant Reviews their Personal Information
  */
    private static String urlBuilderForAutoComplete(String searchPhrase){
        String url = '';
        url+=Label.Google_API_AutoComplete_URL;
        url+=EncodingUtil.urlEncode(searchPhrase, 'UTF-8');
        url+='&types=geocode';
        url+='&language=en';
        url+='&key='+Label.Google_API_Key;   
        System.debug('URL is==>'+url);
        
        return url;
    }
    
    /*
     * Purpose : Private Method to generate URL endpoint for Google Maps API Place Details callout
     * Author : Ashish
     * Modified on : 19-Jan-2018
     * JIRA# : DCR-2810 : [MAIN] OLCS - Claimant Reviews their Personal Information
  */
    private static String urlBuilderForPlaceDetails(String placeId){
        String url = '';
        url+=Label.Google_API_Details_URL;
        url+=placeId;
        url+='&language=en';
        url+='&key='+Label.Google_API_Key;   
        System.debug('URL is==>'+url);
        
        return url;
    }
    
    /*Wrappers for Google AutoComplete Prediction response*/
    /*
     * Purpose : Template Wrapper class to save deserialized response from Google Maps API Predictions Autocomplete callout
     * Author : Ashish
     * Modified on : 19-Jan-2018
     * JIRA# : DCR-2810 : [MAIN] OLCS - Claimant Reviews their Personal Information
  */
    
    public class Google_AutoComplete_Wrapper{
        public List<Prediction>predictions;
        public String status;
    }
    public class Prediction{
        public String description;
        public string id;
        public String place_id;
        public String reference;
        public List<Term>terms;
    }
    public class Term{
    public integer offset;
    public String value;
}
    
    /*Wrappers for Google Place Details with place id response*/
    /*
     * Purpose : Template Wrapper class to save deserialized response from Google Maps API Place Details callout
     * Author : Ashish
     * Modified on : 19-Jan-2018
     * JIRA# : DCR-2810 : [MAIN] OLCS - Claimant Reviews their Personal Information
  */
    public class Google_PlaceDetails_Wrapper{
        public Result result;
        public String status;
    }
    
    /*
     * Purpose : Template Wrapper class to save deserialized response from Google Maps API Place Details callout with geo coordinates
     * Author : Himani
     * Modified on : 25-Jan-2018
     * JIRA# : DCR-3651 : 
  */  
 public class Result{
        public List<AddressComponent>address_components;
        public String formatted_address;
        public String icon;
        public String id;
        public String place_id;
        public String url;
        public String reference;
        public Geometry geometry;

    }
    
    public class AddressComponent{
        public String long_name;
        public String short_name;
        public List<String>types;
    }
    
    public class Geometry {
    public Location location;
  }


    
    public class Location {
    public Double lat;
    public Double lng;
  }
    @AuraEnabled
    public static case retrieveDraftCasetoEdit(String caseId){
        
        case draftCase = [SELECT CTP_Mobile__c,  CTP_Prefered_Email_Address_Injured_Persn__c,CTP_Home_Phone__c,CTP_OLCS_Claim_Number__c,ContactId, CTP_Preferred_Contact_Method__c, CTP_KnownWorkerDisabilities__c,CTP_Work_Phone__c,CTP_Preferred_Contact_time__c, CTP_Preferred_Email_Address__c, CTP_Language__c FROM  Case WHERE Id=:caseId LIMIT 1];
       
        System.Debug('>>>>draftCase >>>'+draftCase);                            
        return draftCase;
    }
    
    @AuraEnabled
    public static User retrieveUserData(String caseId){
        
        Case draftcase = retrieveDraftCasetoEdit(caseId);
        System.Debug('>>>draftcase >>> '+draftcase.ContactId);
                
        User userData = [SELECT Id, Email, Name, CTP_Date_Of_Birth__c, CTP_Gender__c,ContactId FROM User WHERE ContactId=:draftcase.ContactId LIMIT 1];
        System.Debug('userData >>>'+userData);
        return userData ;
    }
    
    @AuraEnabled
    public static CTP_Claim__c retrieveClaimRecords(String caseId){
        
        Case draftcase = retrieveDraftCasetoEdit(caseId);
        
        System.Debug('>>>> draftcase.CTP_OLCS_Claim_Number__c >>> '+draftcase.CTP_OLCS_Claim_Number__c);
        
        CTP_Claim__c claimData = [SELECT Id, CTP_Did_Accident_Take_Place_In_NSW__c,CTP_Medicare_Reference_Number__c, CTP_Submitter_Is_Claimant__c, CTP_Early_Treatment_Received__c, CTP_Existing_Claim_Number__c, CTP_Final_Declaration_Name__c, CTP_Medicare_Number__c, CTP_Driver_License_Number__c, CTP_Payment_Method__c,CTP_Account_Name__c,CTP_BSB__c,CTP_Account_Number__c,CTP_Police_Event_Number__c,CTP_AccidentDate__c,CTP_Time_Of_Accident__c, CTP_Accident_Street_Number__c, CTP_Accident_Street__c,CTP_Accident_Postcode__c,CTP_Accident_Role__c, CTP_Accident_Role_Other__c, CTP_Location_Description__c,  CTP_Accident_Description__c, CTP_Most_at_Fault_Vehicle_Known__c, Previous_CTP_Claim__c, CTP_Previous_Claim_Number_1__c, CTP_Previous_Claim_Number_2__c, CTP_Previous_Claim_Number_3__c, CTP_Previous_Claim_Number_4__c, CTP_Previous_Claim_Number_5__c, CTP_Previous_Insurer_1__c, CTP_Previous_Insurer_2__c, CTP_Previous_Insurer_3__c, CTP_Previous_Insurer_4__c, CTP_Previous_Insurer_5__c, CTP_Previous_CTP_Insurer_Other_1__c, CTP_Previous_CTP_Insurer_Other_2__c, CTP_Previous_CTP_Insurer_Other_3__c, CTP_Previous_CTP_Insurer_Other_4__c, CTP_Previous_CTP_Insurer_Other_5__c, CTP_Previous_Date_of_Injury_1__c, CTP_Previous_Date_of_Injury_2__c, CTP_Previous_Date_of_Injury_3__c, CTP_Previous_Date_of_Injury_4__c, CTP_Previous_Date_of_Injury_5__c, CTP_Type_Of_Benefits_Received__c,CTP_Occupation_Primary__c,CTP_Away_From_Primary__c, CTP_Away_Until_Primary__c, CTP_Currently_away_from_work_Primary__c, CTP_Earning_at_time_of_Accident_Primary__c, CTP_Payment_Period_Primary__c,CTP_Obtain_wages_from_Employer_Primary__c FROM CTP_Claim__c WHERE Id =: draftcase.CTP_OLCS_Claim_Number__c];
        
        System.debug('claimData>>>>'+JSON.serializePretty(claimData));
       
        return claimData;
    }
    
    @AuraEnabled
    public static List<CTP_Vehicle__c> retrieveClaimVehicles(String caseId){
        
        if(caseId != null )
            Case draftcase = retrieveDraftCasetoEdit(caseId);
        
        List<CTP_Vehicle__c> vehicleData = [SELECT Id,CTP_Registration_Number__c,CTP_Drivers_First_Name__c,CTP_Drivers_Last_Name__c,CTP_Drivers_Phone_Number__c, CTP_Drivers_Email__c, CTP_Number_Of_Passengers_Known__c  FROM CTP_Vehicle__c WHERE CTP_Vehicle_Case_Number__c =: caseId];
        
        system.debug('vehicleData>>>>'+JSON.serializePretty(vehicleData));
        if(vehicleData.size() > 0 )
            return vehicleData;
        else 
            return null;
    }
    
    @AuraEnabled
    public static List<CTP_Injury_Treatment__c> retrieveInjuryRecords(String caseId){
        
        Case draftcase = retrieveDraftCasetoEdit(caseId);
        
        List<CTP_Injury_Treatment__c> injuryDraftList = [SELECT Id, CTP_Injury_Description__c FROM CTP_Injury_Treatment__c WHERE CTP_Injury_Treatment_Case__c =: caseId];
        
        System.Debug('>>> injuryDraftList >>> '+injuryDraftList);
        return injuryDraftList;
    }
    
    @AuraEnabled
    public static String getAttachmentId(String fileName, String caseId){
        
        return String.valueOf([SELECT Id FROM Attachment__c WHERE FileName__c =: fileName AND Case__c =:caseId ].Id);
    }
    @AuraEnabled
    public static String previewAttachment ( String attachmentId) {
        
        String endpointDomailUrl =Label.AMAZON_DOC_URL; //'https://d3ocqmkvthzmnl.cloudfront.net';
        String communityDomain = Label.COMMUNITY_DOMAIN; //'ctpdev04-ctpdev04.cs57.force.com';
        
        Boolean isSalesforceInternalUser = DRS_ContactService.isSalesforceInternalUser(UserInfo.getUserId());
        Attachment__c objAttachment = [Select Id, Filename__c, S3Key__c from Attachment__c where Id =:AttachmentId];
        Organization objOrganization = [Select IsSandbox From Organization Limit 1];
        String signedURL = DRS_S3Service.getSignedDownloadUrl(objAttachment.S3Key__c);
        
        String url = ''
            + endpointDomailUrl + '/?userId=' + UserInfo.getUserId()
            + '&userName=' + UserInfo.getName()
            + '&attachmentId=' + objAttachment.Id
            + '&communityURL=' + EncodingUtil.urlEncode(communityDomain, 'UTF-8')
            + '&externalView=' + !isSalesforceInternalUser
            + '&isTest=' + objOrganization.IsSandbox
            + '&document=' + EncodingUtil.urlEncode(signedURL, 'UTF-8');
        
        system.debug('@@@@@@ url--->'+url);
        return url;
    }
    @AuraEnabled
    public static User currentUserContact(){

        User currentUser = [SELECT Id, Name, ContactId FROM User WHERE Id=:UserInfo.getUserId() LIMIT 1];
        return currentUser;
    }
    
    @AuraEnabled
     public static contact getassignconsentforSurvey(String claimApplicationJSON, String consent){
        CTP_ClaimApplicationWrapper claimApplication = (CTP_ClaimApplicationWrapper)JSON.deserialize(claimApplicationJSON, CTP_ClaimApplicationWrapper.class); 
            List<contact> contactList = new List<Contact>();
            system.debug('++++++++++++++++++++=='+claimApplication.caseRecord.CTP_InjuredPersonContact__c);
            system.debug('++++++++++++++++++++=='+consent);
            Contact con=[select Email from contact where Id=:claimApplication.claimRecord.CTP_Claimant_Contact__c];
             // StrinSubmitterEmail=con.Email;
             system.debug('++++++++++Email++++++++++=='+con.Email);
            if(claimApplication.caseRecord.CTP_InjuredPersonContact__c!=NULL || claimApplication.caseRecord.CTP_SubmitterContact__c !=NULL){
               Contact contct = new Contact();
                if(claimApplication.caseRecord.CTP_InjuredPersonContact__c!=NULL){
                 contct.Id=claimApplication.caseRecord.CTP_InjuredPersonContact__c;
                 
                  system.debug('++++++++++++++++++++=='+claimApplication.caseRecord.CTP_InjuredPersonContact__c);
               }
                else{
                 contct.Id=claimApplication.caseRecord.CTP_SubmitterContact__c;
                 //contct.Id='0035D00000FZUXmQAP';
                }
                if(claimApplication.caseRecord.CTP_InjuredPersonContact__c==NULL && claimApplication.caseRecord.CTP_SubmitterContact__c==null){
                   contct.Id= claimApplication.claimRecord.CTP_Claimant_Contact__c;
                }
                contct.CTP_Consent_for_Survey__c=consent;
                contactList.add(contct);
                system.debug('+++++++++contactList+++++++++++=='+contactList);
               if(contactList.size()>0){
                  Update  contactList;
                }
            }
         return con;
    }
    /*Delet Injury History -- FIX Sridevi 5016 */
    @AuraEnabled public static void deleteInjuryHistory(String injuryId){
        System.debug('in delete Injury'+injuryId);
        CTP_Injury_Treatment__c injury = new CTP_Injury_Treatment__c(id = injuryId);
        System.Debug('>>> injury >>>'+injury);
        delete injury;
        System.Debug('>>> injury deleted >>>'+injury);
    }
    
    
      /*Method added by Mohit for Integration on Submit Application
   */
    @AuraEnabled
    public static  CTP_OLCSUIWrapper.ClaimSubmissionUIResponseWrapper callSubmitIntegrationMethod(String claimApplicationJSON) {
        system.debug('inside integration>>>>>');
        CTP_OLCSUIWrapper.ClaimSubmissionUIRequestWrapper claimSubmissionUIRequestWrapper = new CTP_OLCSUIWrapper.ClaimSubmissionUIRequestWrapper();
        CTP_OLCSIntegrationHandlerWrapper.ClaimSubmissionRequestWrapper claimSubmissionINTRequestWrapper = new CTP_OLCSIntegrationHandlerWrapper.ClaimSubmissionRequestWrapper();
        CTP_OLCSUIWrapper.ClaimSubmissionUIResponseWrapper Response = new CTP_OLCSUIWrapper.ClaimSubmissionUIResponseWrapper();
        CTP_OLCSUIWrapper.ExtensionWrapper extensionWrapper = new CTP_OLCSUIWrapper.ExtensionWrapper();
        claimSubmissionUIRequestWrapper.extensionWrapperRecord = extensionWrapper;
        
        CTP_ClaimApplicationWrapper claimApplication = (CTP_ClaimApplicationWrapper)JSON.deserialize(claimApplicationJSON, CTP_ClaimApplicationWrapper.class);
        CTP_OLCS_Integration_Settings__c mc = CTP_OLCS_Integration_Settings__c.getValues('ClaimSubmissionAPI');  //DCR-6390 -- Mohit 
        system.debug('Claim Submission custom Setting >>>>>'+mc);
        if(mc.Active__c == true){  //DCR-6390 -- Mohit 
            
            //DCR-4257 - Mohit Starts
            List<Case> casList = new List<Case>([select id, CaseNumber,CTP_Matter_Type__c, CTP_skipPolicyValidation__c,  
                                                 CTP_Unit_Num__c, CTP_Street_Num__c, CTP_Injured_Street__c, CTP_Injured_Suburb__c, 
                                                 CTP_Injured_State__c, CTP_Injured_Postcode__c,CTP_Injured_Country__c, CTP_Interpreter_Required__c
                                                 from Case where id=:claimApplication.caseRecord.id]); 
            system.debug('case Record >>>>>'+casList);
            List<Contact> conList = new List<Contact>([Select id, FirstName, LastName, Email from Contact where id=:claimApplication.caseRecord.CTP_SubmitterContact__c LIMIT 1]);
            
            List<User> usrList = new List<User>([select id , FirstName, LastName from User where id=:claimApplication.userRecord.Id]);
             system.debug('User Record >>>>>'+usrList);
            //DCR-4257 - Mohit Ends
            
            Case casRec = new Case();
            CTP_Claim__c claimRec = new CTP_Claim__c();
            Contact conRec = new Contact();
            Contact submitCon = new Contact();
            List<CTP_Vehicle__c> vehicleWrapList = new List<CTP_Vehicle__c>();
            List<CTP_Injury_Treatment__c> previousInjuriesList = new List<CTP_Injury_Treatment__c>();
            List<CTP_Injury_Treatment__c> injuryDetailsList = new List<CTP_Injury_Treatment__c>();
            List<CTP_Injury_Treatment__c> treatmentsRecordList = new List<CTP_Injury_Treatment__c>();
            Contact employmentsRecord = new Contact();
            
           //Populating Submitter Contact Record
            if(conList.size() > 0){
              submitCon.FirstName = conList[0].FirstName; //Added By Mohit -10/03/2018
              submitCon.LastName = conList[0].LastName; //Added By Mohit -10/03/2018//
              submitCon.Email = conList[0].Email; //Added By Mohit -10/03/2018
            }
            
            //Populating Employee Records- Mohit
            claimRec.CTP_Type_Of_Benefits_Received__c =claimApplication.claimRecord.CTP_Type_Of_Benefits_Received__c;
            claimRec.CTP_Rec_Centrelink_At_Time_Of_Accident__c =claimApplication.claimRecord.CTP_Rec_Centrelink_At_Time_Of_Accident__c;
            //Primary Employer Details
            employmentsRecord.CTP_Occupation_Primary__c = claimApplication.contactRecord.CTP_Occupation_Primary__c;
            employmentsRecord.CTP_Payment_Period_Primary__c = claimApplication.contactRecord.CTP_Payment_Period_Primary__c;
            employmentsRecord.CTP_Employer_email_Primary__c = claimApplication.contactRecord.CTP_Employer_email_Primary__c;
            employmentsRecord.CTP_Away_From_Work_Due_To_Accident__c = claimApplication.contactRecord.CTP_Away_From_Work_Due_To_Accident__c; //Added By Mohit-08/03/18
            employmentsRecord.CTP_Employer_Company_Name_Primary__c = claimApplication.contactRecord.CTP_Employer_Company_Name_Primary__c; //Added By Mohit-08/03/18
            employmentsRecord.CTP_Away_From_Primary__c = claimApplication.contactRecord.CTP_Away_From_Primary__c; //Added By Mohit-08/03/18
            employmentsRecord.CTP_Away_Until_Primary__c = claimApplication.contactRecord.CTP_Away_Until_Primary__c; //Added By Mohit-08/03/18
            employmentsRecord.CTP_Currently_away_from_work_Primary__c = claimApplication.contactRecord.CTP_Currently_away_from_work_Primary__c; //Added By Mohit-08/03/18
        	employmentsRecord.CTP_Length_of_time_off_work_Primary__c = claimApplication.contactRecord.CTP_Length_of_time_off_work_Primary__c; //Added By Mohit-08/03/18
            employmentsRecord.CTP_Earning_at_time_of_Accident_Primary__c = claimApplication.contactRecord.CTP_Earning_at_time_of_Accident_Primary__c; //Added By Mohit-08/03/18
            employmentsRecord.CTP_Obtain_wages_from_Employer_Primary__c = claimApplication.contactRecord.CTP_Obtain_wages_from_Employer_Primary__c; //Added By Mohit-08/03/18
            employmentsRecord.CTP_Employer_first_name_Primary__c = claimApplication.contactRecord.CTP_Employer_first_name_Primary__c; //Added By Mohit-08/03/18
            employmentsRecord.CTP_Employer_last_name_Primary__c = claimApplication.contactRecord.CTP_Employer_last_name_Primary__c; //Added By Mohit-08/03/18
            employmentsRecord.CTP_Employer_Phone_Number_Primary__c = claimApplication.contactRecord.CTP_Employer_Phone_Number_Primary__c; //Added By Mohit-08/03/18
			employmentsRecord.CTP_Employer_Unit_Number_Primary__c = claimApplication.contactRecord.CTP_Employer_Unit_Number_Primary__c; //Added By Mohit-08/03/18
 			employmentsRecord.CTP_Employer_Street_Number_Primary__c = claimApplication.contactRecord.CTP_Employer_Street_Number_Primary__c; //Added By Mohit-08/03/18
         	employmentsRecord.CTP_Employer_Suburb_Primary__c = claimApplication.contactRecord.CTP_Employer_Suburb_Primary__c; //Added By Mohit-08/03/18
           	employmentsRecord.CTP_Employer_State_Primary__c = claimApplication.contactRecord.CTP_Employer_State_Primary__c; //Added By Mohit-08/03/18
           	employmentsRecord.CTP_Employer_Postcode_Primary__c = claimApplication.contactRecord.CTP_Employer_Postcode_Primary__c; //Added By Mohit-08/03/18
            employmentsRecord.CTP_Employer_Street_Name_Primary__c = claimApplication.contactRecord.CTP_Employer_Street_Name_Primary__c; //Added By Mohit-08/03/18
         	//Secondary 1 Employer Details
            employmentsRecord.CTP_Occupation_Secondary_1__c = claimApplication.contactRecord.CTP_Occupation_Secondary_1__c;//Added By Mohit-08/03/18
            employmentsRecord.CTP_Employer_Company_Name_Secondary_1__c = claimApplication.contactRecord.CTP_Employer_Company_Name_Secondary_1__c;//Added By Mohit-08/03/18
            employmentsRecord.CTP_Away_From_Secondary_1__c = claimApplication.contactRecord.CTP_Away_From_Secondary_1__c;//Added By Mohit-08/03/18
            employmentsRecord.CTP_Away_Until_Secondary_1__c = claimApplication.contactRecord.CTP_Away_Until_Secondary_1__c;//Added By Mohit-08/03/18
           	employmentsRecord.CTP_Currently_away_from_work_Secondary_1__c = claimApplication.contactRecord.CTP_Currently_away_from_work_Secondary_1__c;//Added By Mohit-08/03/18
           	employmentsRecord.CTP_Length_of_time_off_work_Secondary_1__c = claimApplication.contactRecord.CTP_Length_of_time_off_work_Secondary_1__c;//Added By Mohit-08/03/18
            employmentsRecord.CTP_Payment_Period_Secondary_1__c = claimApplication.contactRecord.CTP_Payment_Period_Secondary_1__c;//Added By Mohit-08/03/18
           	employmentsRecord.CTP_Earning_at_time_of_Accident_Sec1__c = claimApplication.contactRecord.CTP_Earning_at_time_of_Accident_Sec1__c;//Added By Mohit-08/03/18
            employmentsRecord.CTP_Obtain_wages_from_Employer_Sec_1__c = claimApplication.contactRecord.CTP_Obtain_wages_from_Employer_Sec_1__c;//Added By Mohit-08/03/18
            employmentsRecord.CTP_Employer_first_name_Secondary_1__c = claimApplication.contactRecord.CTP_Employer_first_name_Secondary_1__c;//Added By Mohit-08/03/18
            employmentsRecord.CTP_Employer_last_name_Secondary_1__c = claimApplication.contactRecord.CTP_Employer_last_name_Secondary_1__c;//Added By Mohit-08/03/18
            employmentsRecord.CTP_Employer_Phone_Num_Area_Code_Sec_1__c = claimApplication.contactRecord.CTP_Employer_Phone_Num_Area_Code_Sec_1__c;//Added By Mohit-08/03/18
            employmentsRecord.CTP_Employer_Phone_Number_Secondary_1__c = claimApplication.contactRecord.CTP_Employer_Phone_Number_Secondary_1__c;//Added By Mohit-08/03/18
          	employmentsRecord.CTP_Employer_email_Secondary_1__c = claimApplication.contactRecord.CTP_Employer_email_Secondary_1__c;//Added By Mohit-08/03/18
         	employmentsRecord.CTP_Employer_Unit_Number_Secondary_1__c = claimApplication.contactRecord.CTP_Employer_Unit_Number_Secondary_1__c;//Added By Mohit-08/03/18
         	employmentsRecord.CTP_Employer_Street_Number_Secondary_1__c = claimApplication.contactRecord.CTP_Employer_Street_Number_Secondary_1__c;//Added By Mohit-08/03/18
         	employmentsRecord.CTP_Employer_Suburb_Secondary_1__c = claimApplication.contactRecord.CTP_Employer_Suburb_Secondary_1__c;//Added By Mohit-08/03/18
         	employmentsRecord.CTP_Employer_State_Secondary_1__c = claimApplication.contactRecord.CTP_Employer_State_Secondary_1__c;//Added By Mohit-08/03/18
            employmentsRecord.CTP_Employer_Postcode_Secondary_1__c = claimApplication.contactRecord.CTP_Employer_Postcode_Secondary_1__c;//Added By Mohit-08/03/18
            employmentsRecord.CTP_Employer_Street_Name_Secondary_1__c = claimApplication.contactRecord.CTP_Employer_Street_Name_Secondary_1__c;//Added By Mohit-08/03/18
        	//Secondary 2 Employer Details
            employmentsRecord.CTP_Occupation_Secondary_2__c = claimApplication.contactRecord.CTP_Occupation_Secondary_2__c;//Added By Mohit-08/03/18
            employmentsRecord.CTP_Employer_Company_Name_Secondary_2__c = claimApplication.contactRecord.CTP_Employer_Company_Name_Secondary_2__c;//Added By Mohit-08/03/18
            employmentsRecord.CTP_Away_From_Secondary_2__c = claimApplication.contactRecord.CTP_Away_From_Secondary_2__c;//Added By Mohit-08/03/18
            employmentsRecord.CTP_Away_Until_Secondary_2__c = claimApplication.contactRecord.CTP_Away_Until_Secondary_2__c;//Added By Mohit-08/03/18
           	employmentsRecord.CTP_Currently_away_from_work_Secondary_2__c = claimApplication.contactRecord.CTP_Currently_away_from_work_Secondary_2__c;//Added By Mohit-08/03/18
           	employmentsRecord.CTP_Length_of_time_off_work_Secondary_2__c = claimApplication.contactRecord.CTP_Length_of_time_off_work_Secondary_2__c;//Added By Mohit-08/03/18
            employmentsRecord.CTP_Payment_Period_Secondary_2__c = claimApplication.contactRecord.CTP_Payment_Period_Secondary_2__c;//Added By Mohit-08/03/18
           	employmentsRecord.CTP_Earning_at_time_of_Accident_Sec2__c = claimApplication.contactRecord.CTP_Earning_at_time_of_Accident_Sec2__c;//Added By Mohit-08/03/18
            employmentsRecord.CTP_Obtain_wages_from_Employer_Sec_2__c = claimApplication.contactRecord.CTP_Obtain_wages_from_Employer_Sec_2__c;//Added By Mohit-08/03/18
            employmentsRecord.CTP_Employer_first_name_Secondary_2__c = claimApplication.contactRecord.CTP_Employer_first_name_Secondary_2__c;//Added By Mohit-08/03/18
            employmentsRecord.CTP_Employer_last_name_Secondary_2__c = claimApplication.contactRecord.CTP_Employer_last_name_Secondary_2__c;//Added By Mohit-08/03/18
            employmentsRecord.CTP_Employer_Phone_Number_Secondary_2__c = claimApplication.contactRecord.CTP_Employer_Phone_Number_Secondary_2__c;//Added By Mohit-08/03/18
            employmentsRecord.CTP_Employer_Phone_Num_Area_Code_Sec_2__c = claimApplication.contactRecord.CTP_Employer_Phone_Num_Area_Code_Sec_2__c;//Added By Mohit-08/03/18
            employmentsRecord.CTP_Employer_email_Secondary_2__c = claimApplication.contactRecord.CTP_Employer_email_Secondary_2__c;//Added By Mohit-08/03/18
          	employmentsRecord.CTP_Employer_Unit_Number_Secondary_2__c = claimApplication.contactRecord.CTP_Employer_Unit_Number_Secondary_2__c;//Added By Mohit-08/03/18
         	employmentsRecord.CTP_Employer_Street_Number_Secondary_2__c = claimApplication.contactRecord.CTP_Employer_Street_Number_Secondary_2__c;//Added By Mohit-08/03/18
         	employmentsRecord.CTP_Employer_Suburb_Secondary_2__c = claimApplication.contactRecord.CTP_Employer_Suburb_Secondary_2__c;//Added By Mohit-08/03/18
         	employmentsRecord.CTP_Employer_State_Secondary_2__c = claimApplication.contactRecord.CTP_Employer_State_Secondary_2__c;//Added By Mohit-08/03/18
         	employmentsRecord.CTP_Employer_Postcode_Secondary_2__c = claimApplication.contactRecord.CTP_Employer_Postcode_Secondary_2__c;//Added By Mohit-08/03/18
            employmentsRecord.CTP_Employer_Street_Name_Secondary_2__c = claimApplication.contactRecord.CTP_Employer_Street_Name_Secondary_2__c;//Added By Mohit-08/03/18
            
            //Secondary 3 Employer Details
            employmentsRecord.CTP_Occupation_Secondary_3__c = claimApplication.contactRecord.CTP_Occupation_Secondary_3__c;//Added By Mohit-08/03/18
            employmentsRecord.CTP_Employer_Company_Name_Secondary_3__c = claimApplication.contactRecord.CTP_Employer_Company_Name_Secondary_3__c;//Added By Mohit-08/03/18
            employmentsRecord.CTP_Away_From_Secondary_3__c = claimApplication.contactRecord.CTP_Away_From_Secondary_3__c;//Added By Mohit-08/03/18
            employmentsRecord.CTP_Away_Until_Secondary_3__c = claimApplication.contactRecord.CTP_Away_Until_Secondary_3__c;//Added By Mohit-08/03/18
           	employmentsRecord.CTP_Currently_away_from_work_Secondary_3__c = claimApplication.contactRecord.CTP_Currently_away_from_work_Secondary_3__c;//Added By Mohit-08/03/18
           	employmentsRecord.CTP_Length_of_time_off_work_Secondary_3__c = claimApplication.contactRecord.CTP_Length_of_time_off_work_Secondary_3__c;//Added By Mohit-08/03/18
            employmentsRecord.CTP_Payment_Period_Secondary_3__c = claimApplication.contactRecord.CTP_Payment_Period_Secondary_3__c;//Added By Mohit-08/03/18
           	employmentsRecord.CTP_Earning_at_time_of_Accident_Sec3__c = claimApplication.contactRecord.CTP_Earning_at_time_of_Accident_Sec3__c;//Added By Mohit-08/03/18
            employmentsRecord.CTP_Obtain_wages_from_Employer_Sec_3__c = claimApplication.contactRecord.CTP_Obtain_wages_from_Employer_Sec_3__c;//Added By Mohit-08/03/18
            employmentsRecord.CTP_Employer_first_name_Secondary_3__c = claimApplication.contactRecord.CTP_Employer_first_name_Secondary_3__c;//Added By Mohit-08/03/18
            employmentsRecord.CTP_Employer_last_name_Secondary_3__c = claimApplication.contactRecord.CTP_Employer_last_name_Secondary_3__c;//Added By Mohit-08/03/18
            employmentsRecord.CTP_Employer_Phone_Num_Area_Code_Sec_3__c = claimApplication.contactRecord.CTP_Employer_Phone_Num_Area_Code_Sec_3__c;//Added By Mohit-08/03/18
            employmentsRecord.CTP_Employer_Phone_Number_Secondary_3__c = claimApplication.contactRecord.CTP_Employer_Phone_Number_Secondary_3__c;//Added By Mohit-08/03/18
          	employmentsRecord.CTP_Employer_email_Secondary_3__c = claimApplication.contactRecord.CTP_Employer_email_Secondary_3__c;//Added By Mohit-08/03/18
         	employmentsRecord.CTP_Employer_Unit_Number_Secondary_3__c = claimApplication.contactRecord.CTP_Employer_Unit_Number_Secondary_3__c;//Added By Mohit-08/03/18
         	employmentsRecord.CTP_Employer_Street_Number_Secondary_3__c = claimApplication.contactRecord.CTP_Employer_Street_Number_Secondary_3__c;//Added By Mohit-08/03/18
         	employmentsRecord.CTP_Employer_Suburb_Secondary_3__c = claimApplication.contactRecord.CTP_Employer_Suburb_Secondary_3__c;//Added By Mohit-08/03/18
         	employmentsRecord.CTP_Employer_State_Secondary_3__c = claimApplication.contactRecord.CTP_Employer_State_Secondary_3__c;//Added By Mohit-08/03/18
            employmentsRecord.CTP_Employer_Postcode_Secondary_3__c = claimApplication.contactRecord.CTP_Employer_Postcode_Secondary_3__c;//Added By Mohit-08/03/18
            employmentsRecord.CTP_Employer_Street_Name_Secondary_3__c = claimApplication.contactRecord.CTP_Employer_Street_Name_Secondary_3__c;//Added By Mohit-08/03/18
            
        	//Secondary 4 Employer Details
            employmentsRecord.CTP_Occupation_Secondary_4__c = claimApplication.contactRecord.CTP_Occupation_Secondary_4__c;//Added By Mohit-08/03/18
            employmentsRecord.CTP_Employer_Company_Name_Secondary_4__c = claimApplication.contactRecord.CTP_Employer_Company_Name_Secondary_4__c;//Added By Mohit-08/03/18
            employmentsRecord.CTP_Away_From_Secondary_4__c = claimApplication.contactRecord.CTP_Away_From_Secondary_4__c;//Added By Mohit-08/03/18
            employmentsRecord.CTP_Away_Until_Secondary_4__c = claimApplication.contactRecord.CTP_Away_Until_Secondary_4__c;//Added By Mohit-08/03/18
           	employmentsRecord.CTP_Currently_away_from_work_Secondary_4__c = claimApplication.contactRecord.CTP_Currently_away_from_work_Secondary_4__c;//Added By Mohit-08/03/18
           	employmentsRecord.CTP_Length_of_time_off_work_Secondary_4__c = claimApplication.contactRecord.CTP_Length_of_time_off_work_Secondary_4__c;//Added By Mohit-08/03/18
            employmentsRecord.CTP_Payment_Period_Secondary_4__c = claimApplication.contactRecord.CTP_Payment_Period_Secondary_4__c;//Added By Mohit-08/03/18
           	employmentsRecord.CTP_Earning_at_time_of_Accident_Sec4__c = claimApplication.contactRecord.CTP_Earning_at_time_of_Accident_Sec4__c;//Added By Mohit-08/03/18
            employmentsRecord.CTP_Obtain_wages_from_Employer_Sec_4__c = claimApplication.contactRecord.CTP_Obtain_wages_from_Employer_Sec_4__c;//Added By Mohit-08/03/18
            employmentsRecord.CTP_Employer_first_name_Secondary_4__c = claimApplication.contactRecord.CTP_Employer_first_name_Secondary_4__c;//Added By Mohit-08/03/18
            employmentsRecord.CTP_Employer_last_name_Secondary_4__c = claimApplication.contactRecord.CTP_Employer_last_name_Secondary_4__c;//Added By Mohit-08/03/18
            employmentsRecord.CTP_Employer_Phone_Num_Area_Code_Sec_4__c = claimApplication.contactRecord.CTP_Employer_Phone_Num_Area_Code_Sec_4__c;//Added By Mohit-08/03/18
            employmentsRecord.CTP_Employer_Phone_Number_Secondary_4__c = claimApplication.contactRecord.CTP_Employer_Phone_Number_Secondary_4__c;//Added By Mohit-08/03/18
          	employmentsRecord.CTP_Employer_email_Secondary_4__c = claimApplication.contactRecord.CTP_Employer_email_Secondary_4__c;//Added By Mohit-08/03/18
         	employmentsRecord.CTP_Employer_Unit_Number_Secondary_4__c = claimApplication.contactRecord.CTP_Employer_Unit_Number_Secondary_4__c;//Added By Mohit-08/03/18
         	employmentsRecord.CTP_Employer_Street_Number_Secondary_4__c = claimApplication.contactRecord.CTP_Employer_Street_Number_Secondary_4__c;//Added By Mohit-08/03/18
         	employmentsRecord.CTP_Employer_Suburb_Secondary_4__c = claimApplication.contactRecord.CTP_Employer_Suburb_Secondary_4__c;//Added By Mohit-08/03/18
         	employmentsRecord.CTP_Employer_State_Secondary_4__c = claimApplication.contactRecord.CTP_Employer_State_Secondary_4__c;//Added By Mohit-08/03/18
            employmentsRecord.CTP_Employer_Postcode_Secondary_4__c = claimApplication.contactRecord.CTP_Employer_Postcode_Secondary_4__c;//Added By Mohit-08/03/18
            employmentsRecord.CTP_Employer_Street_Name_Secondary_4__c = claimApplication.contactRecord.CTP_Employer_Street_Name_Secondary_4__c;//Added By Mohit-08/03/18

          
            //Populating Injury Details - Mohit
            List<CTP_Injury_Treatment__c> injuryTreatList = claimApplication.injuryRecordList;
                if(!injuryTreatList.isEmpty() && injuryTreatList.size() > 0) {
                    for (CTP_Injury_Treatment__c injuryTreatment : injuryTreatList) {
                        CTP_Injury_Treatment__c inj = new CTP_Injury_Treatment__c();
                        inj.CTP_Injury_Description__c = injuryTreatment.CTP_Injury_Description__c;
                        injuryDetailsList.add(inj);
                }
            }
            //Populating Personal Info - Mohit
            claimRec.CTP_Driver_License_Number__c =claimApplication.claimRecord.CTP_Driver_License_Number__c;
            claimRec.CTP_Driver_license_state__c = claimApplication.claimRecord.CTP_Driver_license_state__c;
            claimRec.CTP_Medicare_Number__c = claimApplication.claimRecord.CTP_Medicare_Number__c;
            claimRec.CTP_Medicare_Reference_Number__c = claimApplication.claimRecord.CTP_Medicare_Reference_Number__c;
            claimRec.CTP_Payment_Method__c = claimApplication.claimRecord.CTP_Payment_Method__c;
            claimRec.CTP_Account_Name__c = claimApplication.claimRecord.CTP_Account_Name__c;
            claimRec.CTP_Account_Number__c = claimApplication.claimRecord.CTP_Account_Number__c;
            claimRec.CTP_BSB__c = claimApplication.claimRecord.CTP_BSB__c;
            
            //Populating Previous Insurer -Mohit
            claimRec.Previous_CTP_Claim__c = claimApplication.claimRecord.Previous_CTP_Claim__c;
            claimRec.CTP_Previous_Claim_Number_1__c = claimApplication.claimRecord.CTP_Previous_Claim_Number_1__c;
            claimRec.CTP_Previous_Insurer_1__c = claimApplication.claimRecord.CTP_Previous_Insurer_1__c;
            claimRec.CTP_Year_of_Injury_1__c = Integer.valueOf(claimApplication.claimRecord.CTP_Year_of_Injury_1__c);//Added By Mohit-08/03/18
            claimRec.CTP_Month_of_Injury_1__c = Integer.valueOf(claimApplication.claimRecord.CTP_Month_of_Injury_1__c);//Added By Mohit-08/03/18
            //claimRec.CTP_Year_of_Injury_1__c = claimApplication.claimRecord.CTP_Year_of_Injury_1__c;//Added By Mohit-08/03/18
            //claimRec.CTP_Month_of_Injury_1__c = claimApplication.claimRecord.CTP_Month_of_Injury_1__c;//Added By Mohit-08/03/18
            claimRec.CTP_Previous_CTP_Insurer_Other_1__c = claimApplication.claimRecord.CTP_Previous_CTP_Insurer_Other_1__c;//Added By Mohit-08/03/18
            
            claimRec.CTP_Previous_Claim_Number_2__c = claimApplication.claimRecord.CTP_Previous_Claim_Number_2__c;//Added By Mohit-08/03/18
            claimRec.CTP_Previous_Insurer_2__c = claimApplication.claimRecord.CTP_Previous_Insurer_2__c;//Added By Mohit-08/03/18
            claimRec.CTP_Year_of_Injury_2__c = Integer.valueOf(claimApplication.claimRecord.CTP_Year_of_Injury_2__c);//Added By Mohit-08/03/18
            claimRec.CTP_Month_of_Injury_2__c = Integer.valueOf(claimApplication.claimRecord.CTP_Month_of_Injury_2__c);//Added By Mohit-08/03/18
            //claimRec.CTP_Year_of_Injury_2__c = claimApplication.claimRecord.CTP_Year_of_Injury_2__c;//Added By Mohit-08/03/18
            //claimRec.CTP_Month_of_Injury_2__c = claimApplication.claimRecord.CTP_Month_of_Injury_2__c;//Added By Mohit-08/03/18
            claimRec.CTP_Previous_CTP_Insurer_Other_2__c = claimApplication.claimRecord.CTP_Previous_CTP_Insurer_Other_2__c;//Added By Mohit-08/03/18
            
            claimRec.CTP_Previous_Claim_Number_3__c = claimApplication.claimRecord.CTP_Previous_Claim_Number_3__c;//Added By Mohit-08/03/18
            claimRec.CTP_Previous_Insurer_3__c = claimApplication.claimRecord.CTP_Previous_Insurer_3__c;//Added By Mohit-08/03/18
            claimRec.CTP_Previous_CTP_Insurer_Other_3__c = claimApplication.claimRecord.CTP_Previous_CTP_Insurer_Other_3__c;//Added By Mohit-08/03/18
            claimRec.CTP_Year_of_Injury_3__c = Integer.valueOf(claimApplication.claimRecord.CTP_Year_of_Injury_3__c);//Added By Mohit-08/03/18
            claimRec.CTP_Month_of_Injury_3__c = Integer.valueOf(claimApplication.claimRecord.CTP_Month_of_Injury_3__c);//Added By Mohit-08/03/18
            //claimRec.CTP_Year_of_Injury_3__c = claimApplication.claimRecord.CTP_Year_of_Injury_3__c;//Added By Mohit-08/03/18
            //claimRec.CTP_Month_of_Injury_3__c = claimApplication.claimRecord.CTP_Month_of_Injury_3__c;//Added By Mohit-08/03/18
            
            claimRec.CTP_Previous_Claim_Number_4__c = claimApplication.claimRecord.CTP_Previous_Claim_Number_4__c;//Added By Mohit-08/03/18
            claimRec.CTP_Previous_Insurer_4__c = claimApplication.claimRecord.CTP_Previous_Insurer_4__c;//Added By Mohit-08/03/18
            claimRec.CTP_Previous_CTP_Insurer_Other_4__c = claimApplication.claimRecord.CTP_Previous_CTP_Insurer_Other_4__c;//Added By Mohit-08/03/18
            claimRec.CTP_Year_of_Injury_4__c = Integer.valueOf(claimApplication.claimRecord.CTP_Year_of_Injury_4__c);//Added By Mohit-08/03/18
            claimRec.CTP_Month_of_Injury_4__c = Integer.valueOf(claimApplication.claimRecord.CTP_Month_of_Injury_4__c);//Added By Mohit-08/03/18
           // claimRec.CTP_Year_of_Injury_4__c = claimApplication.claimRecord.CTP_Year_of_Injury_4__c;//Added By Mohit-08/03/18
           // claimRec.CTP_Month_of_Injury_4__c = claimApplication.claimRecord.CTP_Month_of_Injury_4__c;//Added By Mohit-08/03/18
            
            claimRec.CTP_Year_of_Injury_5__c = Integer.valueOf(claimApplication.claimRecord.CTP_Year_of_Injury_5__c);//Added By Mohit-08/03/18
            claimRec.CTP_Month_of_Injury_5__c = Integer.valueOf(claimApplication.claimRecord.CTP_Month_of_Injury_5__c);//Added By Mohit-08/03/18
            claimRec.CTP_Previous_Claim_Number_5__c = claimApplication.claimRecord.CTP_Previous_Claim_Number_5__c;//Added By Mohit-08/03/18
            claimRec.CTP_Previous_Insurer_5__c = claimApplication.claimRecord.CTP_Previous_Insurer_5__c;//Added By Mohit-08/03/18
            claimRec.CTP_Previous_CTP_Insurer_Other_5__c = claimApplication.claimRecord.CTP_Previous_CTP_Insurer_Other_5__c;//Added By Mohit-08/03/18
          //  claimRec.CTP_Year_of_Injury_5__c =claimApplication.claimRecord.CTP_Year_of_Injury_5__c;//Added By Mohit-08/03/18
          //  claimRec.CTP_Month_of_Injury_5__c = claimApplication.claimRecord.CTP_Month_of_Injury_5__c;//Added By Mohit-08/03/18
            
            
            //Previous Injury populated by Mohit
                if(!injuryTreatList.isEmpty() && injuryTreatList.size() > 0) {
                    for (CTP_Injury_Treatment__c injuryTreatment : injuryTreatList ) {
                        CTP_Injury_Treatment__c injr = new CTP_Injury_Treatment__c();
                        injr.CTP_Previous_Injury_Date__c = injuryTreatment.CTP_Previous_Injury_Date__c;
                        injr.CTP_Injury_Description__c = injuryTreatment.CTP_Injury_Description__c;
                        previousInjuriesList.add(injr);
                }
            }
           
            //Populating Representative Details
            casRec.CTP_Rep_First_Name__c = claimApplication.caseRecord.CTP_Rep_First_Name__c;
            casRec.CTP_Rep_Last_Name__c = claimApplication.caseRecord.CTP_Rep_Last_Name__c;
            casRec.CTP_Rep_Type__c = claimApplication.caseRecord.CTP_Rep_Type__c;
            casRec.OLCN_RepTypeOther__c = claimApplication.caseRecord.OLCN_RepTypeOther__c;
            casRec.CTP_Rep_Language_Required__c = claimApplication.caseRecord.CTP_Rep_Language_Required__c;
            casRec.CTP_Rep_Email__c = claimApplication.caseRecord.CTP_Rep_Email__c;
            casRec.CTP_Rep_Preferred_Contact_Time__c = claimApplication.caseRecord.CTP_Rep_Preferred_Contact_Time__c;//Added By Mohit-08/03/18
          	casRec.CTP_Correspondence__c = claimApplication.caseRecord.CTP_Correspondence__c;//Added By Mohit-08/03/18
            casRec.CTP_Rep_Phone__c = claimApplication.caseRecord.CTP_Rep_Phone__c;//Added By Mohit-08/03/18
            casRec.CTP_Submitter_Type__c = claimApplication.caseRecord.CTP_Submitter_Type__c;//Added By Mohit-08/03/18
            casRec.CTP_Reason_Submitting__c = claimApplication.caseRecord.CTP_Reason_Submitting__c;//Added By Mohit-08/03/18
            casRec.CTP_Submitter_is_a_nominated_rep__c = claimApplication.caseRecord.CTP_Submitter_is_a_nominated_rep__c;//Added By Mohit-08/03/18
            
            
            //Populating Treatment Details - Mohit
            claimRec.CTP_Treatment_Rec_At_Hosp_Post_Accident__c =claimApplication.claimRecord.CTP_Treatment_Rec_At_Hosp_Post_Accident__c;
            claimRec.CTP_Hospital_Name__c = claimApplication.claimRecord.CTP_Hospital_Name__c;
            claimRec.CTP_Ambulance_Used__c = claimApplication.claimRecord.CTP_Ambulance_Used__c;
            claimRec.CTP_Discharged_From_Hospital__c =claimApplication.claimRecord.CTP_Discharged_From_Hospital__c;
            claimRec.CTP_Date_Of_Discharge__c = claimApplication.claimRecord.CTP_Date_Of_Discharge__c;
            
          //Populating Treatment Details - Mohit
            if(!injuryTreatList.isEmpty() && injuryTreatList.size() > 0) {
                    for (CTP_Injury_Treatment__c injuryTreatment : injuryTreatList ) {
                        CTP_Injury_Treatment__c injr = new CTP_Injury_Treatment__c();
                        injr.CTP_Treatment_Description__c = injuryTreatment.CTP_Treatment_Description__c;
                        treatmentsRecordList.add(injr);
                }
            }
            
           //Populating Accident Details - Mohit
            claimRec.CTP_AccidentDate__c = claimApplication.claimRecord.CTP_AccidentDate__c;
            claimRec.CTP_Accident_Co_Ordinates__c = claimApplication.claimRecord.CTP_Accident_Co_Ordinates__c;
            claimRec.CTP_Accident_Street_Number__c = claimApplication.claimRecord.CTP_Accident_Street_Number__c;
            claimRec.CTP_Accident_Street__c = claimApplication.claimRecord.CTP_Accident_Street__c;
            claimRec.CTP_Accident_Suburb__c = claimApplication.claimRecord.CTP_Accident_Suburb__c;
            claimRec.CTP_Accident_Postcode__c = claimApplication.claimRecord.CTP_Accident_Postcode__c;
            claimRec.CTP_Accident_State__c = claimApplication.claimRecord.CTP_Accident_State__c;
            claimRec.CTP_Accident_Description__c = claimApplication.claimRecord.CTP_Accident_Description__c;
            claimRec.CTP_Location_Description__c = claimApplication.claimRecord.CTP_Location_Description__c;
            claimRec.CTP_Accident_Role__c = claimApplication.claimRecord.CTP_Accident_Role__c;
            claimRec.CTP_Accident_Role_Other__c = claimApplication.claimRecord.CTP_Accident_Role_Other__c;
            claimRec.CTP_Police_Event_Number__c = claimApplication.claimRecord.CTP_Police_Event_Number__c;
            claimRec.CTP_Time_Of_Accident__c =  claimApplication.claimRecord.CTP_Time_Of_Accident__c;
            claimRec.CTP_Nominated_representative_required__c =  claimApplication.claimRecord.CTP_Nominated_representative_required__c;
            claimRec.CTP_Date_Of_Discharge__c=  claimApplication.claimRecord.CTP_Date_Of_Discharge__c;
            
         //Pupulating Claim Details - Mohit
           // casRec.CTP_First_Name__c = claimApplication.caseRecord.CTP_First_Name__c;
            casRec.CTP_First_Name__c = usrList[0].FirstName;//HardCoded
            casRec.id = claimApplication.caseRecord.id;
            casRec.CTP_Last_Name__c = usrList[0].LastName;
            casRec.CTP_Date_of_birth__c = claimApplication.caseRecord.CTP_Date_of_birth__c;
            casRec.CTP_Gender__c =claimApplication.userRecord.CTP_Gender__c;
            casRec.CTP_Mobile__c =claimApplication.caseRecord.CTP_Mobile__c;
            casRec.CTP_Work_Phone__c =claimApplication.caseRecord.CTP_Work_Phone__c;
            casRec.CTP_Home_Phone__c = claimApplication.caseRecord.CTP_Work_Phone__c;//Added By Mohit-08/03/18
            casRec.CTP_Unit_Number__c =claimApplication.caseRecord.CTP_Unit_Number__c;
            casRec.CTP_Street_Number__c =claimApplication.caseRecord.CTP_Street_Number__c;
            casRec.CTP_Street__c =claimApplication.caseRecord.CTP_Street__c;
            casRec.CTP_Suburb__c =claimApplication.caseRecord.CTP_Suburb__c;
            casRec.CTP_State__c =claimApplication.caseRecord.CTP_State__c;
            casRec.CTP_Postcode__c =claimApplication.caseRecord.CTP_Postcode__c;
            casRec.CTP_Prefered_Email_Address_Injured_Persn__c =claimApplication.caseRecord.CTP_Prefered_Email_Address_Injured_Persn__c;
            casRec.CTP_Preferred_Contact_Method__c =claimApplication.caseRecord.CTP_Preferred_Contact_Method__c;
            casRec.CTP_Preferred_Contact_time__c =claimApplication.caseRecord.CTP_Preferred_Contact_time__c;
         //   casRec.CTP_Allocated_Insurer_code__c =claimApplication.caseRecord.CTP_Allocated_Insurer_code__c;
            casRec.CTP_Allocated_Insurer_code__c =Integer.valueOf(claimApplication.caseRecord.CTP_Allocated_Insurer_code__c);
            conRec.CTP_Claimant_Language_Code__c =claimApplication.representativeRecord.CTP_Claimant_Language_Code__c;
            casRec.CTP_Rep_Interpreter_Required__c =claimApplication.caseRecord.CTP_Rep_Interpreter_Required__c;//Added By Mohit-11/03/18
            
           //Populating Claims Information - Mohit
            claimRec.CTP_Most_at_Fault_Vehicle_Known__c =claimApplication.claimRecord.CTP_Most_at_Fault_Vehicle_Known__c;
            claimRec.CTP_Most_at_fault_Vehicle_Registration__c =claimApplication.claimRecord.CTP_Most_at_fault_Vehicle_Registration__c;
            claimRec.CTP_Existing_Claim_Number__c =claimApplication.claimRecord.CTP_Existing_Claim_Number__c;
            claimRec.CTP_Submitter_Is_Claimant__c =claimApplication.claimRecord.CTP_Submitter_Is_Claimant__c;
            casRec.CTP_Claim_Type__c = claimApplication.caseRecord.CTP_Claim_Type__c;
            claimRec.CTP_Final_Declaration__c = claimApplication.claimRecord.CTP_Final_Declaration__c; //Added By Mohit-08/03/18
            claimRec.CTP_Authorisation_Given__c = claimApplication.claimRecord.CTP_Authorisation_Given__c; //Added By Mohit-08/03/18
			claimRec.CTP_Claimant_Submitted_At_Fault_Regist__c = claimApplication.claimRecord.CTP_Claimant_Submitted_At_Fault_Regist__c; //Added By Mohit-08/03/18
           	claimRec.CTP_Claimant_Submitted_Policy_Number__c = claimApplication.claimRecord.CTP_Claimant_Submitted_Policy_Number__c; //Added By Mohit-08/03/18
            
           	claimRec.CTP_Claimant_Submitted_Date_of_Accident__c = claimApplication.claimRecord.CTP_Claimant_Submitted_Date_of_Accident__c; //Added By Mohit-10/03/18
            claimRec.CTP_Claimant_Submitted_Time_of_Accident__c = claimApplication.claimRecord.CTP_Claimant_Submitted_Time_of_Accident__c; //Added By Mohit-10/03/18
           	
            
            //Populating Vehicle Records - Mohit
            for(CTP_Vehicle__c vehicle : claimApplication.vehicleRecords){
                    CTP_Vehicle__c veh = new CTP_Vehicle__c();
                    veh.CTP_Registration_Number__c =  vehicle.CTP_Registration_Number__c;
                    veh.CTP_Drivers_First_Name__c = vehicle.CTP_Drivers_First_Name__c;
                    veh.CTP_Drivers_Last_Name__c = vehicle.CTP_Drivers_Last_Name__c;
                    veh.CTP_Drivers_Email__c = vehicle.CTP_Drivers_Email__c;
                    veh.CTP_Vehicle_State__c = vehicle.CTP_Vehicle_State__c;
                    veh.CTP_VIN_Chassis_Number__c = vehicle.CTP_VIN_Chassis_Number__c;
                    veh.CTP_Policy_Number__c = vehicle.CTP_Policy_Number__c;
                    veh.CTP_Vehicle_Insurer__c = vehicle.CTP_Vehicle_Insurer__c;
                    veh.CTP_Vehicle_Class__c = vehicle.CTP_Vehicle_Class__c;
                	if(veh.CTP_Drivers_Phone_Number__c != null && veh.CTP_Drivers_Phone_Number__c != '' && (veh.CTP_Drivers_Phone_Number__c.substring(0,2) == '02' ||
                     veh.CTP_Drivers_Phone_Number__c.substring(0,2) == '03' || veh.CTP_Drivers_Phone_Number__c.substring(0,2) == '07' || 
                     veh.CTP_Drivers_Phone_Number__c.substring(0,2) == '08') ){
                         veh.CTP_Drivers_Phone_Number_Area_Code__c = Integer.valueOf(veh.CTP_Drivers_Phone_Number__c.substring(0,2));
                         veh.CTP_Drivers_Phone_Number__c = veh.CTP_Drivers_Phone_Number__c.substring(2,8);
                     }
                	veh.CTP_Number_Of_Passengers__c = Integer.valueOf(vehicle.CTP_Number_Of_Passengers__c);//Added By Mohit-08/03/18
                	veh.CTP_Number_Of_Passengers_Known__c = vehicle.CTP_Number_Of_Passengers_Known__c;//Added By Mohit-08/03/18
               		veh.CTP_Vehicle_At_Fault__c = vehicle.CTP_Vehicle_At_Fault__c;//Added By Mohit-08/03/18
                	
                    vehicleWrapList.add(veh);
                }
            //This needs to be passed currently - Mohit
            //===================================
            //Claim Records
            claimRec.CTP_AccidentDate__c = claimApplication.claimRecord.CTP_AccidentDate__c;
            claimRec.CTP_Time_Of_Accident__c = claimApplication.claimRecord.CTP_Time_Of_Accident__c;
            claimRec.CTP_Accident_Street__c = claimApplication.claimRecord.CTP_Accident_Street__c;
            claimRec.CTP_Accident_Suburb__c = claimApplication.claimRecord.CTP_Accident_Suburb__c;
            claimRec.CTP_Accident_Postcode__c = claimApplication.claimRecord.CTP_Accident_Postcode__c;
            claimRec.CTP_Accident_State__c = claimApplication.claimRecord.CTP_Accident_State__c;//DCR-7751
            claimRec.CTP_Accident_Description__c = claimApplication.claimRecord.CTP_Accident_Description__c;
            claimRec.CTP_Accident_Role__c = claimApplication.claimRecord.CTP_Accident_Role__c;
           // casRec.CTP_First_Name__c = claimApplication.caseRecord.CTP_First_Name__c;
            casRec.CTP_First_Name__c = usrList[0].FirstName;//Hard Coded
            //casRec.CTP_Last_Name__c = claimApplication.caseRecord.CTP_Last_Name__c;
            casRec.CTP_Last_Name__c = usrList[0].LastName;
            casRec.CTP_Date_of_birth__c = claimApplication.userRecord.CTP_Date_Of_Birth__c;
            casRec.CTP_Gender__c = claimApplication.userRecord.CTP_Gender__c;
            casRec.CTP_Prefered_Email_Address_Injured_Persn__c = claimApplication.userRecord.Email;
            casRec.CTP_Date_Submitted_by_Claimant__c = System.now();
            
            claimSubmissionUIRequestWrapper.claimRecord = claimRec;
            claimSubmissionUIRequestWrapper.caseRecord = casRec;
            claimSubmissionUIRequestWrapper.contactRecord = conRec;
            //claimSubmissionUIRequestWrapper.userRecord = usrRec;
            claimSubmissionUIRequestWrapper.vehicleRecordList =vehicleWrapList;
            claimSubmissionUIRequestWrapper.previousInjuriesRecordList =previousInjuriesList;
            claimSubmissionUIRequestWrapper.injuryDetailsRecordList =injuryDetailsList;
            claimSubmissionUIRequestWrapper.treatmentsRecordList =treatmentsRecordList;
            claimSubmissionUIRequestWrapper.employmentsRecord =employmentsRecord; 
            claimSubmissionUIRequestWrapper.submitterRecord =submitCon; 
            
            System.debug('##############################');
            System.debug('Claim Record --> '+claimRec);
            System.debug('Case Record --> '+casRec);
            System.debug('Contact Record --> '+conRec);
            System.debug('Vehicle Record --> '+vehicleWrapList);
            System.debug('Previous Injury Record --> '+previousInjuriesList);
            System.debug('Injury Detail Record --> '+previousInjuriesList);
            System.debug('Treatment Detail Record --> '+treatmentsRecordList);
            System.debug('Employment Record --> '+employmentsRecord);
            System.debug('Submitter Record --> '+submitCon);
             System.debug('Submitter Record --> '+claimApplication.userRecord.CTP_UnitNumber__c );
             System.debug('Submitter Record --> '+claimApplication.userRecord.CTP_Street_Number__c );
             System.debug('Submitter Record --> '+claimApplication.userRecord.CTP_Street__c);
             System.debug('Submitter Record --> '+claimApplication.userRecord.CTP_Suburb__c );
             System.debug('Submitter Record --> '+claimApplication.userRecord.CTP_State__c);
             System.debug('Submitter Record --> '+claimApplication.userRecord.CTP_Postcode__c );
            System.debug('Submitter Record --> '+claimApplication.userRecord.CTP_Country__c );
            
            System.debug('##############################');
            
           
          
           // Setting up the formula fields -Start
            claimSubmissionUIRequestWrapper.extensionWrapperRecord.caseNumber = casList[0].CaseNumber;  
            claimSubmissionUIRequestWrapper.extensionWrapperRecord.claimantUnitNum = claimApplication.userRecord.CTP_UnitNumber__c;  
            claimSubmissionUIRequestWrapper.extensionWrapperRecord.claimantStreetNum = claimApplication.userRecord.CTP_Street_Number__c; 
                claimSubmissionUIRequestWrapper.extensionWrapperRecord.claimantStreetName = claimApplication.userRecord.CTP_Street__c;  
                claimSubmissionUIRequestWrapper.extensionWrapperRecord.claimantSuburb = claimApplication.userRecord.CTP_Suburb__c;  
                claimSubmissionUIRequestWrapper.extensionWrapperRecord.claimantState = claimApplication.userRecord.CTP_State__c;  
                claimSubmissionUIRequestWrapper.extensionWrapperRecord.claimantPostCode = claimApplication.userRecord.CTP_Postcode__c;  
                claimSubmissionUIRequestWrapper.extensionWrapperRecord.claimantCountry = claimApplication.userRecord.CTP_Country__c;  
            	claimSubmissionUIRequestWrapper.extensionWrapperRecord.claimantInterpreterReq  = casList[0].CTP_Interpreter_Required__c;
            	//claimSubmissionUIRequestWrapper.extensionWrapperRecord.claimantInterpreterReq = 'Yes';
            	claimSubmissionUIRequestWrapper.extensionWrapperRecord.skipPolicyValidation   = casList[0].CTP_skipPolicyValidation__c; 
            // Setting up the formula fields -End
            
           // claimSubmissionUIRequestWrapper.extensionWrapperRecord.caseNumber = casList[0].CaseNumber;  
            
            
            system.debug('Claim Records -->'+ claimRec);
            system.debug('Case Records -->'+ casRec);
            system.debug('Contact Records -->'+ conRec);
            system.debug('Vehicle List -->'+ vehicleWrapList);
            system.debug('Previous Inj list -->'+ previousInjuriesList);
            system.debug('Injury Detail List -->'+ injuryDetailsList);
            system.debug('Treatment Record List -->'+ treatmentsRecordList);
            system.debug('Employment Record  -->'+ employmentsRecord);


            claimSubmissionINTRequestWrapper = CTP_OLCSIntegrationMappingHandler.mapClaimSubmissionRequest(claimSubmissionUIRequestWrapper);
            Response = CTP_OLCSIntegrationHandler.callClaimSubmissionAPI(claimSubmissionUIRequestWrapper);
            system.debug('<<<<<<Response>>>>>>'+Response);
            //API-Determine Insurer
    }else{//DCR-6930
            Response.statusCode = 999;
            
    }//DCR-6930 

         

        return Response;
        
    }


/************************************************************************************************************
 Purpose             : DCR-6354 - Invoke PDF Generation and Storing in Salesforce file for given Case ID.
 Created on          : 19/02/2017   
 Developer           : Sahil Sachar                   
*************************************************************************************************************/
    @AuraEnabled
    public static String callPDFGenerationMethod(String caseID) {
        String todayDate = System.Date.today().format();
        Blob blobclaimPDF ;
        
        PageReference claimPDF = new PageReference('/apex/CTP_PDFClaimDetails');
        claimPDF.getParameters().put('Id', caseID);
        blobclaimPDF = claimPDF.getContent();
        system.debug('*** PDF Generated Date -'+todayDate+'For Case Id-'+ caseID);
        
        // Uploading PDF document in ContentVersion Salesforce Object.
        ContentVersion contVersion = new ContentVersion();
        contVersion.ContentLocation = 'S'; 
        contVersion.PathOnClient = 'ClaimDetail-'+todayDate+'.pdf'; 
        contVersion.Title = 'ClaimDetail-'+todayDate+'.pdf'; 
        contVersion.VersionData = blobclaimPDF; 
        insert contVersion;
        
        // Fetching Content document Id from ContentVersion
        Id conDoc = [SELECT ContentDocumentId FROM ContentVersion WHERE Id =:contVersion.Id].ContentDocumentId;
        
        //Create ContentDocumentLink date to fetch uploaded record from Case Object
        ContentDocumentLink contDocLink = new ContentDocumentLink();
        contDocLink.ContentDocumentId = conDoc;
        contDocLink.LinkedEntityId = caseID;
        contDocLink.ShareType = 'V';
        contDocLink.Visibility = 'AllUsers';
        insert contDocLink;
        
        return contDocLink.Id;
    }
/*********************************************************************************
    Story       : DCR-3861
    Author      : Sahil Sachar
    Created on  : 19/02/2017   
    Purpose     : Open Claim PDF which is stored in Salesforce file.
**********************************************************************************/
    @AuraEnabled
    public static String getPDFDocumentID(String caseID) {
        String contDocId = null;
        ContentDocumentLink conDocLinkId;
        try{
            conDocLinkId = [Select ID, LinkedEntityId, ContentDocument.Title, SystemModstamp, ContentDocumentId 
                                                    from ContentDocumentLink 
                                                    where LinkedEntityId = :caseID 
                                                    Order by SystemModstamp 
                                                    DESC LIMIT 1];
            system.debug('**Content Document Link-'+conDocLinkId.ContentDocumentId);
            contDocId = conDocLinkId.ContentDocumentId;
        }catch(Exception e){
            system.debug('Error>>>'+e.getMessage());
        }
        return contDocId != null ? contDocId:null;
    }
    
    /*
     * Purpose : to retrieve complete UI wrapper given a caseID
     * Author : Bhavani/Upendra
     * Modified on : 21-Feb-2018
     * JIRA# : DCR-5016 
  */
    @AuraEnabled public static  CTP_ClaimApplicationWrapper getClaimDetails(String caseId){
        
        CTP_ClaimApplicationWrapper wrapperObj = new CTP_ClaimApplicationWrapper();
        List<Case> caseList = [SELECT id, Status,CTP_Correspondence__c,CTP_Rep_Type__c,CTP_Rep_Preferred_Contact_Time__c, CTP_Submitter_is_a_nominated_rep__c,CTP_Claimant_Email__c,CTP_Reason_Submitting__c,CTP_First_Name__c,CTP_Last_Name__c, CTP_Date_of_birth__c, CTP_Submitter_Type__c, RecordTypeId,CaseNumber,CTP_OLCS_Claim_Number__c,CTP_Mobile__c,
                                CTP_Home_Phone__c,CTP_Language__c,CTP_Work_Phone__c,CTP_Preferred_Contact_time__c,
                                CTP_Preferred_Email_Address__c,CTP_Preferred_Contact_Method__c,CTP_Claim_Type__c,CTP_SIRA_Reference_Number__c,
                                CTP_Insurer_name__c,Insurer_Name__c,CreatedDate,CTP_Date_Submitted_by_Claimant__c,CTP_KnownWorkerDisabilities__c,CTP_Prefered_Email_Address_Injured_Persn__c  from Case where id=:caseId LIMIT 1];
        List<CTP_Claim__c> claimList;
        //DCR5016 24th Feb Added CTP_Accident_Co_Ordinates__c feild.
        if(caseList!= null && caseList.size()>0){
            claimList = [Select id, CTP_Nominated_representative_required__c, CTP_Previous_Illness_or_Injury__c,CTP_Driver_license_state__c,CTP_Accident_Co_Ordinates__c,Ambulance_Service_Received__c, CTP_Claim_Id__c,CTP_ClaimHistoryLength__c,CTP_Early_Treatment_Received__c,CTP_Account_Number__c,CTP_Account_Name__c,CTP_BSB__c,CTP_Payment_Method__c,CTP_Did_accident_take_place_in_NSW__c,CTP_AccidentDate__c,CTP_Time_of_Accident__c, CTP_Accident_Street_Number__c,CTP_Accident_Street__c,CTP_Accident_Suburb__c,CTP_Accident_State__c,
                         CTP_Accident_Postcode__c,CTP_Accident_Role__c,CTP_Accident_Role_Other__c,CTP_Police_Event_Number__c,CTP_Accident_Description__c,CTP_At_Fault_Vehicle_Pol_in_Effect_res__c,CTP_Existing_Claim_Number__c,
                         CTP_Previous_Claim_Number_1__c,CTP_Employment_History_Length__c,CTP_Previous_Insurer_1__c,CTP_Previous_Claim_Number_2__c,CTP_Previous_Insurer_2__c,CTP_Previous_Claim_Number_3__c,CTP_Previous_Insurer_3__c,
                         CTP_Previous_Claim_Number_4__c,CTP_Previous_Insurer_4__c,CTP_Previous_Claim_Number_5__c,CTP_Previous_Insurer_5__c,CTP_Vehicles_Involved_are_known__c,CTP_Most_at_fault_vehicle_Confirmed__c,CTP_Desc_Most_At_Fault_Vehicle_Info__c,
                         CTP_Final_Declaration__c,CTP_Authorisation_Given__c,CTP_Claimant_agrees_to_cont_late_claim__c,CTP_Correct_registration_entered__c,CTP_State_of_registration_known__c,CTP_Most_at_Fault_Vehicle_Known__c ,
                         CTP_Most_at_fault_Vehicle_Registration__c,CTP_Initial_Declaration__c,CTP_Submitter_Is_Claimant__c,Previous_CTP_Claim__c,CTP_Location_Description__c, 
                         CTP_Medicare_Number__c,CTP_Medicare_Reference_Number__c,CTP_Driver_License_Number__c,CTP_Month_of_Injury_1__c,CTP_Month_of_Injury_2__c,CTP_Month_of_Injury_3__c,
                         CTP_Month_of_Injury_4__c,CTP_Month_of_Injury_5__c,CTP_Year_of_Injury_1__c,CTP_Year_of_Injury_2__c,CTP_Year_of_Injury_3__c,CTP_Year_of_Injury_4__c,
                         CTP_Hospital_Name__c,CTP_Treatment_Rec_At_Hosp_Post_Accident__c,CTP_Discharged_From_Hospital__c,CTP_Date_Of_Discharge__c,
                         CTP_Ambulance_Used__c,CTP_Claimant_Contact__c,CTP_Employer_Company_Name__c,CTP_Away_From_Work_Due_To_Accident__c,CTP_Type_Of_Benefits_Received__c,CTP_Receiving_Centrelink_Benefits__c
                         from CTP_Claim__c where id=:caseList[0].CTP_OLCS_Claim_Number__c  Limit 1];
        }
        
        
        List <CTP_Vehicle__c> vehicleList = [SELECT id,CTP_At_Fault_Vehicle_Pol_in_Effect_res__c,CTP_Drivers_Email__c,CTP_Drivers_First_Name__c ,CTP_Drivers_Last_Name__c,CTP_Drivers_Phone_Number__c,CTP_Registration_Expiry_Date__c,
                                                   CTP_Drivers_Phone_Number_Area_Code__c,CTP_Number_of_Passengers__c,CTP_Number_of_passengers_known__c,OwnerId,CTP_Policy_Number__c,CTP_Registration_Number__c,
                                                   CTP_Vehicle_at_Fault__c,CTP_Vehicle_case_number__c,CTP_Vehicle_Class__c,CTP_Vehicle_Colour__c,CTP_Vehicle_Insurer__c,CTP_Vehicle_Make__c,CTP_Vehicle_Model__c,Name,CTP_Vehicle_Number__c,CTP_Vehicle_State__c,
                                                   CTP_Vehicle_Year__c,CTP_VIN_Chassis_Number__c from CTP_Vehicle__c where CTP_Vehicle_Case_Number__c=:caseId];
        // getting CTP_Injury_Treatment__c using custom label
        Id injuryRecordType = Schema.SObjectType.CTP_Injury_Treatment__c.getRecordTypeInfosByName().get('Claim Application - Injury').getRecordTypeId();
       // Id preInjuryRecordType = Schema.SObjectType.CTP_Injury_Treatment__c.getRecordTypeInfosById().get(Label.CTP_PreviousInjuryRecordTypeId).getRecordTypeId();
        Id treatmentRecordType = Schema.SObjectType.CTP_Injury_Treatment__c.getRecordTypeInfosByName().get('Claim Application - Treatments').getRecordTypeId();
        //Id treatmentRecordType = Schema.SObjectType.CTP_Injury_Treatment__c.getRecordTypeInfosById().get(Label.CTP_Treatment_Record_Type_Id ).getRecordTypeId();
        // to get current injuries
        List<CTP_Injury_Treatment__c> injuryList =[Select id,CTP_Injury_Description__c,CTP_Treatment_Description__c,
                                                   CTP_Previous_Injury_Date__c,CTP_Previous_Injury__c
                                                   from CTP_Injury_Treatment__c where CTP_Injury_Treatment_Case__c=:caseId 
                                                   and recordTypeId =:injuryRecordType ];
        // to get previous injuries
        List<CTP_Injury_Treatment__c> preInjuryList =[Select id,CTP_Injury_Description__c,CTP_Treatment_Description__c,
                                                      CTP_Previous_Injury_Date__c,CTP_Previous_Injury__c
                                                      from CTP_Injury_Treatment__c where CTP_Injury_Treatment_Case__c=:caseId 
                                                      and (CTP_Previous_Injury__c = true) ];
        // to get treatment records
        List<CTP_Injury_Treatment__c> treatmentList =[Select id,CTP_Injury_Description__c,CTP_Treatment_Description__c,
                                                      CTP_Previous_Injury_Date__c,CTP_Previous_Injury__c
                                                      from CTP_Injury_Treatment__c where CTP_Injury_Treatment_Case__c=:caseId
                                                      and recordTypeId =:treatmentRecordType];
        

        List<User> userlist= [SELECT AccountId,Address,City,ContactId,Country,CreatedById,CreatedDate,CTP_Address__c,CTP_Date_Of_Birth__c,CTP_Gender__c,CTP_Interpreter__c,CTP_Postcode__c,CTP_Region__c,CTP_State__c, CTP_User_State__c,CTP_Street_Number__c,
                            CTP_Street__c,CTP_Suburb__c,CTP_UnitNumber__c,Department,Division,Email,FirstName,LastName,Name,Phone,PostalCode,CTP_Country__c,ProfileId,Street,Username FROM User  where Id=:Userinfo.getUserId()];
        List<Contact> contactList;
        if(claimList != null && claimList.size()>0){
            contactList =[SELECT 
                          CTP_Away_From_Primary__c,CTP_Away_From_Secondary_1__c,CTP_Away_From_Secondary_2__c,CTP_Away_From_Secondary_3__c,CTP_Away_From_Secondary_4__c,
                          CTP_Away_Until_Primary__c,CTP_Away_Until_Secondary_1__c,CTP_Away_Until_Secondary_2__c,CTP_Away_Until_Secondary_3__c,CTP_Away_Until_Secondary_4__c,
                          CTP_Claimant_Language_Code__c,CTP_Consent_for_Survey__c,CTP_ContactMethod__c,CTP_ContactTime__c,
                          CTP_Currently_away_from_work_Primary__c,CTP_Currently_away_from_work_Secondary_1__c,CTP_Currently_away_from_work_Secondary_2__c,CTP_Currently_away_from_work_Secondary_3__c,CTP_Currently_away_from_work_Secondary_4__c,
                          CTP_Earning_at_time_of_Accident_Primary__c,CTP_Earning_at_time_of_Accident_Sec1__c,CTP_Earning_at_time_of_Accident_Sec2__c,CTP_Earning_at_time_of_Accident_Sec3__c,CTP_Earning_at_time_of_Accident_Sec4__c,
                          CTP_Employee_or_Self_employed_Primary__c,CTP_Employee_or_Self_employed_Secondary1__c,CTP_Employee_or_Self_employed_Secondary2__c,CTP_Employee_or_Self_employed_Secondary3__c,CTP_Employee_or_Self_employed_Secondary4__c,
                          CTP_Employer_Company_Name_Primary__c,CTP_Employer_Company_Name_Secondary_1__c,CTP_Employer_Company_Name_Secondary_2__c,CTP_Employer_Company_Name_Secondary_3__c,CTP_Employer_Company_Name_Secondary_4__c,
                          CTP_Employer_email_Primary__c,CTP_Employer_email_Secondary_1__c,CTP_Employer_email_Secondary_2__c,CTP_Employer_email_Secondary_3__c,CTP_Employer_email_Secondary_4__c,
                          CTP_Employer_first_name_Primary__c,CTP_Employer_first_name_Secondary_1__c,CTP_Employer_first_name_Secondary_2__c,CTP_Employer_first_name_Secondary_3__c,CTP_Employer_first_name_Secondary_4__c,
                          CTP_Employer_last_name_Primary__c,CTP_Employer_last_name_Secondary_1__c,CTP_Employer_last_name_Secondary_2__c,CTP_Employer_last_name_Secondary_3__c,CTP_Employer_last_name_Secondary_4__c,
                          CTP_Employer_Phone_Number_Primary__c,CTP_Employer_Phone_Number_Secondary_1__c,CTP_Employer_Phone_Number_Secondary_2__c,CTP_Employer_Phone_Number_Secondary_3__c,CTP_Employer_Phone_Number_Secondary_4__c,
                          CTP_Employer_Phone_Num_Area_Code_Primary__c,CTP_Employer_Phone_Num_Area_Code_Sec_1__c,CTP_Employer_Phone_Num_Area_Code_Sec_2__c,CTP_Employer_Phone_Num_Area_Code_Sec_3__c,CTP_Employer_Phone_Num_Area_Code_Sec_4__c,
                          CTP_Employer_Postcode_Primary__c,CTP_Employer_Postcode_Secondary_1__c,CTP_Employer_Postcode_Secondary_2__c,CTP_Employer_Postcode_Secondary_3__c,CTP_Employer_Postcode_Secondary_4__c,
                          CTP_Employer_Primary_Address__c,CTP_Employer_State_Primary__c,CTP_Employer_State_Secondary_1__c,CTP_Employer_State_Secondary_2__c,CTP_Employer_State_Secondary_3__c,CTP_Employer_State_Secondary_4__c,
                          CTP_Employer_Street_Name_Primary__c,CTP_Employer_Street_Name_Secondary_1__c,CTP_Employer_Street_Name_Secondary_2__c,CTP_Employer_Street_Name_Secondary_3__c,CTP_Employer_Street_Name_Secondary_4__c,
                          CTP_Employer_Street_Number_Primary__c,CTP_Employer_Street_Number_Secondary_1__c,CTP_Employer_Street_Number_Secondary_2__c,CTP_Employer_Street_Number_Secondary_3__c,CTP_Employer_Street_Number_Secondary_4__c,
                          CTP_Employer_Suburb_Primary__c,CTP_Employer_Suburb_Secondary_1__c,CTP_Employer_Suburb_Secondary_2__c,CTP_Employer_Suburb_Secondary_3__c,CTP_Employer_Suburb_Secondary_4__c,
                          CTP_Employer_Unit_Number_Primary__c,CTP_Employer_Unit_Number_Secondary_1__c,CTP_Employer_Unit_Number_Secondary_2__c,CTP_Employer_Unit_Number_Secondary_3__c,CTP_Employer_Unit_Number_Secondary_4__c,
                          CTP_Employment_Status_Primary__c,CTP_Employment_Status_Secondary_1__c,CTP_Employment_Status_Secondary_2__c,CTP_Employment_Status_Secondary_3__c,CTP_Employment_Status_Secondary_4__c,
                          CTP_Length_of_time_off_work_Primary__c,CTP_Length_of_time_off_work_Secondary_1__c,CTP_Length_of_time_off_work_Secondary_2__c,CTP_Length_of_time_off_work_Secondary_3__c,CTP_Length_of_time_off_work_Secondary_4__c,
                          CTP_Obtain_wages_from_Employer_Primary__c,CTP_Obtain_wages_from_Employer_Sec_1__c,CTP_Obtain_wages_from_Employer_Sec_2__c,CTP_Obtain_wages_from_Employer_Sec_3__c,CTP_Obtain_wages_from_Employer_Sec_4__c,
                          CTP_Occupation_Primary__c,CTP_Occupation_Secondary_1__c,CTP_Occupation_Secondary_2__c,CTP_Occupation_Secondary_3__c,CTP_Occupation_Secondary_4__c,
                          CTP_Payment_Period_Primary__c,CTP_Payment_Period_Secondary_1__c,CTP_Payment_Period_Secondary_2__c,CTP_Payment_Period_Secondary_3__c,CTP_Payment_Period_Secondary_4__c
                          FROM Contact where id=:claimList[0].CTP_Claimant_Contact__c];
            
        }
        
        List<Attachment__c> attachmentList =[SELECT id, FileName__c,Description__c,CTP_View_Attachment__c,CTP_View_Attachment_Appl__c,CategoryA__c FROM Attachment__c where Case__c=:caseId];
       if(attachmentList.size()>0)
            System.Debug('>>> attachmentList >>>'+attachmentList);
       
        if(caseList != null && caseList.size()>0){
            wrapperObj.caseRecord = caseList[0];
        }
        if(claimList != null && claimList.size()>0){
            wrapperObj.claimRecord = claimList[0];
        }
        if (contactList != null && contactList.size() > 0){
            wrapperObj.contactRecord = contactList[0];
        }
        
        wrapperObj.vehicleRecords = vehicleList;
        wrapperObj.injuryRecordList = injuryList;
        wrapperObj.preInjuryRecordList = preInjuryList;
        wrapperObj.treatmentRecordList = treatmentList;
        
        if(userlist != null && userlist.size()>0){
            wrapperObj.userRecord = userlist[0];
        }
        // TODO : need to see how to get the attachments
        // wrapperObj.relatedAttachments = attachmentList;

        return wrapperObj;

    }
    
         /*
     * Purpose : Private Method to retrieve address details from longitude and latitude for edit draft
     * Author : Bhavani/Upendra
     * Modified on : 24-Feb-2018
     * JIRA# : DCR-5016 : Edit Draft
  */
    private static String urlBuilderForLatLngDetails(String latlng){
        String url = '';
        url+=Label.GoogleAPIRetriveAddress;
        url+=latlng;
        url+='&language=en';
        url+='&sensor=true';   
        System.debug('URL is==>'+url);
        
        return url;
    }
    
    /*
     * Purpose : Method to return Address based on longitude and latitude
     * Author : Bhavani/Upendra
     * Modified on : 24-Feb-2018
     * JIRA# : DCR-5016 : Edit Draft
  */
    @AuraEnabled public static String getAddressFromLatLng(String latlng){
        String response = makeCallOut(urlBuilderForLatLngDetails(latlng));
        system.debug('response  for LatandLNG-->> '+response);
        
        //placeDetailsResponse = placeDetailsResponse.replaceAll('\\u','');
       
       //   JSON.deserialize(response);
        System.Debug('>>> JSON.deserialize(response) >>>'+JSON.serialize(response));
        return response;
    }
    /************************************************************************************
    Story       : DCR-5939
    Author      : Sahil Sachar
    Created on  : 26/02/2017   
    Purpose     : Fetch Dynamic Language Values from Custom Setting CTP_Language_Map__c.
    *************************************************************************************/
    @AuraEnabled
    public static list<String> getDynmLangVals() {
        List<String> selctOptsVal = new List<String>();
        List<CTP_Language_Map__c> langMapVals;
        try{
            langMapVals = [Select Name from CTP_Language_Map__c];
            system.debug('Success List Size>>>'+langMapVals.size());
        }catch(Exception e){
            system.debug('Error>>>'+e.getMessage());
        }
        //system.debug('**Dynamic Language values-'+langMapVals.Name[1]);
        for(integer i=0; i<langMapVals.size(); i++){
            selctOptsVal.add(langMapVals[i].Name);
        }
        selctOptsVal.sort();
        return selctOptsVal;
    }
    /************************************************************************************
    Story       : DCR-4487, DCR-4317 and DCR-4316
    Author      : Sahil Sachar and Sridevi S
    Created on  : 26/02/2017   
    Purpose     : Check de-duplication of creation of Contact.
    *************************************************************************************/
   /* @AuraEnabled 
    public static id createContactPerson(string firstName, string lastName, string email, id contactRecortTypeId, string mobilePhone){
        User integratnUser = [Select Id, Name from User where Name='Integration User' Limit 1];
        system.debug('*******firstName -'+ firstName +'****lastName -'+lastName+'****email -'+email+'****contactRecortTypeId -'+contactRecortTypeId+'*****mobilePhone -' +mobilePhone);
        Contact newContact = new contact();
        //Logic 1 - Checking Contact with Full Name, Email and Mobile.
        system.debug('Inside Logic 1');
        List<Contact> contactCheck = [SELECT id 
                                      FROM contact 
                                      WHERE FirstName =:firstName 
                                      AND LastName =:lastName 
                                      AND Phone =:mobilePhone
                                      AND Email =:email ];
        system.debug('Contact Size 1 -'+contactCheck.size());
        if(contactCheck.size()>1){
            //Creating New contact due to return of multiple contacts.
            newContact = new Contact (FirstName = firstName, 
                                      LastName = lastName, 
                                      Phone = mobilePhone,
                                      OwnerId = integratnUser.Id,
                                      RecordTypeId = contactRecortTypeId,
                                      Email= email);
            insert newContact;           
        }else if(contactCheck.size()==1){
            // Assigning existing contact to Case. Returning already created contact value.
            newContact = new Contact (Id = contactCheck[0].Id);
            
        }else if(contactCheck.size()==0){
            //Logic 2 - Checking Contact with Full Name and Mobile.
            system.debug('Inside Logic 2 -');
            contactCheck = new List<Contact>();
            contactCheck = [SELECT id 
                            FROM contact 
                            WHERE FirstName =:firstName 
                            AND LastName =:lastName 
                            AND Email =:email];
            system.debug('Contact Size 2 -'+contactCheck.size());
            if(contactCheck.size()>1){
                newContact = new Contact (FirstName = firstName, 
                                          LastName = lastName, 
                                          Phone = mobilePhone, 
                                          OwnerId = integratnUser.Id,
                                          RecordTypeId = contactRecortTypeId,
                                          Email= email);
                insert newContact;           
            }else if(contactCheck.size()==1){
                // Assigning existing contact to Case. Returning already created contact value.
                newContact = new Contact(Id = contactCheck[0].Id);
            }else if(contactCheck.size()==0){
                //Logic 3 - Checking Contact with Full Name and Email.
                system.debug('Inside Logic 3 -');
                contactCheck = new List<Contact>();
                contactCheck = [SELECT id 
                                FROM Contact 
                                WHERE FirstName =:firstName 
                                AND LastName =:lastName 
                                AND Phone =:mobilePhone];
                system.debug('Contact Size 3 -'+contactCheck.size());
                if(contactCheck.size()>1 || contactCheck.size()==0){
                    newContact = new Contact (FirstName = firstName, 
                                              LastName = lastName, 
                                              Phone = mobilePhone, 
                                              OwnerId = integratnUser.Id,
                                              RecordTypeId = contactRecortTypeId,
                                              Email= email);
                    insert newContact;           
                }else if(contactCheck.size()==1){
                    newContact = new Contact(Id = contactCheck[0].Id);
                }
            }
        }
        system.debug('** Retruned Contact ID -'+newContact.Id);
        system.debug('** Retruned Contact Owner ID -'+newContact.OwnerId);
        system.debug('** Retruned Contact Public Record ID -'+newContact.RecordTypeId);
        return newContact.Id;
    }  */
    
    
     /************************************************************************************
    Story       : DCR-4487, DCR-4317 and DCR-4316
    Author      : Sahil Sachar and Sridevi S
    Created on  : 26/02/2017   
    Purpose     : Check de-duplication of creation of Contact.
    *************************************************************************************/
    @AuraEnabled 
    public static id createContactPerson(string firstName, string lastName, string email, id contactRecortTypeId, string mobilePhone){
        User integratnUser = [Select Id, Name from User where Name='Integration User' Limit 1];
        // system.debug('*******firstName -'+ firstName +'****lastName -'+lastName+'****email -'+email+'****contactRecortTypeId -'+contactRecortTypeId+'*****mobilePhone -' +mobilePhone);
        Contact newContact = new contact();
        
        /** 
         * 2018-03-10	AJJ		 DCR-8489, DCR-8420, DCR-8254, DCR-6878
         * Multiple defects exist due to accounts/contacts being created by the
         * community user, and upon continuation of a draft or generation of the
         * PDF by the same user, the user no longer has read access to the foreign
         * accounts, due to sharing rules (which are correct, accounts are
         * externally private).
         * Modified to disable include duplicate check on creation of these
         * contacts, and will add __share records for the newly created contacts.
         * This will not occur frequently and will be addressed by part of a
         * broader de-dup initiative.
         *
         *       //Logic 1 - Checking Contact with Full Name, Email and Mobile.
         *      system.debug('Inside Logic 1');
         *      List<Contact> contactCheck = [SELECT id 
         *                                    FROM contact 
         *                                    WHERE FirstName =:firstName 
         *                                    AND LastName =:lastName 
         *                                    AND Phone =:mobilePhone
         *                                    AND Email =:email ];
         *      system.debug('Contact Size 1 -'+contactCheck.size());
         *      if(contactCheck.size()>1){
         *          //Creating New contact due to return of multiple contacts.
         *          newContact = new Contact (FirstName = firstName, 
         *                                    LastName = lastName, 
         *                                    Phone = mobilePhone,
         *                                    OwnerId = integratnUser.Id,
         *                                    RecordTypeId = contactRecortTypeId,
         *                                    Email= email);
         *          insert newContact;           
         *      }else if(contactCheck.size()==1){
         *          // Assigning existing contact to Case. Returning already created contact value.
         *          newContact = new Contact (Id = contactCheck[0].Id);
         *          
         *      }else if(contactCheck.size()==0){
         *          //Logic 2 - Checking Contact with Full Name and Mobile.
         *          system.debug('Inside Logic 2 -');
         *          contactCheck = new List<Contact>();
         *          contactCheck = [SELECT id 
         *                          FROM contact 
         *                          WHERE FirstName =:firstName 
         *                          AND LastName =:lastName 
         *                          AND Email =:email];
         *          system.debug('Contact Size 2 -'+contactCheck.size());
         *          if(contactCheck.size()>1){
         *              newContact = new Contact (FirstName = firstName, 
         *                                        LastName = lastName, 
         *                                        Phone = mobilePhone, 
         *                                        OwnerId = integratnUser.Id,
         *                                        RecordTypeId = contactRecortTypeId,
         *                                        Email= email);
         *              insert newContact;           
         *          }else if(contactCheck.size()==1){
         *              // Assigning existing contact to Case. Returning already created contact value.
         *              newContact = new Contact(Id = contactCheck[0].Id);
         *          }else if(contactCheck.size()==0){
         *              //Logic 3 - Checking Contact with Full Name and Email.
         *              system.debug('Inside Logic 3 -');
         *              contactCheck = new List<Contact>();
         *              contactCheck = [SELECT id 
         *                              FROM Contact 
         *                              WHERE FirstName =:firstName 
         *                              AND LastName =:lastName 
         *                              AND Phone =:mobilePhone];
         *              system.debug('Contact Size 3 -'+contactCheck.size());
         *              if(contactCheck.size()>1 || contactCheck.size()==0){
         *                  newContact = new Contact (FirstName = firstName, 
         *                                            LastName = lastName, 
         *                                            Phone = mobilePhone, 
         *                                            OwnerId = integratnUser.Id,
         *                                            RecordTypeId = contactRecortTypeId,
         *                                            Email= email);
         *                  insert newContact;           
         *              }else if(contactCheck.size()==1){
         *                  newContact = new Contact(Id = contactCheck[0].Id);
         *              }
         *          }
         *      }
         * 
         * End remove dup check
         ***/

		newContact = new Contact (FirstName = firstName, 
                                  LastName = lastName, 
                                  Phone = mobilePhone, 
                                  OwnerId = integratnUser.Id,
                                  RecordTypeId = contactRecortTypeId,
                                  Email= email);
        insert newContact;           

		// system.debug('** Retruned Contact ID -'+newContact.Id);
        // system.debug('** Retruned Contact Owner ID -'+newContact.OwnerId);
        // system.debug('** Retruned Contact Public Record ID -'+newContact.RecordTypeId);
        return newContact.Id;
    } 
}