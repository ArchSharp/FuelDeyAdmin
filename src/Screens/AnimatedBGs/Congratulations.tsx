import { useCallback, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
// import { loadAll } from "@/tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
// import { Engine } from "@tsparticles/engine";
// import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

export const Congratulations = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      await loadFull(engine);
      //   await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = useCallback(async (container: any) => {
    console.log(container);
  }, []);

  return (
    <>
      {init && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={{
            fullScreen: {
              zIndex: 1,
            },
            emitters: [
              {
                position: {
                  x: 0,
                  y: 30,
                },
                rate: {
                  quantity: 5,
                  delay: 0.15,
                },
                particles: {
                  move: {
                    direction: "top-right",
                    outModes: {
                      top: "none",
                      left: "none",
                      default: "destroy",
                    },
                  },
                },
              },
              {
                position: {
                  x: 100,
                  y: 30,
                },
                rate: {
                  quantity: 5,
                  delay: 0.15,
                },
                particles: {
                  move: {
                    direction: "top-left",
                    outModes: {
                      top: "none",
                      right: "none",
                      default: "destroy",
                    },
                  },
                },
              },
            ],
            particles: {
              color: {
                value: ["#ffffff", "#FF0000"],
              },
              move: {
                decay: 0.05,
                direction: "top",
                enable: true,
                gravity: {
                  enable: true,
                },
                outModes: {
                  top: "none",
                  default: "destroy",
                },
                speed: {
                  min: 10,
                  max: 50,
                },
              },
              number: {
                value: 0,
              },
              opacity: {
                value: 1,
              },
              rotate: {
                value: {
                  min: 0,
                  max: 360,
                },
                direction: "random",
                animation: {
                  enable: true,
                  speed: 30,
                },
              },
              tilt: {
                direction: "random",
                enable: true,
                value: {
                  min: 0,
                  max: 360,
                },
                animation: {
                  enable: true,
                  speed: 30,
                },
              },
              size: {
                value: {
                  min: 0,
                  max: 7,
                },
                animation: {
                  enable: true,
                  startValue: "min",
                  count: 1,
                  speed: 16,
                  sync: true,
                },
              },
              roll: {
                darken: {
                  enable: true,
                  value: 25,
                },
                enable: true,
                speed: {
                  min: 5,
                  max: 15,
                },
              },
              wobble: {
                distance: 30,
                enable: true,
                speed: {
                  min: -7,
                  max: 7,
                },
              },
              shape: {
                type: ["square", "triangle", "polygon"],
                options: {
                  polygon: [
                    {
                      sides: 5,
                    },
                    {
                      sides: 6,
                    },
                  ],
                },
              },
            },
          }}
        />
      )}
    </>
  );
};
