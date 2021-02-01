import React from 'react';
import PropTypes from 'prop-types';
// Custom Hooks
import useFetchDeleteRoute from 'customHooks/useFetchDeleteRoute';
// Components
import RemoveService from './RemoveService';

const RemoveAPIService = ({ data, serviceNumber, routeName, showRemove, mode }) => {
  const { deleteRoute } = useFetchDeleteRoute(data, mode);

  return (
    <RemoveService
      serviceNumber={serviceNumber}
      routeName={routeName}
      showRemove={showRemove}
      mode={mode}
      onClick={deleteRoute}
    />
  );
};

RemoveAPIService.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    from: PropTypes.string,
    to: PropTypes.string,
  }).isRequired,
  mode: PropTypes.string.isRequired,
  routeName: PropTypes.string,
  serviceNumber: PropTypes.string.isRequired,
  showRemove: PropTypes.bool,
};

RemoveAPIService.defaultProps = {
  routeName: null,
  showRemove: false,
};

export default RemoveAPIService;
