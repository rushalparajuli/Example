import { useContext } from "react"
import { FaCog, FaImage, FaPowerOff, FaShoppingBag, FaShoppingCart, FaSitemap, FaUsers } from "react-icons/fa"
import { NavLink, useNavigate } from "react-router"
import { FaB, FaMessage } from "react-icons/fa6"
import AuthContext from "../../context/AuthContext"
import { toast } from "sonner"
import type { IUserLayoutProps } from "./UserHeader"

export const UserSidebar = ({ loggedInUser, showSidebar }: Readonly<IUserLayoutProps>) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("You have been logged out successfully");
    navigate("/")
  };

  return (
    <aside className={`bg-gray-800 text-white ${showSidebar ? 'w-100' : 'w-20'}`}>
      <nav className="flex flex-col h-full py-8 px-8 w-64 justify-between">
        {/* <div> */}
        <div>
          <ul className="space-y-3">
            <li>
              <NavLink
                to={loggedInUser && `/${loggedInUser.role}`}
                className={`flex items-center ${showSidebar ? 'gap-3 hover:bg-gray-700 ' : 'gap-7'} px-3 py-2 rounded-lg transition font-medium `}
              >
                <FaCog className="text-green-400 size-5 " />
                Dashboard
              </NavLink>
            </li>
            {
              loggedInUser && loggedInUser.role === 'admin' ? <li>
                <NavLink
                  to={loggedInUser && `/${loggedInUser.role}/banners`}
                  className={`flex items-center ${showSidebar ? 'gap-3 hover:bg-gray-700 ' : 'gap-7'} px-3 py-2 rounded-lg transition font-medium `}
                >
                  <FaImage className="text-green-400 size-5 " />
                  Banners
                </NavLink>
              </li> : <></>
            }

            {
              loggedInUser && (loggedInUser.role === 'admin' || loggedInUser.role === 'seller') ? <li>
                <NavLink
                  to={loggedInUser && `/${loggedInUser.role}/brands`}
                  className={`flex items-center ${showSidebar ? 'gap-3 hover:bg-gray-700 ' : 'gap-7'} px-3 py-2 rounded-lg transition font-medium `}
                >
                  <FaB className="text-green-400 size-5 " />
                  Brands
                </NavLink>
              </li> : <></>
            }

            {
              loggedInUser && (loggedInUser.role === 'admin' || loggedInUser.role === 'seller') ? <li>
                <NavLink
                  to={loggedInUser && `/${loggedInUser.role}/categories`}
                  className={`flex items-center ${showSidebar ? 'gap-3 hover:bg-gray-700 ' : 'gap-7'} px-3 py-2 rounded-lg transition font-medium `}
                >
                  <FaSitemap className="text-green-400 size-5 " />
                  Categories
                </NavLink>
              </li> : <></>
            }

            <li>
              <NavLink
                to={loggedInUser && `/${loggedInUser.role}/users`}
                className={`flex items-center ${showSidebar ? 'gap-3 hover:bg-gray-700 ' : 'gap-7'} px-3 py-2 rounded-lg transition font-medium `}
              >
                <FaUsers className="text-green-400 size-5 " />
                Users
              </NavLink>
            </li>

            {
              loggedInUser && (loggedInUser.role === 'admin' || loggedInUser.role === 'seller') ? <li>
                <NavLink
                  to={loggedInUser && `/${loggedInUser.role}/products`}
                  className={`flex items-center ${showSidebar ? 'gap-3 hover:bg-gray-700 ' : 'gap-7'} px-3 py-2 rounded-lg transition font-medium `}
                >
                  <FaShoppingBag className="text-green-400 size-5 " />
                  Products
                </NavLink>
              </li> : <></>
            }

            <li>
              <NavLink
                to={loggedInUser && `/${loggedInUser.role}/orders`}
                className={`flex items-center ${showSidebar ? 'gap-3 hover:bg-gray-700 ' : 'gap-7'} px-3 py-2 rounded-lg transition font-medium `}
              >
                <FaShoppingCart className="text-green-400 size-5 " />
                Orders
              </NavLink>
            </li>

            <li>
              <NavLink
                to={loggedInUser && `/${loggedInUser.role}/messages`}
                className={`flex items-center ${showSidebar ? 'gap-3 hover:bg-gray-700 ' : 'gap-7'} px-3 py-2 rounded-lg transition font-medium `}
              >
                <FaMessage className="text-green-400 size-5 " />
                Messages
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="mt-100 ">
          {showSidebar ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2
              bg-red-600 hover:bg-red-700 text-white
              rounded-lg transition text-sm font-semibold justify-center hover:cursor-pointer"
            >
              <FaPowerOff className="size-5" />
              Logout
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center justify-center
              p-2 bg-red-600 hover:bg-red-700 text-white
              rounded-lg transition hover:cursor-pointer"
            >
              <FaPowerOff className="size-5" />
            </button>
          )}

        </div>
        {showSidebar && (
          <div className="mt-auto pt-8 text-gray-400 text-xs text-center border-t border-gray-700">
            POS Admin v1.0
          </div>
        )}
      </nav>
    </aside>
  )
}