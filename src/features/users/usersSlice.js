import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

export const fetchData = createAsyncThunk(
  'users/fetchData',
  async (_, { dispatch }) => {
    const data = await fetch('http://localhost:3001/users').then((res) =>
      res.json()
    );
    const users = data.map(({ articles, comments, ...user }) => ({ ...user }));
    dispatch(setUsers(users));

    const articles = data
      .map((user) =>
        user.articles.map((article) => ({ ...article, userId: user.id }))
      )
      .flat();

    dispatch(setArticles(articles));

    const comments = data
      .map((user) =>
        user.comments.map((comment) => ({ ...comment, userId: user.id }))
      )
      .flat();

    dispatch(setComments(comments));
  }
);

const usersAdapter = createEntityAdapter({
  selectId: ({ id }) => id,
});

const commentsAdapter = createEntityAdapter({
  selectId: ({ id }) => id,
});

const articlesAdapter = createEntityAdapter({
  selectId: ({ id }) => id,
});

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState({
    comments: commentsAdapter.getInitialState(),
    articles: articlesAdapter.getInitialState(),
  }),
  reducers: {
    addUser: usersAdapter.addOne,
    setUsers: usersAdapter.setAll,
    addUsers: usersAdapter.addMany,
    setComments(state, { payload }) {
      commentsAdapter.setAll(state.comments, payload);
    },
    setArticles(state, { payload }) {
      articlesAdapter.setAll(state.articles, payload);
    },
  },
});

export const { addUser, setUsers, addUsers, setComments, setArticles } =
  usersSlice.actions;

export const {
  selectAll: selectAllUsers,
  selectById: selectUsersById,
  selectEntities: selectUsersEntities,
  selectIds: selectUsersIds,
  selectTotal: selectTotalUsers,
} = usersAdapter.getSelectors();

export const selectUsersAdapter = (state) => state.users;

export const selectAtricles = createSelector(selectUsersAdapter, (state) =>
  articlesAdapter.getSelectors().selectAll(state.articles)
);

export const selectAtriclesIds = createSelector(selectUsersAdapter, (state) =>
  articlesAdapter.getSelectors().selectIds(state.articles)
);

export default usersSlice.reducer;
