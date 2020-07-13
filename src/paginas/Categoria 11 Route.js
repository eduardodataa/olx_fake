import React from 'react';
import {useParams} from 'react-router-dom';



function Categoria(){

    let { cat } = useParams();
    return (
        <div>
            <h4>Página Categoria</h4>
            Você está na página de {cat}
        </div>

    )
}

export default Categoria;