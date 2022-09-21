import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({ children, icon, className, onClick }) => {
  const classes = 
    `ui-button ${className ? className : ""} ${icon && !children ? "only-icon" : ""}`;

  const handleClick = (e) => {
    e.preventDefault();
    return onClick();
  };
  return (
    <button className={classes} onClick={handleClick}>
      {children && <span>{children}</span>}
      {icon && <FontAwesomeIcon icon={icon} />}
    </button>
  );
};

export default Button;
