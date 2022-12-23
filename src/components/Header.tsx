import classNames from "classnames";
import { useContext } from "react";
import { BurgerMenuContext } from "../utils/burgerMenuContext";
import { useScreenWidth } from "../utils/useWindowSize";
import { Logo } from "./Logo";

export function Header() {
  const { isDesktop, isMobile } = useScreenWidth();
  const { isOpen, toggleMenu } = useContext(BurgerMenuContext);

  return (
    <header className={classNames("w-full flex items-center bg-gray-700 border-b border-gray-600", {
      "justify-center": isDesktop,
      "justify-between": !isDesktop,
      "px-7 py-5": !isMobile,
      "px-6 py-4": isMobile,
    })}>
      <Logo />

      {!isDesktop && (
        <div className="flex gap-3">
          <p>Aulas</p>
          <button onClick={toggleMenu}>
            <div className={classNames("h-[2px] w-6 bg-blue-500 transition-transform", {
              "-rotate-45 translate-x-[-1px] translate-y-[1px]": isOpen
            })} />
            <div className={classNames("h-[2px] w-6 bg-blue-500 my-[5px]", {
              "hidden": isOpen
            })} />
            <div className={classNames("h-[2px] w-6 bg-blue-500 transition-transform", {
              "rotate-45 translate-x-[-0.3px]": isOpen
            })} />
          </button>
        </div>
      )}
    </header>
  )
}
