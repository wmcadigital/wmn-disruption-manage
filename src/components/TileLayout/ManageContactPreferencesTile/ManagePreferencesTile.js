import React, { useState } from 'react';

// Components
import ConfirmMobilePhone from 'components/TileLayout/ConfirmMobilePhoneTile/ConfirmMobilePhone';
import IntroManagePreferences from 'components/TileLayout/ManageContactPreferencesTile/IntroManagePreferences';
import EditingManagePreferences from 'components/TileLayout/ManageContactPreferencesTile/EditingManagePreferences';

const ManageContactPreferencesTile = () => {
  const [editingMode, setEditingMode] = useState(false);
  const [confirmMobileMode, setConfirmMobileMode] = useState(false);
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
          messages={messages}
          setMessages={setMessages}
          setEditingMode={setEditingMode}
          setConfirmMobileMode={setConfirmMobileMode}
        />
      )}
      {confirmMobileMode && <ConfirmMobilePhone />}
    </>
  );
};

export default ManageContactPreferencesTile;
