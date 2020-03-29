export const Button = ({children, ...otherProps}) => (
  <button className="block border border-black border-solid rounded-full px-4 py-2 text-xl hover:opacity-50" {...otherProps}>{children}</button>
);
