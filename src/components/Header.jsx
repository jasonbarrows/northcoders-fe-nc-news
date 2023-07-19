import PrimaryNav from "./PrimaryNav";

const Header = () => (
  <header className="py-1 sm:py-2 border-b">
    <div className="flex flex-col items-center justify-center -space-y-2">
      <h1 className="text-2xl font-semibold">nc news</h1>
      <p className="font-thin uppercase">life on code</p>
    </div>
    <PrimaryNav />
  </header>
);

export default Header;
