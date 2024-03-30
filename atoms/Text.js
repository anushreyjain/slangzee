import PropTypes from "prop-types";

const Text = ({
  variant = "body",
  fontSize = "",
  fontWeight = "",
  children,
  className,
  onClick,
  fontFamily,
  ...property
}) => {
  const TextType = {
    body: "body",
    bodySmall: "bodySmall",
    medium: "medium",
    large: 'large',
    caption: "caption",
  };

  const TextStyle = {
    body: "text-sm md:text-base",
    medium: "text-base md:text-xl",
    large: "text-xl md:text-2xl",
    bodySmall: "text-sm",
    caption: "text-xs",
  };
  return (
    <p
      variant={TextType[variant]}
      className={`${property.className} ${TextStyle[variant]} ${fontSize} ${fontFamily} ${fontWeight} ${className}`}
      onClick={onClick}
    >
      {children}
    </p>
  );
};

export default Text;

Text.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
  fontFamily: PropTypes.string,
  className: PropTypes.string,
};
