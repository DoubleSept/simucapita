import { MDBBtn, MDBCol, MDBRow, MDBContainer, MDBInput } from 'mdb-react-ui-kit';
import { useState } from 'react';
import './Body.scss'

function Body() {
    const nbParticipants = 1000
    const nbParParticipant = 1000
    var statutInitial = Array(nbParticipants).fill(nbParParticipant).map((element, index) => { return { numero: index, argent: element } })

    var [statutActuel, setStatut] = useState(statutInitial)
    var [dernierEchange, setDernierEchange] = useState([0, 0])
    var [champNbFois, setChampNbFois] = useState(10000)

    const changerStatut = (nouveauStatut) => {
        nouveauStatut.sort((a, b) => b.argent - a.argent)
        setStatut(nouveauStatut)
    }

    const unCoup = (statutEntree) => {
        var receveur = Math.floor(Math.random() * nbParticipants);
        var donneur = Math.floor(Math.random() * nbParticipants);

        var statutSortie = Array.from(statutEntree);
        statutSortie[donneur] = { ...statutEntree[donneur], argent: statutEntree[donneur].argent - 1 }
        statutSortie[receveur] = { ...statutEntree[receveur], argent: statutEntree[receveur].argent + 1 }

        return [statutSortie, donneur, receveur];
    }

    const jouerUneFois = (evenement) => {

        var statutTemporaire = Array.from(statutActuel);
        var [nouveauStatut, donneur, receveur] = unCoup(statutTemporaire);

        changerStatut(nouveauStatut);
        setDernierEchange([donneur, receveur]);

        evenement.stopPropagation();
        evenement.preventDefault();
    }

    const jouerNFois = (evenement, nbFois) => {

        var statutTemporaire = Array.from(statutActuel);
        for (let i = 0; i < nbFois; i++) {
            statutTemporaire = unCoup(statutTemporaire)[0];
        }
        changerStatut(statutTemporaire);

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
                    <ol>
                        {statutActuel.sort().map((element, index) => {
                            return (
                                <li key={element.numero}>
                                    <b>{String(element.numero).padStart(4, '0')}</b> possède <b>{element.argent}$</b>
                                </li>
                            );
                        })
                        }
                    </ol>
                </MDBCol>
                <MDBCol md="6" className='droite p-3'>
                    <MDBContainer>
                        <MDBRow className='g-2'>
                            <MDBCol md="12">
                                <MDBBtn color="primary" onClick={jouerUneFois}>Cliquer Ici</MDBBtn>
                            </MDBCol>
                            <MDBCol md="12">
                                <p>{dernierEchange[0]} => {dernierEchange[1]}</p>
                            </MDBCol>
                            <MDBCol md="12" >
                                <MDBBtn color="warning" onClick={jouerMilleFois}>Cliquer ici pour jouer mille fois</MDBBtn>
                            </MDBCol>
                            <MDBCol md="6" >
                                <MDBInput label='Nb fois' id='fois' type='number' value={champNbFois} onChange={(e) => setChampNbFois(e.target.value)} />
                            </MDBCol>
                            <MDBCol md="6" >
                                <MDBBtn color="secondary" onClick={(e) => {
                                    jouerNFois(e, champNbFois)
                                }}>Jouer</MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default Body;