import React, { PureComponent } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
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
import { getUsers } from "../../reducers/users";

const Wrapper = styled.div`
  flex: 0 0 75vw;
`;

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

var overlay = new Overlay({
  element: document.getElementById("popup-container"),
  positioning: "bottom-center",
  offset: [0, -10],
});

map.addOverlay(overlay);

class MapSection extends PureComponent {
  static defultProps = {
    users: [],
  };

  componentDidMount() {
    map.setTarget(this.element);
    map.on("click", this.showPopupOnClick);
  }

  componentWillUnmount() {
    map.un("click", this.showPopupOnClick);
  }
  componentWillReceiveProps(nextProps) {
    const { users } = nextProps;

    if (users && users.length) {
      const features = users.map(user => {
        return new Feature({
          geometry: new Point(proj.fromLonLat(user.geometry.coordinates)),
          userName: user.properties.userName,
          userEmail: user.properties.email,
        });
      });

      source.addFeatures(features);
    }
  }

  showPopupOnClick(e) {
    overlay.setPosition();
    var features = map.getFeaturesAtPixel(e.pixel);
    if (features) {
      const { userName, userEmail } = features[0].getProperties();
      var coords = features[0].getGeometry().getCoordinates();
      overlay.getElement().innerHTML = `<p>UserName: ${userName}</p><p>Email: ${userEmail}</p>`;
      overlay.setPosition(coords);
      map.getView().animate({ center: coords, zoom: 7 });
    }
  }

  render() {
    return (
      <Wrapper>
        <div
          style={{ height: "100%", width: "100%" }}
          ref={div => {
            this.element = div;
          }}
        />
      </Wrapper>
    );
  }
}

export default connect(state => ({ users: getUsers(state) }))(MapSection);
