import React from "react";
import firebase from "firebase";
import "./styles.css";
import _ from "lodash";
import ZingChart from "zingchart-react";

class Recompensas extends React.Component {
  constructor(props) {
    super(props);
    this.config = {
      apiKey: "AIzaSyCcAbh51zL7PXfKkYTwV3w0iaJkBsgAr-I",
      //authDomain: "test-50a74.firebaseapp.com",
      databaseURL: "https://tomaundescanso-4134d.firebaseio.com"
    };
    this.state = {
      usuarios: [""],
      usuariosnombre: [""],
      date: new Date(),
      nombre: "",
      total: "",
      config: {},
      config2: {}
    };
    firebase.initializeApp(this.config);
    this.db = firebase.database();
  }

  componentWillMount() {
    this.getchartData();
    this.listausuarios();
  }
  getchartData() {
    const refstats = this.db.ref("estadisticas");
    refstats.on("value", snapshot => {
      let stats = [];
      snapshot.forEach(child => {
        stats = [child.val(), ...stats];
      });
      let uniq = _.uniqBy(stats, "usuarioid");
      let data = [];
      data = uniq.map(a => a.total);
      console.log(data);
      data = data.map(arr => arr.reduce((a, b) => a + b, 0));
      this.setState({
        config: {
          type: "bar",
          title: {
            text: "Horas de Uso Diario Totales"
          },
          "scale-x": {
            values: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"]
          },
          series: [
            {
              values: data
            }
          ]
        }
      });
    });
  }

  listausuarios = () => {
    const refuser = this.db.ref("usuario");
    const refgrupo = this.db.ref("grupo");
    refgrupo.on("value", snapshot => {
      let nombre;
      snapshot.forEach(child => {
        nombre = [child.val().nombre];
        nombre = nombre.toString();
        refuser
          .orderByChild("grupo")
          .equalTo(nombre)
          .on("value", snapshot => {
            let nombre = [];
            snapshot.forEach(child => {
              nombre = [
                child.val().nombre + child.val().apellido,
                ",\n ",
                ...nombre
              ];
            });
            this.setState({ usuariosnombre: nombre });
            console.log(this.state.usuariosnombre);
          });
      });
    });
  };

  render() {
    return (
      <div className="col">
        <p className="w3-button w3-teal">Grupo: {this.state.nombre} </p>
        <h4>
          Usuarios: <br /> {this.state.usuariosnombre}{" "}
        </h4>
        <ZingChart data={this.state.config} />

        <p>
          Usuario: <br /> {this.state.usuariosnombre[0]}{" "}
        </p>
        <p>
          Fecha: <br /> {this.state.date.toDateString()}{" "}
        </p>
        <ZingChart data={this.state.config2} />
      </div>
    );
  }
}

export { Recompensas as default };
