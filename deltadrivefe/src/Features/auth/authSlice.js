import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
// import { loginResponseDto } from "../../Models/loginDto";
import authService from "./authService";

const localUserId = localStorage.getItem("userId");
const localAccessToken = localStorage.getItem("accessToken");

const initialState = {
    userId: localUserId ? localUserId : null,
    userInfo: null,
    accessToken: localAccessToken ? localAccessToken : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const loginUser = createAsyncThunk(
    "auth/login",
    async (userData, thunkAPI) => {

        try {
            return await authService.loginUser(userData);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                (error.response && error.response.data) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "User successfully logged in!";

                const responseDto = action.payload;
                state.userId = responseDto.id;
                state.accessToken = responseDto.token;

                localStorage.setItem("userId", state.userId);
                localStorage.setItem("accessToken", state.accessToken);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // .addCase(logoutUser.fulfilled, (state, action) => {
            //     state.userId = null;
            //     state.userInfo = null;
            //     state.accessToken = null;
            // })
    },
});

export const { resetState } = authSlice.actions;
export default authSlice.reducer;