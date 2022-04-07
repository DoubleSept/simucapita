import { MDBFooter } from "mdb-react-ui-kit";

function Footer() {
    return (
        <MDBFooter className='footer text-center  fixed-bottom'>
            <div className='text-center p-1'>
                Réalisé sur Twitch par <em><a className='text-reset fw-bold' href='https://twitch.tv/ledoublesept'>
                    LeDoubleSept
                </a></em>
            </div>
        </MDBFooter>
    );
}

export default Footer;