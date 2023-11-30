import { IonAlert, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonInput, IonToast } from "@ionic/react";
import { useState } from "react";
import Alert from "./Alert";

const containerStyle = {
  marginTop: 'calc(50vh - 250px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

const cardStyle = {
  width: 'calc(800px + 1%)',
};

function LoginView() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const onLabelClick = () => {
    window.open("https://www.youtube.com/watch?v=kWsXajv6rS8");
  }

  const onLoginClick = () => {
    setMessage("Wrong login or password!");
    setIsOpen(true);
  }

  const onRegisterClick = () => {
    setMessage("User with this login already exists!");
    setIsOpen(true);
  }

  return (
    <div style={containerStyle}>
      <IonCard style={cardStyle}>
        <IonCardHeader>
          <IonCardTitle>Ho-ho-ho! <span onClick={onLabelClick} style={{ cursor: "pointer" }}>🎅</span></IonCardTitle>
        </IonCardHeader>
        <IonCardContent style={{ padding: "5%" }}>
          <IonInput label="Login" labelPlacement="floating" fill="outline" placeholder="Your login" style={{ marginBottom: "10px" }}></IonInput>
          <IonInput
            label="Password"
            labelPlacement="floating"
            fill="outline"
            placeholder="Your password"
            type="password"
            style={{ marginBottom: "10px" }}>
          </IonInput>
          <IonButton fill="outline" expand="block" style={{ marginTop: "20px" }} onClick={onLoginClick}>Sing in</IonButton>
          <IonButton fill="outline" expand="block" color="warning" style={{ marginTop: "10px" }} onClick={onRegisterClick}>Sing up</IonButton>
          <Alert header="Error" message={message} buttons={["OK"]} isOpen={isOpen} setIsOpen={setIsOpen} />
        </IonCardContent>
      </IonCard>
    </div>
  );
}

export default LoginView;