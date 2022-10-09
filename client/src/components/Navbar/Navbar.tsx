import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

export interface NavbarInterface {
  title?: string;
}

const Navbar : React.FC<NavbarInterface> = (props:NavbarInterface) => {
	const [navbarOpen, setNavbarOpen] = React.useState(false);
	return (
		<>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-blue-500 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <p className="text-lg font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white">
              {props.title}
            </p>
            <button
              type="button"
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            id="example-navbar-danger"
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <a
                  href="https://www.linkedin.com/in/fernando-borrego-v/"
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                  <span className="ml-2">LinkenIn</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
	);
};

export default Navbar;
