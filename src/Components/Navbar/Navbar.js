import { AppBar, Grid, makeStyles, Toolbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useState, useContext } from "react";
import { withRouter } from "react-router";
import BasicButton from "../RootComponents/BasicButton";
import { getUserRoutes } from "../Utils/utils";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { useLazyQuery } from "@apollo/client";
import useMutationHelper from "../Mutations/UseMutationHelper";
import { GET_AVISOS, GET_NOTIFICACIONES } from "../Queries/Queries";
import { AVISO_LEIDO } from "../Mutations/Mutations";
import AppContext from "../Context/AppContext";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "0px 8px 0px 8px",
  },
  dialog: {
    paper: {
      backgroundColor: "#393e46",
    },
  },
  noticeRow: {
    marginBottom: 16,
  },
}));

const NoticeRow = ({ notice, classes, executeMutation }) => {
  return (
    <Grid item xs={12} className={classes.noticeRow}>
      <Alert
        variant="outlined"
        severity="info"
      >
        {notice.mensaje}
      </Alert>
    </Grid>
  );
};

const NoticesDialog = ({
  classes,
  notices,
  open,
  handleClose,
  executeMutation,
}) => {
  return (
    <Dialog
      fullWidth
      className={classes.dialog}
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      PaperProps={{
        style: {
          backgroundColor: "#222831",
        },
      }}
    >
      <DialogTitle id="form-dialog-title">Avisos</DialogTitle>
      <DialogContent>
        {notices &&
          notices.map((notice) => (
            <NoticeRow
              classes={classes}
              notice={notice}
              executeMutation={executeMutation}
            />
          ))}
      </DialogContent>
      <DialogActions>
        <BasicButton onClick={handleClose} color="info">
          Cerrar
        </BasicButton>
      </DialogActions>
    </Dialog>
  );
};

const NotificationRow = ({ notificacion, classes }) => {
  return (
    <Grid item xs={12} className={classes.noticeRow}>
      <Alert
        variant="outlined"
        severity="info"
      >
        {notificacion.mensaje}
      </Alert>
    </Grid>
  );
};

const NotifitcationsDialog = ({
  classes,
  notificaciones,
  open,
  handleClose,
  executeMutation,
}) => {
  return (
    <Dialog
      fullWidth
      className={classes.dialog}
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      PaperProps={{
        style: {
          backgroundColor: "#222831",
        },
      }}
    >
      <DialogTitle id="form-dialog-title">Notificaciones</DialogTitle>
      <DialogContent>
        {notificaciones &&
          notificaciones.map((notificacion) => (
            <NotificationRow
              classes={classes}
              notificacion={notificacion}
              executeMutation={executeMutation}
            />
          ))}
      </DialogContent>
      <DialogActions>
        <BasicButton onClick={handleClose} color="info">
          Cerrar
        </BasicButton>
      </DialogActions>
    </Dialog>
  );
};


const Navbar = ({ history, _providerInstance }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [notificacionesOpen, notificacionesSetOpen] = useState(false);  
  const _appValues = useContext(AppContext);

  const [executeQuery, { data, loading, error }] = useLazyQuery(GET_AVISOS, {
    fetchPolicy: "network-only",
  });

  const [getNotificaciones, { data: notificaciones, loading: loadingNotificaciones, error: notificacionesError }] = useLazyQuery(GET_NOTIFICACIONES, {
    fetchPolicy: "network-only",
  });

  const handleNotificacionesClose = () => {
    notificacionesSetOpen(false)
  }

  const onCompletedFn = (data) => {};

  const onErrorFn = (error) => {
    console.log(error);
  };

  const refetchQueries = [
    {
      query: GET_AVISOS,
    },
  ];

  const { executeMutation } = useMutationHelper(AVISO_LEIDO, {
    onCompletedFn,
    onErrorFn,
    refetchQueries,
  });

  const handleClick = (event) => {
    executeQuery();
    setOpen(true);
  };

  const handleClickNotificaciones = (event) => {
    getNotificaciones()
    notificacionesSetOpen(true)
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    _appValues.setUser({
    })
    localStorage.clear()
    history.replace('/')
  }

  const [currentRoute, setCurrentRoute] = useState(0);
  const handleRouteChange = (newRoute) => {
    setCurrentRoute((prevRoute) => {
      history.replace(newRoute);
      return newRoute;
    });
  };

  const userRoutes = getUserRoutes(_appValues.user.role).filter(
    (route) => route.shouldAppear
  );

  return (
    <>
      {_appValues.user.role && (
        <AppBar position="fixed">
          <Toolbar variant="dense">
            {userRoutes.map((route) => (
              <BasicButton
                className={classes.button}
                disableElevation={true}
                handleClick={() => handleRouteChange(route.path)}
                color={currentRoute === route.path ? "secondary" : "primary"}
              >
                {route.name}
              </BasicButton>
            ))}
            <BasicButton className={classes.button} handleClick={(event) => handleClick(event)}>
              Avisos
            </BasicButton>
            <BasicButton className={classes.button} handleClick={(event) => handleClickNotificaciones()}>
              Notificaciones
            </BasicButton>
            <BasicButton className={classes.button} handleClick={handleLogout}>
              Cerrar sesión
            </BasicButton>
          </Toolbar>
          <NoticesDialog
            classes={classes}
            notices={data && data.getAvisos ? data.getAvisos : []}
            open={open}
            handleClose={handleClose}
            executeMutation={executeMutation}
          />
          <NotifitcationsDialog
            classes={classes}
            notificaciones={notificaciones && notificaciones.getNotificaciones ? notificaciones.getNotificaciones : []}
            open={notificacionesOpen}
            handleClose={handleNotificacionesClose}
          />
        </AppBar>
      )}
    </>
  );
};

export default withRouter(Navbar);
