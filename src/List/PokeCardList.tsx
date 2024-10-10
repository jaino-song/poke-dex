import styled from '@emotion/styled';
import { useEffect } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../Store';
import { fetchPokemons } from '../Store/pokemonsSlice';
import PokeCard from './PokeCard';

// 카드 리스트를 fetchPokemons 함수로 불러오고 생성한다
const PokeCardList = () => {
    const dispatch = useAppDispatch();
    // 불러온 카드를 useState에 저장한다
    const { pokemons } = useSelector((state: RootState) => state.pokemons)
    
    // 무한 스크롤 기능 구현을 위헤 useInfiniteScroll hook을 사용한다
    const [infiniteScroll] = useInfiniteScroll({
        // 현재 데이터가 로딩 중인지 나타낸다
        loading: false,
        // 더 불러올 데이터가 있는지 확인한다
        hasNextPage: pokemons.next !== '',
        // 더 불러올 데이터를 fetch한다. useState의 set함수를 통해 기존의 데이터에 덧붙인다.
        onLoadMore: async () => {
            // const morePokemons = await fetchPokemonsAPI(pokemons.next);

            // morePokemons에서 들어온 객체의 요소를 pokemons 상태에 업데이트 해주고, 포켓몬의 정보가 들어있는
            // results 요소에는 기존 정보를 더해서 새로운 정보를 붙여준다.
            // setPokemons({
            //     ...morePokemons,
            //     results: [...pokemons.results, ...morePokemons.results]
            // })
        },
        // 무한 스크롤 기능을 비활성화할지 여부
        disabled: false,
        // Viewport의 위치가 페이지의 어디에 닿으면 onLoadMore을 실행할지 정한다.
        rootMargin: '0px 0px 400px 0px',
    });

    // 외부 API를 사용하는 fetchPokemons 함수를 사용하기 위해 useEffect를 사용
    useEffect(() => {
        dispatch(fetchPokemons())
        // fetchPokemons를 비동기로 사용하기 위해 즉시실행 함수 안에 async await을 사용
        // (async () => {
        //     const pokemons = await fetchPokemonsAPI();
        //     // 가져온 데이터를 setPokemons로 useState에 업데이트한다.
        //     setPokemons(pokemons); 
        // })()
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
            {/* ref props로 infiniteScroll의 sentry를 세팅한다. */}
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

