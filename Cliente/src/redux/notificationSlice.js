import { createSlice } from '@reduxjs/toolkit';

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    list: [],  // lista de notificaciones
    unreadCount: 0,  // número de notificaciones no leídas
  },
  reducers: {
    addNotification: (state, action) => {
      state.list.push(action.payload);
      state.unreadCount += 1;
    },
    markAsRead: (state) => {
      state.unreadCount = 0;
    },
    // puedes añadir más acciones si lo necesitas
  },
});

export const { addNotification, markAsRead } = notificationSlice.actions;

export default notificationSlice.reducer;
