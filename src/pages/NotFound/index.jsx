import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(10);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1000);
    handleHome();

    return () => clearTimeout(timer);
  }, [count]);

  const bolinhas = useRef([' . ',' . ', ' . ', ' . ', ' . ', ' . ',' . ', ' . ', ' . ', ' . ', ' . ']);

  const handleHome = () => {
    bolinhas.current.pop();
    count == 0 ? navigate('/') : null;
  };

  return (
    <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
      <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div className="relative">
          <div className="absolute">
            <div className="">
              <h1 className="my-2 text-gray-800 font-bold text-2xl">Parece que você encontrou a porta para o grande nada</h1>
              <p className="my-2 text-gray-800">
                Desculpe por isso! Por favor, visite nossa página inicial para chegar onde você precisa ir..
              </p>
              {/* <button className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
                Take me there!
              </button> */}
              <h2 className="text-center">
                Você será redirecionado para a HOME em
                <span className='text-2xl px-1'>{count}</span>
                <span className='text-4xl text-blue-600 px-1'>{bolinhas.current}</span>
              </h2>
            </div>
          </div>
          <div>
            <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
          </div>
        </div>
      </div>
      <div>
        <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
      </div>
    </div>
  );
};

export default NotFound;
