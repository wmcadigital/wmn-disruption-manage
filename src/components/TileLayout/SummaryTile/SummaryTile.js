import React, { useContext } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';
// import Button from 'components/shared/Button/Button';

const SummaryTile = () => {
  const [subscriberState] = useContext(SubscriberContext);
  // const portalURL = `${window.location.protocol}//${window.location.host}/?user=${subscriberState.query.user}`;

  const { name, email } = subscriberState.user;

  // const handleClick = () => {
  // //   const createBookmark = browser.bookmarks.create({
  // //     title: 'bookmarks.create() on MDN',
  // //     url: 'https://developer.mozilla.org/Add-ons/WebExtensions/API/bookmarks/create',
  // //   });
  // // };

  return (
    <div className="wmnds-content-tile wmnds-col-1">
      <p>
        Hi <strong>{name}</strong>!
      </p>
      <p>You can use this page to manage your disruption alerts.</p>
      <p>
        Bookmark this page to visit it again in future. Do not share the link as it is unique to
        you.
      </p>
      <p>
        Your alerts are sent to <strong>{email}</strong>
      </p>
    </div>
  );
};

export default SummaryTile;
