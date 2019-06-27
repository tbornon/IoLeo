import React, { useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { Line } from 'react-chartjs-2';


import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

import NewVarDialog from "../Components/NewVarDialog";
import NewGraphDialog from "../Components/NewGraphDialog";
import SpeedDial from "../Components/SpeedDial";
import { withSnackbar } from "../Components/SnackbarProvider";

import { api } from "../config";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(10),
    },
    toolbar: theme.mixins.toolbar,
}));

const rawData = {
    "2019-06-25 23:00:00": {
        "temperature": {
            "2m": 297,
            "sol": 296.2,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 102090
        },
        "pluie": 0.3,
        "pluie_convective": 0.3,
        "humidite": {
            "2m": 88.3
        },
        "vent_moyen": {
            "10m": 15.1
        },
        "vent_rafales": {
            "10m": 29.5
        },
        "vent_direction": {
            "10m": 375
        },
        "iso_zero": 4296,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 26,
            "moyenne": 0,
            "basse": 38,
            "totale": 62
        }
    },
    "2019-06-26 02:00:00": {
        "temperature": {
            "2m": 294.2,
            "sol": 293.8,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 102200
        },
        "pluie": 0.5,
        "pluie_convective": 0.5,
        "humidite": {
            "2m": 85.3
        },
        "vent_moyen": {
            "10m": 9.7
        },
        "vent_rafales": {
            "10m": 18.2
        },
        "vent_direction": {
            "10m": 370
        },
        "iso_zero": 4409,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 14,
            "moyenne": 0,
            "basse": 19,
            "totale": 32
        }
    },
    "2019-06-26 05:00:00": {
        "temperature": {
            "2m": 293.6,
            "sol": 293,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 102150
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 92.7
        },
        "vent_moyen": {
            "10m": 12.8
        },
        "vent_rafales": {
            "10m": 26.3
        },
        "vent_direction": {
            "10m": 395
        },
        "iso_zero": 4492,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 0,
            "moyenne": 0,
            "basse": 9,
            "totale": 9
        }
    },
    "2019-06-26 08:00:00": {
        "temperature": {
            "2m": 294.1,
            "sol": 292.6,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 102200
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 84.8
        },
        "vent_moyen": {
            "10m": 14.8
        },
        "vent_rafales": {
            "10m": 24.9
        },
        "vent_direction": {
            "10m": 392
        },
        "iso_zero": 4483,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 0,
            "moyenne": 0,
            "basse": 18,
            "totale": 18
        }
    },
    "2019-06-26 11:00:00": {
        "temperature": {
            "2m": 299,
            "sol": 296.4,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 102230
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 71.9
        },
        "vent_moyen": {
            "10m": 16.8
        },
        "vent_rafales": {
            "10m": 26.8
        },
        "vent_direction": {
            "10m": 407
        },
        "iso_zero": 4576,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 0,
            "moyenne": 0,
            "basse": 6,
            "totale": 6
        }
    },
    "2019-06-26 14:00:00": {
        "temperature": {
            "2m": 303.4,
            "sol": 300.6,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 102250
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 63.1
        },
        "vent_moyen": {
            "10m": 20.3
        },
        "vent_rafales": {
            "10m": 27.4
        },
        "vent_direction": {
            "10m": 416
        },
        "iso_zero": 4635,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 0,
            "moyenne": 0,
            "basse": 3,
            "totale": 3
        }
    },
    "2019-06-26 17:00:00": {
        "temperature": {
            "2m": 305,
            "sol": 302.6,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 102120
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 61.2
        },
        "vent_moyen": {
            "10m": 21.2
        },
        "vent_rafales": {
            "10m": 27
        },
        "vent_direction": {
            "10m": 420
        },
        "iso_zero": 4659,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 0,
            "moyenne": 0,
            "basse": 5,
            "totale": 5
        }
    },
    "2019-06-26 20:00:00": {
        "temperature": {
            "2m": 301.8,
            "sol": 300.3,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 102100
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 69.3
        },
        "vent_moyen": {
            "10m": 20.7
        },
        "vent_rafales": {
            "10m": 32.6
        },
        "vent_direction": {
            "10m": 407
        },
        "iso_zero": 4710,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 0,
            "moyenne": 0,
            "basse": 9,
            "totale": 9
        }
    },
    "2019-06-26 23:00:00": {
        "temperature": {
            "2m": 297.8,
            "sol": 297.1,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 102230
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 78.5
        },
        "vent_moyen": {
            "10m": 22.3
        },
        "vent_rafales": {
            "10m": 44.5
        },
        "vent_direction": {
            "10m": 398
        },
        "iso_zero": 4665,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 0,
            "moyenne": 0,
            "basse": 0,
            "totale": 0
        }
    },
    "2019-06-27 02:00:00": {
        "temperature": {
            "2m": 295.2,
            "sol": 294.3,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 102310
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 79.2
        },
        "vent_moyen": {
            "10m": 20.1
        },
        "vent_rafales": {
            "10m": 42.1
        },
        "vent_direction": {
            "10m": 399
        },
        "iso_zero": 4642,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 0,
            "moyenne": 0,
            "basse": 0,
            "totale": 0
        }
    },
    "2019-06-27 05:00:00": {
        "temperature": {
            "2m": 293.1,
            "sol": 292.2,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 102310
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 84.2
        },
        "vent_moyen": {
            "10m": 19.4
        },
        "vent_rafales": {
            "10m": 42
        },
        "vent_direction": {
            "10m": 399
        },
        "iso_zero": 4665,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 0,
            "moyenne": 0,
            "basse": 0,
            "totale": 0
        }
    },
    "2019-06-27 08:00:00": {
        "temperature": {
            "2m": 293.5,
            "sol": 291.8,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 102330
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 79.7
        },
        "vent_moyen": {
            "10m": 19.7
        },
        "vent_rafales": {
            "10m": 35.4
        },
        "vent_direction": {
            "10m": 409
        },
        "iso_zero": 4662,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 0,
            "moyenne": 0,
            "basse": 0,
            "totale": 0
        }
    },
    "2019-06-27 11:00:00": {
        "temperature": {
            "2m": 297.2,
            "sol": 294.3,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 102380
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 67
        },
        "vent_moyen": {
            "10m": 20.8
        },
        "vent_rafales": {
            "10m": 35
        },
        "vent_direction": {
            "10m": 413
        },
        "iso_zero": 4685,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 0,
            "moyenne": 0,
            "basse": 0,
            "totale": 0
        }
    },
    "2019-06-27 14:00:00": {
        "temperature": {
            "2m": 301.1,
            "sol": 297.9,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 102340
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 56
        },
        "vent_moyen": {
            "10m": 22.3
        },
        "vent_rafales": {
            "10m": 33.3
        },
        "vent_direction": {
            "10m": 414
        },
        "iso_zero": 4720,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 0,
            "moyenne": 0,
            "basse": 0,
            "totale": 0
        }
    },
    "2019-06-27 17:00:00": {
        "temperature": {
            "2m": 301.5,
            "sol": 298.6,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 102300
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 55.2
        },
        "vent_moyen": {
            "10m": 22.9
        },
        "vent_rafales": {
            "10m": 34.5
        },
        "vent_direction": {
            "10m": 415
        },
        "iso_zero": 4729,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 0,
            "moyenne": 0,
            "basse": 0,
            "totale": 0
        }
    },
    "2019-06-27 20:00:00": {
        "temperature": {
            "2m": 297.9,
            "sol": 296.3,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 102250
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 57.9
        },
        "vent_moyen": {
            "10m": 23
        },
        "vent_rafales": {
            "10m": 40.3
        },
        "vent_direction": {
            "10m": 407
        },
        "iso_zero": 4702,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 0,
            "moyenne": 0,
            "basse": 0,
            "totale": 0
        }
    },
    "2019-06-27 23:00:00": {
        "temperature": {
            "2m": 294.1,
            "sol": 293.4,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 102350
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 59
        },
        "vent_moyen": {
            "10m": 20.4
        },
        "vent_rafales": {
            "10m": 47.3
        },
        "vent_direction": {
            "10m": 417
        },
        "iso_zero": 4693,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 0,
            "moyenne": 0,
            "basse": 0,
            "totale": 0
        }
    },
    "2019-06-28 02:00:00": {
        "temperature": {
            "2m": 291.8,
            "sol": 291.6,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 102300
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 64.7
        },
        "vent_moyen": {
            "10m": 17.1
        },
        "vent_rafales": {
            "10m": 40.1
        },
        "vent_direction": {
            "10m": 419
        },
        "iso_zero": 4655,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 0,
            "moyenne": 0,
            "basse": 0,
            "totale": 0
        }
    },
    "2019-06-28 05:00:00": {
        "temperature": {
            "2m": 289.9,
            "sol": 289.6,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 102220
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 71.3
        },
        "vent_moyen": {
            "10m": 15.4
        },
        "vent_rafales": {
            "10m": 36
        },
        "vent_direction": {
            "10m": 419
        },
        "iso_zero": 4609,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 0,
            "moyenne": 0,
            "basse": 0,
            "totale": 0
        }
    },
    "2019-06-28 08:00:00": {
        "temperature": {
            "2m": 290.5,
            "sol": 289.2,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 102150
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 68.3
        },
        "vent_moyen": {
            "10m": 16.2
        },
        "vent_rafales": {
            "10m": 31.7
        },
        "vent_direction": {
            "10m": 420
        },
        "iso_zero": 4590,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 0,
            "moyenne": 0,
            "basse": 0,
            "totale": 0
        }
    },
    "2019-06-28 11:00:00": {
        "temperature": {
            "2m": 295.8,
            "sol": 293.4,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 102160
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 58.9
        },
        "vent_moyen": {
            "10m": 17
        },
        "vent_rafales": {
            "10m": 27.8
        },
        "vent_direction": {
            "10m": 425
        },
        "iso_zero": 4625,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 0,
            "moyenne": 0,
            "basse": 0,
            "totale": 0
        }
    },
    "2019-06-28 14:00:00": {
        "temperature": {
            "2m": 300.3,
            "sol": 297.4,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 102080
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 48.3
        },
        "vent_moyen": {
            "10m": 17.5
        },
        "vent_rafales": {
            "10m": 24.9
        },
        "vent_direction": {
            "10m": 427
        },
        "iso_zero": 4695,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 0,
            "moyenne": 0,
            "basse": 0,
            "totale": 0
        }
    },
    "2019-06-28 17:00:00": {
        "temperature": {
            "2m": 301.1,
            "sol": 298.8,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 101950
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 46.4
        },
        "vent_moyen": {
            "10m": 19.1
        },
        "vent_rafales": {
            "10m": 27
        },
        "vent_direction": {
            "10m": 428
        },
        "iso_zero": 4720,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 0,
            "moyenne": 0,
            "basse": 0,
            "totale": 0
        }
    },
    "2019-06-28 20:00:00": {
        "temperature": {
            "2m": 299.4,
            "sol": 298.3,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 101880
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 57.7
        },
        "vent_moyen": {
            "10m": 14.9
        },
        "vent_rafales": {
            "10m": 27.6
        },
        "vent_direction": {
            "10m": 435
        },
        "iso_zero": 4780,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 0,
            "moyenne": 0,
            "basse": 0,
            "totale": 0
        }
    },
    "2019-06-28 23:00:00": {
        "temperature": {
            "2m": 295.2,
            "sol": 295.8,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 101910
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 69.9
        },
        "vent_moyen": {
            "10m": 12.5
        },
        "vent_rafales": {
            "10m": 28.8
        },
        "vent_direction": {
            "10m": 433
        },
        "iso_zero": 4823,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 0,
            "moyenne": 0,
            "basse": 0,
            "totale": 0
        }
    },
    "2019-06-29 02:00:00": {
        "temperature": {
            "2m": 292.4,
            "sol": 293.1,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 101810
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 64.6
        },
        "vent_moyen": {
            "10m": 11.3
        },
        "vent_rafales": {
            "10m": 23.9
        },
        "vent_direction": {
            "10m": 445
        },
        "iso_zero": 4841,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 2,
            "moyenne": 0,
            "basse": 0,
            "totale": 2
        }
    },
    "2019-06-29 05:00:00": {
        "temperature": {
            "2m": 290.9,
            "sol": 291.4,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 101710
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 63.9
        },
        "vent_moyen": {
            "10m": 9.1
        },
        "vent_rafales": {
            "10m": 19
        },
        "vent_direction": {
            "10m": 447
        },
        "iso_zero": 4795,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 1,
            "moyenne": 0,
            "basse": 0,
            "totale": 1
        }
    },
    "2019-06-29 08:00:00": {
        "temperature": {
            "2m": 292.1,
            "sol": 291.2,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 101660
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 61
        },
        "vent_moyen": {
            "10m": 11.6
        },
        "vent_rafales": {
            "10m": 23.8
        },
        "vent_direction": {
            "10m": 452
        },
        "iso_zero": 4753,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 5,
            "moyenne": 0,
            "basse": 0,
            "totale": 5
        }
    },
    "2019-06-29 11:00:00": {
        "temperature": {
            "2m": 297.6,
            "sol": 295.6,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 101650
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 50.6
        },
        "vent_moyen": {
            "10m": 10.7
        },
        "vent_rafales": {
            "10m": 17
        },
        "vent_direction": {
            "10m": 464
        },
        "iso_zero": 4730,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 51,
            "moyenne": 0,
            "basse": 0,
            "totale": 51
        }
    },
    "2019-06-29 14:00:00": {
        "temperature": {
            "2m": 303.1,
            "sol": 301,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 101490
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 39.6
        },
        "vent_moyen": {
            "10m": 12
        },
        "vent_rafales": {
            "10m": 15.3
        },
        "vent_direction": {
            "10m": 481
        },
        "iso_zero": 4693,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 42,
            "moyenne": 0,
            "basse": 0,
            "totale": 42
        }
    },
    "2019-06-29 17:00:00": {
        "temperature": {
            "2m": 305.1,
            "sol": 303.7,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 101390
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 38.6
        },
        "vent_moyen": {
            "10m": 11.8
        },
        "vent_rafales": {
            "10m": 14.8
        },
        "vent_direction": {
            "10m": 495
        },
        "iso_zero": 4578,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 0,
            "moyenne": 0,
            "basse": 0,
            "totale": 0
        }
    },
    "2019-06-29 20:00:00": {
        "temperature": {
            "2m": 304.3,
            "sol": 304.1,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 101360
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 45.4
        },
        "vent_moyen": {
            "10m": 9
        },
        "vent_rafales": {
            "10m": 16.1
        },
        "vent_direction": {
            "10m": 515
        },
        "iso_zero": 4607,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 0,
            "moyenne": 0,
            "basse": 0,
            "totale": 0
        }
    },
    "2019-06-29 23:00:00": {
        "temperature": {
            "2m": 299.2,
            "sol": 300.8,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 101480
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 61.1
        },
        "vent_moyen": {
            "10m": 2.3
        },
        "vent_rafales": {
            "10m": 5.2
        },
        "vent_direction": {
            "10m": 272
        },
        "iso_zero": 4584,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 0,
            "moyenne": 0,
            "basse": 0,
            "totale": 0
        }
    },
    "2019-06-30 02:00:00": {
        "temperature": {
            "2m": 293.9,
            "sol": 293.3,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 101560
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 82.6
        },
        "vent_moyen": {
            "10m": 13.6
        },
        "vent_rafales": {
            "10m": 27
        },
        "vent_direction": {
            "10m": 313
        },
        "iso_zero": 4597,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 0,
            "moyenne": 0,
            "basse": 1,
            "totale": 1
        }
    },
    "2019-06-30 05:00:00": {
        "temperature": {
            "2m": 292.8,
            "sol": 292.2,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 101650
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 61.8
        },
        "vent_moyen": {
            "10m": 13.3
        },
        "vent_rafales": {
            "10m": 25.6
        },
        "vent_direction": {
            "10m": 310
        },
        "iso_zero": 4634,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 0,
            "moyenne": 0,
            "basse": 43,
            "totale": 43
        }
    },
    "2019-06-30 08:00:00": {
        "temperature": {
            "2m": 290.9,
            "sol": 289.4,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 101780
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 77.5
        },
        "vent_moyen": {
            "10m": 11
        },
        "vent_rafales": {
            "10m": 18.1
        },
        "vent_direction": {
            "10m": 317
        },
        "iso_zero": 4588,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 0,
            "moyenne": 0,
            "basse": 48,
            "totale": 48
        }
    },
    "2019-06-30 11:00:00": {
        "temperature": {
            "2m": 296.1,
            "sol": 293.7,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 101880
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 50.3
        },
        "vent_moyen": {
            "10m": 9.5
        },
        "vent_rafales": {
            "10m": 10.8
        },
        "vent_direction": {
            "10m": 306
        },
        "iso_zero": 4590,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 0,
            "moyenne": 0,
            "basse": 0,
            "totale": 0
        }
    },
    "2019-06-30 14:00:00": {
        "temperature": {
            "2m": 300.1,
            "sol": 297.4,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 101880
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 32.9
        },
        "vent_moyen": {
            "10m": 11.9
        },
        "vent_rafales": {
            "10m": 15.3
        },
        "vent_direction": {
            "10m": 299
        },
        "iso_zero": 4527,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 15,
            "moyenne": 2,
            "basse": 0,
            "totale": 15
        }
    },
    "2019-06-30 17:00:00": {
        "temperature": {
            "2m": 300.3,
            "sol": 298.2,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 101860
        },
        "pluie": 0.1,
        "pluie_convective": 0.1,
        "humidite": {
            "2m": 34.9
        },
        "vent_moyen": {
            "10m": 14.4
        },
        "vent_rafales": {
            "10m": 16.5
        },
        "vent_direction": {
            "10m": 300
        },
        "iso_zero": 4522,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 87,
            "moyenne": 0,
            "basse": 0,
            "totale": 87
        }
    },
    "2019-06-30 20:00:00": {
        "temperature": {
            "2m": 297.6,
            "sol": 296.4,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 101810
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 54.3
        },
        "vent_moyen": {
            "10m": 14.2
        },
        "vent_rafales": {
            "10m": 15.4
        },
        "vent_direction": {
            "10m": 331
        },
        "iso_zero": 4497,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 73,
            "moyenne": 0,
            "basse": 0,
            "totale": 73
        }
    },
    "2019-06-30 23:00:00": {
        "temperature": {
            "2m": 292.4,
            "sol": 292.1,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 101910
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 74.9
        },
        "vent_moyen": {
            "10m": 10.9
        },
        "vent_rafales": {
            "10m": 21.6
        },
        "vent_direction": {
            "10m": 356
        },
        "iso_zero": 4463,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 86,
            "moyenne": 0,
            "basse": 0,
            "totale": 86
        }
    },
    "2019-07-01 02:00:00": {
        "temperature": {
            "2m": 289.7,
            "sol": 289.4,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 101930
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 83.1
        },
        "vent_moyen": {
            "10m": 7.7
        },
        "vent_rafales": {
            "10m": 12.5
        },
        "vent_direction": {
            "10m": 357
        },
        "iso_zero": 4394,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 43,
            "moyenne": 0,
            "basse": 1,
            "totale": 44
        }
    },
    "2019-07-01 05:00:00": {
        "temperature": {
            "2m": 288.4,
            "sol": 287.9,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 101940
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 77.5
        },
        "vent_moyen": {
            "10m": 10.3
        },
        "vent_rafales": {
            "10m": 20.4
        },
        "vent_direction": {
            "10m": 328
        },
        "iso_zero": 4356,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 40,
            "moyenne": 0,
            "basse": 3,
            "totale": 40
        }
    },
    "2019-07-01 08:00:00": {
        "temperature": {
            "2m": 288.7,
            "sol": 287.4,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 101980
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 75.1
        },
        "vent_moyen": {
            "10m": 8.7
        },
        "vent_rafales": {
            "10m": 16.6
        },
        "vent_direction": {
            "10m": 347
        },
        "iso_zero": 3728,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 70,
            "moyenne": 47,
            "basse": 1,
            "totale": 70
        }
    },
    "2019-07-01 11:00:00": {
        "temperature": {
            "2m": 291.2,
            "sol": 289.4,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 102040
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 69.2
        },
        "vent_moyen": {
            "10m": 8.9
        },
        "vent_rafales": {
            "10m": 13.6
        },
        "vent_direction": {
            "10m": 305
        },
        "iso_zero": 3878,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 100,
            "moyenne": 100,
            "basse": 29,
            "totale": 100
        }
    },
    "2019-07-01 14:00:00": {
        "temperature": {
            "2m": 295.2,
            "sol": 292.1,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 102120
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 51.8
        },
        "vent_moyen": {
            "10m": 13.6
        },
        "vent_rafales": {
            "10m": 18.2
        },
        "vent_direction": {
            "10m": 299
        },
        "iso_zero": 4010,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 72,
            "moyenne": 50,
            "basse": 33,
            "totale": 84
        }
    },
    "2019-07-01 17:00:00": {
        "temperature": {
            "2m": 296,
            "sol": 293.3,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 102070
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 49
        },
        "vent_moyen": {
            "10m": 18.5
        },
        "vent_rafales": {
            "10m": 21.4
        },
        "vent_direction": {
            "10m": 317
        },
        "iso_zero": 4050,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 0,
            "moyenne": 0,
            "basse": 3,
            "totale": 3
        }
    },
    "2019-07-01 20:00:00": {
        "temperature": {
            "2m": 292.2,
            "sol": 290.3,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 102130
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 58.6
        },
        "vent_moyen": {
            "10m": 20.3
        },
        "vent_rafales": {
            "10m": 25.9
        },
        "vent_direction": {
            "10m": 333
        },
        "iso_zero": 4135,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 0,
            "moyenne": 0,
            "basse": 2,
            "totale": 2
        }
    },
    "2019-07-01 23:00:00": {
        "temperature": {
            "2m": 286.9,
            "sol": 286.7,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 102330
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 76.2
        },
        "vent_moyen": {
            "10m": 13.1
        },
        "vent_rafales": {
            "10m": 28
        },
        "vent_direction": {
            "10m": 341
        },
        "iso_zero": 4155,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 0,
            "moyenne": 0,
            "basse": 0,
            "totale": 0
        }
    },
    "2019-07-02 02:00:00": {
        "temperature": {
            "2m": 285.2,
            "sol": 285.3,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 102400
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 80.4
        },
        "vent_moyen": {
            "10m": 9.7
        },
        "vent_rafales": {
            "10m": 18.5
        },
        "vent_direction": {
            "10m": 343
        },
        "iso_zero": 4046,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 0,
            "moyenne": 0,
            "basse": 0,
            "totale": 0
        }
    },
    "2019-07-02 05:00:00": {
        "temperature": {
            "2m": 284.3,
            "sol": 284.5,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 102370
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 81.2
        },
        "vent_moyen": {
            "10m": 7.5
        },
        "vent_rafales": {
            "10m": 13
        },
        "vent_direction": {
            "10m": 368
        },
        "iso_zero": 4016,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 2,
            "moyenne": 0,
            "basse": 0,
            "totale": 2
        }
    },
    "2019-07-02 08:00:00": {
        "temperature": {
            "2m": 286.4,
            "sol": 284.8,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 102420
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 77.1
        },
        "vent_moyen": {
            "10m": 8.2
        },
        "vent_rafales": {
            "10m": 15.7
        },
        "vent_direction": {
            "10m": 371
        },
        "iso_zero": 3948,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 45,
            "moyenne": 0,
            "basse": 0,
            "totale": 45
        }
    },
    "2019-07-02 11:00:00": {
        "temperature": {
            "2m": 291.7,
            "sol": 288.8,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 102410
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 57.4
        },
        "vent_moyen": {
            "10m": 10.8
        },
        "vent_rafales": {
            "10m": 13.9
        },
        "vent_direction": {
            "10m": 398
        },
        "iso_zero": 3897,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 69,
            "moyenne": 0,
            "basse": 0,
            "totale": 69
        }
    },
    "2019-07-02 14:00:00": {
        "temperature": {
            "2m": 295.2,
            "sol": 291.9,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 102370
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 45.5
        },
        "vent_moyen": {
            "10m": 13.5
        },
        "vent_rafales": {
            "10m": 14.6
        },
        "vent_direction": {
            "10m": 379
        },
        "iso_zero": 3890,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 39,
            "moyenne": 0,
            "basse": 1,
            "totale": 40
        }
    },
    "2019-07-02 17:00:00": {
        "temperature": {
            "2m": 295.6,
            "sol": 292.7,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 102270
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 49.8
        },
        "vent_moyen": {
            "10m": 17.6
        },
        "vent_rafales": {
            "10m": 19.6
        },
        "vent_direction": {
            "10m": 389
        },
        "iso_zero": 3864,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 51,
            "moyenne": 0,
            "basse": 10,
            "totale": 54
        }
    },
    "2019-07-02 20:00:00": {
        "temperature": {
            "2m": 293.6,
            "sol": 292.2,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 102260
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 58.2
        },
        "vent_moyen": {
            "10m": 16.1
        },
        "vent_rafales": {
            "10m": 23.2
        },
        "vent_direction": {
            "10m": 391
        },
        "iso_zero": 3935,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 30,
            "moyenne": 0,
            "basse": 39,
            "totale": 62
        }
    },
    "2019-07-02 23:00:00": {
        "temperature": {
            "2m": 289.4,
            "sol": 289.7,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 102390
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 67.2
        },
        "vent_moyen": {
            "10m": 15.8
        },
        "vent_rafales": {
            "10m": 36.3
        },
        "vent_direction": {
            "10m": 388
        },
        "iso_zero": 3917,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 0,
            "moyenne": 0,
            "basse": 70,
            "totale": 70
        }
    },
    "2019-07-03 02:00:00": {
        "temperature": {
            "2m": 286.9,
            "sol": 286.2,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 102420
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 68.4
        },
        "vent_moyen": {
            "10m": 19.1
        },
        "vent_rafales": {
            "10m": 43.6
        },
        "vent_direction": {
            "10m": 398
        },
        "iso_zero": 3870,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 0,
            "moyenne": 0,
            "basse": 37,
            "totale": 37
        }
    },
    "2019-07-03 05:00:00": {
        "temperature": {
            "2m": 284.7,
            "sol": 284.3,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 102390
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 77.3
        },
        "vent_moyen": {
            "10m": 16.7
        },
        "vent_rafales": {
            "10m": 39.1
        },
        "vent_direction": {
            "10m": 395
        },
        "iso_zero": 3792,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 0,
            "moyenne": 0,
            "basse": 0,
            "totale": 0
        }
    },
    "2019-07-03 08:00:00": {
        "temperature": {
            "2m": 285.7,
            "sol": 283.9,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 102430
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 73.3
        },
        "vent_moyen": {
            "10m": 17.3
        },
        "vent_rafales": {
            "10m": 32.5
        },
        "vent_direction": {
            "10m": 396
        },
        "iso_zero": 3752,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 0,
            "moyenne": 0,
            "basse": 0,
            "totale": 0
        }
    },
    "2019-07-03 11:00:00": {
        "temperature": {
            "2m": 291.2,
            "sol": 288.5,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 102390
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 57
        },
        "vent_moyen": {
            "10m": 19.6
        },
        "vent_rafales": {
            "10m": 28.9
        },
        "vent_direction": {
            "10m": 411
        },
        "iso_zero": 3786,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 0,
            "moyenne": 0,
            "basse": 0,
            "totale": 0
        }
    },
    "2019-07-03 14:00:00": {
        "temperature": {
            "2m": 294.8,
            "sol": 291.5,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 102300
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 48
        },
        "vent_moyen": {
            "10m": 20.6
        },
        "vent_rafales": {
            "10m": 27.5
        },
        "vent_direction": {
            "10m": 415
        },
        "iso_zero": 3868,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 0,
            "moyenne": 0,
            "basse": 0,
            "totale": 0
        }
    },
    "2019-07-03 17:00:00": {
        "temperature": {
            "2m": 295.8,
            "sol": 293.1,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 102200
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 47.2
        },
        "vent_moyen": {
            "10m": 19.7
        },
        "vent_rafales": {
            "10m": 26.8
        },
        "vent_direction": {
            "10m": 416
        },
        "iso_zero": 3843,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 0,
            "moyenne": 0,
            "basse": 0,
            "totale": 0
        }
    },
    "2019-07-03 20:00:00": {
        "temperature": {
            "2m": 294.2,
            "sol": 292.8,
            "500hPa": -0.1,
            "850hPa": -0.1
        },
        "pression": {
            "niveau_de_la_mer": 102200
        },
        "pluie": 0,
        "pluie_convective": 0,
        "humidite": {
            "2m": 57
        },
        "vent_moyen": {
            "10m": 19.6
        },
        "vent_rafales": {
            "10m": 28.2
        },
        "vent_direction": {
            "10m": 403
        },
        "iso_zero": 3913,
        "risque_neige": "non",
        "cape": 0,
        "nebulosite": {
            "haute": 0,
            "moyenne": 0,
            "basse": 0,
            "totale": 0
        }
    }
}

const data = {
    labels: Object.keys(rawData).map(key => new Date(key).toLocaleString()),
    datasets: [
        {
            label: 'My First dataset',
            fill: true,
            lineTension: 0.5,
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: Object.keys(rawData).map(key => Math.round(rawData[key].temperature.sol) / 10)
        }
    ]
};

function Room(props) {
    const classes = useStyles();
    const [newVar, setNewVar] = React.useState(false);
    const [newGraph, setNewGraph] = React.useState(false);
    const [redirect, setRedirect] = React.useState(false);
    const [room, setRoom] = React.useState({
        students: [{ lastName: "", firstName: "" }],
        variables: [{ name: "", unit: "" }],
        datas: [{ value: "", variable: "", date: Date.now() }]
    });
    const params = props.match.params;

    useEffect(() => {
        fetch(api.protocol + "://" + api.hostname + ":" + api.port + "/room/" + params.id, {
            method: "GET"
        })
            .then(res => {
                if (!res.ok) throw res;
                else return res.json();
            })
            .then(res => {
                setRoom({ ...res });
            })
            .catch(err => {
                err.json()
                    .then(msg => {
                        if (msg.message === "RoomNotFound") {
                            props.snackbar.showMessage("error", "Aucune salle n'existe avec cet identifiant")
                            setRedirect(true);
                        }
                    });
            })
    }, [params.id]);

    if (redirect)
        return <Redirect to="/join" />

    return (
        <div className={classes.root}>
            <NewVarDialog open={newVar} setOpen={setNewVar} />
            <NewGraphDialog open={newGraph} setOpen={setNewGraph} />
            <SpeedDial newVar={() => setNewVar(true)} newGraph={() => setNewGraph(true)} />
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.toolbar} />
                <List>
                    <ListItem>
                        <ListItemText primary={"Identifiant de la salle :"} />
                        <ListItemText primary={params.id} />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem>
                        <ListItemText primary={"Etudiants :"} />
                    </ListItem>
                    {
                        room.students.map(student =>
                            <ListItem key={student._id || Date.now()}>
                                <ListItemText primary={student.lastName.toUpperCase() + " " + student.firstName} />
                            </ListItem>
                        )
                    }
                </List>
                <Divider />
                <List>
                    <ListItem>
                        <ListItemText primary={"Dernier message reçu"} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={room.datas.length > 0 ? "le " + (new Date(room.datas[room.datas.length - 1].date)).toLocaleString() : "n/a"} />
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                <Grid container>
                    <Grid item xs={12}>

                    </Grid>
                </Grid>
            </main>
        </div>
    );
}

export default withSnackbar(Room);