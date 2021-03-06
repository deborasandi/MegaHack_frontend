import React, { useState, FormEvent } from "react";
import { FaSearch } from "react-icons/fa";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import PostAddIcon from "@material-ui/icons/PostAdd";
import DeleteIcon from "@material-ui/icons/Delete";
import logo from "../assets/logo.png";
import origem from "../assets/origem.png";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
      backgroundColor: "#fff3b0",
    },
  })
);

const SearchBar = () => {
  const classes = useStyles();
  const [textField, setTextField] = useState<string>("");
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    localStorage.setItem("field", textField);
    window.location.reload();
  }
  return (
    <>
      {localStorage.getItem("usertype") === "0" ? (
        <div className="search-container">
          <img src={origem} alt="origem" />
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Pesquisar"
              value={textField}
              onChange={(e) => setTextField(e.target.value)}
            />
            <button type="submit">
              <FaSearch />
            </button>
          </form>
          <img src={logo} alt="logo" />
        </div>
      ) : localStorage.getItem("usertype") === "1" ? (
        <div className="search-container">
          <img src={origem} alt="origem" />
          <Button
            variant="contained"
            className={classes.button}
            startIcon={<PostAddIcon />}
          >
            Novo
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            startIcon={<DeleteIcon />}
          >
            Exluir
          </Button>
          <img src={logo} alt="logo" />
        </div>
      ) : (
        <div className="search-container">
          <input type="text" placeholder="Pesquisar" />
          <button>
            <FaSearch />
          </button>
        </div>
      )}
    </>
  );
};

export default SearchBar;
