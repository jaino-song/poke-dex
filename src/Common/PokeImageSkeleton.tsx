// Import styled components to create custom-styled elements
import styled from "@emotion/styled";
// Import FaQuestion icon from react-icons to use as a placeholder
import { FaQuestion } from 'react-icons/fa';

// Styled component for the Pokémon image skeleton
export const PokeImageSkeleton = styled(FaQuestion)`
  color: #ffca09;        // Set the color of the icon to match the Pokémon theme color
  font-size: 64px;       // Set the size of the icon to be large, simulating a placeholder for Pokémon image
`
