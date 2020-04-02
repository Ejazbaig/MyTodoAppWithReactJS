import React from "react";

const myContext = React.createContext();

const myContextProvider = myContext.Provider;
const myContextConsumer = myContext.Consumer;

export { myContextProvider, myContextConsumer };
