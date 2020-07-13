//responsável pelo processo de autenticação
import Cookies from 'js-cookie';

export const isLogged = () => {
    let token = Cookies.get('token');
    return (token) ? true : false;
}

 //rememberPassword = false é o valor padrão
 //expires=999 = 999 dias para demorar
export const doLogin = (token, rememberPassword = false) => {
    if(rememberPassword){
        Cookies.set('token', token, {expires:999})
    }else{
        Cookies.set('token', token)
    }
}

export const doLogout = () => {
        Cookies.remove('token');
}