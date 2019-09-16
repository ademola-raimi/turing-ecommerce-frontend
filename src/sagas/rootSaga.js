import { all, fork } from 'redux-saga/effects';
import * as ProductSagas from './Products';
import * as CategorySagas from './Categories';
import * as DepartmentSagas from './Departments';
import * as ShoppingCartSagas from './ShoppingCart';
import * as CustomersSagas from './Customers';
import * as OrderSagas from './Order';
import * as ShippingSagas from './Shipping';
import * as AttributesSagas from './Attributes';

// import watchers from other files
export default function* rootSaga() {
  yield all([
        ...Object.values(ProductSagas),
        ...Object.values(CategorySagas),
        ...Object.values(ShoppingCartSagas),
        ...Object.values(CustomersSagas),
        ...Object.values(DepartmentSagas),
        ...Object.values(OrderSagas),
        ...Object.values(ShippingSagas),
        ...Object.values(AttributesSagas)
        // add other watchers to the array
    ].map(fork));
}
