import {Provider} from 'react-redux';
import React from 'react';
import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import {tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {todolistsReducer} from '../features/TodolistsList/todolists-reducer';
import {v1} from 'uuid';
import {TaskPriorities, TaskStatuses} from '../api/todolist-api';
import {AppRootStateType} from '../app/store';
import thunk from 'redux-thunk';
import {appReducer} from '../app/app-reducer';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {authReducer} from '../features/Login/auth-reducer';

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

let todolistId1 = v1();
let todolistId2 = v1();

const initialGlobalState = {
    todolists: [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'loading'}
    ],
    tasks: {
        [todolistId1]: [
            {
                id: v1(), title: 'React', status: TaskStatuses.Completed, todoListId: 'todolistId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: 'Angular', status: TaskStatuses.New, todoListId: 'todolistId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },

        ],
        [todolistId2]: [
            {
                id: v1(), title: 'Milk', status: TaskStatuses.Completed, todoListId: 'todolistId2', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: 'Bread', status: TaskStatuses.New, todoListId: 'todolistId2', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType, applyMiddleware(thunk));
export const ReduxStoreProviderDecorator = (Story: any) => {
    return (
        <Provider store={storyBookStore}>
            <MemoryRouter>
                <Routes>
                    <Route path="/*" element={<Story/>}/>
                </Routes>
            </MemoryRouter>
        </Provider>
    )
}

// @ts-ignore
window.storyState = storyBookStore;