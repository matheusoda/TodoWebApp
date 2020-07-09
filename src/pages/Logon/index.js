import React, { useState } from 'react';
import { 
  Container, 
  TextField, 
  Button
 } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

function Logon() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
	const history = useHistory();

	async function Login(e) {
		e.preventDefault();

		try{
      const response = await api.get(`users?email=${email}`);
      
      localStorage.setItem('userId', response.data[0].id);

      console.log("Dados = ", response.data[0]);

      history.push('/TodoList')
		} catch (err){
			alert('Falha no login, tente novamente')
		}
	}

  
  return (
    <Container maxWidth="xs">
      <div className="container-tela" id="align-center">
        <h1>Todo List App</h1>
        <form onSubmit={Login}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            required
            id="userName"
            label="User Name"
            name="userName"
            autoComplete="userName"
            autoFocus
            value={userName}
						onChange={e => setUserName(e.target.value)}
          >
          </TextField>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            required
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
						onChange={e => setEmail(e.target.value)}
          >
          </TextField>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
          >
            Login
            </Button>
        </form>
      </div>
      <div className="div-link">
      </div>
    </Container>
  );
}

export default Logon;