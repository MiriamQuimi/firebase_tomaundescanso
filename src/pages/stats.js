import React from "react";
import firebase from "firebase";
import "./styles.css";
import _ from "lodash";
import ZingChart from "zingchart-react";

class Stats extends React.Component {
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
      config2: {},
      config4: {},
      config3: {}
    };
    firebase.initializeApp(this.config);
    this.db = firebase.database();
  }

  componentWillMount() {
    this.getchartData();
    this.getchartData2();
    this.create_new_user();
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
      data = data.reduce((r, a) => a.map((b, i) => (r[i] || 0) + b), []);
      var today = new Date();
      var date = today.getDay();
      for (var i = 7 - date - 1; i >= 0; i--) data.splice([i], 1);
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
  torecompensas() {
    window.location = "/recompensas";
  }
  getchartData2() {
    const refstats = this.db.ref("estadisticas");
    refstats.on("value", snapshot => {
      let stats = [];
      snapshot.forEach(child => {
        stats = [child.val(), ...stats];
      });
      let uniq = _.uniqBy(stats, "usuarioid");
      let data = [];
      let datahoy = [];
      data = uniq.map(a => a.poraplicaion);

      data.forEach(function(item) {
        datahoy = [
          item.filter(dia => {
            return dia.dia === 6;
          }),
          ...datahoy
        ];
      });
      let app = [];
      let uso = [];
      datahoy.forEach(function(item) {
        app = [item.map(a => a.app), ...app];

        uso = [item.map(a => a.uso), ...uso];
      });

      this.setState({
        config2: {
          type: "bar",
          title: {
            text: "Aplicaciones mas usadas(min)"
          },
          "scale-x": {
            values: app[0]
          },
          series: [
            {
              values: uso[0]
            }
          ]
        }
      });

      this.setState({
        config3: {
          type: "bar",
          title: {
            text: "Aplicaciones mas usadas(min)"
          },
          "scale-x": {
            values: app[1]
          },
          series: [
            {
              values: uso[1]
            }
          ]
        }
      });
    });
  }

  create_new_user() {
    const refgrupo = this.db.ref("grupo");
    refgrupo.on("value", snapshot => {
      let usuarios;
      let nombre;
      snapshot.forEach(child => {
        usuarios = [child.val().usuarios];
        nombre = [child.val().nombre];
        this.setState({ usuarios: usuarios });
        this.setState({ nombre: nombre });
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
        <p>
          Usuario: <br /> {this.state.usuariosnombre[2]}{" "}
        </p>
        <p>
          Fecha: <br /> {this.state.date.toDateString()}{" "}
        </p>

        <ZingChart data={this.state.config3} />

        <p className="w3-button w3-teal" onClick={this.torecompensas}>
          Recompensas {this.state.nombre}{" "}
        </p>
      </div>
    );
  }
}

export { Stats as default };
