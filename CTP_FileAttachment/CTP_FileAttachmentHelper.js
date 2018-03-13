({
    //function to get today's date in dd/MM/yyyy format to set file upload date.
    todayDate: function(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd;
        } 
        if(mm<10){
            mm='0'+mm;
        } 
        var today = dd+'/'+mm+'/'+yyyy;
        return today;
    },
    validateFileAmount:function(component) {
        var errorMsgFiles = component.find("fileOverload");
        console.log("v.uploadNewFilesNum number: " + component.get("v.uploadNewFilesNum"))
    	if (component.get("v.uploadNewFilesNum") > component.get("v.maxFilesNum"))
    	{
            $A.util.removeClass(errorMsgFiles,"slds-hidden");
            document.getElementById("uploadBtn").disabled = true;
        }
        else
        {
            $A.util.addClass(errorMsgFiles,"slds-hidden");
            document.getElementById("uploadBtn").disabled = false;
        } 
    },
    //function to get selected file to temporary array with blank categories and blank description
    addToUnCatArray : function(component, file){
        console.log(file.name);
        
       let index=component.get("v.uploadedUnCatFiles").length;
        var pageName = component.get("v.pageName");
        var unCatFile;
        if(file && pageName == 'public homepage'){
            unCatFile = {
                'fileName' : file.name,
                'fileType' : file.type,
                'file': file,
                'description' : '',
                'category' : '',
                'subCategory' : '',
                'documentDate' :null,
                'index' : index,
                'progressPercentage' : 0,
                'isNew' : true,
                'isUploaded' : false,
                'uploadingError' : false,
                'isCTPAssistUser' : false,
                'pageName' : ''
            };
        }else if(file && pageName == 'insurer portal'){
            unCatFile = {
                'fileName' : file.name,
                'file': file,
                'description' : '',
                'category' : '',
                'subCategory' : '',
                'documentDate' :null,
                'index' : index,
                'progressPercentage' : 0,
                'isNew' : true,
                'isUploaded' : false,
                'uploadingError' : false,
                'isCTPAssistUser' : false,
                'pageName' : ''
            };
        }
        //Added for DCR-3730-OLCS-Start
            else if(file && pageName == 'claim portal'){
                var stage = component.get("v.stage");
                if(stage =="AccidentSection"){
                unCatFile = {
                    'fileName' : file.name,
                    'file': file,
                    'description' : '',
                    'category' : 'Accident',
                    'subCategory' : '',
                    'status':'init',
                    'index' : index,
                    'progressPercentage' : 0,
                    'isUploaded' : false,
                    'uploadingError' : false,
                    'isShow' : true,
                    'size': file.size,
                    'isCTPAssistUser' : true,
                    'pageName' : ''
                    
                    
                };
                }
                else if(stage =="HealthSection"){
                     unCatFile = {
                    'fileName' : file.name,
                    'file': file,
                    'description' : '',
                    'category' : 'Medical',
                    'subCategory' : '',
                    'status':'init',
                    'index' : index,
                    'progressPercentage' : 0,
                    'isUploaded' : false,
                    'uploadingError' : false,
                    'isShow' : true,
                    'size': file.size,
                    'isCTPAssistUser' : true,
                    'pageName' : ''
                    
                    
                }; 
                }
                 else if(stage =="EmploymentSection"){
                     unCatFile = {
                    'fileName' : file.name,
                    'file': file,
                    'description' : '',
                    'category' : 'Employment',
                    'subCategory' : '',
                    'status':'init',
                    'index' : index,
                    'progressPercentage' : 0,
                    'isUploaded' : false,
                    'uploadingError' : false,
                    'isShow' : true,
                    'size': file.size,
                    'isCTPAssistUser' : true,
                    'pageName' : ''
                    
                    
                }; 
                }
                else {
                     unCatFile = {
                    'fileName' : file.name,
                    'file': file,
                    'description' : '',
                    'category' : 'Other',
                    'subCategory' : '',
                    'status':'init',
                    'index' : index,
                    'progressPercentage' : 0,
                    'isUploaded' : false,
                    'uploadingError' : false,
                    'isShow' : true,
                    'size': file.size,
                    'isCTPAssistUser' : true,
                    'pageName' : ''
                    
                    
                }; 
                }
            }
                else{      
                    unCatFile = {
                        'fileName' : file.name,
                        'file': file,
                        'description' : '',
                        'category' : '',
                        'subCategory' : '',
                        'status':'init',
                        'documentDate' : null,
                        'index' : index,
                        'progressPercentage' : 0,
                        'isUploaded' : false,
                        'uploadingError' : false,
                        'isShow' : true,
                        'size': file.size,  
                        'isCTPAssistUser' : false,
                		'pageName' : ''
                    };
                }
        
        //Added for DCR-3730-OLCS-End
        var uploadedUnCatFiles = component.get("v.uploadedUnCatFiles");
        console.log('status aja>>',unCatFile.status);
        uploadedUnCatFiles.push(unCatFile);
     
        component.set("v.uploadedUnCatFiles", uploadedUnCatFiles);
    
        console.log('ttal files in array ==>',component.get("v.uploadedUnCatFiles"));
    },
    
    //function to call apex conmtroller to get AWS URL and then making ajax call to upload file.
    saveToServer : function(component, file, helper){
        
        var bar = jQuery('.bar');
        var percent = jQuery('.percent');
        var status = jQuery('#status');
        var objectName = component.get("v.objectName");
        
        file.status = 'upload';
        component.set("v.uploadedUnCatFiles[" + file.index + "]", file);
        
        console.log('inside helper---<>---file type is ===>'+file.file.type);
        var isValid = helper.validateFile(component, file);
        console.log(isValid);
        if(isValid){
            console.log('isValid');
            var params = component.get('v.uploadForm');
            console.log('isValid1');
            params.name = file.file.name;
            console.log('isValid2');
            //console.log('@@@@name@@@@'+filename);
            params.applicationFile = component.get("v.applicationFile");
            console.log('isValid3');
            params.caseId = component.get('v.parentId');
            console.log('isValid4');
            //console.log("parentId1234:::"+component.get("v.parentId"));
            
            console.log('@@@@caseid@@@@123'+params.caseId);
            console.log('@@record id@@@'+component.get('v.recordId'));
            if(component.get('v.parentId') == component.get('v.recordId'))
                params.caseItemId = '';
            else
                params.caseItemId = component.get('v.caseItemId') || '';
            console.log('Check for same case parent==>'+(component.get('v.parentId') != component.get('v.recordId')));
            params.dateLoaded = this.todayDate();
            console.log('@@@@@Subhajit checking file description--->'+file.description);
            params.description = file.description || '';
            //added just to check the value of description. nothing else is modified.
            console.log("description of file is -->",file.description);
            console.log("ctp -->",component.get("v.isCTPAssistUser"));
            console.log("pagename -->",component.get("v.pageName"));
            console.log("category>>> inside helper",file.category);
            params.category = file.category || '';
            params.tier2 = file.subCategory || ''; 
            params.isCTPAssistUser = component.get("v.isCTPAssistUser");
            params.pageName = component.get("v.pageName") || '';
            params.dateOfDocument = file.documentDate;
            console.log('file subcategory is -->'+file.subCategory);
            console.log('file documentDate is -->'+file.documentDate);
            console.log('JSON PARAM -->'+JSON.stringify(params));// added by subhajit
            // Added by Mathieu - DCR 8603
            if (component.get('v.isNew') == 'Yes')
            	params.isNewDoc = true; 
            
            var action = component.get("c.addAttachmentAndGetSignedURL");
            action.setParams({
                attachmentJSON : JSON.stringify(params),
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === 'SUCCESS') {
                    console.log('Server call successful for'+file.file.name);
                    component.set('v.uploadForm', {
                        'internalAuthor': '',
                        'decisionSentDate': '',
                        'internalReviewer': '',
                        'author': '',
                        'dateOfDocument': '',
                        'fromDateCorrespondance': '',
                        'toDateCorrespondance': '',
                        'description': '',
                        'externallyVisible': ''
                    });
                    console.log('URl is --->'+JSON.stringify(response.getReturnValue()));
                    console.log('URl is --->'+JSON.parse(response.getReturnValue()).saveURL);
                    var url = JSON.parse(response.getReturnValue()).saveURL;
                    console.log('URl0 is --->'+url);
                    var varUrlParams =url.split("/");
                    var attachtmentId = varUrlParams[5];
                    console.log('@@@@ Attachment-->'+attachtmentId);
                    //component.set('v.attachmentId',attachtmentId);
                    file.attachmentId = attachtmentId;
                    var attIdList = component.get("v.attachementIdList");
                    attIdList.push(attachtmentId);
                    component.set("v.attachementIdList",attIdList);
                    console.log("attList:::"+component.get("v.attachementIdList"));
                    //component.get("v.attachementIdList").push(attachtmentId);
                    
                    
                    //component.set("v.showdrag",false);
                    jQuery.ajax({
                        url: JSON.parse(response.getReturnValue()).saveURL,
                        contentType: (!file.file.type || file.file.type ==='')? 'binary/octet-stream' : file.file.type,
                        headers: {'x-amz-server-side-encryption':'AES256'},
                        type: 'PUT',
                        data: file.file,
                        processData: false,
                        async: true,
                        
                        beforeSend: function() {
                            console.log('before send');
                            status.empty();
                            var percentVal = '0%';
                            bar.width(percentVal);
                            percent.html(percentVal);
                        },
                        xhr: function() {
                            var myXhr = $.ajaxSettings.xhr();
                            if(myXhr.upload){
                                myXhr.upload.addEventListener('progress',function(evt){
                                    if(evt.lengthComputable){
                                        //var progressBar = component.find(file.file.name+'progressBar').getElement();
                                        var max = evt.total;
                                        var current = evt.loaded;
                                        var Percentage = (current * 100)/max;
                                        //Start<!--DCR3653-->
                                        file.progressPercentage = Percentage;
                                        component.set("v.uploadedUnCatFiles[" + file.index + "]", file);
                                        //End<!--DCR3653-->
                                        console.log('upload status for '+file.file.name+' '+Math.ceil(Percentage)+'%');
                                        //var id = '#attachSpan'+file.index;
                                        //console.log('generated id is --->'+id);
                                        //jQuery(id).attr('width',Math.ceil(Percentage)+'%');find('span:first')
                                        //console.log(jQuery(id));
                                        var per = Math.ceil(Percentage)+'%';
                                        //jQuery(id).css("width",per);
                                    }
                                });
                            }
                            return myXhr;
                        },
                        success: function(result){
                            console.log('Ajax call successful for'+file.file.name);
                            console.log(result);
                            file.isUploaded = true;
                            file.uploadingError = false;
                            file.file = file.file;
                            file.attachmentUrl = window.location.origin + "/" + component.get("v.portalName") + "/DRS_Attachment_View?id=" + file.attachmentId;
                            file.isNew = true;
                            file.status = 'success';
                            console.log(file);
                            console.log("pageName in success>>>",component.get('v.pageName'));
                            //Added for DCR-3634 -Parul- Start
                            if(component.get('v.pageName') == 'claim portal'){
                                console.log("pageName in claim portal success>>>");
                                component.set('v.showVar',false);
                                console.log('inside showVar>>>',component.get('v.showVar'));
                            }
                            //Added for DCR-3634 -Parul-End
                            //file.attachmentId = component.get('v.attachmentId');
                            component.set("v.uploadedUnCatFiles[" + file.index + "]", file);
                            helper.setSubmitted(component, file);
                           
                        },
                        error: function(err){ 
                            console.log('Ajax call failed for'+file.file.name);
                            file.isUploaded = false;
                            file.uploadingError = true;
                            file.file = file.file;
                            console.log(file);
                            helper.setSubmitted(component, file);
                            
                            file.status = 'error';
                            file.attachmentId ='';
                            //Added for DCR-3634 -Parul- Start
                            if(component.get('v.pageName') == 'claim portal'){
                                
                                component.set('v.showVar',false);
                                //Added for DCR-3653 - Parul -Start   
                                var toastEvent = $A.get("e.force:showToast");
                                var message = 'The upload did not work, please try again';
                                toastEvent.setParams({
                                    title: 'Error',
                                    type: 'error',
                                    message: message
                                });
                                toastEvent.fire();
                                //Added for DCR-3653 - Parul -End   
                            }
                            //Added for DCR-3634 -Parul-End
                            component.set("v.uploadedUnCatFiles[" + file.index + "]", file);
                        }
                    });
                    console.info('after ajax');
                    /* (Marco: 14/2 not needed anymore)
                    // Added by subhajit
                    var files=[];
                    var uploadedFiles = component.get("v.uploadedUnCatFiles");
                    console.log('uploadedFiles.length>>',uploadedFiles.length);
                    for(var i =0; i< uploadedFiles.length; i++){
                        console.log('<<<Inside here1>>',uploadedFiles[i].status);  
                        if(uploadedFiles[i].status =='success') // Added by subhajit // DCR-2734
                        {
                            console.log('<<<Inside Success>>'); 
                            files.push({ fileName: uploadedFiles[i].fileName, 
                                        category: uploadedFiles[i].category,
                                        description: uploadedFiles[i].description,
                                        attachmentId : uploadedFiles[i].attachmentId,
                                        status: 'success'});
                        }
                    }
                    console.log(JSON.stringify(files));
                    console.log('Files Array>>',component.get('v.uploadedUnCatFiles'));
                    localStorage.setItem('FilesForApplicationView', JSON.stringify(files));
                    // Added by subhajit */
                }else{
                    console.log('Server call failed for'+file.file.name);
                    this.checkForAll(component);
                    file.status = 'error';
                    component.set("v.uploadedUnCatFiles[" + file.index + "]", file);
                    //component.set('v.progress', 0);
                }
            });
            $A.enqueueAction(action);
        }else{
            //Redundant else condition, Please remove if it is not required: Nikunj
            console.log('Error: isValid = false');
        }
        

    },
    
    //function to set status of file if it has been uploaded or not
    setSubmitted : function(component, file){
        var uploadedUnCatFiles = component.get("v.uploadedUnCatFiles");
        console.log('<<uploadedUnCatFiles_Inside setSubmitted>>>',uploadedUnCatFiles);
        console.log('<<uploadedUnCatFiles_Inside setSubmitted-file.index>>>',file.index);
        console.log('<<uploadedUnCatFiles_Inside file>>>',file);
        for(var i = 0; i < uploadedUnCatFiles.length; i++){
            if(uploadedUnCatFiles[i].index == file.index){
                uploadedUnCatFiles[i].file = file;
            }
        }
        if(uploadedUnCatFiles) component.set("v.uploadedUnCatFiles", uploadedUnCatFiles);
        this.checkForAll(component);
    },
    //function to check whether all files have been uploaded or not and navigates to required page or refresh the current page.
    checkForAll : function(component){
        var uploadedUnCatFiles = component.get("v.uploadedUnCatFiles");
        var uploadNewFilesNum = component.get("v.uploadNewFilesNum");
        var allUploaded = true;
        var allDone = true;
        
        console.log('<<Inside ##checkForAll>>>');
        for(var i = (uploadedUnCatFiles.length - uploadNewFilesNum); i < uploadedUnCatFiles.length; i++){
        //for(var i = 0; i< uploadedUnCatFiles.length; i++){
            if(!uploadedUnCatFiles[i].isUploaded){
                console.log('<<Inside ##uploadedUnCatFiles[i].isUploaded>>>',uploadedUnCatFiles[i].isUploaded);
                allUploaded = false;
                if (!uploadedUnCatFiles[i].status == 'error') {
                    allDone = false;
                }
            }
        }
        if (allUploaded) {
            component.set("v.uploadNewFilesNum", 0);
            // Marco: SIRABAU-111 - 14/2 | Store uploaded files to display session upload history when submitting Additional Information
			if(window.location.pathname.includes("additional-information")) {
                var files=[];
                for(var i = 0; i < uploadedUnCatFiles.length; i++){
                    files.push({ fileName: uploadedUnCatFiles[i].fileName, 
                                category: uploadedUnCatFiles[i].category,
                                subCategory: uploadedUnCatFiles[i].subCategory,
                                description: uploadedUnCatFiles[i].description,
                                attachmentId : uploadedUnCatFiles[i].attachmentId,
                                attachmentUrl : uploadedUnCatFiles[i].attachmentUrl,
                                isNew : uploadedUnCatFiles[i].isNew,
                                status: 'success'});
                }
                localStorage.setItem('FileUploadHistory', JSON.stringify(files));
            }
        }
        if (allDone) document.getElementById("uploadBtn").disabled = false;
        console.log('<<<uploadedUnCatFiles.length>>',uploadedUnCatFiles.length);
        console.log('<<<allUploaded>>',uploadedUnCatFiles.length);
        
        var replyPortal = component.get("v.replyPortal");
        var internalPortal = component.get("v.internalPortal");
        console.log("before navigating, internalPortal is ==>"+internalPortal);
        console.log("before navigating, replyPortal is ==>"+replyPortal);
        console.log("before navigating, pageName is ==>"+component.get("v.pageName"));
        if(component.get("v.uploadToCase") == 'Yes'){
            window.location.reload();
        }else if(internalPortal && internalPortal == true){
            /*var evt1 = $A.get("e.force:refreshView");
            console.log('<<<evt1>>>',evt1);
            console.log('evt1 url is'+evt1.getParam("url"));
            evt1.fire(); */
            //$A.get('e.force:refreshView').fire();
            window.location.reload();
            component.set("v.uploadedUnCatFiles","[]");
        }
            else if(replyPortal && replyPortal == true){
                //$A.get("e.force:refreshView").fire();
                window.location.reload();
            }
                else if(allUploaded || uploadedUnCatFiles.length == 0){
                    /*var evt = $A.get("e.force:navigateToURL");
            console.log('<<<<evt>>>',evt);
            if (evt) {
                evt.setParams({
                    "url": '/thankyou?parentId=' + component.get("v.parentId"),
                    "isredirect": true,
                });
                console.log('evt url is'+evt.getParam("url"));
                evt.fire();
            }*/
                    
                    console.log('pass value');
                    component.navigateEvent();
                    console.log('passedddddddddddddddddddddddddddddd');
                }
                    else{
                        if( component.get("v.pageName") == 'claim portal'){
                            console.log('partially pass value');
                            component.set('v.showVar',false);
                            component.navigateEvent();
                            console.log('partially passedddddddddddddddddddddddddddddd');
                        }
                    }
        component.set('v.progress',0);
    },
    
    //function to validate file and its related categories and sub-categories, if values are populated properly or not.
    validateFile : function(component, file){
       
        var pageName = component.get("v.pageName");
        var isValid = true;
        var catId = '#category'+file.index;
        var catTextId = '#categoryErrorText'+file.index;
        
        $(catId).removeClass("slds-has-error");
        $(catTextId).addClass("slds-hidden");
        
        var subCatId = '#subCategory'+file.index;
        var subCTextId = '#subCategoryErrorText'+file.index;
        $(subCatId).removeClass("slds-has-error");
        $(subCTextId).addClass("slds-hidden");
        
        if(pageName == 'insurer portal'){
            if(!(file.category && file.category != '')){
                console.log('category not defined');
                isValid = false;
                var catId = '#category'+file.index;
                var catTextId = '#categoryErrorText'+file.index;
                
                $(catId).addClass("slds-has-error");
                $(catTextId).removeClass("slds-hidden");
                
                //var catElement = component.find(catId);
                //$A.util.addClass(catElement, 'sdls-has-error');
            }
            if(!(file.subCategory && file.subCategory != '')){
                console.log('subCategory not defined');
                isValid = false;
                var subCatId = '#subCategory'+file.index;
                var subCTextId = '#subCategoryErrorText'+file.index;
                $(subCatId).addClass("slds-has-error");
                $(subCTextId).removeClass("slds-hidden");
                //var catElement = component.find(catId);
                //$A.util.addClass(catElement, 'sdls-has-error');
            }
        }
        //Added for DCR-3653 - Parul -Start
        if(pageName == 'claim portal'){
            console.log('file size>>>',file.size);
            if(file.size > '2000000000'){
                isValid = false;
                file.status = 'error';
                var fileNameId = '#fileName'+file.index;
                var fileSizeTextId = '#filesizeText'+file.index;
                $(fileNameId).addClass("slds-has-error");
                $(fileSizeTextId).removeClass("slds-hidden");
            }
        }
        //Added for DCR-3653 - Parul -End
        return isValid;
    },
    
    deleteAttachmentHelper : function(component,event,caseId,file)
    {
        
        console.log('file.attachmentId===>'+file.attachmentId);
        console.log('file.name===>'+file.fileName);
        console.log('file.status===>'+file.status);
        console.log('file.description===>'+file.description);
        console.log('caseId===>'+caseId);
        if(file.status == 'success')
        {
            var action = component.get("c.ctp_removeAttachment");
            action.setParams({
                //"caseId" :caseId,
                //"fileName" : file.fileName
                "attachmentId" : file.attachmentId
            });
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
        } else {
            var uploadNewFilesNum = component.get("v.uploadNewFilesNum");
        	component.set("v.uploadNewFilesNum", uploadNewFilesNum - 1);
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
        },200);
    }
})