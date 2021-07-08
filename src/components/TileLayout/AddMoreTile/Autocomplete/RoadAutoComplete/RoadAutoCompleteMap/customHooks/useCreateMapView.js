import { useEffect, useCallback, useState } from 'react';
import { loadModules, setDefaultOptions } from 'esri-loader';

const useCreateMapView = (mapContainerRef) => {
  const [mapView, setMapView] = useState(null);

  const createMapView = useCallback(async () => {
    let Map;
    let MapView;
    let Basemap;
    let VectorTileLayer;
    let GraphicsLayer;
    setDefaultOptions({ css: true }); // Load esri css by default

    try {
      [Map, MapView, Basemap, VectorTileLayer, GraphicsLayer] = await loadModules([
        'esri/Map',
        'esri/views/MapView',
        'esri/Basemap',
        'esri/layers/VectorTileLayer',
        'esri/layers/GraphicsLayer',
      ]);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }

    const basemap = new Basemap({
      baseLayers: [
        new VectorTileLayer({
          id: 'wmca-basemap',
          portalItem: {
            // set the basemap to the one being used: https://tfwm.maps.arcgis.com/home/item.html?id=53f165a8863c4d40ba017042e248355e
            id: '53f165a8863c4d40ba017042e248355e',
          },
        }),
      ],
    });

    const view = new MapView({
      container: mapContainerRef.current,
      map: new Map({ basemap }),
      center: [-2.0047209, 52.4778132],
      zoom: 14,
    });

    view.ui.remove(['zoom']);

    const roadAreaGraphicsLayer = new GraphicsLayer({ id: 'roadArea' });
    view.map.add(roadAreaGraphicsLayer);

    setMapView(view);
  }, [mapContainerRef]);

  useEffect(() => {
    if (!mapView) createMapView();
  });

  return mapView;
};

export default useCreateMapView;
