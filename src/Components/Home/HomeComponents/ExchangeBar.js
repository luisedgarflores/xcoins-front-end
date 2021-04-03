import React, { useEffect, useReducer, useRef, useState } from "react";
import { useExchangeBarStyles } from "./ExchangeBar.styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import _ from "lodash";
import { Typography } from "@material-ui/core";
import BasicLoading from "../../RootComponents/BasicLoading";
import { useSubscription, } from "@apollo/client";
import { UPDATE_EXCHANGE_RATE } from "../../Subscriptions/Subscriptions";

const reducer = (prevState, action) => {
  switch (action.type) {
    case "setSpread":
      if (action.spread === "") {
        return {
          spread: "",
          USDWithSpread: parseFloat(prevState.usd),
          usd: parseFloat(prevState.usd),
        };
      }
      if (
        action.spread &&
        parseFloat(action.spread) >= 0 &&
        parseFloat(action.spread) <= 5000
      ) {
        return {
          ...prevState,
          spread: action.spread,
          USDWithSpread: (
            parseFloat(prevState.usd) +
            (parseFloat(prevState.usd) * parseFloat(action.spread)) / 100
          ).toFixed(2),
        };
      }
      return { ...prevState };
    case "setUSD":
      return {
        ...prevState,
        usd: parseFloat(action.usd),
        USDWithSpread:
          parseFloat(prevState.spread) && parseFloat(prevState.spread) > 0
            ? (
                parseFloat(action.usd) +
                (parseFloat(action.usd) * parseFloat(prevState.spread)) / 100
              ).toFixed(2)
            : parseFloat(action.usd),
      };

    case "setUSDWithSpread":
      return {
        ...prevState,
        USDWithSpread: parseFloat(action.USDWithSpread),
      };
    default:
      break;
  }
};

export default function ExchangeBar({ initialData }) {
  const { data, loading, error } = useSubscription(UPDATE_EXCHANGE_RATE);

  const dataRef = useRef(initialData);
  const isNumeric = new RegExp("([0-9]*[.])?[0-9]+");
  const classes = useExchangeBarStyles();

  const [USDSpread, dispatchUSDSpread] = useReducer(reducer, {
    usd: parseFloat(initialData.usd).toFixed(2),
    spread: 0,
    USDWithSpread: parseFloat(initialData.usd).toFixed(2),
  });
  
  useEffect(() => {
    if (data?.exchangeRateUpdated && !_.isEqual(data, dataRef.current)) {
      dispatchUSDSpread({
        type: "setUSD",
        usd: parseFloat(data?.exchangeRateUpdated.usd).toFixed(2),
      });

      dataRef.current = data?.exchangeRateUpdated;
    }
  }, [data]);

  const handleKeyPress = (event) => {
    if (event.key === "Backspace" || event.key === "." || event.key === "-") {
      isNumeric.test(event.target.value) &&
        dispatchUSDSpread({
          type: "setSpread",
          spread: event.target.value,
        });
      return;
    } else if (
      event.key === "Backspace" ||
      event.key === "ArrowRight" ||
      event.key === "ArrowLeft"
    )
      return;
    const isNewValueNumeric = isNumeric.test(event.key);
    if (!isNewValueNumeric) {
      event.preventDefault();
    }
  };
  
  return (
    <Paper component="form" className={classes.root}>
      <IconButton
        disabled={true}
        className={classes.iconButton}
        aria-label="menu"
      >
        <AttachMoneyIcon />
      </IconButton>
      <InputBase
        className={classes.exchangeField}
        // onChange={(event) =>
        //   dispatchUSDSpread({
        //     type: "setUSDWithSpread",
        //     USDWithSpread: parseFloat(event.target.value),
        //   })
        // }
        disabled={true}
        value={USDSpread.USDWithSpread}
        placeholder="Exchange rate"
        inputProps={{ "aria-label": "Set spread" }}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <InputBase
        onKeyDown={handleKeyPress}
        onChange={(event) => {
          dispatchUSDSpread({
            type: "setSpread",
            spread: event.target.value,
          });
        }}
        value={USDSpread.spread}
        className={classes.input}
        placeholder="spread"
        inputProps={{ "aria-label": "spread" }}
      />
      <Typography variant="subtitle1">{" %"}</Typography>
    </Paper>
  );
}
