import React from "react";
//RootComponents
import { makeStyles } from "@material-ui/core/styles";
import { GET_USERS } from "../Queries/Queries";
import { DELETE_USER } from "../Mutations/Mutations";
import useMutationHelper from "../Mutations/UseMutationHelper";
import BasicTable from "../RootComponents/BasicTable";
import BasicLoading from "../RootComponents/BasicLoading";
import { columns, content } from "./ShowUsers.utils";
import { useQuery } from "@apollo/client";
import BasicContainer from "../RootComponents/BasicContainer";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 1000,
    height: "100vh",
    maxHeight: "auto",
    padding: "100px 50px 100px 50px",
    backgroundColor: "#393e46",
    zIndex: "-1",
  },
  rootSm: {
    minHeight: 530,
    height: "100vh",
    maxHeight: "auto",
    padding: "15px 15px 15px 15px",
    backgroundColor: "#393e46",
    zIndex: "-1",
  },
  addButton: {
    paddingRight: 10,
  },
  sonContainer: {
    padding: "0px 0px 0px 0px",
    backgroundColor: "#222831",
    height: "100%",
    minHeight: 800,
    borderRadius: "15px 15px 15px 15px",
  },
  field: {
    margin: "0px 24px 24px 24px",
  },
  title: {
    margin: "20px 20px 20px 20px",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  item: {
    backgroundColor: "#40464F",
  },
  table: {
    width: "100%",
    backgroundColor: "#393e46",
    minHeight: "80%",
    maxHeight: 800,
    margin: "0px 24px 0px 24px",
  },
  tablePaper: {
    backgroundColor: "#393e46",
  },
  titleContainer: {
    margin: "20px 20px 20px 20px",
  },
}));

const formatUsers = (data) => {
  return data.getUsers.map((user) => {
    return {
      ...user,
    };
  });
};

export default function ShowUsers({ history }) {
  const classes = useStyles();

  const { data, loading, error } = useQuery(GET_USERS, {
    fetchPolicy: "network-only",
  });
  let users = [];

  const refetchQueries = [
    {
      query: GET_USERS,
    },
  ];

  const { executeMutation: deleteMutation } = useMutationHelper(DELETE_USER, {
    refetchQueries,
  });

  if (loading) {
    return BasicLoading;
  }

  if (data) {
    users = formatUsers(data);
  }
  return (
    <BasicContainer>
      <BasicTable
        columns={columns}
        title={content.title}
        history={history}
        addLink={content.addLink}
        data={users}
        content={content}
        deleteMutation={deleteMutation}
      />
    </BasicContainer>
  );
}
