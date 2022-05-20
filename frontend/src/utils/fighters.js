export function parseDisplayName(urlName) {
    if (urlName === "dq_hero")
        return "Hero"
    else if (urlName === "pyra")
        return "Pyra And Mythra"
    let parsedName = (urlName.replace(/_/g, " ")).replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase())
    return(parsedName)
}

export const fighters = [
    "mario",
    "donkey_kong",
    "link",
    "samus",
    "dark_samus",
    "yoshi",
    "kirby",
    "fox",
    "pikachu",
    "luigi",
    "ness",
    "captain_falcon",
    "jigglypuff",
    "peach",
    "daisy",
    "bowser",
    "ice_climbers",
    "sheik",
    "zelda",
    "dr_mario",
    "pichu",
    "falco",
    "marth",
    "lucina",
    "young_link",
    "ganondorf",
    "mewtwo",
    "roy",
    "chrom",
    "mr_game_and_watch",
    "meta_knight",
    "pit",
    "dark_pit",
    "zero_suit_samus",
    "wario",
    "snake",
    "ike",
    "pokemon_trainer",
    "diddy_kong",
    "lucas",
    "sonic",
    "king_dedede",
    "olimar",
    "lucario",
    "rob",
    "toon_link",
    "wolf",
    "villager",
    "mega_man",
    "wii_fit_trainer",
    "rosalina_and_luma",
    "little_mac",
    "greninja",
    "palutena",
    "pac_man",
    "robin",
    "shulk",
    "bowser_jr",
    "duck_hunt",
    "ryu",
    "ken",
    "cloud",
    "corrin",
    "bayonetta",
    "inkling",
    "ridley",
    "simon",
    "richter",
    "king_k_rool",
    "isabelle",
    "incineroar",
    "piranha_plant",
    "joker",
    "dq_hero",
    "banjo_and_kazooie",
    "terry",
    "byleth",
    "minmin",
    "steve",
    "sephiroth",
    "pyra",
    "kazuya",
    "sora"
]