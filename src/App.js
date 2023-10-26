import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { axiosGet } from "./Services/api";
import { UNSPLASH_ACCESS_KEY } from "./constant";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Pagination from "@mui/material/Pagination";

import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const orderItem = [
  {
    label: "Relevant",
    value: "relevant",
  },
  {
    label: "Latest",
    value: "latest",
  },
];

const colorItems = [
  { label: "Black and White", value: "black_and_white" },
  { label: "black", value: "black" },
  { label: "white", value: "white" },
  { label: "yellow", value: "yellow" },
  { label: "orange", value: "orange" },
  { label: "purple", value: "purple" },
  { label: "magenta", value: "magenta" },
  { label: "green", value: "green" },
  { label: "teal", value: "teal" },
  { label: "blue", value: "blue" },
];

function App() {
  const [search, setSearch] = React.useState("");
  const [itemData, setItemData] = React.useState([]);
  const [totalPage, setTotalPage] = React.useState(0);
  const [curPage, setCurPage] = React.useState(0);
  const [color, setColor] = React.useState("");
  const [order, setOrder] = React.useState("latest");

  const onChangeSearch = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };

  const onClickSearch = () => {
    searchItems();
  };

  const searchItems = async () => {
    if (search == "") {
      return;
    }
    const params = {
      client_id: UNSPLASH_ACCESS_KEY,
      query: search,
      page: curPage,
      order_by: order,
    };

    if (color != "") {
      params["color"] = color;
    }

    const response = await axiosGet(params);
    if (response.status == 200) {
      const data = response.data.results;
      const _total = response.data.total_pages;
      setItemData(data);
      setTotalPage(_total);
    }
  };
  React.useEffect(() => {
    searchItems();
  }, [curPage, color, order]);

  const handleChangePage = (event, page) => {
    setCurPage(page);
  };

  const handleChangeColor = (event) => {
    setColor(event.target.value);
  };

  const handleChangeOrder = (event) => {
    setOrder(event.target.value);
  };

  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="sm">
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            marginTop: "2rem",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{ "aria-label": "Search" }}
            value={search}
            onChange={onChangeSearch}
          />
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={onClickSearch}
          >
            <SearchIcon />
          </IconButton>
        </Paper>

        <Box sx={{ flexGrow: 1 }} style={{ marginTop: "1rem" }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Color</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={color}
                  label="Color"
                  onChange={handleChangeColor}
                >
                  {colorItems.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={order}
                  label="Sort"
                  onChange={handleChangeOrder}
                >
                  {orderItem.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <Box>
          {itemData.length > 0 ? (
            <ImageList sx={{ height: 450 }} cols={3}>
              {itemData.map((item) => (
                <ImageListItem key={item.id}>
                  <img
                    src={`${item.urls.regular}?w=164&h=164&fit=crop&auto=format`}
                    alt={item.description}
                    loading="lazy"
                    style={{ borderRadius: "15px" }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          ) : (
            <Box style={{ padding: "5rem" }}>No Data</Box>
          )}
        </Box>

        <Box style={{ display: "inline-flex", alignItems: "center" }}>
          <Pagination
            count={totalPage}
            color="primary"
            onChange={handleChangePage}
          />
        </Box>
      </Container>
    </div>
  );
}

export default App;
