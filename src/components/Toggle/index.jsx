// const [showModal, setShowModal] = useState(false);
const htmlFor = 'toggle';
const htmlId = 'toggle';

const Toggle = () => {
  return (
    <div className="md:w-2/6 mr-1" tabIndex={0}>
      <div className="flex items-center justify-items-start sm:justify-end w-full">
        <label htmlFor={htmlFor} className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              id={htmlId}
              className="sr-only"
              onChange={() => setToogleShow((prev) => !prev)}
            />

            <div
              className={`block bg-gray-300 w-14 h-8 rounded-full p-1 font-bold ${
                toogleShow == true ? 'text-left' : 'text-right'
              }`}
            >
              {toogleShow == true ? 'On' : 'Off'}
            </div>

            <div
              className={`absolute left-1 top-1 w-6 h-6 rounded-full transition
          ${
            toogleShow == true ? 'bg-green-300 translate-x-full' : 'bg-red-600 '
          }
          `}
            ></div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default Toggle;
