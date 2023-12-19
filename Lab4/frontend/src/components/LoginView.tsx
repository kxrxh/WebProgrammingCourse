import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonInput } from "@ionic/react";
import { useRef, useState } from "react";
import Alert from "./Alert";
import "../theme/card.css";
import { useDispatch } from "react-redux";
import { loginAction } from "../storage/actions/userActions";
import { loginToAccount, registerNewAccount } from "../api";


function LoginView() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [header, setHeader] = useState("");
  const ionLoginInput = useRef<HTMLIonInputElement>(null);
  const ionPasswordInput = useRef<HTMLIonInputElement>(null);
  const onLabelClick = () => {
    window.open("https://www.youtube.com/watch?v=kWsXajv6rS8");
  }

  const onLoginClick = async () => {
    if (ionLoginInput.current && ionPasswordInput.current) {
      const userName = ionLoginInput.current.value as string;
      const password = ionPasswordInput.current.value as string;

      if (userName === "" || password === "") {
        setMessage("Some of the inputs are empty!");
        setIsOpen(true);
        return;
      }

      try {
        const data = await loginToAccount(userName, password);

        if (data) {
          dispatch(loginAction(userName, data.token));
        } else {
          setMessage("Something went wrong!");
          setHeader("Server error");
          clearPasswordInput();
          setIsOpen(true);
        }
      } catch (error) {
        setMessage("Wrong login or password!");
        setHeader("Error");
        clearPasswordInput();
        setIsOpen(true);
      }
    }
  };


  const onRegisterClick = () => {
    if (ionLoginInput.current && ionPasswordInput.current) {
      const userName = ionLoginInput.current.value as string;
      const password = ionPasswordInput.current.value as string;
      if (userName === "" || password === "") {
        setMessage("Some of the inputs are empty!");
        setIsOpen(true);
        return;
      }

      registerNewAccount(userName, password).then(() => {
        setHeader("Success");
        setMessage("Account created!");
        setIsOpen(true);
      }).catch((error) => {
        if (error) {
          setMessage("Something went wrong! Maybe this user already exists?");
          setHeader("Error");
          clearPasswordInput();
          setIsOpen(true);
          return;
        }
      });
    }
  }

  const clearPasswordInput = () => {
    if (ionPasswordInput.current) {
      ionPasswordInput.current.value = "";
    }
  }

  return (
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
        <Alert header={header} message={message} buttons={["OK"]} isOpen={isOpen} setIsOpen={setIsOpen} />
      </IonCardContent>
    </IonCard>
  );
}

export default LoginView;