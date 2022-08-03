import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  item: {
    width: '100%',
    marginBottom: '16px',
  },
  root: {
    alignItems: 'center',
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(243, 243, 241, 0.92)',
  },
  button: {
    margin: '8px 12px',
  },
  expanded: {
    marginLeft: 64,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  collapsed: {
    marginLeft: 240,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));
