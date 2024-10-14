// Import Provider component to make Redux store available to entire app
import { Provider } from "react-redux"
// Import BrowserRouter to handle routing between pages
import { BrowserRouter } from "react-router-dom"
// Import PageHeader component for the header section of the app
import PageHeader from "./Common/PageHeader"
// Import PageNavigator component to handle page navigation 
import PageNavigator from "./PageNavigator"
// Import Redux store 
import { store } from "./Store/index.ts"

// Main App component
function App() {
  return (
    // Provide the Redux store to the entire application
    <Provider store={store}>
      {/* Enable routing for the application */}
      <BrowserRouter>
        {/* Render the page header */}
        <PageHeader />
        {/* Render the navigation component for different pages */}
        <PageNavigator />
      </BrowserRouter>
    </Provider>
  )
}

export default App // Export the App component as the default export
