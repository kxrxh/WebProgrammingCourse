import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './MainPage.css';

const MainPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Graph view</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      </IonContent>
    </IonPage>
  );
};

export default MainPage;
