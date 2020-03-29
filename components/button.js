export const Button = ({children, ...otherProps}) => (
  <button className="block border border-black border-solid px-3 py-2 text-xl" {...otherProps}>{children}</button>
);
