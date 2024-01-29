import { useState } from "react";
import { NavLink } from "@remix-run/react";
// import { HiOutlineViewBoards } from "react-icons/hi";
import { LayoutIcon } from "@radix-ui/react-icons";
import { BookTemplateIcon, ChevronLeftIcon, CircleOff, CloudOff, Group, LayoutDashboard, LineChartIcon, Puzzle } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@app/components/ui/tooltip";
// import { RiArrowDropLeftLine } from "react-icons/ri";
// import { ImStatsDots } from "react-icons/im";
// import { BsListNested } from "react-icons/bs";
// import { BsCloudSlash } from "react-icons/bs";
// import { TbError404 } from "react-icons/tb";
// import { RiBriefcase3Line } from "react-icons/ri";

export const Sidebar = (props: Props): JSX.Element => {
  const { projectName, projectDescription, projectImage } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside className="relative flex">
      <div
        className={cn(
          "flex h-full max-w-[50px] flex-col whitespace-nowrap bg-grey-100 opacity-100 duration-300 ease-out dark:bg-dark-500",
          isOpen ? "w-[240px] max-w-[240px] whitespace-normal opacity-100" : "collapsed"
        )}
      >
        <section className="flex w-full items-start py-6 px-5">
          <img
            src={projectImage}
            width={28}
            height={28}
            alt="project"
            className="rounded-[3px]"
          />
          <div className="ml-4 w-full">
            <p className="font-primary-bold text-lg leading-4 title-name">{projectName}</p>
            <p className="mt-2 whitespace-normal font-primary-light text-sm leading-4 line-clamp-2 title-name">
              {projectDescription}
            </p>
          </div>
        </section>
        <section className="flex-grow">
          <nav className="flex-grow">
            {navItems.map(({ href, name, icon, disabled }) => (
              <NavItem
                key={href}
                href={href}
                icon={icon}
                name={name}
                disabled={disabled}
              />
            ))}
          </nav>
        </section>
      </div>
      <div
        className={cn("r-0 relative z-10 h-full w-3", isOpen ? "ml-0" : "ml-0")}
      >
        <div className="absolute -left-[3px] h-full w-[3px] bg-gradient-to-l from-[rgba(0,0,0,0.2)] to-[rgba(0,0,0,0.0)] opacity-50" />
        <button
          onClick={toggleSidebar}
          className={cn(
            "absolute -left-[12px] mt-6 flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-full border-none bg-white shadow-[0_1px_5px_-1px_rgba(0,0,0,0.3)] transition-transform delay-150 duration-200 ease-in hover:bg-primary-main hover:text-white dark:bg-dark-200 dark:hover:bg-dark-100",
            !isOpen && "rotate-180"
          )}
          aria-label="Toggle sidebar"
        >
          {/* <RiArrowDropLeftLine size={24} /> */}
          <ChevronLeftIcon size={20} />
        </button>
      </div>
    </aside>
  );
};

interface Props {
  projectName: string;
  projectDescription: string;
  projectImage: string;
}

const navItems: NavItemProps[] = [
  {
    href: "board",
    // icon: <HiOutlineViewBoards size={24} />,
    icon: <LayoutDashboard size={24} />,
    name: "Board",
  },
  {
    href: "analytics",
    // icon: <ImStatsDots size={20} />,
    icon: <LineChartIcon size={24} />,
    name: "Analytics",
  },
  {
    href: "backlog",
    // icon: <BsListNested size={24} />,
    icon: <BookTemplateIcon />,
    name: "Backlog",
    disabled: true,
  },
  {
    href: "components",
    // icon: <RiBriefcase3Line size={24} />,
    icon: <Puzzle />,
    name: "Components",
  },
  {
    href: "custom-field",
    // icon: <RiBriefcase3Line size={24} />,
    icon: <Group />,
    name: "Custom Fields",
  },
  {
    href: "server-error",
    // icon: <BsCloudSlash size={24} />,
    icon: <CloudOff size={24} />,
    name: "Server error",
  },
  {
    href: "not-found",
    // icon: <TbError404 size={24} />,
    icon: <CircleOff size={24} />,
    name: "Not found",
  },
];

const NavItem = ({ href, icon, name, disabled }: NavItemProps): JSX.Element => {
  return (
    <NavLink
      to={disabled ? "#" : href}
      className={({ isActive }) =>
        cn(
          "group flex w-full cursor-pointer items-center gap-4 rounded border-none p-2 text-sm icon-symbol tooltip",
          isActive && !disabled
            ? "bg-grey-300 text-primary-main dark:bg-dark-200 dark:text-primary-main-dark"
            : "text-font-light dark:text-font-main-dark",
          disabled
            ? "!cursor-not-allowed hover:bg-transparent"
            : "hover:bg-grey-300 dark:hover:bg-dark-100"
        )
      }
    >
      {/* <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger>{icon}</TooltipTrigger>
          <TooltipContent>
            <span>{name}</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider> */}
      <span>{icon}</span>
      <span className={cn(disabled && "group-hover:hidden", 'title-name')}>
        {name}
      </span>
      <span className="tooltip__content">{name}</span>
      {/* <span
        className={cn(
          "itmes-center -ml-2 hidden rounded bg-grey-300 py-1 px-2 text-2xs uppercase disabled:hover:flex dark:bg-dark-100 title-name",
          disabled && "group-hover:block"
        )}
      >
        Not implemented
      </span> */}
    </NavLink>
  );
};

export interface NavItemProps {
  href: string;
  icon: JSX.Element;
  name: string;
  disabled?: boolean;
}
