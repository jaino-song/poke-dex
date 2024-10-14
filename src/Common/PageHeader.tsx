// Import styled components to style the Header, Title, and Select
import styled from "@emotion/styled";
// Import ChangeEvent type for handling events like onChange in form elements
import { ChangeEvent } from "react";
// Import useSelector to access values from the Redux store
import { useSelector } from "react-redux";
// Import Link for navigation between different routes/pages
import { Link } from "react-router-dom";
// Import constants for Pokémon image types, used in dropdown options
import { POKEMON_IMAGE_TYPE } from "../Constants";
// Import types and hooks from the store for accessing dispatch and state
import { RootState, useAppDispatch } from "../Store";
// Import action to change image type and type definitions
import { changeImageType, PokemonImageKeyType } from "../Store/ImageTypeSlice";

// Header component for the website
const PageHeader = () => {
    // Get the current image type from Redux store using useSelector
    const type = useSelector((state: RootState) => state.imageType.type);
    // Get dispatch function to dispatch actions to the Redux store
    const dispatch = useAppDispatch();
    
    // Handler function to change the Pokémon image type based on the selected value in dropdown
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(changeImageType({
            type: e.target.value as PokemonImageKeyType
        }));
    };

    return (
        <Header>
            <Title>
                {/* Link to the homepage */}
                <Link to={"/"}>Pokémon</Link>
            </Title>
            {/* Dropdown select for choosing Pokémon image type */}
            <Select value={type} onChange={handleChange}>
                <option value={POKEMON_IMAGE_TYPE.OFFICIAL_ARTWORK}>Official</option>
                <option value={POKEMON_IMAGE_TYPE.DREAM_WORLD}>Dream World</option>
                <option value={POKEMON_IMAGE_TYPE.FRONT_DEFAULT}>Front Default</option>
            </Select>
        </Header>
    );
};

// Styled component for Header section
const Header = styled.nav`
    display: flex;                // Use flexbox to align header items horizontally
    padding: 16px 32px;           // Apply padding to the top and bottom (16px), left and right (32px)
    margin-bottom: 16px;          // Margin below the header to add spacing
    border-bottom: 1px solid #c0c0c0; // Light gray border at the bottom
`;

// Styled component for Title of the page
const Title = styled.h1`
    margin: 0;                    // Remove any default margin
    font-size: 32px;              // Set font size for title
    color: #ffca09;               // Set the text color to a yellow shade
    text-shadow: 1px 0 blue, 0 2px blue, 1px 0 blue, 0 1px blue; // Add blue shadow to create an outlined effect
`;

// Styled component for Select dropdown
const Select = styled.select`
    display: flex;                // Use flexbox to align the dropdown
    margin-left: auto;            // Push the dropdown to the far right of the header
    margin-top: 3px;              // Add slight margin to the top for better alignment
    padding: 8px 12px;            // Apply padding inside the dropdown to make it easier to click
    border-radius: 8px;           // Make the dropdown corners rounded
    height: 25px;                 // Set a fixed height for the dropdown for consistency
`;

// Export PageHeader component to be used in other parts of the application
export default PageHeader;
