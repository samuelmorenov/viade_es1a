import React from "react";
import { observer } from "mobx-react";
import { LoggedOut, LoggedIn } from "@solid/react";


import logo from "../static/images/ViaDe.svg";
import User from "./login/User";
import LoginButton from "./login/LoginButton";
import UploadToPod from "./solidPod/UploadToPod";
import Map from "./map/Map";
import Share from "./share/Share";
import Notification from "./notifications/Notification";


import "../static/css/Main.css";

class Main extends React.Component {
  render() {

    return (
      
      <div className="app" data-testid="App">
        <div className="container" data-testid="container">
          <div className="identification">
            <LoggedOut>
              <img src={logo} className="App-logo" alt="logo" data-testid="logo"/>
              <h2 data-testid="IniciaSesion">Iniciar sesión</h2>
              <LoginButton/>
            </LoggedOut>
          </div>

          <LoggedIn>
            <div className = "nav">
              <div className = "nav nav-usr"><User /></div>
              <Notification />
              <div className = "lgnBtn"><LoginButton /></div>
            </div>

            <Map />
            <UploadToPod />

            <div className = "share">
              <div className = "shrCmp"><Share /></div>
            </div>

          </LoggedIn>
        </div>
      </div>
    );
  }
}

export default observer(Main);