// Import styled components to create custom UI elements
import styled from "@emotion/styled";

// Main component to display a simple Pokémon mark chip
const PokeMarkChip = () => {
  return (
    <Chip>
      {/* Render "Pokémon" text inside the chip */}
      <Text>Pokémon</Text>
    </Chip>
  )
}

// Styled component for the chip container
const Chip = styled.div`
  display: flex;               // Use flexbox to align items
  align-items: center;         // Align items vertically in the center
  border: 1px solid #c0c0c0;   // Light gray border
  border-radius: 16px;         // Rounded corners
  font-weight: bold;           // Make text bold
  box-shadow: 0.5px 0.5px 0 1px #c0c0c0; // Light shadow for depth effect
  margin-left: auto;           // Push chip to the far right of the container
  margin-right: 16px;          // Add space on the right side of the chip
`

// Styled component for the text inside the chip
const Text = styled.label`
  padding: 0 8px;             // Add horizontal padding to make the text more readable
  font-size: 14px;            // Set font size
`

// Export the PokeMarkChip component to be used in other parts of the application
export default PokeMarkChip;
