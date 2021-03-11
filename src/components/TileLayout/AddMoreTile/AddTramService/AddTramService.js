import React from 'react';
import PropTypes from 'prop-types';
// Components
import RemoveService from 'components/shared/RemoveService/RemoveService';
import Button from 'components/shared/Button/Button';
// hooks
import useSelectableTramLines from 'customHooks/useSelectableTramLines';

const AddTramService = ({ setMode, selectedServices, setSelectedServices }) => {
  const { selectableTramLineIds, filterTramLineInfo } = useSelectableTramLines();
  /* Check the services that are already assigned */
  const { TramLines } = selectedServices;

  const handleAddTram = () => {
    setMode('tram');
  };

  const removeTramStops = ({ From, To }) => {
    setSelectedServices((prevState) => {
      return {
        ...prevState,
        TramLines: prevState.TramLines.filter(
          (tram) => tram.From.id !== From.id || tram.To.id !== To.id
        ),
      };
    });
  };

  const removeTramLine = (lineId) => {
    setSelectedServices((prevState) => {
      return {
        ...prevState,
        LineId: prevState.LineId.filter((id) => id !== lineId),
      };
    });
  };

  // Get the info for selected full lines
  const selectedFullTramLines = filterTramLineInfo(selectedServices.LineId);

  // Helper booleans
  const anyStopsSelected = TramLines && TramLines.length > 0;
  const isFullLineSelected = selectableTramLineIds.some((lineId) =>
    selectedServices.LineId.includes(lineId)
  );

  return (
    <>
      <h3 className="wmnds-p-t-md">Trams</h3>
      {/* Add tram service button */}
      {!isFullLineSelected && (
        <Button
          className="wmnds-btn wmnds-btn--primary wmnds-text-align-left"
          text={`Add ${TramLines && TramLines.length > 0 ? 'another' : ''} tram service`}
          onClick={handleAddTram}
          iconRight="general-expand"
        />
      )}
      {(anyStopsSelected || isFullLineSelected) && (
        <h4 className="wmnds-m-b-sm wmnds-m-t-lg">Tram services that you want to add</h4>
      )}
      {/* Show the tram services the user has added */}
      {anyStopsSelected && !isFullLineSelected ? (
        <>
          {TramLines.map((route) => {
            return (
              <RemoveService
                showRemove
                onClick={() => removeTramStops(route)}
                serviceNumber="MM1"
                mode="tram"
                routeName={`${route.From.name} to ${route.To.name}`}
                id={`${route.From.id}-${route.To.id}`}
                key={`${route.From.id}-${route.To.id}`}
              />
            );
          })}
        </>
      ) : (
        <>
          {selectedFullTramLines.map((line) => {
            return (
              <RemoveService
                showRemove
                onClick={() => removeTramLine(line.id)}
                serviceNumber={line.serviceNumber}
                mode="tram"
                routeName={line.routeName}
                key={line.routeName}
              />
            );
          })}
        </>
      )}
    </>
  );
};

AddTramService.propTypes = {
  setMode: PropTypes.func.isRequired,
  selectedServices: PropTypes.shape({
    TramLines: PropTypes.arrayOf(
      PropTypes.shape({
        To: PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        }),
        From: PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        }),
      })
    ),
    LineId: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  }).isRequired,
  setSelectedServices: PropTypes.func.isRequired,
};

export default AddTramService;
