import {useState} from 'react';
export default function AlunniRow(props){
    const [inConferma,setInConferma] = useState(false);
    const a =props.alunno;
    const carica = props.carica;

    async function eliminaAlunni(){
        await fetch(`http://localhost:8080/alunni/${a.id}`, {method:"DELETE"});
        carica();
    }

    return(
        <tr>
        <td>{a.id}</td>
        <td>{a.nome}</td>
        <td>{a.cognome}</td>
        <td>{!inConferma ? (
            <button onClick={()=>{setInConferma(true)}}>elimina</button>
        ):(
            <>
            sei sicuro?
            <button onClick={eliminaAlunni}>si</button>
            <button onClick={()=>{setInConferma(false)}}>no</button>
            </>
        )}</td>
      </tr>
    );
}