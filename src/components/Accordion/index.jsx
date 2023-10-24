// import { useState } from 'react';

const Accordion = ({ expanded, children, bg }) => {
  // const [expanded, setExpanded] = useState(false);
  // const toggleExpanded = () => setExpanded((current) => !current);

  return (
    <div
      className={` ${bg} overflow-hidden transition-all[max-height] duration-1000 ease-linear ${
        expanded ? 'max-h-screen opacity-100' : 'opacity-10 max-h-0'
      }`}
    >
      <section className={`max-w-full m-3 py-1 bg-white `}>{children}</section>
    </div>
  );
};

export default Accordion;
