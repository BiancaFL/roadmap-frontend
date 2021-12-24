import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    :root {
        --primary: #5c6bc0;
        --plight: #8e99f3;
        --pdark: #26418f;
        --secondary: #aed581;
        --slight: #e1ffb1;
        --sdark: #7da453;
        --red: #e53935;
        --grey: #8c8c8c;
        --darkGrey: #4a4a4a;
        --lightGrey: #f5f5f5;
        --mediumGrey: #e5e5e5;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Nunito Sans', sans-serif;
    }

    body {
        font-family: 'Nunito Sans', sans-serif;
        font-size: 16px;
        color: white;
        margin: 0px;
        height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: row;
    }
`;