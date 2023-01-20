import React from "react";
import withRedux from "./components/hoc/withRedux";
import RenderBooks from "./components/ui/RenderBooks/RenderBooks";

const App = () => {
  return (
    <div className="conteiner">
      <h1>Галлерея Книг</h1>
      <RenderBooks />
    </div>
  );
};

const AppWithStore = withRedux(App);

export default AppWithStore;
