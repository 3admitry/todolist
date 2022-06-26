import {Provider} from 'react-redux';
import React from 'react';
import {combineReducers, createStore} from 'redux';
import {tasksReducer} from '../store/tasks-reducer';
import {todolistsReducer} from '../store/todolists-reducer';
import {v1} from 'uuid';
import {TaskPriorities, TaskStatuses} from '../api/todolist-api';
import {AppRootStateType} from '../store/store';

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
})

let todolistId1 = v1();
let todolistId2 = v1();

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
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


export const storyBookStore = createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (Story: any) => {
    return (
        <Provider store={storyBookStore}>
            {Story()}
        </Provider>
    )
}

// @ts-ignore
window.storyState = storyBookStore;