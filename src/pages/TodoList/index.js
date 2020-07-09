import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Container,
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  ListItemSecondaryAction,
  Button
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import api from '../../services/api';

import './styles.css';

function TodoList() {
  const [todoList, setTodoList] = useState([]);
  // const [completed, setCompleted] = useState([]);

  const history = useHistory();
  const userId = localStorage.getItem('userId');


  useEffect(() => {
    api.get(`/users/${userId}/todos`)
      .then(response => {
        setTodoList(response.data)
      })
  }, []);


  async function deleteTodo(id) {
    try {
      await api.delete(`todos/${id}`);

      setTodoList(todoList.filter(todo => todo.id !== id));

    } catch (err) {
      alert('Erro ao deletar o caso, tente novamente.')
    }
  }
  /*
  async function alterTodo(id) {
		try {
			await api.put(`todos/${id}`);

			setTodoList(todoList.filter(todo => todo.id !== id));

		} catch (err) {
			alert('Erro ao alterar o caso, tente novamente.')
		}
  }
  */

  function logout() {
    localStorage.clear();

    history.push('./')
  }

  function stateTodo(id) {
    const newTodoList = todoList.map(list => {
      return list.id === id ? { ...list, completed: !list.completed } : list
    });
    setTodoList(newTodoList);
  }
  console.log("LIST = ", todoList);

  return (
    <Container maxWidth="md">
      <div id="align" className="container-tela">
      <Link id="btnFake-link" to="/AddTodo">
        <Button
          variant="contained"
          color="primary"
        >
          Cadastrar Todo
        </Button>
      </Link>
        <List >
          {todoList.map(list =>
            <ListItem key={list.id}>
              <ListItemIcon>
                <Checkbox color="primary" onClick={() => stateTodo(list.id)} checked={list.completed} />
              </ListItemIcon>
              <ListItemText >
                {/* {list.completed && <span>(Encerrado)</span>} */}
                {list.id}  {list.title}
              </ListItemText>
              <ListItemSecondaryAction>
                <Link  className="icons" id="btnFake-link" to="/EditTodo">
                  <EditIcon className="icons" />
                </Link>
                <DeleteIcon className="icons" onClick={() => deleteTodo(list.id)} />
              </ListItemSecondaryAction>
            </ListItem>)}
        </List>
      </div>
      <Button
        id="btn-logout"
        color="secondary"
        variant="contained"
        onClick={() => logout()}>
        Logout
        </Button>
    </Container>
  );
}

export default TodoList;