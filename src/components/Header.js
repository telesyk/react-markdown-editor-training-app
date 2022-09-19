import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNoteSticky,
  faTableCellsLarge,
  faTableList,
  faFilter,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";

const Header = ({
  isGridView,
  isNotesLoaded,
  handleViewClick,
  handleAddNote,
  handleNotesFilter
}) => {
  const iconView = isGridView ? faTableList : faTableCellsLarge;

  return (
    <header className="app-header">
      <div className="app-header__wrap container">
        <h1 className="app-header__title">
          <span>Notes</span>
          <FontAwesomeIcon icon={faNoteSticky} />
        </h1>
        <div className="app-header__controls">
          <Button icon={faPlus} onClick={handleAddNote} />
          <Button icon={faFilter} onClick={handleNotesFilter} />
          {isNotesLoaded && <Button icon={iconView} onClick={handleViewClick} />}
        </div>
      </div>
    </header>
  );
};

export default Header;
