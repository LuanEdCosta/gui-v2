import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

const GET_DEVICES = 'app/devices/GET_DEVICES';
const GET_DEVICE_BY_ID = 'app/devices/GET_DEVICE_BY_ID';
const GET_FAVORITE_DEVICES = 'app/devices/GET_FAVORITE_DEVICES';
const UPDATE_DEVICES = 'app/devices/UPDATE_DEVICES';
const FAVORITE_DEVICE = 'app/devices/FAVORITE_DEVICE';
const DELETE_DEVICE = 'app/devices/DELETE_DEVICE';
const DELETE_MULTIPLE_DEVICES = 'app/devices/DELETE_MULTIPLE_DEVICES';
const EDIT_DEVICE = 'app/devices/EDIT_DEVICE';
const CREATE_DEVICE = 'app/devices/CREATE_DEVICE';
const CREATE_MULTIPLE_DEVICES = 'app/devices/CREATE_MULTIPLE_DEVICES';

export const constants = {
  GET_DEVICES,
  GET_DEVICE_BY_ID,
  GET_FAVORITE_DEVICES,
  UPDATE_DEVICES,
  FAVORITE_DEVICE,
  DELETE_DEVICE,
  DELETE_MULTIPLE_DEVICES,
  EDIT_DEVICE,
  CREATE_DEVICE,
  CREATE_MULTIPLE_DEVICES,
};

export const getDevices = createAction(GET_DEVICES, payload => ({
  page: payload.page,
  filter: payload.filter,
  sortBy: payload.sortBy,
}));

export const getDeviceById = createAction(GET_DEVICE_BY_ID, payload => ({
  deviceId: payload.deviceId,
}));

export const getFavoriteDevices = createAction(GET_FAVORITE_DEVICES, () => ({}));

export const updateDevices = createAction(UPDATE_DEVICES, payload => {
  const actionPayload = {
    devices: payload.devices,
    deviceData: payload.deviceData,
    favoriteDevices: payload.favoriteDevices,
    paginationControl: payload.paginationControl,
  };

  // If some attribute is undefined it will be removed from the state
  // So, its necessary to remove all undefined values from the payload
  Object.entries(actionPayload).forEach(([key, value]) => {
    if (value === undefined) delete actionPayload[key];
  });

  return actionPayload;
});

export const favoriteDevice = createAction(FAVORITE_DEVICE, payload => ({
  deviceId: payload.deviceId,
}));

export const deleteDevice = createAction(DELETE_DEVICE, payload => ({
  deviceId: payload.deviceId,
  successCallback: payload.successCallback,
  shouldGetCurrentPageAgain: payload.shouldGetCurrentPageAgain ?? true,
}));

export const deleteMultipleDevices = createAction(DELETE_MULTIPLE_DEVICES, payload => ({
  deviceIdArray: payload.deviceIdArray,
}));

export const editDevice = createAction(EDIT_DEVICE, payload => ({
  id: payload.id,
  label: payload.label,
  templates: payload.templates,
  attrs: payload.attrs,
  disabled: payload.disabled,
  successCallback: payload.successCallback,
}));

export const createDevice = createAction(CREATE_DEVICE, payload => ({
  label: payload.label,
  templates: payload.templates,
  attrs: payload.attrs,
  fingerprint: payload.fingerprint,
  disabled: payload.disabled,
  successCallback: payload.successCallback,
}));

export const createMultipleDevices = createAction(CREATE_MULTIPLE_DEVICES, payload => ({
  devicesPrefix: payload.devicesPrefix,
  quantity: payload.quantity,
  initialSuffixNumber: payload.initialSuffixNumber,
  templates: payload.templates,
  attrs: payload.attrs,
  successCallback: payload.successCallback,
}));

export const actions = {
  getDevices,
  getDeviceById,
  getFavoriteDevices,
  updateDevices,
  favoriteDevice,
  deleteDevice,
  deleteMultipleDevices,
  editDevice,
  createDevice,
  createMultipleDevices,
};

export const reducers = {
  [UPDATE_DEVICES]: (state, { payload }) => {
    return state.merge({ ...payload });
  },
};

export const initialState = () => {
  return Map({
    devices: [],
    deviceData: null,
    favoriteDevices: [],
    paginationControl: {
      totalPages: 0,
      currentPage: 1,
      itemsPerPage: 0,
    },
  });
};

export default handleActions(reducers, initialState());
