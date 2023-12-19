import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonText } from "@ionic/react";
import "../theme/card.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../storage/actions/userActions";
import { memo, useEffect, useState } from "react";

const AccountView = memo(() => {
  const token = useSelector((state: any) => state.user.token);
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.login);

  const onLogoutClick = () => {
    dispatch(logoutAction());
  }


  return (
    <IonCard className="card">
      <IonCardHeader>
        <IonCardTitle>Account statistics</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <div style={{ padding: '2%', textAlign: 'left' }}>
          <IonText>
            <h3>Account name: <span style={{ fontWeight: 'bold' }}>{user}</span></h3>
          </IonText>
        </div>
        <div style={{ marginTop: '1%', marginBottom: '1%', display: 'flex', justifyContent: 'space-evenly' }}>
          <IonButton fill="outline" style={{ width: '52%', margin: "5px" }} color={'danger'} onClick={onLogoutClick}>Logout</IonButton>
        </div>
      </IonCardContent>
    </IonCard>
  )
});

export default AccountView;