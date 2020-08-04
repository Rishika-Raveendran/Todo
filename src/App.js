import React, { useState } from "react";
import {
  IonApp,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonIcon,
  IonButton,
  IonList,
  IonModal,
  IonAlert,
} from "@ionic/react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";

import { addOutline } from "ionicons/icons";
import "@ionic/react/css/core.css";

import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "./App.css";

function App() {
  const [state, setState] = useState();

  const [showModal, setShowModal] = useState(false);
  const [temp_task, setTask] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const SortableItem = SortableElement(({ value, index }) => (
    <IonItem key={value.id} index={index} className={"list" + value.position}>
      {value.task}
    </IonItem>
  ));

  const SortableList = SortableContainer(({ items }) => (
    <IonList>
      {items
        .sort((a, b) => a.position - b.position)
        .map((value, index) => (
          <SortableItem value={value} index={index} key={value.id} />
        ))}
    </IonList>
  ));

  const onSortEnd = ({ oldIndex, newIndex }) => {
    let arr = arrayMove(state, oldIndex, newIndex);
    for (let i = 0; i < arr.length; ++i) {
      arr[i].position = i;
    }
    setState(arr);
  };
  const handleClick = () => {
    setShowModal(true);
  };
  const handleOnchange = (event) => {
    setTask(event.target.value);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    let newTodos = state ? [...state] : [];
    let pos = state ? state.length : 0;
    newTodos.splice(pos, 0, {
      position: pos,
      id: pos,
      task: temp_task,
    });
    setState(newTodos);

    setShowAlert(true);
  };

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar color="dark">
          <IonTitle className="app-title">ToDos...</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="list-container">
        <IonGrid>
          <IonRow>
            <IonCol>
              {" "}
              <SortableList
                items={
                  state
                    ? state
                    : [{ position: 999, id: 1, task: "You are free....!!!!!!" }]
                }
                onSortEnd={onSortEnd}
                axis="y"
              />
              ;
            </IonCol>
          </IonRow>
          <IonRow style={{ marginTop: "2vh" }}>
            <IonCol size="1" offset="8" offsetMd="11">
              <IonButton
                shape="round"
                color="dark"
                onClick={handleClick}
                className="add-button"
              >
                <IonIcon icon={addOutline}></IonIcon>
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="8" offset="2">
              <IonModal
                isOpen={showModal}
                cssClass="modal"
                backdropDismiss="false"
              >
                <IonHeader>
                  <IonToolbar>
                    <IonTitle className="app-title">ADD TASK</IonTitle>
                  </IonToolbar>
                </IonHeader>
                <IonContent>
                  <IonRow className="motiv">
                    Let's not forget anything..!!
                  </IonRow>
                  <IonList>
                    <IonItem>
                      <IonLabel>
                        Enter the to do item to be added below
                      </IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonInput
                        type="text"
                        placeholder=" Let's not forget anything!"
                        clearInput="true"
                        onIonChange={handleOnchange}
                      ></IonInput>
                    </IonItem>
                  </IonList>
                  <IonItem>
                    <IonCol size="5" offset="">
                      <IonButton onClick={handleAdd} size="large">
                        Add task
                      </IonButton>
                    </IonCol>
                    <IonCol size="4" offset="1">
                      <IonButton
                        color="danger"
                        onClick={() => setShowModal(false)}
                        size="large"
                      >
                        Cancel
                      </IonButton>
                    </IonCol>
                  </IonItem>
                </IonContent>
              </IonModal>
            </IonCol>
          </IonRow>
          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            cssClass="my-custom-class"
            header={"Task added"}
            buttons={["OK"]}
          />
        </IonGrid>
      </IonContent>
    </IonApp>
  );
}

export default App;
