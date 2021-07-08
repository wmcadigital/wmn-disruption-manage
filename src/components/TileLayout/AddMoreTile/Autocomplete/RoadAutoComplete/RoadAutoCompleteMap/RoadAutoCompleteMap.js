import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
//
import useCreateMapView from './customHooks/useCreateMapView';
import useDrawRoadArea from './customHooks/useDrawRoadArea';
import s from './RoadAutoCompleteMap.module.scss';

const RoadAutoCompleteMap = ({ lat, lon, radius }) => {
  const mapRef = useRef(null);
  const view = useCreateMapView(mapRef);
  useDrawRoadArea(view, { lat, lon, radius });

  useEffect(() => {
    return () => {
      if (view) view.destroy();
    };
  }, [view]);

  return (
    <div className={`wmnds-m-b-md ${s.mapContainer}`}>
      <div
        id="disruptions-map"
        className={`webmap disruptions-esri-map wmnds-m-t-md ${s.map}`}
        ref={mapRef}
        title="Disruptions map"
      />
    </div>
  );
};

RoadAutoCompleteMap.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  radius: PropTypes.number.isRequired,
};

export default RoadAutoCompleteMap;
