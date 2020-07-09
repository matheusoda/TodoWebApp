import React from 'react';
import { Switch, Route } from 'react-router-dom';

import TodoList from '../pages/TodoList/index'
import Logon from '../pages/Logon/index';
import AddTodo from '../pages/AddTodo/index';
import EditTodo from '../pages/EditTodo/index';

function Routes() {
  return (
    <Switch>
      <Route path="/"exact component={Logon} />
      <Route path="/TodoList" component={TodoList} />

      <Route path="/AddTodo" component={AddTodo} />
      <Route path="/EditTodo" component={EditTodo} />
    </Switch>
  );
}

export default Routes;