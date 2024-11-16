const LogTime = () => {
  return (
    <div className="relative w-full h-full flex flex-col">
      {/* // TODO: remove later */}
      <button
        className="absolute top-2 left-2 w-5 h-5 rounded-full bg-red-400"
        onClick={handleClick}
      />
      <h2>Projects</h2>
      {currentProject ? (
        <CurrentProject currentProject={currentProject} />
      ) : (
        <NoProject />
      )}
    </div>
  );
};

export default LogTime;
