import { DefaultUi, Player, Youtube } from "@vime/react";
import { CaretRight, DiscordLogo, FileArrowDown, Image, Lightning } from "phosphor-react";

import '@vime/core/themes/default.css'
import { useGetLessonBySlugQuery } from "../graphql/generated";
import { Rocketseat } from "./Rocketseat";
import classNames from "classnames";
import { useScreenWidth } from "../utils/useWindowSize";

interface VideoProps {
  lessonSlug: string;
}

export function Video({ lessonSlug }: VideoProps) {
  const { isDesktop, isTablet, isMobile } = useScreenWidth()

  const { data } = useGetLessonBySlugQuery({
    variables: {
      slug: lessonSlug
    }
  })

  if (!data || !data.lesson) {
    return (
      <div className="flex-1">
        <p>Carregando...</p>
      </div>
    )
  }

  return (
    <div className="flex-1">
      <div className="bg-black flex justify-center">
        <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
          <Player>
            <Youtube videoId={data.lesson.videoId} />
            <DefaultUi />
          </Player>
        </div>
      </div>

      <div className="p-8 max-w-[1100px] mx-auto">
        <div className={classNames("flex items-start gap-16", {
          "flex-col": !isDesktop
        })}>
          <div className="flex-1">
            <h1 className={classNames("font-bold", {
              "text-2xl": isDesktop,
              "text-xl": !isDesktop
            })}>
              {data.lesson.title}
            </h1>
            <p className={classNames("mt-4 text-gray-200 leading-relaxed", {
              "text-base": isDesktop,
              "text-sm": !isDesktop,
            })}>
              {data.lesson.description}
            </p>

            {data.lesson.teacher && (
              <div className={classNames("flex items-center gap-4", {
                "mt-6": isDesktop,
                "mt-7": !isDesktop,
              })}>
                <img
                  className="h-16 w-16 rounded-full border-2 border-blue-500"
                  src={data.lesson.teacher.avatarURL}
                  alt=""
                />

                <div className="leading-relaxed">
                  <strong className={classNames("font-bold block", {
                    "text-2xl": isDesktop,
                    "text-xl": isTablet,
                    "text-lg": isMobile,
                  })}>{data.lesson.teacher.name}</strong>
                  <span className="text-gray-200 text-sm block">{data.lesson.teacher.bio}</span>
                </div>
              </div>
            )}
          </div>

          <div className={classNames("flex flex-col gap-4", {
            "w-full": !isDesktop
          })}>
            <a href="" className={classNames("p-4 text-sm bg-green-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-green-700 transition-colors", {
              "py-5": !isDesktop
            })}>
              <DiscordLogo size={24} />
              Comunidade do Discord
            </a>

            <a href="" className="p-4 text-sm border border-blue-500 text-blue-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-blue-500 hover:text-gray-900 transition-colors">
              <Lightning size={24} />
              Acesse o desafio
            </a>
          </div>
        </div>

        <div className={classNames("gap-8 mt-20 grid", {
          "grid-cols-2": isDesktop,
          "grid-rows-2": !isDesktop,
        })}>
          <a href="" className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors">
            <div className="bg-green-700 h-full p-6 flex items-center">
              <FileArrowDown size={40} />
            </div>
            <div className={classNames("leading-relaxed", {
              "py-6": isDesktop,
              "py-7": !isDesktop,
            })}>
              <strong className="text-2xl">Material complementar</strong>
              <p className="text-sm text-gray-200 mt-2">
                Acesse o material complementar para acelerar o seu desenvolvimento
              </p>
            </div>
            <div className="ml-auto h-full p-6 flex items-center">
              <CaretRight size={24} />
            </div>
          </a>

          <a href="" className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors">
            <div className="bg-green-700 h-full p-6 flex items-center">
              <Image size={40} />
            </div>
            <div className={classNames("leading-relaxed", {
              "py-6": isDesktop,
              "py-7": !isDesktop,
            })}>
              <strong className="text-2xl">Wallpapers exclusivos</strong>
              <p className="text-sm text-gray-200 mt-2">
                Baixe wallpapers exclusivos do Ignite Lab e personalize a sua máquina
              </p>
            </div>
            <div className="ml-auto h-full p-6 flex items-center">
              <CaretRight size={24} />
            </div>
          </a>
        </div>

        <div className="mt-20 pt-6 flex w-full items-center justify-between border-t border-gray-500">
          <div className="flex items-center">
            <Rocketseat />
            <p className="ml-6 text-gray-300">Rocketseat - Todos os direitos reservados</p>
          </div>

          <p className="text-gray-300">Políticas de privacidade</p>
        </div>
      </div>
    </div>
  )
}
