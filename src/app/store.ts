import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';

// Récupérez l'état initial de l'utilisateur à partir de localStorage
const preloadedState = {
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') || '{}')
    : {
        name: "",
        email: "",
        photo: "",
      },
};

// Créez un store Redux en utilisant configureStore
const store = configureStore({
  reducer: {
    user: userReducer,
    // Ajoutez ici d'autres réducteurs si nécessaire
  },
  preloadedState, // Utilisez l'état préchargé
  middleware: getDefaultMiddleware({
    serializableCheck: false, // Désactive la vérification de sérialisation pour permettre d'utiliser des objets non sérialisables
  }),
});

// Exportez le type RootState pour être utilisé dans les composants
export type RootState = ReturnType<typeof store.getState>;

// Exportez le store
export default store;