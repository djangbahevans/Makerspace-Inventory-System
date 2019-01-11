import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: {
            light: '#5FA1FC',
            main: '#009be5',
            dark: '#006db3',
            contrastText: '#fff',
        },
    },
})