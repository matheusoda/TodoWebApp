import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Container,
  List,
  ListItem,
  TextField,
  Button,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import api from '../../services/api';

export default function EditTodo(){
  const [id, setId] = useState()
	const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState('');
  
  const history = useHistory();
  const userId = localStorage.getItem('userId');

  async function newTodo(e) {
		e.preventDefault();

		const data = {
			id,
			title,
			completed,
		};

		try{
			await api.post(`users/${userId}/todos`, data)

			history.push('/profile')
		} catch (err) {
			alert('Erro ao cadastrar caso, tente novamente.')
		}

  }
  
  return (
		<Container >
			<div className="container-tela">
        <h1>Cadastrar novo caso</h1>
				{/* <section>
					<img src={logoImg} alt="Be The Hero"/> 

					<h1>Cadastrar novo caso</h1>
					<p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

					
				</section> */}
        <Link 
          className="back-link" 
          to="/TodoList"
        >
          <ArrowBackIcon size={16} />
          Voltar para home
        </Link>
        <List onSubmit={EditTodo}>
          <ListItem >
            <TextField 
              placeholder="Id"
              value={id}
              variant="outlined"
              onChange={e => setId(e.target.value)}
            />
          </ListItem>
          <ListItem >
            <TextField 
              placeholder="Descrição da tarefa"
              value={title}
              multiline
              variant="outlined"
              onChange={e => setTitle(e.target.value)}
            />
          </ListItem>
          <ListItem >
            <TextField 
              placeholder=""
              value={completed}
              variant="outlined"
              onChange={e => setCompleted(e.target.value)}
            />
          </ListItem>
          <Button 
            className="button"
            type="submit"
            variant="outlined"
            color="primary"
          >
            Cadastrar
          </Button>

				</List>
			</div>
		</Container>
	);
}
