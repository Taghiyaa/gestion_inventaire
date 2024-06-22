// src/components/Navbar.js
import React from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #4A47A3;
    color: white;
`;

const Profile = styled.div`
    display: flex;
    align-items: center;
`;

const ProfileImg = styled.img`
    border-radius: 50%;
    margin-left: 0.5rem;
`;

const Navbar = () => {
    return (
        <NavbarContainer>
            <h1>Inventaire</h1>
            <Profile>
                <span>Sagan Chime</span>
                <ProfileImg src="profile-pic-url" alt="Profile" />
            </Profile>
        </NavbarContainer>
    );
};

export default Navbar;