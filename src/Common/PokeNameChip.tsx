// Import styled components to create styled UI elements
import styled from "@emotion/styled";

// Define props for the PokeNameChip component
interface PokeNameChipProps {
  name: string,  // The name of the Pokémon
  color: string, // The color for the NumberChip background
  id: number;    // The Pokémon's ID number
}

// Main component to display Pokémon name and its associated number chip
const PokeNameChip = (props: PokeNameChipProps) => {
  // Function to render a 3-digit number, padding with leading zeros if necessary
  const renderNumber = (id: number) => {
    const digits = 3;
    const numberString = id.toString();

    // If number is already 3 or more digits, return as is
    if (numberString.length >= digits) return numberString;
    let result = '';

    // Add leading zeros to make the number 3 digits long
    for (let i = 0; i < digits - numberString.length; i++) {
      result += '0';
    }
    return `${result}${numberString}`;
  }

  // Render the chip with Pokémon number and name
  return (
    <Chip>
      {/* Render number chip with specified color and Pokémon ID */}
      <NumberChip color={props.color}>
        <Number>{renderNumber(props.id)}</Number>
      </NumberChip>
      {/* Display Pokémon name */}
      <Text>{props.name}</Text>
    </Chip>
  );
};

// Styled component for the entire chip that contains both number and name
const Chip = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #c0c0c0;
  border-radius: 16px;
  font-weight: bold;
  box-shadow: 0.5px 0.5px 0 0 #c0c0c0;
`;

// Styled component for the number chip with dynamic background color based on props
const NumberChip = styled.div<{ color: string }>`
  padding: 4px 6px;
  background-color: ${props => props.color};
  border-radius: 16px;
  opacity: 0.8;
`;

// Styled label for the number inside the NumberChip
const Number = styled.label`
  opacity: 1;
`;

// Styled label for the Pokémon name
const Text = styled.label`
  margin: 0 8px 0 5px;
`;

// Export the PokeNameChip component so it can be used in other files
export default PokeNameChip;
