import { cn } from "@/src/lib/utils"
import { AccountSwitcher } from "@app/components/mail/account-switcher"
import { Nav } from "@app/components/mail/nav"
import { Mail } from "@app/components/mail/data"
import { Input } from "@app/components/ui/input"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@app/components/ui/resizable"
import { Separator } from "@app/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@app/components/ui/tabs"
import { TooltipProvider } from "@app/components/ui/tooltip"
import { Inbox, Send, Trash2, Archive, Users2, AlertCircle, MessagesSquare, File, ShoppingCart, Search, ChevronLeftIcon } from "lucide-react"
import { useState } from "react"

interface MailProps {
    accounts: {
        label: string
        email: string
        icon: React.ReactNode
    }[]
    mails: Mail[]
    defaultLayout: number[] | undefined
    defaultCollapsed?: boolean
    navCollapsedSize: number
}

export function MailView({
    accounts,
    mails,
    defaultLayout = [240, 440, 655],
    defaultCollapsed = false,
    navCollapsedSize,
}: MailProps) {
    const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)
    const [sizeNav, setSizeNav] = useState<number>(defaultLayout[0])
    // const [mail] = useMail()
    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed)
        setSizeNav((pre) => {
            return isCollapsed ? 0 : defaultLayout[0]
        })
    }
    return (
        <TooltipProvider delayDuration={0}>
            <ResizablePanelGroup
                direction="horizontal"
                onLayout={(sizes: number[]) => {
                    document.cookie = `react-resizable-panels:layout=${JSON.stringify(
                        sizes
                    )}`
                }}
                className="h-full max-h-[100%] items-stretch"
            >
                <ResizablePanel
                    defaultSize={sizeNav}
                    collapsedSize={navCollapsedSize}
                    collapsible={true}
                    minSize={15}
                    maxSize={20}
                    onCollapse={() => {
                        // let collapsed = true
                        // setIsCollapsed(collapsed)
                        // document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                        //     collapsed
                        // )}`
                    }}
                    className={cn(isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out")}
                >
                    <div className={cn("flex h-[52px] items-center justify-center", isCollapsed ? 'h-[52px]' : 'px-2')}>
                        <AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} />
                        <button
                            onClick={toggleSidebar}
                            className={cn(
                                "h-[24px] w-[24px] cursor-pointer rounded-full border-none bg-white shadow-[0_1px_5px_-1px_rgba(0,0,0,0.3)] transition-transform delay-150 duration-200 ease-in hover:bg-primary-main hover:text-white dark:bg-dark-200 dark:hover:bg-dark-100",
                                isCollapsed && "rotate-180"
                            )}
                            aria-label="Toggle sidebar"
                        >
                            <ChevronLeftIcon size={20} />
                        </button>
                    </div>
                    <Separator />
                    <Nav
                        isCollapsed={isCollapsed}
                        links={[
                            {
                                title: "Inbox",
                                label: "128",
                                icon: Inbox,
                                variant: "default",
                            },
                            {
                                title: "Drafts",
                                label: "9",
                                icon: File,
                                variant: "ghost",
                            },
                            {
                                title: "Sent",
                                label: "",
                                icon: Send,
                                variant: "ghost",
                            },
                            {
                                title: "Trash",
                                label: "",
                                icon: Trash2,
                                variant: "ghost",
                            },
                            {
                                title: "Archive",
                                label: "",
                                icon: Archive,
                                variant: "ghost",
                            },
                            {
                                title: "Social",
                                label: "972",
                                icon: Users2,
                                variant: "ghost",
                            },
                            {
                                title: "Updates",
                                label: "342",
                                icon: AlertCircle,
                                variant: "ghost",
                            },
                            {
                                title: "Forums",
                                label: "128",
                                icon: MessagesSquare,
                                variant: "ghost",
                            },
                            {
                                title: "Shopping",
                                label: "8",
                                icon: ShoppingCart,
                                variant: "ghost",
                            },
                            {
                                title: "Promotions",
                                label: "21",
                                icon: Archive,
                                variant: "ghost",
                            },
                        ]}
                    />

                </ResizablePanel>
                <ResizableHandle withHandle />
                {/* <div
                    className={cn("r-0 relative z-10 h-full w-3", isCollapsed ? "ml-0" : "ml-[24px]")}
                >
                    <div className="absolute -left-[3px] h-full w-[3px] bg-gradient-to-l from-[rgba(0,0,0,0.2)] to-[rgba(0,0,0,0.0)] opacity-50" />
                    <button
                        onClick={toggleSidebar}
                        className={cn(
                            "absolute -left-[12px] mt-6 flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-full border-none bg-white shadow-[0_1px_5px_-1px_rgba(0,0,0,0.3)] transition-transform delay-150 duration-200 ease-in hover:bg-primary-main hover:text-white dark:bg-dark-200 dark:hover:bg-dark-100",
                            !isCollapsed && "rotate-180"
                        )}
                        aria-label="Toggle sidebar"
                    >
                        <ChevronLeftIcon size={20} />
                    </button>
                </div> */}
                <ResizablePanel defaultSize={defaultLayout[1]}>
                    <Tabs defaultValue="all">
                        <div className="flex items-center px-4 py-2">
                            <h1 className="text-xl font-bold">Inbox</h1>
                            <TabsList className="ml-auto">
                                <TabsTrigger value="all" className="text-zinc-600 dark:text-zinc-200">All mail</TabsTrigger>
                                <TabsTrigger value="unread" className="text-zinc-600 dark:text-zinc-200">Unread</TabsTrigger>
                            </TabsList>
                        </div>
                        <Separator />
                        <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                            <form>
                                <div className="relative">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="Search" className="pl-8" />
                                </div>
                            </form>
                        </div>
                        <TabsContent value="all" className="m-0">
                            {/* <MailList items={mails} /> */}
                        </TabsContent>
                        <TabsContent value="unread" className="m-0">
                            {/* <MailList items={mails.filter((item) => !item.read)} /> */}
                        </TabsContent>
                    </Tabs>
                </ResizablePanel>
                {/* <ResizableHandle withHandle />
                <ResizablePanel defaultSize={defaultLayout[2]}>
                    <MailDisplay
                        mail={mails.find((item) => item.id === mail.selected) || null}
                    />
                </ResizablePanel> */}
            </ResizablePanelGroup>
        </TooltipProvider>
    )
}