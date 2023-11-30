import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonInput } from "@ionic/react";
import { useRef, useState } from "react";
import Alert from "./Alert";
import "../theme/card.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../storage/actions/userActions";


function LoginView() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const ionLoginInput = useRef<HTMLIonInputElement>(null);
  const ionPasswordInput = useRef<HTMLIonInputElement>(null);
  const onLabelClick = () => {
    window.open("https://www.youtube.com/watch?v=kWsXajv6rS8");
  }

  const onLoginClick = () => {
    if (ionLoginInput.current && ionPasswordInput.current) {
      if (ionLoginInput.current.value === "kxrxh" && ionPasswordInput.current.value === "12345") {
        dispatch(login(ionLoginInput.current.value, ionPasswordInput.current.value));
      } else {
        setMessage("Wrong login or password!");
        clearPasswordInput();
        setIsOpen(true);
      }
    }
  }

  const onRegisterClick = () => {
    setMessage("User with this login already exists!");
    setIsOpen(true);
  }

  const clearPasswordInput = () => {
    if (ionPasswordInput.current) {
      ionPasswordInput.current.value = "";
    }
  }

  return (
    <div className="card-container">
      <IonCard className="card">
        <IonCardHeader>
          <IonCardTitle>Ho-ho-ho! <span onClick={onLabelClick} style={{ cursor: "pointer" }}>🎅</span></IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonInput label="Login"
            labelPlacement="floating"
            fill="outline"
            placeholder="Your login"
            ref={ionLoginInput}
            style={{ marginBottom: "10px" }} />
          <IonInput
            label="Password"
            labelPlacement="floating"
            fill="outline"
            placeholder="Your password"
            type="password"
            ref={ionPasswordInput}
            style={{ marginBottom: "1%" }} />
          <IonButton fill="outline" expand="block" style={{ marginTop: "20px" }} onClick={onLoginClick}>Sing in</IonButton>
          <IonButton fill="outline" expand="block" color="warning" style={{ marginTop: "10px" }} onClick={onRegisterClick}>Sing up</IonButton>
          <Alert header="Error" message={message} buttons={["OK"]} isOpen={isOpen} setIsOpen={setIsOpen} />
        </IonCardContent>
      </IonCard>
    </div>
  );
}

export default LoginView;