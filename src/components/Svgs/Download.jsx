import P from 'prop-types';

const Download = ({ texto }) => {
  return (
    <div>
      <svg
        className="fill-current w-5 h-7 mx-2 inline-flex"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
      </svg>
      <span>{texto}</span>
    </div>
  );
};

export default Download;

Download.propTypes = {
  texto: P.node.isRequired,
};
