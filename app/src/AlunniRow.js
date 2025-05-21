import {useState} from 'react';
export default function AlunniRow(props){
    const [inConferma,setInConferma] = useState(false);
    const [Modifica,setInModifica] = useState(false);
    const [Modifica2,setInModifica2] = useState(false);
    const [nome,setNome] = useState("");
    const [mostraModifica, setMostraModifica] = useState(false);    
    const [cognome,setCogmome] = useState("");
    const a =props.alunno;
    const carica = props.carica;

    function prepFormModifica() {
        setMostraModifica(!mostraModifica);
    }

    async function eliminaAlunni(){
        await fetch(`http://localhost:8080/alunni/${a.id}`, {method:"DELETE"});
        carica();
    }

    async function modificaAlunno(){
        await fetch(`http://localhost:8080/alunni/${a.id}`, 
        {method:"PUT",
        header: {"Content-Type": "application/json"},
        body: JSON.stringify({nome: nome, cognome: cognome})
        });
        carica();
    }

    return(
        <>
            {Modifica? (
            <>
            <tr>
            <td>{a.id}</td>
            <td><input type="text" onChange={(e)=>{setNome(e.target.value)}}/></td>
            <td><input type="text" onChange={(e)=>{setCogmome(e.target.value)}}/></td>
            <td><button onClick={modificaAlunno}>salva</button>
            <button onClick={()=>{setInModifica(false)}}>annulla</button></td>
            </tr>
            </>
            ):(
            <>
            <tr>
            <td>{a.id}</td>
            <td>{a.nome}</td>
            <td>{a.cognome}</td>
            <td>{!inConferma ? (<>{!Modifica2 ?(
                <>
                <button onClick={()=>{setInConferma(true)}}>elimina</button>
                <button onClick={()=>{setInModifica(true)}}>modifica</button>
                <button onClick={()=>{setInModifica2(true)}}>modifica2</button>
                </>
            ):(
            <>
            <br />
            <form>
            <label>Nome:</label>
            <input type="text" onChange={(e)=>{setNome(e.target.value)}}/>
            <br /><br />
            <label>Cognome:</label>
            <input type="text" onChange={(e)=>{setCogmome(e.target.value)}}/>
            <br /><br />
            <button onClick={modificaAlunno}>Salva</button>
            <button onClick={()=>{setInModifica2(false)}}>Annulla</button>
            </form>
            </>
            )}
            </>
            ):(
                <>
                sei sicuro?
                <button onClick={eliminaAlunni}>si</button>
                <button onClick={()=>{setInConferma(false)}}>no</button>
                </>
            )}</td>
            </tr>
            </>
        )}
        </>
    );
}