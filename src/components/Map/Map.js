import React, { Component } from "react";
import { connect } from "react-redux";
import { isEqual } from "lodash";
import Map from "ol/map";
import View from "ol/view";
import TileLayer from "ol/layer/tile";
import XYZ from "ol/source/xyz";
import VectorSource from "ol/source/vector";
import VectorLayer from "ol/layer/vector";
import Feature from "ol/feature";
import Point from "ol/geom/point";
import proj from "ol/proj";
import Overlay from "ol/overlay";
import { getUsers, getCurrentUser } from "../../reducers/users";

const map = new Map({
  layers: [
    new TileLayer({
      source: new XYZ({
        url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      }),
    }),
  ],
  view: new View({
    center: [0, 0],
    zoom: 3,
  }),
});

const source = new VectorSource();
const vector = new VectorLayer({
  source: source,
});

map.addLayer(vector);

const overlay = new Overlay({
  element: document.getElementById("popup-container"),
  positioning: "bottom-center",
  offset: [0, -10],
});

map.addOverlay(overlay);

class MapSection extends Component {
  static defultProps = {
    users: [],
    currentUser: null,
  };

  componentDidMount() {
    map.setTarget(this.element);
    map.on("click", this.handleMapClick);
  }

  componentWillUnmount() {
    map.un("click", this.handleMapClick);
  }

  componentWillReceiveProps(nextProps) {
    const { users, currentUser } = nextProps;

    if (currentUser !== null && this.props.currentUser !== currentUser) {
      const feature = source.forEachFeature(
        feature =>
          feature.get("id") === parseInt(currentUser, 10) ? feature : false
      );
      if (feature) this.showPopup(feature);
    }

    if (users && users.length && !isEqual(this.props.users, nextProps.users)) {
      const features = users.map(
        user =>
          new Feature({
            geometry: new Point(proj.fromLonLat(user.geometry.coordinates)),
            id: user.id,
            userName: user.properties.userName,
            userEmail: user.properties.email,
          })
      );
      source.clear();
      source.addFeatures(features);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  handleMapClick = e => {
    overlay.setPosition();
    const features = map.getFeaturesAtPixel(e.pixel);
    if (features) this.showPopup(features[0]);
  };

  showPopup(feature) {
    const { userName, userEmail } = feature.getProperties();
    const coords = feature.getGeometry().getCoordinates();
    overlay.getElement().innerHTML = `<p>UserName: ${userName}</p><p>Email: ${userEmail}</p>`;
    overlay.setPosition(coords);
    map.getView().animate({ center: coords, zoom: 5 });
  }

  render() {
    return (
      <div
        style={{ height: "100%", width: "100%", backgroundColor: '#aad3df' }}
        ref={div => {
          this.element = div;
        }}
      />
    );
  }
}

export default connect(state => ({
  users: getUsers(state),
  currentUser: getCurrentUser(state),
}))(MapSection);
