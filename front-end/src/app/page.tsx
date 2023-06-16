import { UserButton, auth } from "@clerk/nextjs";

export default async function Home() {
  const { getToken } = auth();
  const token = await getToken();

  const getAccount = async () => {
    try {
      const response = await fetch("http://localhost:3333/account", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const account = await response.json();
      return account;
    } catch (err) {
      console.log(err);
    }
    return null;
  };

  const account = getAccount();

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
