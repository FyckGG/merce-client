import React from "react";

const StateContext = React.createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {}
});

export const ContextProvider = ({children}) => {
    
    const [user, setUser] = React.useState({});
    const [token, _setToken] = React.useState(localStorage.getItem('ACCESS_TOKEN'));


    const setToken = (token) => {
        _setToken(token);

        if (token) localStorage.setItem('ACCESS_TOKEN', token);
        else localStorage.removeItem('ACCESS_TOKEN');
    }

    return (
        <StateContext.Provider value={{user, token, setUser, setToken}}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => React.useContext(StateContext);