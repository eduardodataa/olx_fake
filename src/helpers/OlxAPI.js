import Cookies from 'js-cookie';
import qs from 'qs';

const BASEAPI = 'http://alunos.b7web.com.br:501';

const apiFetchPost = async (endpoint, body) => {

    if(!body.token){
        //pega o token do Cookie
        let token = Cookies.get('token');
        if(token){
            body.token = token;
        }
    }

    const res = await fetch(BASEAPI + endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(body)
    });
    const json = await res.json();

    if(json.notallowed){
        window.location.href = '/signin';
        return;
    }

    return json;
}

const apiFetchGet = async (endpoint, body = []) => {
    if(!body.token){
        //pega o token do Cookie
        let token = Cookies.get('token');
        if(token){
            body.token = token;
        }
        console.log(token);
    }

    const res = await fetch(`${BASEAPI + endpoint}?${qs.stringify(body)}`);
    const json = await res.json();


    if(json.notallowed){
        window.location.href = '/login';
        return;
    }

    return json;
}

const apifetchFile = async (endpoint, body) => {
    if(!body.token){
        //pega o token do Cookie
        let token = Cookies.get('token');
        console.log('token: ');
        console.log(token);
        if(token){
            body.append('token' , token);
        }
    }

    const res = await fetch(BASEAPI+endpoint, {
        method: 'POST',
        body
    });
    const json = await res.json();

    if(json.notallowed){
        window.location.href = '/signin';
        return;
    }

    return json;
}

function criarDadosFake(){
    const json = {
        "id":"5dc1accfe9ce3914e638b665",
        "title":"Cama Infantil com escada",
        "price":630,
        "priceNegotiable":false,
        "image":"http://alunos.b7web.com.br:501/media/fcae9326-7b96-4245-b90d-a570df7b4f50.jpg",
        "dateCreated" : "2014-01-01T23:28:56.782Z",
        "description" : "Descrição do produto de forma detalhaad",
        "views" : 33,
        "images":
            [
                "http://alunos.b7web.com.br:501/media/fcae9326-7b96-4245-b90d-a570df7b4f50.jpg",
                "http://alunos.b7web.com.br:501/media/2513966f-43ae-44f4-86b7-401d8b35d2bc.jpg",
                "http://alunos.b7web.com.br:501/media/b60ea90e-38bf-471a-91cc-4a98fe0d3d4b.jpg"

            ],
        "userInfo":
            {
                "email" : "duducordeiro_@hotmail.com",
                "nome" : "Eduardo Cordeiro",
                "stateName" : "Santa Catarina"
            },
        "others":[
            {"id":"5dc1accfe9ce3914e638b665","title":"Cama Infantil com escada","price":630,"priceNegotiable":false,"image":"http://alunos.b7web.com.br:501/media/fcae9326-7b96-4245-b90d-a570df7b4f50.jpg"},{"id":"5dc1adfde9ce3914e638b666","title":"Fiat Uno 1.5 SX","price":0,"priceNegotiable":true,"image":"http://alunos.b7web.com.br:501/media/2513966f-43ae-44f4-86b7-401d8b35d2bc.jpg"},
            {"id":"5dc1ae6ce9ce3914e638b667","title":"Blusa Plus Size","price":58,"priceNegotiable":false,"image":"http://alunos.b7web.com.br:501/media/1085f85f-5f37-43d9-815d-c6d6730b7bc8.jpg"},
            {"id":"5dc1e150404e4b45c601000f","title":"Teste","price":354,"priceNegotiable":false,"image":"http://alunos.b7web.com.br:501/media/b60ea90e-38bf-471a-91cc-4a98fe0d3d4b.jpg"},
            {"id":"5dc2b787fa79a174d857c0ab","title":"Teste 2","price":100,"priceNegotiable":false,"image":"http://alunos.b7web.com.br:501/media/1ea1dd36-93c5-49ed-89e8-3459de5e725e.jpg"},
            {"id":"5dc70aaa685b3c6328a4b4fc","title":"asdasd","price":23123,"priceNegotiable":false,"image":"http://alunos.b7web.com.br:501/media/default.jpg"}
        ],
        "category" :
            {
                "name": "Bebês",
                "slug" : "baby",
                "_id" : "5dc1accfe9ce3914e638b66"
            },
        "stateName" : "SP"

    };
    return json;
}

const OlxAPI = {
    login:async(email,password) =>{
        //fazer consulta ao Webservice
        const json = await apiFetchPost(
            '/user/signin',
            {email, password}
        );
        return json;

        //return {error:'Funcionalidade Incompleta'};
    },

    register:async (name, email, password, stateLoc) => {
        const json = await apiFetchPost(
            '/user/signup',
            {name, email, password, state:stateLoc}
        );
        return json;
    },
    getStates:async () => {
        const json = await apiFetchGet(
            '/states'
        );
        return json.states;
    },
    getCategories:async () => {
        const json = await apiFetchGet(
            '/categories'
        );
        return json.categories;
    },
    getAds:async (options) => {
        const json = await apiFetchGet(
            '/ad/list',
            options
        );
        return json;
    },
    getAd:async (id, other = false) => {
        const json = await apiFetchGet('/ad/item',{id, other});
        console.log(json);
        return json;
    },
    //não é get nem post, é usado para o envio de arquivos
    addAd:async (fData) => {
        const json = await apifetchFile(
            '/ad/add',
            fData
        );
        return json;
    }
};




export default ()=> OlxAPI;