import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  photo: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLoginDetails: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.photo = action.payload.photo;
  
      // Stocker les informations de l'utilisateur dans localStorage
      localStorage.setItem('user', JSON.stringify(state));
    },
  
     // ...
  setSignOutState: (state) => {
    state.name = "";
    state.email = "";
    state.photo = "";

    // Supprimer les informations de l'utilisateur de localStorage
    localStorage.removeItem('user');
  },
  },
});

export const { setUserLoginDetails, setSignOutState } = userSlice.actions;
export const selectUser = (state: { user: { name: string; email: string; photo: string; }; }) => state.user;


export default userSlice.reducer;
