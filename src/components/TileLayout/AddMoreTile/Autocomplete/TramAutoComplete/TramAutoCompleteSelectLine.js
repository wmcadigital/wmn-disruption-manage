import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// Hooks
import Icon from 'components/shared/Icon/Icon';
import useSelectableTramLines from 'customHooks/useSelectableTramLines';
// Components
import s from '../ServiceAutocomplete.module.scss';

const TramAutoCompleteSelectLine = ({ selectedLines, setSelectedLines }) => {
  const { selectableTramLineInfo } = useSelectableTramLines();
  // Filter out any non-tram lines
  const selectedTramLines = selectedLines.filter((line) =>
    selectableTramLineInfo.map((selectableLine) => selectableLine.id).includes(line.id)
  );
  const [checked, setChecked] = useState(selectedTramLines || []);

  const handleChange = (e) => {
    const id = e.target.value;
    setChecked((prevState) => {
      if (!prevState.includes(id)) return [...prevState, id];
      return prevState.filter((checkedId) => checkedId !== id);
    });
  };

  useEffect(() => {
    setSelectedLines(checked);
  }, [checked, setSelectedLines]);

  return (
    <div className="wmnds-fe-group wmnds-m-b-sm">
      <fieldset className="wmnds-fe-fieldset">
        {selectableTramLineInfo.map((line) => (
          <div key={line}>
            <label className="wmnds-grid wmnds-grid--justify-between wmnds-grid--align-center">
              {/* Left side (service number and route name) */}
              <div
                className={`wmnds-disruption-indicator-medium wmnds-m-r-md wmnds-col-auto ${s.lineName}`}
              >
                {line.serviceNumber}
              </div>

              <strong className={`wmnds-col-auto ${s.routeName}`}>{line.routeName}</strong>

              <div className="wmnds-fe-checkboxes__container wmnds-m-b-none">
                {/* Right side for remove service button */}
                <input
                  checked={checked.includes(line.id)}
                  value={line.id}
                  onChange={handleChange}
                  className="wmnds-fe-checkboxes__input"
                  type="checkbox"
                />

                <span className="wmnds-fe-checkboxes__checkmark">
                  <Icon className="wmnds-fe-checkboxes__icon" iconName="general-checkmark" />
                </span>
              </div>
            </label>
            <hr className="wmnds-col-1 wmnds-m-t-md wmnds-m-b-md" />
          </div>
        ))}
      </fieldset>
    </div>
  );
};

TramAutoCompleteSelectLine.propTypes = {
  selectedLines: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedLines: PropTypes.func.isRequired,
};

export default TramAutoCompleteSelectLine;
