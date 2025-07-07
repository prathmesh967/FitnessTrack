import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/Theme";
import GlobalStyles from "./styles/GlobalStyles";
import { useState } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { router } from "./router";

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
          <GlobalStyles />
          <ErrorBoundary>
            {/* <Navbar theme={theme} themeToggler={themeToggler} /> */}
            <RouterProvider router={router} />
          </ErrorBoundary>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
