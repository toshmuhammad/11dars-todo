import { useEffect, useState } from "react";
import { useAppStore } from "./lib/zustand";

import { Container, TextField, Button, List, ListItem, ListItemText, Typography, Box, Stack } from "@mui/material";

export default function App() {
  const [edited, setEdited] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const { todos, add, remove, update, clear } = useAppStore();

  function handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
      completed: false,
      title: inputValue,
      id: window.crypto.randomUUID(),
    };
    add(newTodo);
    setInputValue("");
  }

  function handleEdit(id) {
    const editedData = todos.find((el) => el.id === id);
    setEdited(editedData);
    setInputValue(editedData.title);
  }

  function send() {
    const updatedTodo = {
      ...edited,
      title: inputValue,
    };
    update(updatedTodo);
    setInputValue("");
    setEdited(null);
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos]);

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>Todo App</Typography>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
        <Stack direction="row" spacing={2}>
          <TextField
            fullWidth
            label="Enter todo title"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            inputProps={{ minLength: 5, maxLength: 20 }}
            required
          />
          <Button 
            variant="contained"
            color={edited ? "warning" : "primary"}
            onClick={() => {
              if (edited) send();
            }}
            type={edited ? "button" : "submit"}
          >
            {edited ? "Edit 🖋" : "Add"}
          </Button>
        </Stack>
      </Box>

      <Button onClick={clear} color="error" variant="outlined" fullWidth sx={{ mb: 2 }}>
        Clear
      </Button>

      <List>
        {todos.length > 0 ? todos.map((todo) => (
          <ListItem key={todo.id} sx={{ border: "1px solid #ddd", borderRadius: 1, mb: 1 }}>
            <ListItemText 
              primary={todo.title} 
              secondary={todo.completed ? "Edit" : "Add"} 
            />
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  const yes = confirm("Rostan o'chirmoqchimisiz?");
                  if (yes) {
                    remove(todo.id);
                  }
                }}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                onClick={() => handleEdit(todo.id)}
              >
                Edit
              </Button>
            </Stack>
          </ListItem>
        )) : <Typography>No Data</Typography>}
      </List>
    </Container>
  );
}