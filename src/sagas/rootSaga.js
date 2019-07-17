import { all, fork } from 'redux-saga/effects';
import * as ProductSagas from './Products';
import * as CategorySagas from './Categories';
import * as ShoppingCartSagas from './ShoppingCart';

// import watchers from other files
export default function* rootSaga() {
  yield all([
        ...Object.values(ProductSagas),
        ...Object.values(CategorySagas),
        ...Object.values(ShoppingCartSagas)
        // add other watchers to the array
    ].map(fork));
}
