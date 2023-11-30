import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './AccountPage.css';
import { useEffect, useState } from 'react';
import AccountView from '../components/AccountView';
import LoginView from '../components/LoginView';

function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  useEffect(() => { }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle size="large">{isLoggedIn ? 'Account' : 'Login'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {isLoggedIn ? <AccountView /> : <LoginView />}
      </IonContent>
    </IonPage>
  );
};

export default AccountPage;
