import { IonContent, IonHeader, IonIcon, IonPage, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { logoGithub } from "ionicons/icons";
import "./InfoPage.css";
function InfoPage() {
  const appName = "Laboratory work #4";
  const authorName = "Parkhomenko Kirill";
  const isuId = "367468";
  const taskId = "2304";
  const githubUrl = "https://github.com/kxrxh/WebProgrammingCourse/Lab4";

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle size="large">App credits</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-evenly' }}>
          <div style={{ textAlign: 'center' }}>
            <IonText>
              <h1>{appName}</h1>
            </IonText>
          </div>
          <div style={{ textAlign: 'center' }}>
            <IonText>
              <p>Author: {authorName}</p>
            </IonText>
            <IonText>
              <p>ISU ID: {isuId}</p>
            </IonText>
            <IonText>
              <p>Task ID: {taskId}</p>
            </IonText>
          </div>
          <div style={{ textAlign: 'center' }}>
            <IonIcon
              icon={logoGithub}
              className="rainbow-effect"
              onClick={() => window.open(githubUrl)}
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default InfoPage;