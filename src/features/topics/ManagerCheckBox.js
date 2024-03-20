import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import useEventsStore from "../../store/EventDataContext";

const ManagerCheckbox = ({ row, manager, onCheckboxChange }) => {
  const { topics, totalTopics, emptyTopic, updateTopic, addTopic } =
    useEventsStore();

  const isChecked = topics.manager
    ? topics[row.id].managers.includes(manager)
    : null;

  const handleChange = () => {
    onCheckboxChange(manager);
  };

  return (
    <FormControlLabel
      control={<Checkbox checked={isChecked} onChange={handleChange} />}
      label={null}
    />
  );
};

export default ManagerCheckbox;
