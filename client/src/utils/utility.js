export const updateObject = (oldObject, updatedValues) => {
  return {
      ...oldObject,
      ...updatedValues
  }
};

// https://redux.js.org/usage/structuring-reducers/refactoring-reducer-example
export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}

export const isDevEnv = () => process.env.NODE_ENV === 'development';