const Spinner = ({ msgSpinner }) => {
  return (
    <div>
      <div
        className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      ></div>
      <span className="p-2 text-lg">{msgSpinner} </span>
    </div>
  );
};

export default Spinner;
