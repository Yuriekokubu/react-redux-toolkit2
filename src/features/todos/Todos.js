import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTodos, add, del, delProp, patch } from './todosSlice';
import { List, FlexboxGrid, IconButton, Icon } from 'rsuite';

const Todo = () => {
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();
  return (
    <List bordered>
      {todos.map(({ id, txt }, index) => (
        <List.Item bordered>
          <FlexboxGrid key={id}>
            <FlexboxGrid.Item colspan={12}>{txt}</FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={10}></FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={2}>
              <IconButton
                onClick={() => dispatch(del(index))}
                icon={<Icon icon="minus" />}
                color="red"
                circle
              />
              <IconButton
                onClick={() => dispatch(patch({ index, txt: 'Rowadz' }))}
                icon={<Icon icon="magic" />}
                color="blue"
                circle
              />
              <IconButton
                onClick={() => dispatch(delProp({ index, prop: 'txt' }))}
                icon={<Icon icon="address-book" />}
                color="yellow"
                circle
              />
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </List.Item>
      ))}
    </List>
  );
};

export default Todo;
