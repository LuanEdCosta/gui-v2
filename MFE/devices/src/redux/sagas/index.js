import { all } from 'redux-saga/effects';

import { deviceSaga } from './devicesSaga';
import { certificatesSaga } from './certificatesSaga';
import { templateSaga } from './templatesSaga';

export default function* sagas() {
    yield all([
        ...deviceSaga,
        ...certificatesSaga,
        ...templateSaga,
    ]);
}
