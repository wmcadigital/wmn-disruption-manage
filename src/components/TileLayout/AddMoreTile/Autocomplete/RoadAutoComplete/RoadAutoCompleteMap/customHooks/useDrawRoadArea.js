import { useEffect, useCallback } from 'react';
import { loadModules } from 'esri-loader';
import mapMarker from 'assets/svg/map-marker.svg';

const useDrawRoadArea = (view, roadArea) => {
  const { lat, lon, radius } = roadArea;

  const drawRoadArea = useCallback(async () => {
    if (!view || !view?.map) return;
    if (!lat || !lon || !radius) return;

    let Graphic;
    let Circle;

    try {
      [Graphic, Circle] = await loadModules(['esri/Graphic', 'esri/geometry/Circle']);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    // Create radius circle
    const circle = new Circle({
      center: [lon, lat],
      radius: radius * 1609.34, // Miles to kilometres
      geodesic: true,
    });
    const opacity = 0.2;

    const radiusCircleGraphic = new Graphic({
      geometry: {
        type: 'polygon',
        rings: circle.rings[0],
      },
      symbol: {
        type: 'simple-fill',
        color: [157, 91, 175, opacity], // #9d5baf
        outline: {
          color: [60, 16, 83, opacity], // #3c1053
          width: 0.3,
        },
      },
    });

    // Pinpoint icon
    const pinpointGraphic = new Graphic({
      geometry: {
        type: 'point',
        latitude: lat,
        longitude: lon,
      },
      symbol: {
        type: 'picture-marker',
        url: mapMarker,
        height: '102.4px',
        width: '38.4px',
      },
    });

    const roadAreaGraphicsLayer = view.map.findLayerById('roadArea');
    if (!roadAreaGraphicsLayer) return;

    roadAreaGraphicsLayer.removeAll();
    roadAreaGraphicsLayer.addMany([radiusCircleGraphic, pinpointGraphic]);

    // Center the map on the radius circle
    const { graphics } = roadAreaGraphicsLayer;
    const target = graphics.items.map((graphic) => graphic.geometry);
    view.goTo({ center: target });
  }, [lat, lon, radius, view]);

  useEffect(() => {
    drawRoadArea();
  }, [drawRoadArea]);
};

export default useDrawRoadArea;
