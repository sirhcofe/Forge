import { ReactNode } from "react";
import cornerCard from "@/../public/corner-card.png";

const Card = ({
  className,
  corner = false,
  layout,
}: {
  className: string;
  corner?: boolean;
  layout: ReactNode;
}) => {
  return (
    <>
      {corner ? (
        <div className={`${className} relative`}>
          <img
            src={cornerCard}
            alt="corner-card"
            className="w-full h-full object-fill"
          />
          <div className="absolute top-0 left-0 w-full h-full z-10 p-4">
            {layout}
          </div>
        </div>
      ) : (
        <div
          className={`${className} rounded-2xl bg-foreground border-[3px] border-accent p-4`}
        >
          {layout}
        </div>
      )}
    </>
  );
};

export default Card;
