import { Outlet, useNavigate } from "react-router";
import { useAuth } from "../../hooks/auth";
import { UserHeader } from "../../components/user-dashboard/UserHeader";
import type { IUser } from "../auth/auth.contract";
import { UserSidebar } from "../../components/user-dashboard/UserSidebar";
import { UserFooter } from "../../components/user-dashboard/UserFooter";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { toast } from "sonner";

export interface IUserLayoutContext {
  showSidebar: boolean
  setShowSidebar: Dispatch<SetStateAction<boolean>>
}

export default function UserLayout() {
  const { loggedInUser } = useAuth();
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState<boolean>(false)

  useEffect(() => {
    if (!loggedInUser) {
      toast.info("You are not logged in.", {
        description: "Please login first to access"
      })
      navigate("/")
    }
  }, [])
  return (
    <>
      <UserHeader setShowSidebar={setShowSidebar}
       showSidebar={showSidebar} 
       loggedInUser={loggedInUser as IUser} 
       />

      <main className="flex w-full h-screen">
        <UserSidebar setShowSidebar={setShowSidebar}
         showSidebar={showSidebar}
          loggedInUser={loggedInUser as IUser}
           />

        <section className="p-5 bg-gray-300 m-3 rounded-lg w-full">
          <Outlet  context={{
            showSidebar,
            setShowSidebar
          }} />
        </section>
      </main>
      <UserFooter />
    </>
  );
}
