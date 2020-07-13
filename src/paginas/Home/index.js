import React, {useState, useEffect} from 'react';
import { PageArea, SearchArea } from './styled';

import useApi from '../../helpers/OlxAPI';

import { PageContainer } from '../../components/MainComponents';
import AdItem from '../../components/partials/AdItem';
import { Link } from 'react-router-dom';


const Page = () =>{

    //http://alunos.b7web.com.br:501
    //testar serviço: http://alunos.b7web.com.br:501/ping
    const api = useApi();

    const [stateList, setStateList] =useState([]);
    const [categories, setCategories] =useState([]);
    const [adList, setAdList] =useState([]);

    useEffect(() => {
        const getStates= async () => {
            const sList = await api.getStates();
            setStateList(sList);
        }
        getStates();

    }, [api]);

    useEffect(() => {
        const getCategories= async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();

    }, []);

    useEffect(() => {
        const getRecentAds = async () => {
            const json = await api.getAds({
                sort:'desc',
                limit:12
            });
            setAdList(json.ads);
        }
        getRecentAds();

    }, []);


    return(
        <>
            <SearchArea>
                <PageContainer>
                        <div className="searchBox">
                            <form method="GET" action="/ads">
                                <input type="text" name="q" placeholder="O que você procura?" />
                                <select name="state">
                                {stateList.map((i,k)=>
                                    <option key={k} value={i.name}>{i.name}</option>
                                )}
                                </select>
                                <button>Pesquisar</button>
                            </form>
                        </div>
                        <div className="categoryList">
                                {categories.map((i,k)=>
                                <Link key={k} to={`/ads?cat=${i.slug}`} className="categoryItem">
                                    <img src={i.img} alt="" />
                                    <span>{i.name}</span>
                                </Link>
                                )}
                        </div>
                </PageContainer>

            </SearchArea>
            <PageContainer>
                <PageArea>
                    <h2>Anúncios Recentes</h2>
                    <div className="list">
                        {adList.map((i,k) =>
                            <AdItem key={k} data={i} />
                        )}

                    </div>

                    <Link to="/ads" className="seeAllLink"  >Ver Todos >></Link>
                    <hr/>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.


                    <hr/>

                </PageArea>
            </PageContainer>
        </>
    );
}

export default Page;