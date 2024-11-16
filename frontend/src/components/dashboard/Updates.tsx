import imgOne from "@/../public/updates-1.png";
import imgTwo from "@/../public/updates-2.png";

const updateList = [
  {
    title: "New project released!",
    description: "A new project on lorum ipsum has been released!",
    date: 1731748942,
    img: imgOne,
  },
  {
    title: "Welcome to PeerFlux!",
    description: "Welcome to the platform! Let's grow together!",
    date: 1731716588,
    img: imgTwo,
  },
];

const Updates = () => {
  return (
    <div className="relative w-full h-full flex flex-col">
      <h2>Updates</h2>
      <div className="w-full flex flex-col py-2 gap-y-2">
        {updateList.map((list: any, index: number) => {
          return (
            <div
              className="w-full flex gap-x-2 rounded-2xl border border-tertiary overflow-hidden"
              key={index}
            >
              <div className="relative w-16 h-full">
                <img
                  src={list.img}
                  alt="imgg"
                  className="min-h-full object-cover "
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-l from-foreground to-transparent to-15%" />
              </div>
              <div className="flex flex-col gap-y-2 py-4">
                <h3>{list.title}</h3>
                <p className="text-xs line-clamp-3">{list.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Updates;
