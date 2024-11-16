import { useState } from "react";
import Button from "../Button";

const NoEval = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-col flex-1 items-center justify-center">
        <p className="px-3 text-sm">No scheduled evaluations!</p>
      </div>
      <Button className="mt-auto">Eval a project</Button>
    </div>
  );
};

const CurrentEval = ({ currentEval }: { currentEval: any }) => {
  console.log(currentEval);
  return (
    <div className="w-full h-full flex flex-col">
      {currentEval.map((evall: any, index: number) => {
        return (
          <>
            {evall.evalOthers ? (
              <div
                className={`flex bg-gradient-to-r from-primary-light to-transparent to-10% py-1 ${
                  index && `border-t border-black/50`
                }`}
                key={index}
              >
                <p className="w-full px-3 text-xs">
                  You will evaluate someone's {evall.project}!
                </p>
              </div>
            ) : (
              <div
                className={`flex bg-gradient-to-l from-accent to-transparent to-10% py-1 ${
                  index && `border-t border-black/50`
                }`}
                key={index}
              >
                <p className="w-full px-3 text-xs">
                  You will be evaluated on {evall.project}!
                </p>
              </div>
            )}
          </>
        );
      })}

      <Button className="mt-auto">Submit project</Button>
    </div>
  );
};

const Evaluations = () => {
  const [currentEval, setCurrentEval] = useState<any | undefined>(undefined);

  // TODO: remove later
  const handleClick = () => {
    if (currentEval) setCurrentEval(undefined);
    else
      setCurrentEval([
        {
          project: "NFT Art Gallery",
          evalOthers: false,
        },
        {
          project: "DeFi Dashboard",
          evalOthers: true,
        },
      ]);
  };

  return (
    <div className="relative w-full h-full flex flex-col">
      <button
        className="absolute top-2 left-2 w-5 h-5 rounded-full bg-red-400"
        onClick={handleClick}
      />
      <h2>Projects</h2>
      {currentEval ? <CurrentEval currentEval={currentEval} /> : <NoEval />}
    </div>
  );
};

export default Evaluations;
