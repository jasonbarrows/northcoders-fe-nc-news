import PrimaryNav from "./PrimaryNav";

const Header = () => (
  <>
    <div className="mt-1 flex flex-col items-center justify-center -space-y-2">
      <h1 className="text-2xl font-semibold">nc news</h1>
      <p className="font-thin uppercase">life on code</p>
    </div>
    <PrimaryNav />
  </>
);

export default Header;
