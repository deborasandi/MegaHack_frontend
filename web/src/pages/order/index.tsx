import React, { useEffect, useState } from "react";
import api from "../../services/api";
import ScrollArea from "react-scrollbar";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import "./styles.css";

import SideBar from "../../components/sidebar";
import TitleBar from "../../components/titlebar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%",
      flexGrow: 1,
      marginTop: '6em'
    },
    paper: {
      padding: theme.spacing(2),
      margin: "auto",
      marginTop: "5px",
      maxWidth: 500,
      backgroundColor: "#f1d3a7",
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%",
    },
    titleItem: {
      marginTop: "15px",
    },
  })
);

interface User {
  orders: {
    _id: string;
    state: string;
    createdAt: string;

    post: {
      _id: string;
      name: string;
      price: number;
      thumbnail: string;
    };

    establishment: {
      _id: string;
      name: string;
      thumbnail: string;
    };
  }[];
}

const Order = () => {
  const classes = useStyles();

  const [user, setUser] = useState<User>();

  useEffect(() => {
    api.get(`users/${localStorage.getItem("id")}`).then((response) => {
      console.log(response.data);
      setUser(response.data);
      console.log("olar");
      console.log(response.data);
    });
  }, []);

  return (
    <div>
      <div className={classes.root}>
        {user?.orders.map((order) => (
          <Paper className={classes.paper} id={order._id}>
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase className={classes.image}>
                  <img
                    className={classes.img}
                    alt="complex"
                    src={order.post.thumbnail}
                  />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs className={classes.titleItem}>
                    <Typography gutterBottom variant="subtitle1">
                      {order.post.name}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {order.establishment.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {order.state}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {order.createdAt}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item className={classes.titleItem}>
                  <Typography variant="subtitle1">
                    R${order.post.price}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </div>
      <TitleBar title="Pedidos" />
      <SideBar />
    </div>
  );
};

export default Order;
