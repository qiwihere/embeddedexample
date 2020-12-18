import React from "react";

import {App as SApp} from "./App.js";
import {Header} from "./components/Header.jsx";
import {useNav} from "./useNav";
import {Footer} from "./components/Footer.jsx";
import {Faq} from "./pages/Faq/Faq.jsx";

export const App = props => {
  const {curPage, setPage, pages} = useNav(props.users, props.domain, props.install)
  return <SApp>
    <Header
        curPage={curPage}
        pages={pages}
        setPage={setPage} />
    <Faq />
    <div className="workarea">
      {pages[curPage].component}
      <Footer />
    </div>
  </SApp>

}
