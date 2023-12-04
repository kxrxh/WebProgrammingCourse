import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import AccountView from '../components/AccountView';
import LoginView from '../components/LoginView';
import { useSelector } from 'react-redux';

function AccountPage() {
  const isLoggedIn = useSelector((state: any) => state.user.isLogin);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle size="large">{isLoggedIn ? 'Account' : 'Login'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div style={{ display: "flex", justifyContent: "center", }}>
          {isLoggedIn ? <AccountView /> : <LoginView />}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AccountPage;
