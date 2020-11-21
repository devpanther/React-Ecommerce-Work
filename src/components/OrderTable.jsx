import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  Paper,
  TableSortLabel,
} from "@material-ui/core";
import _ from "lodash";
import { formatDate, formatCost } from "../utils/helpers";
import { useStyles } from "../styles/table";

const columns = [
  { path: "created", label: "Date" },
  { path: "description", label: "Description" },
  { path: "status", label: "Status" },
  { path: "source.last4", label: "Card" },
  { path: "amount", label: "Amount" },
];

const OrderTable = ({ data }) => {
  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [path, setPath] = useState("created");

  const sorted = _.orderBy(data, [path], [order]);

  const handleSort = (columnPath) => {
    if (columnPath === path) {
      order === "asc" ? setOrder("desc") : setOrder("asc");
      return;
    }
    setPath(columnPath);
    setOrder("asc");
  };

  return (
    <>
      <Typography
        component="h2"
        variant="h6"
        color="primary"
        className={classes.title}
      >
        Your Orders
      </Typography>
      <Paper className={classes.wrapper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.path}
                  align={col.path === "amount" ? "right" : "left"}
                  className={classes.columnHead}
                  onClick={() => handleSort(col.path)}
                >
                  <TableSortLabel direction={order} active={col.path === path}>
                    {col.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sorted.map((item) => {
              if (item.id) {
                return (
                  <TableRow key={item.id}>
                    <TableCell className={classes.cell}>
                      {formatDate(item.created)}
                    </TableCell>
                    <TableCell className={classes.cell}>
                      {item.description.toLowerCase()}
                    </TableCell>
                    <TableCell
                      className={
                        item.status === "succeeded"
                          ? classes.successCell
                          : classes.errorCell
                      }
                    >
                      {item.status}
                    </TableCell>
                    <TableCell
                      className={classes.cell}
                    >{`${item.source.brand.toLowerCase()} ${
                      item.source.last4
                    }`}</TableCell>
                    <TableCell className={classes.cell} align="right">
                      {formatCost(item.amount)}
                    </TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
};

export default OrderTable;
