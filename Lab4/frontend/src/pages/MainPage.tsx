import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonInput, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useRef, useState } from 'react';
import Alert from '../components/Alert';
import Graph from '../components/Graph';
import "../theme/card.css";
import { timeStampToDate } from '../utils';
import { arrowUp } from 'ionicons/icons';
import { TableRow } from '../api';

function MainPage() {
  const [valueOfR, setValueOfR] = useState("R");
  const [message, setMessage] = useState("");
  const [rows, setRows] = useState<TableRow[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const xInput = useRef<HTMLIonInputElement>(null);
  const yInput = useRef<HTMLIonInputElement>(null);
  const rInput = useRef<HTMLIonInputElement>(null);
  const contentRef = useRef<HTMLIonContentElement>(null);
  const showAlert = (msg: string) => {
    setMessage(msg);
    setIsOpen(true);
  };

  const onPushClick = () => {
    if (!xInput.current || !yInput.current || !rInput.current) {
      showAlert("Some of the inputs are empty!");
      return;
    }

    if (xInput.current.value == "") {
      showAlert("X value is empty or has incorrect format!");
      return;
    }

    if (yInput.current.value == "") {
      showAlert("Y value is empty or has incorrect format!");
      return;
    }

    if (rInput.current.value == "") {
      showAlert("R value is empty or has incorrect format!");
      return;
    }

    const x = parseFloat(xInput.current.value as string);
    if (-5 > x || x > 3) {
      showAlert("X value is out of range!");
      return;
    }

    const y = parseFloat(yInput.current.value as string);
    if (-3 > y || y > 3) {
      showAlert("Y value is out of range!");
      return;
    }

    if (valueOfR == "R" && rInput.current.value == "") {
      showAlert("R value is empty or has incorrect format!");
      return;
    }

    setRows((prevRows) => {
      const newRows = prevRows.concat({
        x: x,
        y: y,
        r: parseFloat(rInput.current!.value as string),
        hit: false,
        time: Date.now(),
      });
      return newRows;
    });
  }

  const onClearClick = () => {
    setRows([]);
  }

  const onRInputChange = (event: CustomEvent) => {
    if (event.detail.value == "") {
      return;
    }
    const r = parseFloat(event.detail.value as string);
    if (-5 > r || r > 3 || r == 0) {
      rInput.current!.value = "";
      setValueOfR("R");
      showAlert("R value is out of range!");
      return;
    }
    setValueOfR(event.detail.value);
  };

  function scrollToTop() {
    // Passing a duration to the method makes it so the scroll slowly
    // goes to the top instead of instantly
    contentRef.current!.scrollToTop(500);
  }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Graph view</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent ref={contentRef} fullscreen={true}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <IonCard className='card'>
            <IonCardHeader>
              <IonCardTitle>Inputs</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonInput label="X value"
                labelPlacement="floating"
                fill="outline"
                placeholder="-5...3"
                step='0.1'
                type="number"
                color={"success"}
                inputMode='decimal'
                ref={xInput}
                style={{ marginBottom: "2%" }} />
              <IonInput
                label="Y value"
                labelPlacement="floating"
                fill="outline"
                placeholder="-3...3"
                step='0.1'
                type="number"
                color={"warning"}
                inputMode='decimal'
                ref={yInput}
                style={{ marginBottom: "2%" }} />
              <IonInput
                label="R value"
                labelPlacement="floating"
                fill="outline"
                placeholder="-5...3"
                type="number"
                step='0.1'
                color={"danger"}
                onIonChange={onRInputChange}
                inputMode='decimal'
                ref={rInput}
                style={{ marginBottom: "1%" }} />
              <div style={{ marginTop: '3%', marginBottom: '1%', display: 'flex', justifyContent: 'space-evenly' }}>
                <IonButton fill="outline" style={{ width: '52%', margin: "5px" }} color={"success"} onClick={onPushClick}>Push</IonButton>
                <IonButton fill="outline" style={{ width: '52%', margin: "5px" }} color={'danger'} onClick={onClearClick}>Clear</IonButton>
              </div>
              <Alert header="Error 😔" message={message} buttons={["OK"]} isOpen={isOpen} setIsOpen={setIsOpen} />
              <Graph rValue={valueOfR} />
              <IonGrid style={{ textAlign: 'left' }}>
                <IonRow>
                  <IonCol><IonText color={"success"} ><h2>X</h2></IonText></IonCol>
                  <IonCol><IonText color={"warning"}><h2>Y</h2></IonText></IonCol>
                  <IonCol><IonText color={"danger"}><h2>R</h2></IonText></IonCol>
                  <IonCol><IonText color={"secondary"}><h2>Hit?</h2></IonText></IonCol>
                  <IonCol><IonText color={"tertiary"}><h2>Time</h2></IonText></IonCol>
                </IonRow>
                {rows.map((row, i) => (
                  <IonRow key={i}>
                    <IonCol>{row.x}</IonCol>
                    <IonCol>{row.y}</IonCol>
                    <IonCol>{row.r}</IonCol>
                    <IonCol>{row.hit ? "Yes" : "No"}</IonCol>
                    <IonCol>{timeStampToDate(row.time)}</IonCol>
                  </IonRow>
                ))}
              </IonGrid>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={scrollToTop}>
          <IonIcon icon={arrowUp} />
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default MainPage;
