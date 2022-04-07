import { MDBBtn, MDBCol, MDBRow, MDBContainer, MDBInput, MDBBadge, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';

function CardPeople(props) {
    return <MDBCol md="6">
        <MDBCard md="4">

            <MDBCardBody>
                <MDBCardTitle>{props.title}</MDBCardTitle>

                <ol className='card-text'>
                    {props.people.map((element) => {
                        return (
                            <li key={element.numero}>
                                <b>{String(element.numero).padStart(4, '0')}</b> possède <b>{element.argent}€</b>
                            </li>
                        );
                    })}
                </ol>

            </MDBCardBody>
        </MDBCard>
    </MDBCol>;
}

export default CardPeople;