import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Gpsdata from "./PieChart";
import { Grid } from "@mui/material";

const Details = () => {
  /* This is the state of the component. */
  const [post, setPost] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [counts, setCounts] = useState({});

  /* Getting the location of the current page. */
  const location = useLocation();
  const postId = location.pathname.split("/")[2];

  /* Fetching data from the API. */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/data/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  /* Counting the number of times a location appears in the array. */
  useEffect(() => {
    if (!post) return;
    const counts = post.reduce((acc, item) => {
      acc[item.location] = acc[item.location] ? acc[item.location] + 1 : 1;
      return acc;
    }, {});

    /* Creating an array of objects. */
    const values = [["Location", "times"]];


    Object.entries(counts).map(([key, value]) => {
      const Stringify = JSON.stringify(key);
      values.push([Stringify, value]);
    });

    setCounts(counts);
    setPieData(values);
  }, [post]);

  return (
    <Grid sx={{ marginTop: 5 }} container spacing={3}>
      <Grid item lg={6} sm={7}>
        <Link style={{ marginLeft: "50px" }} to={"/"}>
          <ArrowBackOutlinedIcon />
        </Link>
        <h3 style={{ alignItems: "left", marginLeft: "50px" }}>
          {post &&
            post
              .slice(0, 1)
              .map((item, index) => <div key={index}>{item.DeviceId}</div>)}
          {post &&
            post
              .slice(1, 2)
              .map((item, index) => <div key={index}>{item.Device_Type}</div>)}
        </h3>
        <Box
          sx={{
            marginTop: 5,
            marginLeft: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Timestamp</TableCell>
                  <TableCell>location</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {post.map((post, index) => {
                  const { Timestamp, location } = post;
                  const formattedDate =
                    moment(Timestamp).format("DD-MM-YYYY h:mm:ss");
                  return (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{formattedDate}</TableCell>
                      <TableCell>{location}</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>
      <Grid
        sx={{
          mt: 12,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        item
        lg={6}
        sm={5}
      >
        <Gpsdata pieData={pieData} />
      </Grid>
      <div style={{ marginTop: "20px", marginLeft: "60px" }}>
        {Object.entries(counts).map(([key, value]) => {
          const a = [value] * 5;

          return <div key={key}>{`${a} minutes in location ${key}`}</div>;
        })}
      </div>
    </Grid>
  );
};

export default Details;
