import React from "react";
import FileClient from "solid-file-client";
import auth from "solid-auth-client";
import ReactFileReader from "react-file-reader";
import { useWebId } from "@solid/react";
import properties from "../commons/Properties";
import { Button } from "react-bootstrap";

export const UploadHook = () => {
    let webid = String(String(useWebId()).replace(properties.profile, properties.myFolder));

    class UploadToPod extends React.Component {

        handleFiles = (files) => {
            var reader = new FileReader();
            reader.onload = function () {
                let fc = new FileClient(auth);
                let fileName = files[0].name;
                let url = webid+fileName;
                fc.createFile(url, reader.result, "text/turtle");
                alert("Archivo subido a rutas/"+fileName);
            };
            reader.readAsText(files[0]);
        };

        render() {
            return (
                <ReactFileReader handleFiles={this.handleFiles} fileTypes={".geojson"}>
                    <Button data-testid="subirjson">Subir Json a Solid</Button>
                </ReactFileReader>
            );
        }
    }
    return (<UploadToPod />);
};

export default UploadHook;