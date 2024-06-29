import React, { useState } from 'react';
import { Button, Form, ListGroup, Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Importa tu archivo CSS personalizado

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editTodo, setEditTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, newTodo]);
      setNewTodo('');
    }
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (index) => {
    setEditIndex(index);
    setEditTodo(todos[index]);
  };

  const handleUpdateTodo = () => {
    const updatedTodos = todos.map((todo, index) =>
      index === editIndex ? editTodo : todo
    );
    setTodos(updatedTodos);
    setEditIndex(null);
    setEditTodo('');
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col md="8">
          <Card className="shadow-sm">
            <Card.Body>
              <h1 className="text-center mb-4">Lista de nombres </h1>
              <Form className="mb-8">
                <Form.Group controlId="formNewTodo">
                  <Form.Control
                    type="text"
                    placeholder="Agregar nombre "
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" onClick={handleAddTodo} className="w-100">
                  Agregar 
                </Button>
              </Form>
              <ListGroup>
                {todos.map((todo, index) => (
                  <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                    {editIndex === index ? (
                      <Form className="d-flex w-100">
                        <Form.Control
                          type="text"
                          value={editTodo}
                          onChange={(e) => setEditTodo(e.target.value)}
                        />
                        <Button variant="success" onClick={handleUpdateTodo} className="ml-2">
                          Update
                        </Button>
                      </Form>
                    ) : (
                      <>
                        <span>{todo}</span>
                        <div>
                          <Button variant="warning" size="sm" onClick={() => handleEditTodo(index)} className="mr-2">
                            Editar 
                          </Button>
                          <Button variant="danger" size="sm" onClick={() => handleDeleteTodo(index)}>
                            Eliminar 
                          </Button>
                        </div>
                      </>
                    )}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
