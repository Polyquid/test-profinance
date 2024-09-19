import Aside from "./components/Aside";
import Main from "./components/Main";
import DataProvider from "./contexts/DataProvider";

const App = () => {
  return (
    <DataProvider>
      <div className="flex flex-row my-4">
        <Aside />
        <Main />
      </div>
    </DataProvider>
  );
};

export default App;
