import { createMuiTheme } from '@material-ui/core/styles';
import { red, blueGrey } from '@material-ui/core/colors';

const auxTheme = createMuiTheme();
// Create a theme instance.
const theme = createMuiTheme({
	typography: {
		fontFamily: 'Poppins',
		h1: {
			fontWeight: 700,
			textShadow: `2px 2px 2px ${auxTheme.palette.common.black}`
		},
		h2: {
			position:'relative',
			'&::before': {
				content: '""',
				bottom:'-10%',
				borderBottom: '5px solid white',
				position: 'absolute',
				width: '5%',
				borderRadius:'50px'
			}
		}
	},

	palette: {
		primary: {
			main: blueGrey[100],
		},
		text: {
			primary: '#e6e6e6',
			secondary: '#1d1d1d'
		},
		secondary: {
			main: '#19857b',
		},
		error: {
			main: red.A400,
		},
		background: {
			default: '#111',
		},
	},
	overrides: {
		MuiAppBar: {
			root: {
				padding: '0 40px'
			}
		}
	}
});

export default theme;
