import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNoteSticky,
  faTableCellsLarge,
  faTableList,
  faFilter
} from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";

const Header = ({ notesFilter, isGridView, handleViewClick }) => {
  const iconView = isGridView ? faTableList : faTableCellsLarge;

  return (
    <header className="app-header">
      <div className="app-header__wrap container">
        <h1 className="app-header__title">
          <span>Notes</span>
          <FontAwesomeIcon icon={faNoteSticky} />
        </h1>
        <div className="app-header__controls">
          {notesFilter && <Button icon={faFilter} />}
          <Button icon={iconView} onClick={handleViewClick} />
        </div>
      </div>
    </header>
  );
};

export default Header;
