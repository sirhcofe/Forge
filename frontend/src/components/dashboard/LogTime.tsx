const data = [
  { date: "2024-11-01", count: 7 },
  { date: "2024-11-02", count: 8 },
  { date: "2024-11-03", count: 1 },
  { date: "2024-11-04", count: 10 },
  { date: "2024-11-05", count: 9 },
  { date: "2024-11-06", count: 6 },
  { date: "2024-11-07", count: 8 },
  { date: "2024-11-08", count: 6 },
  { date: "2024-11-09", count: 3 },
  { date: "2024-11-10", count: 10 },
  { date: "2024-11-11", count: 7 },
  { date: "2024-11-12", count: 0 },
  { date: "2024-11-13", count: 5 },
  { date: "2024-11-14", count: 4 },
  { date: "2024-11-15", count: 3 },
  { date: "2024-11-16", count: 0 },
  { date: "2024-11-17", count: 2 },
  { date: "2024-11-18", count: 3 },
  { date: "2024-11-19", count: 1 },
  { date: "2024-11-20", count: 1 },
  { date: "2024-11-21", count: 3 },
  { date: "2024-11-22", count: 1 },
  { date: "2024-11-23", count: 4 },
  { date: "2024-11-24", count: 9 },
  { date: "2024-11-25", count: 9 },
  { date: "2024-11-26", count: 10 },
  { date: "2024-11-27", count: 1 },
  { date: "2024-11-28", count: 2 },
  { date: "2024-11-29", count: 3 },
  { date: "2024-11-30", count: 2 },
];

const LogTime = () => {
  return (
    <div className="relative w-full h-full flex flex-col z-20">
      <h2>Log</h2>
      <p className="mt-5">November</p>
      <div className="w-full flex flex-col items-center">
        <div className="w-[60%] flex justify-around mt-5">
          <p className="text-xs pb-1">Mon</p>
          <p className="text-xs pb-1">Tue</p>
          <p className="text-xs pb-1">Wed</p>
          <p className="text-xs pb-1">Thu</p>
          <p className="text-xs pb-1">Fri</p>
          <p className="text-xs pb-1">Sat</p>
          <p className="text-xs pb-1">Sun</p>
        </div>
        <div className="w-[60%] grid grid-cols-7 grid-rows-5 aspect-[8/6]">
          {data.map((date: any, index: number) => {
            return (
              <div
                key={index}
                className="w-full aspect-square row-span-1 col-span-1 border-2"
                style={
                  index === 0
                    ? {
                      gridColumnStart: 6,
                      backgroundColor: `rgba(33,158,139,${date.count / 10})`,
                    }
                    : {
                      backgroundColor: `rgba(33,158,139,${date.count / 10})`,
                    }
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LogTime;
