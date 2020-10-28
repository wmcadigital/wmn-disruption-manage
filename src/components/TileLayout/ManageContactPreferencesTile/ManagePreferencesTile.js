import React, { useState } from 'react';

// Components
import ConfirmMobilePhone from 'components/TileLayout/ConfirmMobilePhoneTile/ConfirmMobilePhone';
import IntroManagePreferences from 'components/TileLayout/ManageContactPreferencesTile/IntroManagePreferences';
import EditingManagePreferences from 'components/TileLayout/ManageContactPreferencesTile/EditingManagePreferences';

const ManageContactPreferencesTile = () => {
  const [editingMode, setEditingMode] = useState(false);
  const [confirmMobileMode, setConfirmMobileMode] = useState(false);
  const [changeMobileMode, setChangeMobileMode] =  useState(false);
  const [messages, setMessages] = useState([]);
  

  return (
    <>
      {!confirmMobileMode && !editingMode && (
        <IntroManagePreferences
          messages={messages}
          setMessages={setMessages}
          setEditingMode={setEditingMode}
        />
      )}
      {!confirmMobileMode && editingMode && (
        <EditingManagePreferences
          setMessages={setMessages}
          setEditingMode={setEditingMode}
          confirmMobileMode = {confirmMobileMode}
          setConfirmMobileMode={setConfirmMobileMode}
        />
      )}
      {confirmMobileMode && <ConfirmMobilePhone setWrongPhoneNumber={setChangeMobileMode} />}
    </>
  );
};

export default ManageContactPreferencesTile;
