import { SettingsContainer, ExampleImageContainer, ExampleImage, ExampleAreaRect } from "./styles"
import { Typography, Switch, Container, FormControlLabel, TextField, Slider } from "@mui/material"

export default function Settings(
    {
        onChangeAlt, 
        altValue,
        onChangeZoom,
        zoomValue,
        onChangeZoomTime,
        zoomTimeValue,
        onChangeZoomOffset,
        zoomOffsetValue
    }) {
    return (
        <SettingsContainer>
            <Typography variant="h4" sx={{marginBottom: "30px"}}>Configurações</Typography>
            <FormControlLabel 
                value="alts"
                label="Alts"
                labelPlacement="start"
                control={<Switch checked={altValue} onChange={(e) => {onChangeAlt(e.target.checked)}}/>}
            />
            <TextField 
                type="number"
                label="Zoom"
                error={zoomValue === "" || zoomValue === "0"}
                inputProps={{inputMode: "numeric", pattern: "[0-9]*"}}
                value={zoomValue}
                onChange={(e) => {onChangeZoom(e.target.value)}}
                margin="normal"
            />
            <TextField 
                type="number"
                label="Tempo do Zoom"
                error={zoomTimeValue === "" || zoomTimeValue === "0"}
                inputProps={{inputMode: "numeric", pattern: "[0-9]*"}}
                value={zoomTimeValue}
                onChange={(e) => {onChangeZoomTime(e.target.value)}}
                margin="normal"
            />
            <FormControlLabel 
                value="zoomOffset"
                label="Área de posição inicial"
                labelPlacement="top"
                control={<Slider 
                    value={zoomOffsetValue}
                    onChange={(e) => {onChangeZoomOffset(e.target.value)}}
                    min={0}
                    max={100}
                />}
            />
            <ExampleImageContainer>
                <ExampleAreaRect zoomOffset={zoomOffsetValue}/>
                <ExampleImage src="https://www.smashbros.com/assets_v2/img/fighter/link/main.png" />
            </ExampleImageContainer>

        </SettingsContainer>
    )
}