import { MDBNavbarItem } from "mdb-react-ui-kit";

function Header() {
    return (
        <nav class="navbar fixed">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">SimuCapita</a>
                <MDBNavbarItem>Simulateur d'échanges économiques sans contraintes</MDBNavbarItem>
            </div>
        </nav>
    );
}

export default Header;