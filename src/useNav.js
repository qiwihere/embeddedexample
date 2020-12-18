import {StartPage} from "./pages/StartPage/StartPage.jsx";
import React, {useEffect, useState} from "react";
import {Users} from "./pages/Users/Users.jsx";
import {Channels} from "./pages/Channels/Channels.jsx";
import {Settings} from "./pages/Settings/Settings.jsx";
import {callApi} from "./callApi";

export const useNav = (users, domain, install) => {
    const [token, setToken] = useState(null)
    const [curPage, setPage] = useState('StartPage')

    useEffect( ()=>{
        callApi('domainGet', {domain})
            .then(domainData=>{
                if(domainData){
                    setToken(domainData.token)
                    setPage(domainData.token?'Users':'StartPage')
                }
            })
    },[domain, token])

    const pages = {
        'StartPage': {
            component: <StartPage domain={domain} setToken={setToken} setPage={setPage} install={install}/>
        },
        'Users': {
            component: <Users setPage = {setPage} domain={domain} users={users}/>,
            navTitle: 'Пользователи'
        },
        'Channels': {
            component: <Channels setPage = {setPage} domain={domain}/>,
            navTitle: 'Каналы и чаты'
        },
        'Settings': {
            component: <Settings setPage = {setPage} domain={domain} token={token} setToken={setToken}/>,
            navTitle: 'Настройки',
        },
    }

    return {curPage, setPage, pages}
}