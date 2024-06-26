// Initialize the map
var map = L.map('map').setView([51.05, -114.07], 13);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Initialize the Leaflet.Draw plugin
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);
var drawControl = new L.Control.Draw({
    draw: {
        polygon: true,
        polyline: true,
        rectangle: true,
        circle: true,
        marker: true
    },
    edit: {
        featureGroup: drawnItems
    }
});
map.addControl(drawControl);

// Event handler for when a new feature is created
map.on('draw:created', function (e) {
    var layer = e.layer;
    drawnItems.addLayer(layer);
    
    // Add popup with multi-line text input field
    var popupContent = '<textarea rows="4" cols="25" id="multilineText" placeholder="Enter multi-line text"></textarea>';
    layer.bindPopup(popupContent).openPopup();

    // Event handler for when the popup is opened
    layer.on('popupopen', function () {
        var popup = layer.getPopup();
        var textarea = popup._contentNode.querySelector('textarea');
        textarea.value = layer.options.text || ''; // Set the textarea value to the previously entered text, if available
    });

    // Event handler for when the popup is closed
    layer.on('popupclose', function () {
        var popup = layer.getPopup();
        var textarea = popup._contentNode.querySelector('textarea');
        // layer._text = textarea.value; // Store the text entered by the user in a property of the layer
        layer.options.text = textarea.value; // Store the text entered by the user in a property of the layer
    });

});

// Initialize Leaflet Control Search
var searchControl = new L.Control.Search({
    layer: drawnItems,
    propertyName: 'text', // Property containing the text to be searched
    marker: false
});
map.addControl(searchControl);

