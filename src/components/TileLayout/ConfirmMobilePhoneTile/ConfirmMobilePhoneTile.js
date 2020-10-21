import React from 'react';
import PropTypes from 'prop-types';
// Components
import ConfirmMobilePhone from './ConfirmMobilePhone';

const ConfirmMobilePhoneTile = ({ mobilePhoneNumber, setWrongPhoneNumber, setHasMobileActive }) => {
  return (
    <ConfirmMobilePhone
      mobilePhoneNumber={mobilePhoneNumber}
      setWrongPhoneNumber={setWrongPhoneNumber}
      setHasMobileActive={setHasMobileActive}
    />
  );
};

ConfirmMobilePhoneTile.propTypes = {
  mobilePhoneNumber: PropTypes.string.isRequired,
  setWrongPhoneNumber: PropTypes.func.isRequired,
  setHasMobileActive: PropTypes.func.isRequired,
};

export default ConfirmMobilePhoneTile;
