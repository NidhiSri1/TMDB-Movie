import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function FilterDate(props) {
  const {
    handleSort,
    filterText,
    anchorEl,
    open,
    handleClick,
    handleClose,
    sortValue,
  } = props;

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Sort
      </Button>
      <Menu
        data-testid="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {filterText.map((text) => {
          return (
            <MenuItem
              selected={text === sortValue}
              key={text}
              data-testid={`menu-item-${text}`}
              onClick={() => handleSort(text)}
            >
              {text}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
