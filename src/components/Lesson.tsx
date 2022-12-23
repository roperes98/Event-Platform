import { format, isPast } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { CheckCircle, Lock } from 'phosphor-react'
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useScreenWidth } from '../utils/useWindowSize';

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: 'live' | 'class';
}

export function Lesson({ title, type, slug, availableAt }: LessonProps) {
  const { isDesktop, isTablet, isMobile } = useScreenWidth()
  const { slug: currentLesson } = useParams<{ slug: string }>()

  const isLessonAvailable = isPast(availableAt);
  const availableDateFormatted = format(availableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'mm", {
    locale: ptBR
  })

  const isActiveLesson = currentLesson === slug;

  return (
    <Link to={`/event/lesson/${slug}`} className='group'>
      <span className="text-base text-gray-300">
        {availableDateFormatted}
      </span>

      <div className={classNames('rounded border border-gray-500 px-4 group-hover:border-green-500', {
        'bg-green-500': isActiveLesson,
        'py-4 mt-2': isDesktop,
        'py-[26px] mt-4': isTablet,
        'py-5 mt-3': isMobile,
      })}>
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span className={classNames("text-sm font-medium flex items-center gap-2", {
              'text-white': isActiveLesson,
              'text-blue-500': !isActiveLesson
            })}>
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} />
              Em breve
            </span>
          )}

          <span className={classNames("text-xs rounded py-[0.125rem] px-2 text-white border", {
            'border-white': isActiveLesson,
            'border-green-300 font-bold': !isActiveLesson
          })}>
            {type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
          </span>
        </header>

        <strong className={classNames("mt-5 text-base block", {
          'text-white': isActiveLesson,
          'text-gray-200': !isActiveLesson
        })}>
          {title}
        </strong>
      </div>
    </Link>
  )
}
