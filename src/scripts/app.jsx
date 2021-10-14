//---IMPORT---//
import React from "react";
import { render } from "react-dom";
import 'react-hot-loader/patch';
import { AppContainer } from "react-hot-loader";

import App from "@js/components/App.jsx";


//---VARIABLE---//
let msg = "Hello World !";


//---FUNCTION---//
const renderApp = () => {
    render(
        <AppContainer>
            <App />
        </AppContainer>,
        document.getElementById("app")
    );
}


//---MAIN---//
console.log(msg);

renderApp();

if (module.hot) {
    module.hot.accept("@js/components/App.jsx", renderApp);
}