import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./store/store/store";
import persistStore from "redux-persist/es/persistStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";

import { QueryClient, QueryClientProvider } from "react-query";

const root = ReactDOM.createRoot(
  (document.getElementById("root") as HTMLElement) ||
    (document.createElement("div") as HTMLElement)
);

export const persistor = persistStore(store);
const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);

// themes.initialized(() => {
//   root.render(
//     <React.StrictMode>
//       <Provider store={store}>
//         <PersistGate loading={null} persistor={persistor}>
//           <App />
//         </PersistGate>
//       </Provider>
//     </React.StrictMode>
//   );
// });
