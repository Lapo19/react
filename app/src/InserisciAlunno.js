import {useState} from 'react';
export default function InserisciAlunno(props){
    const [Conferma,setConferma] = useState(false);
    const [nome,setNome] = useState("");
    const [cognome,setCogmome] = useState("");
    const carica = props.carica;

    function impostaNome(evento){
        setNome(evento.target.value);
    }



    async function creaAlunno(){
        await fetch(`http://localhost:8080/alunni`, 
        {method:"POST",
        header: {"Content-Type": "application/json"},
        body: JSON.stringify({nome: nome, cognome: cognome})});
        carica();

    }

    return(
        <>
        {!Conferma ? (
            <button onClick={()=>{setConferma(true)}}>Inserisci alunno</button>
        ):(
            <>
            <br />
            <form>
            <label>Nome:</label>
            <input type="text" onChange={impostaNome}/>
            <br /><br />
            <label>Cognome:</label>
            <input type="text" onChange={(e)=>{setCogmome(e.target.value)}}/>
            <br /><br />
            <button onClick={creaAlunno}>Salva</button>
            <button onClick={()=>{setConferma(false)}}>Annulla</button>
        </form>
        </>
        )}
        </>
    );
}