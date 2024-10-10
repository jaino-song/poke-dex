import styled from "@emotion/styled";
import { useEffect } from "react";
import { useIntersectionObserver } from "react-intersection-observer-hook";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PokeImageSkeleton } from "../Common/PokeImageSkeleton";
import PokeMarkChip from "../Common/PokeMarkChip"; // Import the PokeMarkChip component
import PokeNameChip from "../Common/PokeNameChip"; // Import the PokeNameChip component
import { RootState, useAppDispatch } from "../Store";
import { fetchPokemonDetail } from "../Store/pokemonDetailSlice";

// PokeCard로 가는 Prop의 타입을 지정해준다.
interface PokeCardProps {
  name: string
}

// 포켓몬 이름 Prop을 받아서 포켓몬 카드를 만들어주는 컴포넌트
const PokeCard = (props:PokeCardProps) => {
  const dispatch = useAppDispatch();
  const { pokemonDetails } = useSelector((state: RootState) => state.pokemonDetail)
  // 카드를 클릭했을 때 다른 루트로 연결해주는 Hook
  const navigate =  useNavigate();
  // 스토어 안에 있는 상태를 선택한다.
  const imageType = useSelector((state: RootState) => state.imageType.type);
  // Intersection Observer Hook
  const [ref, { entry }] = useIntersectionObserver();
  // 카드가 Viewport에 있는지 확인함
  const isVisible = entry && entry.isIntersecting;
  // 포켓몬의 상태를 관리하는 state
  const pokemon = pokemonDetails[props.name];
  // 카드를 클릭했을 때 동작 처리
  const handleClick = () => {
    navigate(`/pokemon/${props.name}`);
  }

  // useEffect를 통해 각 카드의 포켓몬 정보를 API에서 fetch한다
  useEffect(() => {
    // Viewport로 보이지 않으면 return으로 끝낸다
    if(!isVisible) {
      return;
    }
    dispatch(fetchPokemonDetail(props.name))
  // name이나 viewport에 보이는 상태가 바뀔 때 useEffect를 실행한다.
  }, [dispatch, props.name, isVisible])

  if (!pokemon) {
    return (
      <Item ref={ref} color={'#fff'}>
        <Header>
          <PokeNameChip name={'포켓몬'} color={'#ffca09'} id={0} />
        </Header>
        <Body>
          <PokeImageSkeleton />
        </Body>
        <Footer>
          <PokeMarkChip />
        </Footer>
      </Item>
    );
  }


  return (
    <Item onClick={handleClick} color={pokemon.color} ref={ref}>
      <Header>
        <PokeNameChip name={pokemon.koreanName} color={pokemon.color} id={pokemon.id} />
      </Header>
      <Body>
        <Image src={pokemon.images[imageType]} alt={pokemon.name}/>
      </Body>
      <Footer>
        <PokeMarkChip />
      </Footer>
    </Item>
  );
};

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
    background-color: ${props => props.color}
    transition: background-color 0s;
  }

  &:active {
    // background-color: ${props => props.color};
    opacity: 0.8;
    transition: background-color 0s;
  }
`;

const Header = styled.section`
  display: flex;
  flex-direction: row;
  margin: 8px 0; 
`;

const Body = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px 0;
  flex: 1 1 auto;
`

const Image = styled.img`
  width: 180px;
  height: 180px;
`

const Footer = styled.section`
  display: flex;
  flex-direction: row;
`

export default PokeCard;
