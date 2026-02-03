import { useOutletContext } from "react-router"
import { type IUserLayoutContext } from "../layout/UserLayout"
import { useEffect } from "react"

export default function ChatList() {
    const outletContext = useOutletContext<IUserLayoutContext>()
    useEffect(() => {
        outletContext.setShowSidebar(false)
    }, [])


    return (<>
        <div className="flex h-[80vh] bg-gray-100 rounded-lg shadow-lg overflow-hidden relative">
            {/* Active/Inactive Signal in Top Right */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                {/* Change the variables below to reflect real active status */}
                {true ? (
                    <span className="flex items-center gap-1">
                        <span className="inline-block w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-green-700 text-xs font-medium">Active</span>
                    </span>
                ) : (
                    <span className="flex items-center gap-1">
                        <span className="inline-block w-3 h-3 rounded-full bg-gray-400"></span>
                        <span className="text-gray-500 text-xs font-medium">Inactive</span>
                    </span>
                )}
            </div>

            {/* User List - Left Side */}
            <aside className="w-74 bg-white border-r border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-700">Users</h2>
                </div>
                <ul className="flex-1 overflow-y-auto">
                    {/* Example users - replace with dynamic data */}
                    {[{
                        username: "Alice",
                        image: "https://randomuser.me/api/portraits/women/68.jpg",
                        email: "alice@example.com",
                        role: "Admin",
                    }, {
                        username: "Bob",
                        image: "https://randomuser.me/api/portraits/men/45.jpg",
                        email: "bob@example.com",
                        role: "User",
                    }, {
                        username: "Carol",
                        image: "https://randomuser.me/api/portraits/women/52.jpg",
                        email: "carol@example.com",
                        role: "User",
                    }].map((user, idx) => (
                        <li key={idx} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0 border-gray-50">
                            <img src={user.image} alt={user.username} className="w-10 h-10 rounded-full object-cover border" />
                            <div className="flex flex-col">
                                <span className="font-semibold text-gray-700">{user.username}</span>
                                <span className="text-xs text-gray-500">{user.email}</span>
                                <span className="text-[11px] mt-0.5 px-2 py-0.5 bg-blue-100 text-blue-700 rounded w-fit">{user.role}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Chat Detail Box - Right Side */}
            <section className="flex-1 flex flex-col">
                {/* "Chat with" Header */}
                <div className="p-4 border-b bg-white border-gray-200 flex items-center gap-3">
                    <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Alice" className="w-10 h-10 rounded-full object-cover border" />
                    <div>
                        <div className="font-semibold text-gray-800">Alice</div>
                        <div className="text-xs text-gray-500">alice@example.com</div>
                    </div>
                </div>
                {/* Chat messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                    {/* Example messages */}
                    <div className="flex items-start gap-2">
                        <img src="https://randomuser.me/api/portraits/women/68.jpg" className="w-8 h-8 rounded-full object-cover" alt="Alice" />
                        <div>
                            <div className="bg-white p-3 rounded-lg shadow text-gray-800 max-w-xs">Hi, how can I help you?</div>
                            <div className="text-xs text-gray-400 mt-1">09:35</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-2 justify-end">
                        <div className="text-right">
                            <div className="bg-blue-700 text-white p-3 rounded-lg shadow max-w-xs">Hello! I have a question about my order.</div>
                            <div className="text-xs text-gray-400 mt-1">09:36</div>
                        </div>
                        <img src="https://randomuser.me/api/portraits/men/45.jpg" className="w-8 h-8 rounded-full object-cover" alt="You" />
                    </div>
                    <div className="flex items-start gap-2">
                        <img src="https://randomuser.me/api/portraits/women/68.jpg" className="w-8 h-8 rounded-full object-cover" alt="Alice" />
                        <div>
                            <div className="bg-white p-3 rounded-lg shadow text-gray-800 max-w-xs">Sure, can you please provide your order id?</div>
                            <div className="text-xs text-gray-400 mt-1">09:37</div>
                        </div>
                    </div>
                </div>
                {/* Chat input box (footer) */}
                <form className="p-4 bg-white border-t border-gray-200 flex items-center gap-3 sticky bottom-0">
                    <input
                        className="flex-1 border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-200"
                        type="text"
                        placeholder="Type your message..."
                    />
                    <button
                        className="px-5 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition font-semibold"
                        type="submit"
                    >
                        Send
                    </button>
                </form>
            </section>
        </div>

    </>)
}