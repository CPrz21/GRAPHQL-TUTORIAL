import { ApolloProvider } from "@apollo/client";

import "./App.css";

import client from "./client";
import { DisplayData } from "./components";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>List Of Users</h1>
        <DisplayData />
      </div>
    </ApolloProvider>
  );
}

export default App;
