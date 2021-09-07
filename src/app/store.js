import { configureStore } from '@reduxjs/toolkit';
// import todosReducer from '../features/todos/todosSlice';
// import postsReducer from '../features/posts/postsSlice';
// import usersReducer from '../features/users/usersSlice';
import commentsReducer from '../features/comments/commentsSlice';
import myDynamicFormReducer from '../features/myDynamicForm/myDynamicFormSlice';

export const store = configureStore({
  reducer: {
    comments: commentsReducer,
    myDynamicForm: myDynamicFormReducer,
  },
});
