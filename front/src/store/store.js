import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { rootReducer } from "./root.reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["auth"], // which reducer want to store
};
const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  pReducer,
  composeWithDevTools(applyMiddleware(logger, thunk))
);

const persistor = persistStore(store);
export { persistor, store };
