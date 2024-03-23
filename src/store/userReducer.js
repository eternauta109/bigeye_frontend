export const initialUser = null;

const userReducer = (state, action) => {
  const { type, payload } = action;
  console.log("userReducer", type, payload.user);
  switch (type) {
    case "SET_USER":
      /* console.log("ADD_EVENT", payload); */
      return {
        user: payload.user,
      };

    default:
      throw new Error("no case for type", type);
  }
};

export default userReducer;
