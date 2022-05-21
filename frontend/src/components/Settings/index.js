import { SettingsContainer, ExampleImageContainer, ExampleImage, ExampleAreaRect, FlexRowContainer } from "./styles"
import { Typography, Switch, Container, FormControlLabel, TextField, Slider, InputButton, AppBar, Toolbar, IconButton } from "@mui/material"
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import InfoButton from "../InfoButton"
import { useTranslation } from "react-i18next"

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

    const { t } = useTranslation()

    return (
        <SettingsContainer>
            <AppBar position="static" sx={{marginBottom: "15px"}}>
                <Toolbar sx={{justifyContent: "space-between"}}>
                    <Typography variant="h5">{t("settings")}</Typography>
                    <IconButton onClick={closeDrawer}>
                        <ArrowRightIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <FlexRowContainer>
                <FormControlLabel
                    value="alts"
                    label={t("alts")}
                    labelPlacement="start"
                    control={<Switch checked={altValue} onChange={(e) => {onChangeAlt(e.target.checked)}}/>}
                />
                <InfoButton text={t("alts_explanation")}/>
            </FlexRowContainer>
            <FlexRowContainer>
                <TextField
                    type="number"
                    label={t("initial_zoom")}
                    error={zoomValue === "" || zoomValue === "0"}
                    inputProps={{inputMode: "numeric", pattern: "[0-9]*"}}
                    value={zoomValue}
                    onChange={(e) => {onChangeZoom(e.target.value)}}
                    margin="normal"
                />
                <InfoButton text={t("zoom_explanation")} />
            </FlexRowContainer>
            <FlexRowContainer>
                <TextField
                    type="number"
                    label={t("zoom_time")}
                    error={zoomTimeValue === "" || zoomTimeValue === "0"}
                    inputProps={{inputMode: "numeric", pattern: "[0-9]*"}}
                    value={zoomTimeValue}
                    onChange={(e) => {onChangeZoomTime(e.target.value)}}
                    margin="normal"
                />
                <InfoButton text={t("zoom_time_explanation")} />
            </FlexRowContainer>
            <FlexRowContainer>
                <FormControlLabel
                    value="zoomOffset"
                    label={t("initial_positions")}
                    labelPlacement="top"
                    control={<Slider
                        value={zoomOffsetValue}
                        onChange={(e) => {onChangeZoomOffset(e.target.value)}}
                        min={0}
                        max={100}
                    />}
                />
                <InfoButton text={t("initial_positions_explanation")} />
            </FlexRowContainer>
            <ExampleImageContainer>
                <ExampleAreaRect zoomOffset={zoomOffsetValue}/>
                <ExampleImage src="https://www.smashbros.com/assets_v2/img/fighter/link/main.png" />
            </ExampleImageContainer>

        </SettingsContainer>
    )
}