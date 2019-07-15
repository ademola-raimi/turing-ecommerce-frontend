import { all, fork } from 'redux-saga/effects';
import * as ProductSagas from './Products';
import * as CategorySagas from './Categories';

// import watchers from other files
export default function* rootSaga() {
  yield all([
        ...Object.values(ProductSagas),
        ...Object.values(CategorySagas)
        // add other watchers to the array
    ].map(fork));
}
