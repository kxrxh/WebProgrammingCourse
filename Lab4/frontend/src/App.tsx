import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { personCircle, rocket, informationCircle } from 'ionicons/icons';
import MainPage from './pages/MainPage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import AccountPage from './pages/AccountPage';
import InfoPage from './pages/InfoPage';
import { useSelector } from 'react-redux';

setupIonicReact();

function App() {
  const isLogged = useSelector((state: any) => state.user.isLogin);
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/account">
              <AccountPage />
            </Route>
            <Route exact path="/main">
              <MainPage />
            </Route>
            <Route exact path="/">
              <Redirect to={isLogged ? "/main" : "/account"} />
            </Route>
            <Route exact path="/credits">
              <InfoPage />
            </Route>
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="graph_tab" href="/main" disabled={!isLogged}>
              <IonIcon aria-hidden="true" icon={rocket} />
              <IonLabel>Graph</IonLabel>
            </IonTabButton>
            <IonTabButton tab="account_tab" href="/account">
              <IonIcon aria-hidden="true" icon={personCircle} />
              <IonLabel>Account</IonLabel>
            </IonTabButton>
            <IonTabButton tab="credits" href="/credits" >
              <IonIcon aria-hidden="true" icon={informationCircle} />
              <IonLabel>Info</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
