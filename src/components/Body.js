import { MDBBtn, MDBCol, MDBRow, MDBContainer, MDBInput, MDBBadge, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';
import { useState, useEffect } from 'react';
import './Body.scss'

function Body() {
    const nbParticipants = 100
    const nbParParticipant = 500
    var statutInitial = Array(nbParticipants).fill(nbParParticipant).map((element, index) => { return { numero: index, argent: element } })

    var [statutActuel, setStatut] = useState(statutInitial)
    var [dernierEchange, setDernierEchange] = useState([0, 0])
    var [champNbFois, setChampNbFois] = useState(10000)

    var [etapeActuelle, setEtapeActuelle] = useState(1)

    const changerStatut = (nouveauStatut) => {
        nouveauStatut.sort((a, b) => a.argent - b.argent)
        setStatut(nouveauStatut)
    }

    const unCoup = (statutEntree) => {
        var receveur = Math.floor(Math.random() * nbParticipants);
        var donneur = Math.floor(Math.random() * nbParticipants);

        if (statutEntree[donneur].argent > 0) {
            statutEntree[donneur] = { ...statutEntree[donneur], argent: statutEntree[donneur].argent - 1 }
            statutEntree[receveur] = { ...statutEntree[receveur], argent: statutEntree[receveur].argent + 1 }
        }

        return [statutEntree, donneur, receveur];
    }

    const jouerUneFoisSimple = () => {

        var statutTemporaire = Array.from(statutActuel);
        var [nouveauStatut, donneur, receveur] = unCoup(statutTemporaire);

        changerStatut(nouveauStatut);
        setDernierEchange([donneur, receveur]);
        setEtapeActuelle(+(etapeActuelle) + 1);
    }

    const jouerUneFois = (evenement) => {

        jouerUneFoisSimple();

        evenement.stopPropagation();
        evenement.preventDefault();
    }

    const jouerNFois = (evenement, nbFois) => {

        var statutTemporaire = Array.from(statutActuel);
        for (let i = 0; i < nbFois; i++) {
            statutTemporaire = unCoup(statutTemporaire)[0];
        }
        changerStatut(statutTemporaire);
        setEtapeActuelle(+(etapeActuelle) + nbFois);

        evenement.stopPropagation();
        evenement.preventDefault();
    }

    const jouerMilleFois = (evenement) => {
        jouerNFois(evenement, 1000);
    }

    return (
        <MDBContainer className='g-2'>
            <MDBRow className='g-2'>
                <MDBCol md="6" className='gauche p-3'>
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol md="6">
                                <MDBCard md="4">
                                    <MDBCardBody>
                                        <MDBCardTitle>LES RICHES</MDBCardTitle>
                                        <MDBCardText>
                                            <ol>
                                                {statutActuel.map((element) => {
                                                    return (
                                                        <li key={element.numero}>
                                                            <b>{String(element.numero).padStart(4, '0')}</b> possède <b>{element.argent}$</b>
                                                        </li>
                                                    );
                                                })
                                                }
                                            </ol>
                                        </MDBCardText>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                            <MDBCol md="6">
                                <MDBCard md="4">

                                    <MDBCardBody>
                                        <MDBCardTitle>LES PAUVRES</MDBCardTitle>
                                        <MDBCardText>
                                            <ol>
                                                {statutActuel.reverse().map((element) => {
                                                    return (
                                                        <li key={element.numero}>
                                                            <b>{String(element.numero).padStart(4, '0')}</b> possède <b>{element.argent}$</b>
                                                        </li>
                                                    );
                                                })
                                                }
                                            </ol>
                                        </MDBCardText>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </MDBCol>
                <MDBCol md="6" className='droite p-3'>
                    <MDBContainer>
                        <MDBRow className='g-2'>
                            <MDBCol md="12" center style={{ textAlign: 'center' }}>
                                <h2>
                                    Etape
                                    <MDBBadge className='ms-2'>{etapeActuelle}</MDBBadge>
                                </h2>
                            </MDBCol>
                            <MDBBtn md="12" color="success" onClick={jouerUneFois}>Jouer une fois</MDBBtn>
                            <MDBBtn md="12" color="warning" onClick={jouerMilleFois}>Jouer mille fois</MDBBtn>
                            <MDBCol md="6" >
                                <MDBInput
                                    id='fois' type='number'
                                    value={champNbFois}
                                    onChange={(e) => setChampNbFois(e.target.value)}
                                    style={{ backgroundColor: 'rgba(255,255,255,0.75)' }} />
                            </MDBCol>
                            <MDBCol md="6" >
                                <MDBBtn color="secondary" onClick={(e) => {
                                    jouerNFois(e, parseInt(champNbFois))
                                }} style={{ width: '100%' }}>Jouer</MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default Body;