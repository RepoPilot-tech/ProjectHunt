"use client"
import { cn } from "@/lib/utils";
import { useRef } from "react";

export const GlareCard = ({name, num}) => {
//   const isPointerInside = useRef(false);
//   const refElement = useRef<HTMLDivElement>(null);
//   const state = useRef({
//     glare: {
//       x: 50,
//       y: 50,
//     },
//     background: {
//       x: 50,
//       y: 50,
//     },
//     rotate: {
//       x: 0,
//       y: 0,
//     },
//   });
//   const containerStyle = {
//     "--m-x": "50%",
//     "--m-y": "50%",
//     "--r-x": "0deg",
//     "--r-y": "0deg",
//     "--bg-x": "50%",
//     "--bg-y": "50%",
//     "--duration": "300ms",
//     "--foil-size": "65%",
//     "--opacity": "0",
//     "--radius": "22px",
//     "--easing": "ease",
//     "--transition": "var(--duration) var(--easing)",
//   } as any;

//   const backgroundStyle = {
//     "--step": "5%",
//     "--foil-svg": `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.99994 3.419C2.99994 3.419 21.6142 7.43646 22.7921 12.153C23.97 16.8695 3.41838 23.0306 3.41838 23.0306' stroke='white' stroke-width='5' stroke-miterlimit='3.86874' stroke-linecap='round' style='mix-blend-mode:darken'/%3E%3C/svg%3E")`,
//     "--pattern": "var(--foil-svg) center/100% no-repeat",
//     "--rainbow":
//       "repeating-linear-gradient( 0deg,rgb(255,119,115) calc(var(--step) * 1),rgba(255,237,95,1) calc(var(--step) * 2),rgba(168,255,95,1) calc(var(--step) * 3),rgba(131,255,247,1) calc(var(--step) * 4),rgba(120,148,255,1) calc(var(--step) * 5),rgb(216,117,255) calc(var(--step) * 6),rgb(255,119,115) calc(var(--step) * 7) ) 0% var(--bg-y)/200% 700% no-repeat",
//     "--diagonal":
//       "repeating-linear-gradient( 128deg,#0e152e 0%,hsl(180,10%,60%) 3.8%,hsl(180,10%,60%) 4.5%,hsl(180,10%,60%) 5.2%,#0e152e 10%,#0e152e 12% ) var(--bg-x) var(--bg-y)/300% no-repeat",
//     "--shade":
//       "radial-gradient( farthest-corner circle at var(--m-x) var(--m-y),rgba(255,255,255,0.1) 12%,rgba(255,255,255,0.15) 20%,rgba(255,255,255,0.25) 120% ) var(--bg-x) var(--bg-y)/300% no-repeat",
//     backgroundBlendMode: "hue, hue, hue, overlay",
//   };

//   const updateStyles = () => {
//     if (refElement.current) {
//       console.log(state.current);
//       const { background, rotate, glare } = state.current;
//       refElement.current?.style.setProperty("--m-x", `${glare.x}%`);
//       refElement.current?.style.setProperty("--m-y", `${glare.y}%`);
//       refElement.current?.style.setProperty("--r-x", `${rotate.x}deg`);
//       refElement.current?.style.setProperty("--r-y", `${rotate.y}deg`);
//       refElement.current?.style.setProperty("--bg-x", `${background.x}%`);
//       refElement.current?.style.setProperty("--bg-y", `${background.y}%`);
//     }
//   };
  return (
    // <div
    //   style={containerStyle}
    //   className="relative isolate [contain:layout_style] [perspective:600px] transition-transform duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] will-change-transform w-[225px] h-[100px]"
    //   ref={refElement}
    //   onPointerMove={(event) => {
    //     const rotateFactor = 0.4;
    //     const rect = event.currentTarget.getBoundingClientRect();
    //     const position = {
    //       x: event.clientX - rect.left,
    //       y: event.clientY - rect.top,
    //     };
    //     const percentage = {
    //       x: (100 / rect.width) * position.x,
    //       y: (50 / rect.height) * position.y,
    //     };
    //     const delta = {
    //       x: percentage.x - 50,
    //       y: percentage.y - 50,
    //     };

    //     const { background, rotate, glare } = state.current;
    //     background.x = 50 + percentage.x / 4 - 12.5;
    //     background.y = 50 + percentage.y / 3 - 16.67;
    //     rotate.x = -(delta.x / 3.5);
    //     rotate.y = delta.y / 2;
    //     rotate.x *= rotateFactor;
    //     rotate.y *= rotateFactor;
    //     glare.x = percentage.x;
    //     glare.y = percentage.y;

    //     updateStyles();
    //   }}
    //   onPointerEnter={() => {
    //     isPointerInside.current = true;
    //     if (refElement.current) {
    //       setTimeout(() => {
    //         if (isPointerInside.current) {
    //           refElement.current?.style.setProperty("--duration", "0s");
    //         }
    //       }, 300);
    //     }
    //   }}
    //   onPointerLeave={() => {
    //     isPointerInside.current = false;
    //     if (refElement.current) {
    //       refElement.current.style.removeProperty("--duration");
    //       refElement.current?.style.setProperty("--r-x", `0deg`);
    //       refElement.current?.style.setProperty("--r-y", `0deg`);
    //     }
    //   }}
    // >
    //   <div className="h-full grid will-change-transform origin-center transition-transform duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] [transform:rotateY(var(--r-x))_rotateX(var(--r-y))] rounded-[var(--radius)] hover:[--opacity:0.6] hover:[--duration:200ms] hover:[--easing:linear] hover:filter-none overflow-hidden">
    //     <div className="w-full h-full grid [grid-area:1/1] mix-blend-soft-light [clip-path:inset(0_0_0_0_round_var(--radius))]">
    //       <div className={cn("h-full w-full dark:bg-[hsla(0,0%,25%,1)] bg-[]", className)}>
    //         {children}
    //       </div>
    //     </div>
    //     <div className="w-full h-full grid [grid-area:1/1] mix-blend-soft-light [clip-path:inset(0_0_1px_0_round_var(--radius))] opacity-[var(--opacity)] transition-opacity transition-background duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] will-change-background [background:radial-gradient(farthest-corner_circle_at_var(--m-x)_var(--m-y),_rgba(255,255,255,0.8)_10%,_rgba(255,255,255,0.65)_20%,_rgba(255,255,255,0)_90%)]" />
    //     <div
    //       className="w-full h-full grid [grid-area:1/1] mix-blend-color-dodge opacity-[var(--opacity)] will-change-background transition-opacity [clip-path:inset(0_0_1px_0_round_var(--radius))] [background-blend-mode:hue_hue_hue_overlay] [background:var(--pattern),_var(--rainbow),_var(--diagonal),_var(--shade)] relative after:content-[''] after:grid-area-[inherit] after:bg-repeat-[inherit] after:bg-attachment-[inherit] after:bg-origin-[inherit] after:bg-clip-[inherit] after:bg-[inherit] after:mix-blend-exclusion after:[background-size:var(--foil-size),_200%_400%,_800%,_200%] after:[background-position:center,_0%_var(--bg-y),_calc(var(--bg-x)*_-1)_calc(var(--bg-y)*_-1),_var(--bg-x)_var(--bg-y)] after:[background-blend-mode:soft-light,_hue,_hard-light]"
    //       style={{ ...backgroundStyle }}
    //     />
    //   </div>
    // </div>
    <div className="relative w-80 bg-white text-black rounded-[2.5em] p-8 transition-transform duration-400 ease-in-out hover:cursor-pointer hover:scale-[0.97] active:scale-[0.9]">
      <div className="flex flex-col justify-between gap-20 h-full transition-transform duration-400 ease-in-out hover:scale-[0.96]">
        <div className="flex justify-between">
          <span className="font-bold">{num}.</span>
          <p className="font-semibold">{name}</p>
        </div>
        <div className="flex justify-between items-end">
          <p className="font-semibold">Space</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height={32}
            viewBox="0 -960 960 960"
            width={32}
            className="transition-transform duration-400 ease-in-out hover:scale-105"
          >
            <path d="M226-160q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19ZM226-414q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19ZM226-668q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Z" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
      
        
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height={48}
          viewBox="0 -960 960 960"
          width={48}
          className="w-16 h-16 transition-transform duration-400 ease-in-out hover:scale-105"
        >
          <path d="m393-165 279-335H492l36-286-253 366h154l-36 255Zm-73 85 40-280H160l360-520h80l-40 320h240L400-80h-80Zm153-395Z" />
        </svg>
      </div>
    </div>
  );
};
