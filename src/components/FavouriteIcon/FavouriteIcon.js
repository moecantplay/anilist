const FavouriteIcon = ({ fill = "#6C727C", active, ...props }) => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8 14s6.667-2 6.667-7.333c0-2.667-2-4-3.333-4-3.333 0-3.333 2.666-3.333 2.666s0-2.667-3.334-2.667c-1.333 0-3.333 1.334-3.333 4C1.334 12 8.001 14 8.001 14"
        fill={active ? "#FF3000" : fill}
      />
    </svg>
  );
};

export default FavouriteIcon;