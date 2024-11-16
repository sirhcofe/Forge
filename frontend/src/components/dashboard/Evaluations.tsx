import { useState } from "react";
import Button from "../Button";
import { LuTimer } from "react-icons/lu";

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
            {index ? <div className="w-full h-[1px] bg-black/50" /> : null}
            <div
              className={`flex flex-col my-1 py-1 gap-y-1 ${
                evall.evalOthers
                  ? "bg-gradient-to-r from-primary-light to-transparent to-10%"
                  : "bg-gradient-to-l from-accent to-transparent to-10%"
              }`}
            >
              {evall.evalOthers ? (
                <p className="w-full px-3 text-sm" key={index}>
                  You will evaluate someone's {evall.project}!
                </p>
              ) : (
                <p className="w-full px-3 text-sm" key={index}>
                  You will be evaluated on {evall.project}!
                </p>
              )}
              <div className="w-full flex items-center px-3 gap-x-1">
                <LuTimer />
                <p className="flex flex-1">3h</p>
                <Button
                  className="text-sm !py-1 !px-6 !mr-8"
                  onClick={() => null}
                  small
                >
                  Contact
                </Button>
              </div>
            </div>
          </>
        );
      })}
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
      <h2>Evaluations</h2>
      {currentEval ? <CurrentEval currentEval={currentEval} /> : <NoEval />}
    </div>
  );
};

export default Evaluations;
