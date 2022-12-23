import classNames from "classnames";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { Rocketseat } from "../components/Rocketseat";
import { useCreateSubscriberMutation } from "../graphql/generated";
import { useScreenWidth } from "../utils/useWindowSize";

export function Subscribe() {
  const { isDesktop, isTablet, isMobile } = useScreenWidth()

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [createSubscriber, { loading }] = useCreateSubscriberMutation()

  async function handleSubscribe(event: FormEvent) {
    event.preventDefault();

    await createSubscriber({
      variables: {
        name,
        email
      }
    })

    navigate('/event')
  }

  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
      <div className={classNames("w-full max-w-[1100px] mx-auto", {
        "flex items-center justify-between mt-20": isDesktop,
        "flex flex-col items-center mt-10": !isDesktop
      })}>
        <div className={classNames("max-w-[640px]", {
          "px-6 flex flex-col items-center": !isDesktop
        })}>
          <Logo />

          <h1 className={classNames("leading-tight", {
            "mt-8 text-[2.5rem]": isDesktop,
            "text-[1.875rem] text-center": !isDesktop,
            "mt-6": isTablet,
            "mt-7": isMobile
          })}>
            Construa uma <strong className="text-blue-500">aplicação completa</strong>, do zero, com <strong className="text-blue-500">React JS</strong>
          </h1>
          <p className={classNames("mt-6 text-gray-200 leading-relaxed", {
            "text-base": isDesktop,
            "text-sm text-center": !isDesktop,
          })}>
            Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado.
          </p>
        </div>

        <div className={classNames("py-8 bg-gray-700 border border-gray-500 rounded", {
          "px-8": isDesktop,
          "px-6 flex flex-col w-full": !isDesktop,
          "mt-12 max-w-[640px]": isTablet,
          "mt-9": isMobile
        })}>
          <strong className={classNames("block", {
            "text-2xl mb-6": isDesktop,
            "text-lg mb-7": !isDesktop,
          })}>Inscreva-se gratuitamente</strong>

          <form onSubmit={handleSubscribe} className="flex flex-col gap-2 w-full">
            <input
              required
              type="text"
              placeholder="Seu nome completo"
              className="bg-gray-900 rounded px-5 h-14 border-2 border-transparent hover:border-green-300 focus:border-green-300 focus:outline-none transition-colors"
              onChange={event => setName(event.target.value)}
            />
            <input
              required
              type="email"
              placeholder="Digite seu e-mail"
              className="bg-gray-900 rounded px-5 h-14 border-2 border-transparent hover:border-green-300 focus:border-green-300 focus:outline-none transition-colors"
              onChange={event => setEmail(event.target.value)}
            />

            <button
              className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition disabled:opacity-50"
              disabled={loading}
              type="submit"
            >
              Garantir minha vaga
            </button>
          </form>
        </div>
      </div>

      <div className="px-[6px]">
        <img src="/src/assets/code-mockup.png" className="mt-10" alt="" />
      </div>

      <div className="flex w-full justify-center px-6 pb-[26px] bg-gray-900">
        <div className={classNames("pt-6 flex w-full max-w-[1392px] items-center border-t border-gray-500", {
          "justify-between": isDesktop,
          "flex-col": !isDesktop
        })}>
          <div className={classNames("flex items-center", {
            "flex-col": !isDesktop
          })}>
            <Rocketseat />
            <p className={classNames("text-gray-300", {
              "ml-6 text-base": isDesktop,
              "mt-4 text-sm": !isDesktop,
            })}>Rocketseat - Todos os direitos reservados</p>
          </div>

          <p className={classNames("text-gray-300", {
            "text-base": isDesktop,
            "text-sm mt-6": !isDesktop,
          })}>Políticas de privacidade</p>
        </div>
      </div>
    </div>
  )
}