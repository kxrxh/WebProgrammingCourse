import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonInput, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import Alert from '../components/Alert';
import Graph from '../components/Graph';
import "../theme/card.css";
import { arrowUp } from 'ionicons/icons';
import { TableRow, addPoint, clearRecords, fetchPointsWithToken } from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../storage/actions/userActions';
import formatDate from '../utils';
import { GraphData } from '../utils/graph';


function MainPage() {
  const [forceUpdateGraph, setForceUpdateGraph] = useState(false);
  const dispatch = useDispatch();
  const [valueOfR, setValueOfR] = useState("R");
  const [message, setMessage] = useState("");
  const [rows, setRows] = useState<TableRow[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const xInput = useRef<HTMLIonInputElement>(null);
  const yInput = useRef<HTMLIonInputElement>(null);
  const rInput = useRef<HTMLIonInputElement>(null);
  const contentRef = useRef<HTMLIonContentElement>(null);
  const token = useSelector((state: any) => state.user.token);

  useEffect(() => {
    if (token) {
      updateTable();
      setForceUpdateGraph((prev) => !prev);
    }
  }, [token])
  /**
   * Asynchronously updates the table with new data points.
   * Fetches points using the provided token and rInput value,
   * dispatches a logout action on unauthorized error, or shows
   * an alert for other errors. Updates state with new table rows.
   *
   * @param {string} token - The authentication token.
   * @return {void} No return value.
   */
  const updateTable = async () => {
    fetchPointsWithToken(token, parseFloat(rInput.current!.value as string)).catch((error) => {
      if (error.message == "Unauthorized!") {
        dispatch(logoutAction());
        return;
      }
      showAlert("Something went wrong! Unable to fetch points!");
    }).then((data) => {
      let newRows: TableRow[] = [];
      const points: GraphData = data['points'];
      points.forEach((row) => {
        const newRow: TableRow = {
          x: row['x'],
          y: row['y'],
          r: row['r'],
          hit: row['hit'],
          time: row['time'],
        }
        newRows.push(newRow);
      })
      setRows(newRows);
    });
  }

  useEffect(() => {
    updateTable();
  }, [token]);
  const showAlert = (msg: string) => {
    setMessage(msg);
    setIsOpen(true);
  };

  const onPushClick = async () => {
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

    await addPoint(token, x, y, parseFloat(rInput.current.value as string)).then((data) => {
      const point = data['points'][0];
      const newRow: TableRow = {
        x: point['x'],
        y: point['y'],
        r: point['r'],
        hit: point['hit'],
        time: point['time'],
      }
      setRows([...rows, newRow]);
      setForceUpdateGraph((prev) => !prev);
    }).catch((error) => {
      if (error.message == "Unauthorized!") {
        dispatch(logoutAction());
        return;
      }
      showAlert("Something went wrong! Unable to add point!");
    });
  }


  const onClearClick = async () => {
    clearRecords(token, parseFloat(valueOfR)).catch((error) => {
      if (error.message == "Unauthorized!") {
        dispatch(logoutAction());
        return;
      }
      showAlert("Something went wrong! Unable to clear records!");
    }).then(() => {
      setRows([]);
      setForceUpdateGraph((prev) => !prev);
    });
  };

  const onRInputChange = (event: CustomEvent) => {
    if (event.detail.value == "") {
      return;
    }
    const r = parseFloat(event.detail.value as string);
    if (r > 3 || r <= 0) {
      rInput.current!.value = "";
      setValueOfR("R");
      showAlert("R value is out of range!");
      return;
    }
    setValueOfR(event.detail.value);
    updateTable();
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
                placeholder="0...3"
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
              <Graph rValue={valueOfR} updateTable={updateTable} forceUpdate={forceUpdateGraph} />
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
                    <IonCol>{Number(row.x).toFixed(3)}</IonCol>
                    <IonCol>{Number(row.y).toFixed(3)}</IonCol>
                    <IonCol>{Number(row.r).toFixed(3)}</IonCol>
                    <IonCol>{row.hit ? "Yes" : "No"}</IonCol>
                    <IonCol>{formatDate(new Date(row.time))}</IonCol>
                  </IonRow>
                ))}
              </IonGrid>
            </IonCardContent>
          </IonCard>
        </div>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={scrollToTop}>
            <IonIcon icon={arrowUp} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default MainPage;
