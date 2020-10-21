import React from 'react';
import PropTypes from 'prop-types';
// Components
import ConfirmMobilePhone from './ConfirmMobilePhone';

const ConfirmMobilePhoneTile = ({ mobilePhoneNumber, setResetMode, setHasMobileActive }) => {
  return (
    <ConfirmMobilePhone
      mobilePhoneNumber={mobilePhoneNumber}
      setResetMode={setResetMode}
      setHasMobileActive={setHasMobileActive}
    />
  );
};

ConfirmMobilePhoneTile.propTypes = {
  mobilePhoneNumber: PropTypes.string.isRequired,
  setResetMode: PropTypes.func.isRequired,
  setHasMobileActive: PropTypes.func.isRequired,
};

export default ConfirmMobilePhoneTile;
