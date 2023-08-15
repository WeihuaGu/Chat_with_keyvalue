// store.js

import { createStore } from 'redux';
import rootReducer from './reducers/rootreducer.js'; // 导入你的根 reducer

const store = createStore(rootReducer);

export default store;
