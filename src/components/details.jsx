import React, { useEffect, useRef, useState } from 'react';
// import * as ol from 'openlayers';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Draw, Modify, Snap } from 'ol/interaction';
import { Fill, Stroke, Style } from 'ol/style';
import { Circle as CircleStyle } from 'ol/style';
import { defaults as defaultControls } from 'ol/control';
// import GeometryType from 'ol/geom/GeometryType';
import 'bootstrap/dist/css/bootstrap.min.css';


function Details({ userData }) {
  const mapRef = useRef();
  const mapInstanceRef = useRef(null);
  const [drawType, setDrawType] = useState('Polygon');
  const [source] = useState(new VectorSource());
  const [currentInteraction, setCurrentInteraction] = useState(null);

  useEffect(() => {
    if (!mapInstanceRef.current) {
      const vector = new VectorLayer({
        source: source,
        style: new Style({
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)',
          }),
          stroke: new Stroke({
            color: '#ffcc33',
            width: 2,
          }),
          image: new CircleStyle({
            radius: 7,
            fill: new Fill({
              color: '#ffcc33',
            }),
          }),
        }),
      },[]);

      mapInstanceRef.current = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          vector,
        ],
        view: new View({
          center: [0, 0],
          zoom: 2,
        }),
        controls: defaultControls(),
      });

      // Add modify interaction
      const modify = new Modify({ source: source });
      mapInstanceRef.current.addInteraction(modify);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(undefined);
        mapInstanceRef.current = null;
      }
    };
  }, [source]);

  // Add draw interaction
  const addInteraction = (type) => {
    if (currentInteraction) {
      mapInstanceRef.current.removeInteraction(currentInteraction);
    }

    const draw = new Draw({
      source: source,
      type: type,
    });
    
    mapInstanceRef.current.addInteraction(draw);
    
    // Add snap interaction
    const snap = new Snap({ source: source });
    mapInstanceRef.current.addInteraction(snap);
    
    setCurrentInteraction(draw);
  };

  const handleDrawTypeChange = (e) => {
    setDrawType(e.target.value);
    addInteraction(e.target.value);
  };

  const clearDrawings = () => {
    source.clear();
  };

  useEffect(() => {
    if (drawType && mapInstanceRef.current) {
      addInteraction(drawType);
    }
  }, [drawType]);

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">{userData.firstName}</h2>
          
          <div className="mb-3 d-flex">
            <select
              value={drawType}
              onChange={handleDrawTypeChange}
              className="form-select me-2"
              style={{ width: 'auto' }}
            >
              <option value="Polygon">Polygon</option>
              <option value="LineString">Line</option>
              <option value="Point">Point</option>
            </select>
            <button
              onClick={clearDrawings}
              className="btn btn-danger"
            >
              Clear All
            </button>
          </div>
          
          <div ref={mapRef} style={{ height: '400px', width: '100%' }}></div>
          
          <div className="mt-3">
            <p><strong>Mobile:</strong> {userData.mobileNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
