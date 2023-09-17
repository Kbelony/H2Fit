import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';

// Créez un store Redux en utilisant configureStore
const store = configureStore({
  reducer: {
    user: userReducer,
    // Ajoutez ici d'autres réducteurs si nécessaire
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false, // Désactive la vérification de sérialisation pour permettre d'utiliser des objets non sérialisables
  }),
});

// Exportez le type RootState pour être utilisé dans les composants
export type RootState = ReturnType<typeof store.getState>;

// Exportez le store
export default store;
