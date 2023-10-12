//可練習：食物卡路里 |  registration form (password,name, disabled), goal-by form | 光暗 | todolist
//
//useState  Effect   Context   Ref   Memo    useReducer    custom
//不可 setMode(mode === light ? {dark} : light);  ??再試
//不知幾時 App 包晒, 幾時在 App外

import React, { useEffect, useReducer, useState } from "react";

const ACTIONS = {
  ADD: "add",
  TOGGLE: "toggle",
  DELETE: "delete",
};

function reducer(goallist, action) {
  switch (action.type) {
    case ACTIONS.ADD:
      return [...goallist, addNewGoal(action.payload.goal, action.payload.by)];
    case ACTIONS.TOGGLE:
      return goallist.map((eachGoal) => {
        if (eachGoal.id === action.payload.id) {
          return { ...eachGoal, complete: !eachGoal.complete };
        }
        return eachGoal;
      });
    case ACTIONS.DELETE:
      return goallist.filter((eachGoal) => eachGoal.id !== action.payload.id); //
    default:
      return goallist;
  }
}

function addNewGoal(goal, by) {
  return { id: Date.now(), goal: goal, by: by, complete: false };
}

export default function App() {
  const [goallist, dispatch] = useReducer(reducer, []);
  const [goal, setGoal] = useState("");
  const [by, setBy] = useState("");
  useEffect(() => {}, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(goal + by);
    dispatch({ type: ACTIONS.ADD, payload: { goal: goal, by: by } });
    setGoal("");
    setBy("");
  };

  return (
    <div className="GoalContainer">
      <GoalForm
        goal={goal}
        by={by}
        setGoal={setGoal}
        setBy={setBy}
        handleSubmit={handleSubmit}
      />
      {goallist.map((eachGoal) => (
        <GoalDisplay
          key={eachGoal.id}
          eachGoal={eachGoal}
          ACTIONS={ACTIONS}
          dispatch={dispatch}
        />
      ))}
    </div>
  );
}

function GoalForm({ goal, by, setGoal, setBy, handleSubmit }) {
  return (
    <div>
      <h1>Mark down your goals and complete them little by little!</h1>
      <form onSubmit={handleSubmit} id="form">
        <input
          name="goal"
          type="text"
          value={goal}
          placeholder="Goal"
          onChange={(e) => setGoal(e.target.value)}
        />
        <input
          type="text"
          name="by"
          value={by}
          placeholder="Deadline"
          onChange={(e) => setBy(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

function GoalDisplay({ ACTIONS, dispatch, eachGoal }) {
  console.log(eachGoal);
  console.log(eachGoal.id);
  return (
    <div className="result">
      <div>
        <span style={{ color: eachGoal.complete ? "#FDF0D5" : "#780000" }}>
          My goal: {eachGoal.goal} | I will finish it by: {eachGoal.by}
        </span>
      </div>
      <div>
        {eachGoal.complete ? (
          <button
            className="smallButton2"
            onClick={() => {
              dispatch({
                type: ACTIONS.TOGGLE,
                payload: { id: eachGoal.id },
              });
            }}
          >
            Not Done
          </button>
        ) : (
          <button
            className="smallButton2"
            onClick={() => {
              dispatch({
                type: ACTIONS.TOGGLE,
                payload: { id: eachGoal.id },
              });
            }}
          >
            Done :)
          </button>
        )}

        <button
          className="smallButton2"
          onClick={() => {
            dispatch({
              type: ACTIONS.DELETE,
              payload: { id: eachGoal.id },
            });
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

//==========================================================================================自己試
//=======================================================================自己試

// import React, { useReducer, useState } from "react";

// function reducer() {

// }

// // App

// export default function App() {
//   const [todos, dispatch] = useReducer(reducer, []);
//   const [name, setName] = useState("");

//   function handleSubmit(e) {
//     e.preventDefault();

//     setName("");
//   }

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//       </form>
//     </>
//   );
// }

// //TODO components

// const Todo = () => {
//   return (
//     <div>
//       <span style={}></span>
//       <button></button>
//     </div>
//   );
// };

//========================================================================================== 開局練習 useReducer
//========================================================================開局練習 useReducer

/* 


import React, { useReducer, useState } from "react";


function reducer() {
  
}


// App

export default function App() {
  const [todos, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    setName("");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>
    </>
  );
}

//TODO components

const Todo = () => {
  return (
    <div>
      <span style={}></span>
      <button></button>
    </div>
  );
};


*/
//========================================================================================== 開局練習 GOAL BY FORM
//========================================================================開局練習 GOAL BY FORM
/* 

import React from 'react'

function GoalForm(){

}

function ListOfGoals(){

}

export default function App() {
  return (
    <div>App</div>
  )
}

 */
//========================================================================================== 教學
//======================================================================= 教學

// ookkk Todo
//  App外declare 既functions 可reuse
//  App內declare 只有App內可用 | react每次render App component, 內function 都會重新define一次

// import React, { useReducer, useState } from "react";

// // variables
// const ACTIONS = {
//   ADD_TODO: "add-todo",
//   TOGGLE_TODO: "toggle-todo",
//   DELETE_TODO: "delete-todo",
// };

// // reducer
// function reducer(todos, action) {
//   // action 係最大既包包器
//   switch (action.type) {
//     case ACTIONS.ADD_TODO:
//       return [...todos, newTodo(action.payload.name)];
//     //
//     case ACTIONS.TOGGLE_TODO:
//       return todos.map((todo) => {
//         if (todo.id === action.payload.id) {
//           return { ...todo, complete: !todo.complete }; // todo.complete
//         } //target某todo, update某內容, map id===
//         return todo;
//       });
//     //
//     case ACTIONS.DELETE_TODO:
//       return todos.filter((todo) => todo.id !== action.payload.id); // 刪走某todo id===
//     default:
//       return todos;
//   }
// }

// // newTodo
// function newTodo(name) {
//   return { id: Date.now(), name: name, complete: false };
// }
// // App

// export default function App() {
//   const [todos, dispatch] = useReducer(reducer, []);
//   const [name, setName] = useState("");

//   function handleSubmit(e) {
//     // 按 enter
//     e.preventDefault();
//     dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } }); // payload, 需要執行fun的參數, obj黎
//     setName("");
//   }

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//       </form>
//       {todos.map((todo) => (
//         <Todo key={todo.id} todo={todo} dispatch={dispatch} ACTIONS={ACTIONS} />
//       ))}
//     </>
//   );
// }

// //TODO components //import {ACTIONS} from "./App.js"

// const Todo = ({ todo, dispatch, ACTIONS }) => {
//   console.log(ACTIONS);
//   return (
//     <div>
//       <span style={{ color: todo.complete ? "#AAA" : "#000" }}>
//         {todo.name}
//       </span>
//       <button
//         onClick={() =>
//           dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id: todo.id } })
//         }
//         // todo.id
//       >
//         Toggle
//       </button>
//       <button
//         onClick={() =>
//           dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: todo.id } })
//         }
//       >
//         Delete
//       </button>
//     </div>
//   );
// };

//================================================================

//================================================================
//光暗

// import { useContext, useState } from "react";
// import "./App.css";
// import { modeContext } from "./ModeContext";
// import Switch from "./Switch";

// export default function App() {

//   let [mode, setMode] = useState("light");

//   let [num, setNum] = useState(0);

//   const handleClick = () => {
//     setMode(mode === "light" ? "dark" : "light");
//     setNum(num === 0 ? 1 : 0);
//     console.log(mode);
//     console.log("dark: ");
//     console.log("light: ");
//     console.log(num);
//   };

//   const handleChange = () => {
//     setMode(mode === light ? { dark } : light);
//     setNum(num === 0 ? 1 : 0);
//     console.log(mode);
//     console.log(num);
//   };

//   return (
//     <div>
//       <modeContext.Provider value={{ mode, handleChange, handleClick }}>
//         <Title title="Little Lemon" />
//         <Header h1="When it comes to dough" />
//         <Content />
//         <Switch />
//       </modeContext.Provider>
//     </div>
//   );
// }

// /* components */

// const Title = (props) => {
//   let { mode } = useContext(modeContext);
//   return (
//     <h1 style={{ color: mode === "light" ? "black" : "white" }}>
//       {props.title}
//     </h1>
//   );
// };

// const Header = (props) => {
//   let { mode } = useContext(modeContext);
//   return (
//     <h1 style={{ color: mode === "light" ? "black" : "white" }}>{props.h1}</h1>
//   );
// };

// const Content = () => {
//   let { mode } = useContext(modeContext);
//   return (
//     <p style={{ color: mode === "light" ? "black" : "white" }}>
//       Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit tenetur,
//       magni vero recusandae laudantium excepturi esse nulla aut, laboriosam
//       consequatur, dolor labore quis porro voluptates beatae quas nobis? Nulla,
//       beatae!
//     </p>
//   );
// };

//let { mode } = useContext(modeContext);
// let [dark, light] = [
//   { color: "white", backgroundColor: "black" },
//   { color: "black", backgroundColor: "white" },
// ];
// let light = { color: "black", backgroundColor: "white" };

//================================================================

//================================================================
/* 

// kkk進階表格  goal list 1008


import { useState } from "react";
import "./App.css";

function GoalForm(props) {
  // pass addGoal function 入去
  const [formData, setFormData] = useState({ goal: "", by: "" });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value }); //bracket notation: obj[key]
    //formData.goal formData.by
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAdd(formData); // 重點 addGoal function
    clearForm();
  }

  function clearForm() {
    setFormData({ goal: "", by: "" });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Goal"
          name="goal"
          value={formData.goal}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="By"
          name="by"
          value={formData.by}
          onChange={handleChange}
        />
        <button>Submit Goal</button>
      </form>
    </>
  );
}

function ListOfGoals({ allGoals }) {
  return (
    <>
      <ul>
        {allGoals.map((g) => (
          <li>
            My goal is to {g.goal}, by {g.by}
            <input type="checkbox" />
          </li>
        ))}
      </ul>
    </>
  );
}

// App

function App() {
  const [allGoals, setAllGoals] = useState([]);

  function addGoalFunction(g) {
    setAllGoals([...allGoals, g]); // add new goal
    console.log(allGoals);
  }

  return (
    <div className="App">
      <h1>Goal</h1>
      <button
        onClick={() => {
          setAllGoals([]);
        }}
      >
        Reset Goal
      </button>
      <GoalForm onAdd={addGoalFunction} />
      <ListOfGoals allGoals={allGoals} />
    </div>
  );
}

export default App;
*/

//================================================================

//================================================================
/*  kkk食物卡路里

import DessertsList from "./DessertsList";

const desserts = [
  {
    name: "Chocolate Cake",
    calories: 400,
    createdAt: "2022-09-01",
  },
  {
    name: "Ice Cream",
    calories: 200,
    createdAt: "2022-01-02",
  },
  {
    name: "Tiramisu",
    calories: 300,
    createdAt: "2021-10-03",
  },
  {
    name: "Cheesecake",
    calories: 600,
    createdAt: "2022-01-04",
  },
];

<DessertsList data={desserts} />


*/
//================================================================

//================================================================
/* kkk變scroll 

import "./App.css";
import { useRef, useState } from "react";

function App() {
  let cyRef = useRef(null);
  let orRef = useRef(null);
  let numRef = useRef(0);
  let [re, setRe] = useState(0);

  const goOr = () => {
    window.scrollTo({
      top: orRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  const goCy = () => {
    window.scrollTo({
      top: cyRef.current.scrollTop,
      behavior: "smooth",
    });
  };
  const add = () => {
    setRe((re += Number(numRef.current.value)));
  };

  const reset = () => {
    numRef.current.value = 0;
  };
  return (
    <div className="App">
      <div
        className="list"
        style={{ height: "1000px", backgroundColor: "cyan" }}
        ref={cyRef}
      >
        <button onClick={goOr}>Click1</button>
        <input type="text" ref={numRef} />
        <button onClick={add}>add</button>
        <button onClick={reset}>reset</button>
        <p>{re}</p>
      </div>
      <div
        className="form"
        style={{ height: "1000px", backgroundColor: "orange" }}
        ref={orRef}
      >
        <button onClick={goCy}>Click1</button>
      </div>
    </div>
  );
}

export default App;


 */
