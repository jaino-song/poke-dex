import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { fetchPokemons, PokemonListResponseType } from '../Service/pokemonService';
import PokeCard from './PokeCard';

// 카드 리스트를 fetchPokemons 함수로 불러오고 생성한다
const PokeCardList = () => {
    // 불러온 카드를 useState에 저장한다
    const [pokemons, setPokemons] = useState<PokemonListResponseType>({
        count: 0,
        next: '',
        results: []
    });

    const [infiniteScroll] = useInfiniteScroll({
        loading: false,
        hasNextPage: pokemons.next !== '',
        onLoadMore: async () => {
            const morePokemons = await fetchPokemons(pokemons.next);

            setPokemons({
                ...morePokemons,
                results: [...pokemons.results, ...morePokemons.results]
            })
        },
        disabled: false,
        rootMargin: '0px 0px 400px 0px',
    });

    // 외부 API를 사용하는 fetchPokemons 함수를 사용하기 위해 useEffect를 사용
    useEffect(() => {
        // fetchPokemons를 비동기로 사용하기 위해 즉시실행 함수 안에 async await을 사용
        (async () => {
            const pokemons = await fetchPokemons();
            // 가져온 데이터를 setPokemons로 useState에 업데이트한다.
            setPokemons(pokemons);
        })()
    }, [])

    return (
        <>
            <List> 
                { 
                    pokemons.results.map((pokemon, index) => {
                        return (
                            <PokeCard key={`${pokemon.name}_${index}`} name={pokemon.name} />
                        )
                    })
                }
            </List>
            <Loading ref={infiniteScroll}>
                Loading...
            </Loading>
        </>
    )
}

const Loading = styled.div`
    display: flex;
    justify-content: center;
`

const List = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0 0 32px 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
`

export default PokeCardList

