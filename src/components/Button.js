import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({ children, icon, className, onClick }) => {
  const classes = !className ? "ui-button" : `ui-button ${className}`;
  const handleClick = (e) => {
    e.preventDefault();
    return onClick();
  };
  return (
    <button className={classes} onClick={handleClick}>
      {children}
      {icon && <FontAwesomeIcon icon={icon} />}
    </button>
  );
};

export default Button;
