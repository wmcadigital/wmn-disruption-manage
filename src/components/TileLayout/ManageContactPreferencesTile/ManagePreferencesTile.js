import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Components
import ConfirmMobilePhone from 'components/TileLayout/ConfirmMobilePhoneTile/ConfirmMobilePhone';
import IntroManagePreferences from 'components/TileLayout/ManageContactPreferencesTile/IntroManagePreferences';
import EditingManagePreferences from 'components/TileLayout/ManageContactPreferencesTile/EditingManagePreferences';
import ResetPhoneTile from '../ResetPhoneTile/ResetPhoneTile';

const ManageContactPreferencesTile = ({
  setIsEditingManagerPreferences,
  setWrongPhoneNumber,
  wrongPhoneNumber,
}) => {
  const [editingMode, setEditingMode] = useState(false);
  const [confirmMobileMode, setConfirmMobileMode] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (editingMode) {
      setIsEditingManagerPreferences(true);
    } else if (editingMode === false && confirmMobileMode === false && messages.length === 0) {
      setIsEditingManagerPreferences(false);
    }
  }, [confirmMobileMode, editingMode, messages.length, setIsEditingManagerPreferences]);

  return (
    <>
      {!editingMode && (
        <IntroManagePreferences
          messages={messages}
          setMessages={setMessages}
          setEditingMode={setEditingMode}
          // setIsEditingManagerPreferences={setIsEditingManagerPreferences}
          confirmMobileMode={confirmMobileMode}
          setConfirmMobileMode={setConfirmMobileMode}
        />
      )}
      {!confirmMobileMode && editingMode && (
        <EditingManagePreferences
          setMessages={setMessages}
          setEditingMode={setEditingMode}
          confirmMobileMode={confirmMobileMode}
          setConfirmMobileMode={setConfirmMobileMode}
        />
      )}
      {confirmMobileMode && !wrongPhoneNumber && (
        <ConfirmMobilePhone
          setWrongPhoneNumber={setWrongPhoneNumber}
          confirmMobileMode={confirmMobileMode}
          setEditingMode={setEditingMode}
        />
      )}
      {confirmMobileMode && wrongPhoneNumber && (
        <ResetPhoneTile setWrongPhoneNumber={setWrongPhoneNumber} />
      )}
    </>
  );
};

// Set props
ManageContactPreferencesTile.propTypes = {
  setIsEditingManagerPreferences: PropTypes.func.isRequired,
  setWrongPhoneNumber: PropTypes.func.isRequired,
  wrongPhoneNumber: PropTypes.bool.isRequired,
};

export default ManageContactPreferencesTile;
