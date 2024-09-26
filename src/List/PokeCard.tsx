import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PokeImageSkeleton } from "../Common/PokeImageSkeleton";
import PokeMarkChip from "../Common/PokeMarkChip"; // Import the PokeMarkChip component
import PokeNameChip from "../Common/PokeNameChip"; // Import the PokeNameChip component
import { fetchPokemonDetail, PokemonDetailType } from "../Service/pokemonService";

interface PokeCardProps {
  name: string
}

const PokeCard = (props:PokeCardProps) => {
  const navigate =  useNavigate();
  const [pokemon, setPokemon] = useState<PokemonDetailType | null>(null)
  const handleClick = () => {
    navigate(`/pokemon/${props.name}`);
  }

  useEffect(() => {
    (async () => {
      const detail = await fetchPokemonDetail(props.name);
      setPokemon(detail);
    })()
  }, [props.name])

  if (!pokemon) {
    return (
      <Item color={'#fff'}>
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
    <Item onClick={handleClick} color={pokemon.color}>
      <Header>
        <PokeNameChip name={pokemon.koreanName} color={pokemon.color} id={pokemon.id} />
      </Header>
      <Body>
        <Image src={pokemon.images.dreamWorldFront} alt={pokemon.name}/>
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
