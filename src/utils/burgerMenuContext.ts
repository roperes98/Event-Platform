import { createContext } from 'react';

export const BurgerMenuContext = createContext({
  isOpen: false,
  toggleMenu: () => { }
});