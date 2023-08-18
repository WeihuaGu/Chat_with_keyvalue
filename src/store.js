// store.js

import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers/rootreducer.js'; // 导入你的根 reducer
const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = createStore(persistedReducer);
const persistor = persistStore(store); // 创建持久化存储实例
export { store, persistor };
