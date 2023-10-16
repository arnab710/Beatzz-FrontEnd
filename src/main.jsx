import React from "react";
import ReactDOM from "react-dom/client";
import "./Index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./Redux/Store";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
