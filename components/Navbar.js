import Link from "next/link";

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <a className="logo" href="/"></a>
            <nav>
              <ul>
                <li>
                  <Link href="/">
                    <a>Work</a>
                  </Link>
                </li>
                <li>
                    <a target="_blank" rel="noreferrer" href="https://hng.tech/internship">HNG INTERNSHIP</a>
                </li>
                <li>
                    <a target="_blank" rel="noreferrer" href="https://hng.tech/hire">HNG HIRE</a>
                </li>
              </ul>
            </nav>
            <span className="nav-toggle">Menu</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
