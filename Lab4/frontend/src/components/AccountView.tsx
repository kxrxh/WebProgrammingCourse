import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonText } from "@ionic/react";
import "../theme/card.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../storage/actions/userActions";

const timeStampToDate = (timeStamp: number) => {
    const date = new Date(timeStamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}.${month}.${year}`
}

function AccountView() {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.login);
    const data = new Date().getTime();
    const points = 0;
    const total = 0;

    const onLogoutClick = () => {
        dispatch(logout());
    }

    const onPasswordChangeClick = () => {

    }

    return (
        <div className="card-container">
            <IonCard className="card">
                <IonCardHeader>
                    <IonCardTitle>Account statistics</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <div style={{ padding: '2%', textAlign: 'left' }}>
                        <IonText>
                            <h3>Account name: <span style={{ fontWeight: 'bold' }}>{user}</span></h3>
                            <h3>Account creation date: <span style={{ fontWeight: 'bold' }}>{timeStampToDate(data)}</span></h3>
                            <h3>Total point placed: <span style={{ fontWeight: 'bold' }}>{total}</span></h3>
                            <h3>Current number of points: <span style={{ fontWeight: 'bold' }}>{points}</span></h3>
                        </IonText>
                    </div>
                    <div style={{ marginTop: '1%', marginBottom: '1%', display: 'flex', justifyContent: 'space-evenly' }}>
                        <IonButton fill="outline" style={{ width: '52%', margin: "5px" }} color={"warning"}>Change password</IonButton>
                        <IonButton fill="outline" style={{ width: '52%', margin: "5px" }} color={'danger'}>Delete account</IonButton>
                    </div>
                    <IonButton fill="clear" expand="block" onClick={onLogoutClick}>Logout</IonButton>
                </IonCardContent>
            </IonCard>
        </div>
    )
}

export default AccountView;