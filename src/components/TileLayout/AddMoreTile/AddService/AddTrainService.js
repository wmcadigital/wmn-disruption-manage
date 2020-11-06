import React from 'react';
import PropTypes from 'prop-types';
// Components
import RemoveService from 'components/shared/RemoveService/RemoveService';
import Button from 'components/shared/Button/Button';

const AddTrainService = ({ setMode }) => {
  return <div></div>;
};

AddTrainService.propTypes = {
  setMode: PropTypes.func.isRequired, // Set custom button classes, will default to wmnds-btn (primary btn)
};

export default AddTrainService;
