import instance from 'utils/instance'
import { signIn } from 'utils/api'

// Action
export const types = {
    SET_SIGN_IN:   'app/SET_SIGN_IN',
    SET_SIGN_OUT:  'app/SET_SIGN_OUT',
    SET_ERROR:     'app/SET_ERROR',
    START_FETCH:   'app/START_FETCH',
    FINISH_FETCH:  'app/FINISH_FETCH',
    START_LOADER:  'app/START_LOADER',
    FINISH_LOADER: 'app/FINISH_LOADER',
}

// Action Creators
export const actions = {
    setLogOut: () => ({ type: types.SET_SIGN_OUT }),
    setSignIn: data => ({ type: types.SET_SIGN_IN, data }),
    startFetch: () => ({ type: types.START_FETCH }),
    finishFetch: () => ({ type: types.FINISH_FETCH }),
    startLoader: () => ({ type: types.START_LOADER }),
    finishLoader: () => ({ type: types.FINISH_LOADER }),
    setError: error => ({ type: types.SET_ERROR, data: error }),
    login: values => async (dispatch) => {
        const data = await instance.post(signIn, values)
        dispatch(actions.setSignIn(data.data))
        return data
    }
}

const initialState = {
    isFetching: false,
    loading: true,
    signIn: false,
    error: null,
    user: {}
}

// Reducer
export default (state = initialState, action) => {
    const data = action.data
    switch (action.type) {
        case types.START_FETCH:
            return { ...state, isFetching: true }
        case types.FINISH_FETCH:
            return { ...state, isFetching: false }
        case types.START_LOADER:
            return { ...state, loading: true }
        case types.FINISH_LOADER:
            return { ...state, loading: false }
        case types.SET_SIGN_IN:
            return {
                ...state,
                signIn: data.success,
                user: {
                    name: data.data.name,
                    uid: data.data.uid,
                    avatar: data.data.avatar
                }
            }
        case types.SET_SIGN_OUT:
            return { ...state, signIn: false }
        case types.SET_ERROR:
            return { ...state, error: data }
        default:
            return state
    }
}