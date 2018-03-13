({
    // function to initialize component attributes. To check URL and to check which page is this.
    doInit : function(component, helper, event){
        
        
        console.log('------------------------------');
        //console.log("parentId12:::"+component.get("v.parentId"));
        console.log("contactdro::"+component.get("v.contactDRO"));
        var attIdList = [];
        component.set("v.attachementIdList",attIdList);
        var categories;
        
        // By Subhajit
        var urlString = window.location.href;
        
        if(urlString.indexOf("public") > -1){
            component.set("v.portalName","public");
        }else if(urlString.indexOf("legal") > -1){
            component.set("v.portalName","legal");
        }else if(urlString.indexOf("insurer") > -1){
            component.set("v.portalName","insurer");
        }else if(urlString.indexOf("assessor") > -1){
            component.set("v.portalName","assessor");
        }
        // By Subhajit
        if(urlString.indexOf("applications") > -1){
            component.set("v.isMyApplication", true);
        }else{
            component.set("v.isMyApplication", false);
        }
        
        if(urlString.indexOf("applicationdetail") > -1){
            component.set("v.isApplicationdetail", true);
        }else{
            component.set("v.isApplicationdetail", false);
        }
        
        var attachmentWrapper = new Array();
        //component.set("v.AttachmentWrapper",attachmentWrapper);
        // console.log("attachment>>>",event.getParam("uploadedFiles"));
        // console.log("files>>",component.get("v.uploadedFiles"));
        
        //================================================DCR-3350 ====================================================================================//
        
        /*//Uncaught Error in $A.getCallback() [Cannot read property 'relatedList' of null]
		//Callback failed: serviceComponent://ui.force.components.controllers.relatedList.RelatedListContainerController/ACTION$getRelatedListInfos
		//throws at https://sira--sirasit10.lightning.force.com/auraFW/javascript/rNSAVNTno4PUWiQm9PXAFg/aura_proddebug.js:17054:7
		//Object.eval()@https://sira--sirasit10.lightning.force.com/components/force/relatedListSingleContainer.js:160:39
		//eval()@https://sira--sirasit10.lightning.force.com/libraries/force/relatedListsDataManagerLibrary/relatedListsDataManager.js:75:27
		//componentConstructor.eval()@https://sira--sirasit10.lightning.force.com/components/force/relatedListContainerMetadataProvider.js:58:21*/
        
        if(window.location.href.indexOf("sObject")>-1) //DCR-3350 Subhajit this only patch for Salesforce Internal Lightning Issue
        {
            
            var url = window.location.href;
            var varUrlParams =url.split("/");
            console.log('@@@@@@ case Id--->'+varUrlParams[6]);
            var caseId = varUrlParams[5];
            component.set("v.caseId",caseId.trim());
            component.set("v.pageName","internal page");
        }
        
        
        //======================================================================================================================================//   
        
        /*DCR-3109 : Retrieve Draft:4.12.17:: Subhajit :Starts */
        console.log("contactdro::"+component.get("v.contactDRO"));
        /* if(component.get("v.contactDRO")){
            console.log("contactdro123");
            var uploadedUnCatFiles = new Array();
            component.set("v.uploadedUnCatFiles",uploadedUnCatFiles); 
            console.log("contactdro files::"+component.get("v.uploadedUnCatFiles"));
        }else{*/
      // if(!component.get("v.contactDRO") ){
            
            
            console.log('@@@@@ inside uploadedUnCatFiles===>');  
            var retrieveApplicationAttachments = component.get("v.retrieveApplicationAttachments");
            if(retrieveApplicationAttachments!=null && retrieveApplicationAttachments.length > 0 )
            {
                console.log('@@@@@ retrieveApplicationAttachments in File Attachment >> '+JSON.stringify(component.get("v.retrieveApplicationAttachments")));
                var files=[];
                var uploadedUnCatFiles = component.get("v.uploadedUnCatFiles"); 
                for (var indexAttachment in retrieveApplicationAttachments)
                {
                    console.log('@@@@@ retrieveApplicationAttachments  >> '+ indexAttachment);
                    uploadedUnCatFiles.push({ fileName: retrieveApplicationAttachments[indexAttachment].FileName__c, 
                                             index: indexAttachment,
                                             attachmentId: retrieveApplicationAttachments[indexAttachment].Id,
                                             category: retrieveApplicationAttachments[indexAttachment].CategoryA__c,
                                             subCategory: retrieveApplicationAttachments[indexAttachment].CategoryB__c,
                                             description: retrieveApplicationAttachments[indexAttachment].Description__c,
                                             isUploaded: true,
                                             documentDate:retrieveApplicationAttachments[indexAttachment].AuthoredDate__c, 
                                             status: 'success'});
                    
                    files.push({ fileName: retrieveApplicationAttachments[indexAttachment].FileName__c, 
                                category: retrieveApplicationAttachments[indexAttachment].CategoryA__c,
                                description: retrieveApplicationAttachments[indexAttachment].Description__c});
                    
                }
                component.set("v.uploadedUnCatFiles", uploadedUnCatFiles);
                localStorage.setItem('Attachment', JSON.stringify(files));
            }
            else
            {
                var uploadedUnCatFiles = new Array();
                component.set("v.uploadedUnCatFiles",uploadedUnCatFiles);
            }  
            
            
            
       // }   
        //}    
        
        /*DCR-3109 : Retrieve Draft:4.12.17:: Subhajit :Ends */ 
        
        console.log('Location PathName is ==>'+window.location.pathname + ' CaseId :: -> '+component.get("v.caseId"));
        
        //SIRABAU-111: Marco | show uploaded files when uploading additional information
        if(window.location.pathname.includes("additional-information")) {
            if(localStorage.getItem('FileUploadHistory')!=null) {
                var files = localStorage.getItem('FileUploadHistory');
                component.set("v.uploadedUnCatFiles", JSON.parse(files));
                localStorage.removeItem('FileUploadHistory');
            }
        }
        
        // Legal Portal :: Subhajit
        if(window.location.pathname.includes("/legal/s")){
            //DCR-3264   By Subhajit
            if(window.location.pathname.includes("/legal/s/additional-information") 
               || window.location.pathname.includes("/legal/s/replytodro")) 
            {
                console.log('/legal/s/--->Others'); 
                
                var url_string = window.location;
                var url = new URL(url_string);
                var caseItemId = url.searchParams.get("caseItem");
                console.log('@@@@@@ CaseItemId---->'+caseItemId);
                component.set("v.caseItemId", caseItemId);
                
                var action = component.get("c.getParentCaseId");
                action.setParams({
                    recordId : component.get("v.caseItemId"),
                })
                action.setCallback(this, function(response){
                    var state = response.getState();
                    console.log('@@@@@@legal/s/ all --->'+state);
                    if(state==='SUCCESS')
                    {
                        parentId = response.getReturnValue();
                        console.log('@@@@@@ParentId-->111'+parentId);
                        component.set("v.parentId", parentId);
                        component.set("v.pageName","insurer portal");
                    }
                    
                });
                $A.enqueueAction(action);
                
            }
            else
            {
                
                console.log('---inside if block---');
                component.set("v.parentId", component.get("v.caseId"));
                //  if(component.get("v.legalType")=='Claimant')component.set("v.pageName","public homepage");
                //  else if(component.get("v.legalType")=='Insurer')component.set("v.pageName","insurer portal");
                // added following to fix DCR-4108: Nikunj 
                if(component.get("v.portalName")=='public')component.set("v.pageName","public homepage");
                else if(component.get("v.portalName")=='insurer'||component.get("v.portalName")=='legal')component.set("v.pageName","insurer portal");
                component.set("v.replyPortal", false); //Subhajit
                
                /* AScollay SIRABAU-115 List of Documents need to be visible on Legal Portal (as per DCR-342) */
                if(localStorage.getItem('FilesForApplicationView')!=null) 
                {
                    console.log("local stroage test");
                    var files = localStorage.getItem('FilesForApplicationView');
                    component.set("v.uploadedUnCatFiles", JSON.parse(files));
                    localStorage.removeItem('FilesForApplicationView');
                }
                else
                {
                    if(component.get("v.caseId")!=null && !component.get("v.contactDRO"))//Added !component.get("v.contactDRO") condition for defect DCR-7211-Shreya
                    {
                        console.log("loadappli");
                        component.loadApplications(component);
                    }
                }
                /* AScollay SIRABAU-115 */
            }    
            
        }else if(window.location.pathname.includes("/public/s") && !(window.location.pathname.includes("/public/s/caseitem/")) ){
            
            if(window.location.pathname.includes("/public/s/applications")||window.location.pathname.includes("/public/s/applicationdetail")) // Subhajit
            {  
                if(localStorage.getItem('FilesForApplicationView')!=null)
                {
                   
                    var files = localStorage.getItem('FilesForApplicationView');
                    component.set("v.uploadedUnCatFiles", JSON.parse(files));
                    localStorage.removeItem('FilesForApplicationView');
                }
                else
                { 
                    if(component.get("v.caseId")!=null && !component.get("v.contactDRO")) //DCR-3929
                    {
                        component.loadApplications(component);
                    }
                }
                component.set("v.parentId", component.get("v.caseId"));
                component.set("v.pageName","public homepage");
                component.set("v.replyPortal", false);
            }
            else if(window.location.pathname.includes("/public/s/additional-information")
                    || window.location.pathname.includes("/public/s/replytodro")) //DCR-2960
            {
                console.log('/public/s/additional-information');
                
                var url_string = window.location;
                var url = new URL(url_string);
                var caseItemId = url.searchParams.get("caseItem");
                console.log('@@@@@@ CaseItemId---->'+caseItemId);
                component.set("v.caseItemId", caseItemId);
                
                var action = component.get("c.getParentCaseId");
                action.setParams({
                    recordId : component.get("v.caseItemId"),
                })
                action.setCallback(this, function(response){
                    var state = response.getState();
                    console.log('@@@@@@public/s/additional-information --->'+state);
                    if(state==='SUCCESS')
                    {
                        parentId = response.getReturnValue();
                        console.log('@@@@@@ParentId-->111'+parentId);
                        component.set("v.parentId", parentId);
                        component.set("v.pageName","public homepage");
                        //component.set("v.replyPortal", true);
                    }
                });
                $A.enqueueAction(action);
            }
            //Added for DCR-3730-OLCS-Start
                else if(window.location.pathname.includes("public/s/StartClaimApplication")||window.location.pathname.includes("public/s/StartNewClaimAppCloneP")){
                    component.set("v.pageName","claim portal");
                    
                    component.set("v.caseId",component.get("v.caseRecordId"));  
                    console.log('caseId>>>>>>>>>',component.get("v.caseId"));
                    component.set("v.parentId", component.get("v.caseId"));
                }
            //Added for DCR-3730-OLCS-End
                    else
                    {
                        console.log('---inside if block---');
                        console.log('----- v.caseId -----'+component.get("v.caseId"));
                        component.set("v.parentId", component.get("v.caseId"));
                        component.set("v.pageName","public homepage");
                        component.set("v.replyPortal", false);
                    }
        }else if(window.location.pathname.includes("/insurer/s/caseitem/") || window.location.pathname.includes("/assessor/s/") || window.location.pathname.includes("/public/s/caseitem/")){
            // if(window.location.pathname.includes("/assessor/s/attachdocument")){
            // component.set("v.recordId",window.location.href.split('=')[1]);
            // }
            var parentId;
            var recordId = component.get("v.recordId");
            console.log('@@@@@@ caseItem---->' +recordId);
            
            if(recordId && (recordId.length == 15 || recordId.length == 18)){
                component.set("v.isForceRecord", true);
                component.set("v.caseItemId", recordId);
            }
            var action = component.get("c.getParentCaseId");
            action.setParams({
                recordId : component.get("v.recordId"),
            })
            action.setCallback(this, function(response){
                var state = response.getState();
                console.log(state);
                parentId = response.getReturnValue();
                console.log('@@@@@@ParentId-->111'+parentId);
                component.set("v.parentId", parentId);
                component.set("v.pageName","insurer portal");
                if(window.location.pathname.includes("/insurer/") || window.location.pathname.includes("/assessor/")) component.set("v.pageName","insurer portal");
                if(window.location.pathname.includes("/public/")) component.set("v.pageName","public homepage");
                component.set("v.replyPortal", true);
            });
            $A.enqueueAction(action);
            
        }else if(window.location.pathname.includes("/insurer/s/") && !(window.location.pathname.includes("/insurer/s/caseitem/"))){
            
            if(window.location.pathname.includes("/insurer/s/additional-information")
               || window.location.pathname.includes("/insurer/s/replytodro")) //DCR-3228 --by Subhajit
            {
                console.log('/insurer/s/additional-information');
                
                var url_string = window.location;
                var url = new URL(url_string);
                var caseItemId = url.searchParams.get("caseItem");
                console.log('@@@@@@ CaseItemId---->'+caseItemId);
                component.set("v.caseItemId", caseItemId);
                
                var action = component.get("c.getParentCaseId");
                action.setParams({
                    recordId : component.get("v.caseItemId"),
                })
                action.setCallback(this, function(response){
                    var state = response.getState();
                    console.log('@@@@@@insurer/s/additional-information --->'+state);
                    if(state==='SUCCESS')
                    {
                        parentId = response.getReturnValue();
                        console.log('@@@@@@ParentId-->111'+parentId);
                        component.set("v.parentId", parentId);
                        component.set("v.pageName","insurer portal");
                        console.log('@@@@PageName NEW===>'+component.get("v.pageName"));
                        //component.set("v.replyPortal", true);
                    }
                });
                $A.enqueueAction(action);
            }
            else
            {
                console.log('----inside /insurer/s/---------');
                component.set("v.parentId", component.get("v.caseId"));
                component.set("v.pageName","insurer portal");
                component.set("v.replyPortal", false);
                
                //DCR-6920 changes start: Subhajit & Nikunj 
                if(component.get("v.caseId")!=null && !component.get("v.contactDRO")) //DCR-3929
                {
                    console.log('@@@CaseId ==>'+component.get("v.caseId"));
                    component.loadApplications(component);
                }
                //DCR-6920 changes end: Subhajit & Nikunj 
            }
        }else if(window.location.href.includes('/one/one.app')){
            console.log("it is internal page");
            var parentId;
            var recordId = component.get("v.recordId");
            console.log('record id-->'+recordId);
            console.log('starts with 500=====>'+!(recordId.startsWith('500')));
            if(recordId && (recordId.length == 15 || recordId.length == 18) && !(recordId.startsWith('500'))){
                component.set("v.isForceRecord", true);
                component.set("v.caseItemId", recordId);
            }
            var action = component.get("c.getParentCaseId");
            action.setParams({
                'recordId' : component.get("v.recordId"),
            })
            action.setCallback(this, function(response){
                var state = response.getState();
                console.log(state);
                parentId = response.getReturnValue();
                console.log('@@@@@@ParentId-->'+parentId);
                component.set("v.parentId", parentId);
                component.set("v.pageName","internal page");
                component.set("v.replyPortal", false);
                component.set("v.internalPortal", true);
                console.log("internalPortal==>"+component.get("v.internalPortal"));
            });
            $A.enqueueAction(action);
            
            var action1 = component.get("c.isCTPAssistUser");
            action1.setCallback(this, function(response){
                if(response.getState() == "SUCCESS"){
                    var result = response.getReturnValue();
                    console.log('@@@@@@result-->'+result);
                    if(result == 'true'){
                        component.set("v.isCTPAssistUser", true);
                         var action2 = component.get("c.getOLCSCategories");
                        action2.setParams({
                            'stage' : component.get("v.stage"),
                        })
                        action2.setCallback(this, function(response){
                            var state = response.getState();
                            console.log("inside here",state);
                            if(state==='SUCCESS'){
                                console.log("response is ",response.getReturnValue());
                               component.set("v.categories",response.getReturnValue());
                              
                            }
                          
                        });
                        $A.enqueueAction(action2);
                       // categories = ['Accident','Medical','Employment','Other'];
                       // component.set("v.categories",categories);
                    }   
                }
            });
            $A.enqueueAction(action1);
        }else if(window.location.pathname.includes("public/s/replytodro") ){
            console.log('inside dro reply'+component.get("v.caseItemIdReply"));
            console.log('============'+component.get("v.caseItemIdReply"));
            component.set("v.parentId", component.get("v.caseId"));
            component.set("v.pageName","public homepage");
            component.set("v.replyPortal", false);
            component.set("v.caseItemId",component.get("v.caseItemIdReply"));
            component.set("v.recordId",component.get("v.caseItemIdReply"));
            
        }
        
        //Added for DCR-3730:OLCS :Start
        console.log('CTP Assist User >>>',component.get("v.isCTPAssistUser"));
        var cat = component.get("v.categories");
        if(component.get("v.pageName") == 'claim portal'){
             var action = component.get("c.getOLCSCategories");
            action.setParams({
                'stage' : component.get("v.stage"),
            })
            action.setCallback(this, function(response){
                var state = response.getState();
                console.log("inside here",state);
                if(state==='SUCCESS'){
                    console.log("response is ",response.getReturnValue());
                   component.set("v.categories",response.getReturnValue());
                  
                }
              
            });
            $A.enqueueAction(action);
           // component.set("v.categories",categories);
        }
        
        else{
            var getCategoryaction = component.get("c.getCategoryMapping");
            getCategoryaction.setCallback(this, function(response){
                var state = response.getState();
                if(state === "SUCCESS"){
                    console.log("response is ",response.getReturnValue());
                    var categoryMap = response.getReturnValue();
                    var categories = [];
                    categories.push('');
                    component.set("v.categoryMap",categoryMap);
                    for(key in categoryMap){
                        //console.log('category is ==>',key);
                        categories.push(key);
                        //console.log('associated sub-categories are ==>',categoryMap[key]);
                    }
                    component.set("v.categories",categories);
                }
            });
            $A.enqueueAction(getCategoryaction);
        }   
        
        /*
        //Added for DCR-3730:OLCS :End
        
        
        var ApplicationDocumentsSubCategoryTypes = ["","Claim form/documents","Submissions","Obvious error application","Notification of insurer’s decision on internal review form","Internal review decision notice","Stay letter","Acknowledgement letter of application for internal review by insurer","Application for internal review by insurer"];
        component.set("v.ApplicationDocumentsSubCategoryTypes",ApplicationDocumentsSubCategoryTypes);
        var SIRADocumentsSubCategoryTypes = ["","Findings and recommendations on merit review by SIRA","Previous SIRA certificate or decision","Assessment Conference Report","Preliminary Conference Report"];
        component.set("v.SIRADocumentsSubCategoryTypes",SIRADocumentsSubCategoryTypes);
        var MedicalInformationSubCategoryTypes = ["","Treating doctor/specialist report","Treating doctor/specialist notes","Hospital records","Ambulance records","Physiotherapy records","Medical imaging reports","Certificate of capacity","Neuropsychologist report","Independent medical examination report","Injury management consultation/review report","Functional assessment/Occupational Therapist report","Joint medico-legal report","Vocational assessment report"];
        component.set("v.MedicalInformationSubCategoryTypes",MedicalInformationSubCategoryTypes);
        //var OccupationalRehabilitationSubCategoryTypes = ["","Suitable duties plan","Return to work goals","Return to work plan","Vocational Assessment report","Labour market analysis report","Earning capacity assessment report","NTS approval/ sign-off suitable employment options","Progress report","Closure report","Job seeking report/plan","Job seeking logs","Injury management plan","Section 53 documents","Workplace assessment","Worktrial progress report","Worktrial closure report","Case conference report","Transferable skills analysis report","Rehab provider referral"];
        component.set("v.OccupationalRehabilitationSubCategoryTypes",OccupationalRehabilitationSubCategoryTypes);
        var EmploymentSubCategoryTypes = ["","Work capacity decision notice ","Fair notice","PIAWE form","Employment contract","Employment offer/letter of employment","Employment Fair Work Instrument","Payslips/Payroll advice","Position description","Offer/ withdrawal of suitable duties","Termination letter","PAYG summary","Tax return","Bank statements","Business activity statement","Business profit/loss statement","Log book/ work orders"];
        component.set("v.EmploymentSubCategoryTypes",EmploymentSubCategoryTypes);
        var LegalSubCategoryTypes = ["","Police report","Statutory declaration","Sworn statement/affidavit","Bio mechanical assessment report","Schedule of damages","Legal reports","Irrevocable authority","Subpoena","Court/Tribunal Orders","Birth Certificate or Passport","Australian citizenship or permanent residency","Death certificate","Guardianship order or similar","Lifetime Care & Support documentation","Worker’s Compensation documentation"];
        component.set("v.LegalSubCategoryTypes",LegalSubCategoryTypes);
        var SurveillanceSubCategoryTypes = ["","Surveillance footage","Surveillance report"];
        component.set("v.SurveillanceSubCategoryTypes",SurveillanceSubCategoryTypes);
        var CorrespondenceSubCategoryTypes = ["","Letters – General","Letter declining indemnity","Insurer liability notice","Request for particulars","Photos","File notes","Emails"];
        component.set("v.CorrespondenceSubCategoryTypes",CorrespondenceSubCategoryTypes);
        var ExpensesSubCategoryTypes = ["","Funeral expenses","Legal costs","Treatment costs"];
        component.set("v.ExpensesSubCategoryTypes",ExpensesSubCategoryTypes);*/
        
        //getting all the categories and related subcategories. Start
        
        /* var getCategoryaction = component.get("c.getCategoryMapping");
        getCategoryaction.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                console.log("response is ",response.getReturnValue());
                
            }
        });
        $A.enqueueAction(getCategoryaction); */
        
        //getting all the categories and related subcategories. End
        
        /*initializing wrapper to upload file*/
        
        component.set('v.uploadForm', {
            'internalAuthor': '',
            'decisionSentDate': '',
            'internalReviewer': '',
            'author': '',
            'dateOfDocument': '',
            'fromDateCorrespondance': '',
            'toDateCorrespondance': '',
            'description': '',
            'externallyVisible': false,
            'category': '',
            'tier2': '',
            'tier3':''
        });
        
        console.log('@@@@uploadedUnCatFiles NEW===>'+JSON.stringify(component.get("v.uploadedUnCatFiles")));
        
        console.log('@@@@PageName NEW===>'+component.get("v.pageName"));
    },
    
    // function to open popup box where user can select files.
    fileButtonClicked : function(component, event, helper){
        var isForceRecord = component.get("v.isForceRecord");
        var pageName = component.get("v.pageName");
        if(isForceRecord && pageName && pageName === "insurer portal"){
            var parentId = component.get("v.parentId");// added by subhajit
            component.set("v.parentId", parentId);
        }
        component.set('v.uploadForm', {
            'internalAuthor': '',
            'decisionSentDate': '',
            'internalReviewer': '',
            'author': '',
            'dateOfDocument': '',
            'fromDateCorrespondance': '',
            'toDateCorrespondance': '',
            'description': '',
            'externallyVisible': false,
            'category': '',
            'tier2': '',
            'tier3':''
        });
        
        //DCR-3929: code to resolve multiple component conflict inside DOM : Nikunj
        //  var fileElement = component.find("fileInput").getElement();
        
        var fileElement = '';
        fileElement = event.currentTarget.parentElement.children[1];
        
        if(fileElement==undefined)
        {
            fileElement = event.currentTarget.parentElement.children[0];
        }
        console.log('event.currentTarget>>>',event.currentTarget);
        console.log('fileElement>>>',fileElement);
        if(fileElement!= undefined){
            fileElement.value = '';
        }
        //Added for DCR-3634 -Parul- Start
        if(component.get('v.pageName') == 'claim portal'){
            component.set("v.showVar",true);
        }
       if(component.get("v.isCTPAssistUser")== true){
            var categories = ['Accident','Medical','Employment','Other'];
            component.set("v.categories",categories);
        }
        console.log('showVar value on fileButtonClicked>>>',component.get("v.showVar"));
        console.log('file element ID' + fileElement.id);
        //Added for DCR-3634 -Parul-End
        // Added by Bhavani to fix the recursion issue.
        if (fileElement != undefined && fileElement.id == "fileInput"){
            setTimeout(function(){
                fileElement.click();
            }, 100);
        }
    },
    /*
	 Marco: SIRABAU-111 - 13/2 - Original: DCR-3221
	 Input: caseId
	 Outcome: Array of Attachments saved to uploadedUnCatFiles
	*/
    loadApplications : function(component) {
        console.log('@@@@In loadApplications');
        console.log('@@@CaseId ==>'+component.get("v.caseId"));
        var action = component.get("c.getAttachments");
        action.setParams({
            caseId : component.get("v.caseId")
        })
        action.setCallback(this, function(response){
            var state = response.getState();
            console.log('@@@@In loadApplications'+state);
            if(state==='SUCCESS'){
                console.log('@@@@In loadApplications'+JSON.stringify(response.getReturnValue()));
                localStorage.removeItem('PublicPortalCaseId');
                var attachments = response.getReturnValue();
                attachments = attachments.filter(function( obj ) {
                    return obj.hasOwnProperty("CTP_View_Attachment__c");
                });
                var files=[];
                for(var i =0; i< attachments.length; i++){
                    var tempUrl=attachments[i].CTP_View_Attachment__c.split(' ')[1].split("\"")[1];
                    //DCR-6920 changes start: Subhajit & Nikunj 
                    
                    if(window.location.pathname.includes("/insurer/s/") || window.location.pathname.includes("/legal/s")){
                        files.push({ fileName: attachments[i].FileName__c, 
                                    description: attachments[i].Description__c,
                                    category : attachments[i].CategoryA__c,
                                    subCategory : attachments[i].CategoryB__c,
                                    attachmentId : attachments[i].Id,
                                    documentDate:attachments[i].AuthoredDate__c,
                                    attachmentUrl : tempUrl,
                                    isUploaded : true,
                                    status: 'success'});
                    }
                    else{
                        files.push({ fileName: attachments[i].FileName__c, 
                                    description: attachments[i].Description__c,
                                    attachmentId : attachments[i].Id,
                                    documentDate:attachments[i].AuthoredDate__c,
                                    attachmentUrl : tempUrl,
                                    isUploaded : true,
                                    status: 'success'});
                    }
                    //DCR-6920 changes end: Subhajit & Nikunj 
                }
                console.log('files attached::'+files);
                component.set("v.uploadedUnCatFiles", files);
            }
        });
        $A.enqueueAction(action);
    },
    allowDrop: function(component, event, helper) {
        event.preventDefault();
    },
    onFileDrop: function(component, event, helper) {
        
        event.stopPropagation();
        event.preventDefault();
        var files = event.dataTransfer.files;  // FileList object.
        
        for(var i= 0; i < files.length; i++){
            var file = files[i];				// File     object.
            helper.addToUnCatArray(component, file);
            
        }
        var attDom= event.currentTarget.parentElement.parentElement.parentElement;
        var uploadEle = event.currentTarget.parentElement.parentElement.parentElement.getElementsByClassName("uploadAct");
        setTimeout(function(){ 
            
            
            var attLength=attDom.getElementsByClassName("attachment").length;
            if(attLength>0)
            { 
                uploadEle[0].classList.remove("slds-hidden");
                if(uploadEle[1])
                    uploadEle[1].classList.remove("slds-hidden");
            }
            else
            {
                uploadEle[0].classList.add("slds-hidden");
                if(uploadEle[1])
                    uploadEle[1].classList.add("slds-hidden");
            }
        }, 100);
        
        // alert(file.name)
        // var submitfiles = component.get('c.submitfiles');
        //  $A.enqueueAction(submitfiles);
        
    },
    // function to add selected files to a temporary array.
    showfile: function(component, event, helper) {
        //var fileInput = component.find("fileInput").getElement();
        //
        //DCR-3929: code to resolve multiple component conflict inside DOM : Nikunj
        
        var ele = event.currentTarget;
        var files = jQuery(ele).prop("files");
        console.log('Amount of Files: ' + files.length);
        // Marco: 8/2 | Limit amount of files to upload to 'maxFilesNum'
        var uploadNewFilesNum = component.get("v.uploadNewFilesNum");
        for(var i = 0; i < files.length; i++){
            var file = files[i];
            helper.addToUnCatArray(component, file);
            uploadNewFilesNum++;
        }
        var attDom= event.currentTarget.parentElement.parentElement.parentElement;
         var uploadEle = event.currentTarget.parentElement.parentElement.parentElement.getElementsByClassName("uploadAct");
            
        setTimeout(function(){ 
           
            var attLength=attDom.getElementsByClassName("attachment").length;
            if(attLength>0)
            { 
                uploadEle[0].classList.remove("slds-hidden");
                if(uploadEle[1])
                    uploadEle[1].classList.remove("slds-hidden");
            }
            else
            {
                uploadEle[0].classList.add("slds-hidden");
                if(uploadEle[1])
                    uploadEle[1].classList.add("slds-hidden");
            }
        }, 100);
        
        component.set("v.uploadNewFilesNum", uploadNewFilesNum);
        helper.validateFileAmount(component);
    },
    
    //controller function to submit files for validation and then to server
    submitfiles : function(component, event, helper){
        component.set('v.progress', 0);
        
        
        
        var uploadedUnCatFiles = component.get("v.uploadedUnCatFiles");
        console.log('<<<uploadedUnCatFiles>>',uploadedUnCatFiles);
        var isValid = true;
        var allValid = true;
        var files=[];
        for(var i =0; i< uploadedUnCatFiles.length; i++){
            files.push({ fileName: uploadedUnCatFiles[i].fileName, 
                        category: uploadedUnCatFiles[i].category,
                        description: uploadedUnCatFiles[i].description,
                        documentDate: uploadedUnCatFiles[i].documentDate});
            localStorage.setItem('Attachment', JSON.stringify(files));
            
            isValid = helper.validateFile(component, uploadedUnCatFiles[i]);
            console.log('<<<isValid>>',isValid);            
            if(!isValid){
                allValid = false;
            }
            
        }
        if(uploadedUnCatFiles.length == 0){
            console.log('<<<uploadedUnCatFiles.length>>',uploadedUnCatFiles.length);   
            helper.checkForAll(component);
        }
        console.log('<<<allValid>>',allValid);  
        if(allValid){
            component.set("v.uploadBtnDisabled", true);
            console.log('<<<Inside here0>>');
            for(var i =0; i< uploadedUnCatFiles.length; i++){
                console.log('<<<Inside here1>>');  
                if(uploadedUnCatFiles[i].status !='success') // Added by subhajit // DCR-2734
                {
                    console.log('@@@@@@@@@@Subhajit checking file description--->'+ uploadedUnCatFiles[i].description);
                    helper.saveToServer(component, uploadedUnCatFiles[i], helper);
                }
                
            }
        }else{
            console.log('did not try to save files');
        }
        var interval = setInterval($A.getCallback(function () {
            
            var progress = component.get('v.progress');
            
            component.set('v.progress', progress === 90 ? clearInterval(interval) : progress + 1);
            
        }), 200);

    },
    //controller function to cancel the operation
    Cancel : function(component, event, helper){
        component.find("file").getElement().value='';
        component.set("v.isTrue",false);
    },
    
    //controller function to remove files from temporary array
    removeAttachment : function(component, event, helper){     
        var uploadedUnCatFiles = component.get("v.uploadedUnCatFiles");    
        var uploadedUnCatFilesTemp = [];
        var caseId=component.get("v.caseId");
        var index = 0;
        var files=[];
        console.log('target id is -->', event.target.id);
        console.log('target id is -->', event.getSource().get("v.name"));
       
        if(uploadedUnCatFiles.length == 1){
            component.set("v.uploadedUnCatFiles",uploadedUnCatFilesTemp);
            localStorage.removeItem('Attachment');
            helper.deleteAttachmentHelper(component, event,caseId,uploadedUnCatFiles[0]);
        }else{
            for(var i = 0; i < uploadedUnCatFiles.length; i++){
                if(uploadedUnCatFiles[i].index != event.getSource().get("v.name"))
                {
                    //event.target.id
                    uploadedUnCatFiles[i].index = index++;
                    uploadedUnCatFilesTemp.push(uploadedUnCatFiles[i]);
                    files.push({ fileName: uploadedUnCatFiles[i].fileName, category: uploadedUnCatFiles[i].category});
                }
                else
                {
                    console.log('From event--->'+ event.getSource().get("v.name"));
                    console.log('uploadedUnCatFiles[i].index--->'+ uploadedUnCatFiles[i].index);
                    console.log('uploadedUnCatFiles[i].fileName--->'+ uploadedUnCatFiles[i].fileName);  
                    console.log('file.attachmentId===>'+uploadedUnCatFiles[i].attachmentId);
                    helper.deleteAttachmentHelper(component, event,caseId,uploadedUnCatFiles[i]);
                }
            }
            localStorage.setItem('Attachment', JSON.stringify(files));
            component.set("v.uploadedUnCatFiles",[]);
            let tempFiles=uploadedUnCatFilesTemp;
            
            component.set("v.uploadedUnCatFiles",tempFiles);
            
            console.log(uploadedUnCatFilesTemp);
            console.log(component.get("v.uploadedUnCatFiles"));  
        }
        helper.validateFileAmount(component);
        
         var attDom= event.currentTarget.parentElement.parentElement.parentElement;
        var uploadEle = event.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.getElementsByClassName("uploadAct");
        setTimeout(function(){ 
            
            
            var attLength=attDom.getElementsByClassName("attachment").length;
            if(attLength>0)
            { 
                uploadEle[0].classList.remove("slds-hidden");
                if(uploadEle[1])
                    uploadEle[1].classList.remove("slds-hidden");
            }
            else
            {
                uploadEle[0].classList.add("slds-hidden");
                if(uploadEle[1])
                    uploadEle[1].classList.add("slds-hidden");
            }
        }, 100);
    },
    
    //controller function to validate if category is populated or not
    categoryChanged : function(component, event, helper){
        
       console.log(event.target.value);
        var targetId = event.target.id;
        var selectName = targetId;
        var selectedValue = event.target.value;
        var idBuilderArray = selectName.split("Select");
        var parentDivId = "#category"+idBuilderArray[1];
        var errorTextId = "#categoryErrorText"+idBuilderArray[1];
        var subCategoryId = 'select#subCategorySelect'+idBuilderArray[1];
        component.set("v.uploadedUnCatFiles["+idBuilderArray[1]+'].category',selectedValue);
        if(selectedValue && selectedValue != ''){
            var categoryMap = component.get("v.categoryMap");
            var subCategoriesTemp = categoryMap[selectedValue];
            jQuery(subCategoryId).empty();
            jQuery(subCategoryId).append( $("<option>")
                                         .val('')
                                         .html('')
                                        );
            subCategoriesTemp.forEach(function(item){
                jQuery(subCategoryId).append( $("<option>")
                                             .val(item)
                                             .html(item)
                                            );
            });
            $(parentDivId).removeClass("slds-has-error");
            $(errorTextId).addClass("slds-hidden"); 
        }else{
            component.set("v.uploadedUnCatFiles["+idBuilderArray[1]+'].subCategory','');
            jQuery(subCategoryId).empty();
            $(parentDivId).addClass("slds-has-error");
            $(errorTextId).removeClass("slds-hidden"); 
        }
       
    },
    
    //controller function to validate if sub-category is populated or not
    subCategoryChanged : function(component, event, helper){
        console.log(event.target.value);
        var targetId = event.target.id;
        var selectName = targetId;
        console.log('@@@ selectName==>'+selectName);
        var selectedValue = event.target.value;
        var idBuilderArray = selectName.split("Select");
        var parentDivId = "#subCategory"+idBuilderArray[1];
        var errorTextId = "#subCategoryErrorText"+idBuilderArray[1];
        component.set("v.uploadedUnCatFiles["+idBuilderArray[1]+'].subCategory',selectedValue);
        if(selectedValue && selectedValue != ''){
            $(parentDivId).removeClass("slds-has-error");
            $(errorTextId).addClass("slds-hidden");
            
        }else{
            $(parentDivId).addClass("slds-has-error");
            $(errorTextId).removeClass("slds-hidden");
        }
    },
    
    //controller function to show and hide help text
    displayHelp : function(component, event, helper){
        if(event.type === "mouseover"){
            $("#fileAttachmentHelp").css('display','inline-block');
        }else if(event.type === "mouseout"){
            $("#fileAttachmentHelp").css('display','none');
        }
    },
    disableMe : function(component, event, helper) {
        $('#'+event.currentTarget.id).attr("disabled",true);
    },
    
    //edit button clicked - focus corresponding textarea
    focusTextarea : function(component, event, helper) {
        
        //console.log("Discription Clicked "+ component.find("nameArea").getElement())
        
        //console.log(event.getSource().get("v.name"));
        
        var temp=event.getSource().get("v.name")+"text";
        
        var currentComponent = component.find(temp);
        
        $("#"+temp).removeClass("hide");
        
        document.getElementsByClassName(temp).focus();
        console.log(currentComponent);
        // document.getElementById(temp).children[1].focus();
        // console.log(document.getElementById(temp));
        //	$("#"+temp).find('textarea').eq(0).focus();
        
        //document.getElementsByClassName(temp).style.display = "inline-block";
        //document.getElementsByClassName(temp).focus();
        // component.find(temp).focus();
        // console.log("sasdwq");
    },
    focusTextareaDesc : function(component, event, helper) {
        
        var temp=component.get("v.name");
        
        console.log(temp)
        $('div button[name="'+temp+'"]').addClass("hide");
        
        var descUrl =event.getSource().get("v.name");
        var button=component.find(descUrl);
        var currentComponent = component.find(temp);
        //$("#"+temp+"url").addClass("hide");
        $("#"+temp).removeClass("hide");
        $('button[name="'+descUrl+'"]').addClass("hide");
        document.getElementById(temp).focus();
        console.log(currentComponent);
    },
    
    callevent : function(component, event, helper) {
        // console.log("boolean12:::"+component.get("v.contactDRO"));
        //Added as part of DCR-3634 Parul Start
        if(component.get("v.pageName")=="claim portal"){    
            component.set("v.showVar",false);
            var cmpEvent = component.getEvent("refreshCmpEvent");
            console.log('Firing Cmp Event from File Attachment'+cmpEvent);
            // cmpEvent.setParams({"files" : uploadedUnCatFiles });
            
            component.set('v.showVar',false);
            cmpEvent.fire();
        }
        //DCR-3929
        
        else if(component.get("v.contactDRO")){
            console.log('attachementIdList12:::'+component.get("v.attachementIdList"));
            var createEvent = component.getEvent("getAttachmentDetails");
            createEvent.setParams({"attachmentIdList" : component.get("v.attachementIdList")});
            createEvent.fire();
        }
        //Added as part of DCR-3634 Parul End
            else{
                console.log('Inside navigate url');
                var appEvent = $A.get("e.c:CTP_FileAttachment_Refresh");
                console.log('Firing Event from File Attachment'+appEvent);
                appEvent.fire();
                console.log('Fired---------------------------------');
            }
    },
    openFileAct:function(component, event, helper) {
        var ele=event.currentTarget.parentElement.parentElement;
        ele.getElementsByClassName("chevron")[0].classList.toggle("slds-hide");
        ele.getElementsByClassName("chevron")[1].classList.toggle("slds-hide");
        ele.getElementsByClassName("detailSec")[0].classList.toggle("slds-hide");
    }
})