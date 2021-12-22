import React from "react";

import Search from "../../components/search";

import "./Home.scss";

function Home() {
  return (
    <div className="Home">
      <div className="blue_block">
        <div className="homepage_title">
          <div className="homepage_title_words">FINDING YOUR NEXT CAR</div>
          <div className="homepage_title_words highlighted_text">
            JUST GOT EASIER
          </div>
        </div>
      </div>
      <div className="elements_container center_search">
        <div className="searchbox_pos">
          <Search />
        </div>
      </div>
    </div>
  );
}

export default Home;
