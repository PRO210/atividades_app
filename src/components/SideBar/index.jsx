const SiderBar = ({ children }) => {
  return (
    <div>
      <div className="min-h-screen md:flex ">{children}</div>
    </div>
  );
};

export default SiderBar;
