import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Video } from "../components/Video";
import { BurgerMenuContext } from "../utils/burgerMenuContext";
import { useScreenWidth } from "../utils/useWindowSize";

export function Event() {
  const { isOpen } = useContext(BurgerMenuContext);

  const { isDesktop, isTablet, isMobile } = useScreenWidth()

  const { slug } = useParams<{ slug: string }>()

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1 relative">
        {slug
          ? <Video lessonSlug={slug} />
          : <div className="flex-1" />
        }

        {isDesktop && (
          <Sidebar />
        )}

        {isOpen && (
          <Sidebar />
        )}
      </main>
    </div>
  )
}
