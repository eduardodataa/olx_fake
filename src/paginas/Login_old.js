import React from 'react';
import { connect } from 'react-redux';

function Login(props){

    const handleFelipe = () => {
        props.setName('Felipe');
    }
    return (
        <div>
            <h4>Página de Login</h4>
            O nome é: {props.name}

            <br/>
            <button onClick={handleFelipe}>Trocar nome para Felipe</button>
        </div>
    )
}

const mapStateToProps = state => ({ name: state.usuario.name });

//criar funções específicas como se fossem props.
//recebe um parâmetro como função, o dispatch
//criação de uma função específica para ser enviada ao props
const mapDispatchToProps = (dispatch) => ({setName : (newName) => dispatch({type: 'SET_NAME', payload: {name:newName}})});

//export default Login;

export default connect(mapStateToProps, mapDispatchToProps)(Login);