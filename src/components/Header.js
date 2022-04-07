import { MDBNavbarItem } from "mdb-react-ui-kit";

function Header() {
    return (
        <nav className="navbar fixed">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">SimuCapita</a>
                <MDBNavbarItem>Simulateur d'échanges économiques sans contraintes</MDBNavbarItem>
            </div>
        </nav>
    );
}

export default Header;