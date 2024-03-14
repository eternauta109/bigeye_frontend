export const initialPromo = {
  totalPromo: 0,
  promoInitiative: [],
  newPromo: {
    date: new Date(),
    film: null,
    gadget: null,
    modalita: null,
    where: null,
    id: 0,
  },
};

const promoReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_PROMO":
      console.log("ADD_PROMO", payload);
      return {
        ...state,
        promoInitiative: payload.promoInitiative,
        totalPromo: state.totalPromo + 1,
      };
      case "DEL_PROMO":
      console.log("DEL_PROMO", payload);
      return {
        ...state,
        promoInitiative: payload.promoInitiative,        
      };

      case "SET_PROMO":
        console.log("SET_PROMO",payload);
        return {
          ...state,
          newPromo: {...payload}
        }

       case "UPDATE_PROMO":
      console.log("UPDATE_PROMO", payload);
      return {
        ...state,
        promoInitiative: payload.promoInitiative,        
      };

      case "INIT_PROMO":
      console.log("INIT_PROMO");
      return {
        ...state,
        newPromo: {...initialPromo.newPromo},        
      };

      case "SET_FILM":
        console.log("SET_FILM", payload); 
        return {
          ...state,
          newPromo: {
            ...state.newPromo,
            film: payload,          
          },
        };

      case "SET_DATE":
      console.log("SET_DATE", payload); 
      return {
        ...state,
        newPromo: {
          ...state.newPromo,
          date: payload,          
        },
      };
      case "SET_GADGET":
        console.log("SET_GADGET", payload); 
        return {
          ...state,
          newPromo: {
            ...state.newPromo,
            gadget: payload,          
          },
        };

        case "SET_MODALITA":
        console.log("SET_MODALITA", payload); 
        return {
          ...state,
          newPromo: {
            ...state.newPromo,
            modalita: payload,          
          },
        };

        case "SET_WHERE":
        console.log("SET_WHERE", payload); 
        return {
          ...state,
          newPromo: {
            ...state.newPromo,
            where: payload,          
          },
        };

        
        

    default:
      throw new Error("no case for type", type);
  }
};

export default promoReducer;
