import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Components
import GlobalNav from "./components/globalNav";
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import PostAd from "./pages/postAd";
import ManageAds from "./pages/manageAds";
import EditAd from "./pages/editAd";
import Results from "./pages/results";
import ListingPage from "./pages/listingPage";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <GlobalNav />
            <Home />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/signin">
            <Login />
          </Route>
          <Route path="/post">
            <GlobalNav size="smaller" />
            <PostAd />
          </Route>
          <Route path="/manageAds">
            <GlobalNav size="smaller" />
            <ManageAds />
          </Route>
          <Route path="/editAd">
            <GlobalNav size="smaller" />
            <EditAd />
          </Route>
          <Route path="/results">
            <GlobalNav size="medium" />
            <Results />
          </Route>
          <Route path="/listing">
            <GlobalNav size="small" />
            <ListingPage />
          </Route>
          <Route component={PageNotFound}>
            <GlobalNav size="small" />
            <PageNotFound/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
