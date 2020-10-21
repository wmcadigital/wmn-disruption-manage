import React from 'react';
import PropTypes from 'prop-types';
// Components
import ConfirmMobilePhone from './ConfirmMobilePhone';

const ConfirmMobilePhoneTile = ({ setWrongPhoneNumber }) => {
  return <ConfirmMobilePhone setWrongPhoneNumber={setWrongPhoneNumber} />;
};

ConfirmMobilePhoneTile.propTypes = {
  setWrongPhoneNumber: PropTypes.func.isRequired,
};

export default ConfirmMobilePhoneTile;
