import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import TodoList from "./components/TodoList";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/todo" element={<TodoList />} />
      </Routes>
    </div>
  );
};

export default App;
