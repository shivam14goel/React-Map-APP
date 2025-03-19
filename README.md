# React OpenLayers Map Application

A React application that demonstrates form handling and integrates OpenLayers for interactive mapping capabilities.

## Overview

This application consists of two main routes:
1. A user information form that collects a first name and mobile number
2. A map page that displays the user's name and provides tools for creating, editing, and deleting geographic features

## Features

- **User Information Form**
  - Input validation
  - State management for user data
  - Navigation between routes
  - Bootstrap-based UI components

- **OpenLayers Map Integration**
  - Draw polygons, lines, and points
  - Edit existing features
  - Delete all features
  - Interactive map with zoom controls
    
## Images
![image](https://github.com/user-attachments/assets/2fb560d1-3b11-498d-92c9-2aec440c9b87)
![image](https://github.com/user-attachments/assets/097a2bde-aff3-49b2-88bf-b83de6b2cb51)


## Technologies Used

- React 18
- React Router v6
- OpenLayers 7
- Bootstrap 5
- JavaScript ES6+

## Usage

1. Fill out the form on the homepage with your first name and mobile number
2. Click "Submit" to navigate to the map page
3. On the map page:
   - Select a drawing type (Polygon, Line, or Point) from the dropdown
   - Click on the map to start drawing
   - For polygons and lines, click multiple times to add points
   - Double-click to finish drawing
   - Click and drag existing features to modify them
   - Click the "Clear All" button to remove all features

## OpenLayers Integration

The application utilizes several OpenLayers components:

- `Map` and `View`: Core components for the map display
- `TileLayer` and `OSM`: Provides the base map from OpenStreetMap
- `VectorLayer` and `VectorSource`: Manages the drawn features
- `Draw`, `Modify`, and `Snap`: Interactions for creating and editing features
- Styling components for visual presentation

## Customization

### Changing the Base Map

To use a different base map, modify the TileLayer source in `Details.js`:

```javascript
new TileLayer({
  source: new XYZ({
    url: 'https://your-tile-server/{z}/{x}/{y}.png'
  })
})
```

### Adding More Drawing Tools

To add more drawing types, update the select options and handle the geometry type in `Details.jsx`.


