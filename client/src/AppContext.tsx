import React from 'react';
import Todo from './types/todo';

export interface AppContextInterface {
    todos: Todo[],
    addTodo?: Function,
    deleteTodo?: Function,
    updateTodo?: Function
}

export const store: AppContextInterface = {
    todos: [],
}

export const ctxt = React.createContext<AppContextInterface>(store);

export const AppContextProvider = ctxt.Provider;
export const AppContextConsumer = ctxt.Consumer;