import React from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import TodoApp from "./todo-app";

import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <TodoApp />
      </main>
      <Footer />
    </div>

  );
}

export default App;
