import { createContext, useReducer, useContext } from "react";
import promoReducer, { initialPromo } from "./promoReducer";

export const PromoDataContext = createContext(initialPromo);

export const PromoStoreContext = ({ children }) => {
  const [promoState, deispatchPromo] = useReducer(promoReducer, initialPromo);

  const addPromo = (promo) => {
    const updatePromo = promoState.promoInitiative.concat(promo);
    updatePromo.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      
      return dateA - dateB;
    });
    deispatchPromo({
      type: "ADD_PROMO",
      payload: { promoInitiative: updatePromo },
    });
  };

  const setPromo=(promo)=>{
    deispatchPromo({
      type: "SET_PROMO",
      payload:promo
    })
  }

  const setDate = (date) => {
    deispatchPromo({
      type: "SET_DATE",
      payload: date,
    });
  };
  const setFilm = (film) => {
    deispatchPromo({
      type: "SET_FILM",
      payload: film,
    });
  };

  const setGadget = (gadget) => {
    deispatchPromo({
      type: "SET_GADGET",
      payload: gadget,
    });
  };

  const setModalita = (modalita) => {
    deispatchPromo({
      type: "SET_MODALITA",
      payload: modalita,
    });
  };

  const setWhere= (where) => {
    deispatchPromo({
      type: "SET_WHERE",
      payload: where,
    });
  };

  const initPromo = () => {
    deispatchPromo({
      type: "INIT_PROMO",
    });
  };

  const deletePromo = (id) => {
    const updatePromo =promoState.promoInitiative.filter((promo)=> promo.id!==id);

    deispatchPromo({
      type: "DEL_PROMO",
      payload: { promoInitiative: updatePromo },
    });
  };

  const updatePromo = (id,updatePromo) => {
    let updatePromoInitiative = promoState.promoInitiative;
    let updatePromoId = promoState.promoInitiative.findIndex((e) => e.id === id);
    updatePromoInitiative[updatePromoId] = updatePromo;
    deispatchPromo({
      type: "UPDATE_PROMO",
      payload: { promoInitiative: updatePromoInitiative },
    });
  };

  const value = {
    totalPromo: promoState.totalPromo,
    promoInitiative: promoState.promoInitiative,
    promo: promoState.newPromo,
    addPromo,
    setDate,
    setFilm,
    setGadget,
    setModalita,
    setWhere,
    initPromo,
    deletePromo,
    updatePromo,
    setPromo
  };
  return (
    <PromoDataContext.Provider value={value}>
      {children}
    </PromoDataContext.Provider>
  );
};

const usePromoStore = () => {
  const context = useContext(PromoDataContext);
  if (context === undefined) {
    throw new Error("useData must be used with DataContext");
  }
  return context;
};

export default usePromoStore;
