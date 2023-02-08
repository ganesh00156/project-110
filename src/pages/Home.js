import { useContext, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import axios from "axios";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import {
  Container,
  IconButton,
  TableSortLabel,
  TextField,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { AuthContext } from "../context/authContext";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
export default function DataTableTest() {
  const baseURL = "http://localhost:8800/api/data";

  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [rowdata, setRowdata] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //sorting
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState(1);

  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const getdata = async () => {
      try {
        const user = await currentUser.id;
        if (user) {
          const response = await axios.get(baseURL);
          const data = await response.data;

          const match = await data.filter((item) => user === item.uid);
          setRows(match);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getdata();

    // axios.get(baseURL).then((response) => {
    //   const rd = response.data.filter((item) => currentUser.id === item.uid);
    //   setRows(rd);
    // });
  }, [currentUser]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (rowdata) {
      setRows([rowdata]);
    } else {
      axios.get(baseURL).then((response) => {
        setRows(response.data);
      });
    }
  }, [rowdata]);

  //SEARCHING
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  let filteredData = rows;

  if (filter) {
    filteredData = filteredData.filter(
      (item) => item.DeviceId === filter || item.Device_Type === filter
    );
  }

  if (searchTerm) {
    filteredData = filteredData.filter(
      (item) =>
        item.DeviceId.toString()
          .toLowerCase()
          .includes(searchTerm.toString().toLowerCase()) ||
        item.Device_Type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  //sorting
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder * -1);
    } else {
      setSortBy(column);
      setSortOrder(1);
    }
  };

  const sortedData = filteredData.sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return -sortOrder;
    if (a[sortBy] > b[sortBy]) return sortOrder;
    return 0;
  });

  
  return (
    <>
      {currentUser ? (
        <div>
          <Container component="main" maxWidth="md">
            {rows ? (
              <Box
                sx={{
                  marginTop: 8,

                  alignItems: "center",
                }}
              >
                {/* <input type="text" onChange={handleSearch} /> */}
                <h3>GPS Summary</h3>
                <TableContainer component={Paper}>
                  <TextField
                    sx={{
                      m: 2,
                      width: "200px",
                      display: "flex",
                      flex: "end",
                      alignContent: "right",
                    }}
                    onChange={handleSearch}
                    id="outlined-basic"
                    label="Search"
                    variant="outlined"
                  />
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        <TableCell onClick={() => handleSort("DeviceId")}>
                          Device ID
                          <IconButton onClick={() => handleSort("DeviceId")}>
                            {sortBy === "DeviceId" ? (
                              sortOrder === 1 ? (
                                <ArrowUpwardIcon />
                              ) : (
                                <ArrowDownwardIcon />
                              )
                            ) : (
                              ""
                            )}
                          </IconButton>
                        </TableCell>
                        <TableCell onClick={() => handleSort("Device_Type")}>
                          Device Type
                          <IconButton onClick={() => handleSort("Device_Type")}>
                            {sortBy === "Device_Type" ? (
                              sortOrder === 1 ? (
                                <ArrowUpwardIcon />
                              ) : (
                                <ArrowDownwardIcon />
                              )
                            ) : (
                              ""
                            )}
                          </IconButton>
                        </TableCell>
                        <TableCell onClick={() => handleSort("Timestamp")}>
                          Timestamp
                          <IconButton onClick={() => handleSort("Timestamp")}>
                            {sortBy === "Timestamp" ? (
                              sortOrder === 1 ? (
                                <ArrowUpwardIcon />
                              ) : (
                                <ArrowDownwardIcon />
                              )
                            ) : (
                              ""
                            )}
                          </IconButton>
                        </TableCell>
                        <TableCell onClick={() => handleSort("location")}>
                          Location
                          <IconButton onClick={() => handleSort("location")}>
                            {sortBy === "location" ? (
                              sortOrder === 1 ? (
                                <ArrowUpwardIcon />
                              ) : (
                                <ArrowDownwardIcon />
                              )
                            ) : (
                              ""
                            )}
                          </IconButton>
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sortedData
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row, index) => {
                          const { DeviceId, Device_Type, Timestamp, location } =
                            row;
                          const formattedDate =
                            moment(Timestamp).format("DD-MM-YYYY h:mm:ss");
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={index}
                            >
                              <TableCell>{DeviceId}</TableCell>
                              <TableCell>{Device_Type}</TableCell>
                              <TableCell>{formattedDate}</TableCell>
                              <TableCell>{location}</TableCell>
                              <TableCell>
                                <Link to={`/data/${row.DeviceId}`}>
                                  <ArrowForwardOutlinedIcon />
                                </Link>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10]}
                  component="div"
                  count={sortedData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Box>
            ) : (
              <h2>Loading...</h2>
            )}
          </Container>
        </div>
      ) : (
        navigate("/login")
      )}
    </>
  );
}
