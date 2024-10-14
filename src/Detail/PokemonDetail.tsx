// Import styled components for custom styling of UI elements
import styled from "@emotion/styled";
// Import useEffect hook to handle side effects
import { useEffect } from "react";
// Import useSelector to access the Redux store and useParams to extract parameters from the URL
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// Import PokeImageSkeleton component to display a loading state while the Pokémon image is being fetched
import { PokeImageSkeleton } from "../Common/PokeImageSkeleton";
// Import reusable components for displaying Pokémon's mark and name
import PokeMarkChip from "../Common/PokeMarkChip";
// Import store-related utilities to access state and dispatch actions
import { RootState, useAppDispatch } from "../Store";
// Import the action to fetch Pokémon details from the store
import { fetchPokemonDetail } from "../Store/pokemonDetailSlice";

// 포켓몬 상세 정보를 렌더링하는 컴포넌트
const PokemonDetail = () => {
  // URL 파라미터로부터 포켓몬 이름을 가져온다
  const { name } = useParams();
  // 현재 선택된 이미지 타입 상태를 가져온다
  const imageType = useSelector((state: RootState) => state.imageType.type);
  // 포켓몬 상세 정보 상태를 가져온다
  const { pokemonDetails } = useSelector((state: RootState) => state.pokemonDetail);
  // 포켓몬 이름을 기준으로 해당 포켓몬 데이터를 선택한다
  const pokemon = name ? pokemonDetails[name] : null;
  // Redux dispatch 함수를 사용하기 위해 설정
  const dispatch = useAppDispatch();

  // useEffect를 사용하여 포켓몬 이름이 있으면 해당 포켓몬의 정보를 API에서 fetch
  useEffect(() => {
    // 이름이 없는 경우 아무 작업도 하지 않음
    if (!name) {
      return;
    }
    // 포켓몬의 상세 정보를 fetch한다
    dispatch(fetchPokemonDetail(name));
  }, [dispatch, name]);

  // 포켓몬의 데이터가 아직 없을 경우 로딩 상태의 화면을 렌더링한다
  if (!name || !pokemon) {
    return (
      <Container>
        <ImageContainer>
          <PokeImageSkeleton /> {/* 이미지 로딩 중일 때 표시할 스켈레톤 */}
        </ImageContainer>
        <Footer>
          <PokeMarkChip />
        </Footer>
      </Container>
    );
  }
  
  // 포켓몬의 데이터가 준비된 경우 상세 화면을 렌더링한다
  return (
    <Container>
      <ImageContainer>
        <Image src={pokemon.images[imageType]} alt={pokemon.koreanName} />
      </ImageContainer>
      <Divider />
      <Body>
        <h2>기본 정보</h2>
        <Table>
          <tbody>
            {/* 포켓몬의 기본 정보들을 표로 렌더링 */}
            <TableRow>
              <TableHeader>번호</TableHeader>
              <td>{pokemon.id}</td>
            </TableRow>
            <TableRow>
              <TableHeader>이름</TableHeader>
              <td>{`${pokemon.koreanName} (${pokemon.name})`}</td>
            </TableRow>
            <TableRow>
              <TableHeader>타입</TableHeader>
              <td>{pokemon.types.join(', ')}</td>
            </TableRow>
            <TableRow>
              <TableHeader>키</TableHeader>
              <td>{pokemon.height} m</td>
            </TableRow>
            <TableRow>
              <TableHeader>몸무게</TableHeader>
              <td>{pokemon.weight} kg</td>
            </TableRow>
          </tbody>
        </Table>
      </Body>
      <Body>
        <h2>능력치</h2>
        <Table>
          <tbody>
            {/* 포켓몬의 능력치들을 표로 렌더링 */}
            {pokemon.baseStats.map(stat => {
              return (
                <TableRow key={stat.name}>
                  <TableHeader>{stat.name}</TableHeader>
                  <td>{stat.value}</td>
                </TableRow>
              )
            })}
          </tbody>
        </Table>
      </Body>
      <Footer>
        <PokeMarkChip />
      </Footer>
    </Container>
  )
}

// 포켓몬 상세 정보를 담는 컨테이너 섹션 스타일 정의
const Container = styled.section`
  border: 1px solid #c0c0c0;
  margin: 16px 32px;
  border-radius: 16px;
  box-shadow: 1px 1px 3px 1px #c0c0c0;
`

// 이미지 컨테이너 섹션 스타일 정의
const ImageContainer = styled.section`
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  align-items: center;
  margin: 8px 0;
`

// 포켓몬 이미지 스타일 정의
const Image = styled.img`
  width: 350px;
  height: 350px;
`

// 구분선을 정의하는 스타일 컴포넌트
const Divider = styled.hr`
  margin: 32px;
  border-style: none;
  border-top: 1px dashed #d3d3d3;
`

// 포켓몬 상세 내용 (기본 정보와 능력치) 섹션의 스타일 정의
const Body = styled.section`
  margin: 0 32px;
`

// 포켓몬의 정보를 표 형태로 렌더링하기 위한 테이블 스타일 정의
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  margin: 0 auto 16px;
  
  th, td {
    padding: 6px 12px;
  }
`

// 테이블의 행 스타일 정의
const TableRow = styled.tr`
  border-width: 1px 0;
  border-style: solid;
  border-color: #f0f0f0;
`

// 테이블 헤더 스타일 정의
const TableHeader = styled.th`
  width: 1px;
  white-space: nowrap;
  text-align: left;
  font-weight: normal;
  font-size: 14px;
  color: #a0a0a0;
`

// Footer 영역 스타일 정의 (포켓몬 마크 등)
const Footer = styled.section`
  margin: 32px 16px;
  display: flex;
`

// PokemonDetail 컴포넌트를 export 하여 다른 곳에서 사용할 수 있도록 설정
export default PokemonDetail;
