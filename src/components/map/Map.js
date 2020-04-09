import React from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
import Button from "../basics/BasicButton";
import MapList from "../solidPod/MapList";
import properties from "../commons/Properties";

const Wrapper = styled.div`
    width: 900px;
    height: 600px;
`;

class Map extends React.Component {

    constructor(props) {
        super(props);
        this.actual = 0;
        this.layer = null;
    }

    componentDidMount() {
        this.map = L.map("map", {
            center: [43.3602900, -5.8447600],
            zoom: 10,
            zoomControl: false
        });
        this.setLayer();
    }

    handleFiles(fileJson) {
        let center = [];
        center[0] = fileJson.features[0].geometry.coordinates[0][1];
        center[1] = fileJson.features[0].geometry.coordinates[1][0];
        this.map.setView(center, 15);
        L.geoJSON(fileJson).addTo(this.map);
    }

    async cambiar() {
        this.actual = this.actual+1;
        if(this.actual >= properties.layers.length){
            this.actual=0;
        }

        this.layer.removeFrom(this.map);
        this.setLayer();
    }

    setLayer(){
        this.layer = L.tileLayer(
            properties.layers[this.actual], {
            detectRetina: true,
            maxZoom: 20,
            maxNativeZoom: 17
        });
        this.layer.addTo(this.map);
    }

    render() {
        return (
            <div className="Map">
                <Button
                    class="btn"
                    text="Cambiar layer"
                    disabled={false}
                    onClick={() => this.cambiar()}
                />
                <Wrapper id="map" />
                <MapList handleFiles={this.handleFiles.bind(this)} />
            </div>

        );
    }
}

export default Map;