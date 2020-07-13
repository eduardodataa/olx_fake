import React from 'react';
import {useLocation} from 'react-router-dom';

function useQuery(){
    return new URLSearchParams( useLocation().search );
}

function Categoria(){

    //let { cat } = useLocation();

    let query = useQuery();

    let catQuery = query.get('tipo');
    return (
        <div>
            <h4>Página Categoria</h4>
            Você está na página de  { catQuery}
        </div>

    )
}

export default Categoria;