// Import styled components to create custom styled elements
import styled from '@emotion/styled';
// Import useEffect for side effects in functional components
import { useEffect } from 'react';
// Import useInfiniteScroll for implementing infinite scrolling
import useInfiniteScroll from 'react-infinite-scroll-hook';
// Import useSelector to access the Redux store and useAppDispatch to dispatch actions
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../Store';
// Import fetchPokemons action to fetch Pokémon data
import { fetchPokemons } from '../Store/pokemonsSlice';
// Import PokeCard component for rendering individual Pokémon cards
import PokeCard from './PokeCard';

// 카드 리스트를 fetchPokemons 함수로 불러오고 생성한다
const PokeCardList = () => {
    const dispatch = useAppDispatch();
    // 불러온 카드를 useState에 저장한다 (Redux 상태에서 pokemons 리스트 가져오기)
    const { pokemons } = useSelector((state: RootState) => state.pokemons);
    
    // 무한 스크롤 기능 구현을 위해 useInfiniteScroll hook을 사용한다
    const [infiniteRef] = useInfiniteScroll({
        // 현재 데이터가 로딩 중인지 나타낸다 (현재는 로딩 중 아님으로 설정)
        loading: false,
        // 더 불러올 데이터가 있는지 확인 (다음 페이지가 있는 경우 true)
        hasNextPage: pokemons.next !== '',
        // 더 불러올 데이터를 fetch한다 (다음 페이지의 URL을 사용하여 fetchPokemons 호출)
        onLoadMore: async () => {
            dispatch(fetchPokemons(pokemons.next));
        },
        // 무한 스크롤 기능을 비활성화할지 여부 (현재는 활성화 상태)
        disabled: false,
        // Viewport의 위치가 페이지의 어디에 닿으면 onLoadMore을 실행할지 정한다.
        rootMargin: '0px 0px 400px 0px',
    });

    // 외부 API를 사용하는 fetchPokemons 함수를 사용하기 위해 useEffect를 사용
    useEffect(() => {
        dispatch(fetchPokemons()); // 컴포넌트가 처음 렌더링될 때 포켓몬 리스트 fetch
    }, [dispatch]);

    return (
        <>
            <List> 
                { 
                    // pokemons 리스트를 순회하며 각 포켓몬의 카드를 생성
                    pokemons.results.map((pokemon, index) => {
                        return (
                            // 각 포켓몬에 대한 PokeCard 컴포넌트 렌더링
                            <PokeCard key={`${pokemon.name}_${index}`} name={pokemon.name} />
                        )
                    })
                }
            </List>
            {/* ref props로 infiniteScroll의 sentry를 세팅한다 (스크롤 감지 시점 표시) */}
            <Loading ref={infiniteRef}>
                Loading...
            </Loading>
        </>
    )
}

// Loading 메시지에 대한 스타일 정의
const Loading = styled.div`
    display: flex;
    justify-content: center;
`

// Pokémon 카드 리스트에 대한 스타일 정의
const List = styled.ul`
    list-style: none;          // 리스트 스타일 없앰
    padding: 0;                // 기본 패딩 제거
    margin: 0 0 32px 0;        // 하단에 마진 추가
    display: flex;             // flexbox 사용
    flex-direction: row;       // 수평으로 아이템 배치
    flex-wrap: wrap;           // 아이템이 화면 크기를 넘길 경우 다음 줄로 이동
    justify-content: center;   // 아이템을 중앙 정렬
    gap: 20px;                 // 각 카드 사이의 간격 설정
`

// PokeCardList 컴포넌트를 export하여 다른 곳에서 사용 가능하도록 설정
export default PokeCardList;
