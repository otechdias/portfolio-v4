import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";

import AnimatedTitle from "./AnimatedTitle";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, isComingSoon, link }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font text-black">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base text-black">{description}</p>
          )}
        </div>

        {isComingSoon && link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white"
          >
            {/* Radial gradient hover effect */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">Visitar Site</p>
          </a>
        )}
      </div>
    </div>
  );
};

const Project = () => (
  <section className="bg-black pb-52" id="project">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
        <AnimatedTitle
          title="Pro<b>je</b>tos"
          containerClass="mt-5 text-center"
        />
        <p className="font-circular-web text-lg text-blue-50 opacity-50 mt-9 flex-center text-center">
          Cada projeto aqui é mais do que código: é prova da minha dedicacão, criatividade e visão. <br />
          Explore e descubra como transformo ideias em experiências digitais.
        </p>
      </div>

      <BentoTilt className="border-hsla relative mb-7 h-[500px] w-full overflow-hidden rounded-md md:h-[70vh]">
        <BentoCard
          src="videos/projects/New-crm.mp4"
          title={<span className="text-white">C<b>R</b>M</span>}
          description={<span className="text-white">CRM da TechDias</span>}
          isComingSoon
          link="https://crm-59cf.vercel.app/"
        />
      </BentoTilt>
      <BentoTilt className="border-hsla relative mb-7 h-[500px] w-full overflow-hidden rounded-md md:h-[70vh]">
        <BentoCard
          src="videos/projects/Yesu.mp4"
          title={<span className="text-white">Ye<b>s</b>u</span>}
          description={<span className="text-white">Website da YESU</span>}
          isComingSoon
          link="https://yesu-three.vercel.app"
        />
      </BentoTilt>
      <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
        <BentoTilt className="border-hsla relative mb-7 h-[500px] w-full overflow-hidden rounded-md md:h-[70vh]">
          <BentoCard
            src="videos/projects/Pet.mp4"
            title={<span className="text-black">Pe<b>t</b>Shop</span>}
            description={<span className="text-black">Website de agendamento de serviços de PetShop.</span>}
            isComingSoon
            link="https://landing-pet-vida.vercel.app/"
          />
        </BentoTilt>

        <BentoTilt className="border-hsla relative mb-7 h-[500px] w-full overflow-hidden rounded-md md:h-[70vh]">
          <BentoCard
            src="videos/projects/TechDias.mp4"
            title={<span className="text-black">Te<b>c</b>h<b>D</b>ias</span>}
            description={<span className="text-black">WebSite de apresentação da TechDias</span>}
            isComingSoon
            link="https://otechdias.vercel.app/"
          />
        </BentoTilt>
      </div>

      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
            src="videos/projects/Weather.mp4"
            title={<span className="text-white">Cli<b>m</b>a</span>}
            description={<span className="text-white">App que mostra clima em tempo real de qualquer cidade com temperatura, condicoes e imagem ilustrativa.</span>}

            isComingSoon
            link="https://clima-ht49.onrender.com"
          />
        </BentoTilt>


        <BentoTilt className="bento-tilt_1 row-span-2 md:col-span-1 md:row-span-2">
          <BentoCard
            src="videos/projects/Costs.mp4"
            title={<span className="text-red-500">Cos<b>t</b>s</span>}
            description={<span className="text-red-500">App em React para cadastrar projetos, adicionar servicos e controlar custos.</span>}
            isComingSoon
            link="https://costs01.vercel.app/"
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-4 md:col-span-1 md:ms-0">
          <BentoCard
            src="videos/projects/Cardapio.mp4"
            title={<>Me<b>n</b>u</>}
            description="Cardapio Digital é um app para menus online."
            isComingSoon
            link="https://ogabrieldias.github.io/cardapio/html/index.html"
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
            src="videos/projects/Agenda.mp4"
            title={<span className="text-white">Ag<b>e</b>n<b>d</b>a</span>}
            description={<span className="text-white">Projeto de agenda moderna com tela de login.</span>}
            isComingSoon
            link="https://agenda-26.vercel.app"
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_2 ">
          <BentoCard
            src="videos/projects/Crud.mp4"
            title={<span className="text-white">Cr<b>u</b>d</span>}
            description={<span className="text-white">Projeto de operação CRUD.</span>}
            isComingSoon
            link="https://crud-frontend-2026.vercel.app"
          />
        </BentoTilt>

        {/* <BentoTilt className="bento-tilt_2 ">
          <div className="flex size-full flex-col justify-between bg-violet-300 p-5 ">
            <h1 className="bento-title special-font max-w-64 text-black mt-[45px]">
              Pro<b>j</b>eto em anda<b>m</b>ento ag<b>u</b>arde!
            </h1>
            <TiLocationArrow className="m-5 scale-[5] self-end" />
          </div>
        </BentoTilt> */}
      </div>
    </div>
  </section>
);

export default Project;
