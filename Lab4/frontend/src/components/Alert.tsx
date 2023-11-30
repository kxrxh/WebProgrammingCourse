import { IonAlert } from "@ionic/react";

function Alert({ header, message, buttons, isOpen, setIsOpen }:
    { header: string, message: string, buttons: string[], isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) {
    return (
        <>
            <IonAlert
                isOpen={isOpen}
                header={header}
                message={message}
                buttons={buttons}
                onDidDismiss={() => setIsOpen(false)}
            ></IonAlert>
        </>
    );
}

export default Alert;