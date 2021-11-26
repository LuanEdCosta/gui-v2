import React, { useEffect, useState } from 'react';

import { Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { AlertDialog } from '../../common/components/Dialogs';
import { DEVICES_PAGE_KEYS, VIEW_MODE } from '../../common/constants';
import { useIsLoading, usePersistentState } from '../../common/hooks';
import { actions as deviceActions, constants } from '../../redux/modules/devices';
import {
  paginationControlSelector,
  devicesForDataTableSelector,
} from '../../redux/selectors/devicesSelector';
import { ViewContainer } from '../stateComponents';
import Cards from './layout/Cards';
import DataTable from './layout/DataTable';
import DeviceOptionsMenu from './layout/DeviceOptionsMenu';
import DevicesLoading from './layout/DevicesLoading';
import EmptyDeviceList from './layout/EmptyDeviceList';
import MassActions from './layout/MassActions';
import Pagination from './layout/Pagination';
import SearchBar from './layout/SearchBar';
import useStyles from './style';

const Devices = () => {
  const { t } = useTranslation('devices');
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const devices = useSelector(devicesForDataTableSelector);
  const { totalPages } = useSelector(paginationControlSelector);

  const isLoadingDevices = useIsLoading(constants.GET_DEVICES);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [viewMode, setViewMode] = usePersistentState({
    defaultValue: VIEW_MODE.TABLE,
    key: DEVICES_PAGE_KEYS.VIEW_MODE,
  });

  const [selectedDevices, setSelectedDevices] = useState([]);
  const [deviceOptionsMenu, setDeviceOptionsMenu] = useState(null);

  const [isShowingDeleteAlert, setIsShowingDeleteAlert] = useState(false);
  const [isShowingMultipleDeleteAlert, setIsShowingMultipleDeleteAlert] = useState(false);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickDevice = device => {
    const deviceId = device.id;
    history.push(`/devices/${deviceId}`);
  };

  const handleHideMassActions = () => {
    setSelectedDevices([]);
  };

  const handleFavoriteMultipleDevices = () => {
    dispatch(deviceActions.favoriteMultipleDevices({ deviceIdArray: selectedDevices }));
    handleHideMassActions();
  };

  const handleCreateCertificates = () => {
    history.push('/certificates');
  };

  const handleDeleteMultipleDevices = () => {
    setIsShowingMultipleDeleteAlert(true);
  };

  const handleConfirmMultipleDevicesDeletion = () => {
    dispatch(deviceActions.deleteMultipleDevices({ deviceIdArray: selectedDevices }));
    handleHideMassActions();
  };

  const handleCloseMultipleDeviceDeletionAlert = () => {
    setIsShowingMultipleDeleteAlert(false);
  };

  const handleFavoriteDevice = device => {
    const deviceId = device.id;
    dispatch(deviceActions.favoriteDevice({ deviceId }));
  };

  const handleHideOptionsMenu = () => {
    setDeviceOptionsMenu(null);
  };

  const handleEditDevice = () => {
    handleHideOptionsMenu();
    const deviceId = deviceOptionsMenu.device.id;
    history.push(`/devices/edit/${deviceId}`);
  };

  const handleDeleteDevice = () => {
    setIsShowingDeleteAlert(true);
  };

  const handleConfirmDeviceDeletion = () => {
    const deviceId = deviceOptionsMenu.device.id;
    dispatch(deviceActions.deleteDevice({ deviceId }));
    setSelectedDevices(currentSelectedDevices => {
      return currentSelectedDevices.filter(id => id !== deviceId);
    });
  };

  const handleCloseDeviceDeletionAlert = () => {
    setIsShowingDeleteAlert(false);
    handleHideOptionsMenu();
  };

  const handleSearchDevice = search => {
    dispatch(deviceActions.getDevices({ filter: { label: search } }));
  };

  useEffect(() => {
    dispatch(
      deviceActions.getDevices({
        page: {
          number: page + 1, // TODO: Should be zero based pagination
          size: rowsPerPage,
        },
      }),
    );
  }, [dispatch, page, rowsPerPage]);

  useEffect(() => {
    if (viewMode) setSelectedDevices([]);
  }, [viewMode]);

  useEffect(() => {
    return () => {
      dispatch(deviceActions.updateDevices({ devices: [] }));
    };
  }, [dispatch]);

  return (
    <ViewContainer headerTitle={t('devices:title')}>
      <DeviceOptionsMenu
        isShowingMenu={!!deviceOptionsMenu}
        anchorElement={deviceOptionsMenu?.anchorElement}
        handleEditDevice={handleEditDevice}
        handleDeleteDevice={handleDeleteDevice}
        handleHideOptionsMenu={handleHideOptionsMenu}
      />

      <AlertDialog
        isOpen={isShowingDeleteAlert}
        title={t('deleteDeviceAlert.title')}
        message={t('deleteDeviceAlert.message')}
        handleConfirm={handleConfirmDeviceDeletion}
        handleClose={handleCloseDeviceDeletionAlert}
        cancelButtonText={t('deleteDeviceAlert.cancelButton')}
        confirmButtonText={t('deleteDeviceAlert.confirmButton')}
      />

      <AlertDialog
        isOpen={isShowingMultipleDeleteAlert}
        title={t('deleteMultipleDeviceAlert.title')}
        message={t('deleteMultipleDeviceAlert.message')}
        handleConfirm={handleConfirmMultipleDevicesDeletion}
        handleClose={handleCloseMultipleDeviceDeletionAlert}
        cancelButtonText={t('deleteMultipleDeviceAlert.cancelButton')}
        confirmButtonText={t('deleteMultipleDeviceAlert.confirmButton')}
      />

      <Box className={classes.container}>
        <SearchBar
          viewMode={viewMode}
          handleChangeViewMode={setViewMode}
          handleSearchDevice={handleSearchDevice}
        />

        {selectedDevices.length > 0 && (
          <MassActions
            handleHideMassActions={handleHideMassActions}
            handleCreateCertificates={handleCreateCertificates}
            handleDeleteMultipleDevices={handleDeleteMultipleDevices}
            handleFavoriteMultipleDevices={handleFavoriteMultipleDevices}
          />
        )}

        <Box className={classes.content}>
          {isLoadingDevices ? (
            <DevicesLoading />
          ) : (
            <>
              {viewMode === VIEW_MODE.TABLE && devices.length > 0 && (
                <DataTable
                  page={page}
                  devices={devices}
                  rowsPerPage={rowsPerPage}
                  selectedDevices={selectedDevices}
                  handleClickDevice={handleClickDevice}
                  handleSelectDevice={setSelectedDevices}
                  handleFavoriteDevice={handleFavoriteDevice}
                  handleSetDeviceOptionsMenu={setDeviceOptionsMenu}
                />
              )}

              {viewMode === VIEW_MODE.CARD && devices.length > 0 && (
                <Cards
                  page={page}
                  devices={devices}
                  rowsPerPage={rowsPerPage}
                  handleClickDevice={handleClickDevice}
                  handleFavoriteDevice={handleFavoriteDevice}
                  handleSetDeviceOptionsMenu={setDeviceOptionsMenu}
                />
              )}

              {devices.length === 0 && <EmptyDeviceList />}
            </>
          )}
        </Box>

        <Pagination
          page={page}
          rowsPerPage={rowsPerPage}
          totalOfPages={totalPages}
          numberOfSelectedDevices={selectedDevices.length}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>
    </ViewContainer>
  );
};

export default Devices;
