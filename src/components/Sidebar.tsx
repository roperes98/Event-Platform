import classNames from "classnames";
import { useGetLessonsQuery } from "../graphql/generated";
import { useScreenWidth } from "../utils/useWindowSize";
import { Lesson } from "./Lesson";

export function Sidebar() {
  const { data } = useGetLessonsQuery()
  const { isDesktop } = useScreenWidth()

  return (
    <aside className={classNames("bg-gray-700 p-6 border-l border-gray-600", {
      "w-[348px]": isDesktop,
      "flex flex-col top-0 bottom-0 right-0 left-0 absolute z-50": !isDesktop
    })}>
      <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
        Cronograma de aulas
      </span>

      <div className="flex flex-col gap-8">
        {data?.lessons.map(lesson => {
          return (
            <Lesson
              key={lesson.id}
              title={lesson.title}
              type={lesson.lessonType}
              availableAt={new Date(lesson.availableAt)}
              slug={lesson.slug}
            />
          )
        })}
      </div>
    </aside>
  )
}
