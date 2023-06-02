import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "..";

interface UserState {
  [x: string]: any;
  type: string;
  firstName: string;
  lastName: string;
  id: string;
}

const initialState: UserState = {
  type: "",
  firstName: "",
  lastName: "",
  id: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userIsStudent(state) {
      state.type = "Student";
    },
    userIsTeacher(state) {
      state.type = "Teacher";
    },
    setUserFirstName(state, action) {
      state.firstName = action.payload;
    },
    setUserLastName(state, action) {
      state.lastName = action.payload;
    },
    setUserId(state, action) {
      state.id = action.payload;
    },
    clearUser(state) {
      state.type = "";
      state.firstName = "";
      state.lastName = "";
      state.id = "";
    },
  },
});

export const {
  userIsStudent,
  userIsTeacher,
  clearUser,
  setUserFirstName,
  setUserLastName,
  setUserId,
} = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
