import Aside from "./components/Aside";
import Main from "./components/Main";
import { Provider } from 'react-redux';
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <div className="flex flex-row my-4">
        <Aside />
        <Main />
      </div>
    </Provider>
  );
};

export default App;
