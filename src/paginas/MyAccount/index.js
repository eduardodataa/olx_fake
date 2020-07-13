import React, {useState, useEffect} from 'react';
import { PageArea } from './styled';

import useApi from '../../helpers/OlxAPI';

import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';


const Page = () =>{

    //http://alunos.b7web.com.br:501
    //testar serviço: http://alunos.b7web.com.br:501/ping
    const api = useApi();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [disabled, setDisable] = useState(false);
    const [error, setError] = useState('');

    const [stateList, setStateList] = useState([]);
    const [stateLoc, setStateLoc] = useState('');

    useEffect(()=>{
        const getStates = async () =>{
            const sList = await api.getStates();
            //const sList = [{id: 1, name:'SC'},{id: 2, name:'SP'}];
            setStateList(sList);
        }
        getStates();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisable(true);


        setDisable(false);
    }

    return(
        <PageContainer>
            <PageTitle>Minha Conta</PageTitle>
            <PageArea>
                {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }
                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area--title">Email</div>
                        <div className="area--input">
                            <input
                                type="email"
                                disabled={disabled}
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                
                            />
                        </div>

                    </label>
                    <label className="area">
                        <div className="area--title">Nome</div>
                        <div className="area--input">
                            <input type="text"
                                disabled={disabled}
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Estado:</div>
                        <div className="area--input">
                        <select value={stateLoc} onChange={e=>setStateLoc(e.target.value)} required>
                                <option></option>
                                {stateList.map((i,k)=>
                                    <option key={k} value={i.id}> {i.name} </option>
                                )}
                            </select>
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled}>Fazer Login</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    );
}

export default Page;