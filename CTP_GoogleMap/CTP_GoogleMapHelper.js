({
	handleMap : function(component, event, helper) {
	var lat = component.get("v.latitude");
    var lng = component.get("v.longitude");
    var inOut = component.get("v.insideOutside");
    console.log('lat and lng----'+lat+'---'+lng)
    console.log(inOut);
    lat = parseFloat(lat);
    lng= parseFloat(lng);
       
         console.log('passed lat and long   ',document.getElementById('map'));
    setTimeout(function() {
        
      if((lat==0 && lng== 0) || lat=='undefined' || lng=='undefined'){
        
        //initially for NSW, Australia
        document.getElementById('mapContain').innerHTML = "<div style='height:400px;width:100%;' class='map' id='map'>  </div>"; 
        var map = L.map('map').setView([-31.840233, 145.612793], 5);
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
            {
                //attribution: 'Tiles © Esri'
            }).addTo(map);
           

   	  }else if (inOut=='inside' && (lat!=0 && lng!= 0)){
        
         console.log('passed lat and long   ',document.getElementById('map'));
          if(document.getElementById('map')!=null){
               document.getElementById('map').remove();
              
          }
          
            document.getElementById('mapContain').innerHTML = "<div style='height:400px;width:100%;' class='map' id='map'>  </div>";
    
           var map = L.map('map').setView([lat,lng], 14);    
              
          
           
          
            L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
                {
                    //attribution: 'Tiles © Esri'
                }).addTo(map);
    
            // Add marker
            L.marker([lat, lng]).addTo(map)
                .bindPopup('');
        
      }else if(inOut=='outside' && (lat!=0 && lng!= 0)){
         if(document.getElementById('map')!=null){
               document.getElementById('map').remove();
          }
            document.getElementById('mapContain').innerHTML = "<div style='height:400px;width:100%;' class='map' id='map'>  </div>"; 
           var map = L.map('map',{zoomControl:false},{doubleClickZoom:false},{dragging:false},{zoomAnimation:false}).setView([-31.840233, 145.612793],0.7);


           L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
                    {
                        minZoom: 0.5,
    					maxZoom: 1,
                    }).addTo(map);
         
            var SouthWest = map.getBounds().getSouthWest();
            var NorthEast = map.getBounds().getNorthEast();
            var NorthWest = map.getBounds().getNorthWest();
            var SouthEast = map.getBounds().getSouthEast();
    
            var area = [
              [NorthWest,NorthEast,SouthEast,SouthWest], // outer ring
             
              [[-37.5050765707,140.999279036], [-37.5050765707,159.105430341], [-28.1570205549,159.105430341], [-28.1570205549,140.999279036], [-37.5050765707,140.999279036]] // hole
            ];
 
            L.polygon(area,{color:'grey',opacity:.6}).addTo(map); 
                  
              }
         L.marker([lat, lng]).addTo(map)
                .bindPopup('');
       
        
    });      
  }
})