({
 handleEvent :  function(component, event, helper) {
        var latitude = event.getParam("latitude");
        var longitude = event.getParam("longitude");
        var selectedLocation = event.getParam("selectedLocation")
        component.set("v.latitude",latitude);
        component.set("v.longitude",longitude);
        component.set("v.insideOutside",selectedLocation);
        console.log('inside ebvent');
     

     
         helper.handleMap(component, event, helper);
       
    },

jsLoaded: function(component, event, helper) {
  
       
  
     helper.handleMap(component, event, helper);
   
}
})