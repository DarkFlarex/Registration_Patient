import {
  FaCalendarAlt,
  FaFolderOpen,
  FaTelegramPlane,
  FaExclamationCircle,
} from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdOutlineDashboard } from "react-icons/md";
import { IoMdChatboxes } from "react-icons/io";
import { BsClipboard2CheckFill } from "react-icons/bs";
import { RiInboxArchiveFill } from "react-icons/ri";

interface Props {
  active:
    | "dashboard"
    | "calendar"
    | "profile"
    | "folder"
    | "telegram"
    | "exclamation";
  setActive: React.Dispatch<
    React.SetStateAction<
      | "dashboard"
      | "calendar"
      | "profile"
      | "folder"
      | "telegram"
      | "exclamation"
    >
  >;
}

const Sidebar: React.FC<Props> = ({ active, setActive }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", Icon: MdOutlineDashboard, size: 20 },
    { id: "calendar", label: "Календарь", Icon: FaCalendarAlt, size: 20 },
    { id: "firstProfile", label: "", Icon: CgProfile, size: 18 },
    { id: "SecProfile", label: "", Icon: CgProfile, size: 18 },
    { id: "folder", label: "", Icon: FaFolderOpen, size: 18 },
    { id: "telegram", label: "", Icon: FaTelegramPlane, size: 18 },
    { id: "RiInboxArchiveFill", label: "", Icon: RiInboxArchiveFill, size: 18 },
    { id: "Clipboard", label: "", Icon: BsClipboard2CheckFill, size: 18 },
    { id: "chat", label: "", Icon: IoMdChatboxes, size: 18 },
    { id: "exclamation", label: "", Icon: FaExclamationCircle, size: 18 },
  ] as const;

  return (
    <nav
      className=" justific-center
                bg-white shadow-md flex flex-col p-4
                max-[770px]:p-0 w-64 md:w-64 sm:w-16
                transition-all duration-300
            "
    >
      <ul className="space-y-4">
        {menuItems.map(({ id, label, Icon, size }) => {
          const isActive = active === id;
          return (
            <li
              key={id}
              onClick={() => setActive(id as any)}
              className={`flex items-center gap-3 p-3 rounded cursor-pointer select-none ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon size={size} color={isActive ? "white" : "blue"} />
              <span className="hidden md:inline text-lg font-medium">
                {label}
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Sidebar;
