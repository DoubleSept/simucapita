import { MDBFooter } from "mdb-react-ui-kit";

function Footer() {
    return (
        <MDBFooter className='footer text-center  fixed-bottom'>
            <div className='text-center p-1'>
                Réalisé sur Twitch par <a className='text-reset fw-bold' href='https://twitch.tv/ledoublesept'>
                    LeDoubleSept
                </a> (Code sur <em><a className='text-reset fw-bold' href='https://github.com/DoubleSept/simucapita'>
                    GitHub
                </a></em> )
            </div>
        </MDBFooter>
    );
}

export default Footer;