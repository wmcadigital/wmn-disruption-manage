import React, { useContext } from 'react';
import { SubscriberContext } from 'globalState/SubscriberContext';
// import Button from 'components/shared/Button/Button';

const SummaryTile = () => {
  const [subscriberState] = useContext(SubscriberContext);
  // const portalURL = `${window.location.protocol}//${window.location.host}/?user=${subscriberState.query.user}`;

  const { name } = subscriberState.user;
  console.log(subscriberState);

  // const handleClick = () => {
  // //   const createBookmark = browser.bookmarks.create({
  // //     title: 'bookmarks.create() on MDN',
  // //     url: 'https://developer.mozilla.org/Add-ons/WebExtensions/API/bookmarks/create',
  // //   });
  // // };

  return (
    <div className="wmnds-content-tile wmnds-col-1">
      <div className="wmnds-col-1 wmnds-col-lg-4-5">
        <p>
          Hi <strong>{name}</strong>!
        </p>
        <p>You can use this page to manage your service disruption alerts. </p>
        <p>
          Bookmark this page so you can visit it again in future. Do not share the link with anyone
          as it is unique to you.
        </p>
      </div>
    </div>
  );
};

export default SummaryTile;
