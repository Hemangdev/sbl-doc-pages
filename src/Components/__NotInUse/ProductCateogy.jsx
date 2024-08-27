import * as React from "react";

// import List from "@mui/material/List";
// import ListItemButton from "@mui/material/ListItemButton";

// import ListItemText from "@mui/material/ListItemText";
// import Collapse from "@mui/material/Collapse";

// import ExpandLess from "@mui/icons-material/ExpandLess";
// import ExpandMore from "@mui/icons-material/ExpandMore";

export default function ProductCateogy() {
  const [open, setOpen] = React.useState(true);
  const [index, setIndex] = React.useState(1);

  const handleClick = (index) => {
    setOpen(!open);
    setIndex(index);
  };

  const CategoryList = [
    {
      id: 1,
      name: "Homoeopathic Product",
      child: [
        {
          id: 1,
          name: "Mother Tincatures",
        },
        {
          id: 2,
          name: "Dilutions & LM Potencies",
        },
        {
          id: 3,
          name: "Bio Chemic & Combination",
        },
      ],
    },
    {
      id: 2,
      name: "Pomades",
      child: [],
    },
    {
      id: 3,
      name: "Personal Care",
      child: [
        {
          id: 1,
          name: "Hair Care",
        },
        {
          id: 2,
          name: "Skin Care",
        },
        {
          id: 3,
          name: "Hygiene Care",
        },
        {
          id: 4,
          name: "Body Care",
        },
      ],
    },
    {
      id: 4,
      name: "Herbals",
      child: [
        {
          id: 1,
          name: "Hair Care",
        },
        {
          id: 2,
          name: "Skin Care",
        },
        {
          id: 3,
          name: "Hygiene Care",
        },
        {
          id: 4,
          name: "Body Care",
        },
      ],
    },
  ];
  return (
    <List
      sx={{ width: "100%" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      className="p-2  pb-5 sidebar-categories"
      subheader={
        <div id="nested-list-subheade " className="p-3">
          <h5>PRODUCT CATEGORY</h5>
        </div>
      }
    >
      {CategoryList.map((category, key) => (
        <div key={category.id}>
          {/* <ListItemButton
            className="parant"
            onClick={() =>
              category.child.length > 0 && handleClick(category.id)
            }
          >
            <ListItemText primary={category.name} />

            {category.child.length > 0 ? (
              index === category.id ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )
            ) : (
              ""
            )}
          </ListItemButton>

          {category.child.map((childData, key2) => (
            <Collapse
              in={index === category.id ? true : false}
              timeout="auto"
              unmountOnExit
              key={key2}
            >
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary={childData.name} />
                </ListItemButton>
              </List>
            </Collapse>
          ))} */}
        </div>
      ))}
    </List>
  );
}

const List = () => <div></div>;