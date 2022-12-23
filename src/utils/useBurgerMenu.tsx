import React, { useEffect, useState } from "react";
import { BurgerMenuContext } from "./burgerMenuContext";
import { useScreenWidth } from "./useWindowSize";

type BurgerMenuProviderProps = {
  children?: React.ReactNode
};

export function BurgerMenuProvider({ children }: BurgerMenuProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { isDesktop } = useScreenWidth()

  useEffect(() => {
    setIsOpen(false)
  }, [isDesktop])

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <BurgerMenuContext.Provider value={{ isOpen, toggleMenu }}>
      {children}
    </BurgerMenuContext.Provider>
  )
}