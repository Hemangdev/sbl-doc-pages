import * as React from "react";

// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import Checkbox from "@mui/material/Checkbox";
// import IconButton from "@mui/material/IconButton";

export default function ProductFilterGender() {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List
      className="gendeList bodybg mt-4"
      sx={{ width: "100%", maxWidth: 360 }}
    >
      {/* <div id="nested-list-subheader">
        <h5>GENDER</h5>
      </div>
      {["Unisex", "Male", "Female"].map((value) => {
        const labelId = `checkbox-list-label-${value}`;
        return (
          <ListItem
            key={value}
            secondaryAction={
              <IconButton edge="end" aria-label="comments">
                23
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton
              role={undefined}
              onClick={handleToggle(value)}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={` ${value + 1}`} />
            </ListItemButton>
          </ListItem>
        );
      })} */}
    </List>
  );
}

const List = () => <div></div>;