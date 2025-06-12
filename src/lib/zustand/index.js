import { create } from "zustand";

export const useAppStore = create(init);

function init(set) {
    return {
        todos: JSON.parse(localStorage.getItem("todos")) || [],
        add(todo) {
            return set(function (state) {
                return { todos: [todo, ...state.todos] };
            });
        },
        remove(id) {
            return set(function (state) {
                const todos = state.todos.filter((el) => el.id !== id);
                return { todos };
            });
        },
        update(todo) {
            return set(function (state) {
                const todos = state.todos.map((el) => {
                    if (el.id === todo.id) {
                        return todo;
                    } else {
                        return el;
                    }
                });
                return { todos };
            });
        },
        clear() {
            return set(function () {
                return { todos: [] };
            });
        },
    };
}


// import { create } from "zustand";

// export const useAppStore = create(init);

// function init(set) {
//     return {
//         todos: JSON.parse(localStorage.getItem("todos")),
//         add(todo) {
//             return set(function (state) {
//                 return {todos: [todo, ...state.todos] };
//             });
//         },
//         remove(id) {
//             return set(function (state) {
//                 const todos = state.todos.filter((el) => el.id)
//                 return {todos};
//             });
//         },
//         update(todo) {
//             return set(function (state) {
//                 const todos = state.todos.map((el) => {
//                     if (el.id === todo.id) {
//                         return todo;
//                     } else {
//                         return el;
//                     }
//                 });
//                 return { todos };
//             });
//         },
//         clear() {
//             return set(function (state) {
//                 return { todos: [] };
//             });
//         },
//     };
// }