export const updateObject = (oldObject, updatedValues) => {
  return {
      ...oldObject,
      ...updatedValues
  }
};

export const isDevEnv = () => process.env.NODE_ENV === 'development';