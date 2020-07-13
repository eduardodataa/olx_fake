import React, {useState, useEffect} from 'react';
import  {useParams, Link} from 'react-router-dom';
import { PageArea, Fake, OthersArea, BreadCrumb } from './styled';
import { Slide } from 'react-slideshow-image';

import useApi from '../../helpers/OlxAPI';

import { PageContainer } from '../../components/MainComponents';
import AdItem from '../../components/partials/AdItem';


const Page = () =>{

    //http://alunos.b7web.com.br:501
    //testar serviço: http://alunos.b7web.com.br:501/ping
    const api = useApi();
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [adInfo, setAdInfo] = useState({});

    useEffect(() => {
        console.log('Iniciando busca1');
        const getAdInfo = async (id) => {
            console.log('Iniciando busca2: ' + id);
            const json = await api.getAd(id, true);
            console.log('Iniciando busca3');
            console.log('AdInfo: ');
            console.log(json);
            setAdInfo(json);
            setLoading(false);
        }
        getAdInfo(id);
    },[api, id]);

    const formatDate = (date) =>{
        let cDate = new Date(date);

        let months = ['Janeiro', 'fevereiro', 'março'];

        let cDay = cDate.getDay();
        let cMonth = cDate.getMonth();
        let cYear = cDate.getFullYear();

        return `${cDay} de ${months[cMonth]} de ${cYear}`;
    }

    return(
        <PageContainer>
            {adInfo.category &&
            <BreadCrumb>
                Você está aqui:
                <Link to="/">Home</Link>/
                <Link to={`/ads?state=${adInfo.stateName}`}>{adInfo.stateName}</Link>/
                <Link to={`/ads?state=${adInfo.stateName}&cat=${adInfo.category.slug}`}>{adInfo.category.name}</Link>/ {adInfo.title}
            </BreadCrumb>
            }
            <PageArea>
                <div className="leftSide">
                    <div className="box">
                        <div className="adImage">
                            {loading && <Fake height={300} />}
                            {adInfo.images &&
                                <Slide>
                                    {adInfo.images.map((img,k) =>
                                        <div key={k} className="each-slide">
                                            <img src={img} alt="" />
                                        </div>
                                    )}
                                </Slide>
                            }
                        </div>
                        <div className="adInfo">
                            <div className="adName">
                            {loading && <Fake height={20} />}
                            {adInfo.title && <h2>{adInfo.title}</h2> }
                            {adInfo.dateCreated && <small>Criado em { formatDate(adInfo.dateCreated)}</small> }
                            </div>
                            <div className="adDescription">
                            {loading && <Fake height={100} />}
                            {adInfo.description}
                            <hr/>
                            {adInfo.views && <small>Visualizações: {adInfo.views}</small>}

                            </div>
                        </div>
                    </div>
                </div>
                <div className="rightSide">
                <div className="box box--padding">
                {loading && <Fake height={20} />}
                {adInfo.priceNegotiable &&
                    "Preço Negociável"
                }
                {!adInfo.priceNegotiable && adInfo.price &&
                    <div className="price">Preço: <span>R$ {adInfo.price}</span> </div>
                }
                </div>
                {loading && <Fake height={50} />}
                {adInfo.userInfo &&
                    <>
                        <a href={`mailto:${adInfo.userInfo.email}`} className="contactSellerLink" target="_blank" rel="noopener noreferrer" >Fale com o Vendedor</a>
                        <div className="createdBy box box--padding">
                            Criado por:
                            <strong>{adInfo.userInfo.nome}</strong>
                            <small>E-mail:  {adInfo.userInfo.email}</small>
                            <small>Estado: {adInfo.userInfo.stateName}</small>
                        </div>
                    </>
                 }
                </div>

            </PageArea>

            <OthersArea>

            {adInfo.others &&
                    <>
                    <h2>Outras ofertas do vendedor</h2>
                    <div className="list">
                        {adInfo.others.map((i,k) =>
                            <AdItem key={k} data={i} />
                        )}
                    </div>
                    </>
                }
            </OthersArea>

        </PageContainer>
    );
}

export default Page;