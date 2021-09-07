import React from 'react';
import 'rsuite/dist/styles/rsuite-dark.css';
import Comments from './features/comments/Comments';
import MyDynamicForm from './features/myDynamicForm/MyDynamicForm';

const App2 = () => {
  return (
    <>
      <Comments />
      <MyDynamicForm />;
    </>
  );
};

export default App2;
