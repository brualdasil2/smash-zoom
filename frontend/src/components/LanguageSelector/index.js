import React from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

import { Popover, Button, List, ListItem, ListSubheader } from "@mui/material"
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';


const languageMap = {
  en: { label: "English", dir: "ltr", active: true },
  br: { label: "Português", dir: "ltr", active: false }
};

export default function LanguageSelector() {
    const currLanguage = i18next.language
    let selected = "en"
    if (currLanguage in languageMap) {
        selected = currLanguage
    }
    console.log(selected)
    const { t } = useTranslation();
  
    const [menuAnchor, setMenuAnchor] = React.useState(null);
    React.useEffect(() => {
      document.body.dir = languageMap[selected].dir;
    }, [menuAnchor, selected]);
  
    return (
      <div className="d-flex justify-content-end align-items-center language-select-root">
        <Button onClick={({ currentTarget }) => setMenuAnchor(currentTarget)}>
          {languageMap[selected].label}
          <ArrowDropDown fontSize="small" />
        </Button>
        <Popover
          open={!!menuAnchor}
          anchorEl={menuAnchor}
          onClose={() => setMenuAnchor(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
        >
          <div>
            <List>
              <ListSubheader>{t("select_language")}</ListSubheader>
              {Object.keys(languageMap)?.map(item => (
                <ListItem
                  button
                  key={item}
                  onClick={() => {
                    i18next.changeLanguage(item);
                    setMenuAnchor(null);
                  }}
                >
                  {languageMap[item].label}
                </ListItem>
              ))}
            </List>
          </div>
        </Popover>
      </div>
    );
}

