import { SettingsContainer, ExampleImageContainer, ExampleImage, ExampleAreaRect, FlexRowContainer } from "./styles"
import { Typography, Switch, Container, FormControlLabel, TextField, Slider, InputButton, AppBar, Toolbar, IconButton } from "@mui/material"
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import InfoButton from "../InfoButton"

export default function Settings(
    {
        onChangeAlt, 
        altValue,
        onChangeZoom,
        zoomValue,
        onChangeZoomTime,
        zoomTimeValue,
        onChangeZoomOffset,
        zoomOffsetValue,
        closeDrawer
    }) {
    return (
        <SettingsContainer>
            <AppBar position="static" sx={{marginBottom: "15px"}}>
                <Toolbar sx={{justifyContent: "space-between"}}>
                    <Typography variant="h5">Configurações</Typography>
                    <IconButton onClick={closeDrawer}>
                        <ArrowRightIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <FlexRowContainer>
                <FormControlLabel
                    value="alts"
                    label="Alts"
                    labelPlacement="start"
                    control={<Switch checked={altValue} onChange={(e) => {onChangeAlt(e.target.checked)}}/>}
                />
                <InfoButton text="Ativa ou desativa os alts dos personagens"/>
            </FlexRowContainer>
            <FlexRowContainer>
                <TextField
                    type="number"
                    label="Zoom Inicial"
                    error={zoomValue === "" || zoomValue === "0"}
                    inputProps={{inputMode: "numeric", pattern: "[0-9]*"}}
                    value={zoomValue}
                    onChange={(e) => {onChangeZoom(e.target.value)}}
                    margin="normal"
                />
                <InfoButton text="Multiplicador do zoom inicial. Ex: 20 = zoom de x20" />
            </FlexRowContainer>
            <FlexRowContainer>
                <TextField
                    type="number"
                    label="Tempo do Zoom"
                    error={zoomTimeValue === "" || zoomTimeValue === "0"}
                    inputProps={{inputMode: "numeric", pattern: "[0-9]*"}}
                    value={zoomTimeValue}
                    onChange={(e) => {onChangeZoomTime(e.target.value)}}
                    margin="normal"
                />
                <InfoButton text="Tempo em segundos que demora pra ir do zoom inicial até sem zoom" />
            </FlexRowContainer>
            <FlexRowContainer>
                <FormControlLabel
                    value="zoomOffset"
                    label="Possíveis posições iniciais"
                    labelPlacement="top"
                    control={<Slider
                        value={zoomOffsetValue}
                        onChange={(e) => {onChangeZoomOffset(e.target.value)}}
                        min={0}
                        max={100}
                    />}
                />
                <InfoButton text="Área dentro da qual pode ser a posição do zoom. No mínimo, o zoom inicial sempre será no centro, no máximo, poderá ser em qualquer lugar da imagem (cai muitas vezes no branco)" />
            </FlexRowContainer>
            <ExampleImageContainer>
                <ExampleAreaRect zoomOffset={zoomOffsetValue}/>
                <ExampleImage src="https://www.smashbros.com/assets_v2/img/fighter/link/main.png" />
            </ExampleImageContainer>

        </SettingsContainer>
    )
}