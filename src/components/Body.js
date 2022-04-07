import { MDBBtn, MDBCol, MDBRow, MDBContainer, MDBInput, MDBBadge, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';
import { useState } from 'react';
import './Body.scss'
import CardPeople from './CardPeople';

function Body() {
    const nbParticipants = 100
    const nbParParticipant = 500
    var statutInitial = Array(nbParticipants).fill(nbParParticipant).map((element, index) => { return { numero: index, argent: element } })

    var [statutActuel, setStatut] = useState(statutInitial)
    var [champNbFois, setChampNbFois] = useState(10000)

    var [etapeActuelle, setEtapeActuelle] = useState(1)

    const changerStatut = (nouveauStatut) => {
        nouveauStatut.sort((a, b) => b.argent - a.argent)
        setStatut(nouveauStatut)
    }

    const reducer = (accumulator, curr) => accumulator + curr;

    const getTotal = (tableau) => {
        return tableau.map(x => x.argent).reduce(reducer)
    }

    const unCoup = (statutEntree) => {
        const indexReceveur = Math.floor(Math.random() * nbParticipants);
        const indexDonneur = Math.floor(Math.random() * nbParticipants);

        const donneur = statutEntree[indexDonneur]
        const receveur = statutEntree[indexReceveur]

        if (indexDonneur !== indexReceveur && donneur.argent > 0) {
            statutEntree[indexDonneur] = { numero: donneur.numero, argent: donneur.argent - 1 }
            statutEntree[indexReceveur] = { numero: receveur.numero, argent: receveur.argent + 1 }
            //console.log("Echange " + getTotal(statutEntree) + "  : " + indexDonneur + " (" + donneur.argent + ") -> " + indexReceveur + " (" + receveur.argent + ")");
            //console.log("Echange " + getTotal(statutEntree) + "  : " + indexDonneur + " (" + statutEntree[indexDonneur].argent + ") -> " + indexReceveur + " (" + statutEntree[indexReceveur].argent + ")");
        }

        return statutEntree;
    }

    const jouerUneFoisSimple = () => {

        var statutTemporaire = Array.from(statutActuel);
        var nouveauStatut = unCoup(statutTemporaire);

        changerStatut(nouveauStatut);
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
            statutTemporaire = unCoup(statutTemporaire);
        }

        changerStatut(statutTemporaire);
        setEtapeActuelle(+(etapeActuelle) + nbFois);

        evenement.stopPropagation();
        evenement.preventDefault();
    }

    return (
        <MDBContainer className='g-2'>
            <MDBRow className='gx-2'>
                <MDBCol md="6" className='gauche p-3'>
                    <MDBContainer>
                        <MDBRow>
                            <CardPeople title="Les riches" people={statutActuel} />
                            <CardPeople title="Les pauvres" people={Array.from(statutActuel).reverse()} />
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
                            <MDBBtn md="12" color="warning" onClick={(e) => {
                                jouerNFois(e, 1000)
                            }}>Jouer mille fois</MDBBtn>
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
                            <MDBCol md="12" className='mt-2'>
                                <MDBCard className='mt-4'>
                                    <MDBCardBody>
                                        <MDBCardTitle>Les règles</MDBCardTitle>
                                        <p className='card-text'>Voici <strong>100 personnes ayant toutes initialement 500€</strong></p>
                                        <p className='card-text'>A chaque tour, 1€ est transféré d'une personne à une autre</p>
                                        <p className='card-text'>Que se passera-t-il sans contrôle, sans impôts, sans pression.</p>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                            <MDBCol md="12" className='mt-2'>
                                <MDBBadge color='warning' style={{ width: '100%' }}>{getTotal(statutActuel)} € au total</MDBBadge>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </MDBCol>
            </MDBRow>
        </MDBContainer >
    );
}

export default Body;
