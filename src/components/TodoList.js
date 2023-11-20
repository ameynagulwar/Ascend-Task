import React, { useState } from "react";

const TodoList = () => {
  const [columns, setColumns] = useState([
    {
      id: "column1",
      title: "List 1",
      tasks: [
        { id: "task1", content: "Task 1" },
        { id: "task2", content: "Task 2" },
      ],
      newTaskContent: "",
    },
  ]);

  const onTaskDragStart = (e, taskId, sourceColumnId, taskContent) => {
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ taskId, sourceColumnId, taskContent })
    );
    e.dataTransfer.effectAllowed = "move";
  };

  const onTaskDrop = (e, destinationColumnId, destinationIndex) => {
    e.preventDefault();

    const { taskId, sourceColumnId, taskContent } = JSON.parse(
      e.dataTransfer.getData("text/plain")
    );

    if (sourceColumnId !== destinationColumnId) {
      const newColumns = columns.map((col) => {
        if (col.id === sourceColumnId) {
          col.tasks = col.tasks.filter((task) => task.id !== taskId);
        }

        if (col.id === destinationColumnId) {
          const newTask = { id: taskId, content: taskContent };
          col.tasks.splice(destinationIndex, 0, newTask);
        }

        return col;
      });

      setColumns(newColumns);
    }
  };

  const onColumnDrop = (dragIndex, hoverIndex) => {
    const draggedColumn = columns[dragIndex];
    const newColumns = [...columns];
    newColumns.splice(dragIndex, 1);
    newColumns.splice(hoverIndex, 0, draggedColumn);
    setColumns(newColumns);
  };

  const addTask = (columnId) => {
    const newTaskId = `task${
      columns.reduce((maxId, col) => Math.max(maxId, col.tasks.length), 0) + 1
    }`;
    const newColumns = columns.map((col) => {
      if (col.id === columnId) {
        col.tasks.push({ id: newTaskId, content: col.newTaskContent });
        col.newTaskContent = "";
      }
      return col;
    });

    setColumns(newColumns);
  };

  const updateNewTaskContent = (columnId, value) => {
    const newColumns = columns.map((col) => {
      if (col.id === columnId) {
        col.newTaskContent = value;
      }
      return col;
    });

    setColumns(newColumns);
  };

  const editTask = (columnId, taskId) => {
    const newColumns = columns.map((col) => {
      if (col.id === columnId) {
        const editedTaskContent = prompt(
          "Edit Task:",
          col.tasks.find((task) => task.id === taskId)?.content
        );
        if (editedTaskContent !== null && editedTaskContent !== undefined) {
          col.tasks = col.tasks.map((task) =>
            task.id === taskId ? { ...task, content: editedTaskContent } : task
          );
        }
      }
      return col;
    });

    setColumns(newColumns);
  };

  const deleteTask = (columnId, taskId) => {
    const newColumns = columns.map((col) => {
      if (col.id === columnId) {
        col.tasks = col.tasks.filter((task) => task.id !== taskId);
      }
      return col;
    });

    setColumns(newColumns);
  };

  const addColumn = () => {
    const newColumnId = `column${columns.length + 1}`;
    const newColumns = [
      ...columns,
      {
        id: newColumnId,
        title: `List ${columns.length + 1}`,
        tasks: [],
        newTaskContent: "",
      },
    ];
    setColumns(newColumns);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "20px" }}>Todo List</h1>
      <button
        onClick={addColumn}
        style={{ width: "100px", height: "40px", margin: "20px" }}
      >
        Add Column
      </button>
      <div style={{ display: "flex", margin: "15px" }}>
        {columns.map((column, columnIndex) => (
          <div
            key={column.id}
            style={{
              margin: "8px",
              padding: "8px",
              border: "1px solid gray",
              minWidth: "200px",
              minHeight: "300px",
              marginRight: "25px",
            }}
            onDrop={(e) => onTaskDrop(e, column.id, column.tasks.length)}
            onDragOver={(e) => e.preventDefault()}
          >
            <h2>{column.title}</h2>
            {column.tasks.map((task, taskIndex) => (
              <div
                key={task.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px",
                  margin: "15px",
                  backgroundColor: "white",
                  border: "1px solid gray",
                  cursor: "move",
                  background: "lightBlue",
                }}
                draggable
                onDragStart={(e) =>
                  onTaskDragStart(e, task.id, column.id, task.content)
                }
              >
                <div id="taskchecked">{task.content}</div>
                <div>
                  <input type="checkbox" style={{ marginRight: "10px" }} />
                  <button
                    style={{ marginRight: "10px" }}
                    onClick={() => editTask(column.id, task.id)}
                  >
                    Edit
                  </button>
                  <button onClick={() => deleteTask(column.id, task.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
            <div>
              <input
                type="text"
                value={column.newTaskContent}
                onChange={(e) =>
                  updateNewTaskContent(column.id, e.target.value)
                }
                placeholder="New Task"
              />
              <button
                style={{ marginLeft: "10px" }}
                onClick={() => addTask(column.id)}
              >
                Add Task
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
