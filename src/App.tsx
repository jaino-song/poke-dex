import { BrowserRouter } from "react-router-dom"
import PageHeader from "./Common/PageHeader"
import PageNavigator from "./PageNavigator"
import { Provider } from "react-redux"
import store from "./Store/index.ts"

function App() {

  return (
    // Redux store
    <Provider store={store}>
      {/* react router */}
      <BrowserRouter>
        {/* header component */}
        <PageHeader />
        {/* page navigator component that renders links of each child component */}
        <PageNavigator />
      </BrowserRouter>
    </Provider>
  )
}

export default App
