// Import styled components for custom styling of UI elements
import styled from "@emotion/styled";
// Import useEffect hook for handling side effects
import { useEffect } from "react";
// Import intersection observer hook to track visibility of components
import { useIntersectionObserver } from "react-intersection-observer-hook";
// Import useSelector to access Redux store and useNavigate for route navigation
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// Import PokeImageSkeleton component to display loading state for Pokémon image
import { PokeImageSkeleton } from "../Common/PokeImageSkeleton";
// Import reusable components for Pokémon mark and name display
import PokeMarkChip from "../Common/PokeMarkChip";
import PokeNameChip from "../Common/PokeNameChip";
// Import store-related utilities to access state and dispatch actions
import { RootState, useAppDispatch } from "../Store";
// Import the action to fetch Pokémon details
import { fetchPokemonDetail } from "../Store/pokemonDetailSlice";

// PokeCard로 가는 Prop의 타입을 지정해준다.
interface PokeCardProps {
  name: string // The name of the Pokémon (used for fetching details)
}

// 포켓몬 이름 Prop을 받아서 포켓몬 카드를 만들어주는 컴포넌트
const PokeCard = (props: PokeCardProps) => {
  const dispatch = useAppDispatch();
  // Redux 상태에서 포켓몬의 세부 정보를 가져온다
  const { pokemonDetails } = useSelector((state: RootState) => state.pokemonDetail);
  // 페이지 경로 이동을 위한 Hook
  const navigate = useNavigate();
  // 현재 이미지 타입 상태를 선택한다 (e.g., front, dream_world 등)
  const imageType = useSelector((state: RootState) => state.imageType.type);
  // Intersection Observer Hook을 사용해 요소가 화면에 들어왔는지 확인한다
  const [ref, { entry }] = useIntersectionObserver();
  // 요소가 화면에 보이는지 여부를 저장
  const isVisible = entry && entry.isIntersecting;
  // 포켓몬의 상태를 가져온다 (스토어에서 해당 포켓몬 정보 확인)
  const pokemon = pokemonDetails[props.name];

  // 카드를 클릭했을 때 포켓몬 상세 페이지로 이동하는 핸들러
  const handleClick = () => {
    navigate(`/pokemon/${props.name}`);
  }

  // useEffect를 통해 각 카드의 포켓몬 정보를 API에서 fetch한다
  useEffect(() => {
    // Viewport로 보이지 않으면 return으로 끝낸다
    if (!isVisible) {
      return;
    }
    // 포켓몬 정보를 fetch하여 Redux 스토어에 저장
    dispatch(fetchPokemonDetail(props.name));
  // name이나 viewport에 보이는 상태가 바뀔 때 useEffect를 실행한다.
  }, [dispatch, props.name, isVisible]);

  // 포켓몬 정보가 없을 경우, 로딩 상태의 카드 렌더링
  if (!pokemon) {
    return (
      <Item ref={ref} color={'#fff'}>
        <Header>
          <PokeNameChip name={'포켓몬'} color={'#ffca09'} id={0} />
        </Header>
        <Body>
          <PokeImageSkeleton /> {/* 로딩 중일 때 표시되는 이미지 스켈레톤 */}
        </Body>
        <Footer>
          <PokeMarkChip />
        </Footer>
      </Item>
    );
  }

  // 포켓몬 정보가 있을 경우, 실제 카드 렌더링
  return (
    <Item onClick={handleClick} color={pokemon.color} ref={ref}>
      <Header>
        <PokeNameChip name={pokemon.koreanName} color={pokemon.color} id={pokemon.id} />
      </Header>
      <Body>
        <Image src={pokemon.images[imageType]} alt={pokemon.name} />
      </Body>
      <Footer>
        <PokeMarkChip />
      </Footer>
    </Item>
  );
};

// 스타일링된 리스트 아이템 정의 (포켓몬 카드)
const Item = styled.li<{ color: string }>`
  display: flex;
  flex-direction: column;
  padding: 8px;
  border: 1px solid #c0c0c0;
  width: 250px;
  height: 300px;
  box-shadow: 1px 1px 3px 1px #c0c0c0;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
    background-color: ${props => props.color};
    transition: background-color 0s;
  }

  &:active {
    opacity: 0.8;
    transition: background-color 0s;
  }
`;

// Header 영역 스타일 정의 (포켓몬 이름 등)
const Header = styled.section`
  display: flex;
  flex-direction: row;
  margin: 8px 0; 
`;

// Body 영역 스타일 정의 (포켓몬 이미지 영역)
const Body = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px 0;
  flex: 1 1 auto;
`;

// 이미지 스타일 정의
const Image = styled.img`
  width: 180px;
  height: 180px;
`;

// Footer 영역 스타일 정의 (하단 마크 표시 등)
const Footer = styled.section`
  display: flex;
  flex-direction: row;
`;

// PokeCard 컴포넌트를 export 하여 다른 곳에서 사용할 수 있도록 설정
export default PokeCard;
