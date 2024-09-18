import { Button } from "@/components/ui/button";
import { SignedIn, UserButton } from "@clerk/nextjs";

const DashboardPage = () => {
  return (
    <div>
      <p>DashboardPage(Protected)</p>
      <SignedIn>
          <UserButton />
        </SignedIn>
    </div>
  );
};
export default DashboardPage;
