import PropTypes from "prop-types";
import IcomoonIcon from "../components/IcomoonIcon";

const iconPosition = { left: "Left", right: "Right" };
const buttonSize = { default: "py-2 px-3 md:py-3 md:px-6" };

const Button = ({
  children,
  onClick = () => {},
  isDisable,
  iconUrl,
  iconPosition,
  iconSize,
  variant,
  iconView,
  size,
  textSize,
  iconColor,
  iconSpace,
  iconFlexibleSize,
  typeButton,
  ...property
}) => {
  const buttonType = {
    contained: "contained",
    outlined: "outlined",
  };

  const buttonStyle = {
    contained: "rounded bg-customGray-900 text-white-800",
  };

  return (
    <button
      variant={buttonType[variant]}
      className={`${property.className} ${buttonStyle[variant]} ${buttonSize[size]} active:scale-90 hover:drop-shadow-xl  transition-all duration-200`}
      onClick={onClick}
      disabled={isDisable}
      type={typeButton}
    >
      <div
        className={`flex  justify-center items-center ${
          iconPosition === "Right" &&
          "flex-row-reverse space-x-2 space-x-reverse"
        } ${iconPosition === "Left" && "flex space-x-2"} `}
      >
        {iconView && iconUrl && iconPosition && (
          <IcomoonIcon
            icon={iconUrl}
            size={iconSize}
            color={iconColor}
            className={`${iconFlexibleSize} ${iconSpace}`}
          />
        )}
        <span
          className={`flex justify-center items-center text-sm md:text-base ${textSize}`}
        >
          {children}
        </span>
      </div>
    </button>
  );
};
export default Button;

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  isDisable: PropTypes.bool,
  iconView: PropTypes.bool,
  iconPosition: PropTypes.oneOf(Object.values(iconPosition)),
  iconUrl: PropTypes.string,
  iconSize: PropTypes.string,
};
