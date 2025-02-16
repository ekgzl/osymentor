import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "../app/store.ts";
import App from "./App.tsx";
import "./config/firebase-config";
createRoot(document.getElementById("root")!).render(
  //   {BrowserRouter} Yönlendirme sağlamak icin.
  <BrowserRouter>
    {/* State management uygulamamızı olusturmak icin*/}
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
